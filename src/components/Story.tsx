import { IMAGES } from '../data';

export default function Story() {
  return (
    <section id="story" className="py-24 lg:py-32 bg-[#FDFCF8] px-6 lg:px-16 border-b border-[#E5DACE]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Beautiful tailor table image */}
        <div className="w-full lg:w-1/2 aspect-[4/3] rounded-sm overflow-hidden shadow-sm border border-[#E5DACE]/40 select-none">
          <img 
            src={IMAGES.atelier} 
            alt="Maison Qi Atelier Taylor Table" 
            className="w-full h-full object-cover hover:scale-103 transition-transform duration-[1s]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Craft story text (Matches 4th image layout exactly) */}
        <div className="w-full lg:w-1/2 space-y-6 lg:pr-6">
          <p className="text-[10px] tracking-[0.3em] text-[#8B5E3C] uppercase font-semibold font-sans">OUR HERITAGE & STORY</p>
          
          <h2 className="serif-display text-3xl lg:text-5xl font-light tracking-wide text-[#2D1B13] leading-tight">
            承于匠心，以意塑形 <br />
            Rooted in craft, <br />
            shaped by intention
          </h2>
          
          <div className="text-stone-700 font-light text-xs lg:text-sm tracking-widest leading-relaxed space-y-4">
            <p>
              祺坊（MAISON QĪ）坚信，真正的奢华隐于微末之间。一件温润的祺袍，非机器量产所能承载，而应倾注手作裁缝的温度与情感。
            </p>
            <p>
              每一件量体定制的祺裳，皆由金牌师傅独立制版。我们选用拥有百年非遗晒莨工艺的香云纱，和光泽细腻的苏州特级桑蚕丝，以苏绣劈线手工刺绣，确保每一缕丝线都诉说着对高尚品质的敬意。
            </p>
            <p>
              融经典传统神韵于当下摩登轮廓，我们创造的不止是一件衣裳，而是一个让您在当代都市里，自如表达东方儒雅的载体。
            </p>
          </div>

          <div className="pt-4">
            <button className="text-[#2D1B13] text-xs tracking-[0.2em] font-semibold border-b border-[#2D1B13] pb-1.5 hover:text-[#8B5E3C] hover:border-[#8B5E3C] transition-colors uppercase cursor-pointer">
              探寻祺坊手艺故事 · LEARN OUR STORY →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
