import { Product } from './types';

// Import images so Vite can resolve them in production builds
import heroImg from './assets/images/qipao_hero_banner_1782488815540.jpg';
import embroideryImg from './assets/images/qipao_lookbook_1_1782488835886.jpg';
import modelGreenImg from './assets/images/qipao_lookbook_2_1782488850431.jpg';
import collarDetailImg from './assets/images/qipao_lookbook_3_1782488865594.jpg';
import atelierImg from './assets/images/qipao_tailor_atelier_1782488883669.jpg';

export const IMAGES = {

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: '小玉兰 · 手绣桑蚕丝祺袍',
    englishName: 'The Petite Magnolia',
    price: 3680,
    description: '采用精选苏州桑蚕丝，手感软滑，如水般贴合。胸前及下摆点缀纯手工苏绣白玉兰，清雅出尘，修身中长款剪裁，尽显江南温婉。',
    image: IMAGES.embroidery,
    category: 'atelier',
    details: [
      '100% 桑蚕丝 (Mulberry Silk)',
      '全真丝乔其衬里，透气舒适',
      '手工白玉兰苏绣设计，耗时48个工时',
      '上海传统一字盘扣',
      '侧边隐形拉链设计'
    ],
    specs: {
      fabric: '100% 桑蚕丝',
      silhouette: '优雅中长裙 (Midi)',
      collar: '传统上海高领',
      craft: '苏绣手工刺绣'
    }
  },
  {
    id: 'prod-2',
    name: '听雨 · 镂空水滴真丝祺袍',
    englishName: 'Raindrops Echo',
    price: 3200,
    description: '水滴形前襟镂空设计，若隐若现，平添一分灵动与含蓄。墨绿色重绉真丝展现低调的华丽，顺滑显瘦，气场内敛。',
    image: IMAGES.modelGreen,
    category: 'modern',
    details: [
      '重磅真丝提花面料 (Heavy Crepe)',
      '精巧水滴形镂空领口',
      '复古琵琶扣饰，古典趣味',
      '飞飞袖剪裁，柔化肩部线条',
      '日常雅集与商务宴会皆宜'
    ],
    specs: {
      fabric: '重磅提花真丝',
      silhouette: '知性中长款',
      collar: '镂空水滴领',
      craft: '手工滚边拼缝'
    }
  },
  {
    id: 'prod-3',
    name: '玄雀 · 非遗重磅香云纱',
    englishName: 'The Obsidian Finch',
    price: 4800,
    description: '精选非遗纯手工晒莨香云纱。泥土与植物的油脂赋予面料深邃幽暗的光泽，越穿越见其温润古朴，展现高级知识分子的沉静与风骨。',
    image: IMAGES.collarDetail,
    category: 'heritage',
    details: [
      '非遗手作晒莨香云纱 (Heirloom Xiangyunsha)',
      '经典上海复古高领，挺括有型',
      '古董一字铜扣与手工盘扣完美融合',
      '双股真丝重工包边，防裂防磨',
      '典雅拖地长款，仪式感拉满'
    ],
    specs: {
      fabric: '老树汁纯晒莨香云纱',
      silhouette: '经典长裙 (Classic Long)',
      collar: '复古立领',
      craft: '纯手工剪裁缝制'
    }
  }
];

export const SILHOUETTE_OPTIONS = [
  { id: 'classic', name: '经典长裙', desc: '庄重典雅，展现至臻仪式感（适合婚宴、盛典、晚宴）', price: 600, tag: 'Classic Floor-length' },
  { id: 'midi', name: '优雅中长裙', desc: '知性大方，利落修身，露出纤细小腿（日常雅集、通勤）', price: 300, tag: 'Elegant Midi' },
  { id: 'mini', name: '当代短裙', desc: '轻盈摩登，灵动活泼，拉长双腿比例（度假、时尚街拍）', price: 0, tag: 'Modern Mini' }
];

export const COLLAR_OPTIONS = [
  { id: 'high', name: '上海高领', desc: '立领高约5.5cm，重塑颈部风骨，挺拔提气', price: 150, tag: 'Shanghai High' },
  { id: 'teardrop', name: '镂空水滴领', desc: '前襟开一滴水状镂空，含蓄且微露性感锁骨', price: 200, tag: 'Teardrop Keyhole' },
  { id: 'low', name: '低领 / 凤仙领', desc: '立领高度2.5cm，舒适好穿，日常活动自如不卡喉咙', price: 0, tag: 'Low Mandarin' }
];

export const SLEEVE_OPTIONS = [
  { id: 'cap', name: '飞飞袖', desc: '微型飞袖，遮住大臂最粗处，显瘦利落', price: 100, tag: 'Cap Sleeve' },
  { id: 'elbow', name: '玉兰中袖', desc: '及肘中袖，线条流畅温婉，极其端庄显沉静', price: 150, tag: 'Elbow Length' },
  { id: 'long', name: '连肩长袖', desc: '肩袖一体，随身落落大方，显温婉与古典风韵', price: 250, tag: 'Kimono Long' },
  { id: 'none', name: '无袖', desc: '干练洒脱，适合匀称修长的手臂，夏季首选', price: 0, tag: 'Sleeveless' }
];

export const FABRIC_OPTIONS = [
  { id: 'mulberry_silk', name: '苏州特级桑蚕丝', desc: '温润莹亮，如玉如波，经典顺滑的穿着体验', price: 1200, tag: 'Suzhou Mulberry Silk', color: 'bg-[#faf6f0] border-stone-300' },
  { id: 'xiangyunsha', name: '老莨非遗香云纱', desc: '黑如漆、沉如泥，岁月沉淀的植物矿物非遗，苍凉华丽', price: 1800, tag: 'Heritage Xiangyunsha', color: 'bg-[#292524] border-stone-800' },
  { id: 'heavy_crepe', name: '真丝双绉提花', desc: '哑光骨感，丰满不易皱，垂坠感极强，藏肉显瘦', price: 900, tag: 'Jacquard Heavy Crepe', color: 'bg-[#e2dcd5] border-stone-400' },
  { id: 'brocade', name: '金银双股织锦缎', desc: '流光溢彩，丝缕中织入金银丝线，华丽重工，触手有痕', price: 1500, tag: 'Luxe Brocade Satin', color: 'bg-[#d97706] border-amber-700' }
];

export const PANKOU_OPTIONS = [
  { id: 'straight', name: '一字扣', desc: '宋风极简一字扣，留白雅致，素洁纯真', price: 0, tag: 'Straight Pankou' },
  { id: 'pipa', name: '琵琶扣', desc: '经典琵琶圆盘，玲珑富丽，带有生动的国风意趣', price: 100, tag: 'Pipa Pankou' },
  { id: 'floral', name: '繁花手工扣', desc: '经验师傅手工绞盘的花朵，精美重工，绝美点缀', price: 250, tag: 'Floral Pankou' }
];

export const EMBROIDERY_OPTIONS = [
  { id: 'magnolia', name: '玉兰幽香', desc: '苏绣手工劈线，玉兰盛放，高洁清香，栩栩如生', price: 1500, tag: 'Magnolia handcraft' },
  { id: 'plum', name: '傲骨寒梅', desc: '疏影横斜，点点红梅染就一树寒霜傲雪', price: 1600, tag: 'Plum Blossom' },
  { id: 'bamboo', name: '水墨竹影', desc: '清雅墨竹，竹节凌云，体现书香门第、君子之气', price: 1200, tag: 'Ink Bamboo' },
  { id: 'none', name: '素雅无暇', desc: '纯色留白，完美保留面料原本的织造纹理，大美无言', price: 0, tag: 'Plain Minimal' }
];
