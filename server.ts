import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import AdmZip from "adm-zip";

dotenv.config();

const __dirname = process.cwd();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // Download Workspace ZIP Endpoint
  app.get("/api/export-zip", (req, res) => {
    try {
      const zip = new AdmZip();
      const rootDir = process.cwd();

      const addDirectoryToZip = (localPath: string, zipPath: string) => {
        const items = fs.readdirSync(localPath);
        for (const item of items) {
          const fullPath = path.join(localPath, item);
          const relativeZipPath = zipPath ? `${zipPath}/${item}` : item;
          const stat = fs.statSync(fullPath);

          // Exclude unnecessary or sensitive files and folders
          if (
            item === "node_modules" ||
            item === ".git" ||
            item === "dist" ||
            item === ".env" ||
            item === "package-lock.json"
          ) {
            continue;
          }

          if (stat.isDirectory()) {
            addDirectoryToZip(fullPath, relativeZipPath);
          } else {
            const fileContent = fs.readFileSync(fullPath);
            zip.addFile(relativeZipPath, fileContent);
          }
        }
      };

      addDirectoryToZip(rootDir, "");

      const buffer = zip.toBuffer();

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="maison-qi-project.zip"');
      res.send(buffer);
    } catch (err: any) {
      console.error("ZIP Generation Error:", err);
      res.status(500).send("Failed to generate ZIP: " + err.message);
    }
  });

  // Initialize Gemini Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // AI Stylist Chat Endpoint
  app.post("/api/stylist", async (req, res) => {
    try {
      const { history, message } = req.body;

      if (!ai) {
        return res.status(200).json({
          text: "您的 AI 祺袍顾问 Madame Qi 目前处于离线状态。请在右侧「设置 - 密钥」中配置 GEMINI_API_KEY 以开启专属量体设计咨询。"
        });
      }

      const systemInstruction = `
        您是 MAISON QĪ（祺坊）的首席量体师兼高定主设 Madame Qi（戚夫人）。
        您高雅、得体，精通东方美学与现代高级时装设计。您的语气低调奢华（Quiet Luxury）、诗意且极为专业，向顾客提供贴心的祺袍款式、面料、花样及搭配建议。
        
        祺坊目前提供以下高定参数供顾客进行「在线定制」：
        1. 剪裁/版型 (Silhouette):
           - 经典长裙 (classic) - 沉稳庄重，适合宴会、婚礼
           - 优雅中长裙 (midi) - 知性大方，适合日常雅集、职场
           - 当代短裙 (mini) - 灵动摩登，适合年轻日常、出游
        2. 领型 (Collar):
           - 上海高领 (high) - 古典雅致，修饰颈部线条
           - 镂空水滴领 (teardrop) - 灵动含蓄，若隐若现的美感
           - 低领/凤仙领 (low) - 舒适随性，适合脖颈微短或追求自由感的顾客
        3. 袖型 (Sleeve):
           - 飞飞袖 (cap) - 微遮肩膀，灵动温婉
           - 玉兰中袖 (elbow) - 遮挽大臂，大方端庄
           - 连肩长袖 (long) - 气场十足，经典御寒
           - 无袖 (none) - 清爽干练，展露手臂线条
        4. 面料 (Fabric):
           - 苏州桑蚕丝 (mulberry_silk) - 光泽温润，触感如水
           - 传统香云纱 (xiangyunsha) - 非遗岁月的质感，古朴典雅，越穿越有味道
           - 提花重绉 (heavy_crepe) - 骨感极佳，垂顺显瘦
           - 双股织锦缎 (brocade) - 华丽富贵，饱含金银丝，适合盛典
        5. 盘扣襟扣 (Pankou):
           - 一字扣 (straight) - 极简留白，纯粹优雅
           - 琵琶扣 (pipa) - 玲珑精巧，古典趣味
           - 花卉手工扣 (floral) - 繁复奢华，点睛之笔
        6. 绣花花样 (Embroidery):
           - 玉兰幽香 (magnolia) - 高洁淡雅
           - 傲骨寒梅 (plum) - 坚韧风骨
           - 水墨竹影 (bamboo) - 洒脱书卷气
           - 素面无瑕 (none) - 极致极简，凸显面料本质
        
        您的任务：
        1. 仔细阅读顾客的诉求（如：身型特点、肤色、参与的场合（如中式婚礼、雅集茶会、毕业典礼、日常通勤）、气候条件）。
        2. 针对顾客的诉求，推荐最适合顾客的参数组合，并用极具文化格调的语言解释原因（例如：香云纱配水墨竹影突显东方书香；重绉丝中长款更适合通勤且极度修身）。
        3. 指导顾客如何在网页的「高定定制」中选择这些选项。
        4. 回复一律使用中文，排版美观、有呼吸感，每段文字精炼而富有力量，避免字数堆砌。
      `;

      // Format history for the GoogleGenAI chats SDK
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.text }]
      }));

      // Create a chat session with instruction and history
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: formattedHistory
      });

      const response = await chat.sendMessage({
        message: message
      });

      res.json({
        text: response.text
      });

    } catch (error: any) {
      console.error("AI Stylist Error:", error);
      res.status(500).json({ error: error.message || "An error occurred" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
