import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Sparkles, Scissors, Info, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

interface CollectionsProps {
  onCustomiseProduct: (product: Product) => void;
  onAddToCart: (item: any) => void;
  setCartOpen: (open: boolean) => void;
}

export default function Collections({ onCustomiseProduct, onAddToCart, setCartOpen }: CollectionsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', name: '全部设计', count: '3 件精品' },
    { id: 'atelier', name: '真丝工坊系列', count: '12 Pieces' },
    { id: 'modern', name: '都市改良日常', count: '8 Pieces' },
    { id: 'heritage', name: '非遗苏绣定制', count: '10 Pieces' }
  ];

  const handleQuickAdd = (product: Product) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      isCustom: false,
    });
    setCartOpen(true);
  };

  return (
    <section id="shop" className="py-24 lg:py-32 bg-[#FDFCF8] px-6 lg:px-16 border-b border-[#E5DACE]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Category Header (Based on User's Second Image) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DACE] pb-8 gap-6">
          <div className="max-w-xl space-y-4">
            <p className="text-[10px] tracking-[0.25em] text-[#8B5E3C] uppercase font-semibold font-sans">MAISON QĪ SELECTS</p>
            <h2 className="serif-display text-3xl lg:text-5xl font-light tracking-wide text-[#2D1B13] leading-tight">
              独家高定 · 呈献现代雅橱
            </h2>
          </div>
          <div className="flex items-center space-x-6 text-[11px] tracking-[0.2em] font-semibold text-[#8B5E3C] font-sans">
            <span>CURATED COUTURE</span>
          </div>
        </div>

        {/* E-commerce Grid - Matching the 3 large vertical cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-6 rounded-xs transition-luxury">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Badges */}
                <span className="absolute top-4 left-4 bg-[#FDFCF8]/90 backdrop-blur-xs text-[9px] tracking-widest text-[#2D1B13] border border-[#E5DACE] px-3 py-1 uppercase rounded-sm font-semibold font-sans">
                  {product.category === 'atelier' ? '真丝工坊' : product.category === 'modern' ? '改良日常' : '非遗香云纱'}
                </span>

                {/* Hover Quick Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onCustomiseProduct(product);
                    }}
                    className="flex-1 bg-[#2D1B13] hover:bg-[#4A2F22] text-white text-[10px] font-semibold tracking-widest py-2.5 px-3 rounded-sm flex items-center justify-center space-x-1.5 transition-colors uppercase font-sans"
                  >
                    <Scissors size={10} className="text-amber-300" />
                    <span>高级量身定制</span>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                    className="bg-[#8B5E3C] hover:bg-[#a07450] text-white text-[10px] py-2.5 px-3.5 rounded-sm transition-colors"
                    title="加购物车"
                  >
                    <ShoppingBag size={12} />
                  </button>
                </div>
              </div>

              {/* Product Information under Card */}
              <div className="flex justify-between items-start pt-1">
                <div className="space-y-1">
                  <h3 className="serif-display text-lg text-[#2D1B13] font-normal leading-snug group-hover:text-[#8B5E3C] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                    {product.englishName}
                  </p>
                  <p className="text-sm font-semibold text-[#2D1B13] pt-1">
                    ¥{product.price.toLocaleString()}{' '}
                    <span className="text-[10px] text-stone-500 font-light tracking-wider">起 (含面料与裁剪)</span>
                  </p>
                </div>
                
                {/* Arrow indicator matches look and feel */}
                <div className="text-[#8B5E3C] group-hover:text-[#2D1B13] group-hover:translate-x-1 transition-all duration-300 pt-1.5">
                  <span className="serif-display text-xl font-light">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details Modal (Quick View) */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D1B13]/60 backdrop-blur-sm">
            <div 
              className="bg-[#FDFCF8] max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] border border-[#E5DACE]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 text-stone-600 hover:text-stone-900 p-2 cursor-pointer bg-[#FDFCF8]/80 rounded-full backdrop-blur-xs"
              >
                <span className="serif-display text-lg">✕</span>
              </button>

              {/* Left Side: Product Image */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full relative bg-stone-200">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] tracking-widest text-[#8B5E3C] uppercase font-semibold font-sans">
                      {selectedProduct.category === 'atelier' ? '真丝工坊' : selectedProduct.category === 'modern' ? '改良日常' : '非遗香云纱'}
                    </span>
                    <h3 className="serif-display text-2xl text-[#2D1B13] font-normal mt-1">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono tracking-widest uppercase mt-0.5">
                      {selectedProduct.englishName}
                    </p>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>

                  <div className="border-t border-[#E5DACE] pt-4">
                    <h4 className="text-[10px] tracking-widest text-[#8B5E3C] uppercase font-bold font-sans mb-2">手作详情 (Crafting specs)</h4>
                    <ul className="text-xs text-stone-600 font-light space-y-2">
                      {selectedProduct.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#8B5E3C] mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-700 font-light bg-[#F5EFED] p-3 rounded-sm border border-[#E5DACE]/40">
                    <div><span className="font-semibold text-[#2D1B13]">面料:</span> {selectedProduct.specs.fabric}</div>
                    <div><span className="font-semibold text-[#2D1B13]">版型:</span> {selectedProduct.specs.silhouette}</div>
                    <div><span className="font-semibold text-[#2D1B13]">领型:</span> {selectedProduct.specs.collar}</div>
                    <div><span className="font-semibold text-[#2D1B13]">工艺:</span> {selectedProduct.specs.craft}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-[#E5DACE]">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-stone-500 font-light">起价 / Base price</span>
                    <span className="text-xl font-semibold text-[#2D1B13]">¥{selectedProduct.price.toLocaleString()}</span>
                  </div>

                  <div className="flex space-x-3">
                    {/* Customize Button */}
                    <button
                      onClick={() => {
                        onCustomiseProduct(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-[#2D1B13] hover:bg-[#4A2F22] text-white text-[11px] font-semibold tracking-widest py-3 rounded-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer uppercase font-sans"
                    >
                      <Scissors size={12} className="text-amber-300" />
                      <span>开启高级在线定制</span>
                    </button>

                    {/* Quick Purchase */}
                    <button
                      onClick={() => {
                        handleQuickAdd(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="border border-[#E5DACE] hover:border-[#2D1B13] text-[#2D1B13] text-[11px] font-semibold py-3 px-4 rounded-sm transition-colors cursor-pointer"
                      title="选购标准尺码"
                    >
                      选购现货
                    </button>
                  </div>
                  <p className="text-[9px] text-stone-400 text-center font-light leading-normal">
                    *「现货」以标准 M/L 码发货，2个工作日内发出。「在线定制」支持个性量体，手工定制。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
