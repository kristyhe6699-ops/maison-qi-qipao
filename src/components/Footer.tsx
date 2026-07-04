import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FDFCF8] text-[#2D1B13] border-t border-[#E5DACE]">
      
      {/* Join the Maison (Dark Sign-up banner - matches 5th image exactly) */}
      <div className="bg-[#2D1B13] text-white py-20 px-6 lg:px-16 text-center select-none">
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold font-sans text-[#E5DACE]">STAY CONNECTED</p>
          
          <h2 className="serif-display text-3xl lg:text-5xl font-light tracking-wide">
            加入祺会 · Join the Maison
          </h2>
          
          <p className="text-stone-300 font-light text-xs lg:text-sm tracking-widest leading-relaxed">
            订阅祺坊手札，获取新品高定首发、大师工坊故事，以及高定会员专属活动邀请。
          </p>

          {subscribed ? (
            <div className="p-4 bg-[#8B5E3C]/20 text-[#E5DACE] rounded-sm border border-[#E5DACE]/30 text-xs font-light tracking-wider inline-block">
              ✓ 感谢您的加入。一封祺会入会礼已寄往您的购物雅箱，敬请查收。
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch justify-center max-w-md mx-auto gap-3 pt-4">
              <input 
                type="email" 
                required
                placeholder="您的电子邮箱 / Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/30 border border-[#E5DACE]/20 rounded-sm px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#8B5E3C] tracking-wider flex-1"
              />
              <button 
                type="submit"
                className="bg-[#8B5E3C] hover:bg-[#a07450] text-white text-xs font-semibold tracking-[0.25em] py-3 px-6 uppercase rounded-sm transition-colors cursor-pointer flex items-center justify-center space-x-1 font-sans"
              >
                <span>订阅手札 SUBSCRIBE</span>
                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Directory Links Footer (Matches 5th image bottom half exactly) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <span className="serif-display text-xl tracking-[0.3em] font-light text-[#2D1B13] block italic">
            MAISON QĪ
          </span>
          <p className="text-stone-500 font-light text-xs tracking-wider leading-relaxed">
            致敬东方风骨的高级量体祺袍定制工坊。以意重塑经典，用恒温手作，温暖每一位懂得内敛优雅的现代主顾。
          </p>
        </div>

        {/* Shop Column */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.2em] font-bold text-[#2D1B13] uppercase font-sans">SHOP · 祺裳系列</h4>
          <ul className="space-y-2 text-xs font-light text-[#7A665A] tracking-wider">
            <li><a href="#shop" className="hover:text-[#8B5E3C] transition-colors">最新上架 New Arrivals</a></li>
            <li><a href="#shop" className="hover:text-[#8B5E3C] transition-colors">真丝工坊 Silk Essentials</a></li>
            <li><a href="#shop" className="hover:text-[#8B5E3C] transition-colors">改良日常 Modern Pieces</a></li>
            <li><a href="#shop" className="hover:text-[#8B5E3C] transition-colors">非遗重工 Heritage Couture</a></li>
          </ul>
        </div>

        {/* About Column */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.2em] font-bold text-[#2D1B13] uppercase font-sans">ABOUT · 祺坊匠心</h4>
          <ul className="space-y-2 text-xs font-light text-[#7A665A] tracking-wider">
            <li><a href="#story" className="hover:text-[#8B5E3C] transition-colors">祺坊故事 Our Story</a></li>
            <li><a href="#story" className="hover:text-[#8B5E3C] transition-colors">手工裁剪大师 Craftsmanship</a></li>
            <li><a href="#story" className="hover:text-[#8B5E3C] transition-colors">非遗晒莨工艺 Sustainability</a></li>
            <li><button className="hover:text-[#8B5E3C] transition-colors text-left cursor-pointer">加入工坊 Careers</button></li>
          </ul>
        </div>

        {/* Help Column */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.2em] font-bold text-[#2D1B13] uppercase font-sans">HELP · 会员服务</h4>
          <ul className="space-y-2 text-xs font-light text-[#7A665A] tracking-wider">
            <li><button className="hover:text-[#8B5E3C] transition-colors text-left cursor-pointer">联系专属裁缝 Contact Us</button></li>
            <li><button className="hover:text-[#8B5E3C] transition-colors text-left cursor-pointer">配送与工时 Delivery</button></li>
            <li><button className="hover:text-[#8B5E3C] transition-colors text-left cursor-pointer">量体与尺码指南 Size Guide</button></li>
            <li><button className="hover:text-[#8B5E3C] transition-colors text-left cursor-pointer">祺袍面料保养 Care Instructions</button></li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[#E5DACE] py-6 text-center text-[10px] text-stone-500 font-light tracking-widest max-w-7xl mx-auto px-6">
        © 2026 MAISON QĪ (祺坊) COUTURE ATELIER. ALL RIGHTS RESERVED.
      </div>

    </footer>
  );
}
