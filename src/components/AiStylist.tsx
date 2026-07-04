import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, CustomizationSelections } from '../types';
import { Sparkles, Send, User, RotateCcw, ArrowRight, CornerDownLeft } from 'lucide-react';

interface AiStylistProps {
  onApplyPreset: (selections: Partial<CustomizationSelections>) => void;
  currentSelections: CustomizationSelections;
}

export default function AiStylist({ onApplyPreset, currentSelections }: AiStylistProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: '您好，雅客。我是祺坊主设 Madame Qi。在祺袍的世界里，每一寸丝线、每一枚盘扣都承载着主人的风骨。告诉我您的身形特征、喜好的色泽，或是即将出席的雅集盛宴，我将为您量身构思最契合您气质的高定方案。'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions to start conversation
  const suggestedQuestions = [
    '我准备参加闺蜜的中式婚礼，有什么温婉大方的推荐吗？',
    '脖子不够修长，适合什么领型？梨形身材怎么选版型？',
    '香云纱面料和桑蚕丝有什么区别？哪种适合夏天日常穿？',
    '我喜欢低调简约有书卷气的风格，该怎么搭配？'
  ];

  // Tailored presets curated by Madam Qi
  const presets = [
    {
      name: '玉兰幽思 · 婚宴盛礼',
      desc: '经典桑蚕丝配玉兰手工绣，端庄温婉',
      config: {
        silhouette: 'classic' as const,
        collar: 'high' as const,
        sleeve: 'cap' as const,
        fabric: 'mulberry_silk' as const,
        pankou: 'floral' as const,
        embroidery: 'magnolia' as const
      }
    },
    {
      name: '竹影清风 · 书香茶会',
      desc: '岁月香云纱配水墨竹，清冷君子之气',
      config: {
        silhouette: 'midi' as const,
        collar: 'low' as const,
        sleeve: 'elbow' as const,
        fabric: 'xiangyunsha' as const,
        pankou: 'straight' as const,
        embroidery: 'bamboo' as const
      }
    },
    {
      name: '摩登都会 · 优雅日常',
      desc: '水滴镂空低领，双绉真丝，轻盈摩登',
      config: {
        silhouette: 'mini' as const,
        collar: 'teardrop' as const,
        sleeve: 'none' as const,
        fabric: 'heavy_crepe' as const,
        pankou: 'pipa' as const,
        embroidery: 'none' as const
      }
    }
  ];

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: messages,
          message: textToSend
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `很抱歉，祺袍缝纫室目前略有嘈杂，我未能听清您的构想。原因: ${data.error || '网络微恙'}` }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: '雅客见谅，主设室的连线暂时中断了，请确保您开启了后端的服务密钥。我们依然可以使用下方的精选高定模板，一键试穿。' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'model',
        text: '雅客，让我们重新探索您的定制诉求。无论是身形量体还是面料搭配，我都乐意为您解答。'
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0eee8] border border-stone-300 rounded-lg overflow-hidden shadow-sm">
      {/* Consultant Header */}
      <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center border border-amber-600">
            <Sparkles size={14} className="text-amber-100" />
          </div>
          <div>
            <h4 className="serif-display text-sm tracking-widest font-normal">Madame Qi · 祺袍大设</h4>
            <p className="text-[9px] text-stone-400 font-light tracking-wider">祺坊高定专属量体顾问</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="text-stone-400 hover:text-white transition-colors cursor-pointer"
          title="重置对话"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded px-4 py-3 text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#8c7355] text-white rounded-br-none' 
                : 'bg-white text-stone-800 border border-stone-200/80 shadow-xs rounded-bl-none'
            }`}>
              <div className="font-semibold text-[9px] tracking-widest opacity-65 mb-1 flex items-center space-x-1 uppercase">
                {msg.role === 'user' ? <User size={10} /> : <Sparkles size={10} />}
                <span>{msg.role === 'user' ? '雅客您' : 'Madame Qi'}</span>
              </div>
              <p className="whitespace-pre-line font-light tracking-wide">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-stone-800 rounded rounded-bl-none border border-stone-200/80 px-4 py-3 text-xs shadow-xs flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] text-stone-400 font-light font-mono">Madame Qi 正在为您推敲方案...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Starters */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 pt-1">
          <p className="text-[9px] tracking-wider text-stone-500 uppercase font-semibold mb-1">您可以试着这样问：</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-[10px] text-left text-[#5a5753] bg-white hover:bg-stone-50 border border-stone-300 rounded px-2.5 py-1 transition-colors cursor-pointer truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Field */}
      <div className="p-3 border-t border-stone-300 bg-stone-50 flex items-center space-x-2">
        <input
          type="text"
          placeholder="给顾问写信，诉说您的身形与穿着构思..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-white border border-stone-300 text-xs rounded px-3 py-2.5 focus:outline-none focus:border-[#8c7355] text-stone-800 font-light"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white p-2.5 rounded transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
        >
          <Send size={14} />
        </button>
      </div>

      {/* Designer Presets Panel */}
      <div className="bg-stone-200/50 p-4 border-t border-stone-300">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-[10px] tracking-widest text-stone-600 font-semibold uppercase">Madame Qi 推荐定制款式 (一键试穿)</h5>
          <span className="text-[8px] bg-[#8c7355]/10 text-[#8c7355] px-1.5 py-0.5 rounded font-light font-mono">3 Presets</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => onApplyPreset(p.config)}
              className="bg-white hover:bg-[#faf9f6] border border-stone-200 rounded p-2.5 text-left transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-2xs"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-stone-900 group-hover:text-[#8c7355] transition-colors">{p.name}</span>
                <p className="text-[10px] text-stone-500 font-light">{p.desc}</p>
              </div>
              <div className="flex items-center space-x-1 text-[10px] text-[#8c7355] opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-wider">
                <span>上身试穿</span>
                <ArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
