import { IMAGES } from '../data';

interface HeroProps {
  onExplore: () => void;
  onScrollTo: (id: string) => void;
}

export default function Hero({ onExplore, onScrollTo }: HeroProps) {
  return (
    <section className="relative h-[92vh] w-full bg-[#FDFCF8] overflow-hidden">
      {/* Background Image with warm grading */}
      <div className="absolute inset-0 select-none">
        <div className="absolute inset-0 bg-stone-950/20 z-10 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-950/40 to-transparent z-10" />
        <img 
          src={IMAGES.hero} 
          alt="Maison Qi Qipao Editorial" 
          className="w-full h-full object-cover object-[center_35%] scale-105 animate-[subtle-zoom_20s_ease-out_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Styled text on top of the image */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col justify-end pb-16 lg:pb-24">
        <div className="max-w-2xl text-white space-y-6">
          <p className="text-[10px] lg:text-xs tracking-[0.3em] font-medium uppercase text-stone-200">
            祺 坊 · 春 夏 系 列 / SPRING & SUMMER 2026
          </p>
          
          <h1 className="serif-display text-4xl lg:text-6xl font-light tracking-wide leading-tight text-white">
            东方式优雅，<br className="sm:hidden" />以意重塑
          </h1>
          
          <p className="text-stone-300 font-light text-xs lg:text-sm tracking-widest leading-relaxed max-w-lg">
            不张扬，自成气场。祺坊（MAISON QĪ）融合中式传统量体剪裁与当代精巧廓形，甄选非遗香云纱及特级桑蚕丝，重塑属于现代日常的内敛高雅。
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button
              onClick={() => onScrollTo('shop')}
              className="text-white text-xs tracking-[0.2em] font-medium border-b border-white pb-1.5 hover:text-[#E5DACE] hover:border-[#E5DACE] transition-colors uppercase flex items-center space-x-2 cursor-pointer group"
            >
              <span>浏览祺裳系列 · EXPLORE THE COLLECTION</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
            
            <button
              onClick={onExplore}
              className="text-[#FDFCF8] text-xs tracking-[0.2em] font-semibold hover:bg-[#8B5E3C] hover:border-[#8B5E3C] hover:text-white transition-all uppercase border border-[#E5DACE]/40 px-6 py-3 rounded-sm cursor-pointer bg-white/5 backdrop-blur-xs"
            >
              量体高定主设服务
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe animation inline style */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.07); }
        }
      `}</style>
    </section>
  );
}
