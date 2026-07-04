import { IMAGES } from '../data';

export default function Lookbook() {
  const images = [
    { src: IMAGES.embroidery, alt: 'Magnolia Hand Embroidery Detail', size: 'w-full md:w-[22%] aspect-[3/4] mt-12' },
    { src: IMAGES.modelGreen, alt: 'Sage Green Silk Qipao Model', size: 'w-full md:w-[26%] aspect-[2/3] mt-0' },
    { src: IMAGES.collarDetail, alt: 'Taupe High Collar & Pankou Details', size: 'w-full md:w-[22%] aspect-[3/4] mt-20' },
    { src: IMAGES.hero, alt: 'High Fashion Qipao Editorial Model', size: 'w-full md:w-[26%] aspect-[2/3] mt-8' }
  ];

  return (
    <section id="lookbook" className="py-24 lg:py-32 bg-[#F5EFED] px-6 lg:px-16 border-b border-[#E5DACE]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Lookbook Header */}
        <div className="text-center space-y-3">
          <p className="text-[10px] tracking-[0.3em] text-[#8B5E3C] uppercase font-semibold font-sans">EDITORIAL SECTION</p>
          <h2 className="serif-display text-3xl lg:text-5xl font-light tracking-wide text-[#2D1B13]">
            祺 坊 画 册 · The Lookbook
          </h2>
        </div>

        {/* Staggered Grid matching third uploaded image */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-4 lg:gap-8">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`${img.size} bg-stone-200 overflow-hidden group shadow-sm transition-all duration-700 hover:shadow-md border border-[#E5DACE]/30`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Call to action at bottom */}
        <div className="text-center pt-8">
          <button className="text-[#2D1B13] text-xs tracking-[0.2em] font-semibold border-b border-[#2D1B13] pb-1.5 hover:text-[#8B5E3C] hover:border-[#8B5E3C] transition-colors uppercase cursor-pointer">
            浏览整辑主题画册 · VIEW FULL LOOKBOOK →
          </button>
        </div>

      </div>
    </section>
  );
}
