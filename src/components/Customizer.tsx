import { useState, useEffect } from 'react';
import { CustomizationSelections, CartItem, Product } from '../types';
import { 
  SILHOUETTE_OPTIONS, 
  COLLAR_OPTIONS, 
  SLEEVE_OPTIONS, 
  FABRIC_OPTIONS, 
  PANKOU_OPTIONS, 
  EMBROIDERY_OPTIONS,
  IMAGES
} from '../data';
import { Sparkles, Scissors, Info, ShieldCheck, CheckCircle2, ChevronRight, Ruler } from 'lucide-react';
import AiStylist from './AiStylist';

interface CustomizerProps {
  initialProduct?: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  setCartOpen: (open: boolean) => void;
}

const defaultSelections: CustomizationSelections = {
  id: '',
  silhouette: 'midi',
  collar: 'high',
  sleeve: 'cap',
  fabric: 'mulberry_silk',
  pankou: 'straight',
  embroidery: 'magnolia',
  measurements: {
    height: '165',
    bust: '84',
    waist: '66',
    hips: '90',
    shoulder: '38',
    remarks: ''
  }
};

export default function Customizer({ initialProduct, onClose, onAddToCart, setCartOpen }: CustomizerProps) {
  const [selections, setSelections] = useState<CustomizationSelections>(defaultSelections);
  const [activeTab, setActiveTab] = useState<'cut' | 'sleeve' | 'fabric' | 'measure'>('cut');
  const [showAiAdvisor, setShowAiAdvisor] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Apply initial product setups if defined
  useEffect(() => {
    if (initialProduct) {
      const isHeritage = initialProduct.category === 'heritage';
      const isModern = initialProduct.category === 'modern';
      
      setSelections({
        ...defaultSelections,
        silhouette: isHeritage ? 'classic' : isModern ? 'mini' : 'midi',
        collar: isModern ? 'teardrop' : 'high',
        sleeve: isModern ? 'none' : isHeritage ? 'long' : 'cap',
        fabric: isHeritage ? 'xiangyunsha' : isModern ? 'heavy_crepe' : 'mulberry_silk',
        embroidery: isHeritage ? 'bamboo' : isModern ? 'none' : 'magnolia',
        pankou: isHeritage ? 'straight' : isModern ? 'pipa' : 'floral',
      });
    }
  }, [initialProduct]);

  // Dynamic price calculation
  const getSelectionsPrice = () => {
    const silPrice = SILHOUETTE_OPTIONS.find(o => o.id === selections.silhouette)?.price || 0;
    const colPrice = COLLAR_OPTIONS.find(o => o.id === selections.collar)?.price || 0;
    const slvPrice = SLEEVE_OPTIONS.find(o => o.id === selections.sleeve)?.price || 0;
    const fabPrice = FABRIC_OPTIONS.find(o => o.id === selections.fabric)?.price || 0;
    const pnkPrice = PANKOU_OPTIONS.find(o => o.id === selections.pankou)?.price || 0;
    const embPrice = EMBROIDERY_OPTIONS.find(o => o.id === selections.embroidery)?.price || 0;

    // Base craftsmanship setup price
    const baseCraftPrice = 1800;
    return baseCraftPrice + silPrice + colPrice + slvPrice + fabPrice + pnkPrice + embPrice;
  };

  const currentPrice = getSelectionsPrice();

  const handleApplyPreset = (presetSelections: Partial<CustomizationSelections>) => {
    setSelections(prev => ({
      ...prev,
      ...presetSelections
    }));
  };

  const handleAddToBespokeCart = () => {
    setIsAdding(true);
    
    setTimeout(() => {
      const customItem: CartItem = {
        id: `bespoke-${Date.now()}`,
        name: `祺坊高定 · ${FABRIC_OPTIONS.find(f => f.id === selections.fabric)?.name}定制祺袍`,
        price: currentPrice,
        image: selections.fabric === 'xiangyunsha' ? IMAGES.collarDetail : selections.fabric === 'heavy_crepe' ? IMAGES.modelGreen : IMAGES.embroidery,
        quantity: 1,
        isCustom: true,
        customSelections: selections,
      };

      onAddToCart(customItem);
      setIsAdding(false);
      setCartOpen(true);
      onClose();
    }, 800);
  };

  // Resolve visual colors based on selected fabric
  const getFabricColor = () => {
    switch(selections.fabric) {
      case 'xiangyunsha': return '#1d1916'; // Mysterious charcoal
      case 'heavy_crepe': return '#bfae9c'; // Rose gold beige
      case 'brocade': return '#c48b3c'; // Lustrous amber
      case 'mulberry_silk':
      default:
        return '#fdfaf5'; // Cream white
    }
  };

  const getFabricTexture = () => {
    switch(selections.fabric) {
      case 'xiangyunsha': return 'url(#xiangyun-pattern)';
      case 'heavy_crepe': return 'url(#crepe-pattern)';
      case 'brocade': return 'url(#brocade-pattern)';
      case 'mulberry_silk':
      default:
        return 'url(#silk-sheen)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-0 md:p-6 lg:p-12 bg-[#2D1B13]/60 backdrop-blur-sm">
      <div className="w-full h-full max-w-7xl bg-[#FDFCF8] rounded-sm shadow-2xl flex flex-col overflow-hidden relative border border-[#E5DACE]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#F5EFED] border-b border-[#E5DACE] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scissors size={18} className="text-[#8B5E3C]" />
            <div>
              <h2 className="serif-display text-base tracking-wider font-normal text-[#2D1B13] flex items-center gap-2">
                祺坊在线量身高级定制室
                <span className="text-[10px] bg-[#8B5E3C] text-[#FDFCF8] font-sans tracking-widest px-2 py-0.5 rounded-sm font-semibold uppercase">
                  Bespoke Studio
                </span>
              </h2>
              <p className="text-[10px] text-stone-600 font-light tracking-wide">
                主裁剪师：Madame Qi · 全程手工独立编织裁剪与打样
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-600 hover:text-[#2D1B13] font-semibold transition-colors p-2 text-sm serif-display cursor-pointer"
          >
            返回大厅 ✕
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Column 1: Interactive Vector SVG Visualizer */}
          <div className="w-full lg:w-[38%] bg-[#F5EFED] p-6 flex flex-col justify-between border-r border-[#E5DACE] select-none overflow-y-auto">
            <div className="text-center space-y-1 mb-2">
              <span className="text-[9px] tracking-[0.2em] uppercase font-semibold font-sans text-[#8B5E3C]">DYNAMIC TAILOR VISUALIZER</span>
              <h3 className="serif-display text-sm text-[#2D1B13] font-semibold">高定效果拟真展示</h3>
            </div>

            {/* Dynamic SVG Canvas Frame */}
            <div className="flex-1 max-h-[380px] lg:max-h-[480px] flex items-center justify-center relative">
              
              <svg 
                viewBox="0 0 400 600" 
                className="w-full h-full max-w-[340px] drop-shadow-2xl"
              >
                <defs>
                  {/* Silk Sheen Texture */}
                  <linearGradient id="silk-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="30%" stopColor={getFabricColor()} />
                    <stop offset="70%" stopColor={getFabricColor()} />
                    <stop offset="100%" stopColor="#d2c8bc" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Brocade Pattern */}
                  <pattern id="brocade-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill={getFabricColor()} />
                    {/* Golden flower motifs */}
                    <path d="M 20,5 L 25,15 L 35,20 L 25,25 L 20,35 L 15,25 L 5,20 L 15,15 Z" fill="#dfbe6b" fillOpacity="0.25" />
                    <circle cx="20" cy="20" r="3" fill="#ffffff" fillOpacity="0.4" />
                  </pattern>

                  {/* Xiangyunsha Texture */}
                  <pattern id="xiangyun-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                    <rect width="60" height="60" fill={getFabricColor()} />
                    {/* Marbled organic paths */}
                    <path d="M0,10 Q20,5 30,25 T60,20 T10,50" fill="none" stroke="#2c2420" strokeWidth="1" strokeOpacity="0.4" />
                    <path d="M10,0 Q40,30 20,50 T60,40" fill="none" stroke="#120f0d" strokeWidth="1.5" strokeOpacity="0.5" />
                  </pattern>

                  {/* Heavy Crepe Texture */}
                  <linearGradient id="crepe-pattern" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ebdcd2" />
                    <stop offset="50%" stopColor={getFabricColor()} />
                    <stop offset="100%" stopColor="#a39687" />
                  </linearGradient>
                </defs>

                {/* Draw Background Frame */}
                <rect x="20" y="20" width="360" height="560" rx="4" fill="#FDFCF8" fillOpacity="0.5" stroke="#E5DACE" strokeWidth="1" />

                {/* SVG LAYERS UPDATE DYNAMICALLY */}
                
                {/* 1. Draw Body/Silhouette Base */}
                {/* Classic long body */}
                {selections.silhouette === 'classic' && (
                  <path 
                    d="M 150,110 Q 140,250 120,400 T 115,550 L 285,550 T 280,400 Q 260,250 250,110 Z" 
                    fill={getFabricTexture()} 
                    stroke="#1a120c" 
                    strokeWidth="1.5"
                  />
                )}
                {/* Midi medium length */}
                {selections.silhouette === 'midi' && (
                  <path 
                    d="M 150,110 Q 140,250 125,350 T 130,480 L 270,480 T 275,350 Q 260,250 250,110 Z" 
                    fill={getFabricTexture()} 
                    stroke="#1a120c" 
                    strokeWidth="1.5"
                  />
                )}
                {/* Mini modern short */}
                {selections.silhouette === 'mini' && (
                  <path 
                    d="M 150,110 Q 140,230 130,320 T 140,410 L 260,410 T 270,320 Q 260,230 250,110 Z" 
                    fill={getFabricTexture()} 
                    stroke="#1a120c" 
                    strokeWidth="1.5"
                  />
                )}

                {/* 2. Draw Sleeves Overlay */}
                {/* Cap Sleeves */}
                {selections.sleeve === 'cap' && (
                  <>
                    <path d="M 150,110 Q 135,115 130,135 Q 138,145 152,140 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                    <path d="M 250,110 Q 265,115 270,135 Q 262,145 248,140 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                  </>
                )}
                {/* Elbow Sleeves */}
                {selections.sleeve === 'elbow' && (
                  <>
                    <path d="M 150,110 L 115,140 L 122,175 L 152,140 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                    <path d="M 250,110 L 285,140 L 278,175 L 248,140 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                  </>
                )}
                {/* Long sleeves */}
                {selections.sleeve === 'long' && (
                  <>
                    <path d="M 150,110 L 90,170 L 100,210 L 153,135 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                    <path d="M 250,110 L 310,170 L 300,210 L 247,135 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                  </>
                )}

                {/* 3. Draw Collar Area */}
                {/* Low collar */}
                {selections.collar === 'low' && (
                  <path d="M 175,108 C 175,98 225,98 225,108 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1" />
                )}
                {/* High collar */}
                {selections.collar === 'high' && (
                  <path d="M 172,110 C 172,85 228,85 228,110 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1.5" />
                )}
                {/* Teardrop Keyhole collar */}
                {selections.collar === 'teardrop' && (
                  <>
                    <path d="M 174,110 C 174,90 226,90 226,110 Z" fill={getFabricTexture()} stroke="#1a120c" strokeWidth="1.5" />
                    {/* The cutout waterdrop */}
                    <path d="M 200,118 Q 206,128 200,138 Q 194,128 200,118 Z" fill="#ebe9e2" stroke="#1a120c" strokeWidth="1" />
                  </>
                )}

                {/* 4. Draw Embroidery Motifs */}
                {selections.embroidery === 'magnolia' && (
                  <g stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.85">
                    {/* Branches */}
                    <path d="M 175,250 Q 185,180 205,150 T 215,130" stroke="#786c5f" strokeWidth="1" />
                    <path d="M 185,180 Q 170,160 165,145" stroke="#786c5f" strokeWidth="1" />
                    {/* Flowers (Magnolia blossoms) */}
                    <path d="M 205,150 Q 200,140 205,135 Q 212,142 205,150" fill="#ffffff" />
                    <path d="M 215,130 Q 210,120 215,115 Q 222,122 215,130" fill="#ffffff" />
                    <path d="M 165,145 Q 160,138 165,132 Q 171,138 165,145" fill="#ffffff" />
                    {/* Falling petals */}
                    <path d="M 190,210 Q 185,215 188,222 Z" fill="#ffffff" />
                    <path d="M 210,230 Q 205,236 208,242 Z" fill="#ffffff" />
                  </g>
                )}

                {/* Plum Blossom pattern */}
                {selections.embroidery === 'plum' && (
                  <g opacity="0.9">
                    {/* Branch */}
                    <path d="M 230,280 Q 200,230 205,170 T 195,120" stroke="#52483e" strokeWidth="1.5" fill="none" />
                    {/* Red Plum blossoms */}
                    <circle cx="205" cy="170" r="5" fill="#c2410c" />
                    <circle cx="198" cy="140" r="4" fill="#c2410c" />
                    <circle cx="218" cy="210" r="6" fill="#c2410c" />
                    <circle cx="195" cy="120" r="3.5" fill="#c2410c" />
                    {/* Flower details */}
                    <circle cx="205" cy="170" r="1.5" fill="#fbbf24" />
                    <circle cx="218" cy="210" r="2" fill="#fbbf24" />
                  </g>
                )}

                {/* Bamboo pattern */}
                {selections.embroidery === 'bamboo' && (
                  <g fill="none" stroke="#2d5236" opacity="0.8">
                    {/* Stems */}
                    <path d="M 160,340 L 175,220 L 182,140" strokeWidth="2" />
                    <path d="M 140,300 L 152,200" strokeWidth="1.2" />
                    {/* Bamboo leaves */}
                    <path d="M 175,220 Q 190,210 205,215 Q 185,225 175,220" fill="#2d5236" />
                    <path d="M 175,220 Q 160,205 155,190 Q 168,208 175,220" fill="#2d5236" />
                    <path d="M 182,140 Q 200,135 210,145 Q 190,150 182,140" fill="#2d5236" />
                    <path d="M 152,200 Q 130,195 120,185 Q 140,198 152,200" fill="#2d5236" />
                  </g>
                )}

                {/* 5. Draw Pankou Buttons (Placket curve) */}
                {/* Diagonal seam placket */}
                <path d="M 200,110 Q 225,120 248,140" fill="none" stroke="#1a120c" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Straight Pankou */}
                {selections.pankou === 'straight' && (
                  <g fill="#1a120c">
                    {/* First button at neck */}
                    <rect x="195" y="112" width="10" height="2" rx="1" />
                    <circle cx="200" cy="113" r="2" />
                    {/* Button on placket */}
                    <rect x="220" y="122" width="10" height="2" rx="1" transform="rotate(15, 225, 123)" />
                    <circle cx="225" cy="123" r="2" />
                  </g>
                )}

                {/* Pipa circular loops */}
                {selections.pankou === 'pipa' && (
                  <g fill="none" stroke="#1a120c" strokeWidth="1">
                    {/* Knot 1 */}
                    <circle cx="196" cy="113" r="3.5" fill="#8c7355" />
                    <circle cx="204" cy="113" r="3.5" fill="#8c7355" />
                    {/* Knot 2 */}
                    <circle cx="222" cy="123" r="3.5" fill="#8c7355" />
                    <circle cx="230" cy="123" r="3.5" fill="#8c7355" />
                  </g>
                )}

                {/* Floral elegant knots */}
                {selections.pankou === 'floral' && (
                  <g fill="#dfbe6b" stroke="#1a120c" strokeWidth="0.5">
                    {/* Flower shape at collar */}
                    <circle cx="200" cy="113" r="4.5" />
                    <circle cx="196" cy="110" r="2" fill="#c2410c" />
                    <circle cx="204" cy="110" r="2" fill="#c2410c" />
                    <circle cx="200" cy="117" r="2" fill="#c2410c" />
                    
                    {/* Flower shape at chest */}
                    <circle cx="226" cy="123" r="4.5" />
                    <circle cx="222" cy="120" r="2" fill="#c2410c" />
                    <circle cx="230" cy="120" r="2" fill="#c2410c" />
                  </g>
                )}

                {/* Side split accent indicators */}
                <path d="M 125,350 Q 120,380 120,410" fill="none" stroke="#1a120c" strokeWidth="0.5" />
                <path d="M 275,350 Q 280,380 280,410" fill="none" stroke="#1a120c" strokeWidth="0.5" />
              </svg>

            </div>

            {/* Design summary tags */}
            <div className="bg-[#f0eee8] p-3 rounded text-[10px] space-y-1 text-stone-600 font-mono border border-stone-300">
              <div className="flex justify-between">
                <span>[版型]</span>
                <span className="text-stone-900 font-medium">
                  {SILHOUETTE_OPTIONS.find(o => o.id === selections.silhouette)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>[领型]</span>
                <span className="text-stone-900 font-medium">
                  {COLLAR_OPTIONS.find(o => o.id === selections.collar)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>[袖型]</span>
                <span className="text-stone-900 font-medium">
                  {SLEEVE_OPTIONS.find(o => o.id === selections.sleeve)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>[面料]</span>
                <span className="text-stone-900 font-medium">
                  {FABRIC_OPTIONS.find(o => o.id === selections.fabric)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>[绣花]</span>
                <span className="text-stone-900 font-medium">
                  {EMBROIDERY_OPTIONS.find(o => o.id === selections.embroidery)?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Parameters Panel & tabs */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-[#f5f4f0] p-6 lg:p-8 space-y-6">
            
            {/* Customizer Tabs Navigation */}
            <div className="flex border-b border-stone-200">
              <button
                onClick={() => setActiveTab('cut')}
                className={`pb-3 text-xs tracking-widest uppercase font-medium mr-8 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'cut' ? 'border-[#8c7355] text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                1. 剪裁与领型 (Cut & Collar)
              </button>
              <button
                onClick={() => setActiveTab('sleeve')}
                className={`pb-3 text-xs tracking-widest uppercase font-medium mr-8 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'sleeve' ? 'border-[#8c7355] text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                2. 袖型与盘扣 (Sleeve & Frog)
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`pb-3 text-xs tracking-widest uppercase font-medium mr-8 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'fabric' ? 'border-[#8c7355] text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                3. 面料与刺绣 (Fabric & Art)
              </button>
              <button
                onClick={() => setActiveTab('measure')}
                className={`pb-3 text-xs tracking-widest uppercase font-medium border-b-2 transition-all cursor-pointer ${
                  activeTab === 'measure' ? 'border-[#8c7355] text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                4. 专属量体 (Bespoke Size)
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-1">
              
              {/* Tab 1: Cut & Collar */}
              {activeTab === 'cut' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Silhouette selection */}
                  <div className="space-y-4">
                    <h4 className="serif-display text-sm text-stone-900 tracking-wider">选择整体剪裁 · Silhouette Selection</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {SILHOUETTE_OPTIONS.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => setSelections(prev => ({ ...prev, silhouette: option.id as any }))}
                          className={`border rounded p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                            selections.silhouette === option.id 
                              ? 'border-[#8c7355] bg-amber-50/20 shadow-xs' 
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-stone-900">{option.name}</span>
                              <span className="text-[9px] text-stone-400 font-mono tracking-wider">{option.tag}</span>
                            </div>
                            <p className="text-[10px] text-stone-500 font-light leading-normal">{option.desc}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-semibold text-stone-800">
                              {option.price === 0 ? '标配包揽' : `+ ¥${option.price}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Collar Selection */}
                  <div className="space-y-4">
                    <h4 className="serif-display text-sm text-stone-900 tracking-wider">选择领型立领 · Neckline Design</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {COLLAR_OPTIONS.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => setSelections(prev => ({ ...prev, collar: option.id as any }))}
                          className={`border rounded p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                            selections.collar === option.id 
                              ? 'border-[#8c7355] bg-amber-50/20 shadow-xs' 
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <div className="space-y-1 mb-3">
                            <span className="text-xs font-semibold text-stone-900">{option.name}</span>
                            <p className="text-[10px] text-stone-500 font-light leading-normal">{option.desc}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-stone-200/50">
                            <span className="text-[8px] text-stone-400 font-mono tracking-wider">{option.tag}</span>
                            <span className="text-xs font-semibold text-stone-800">
                              {option.price === 0 ? '标准' : `+¥${option.price}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Sleeve & Frog */}
              {activeTab === 'sleeve' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Sleeve Type */}
                  <div className="space-y-4">
                    <h4 className="serif-display text-sm text-stone-900 tracking-wider">选择袖型裁剪 · Sleeve Length</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SLEEVE_OPTIONS.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => setSelections(prev => ({ ...prev, sleeve: option.id as any }))}
                          className={`border rounded p-4 flex items-start justify-between cursor-pointer transition-all duration-300 ${
                            selections.sleeve === option.id 
                              ? 'border-[#8c7355] bg-amber-50/20 shadow-xs' 
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <span className="text-xs font-semibold text-stone-900">{option.name}</span>
                            <p className="text-[10px] text-stone-500 font-light leading-normal">{option.desc}</p>
                            <span className="inline-block text-[8px] text-stone-400 font-mono uppercase mt-1">{option.tag}</span>
                          </div>
                          <span className="text-xs font-semibold text-stone-800 flex-shrink-0">
                            {option.price === 0 ? '标准' : `+¥${option.price}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pankou frog buttons */}
                  <div className="space-y-4">
                    <h4 className="serif-display text-sm text-stone-900 tracking-wider">选择手工盘扣 · Handmade Buttons</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PANKOU_OPTIONS.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => setSelections(prev => ({ ...prev, pankou: option.id as any }))}
                          className={`border rounded p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                            selections.pankou === option.id 
                              ? 'border-[#8c7355] bg-amber-50/20 shadow-xs' 
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <div className="space-y-1 mb-3">
                            <span className="text-xs font-semibold text-stone-900">{option.name}</span>
                            <p className="text-[10px] text-stone-500 font-light leading-normal">{option.desc}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-stone-200/50">
                            <span className="text-[8px] text-stone-400 font-mono tracking-wider">{option.tag}</span>
                            <span className="text-xs font-semibold text-stone-800">
                              {option.price === 0 ? '标准' : `+¥${option.price}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Fabric & Embroidery */}
              {activeTab === 'fabric' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Fabric choices */}
                  <div className="space-y-4">
                    <h4 className="serif-display text-sm text-stone-900 tracking-wider">选择高定奢华面料 · Premium Fabrics</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {FABRIC_OPTIONS.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => setSelections(prev => ({ ...prev, fabric: option.id as any }))}
                          className={`border rounded p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                            selections.fabric === option.id 
                              ? 'border-[#8c7355] bg-amber-50/20 shadow-xs' 
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Visual fabric color circle */}
                            <div className={`w-8 h-8 rounded-full border ${option.color} flex-shrink-0 shadow-inner`} />
                            
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-stone-900">{option.name}</span>
                                <span className="text-[9px] text-stone-400 font-mono">{option.tag}</span>
                              </div>
                              <p className="text-[10px] text-stone-500 font-light leading-normal">{option.desc}</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-stone-800 flex-shrink-0">
                            +¥{option.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Embroidery selection */}
                  <div className="space-y-4">
                    <h4 className="serif-display text-sm text-stone-900 tracking-wider">选择手工苏绣花样 · Su Embroidery Motif</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {EMBROIDERY_OPTIONS.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => setSelections(prev => ({ ...prev, embroidery: option.id as any }))}
                          className={`border rounded p-4 flex items-start justify-between cursor-pointer transition-all duration-300 ${
                            selections.embroidery === option.id 
                              ? 'border-[#8c7355] bg-amber-50/20 shadow-xs' 
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <span className="text-xs font-semibold text-stone-900">{option.name}</span>
                            <p className="text-[10px] text-stone-500 font-light leading-normal">{option.desc}</p>
                            <span className="inline-block text-[8px] text-stone-400 font-mono mt-1 uppercase">{option.tag}</span>
                          </div>
                          <span className="text-xs font-semibold text-stone-800 flex-shrink-0">
                            {option.price === 0 ? '不加刺绣' : `+¥${option.price}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Sizing */}
              {activeTab === 'measure' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-stone-100 p-4 rounded-xs flex items-start space-x-3 border border-stone-200">
                    <Ruler className="text-amber-800 flex-shrink-0 mt-0.5" size={16} />
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-stone-800">匠心独运 · 精准量体</span>
                      <p className="text-[10px] text-stone-500 font-light leading-relaxed">
                        祺袍讲究「量体贴身」。请提供您的净尺寸（厘米/cm），Madame Qi 将在裁剪时为您适当预留舒适空间。如有特殊体型（如驼背、耸肩），请在备注中详细说明。
                      </p>
                    </div>
                  </div>

                  {/* Input measurements form */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest text-stone-600 uppercase font-medium">身高 (Height)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={selections.measurements.height}
                          onChange={(e) => setSelections(prev => ({ 
                            ...prev, 
                            measurements: { ...prev.measurements, height: e.target.value } 
                          }))}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#8c7355]"
                          placeholder="cm"
                        />
                        <span className="absolute right-2 top-2.5 text-[9px] text-stone-400">cm</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest text-stone-600 uppercase font-medium">胸围 (Bust)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={selections.measurements.bust}
                          onChange={(e) => setSelections(prev => ({ 
                            ...prev, 
                            measurements: { ...prev.measurements, bust: e.target.value } 
                          }))}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#8c7355]"
                          placeholder="cm"
                        />
                        <span className="absolute right-2 top-2.5 text-[9px] text-stone-400">cm</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest text-stone-600 uppercase font-medium">腰围 (Waist)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={selections.measurements.waist}
                          onChange={(e) => setSelections(prev => ({ 
                            ...prev, 
                            measurements: { ...prev.measurements, waist: e.target.value } 
                          }))}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#8c7355]"
                          placeholder="cm"
                        />
                        <span className="absolute right-2 top-2.5 text-[9px] text-stone-400">cm</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest text-stone-600 uppercase font-medium">臀围 (Hips)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={selections.measurements.hips}
                          onChange={(e) => setSelections(prev => ({ 
                            ...prev, 
                            measurements: { ...prev.measurements, hips: e.target.value } 
                          }))}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#8c7355]"
                          placeholder="cm"
                        />
                        <span className="absolute right-2 top-2.5 text-[9px] text-stone-400">cm</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest text-stone-600 uppercase font-medium">肩宽 (Shoulder)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={selections.measurements.shoulder}
                          onChange={(e) => setSelections(prev => ({ 
                            ...prev, 
                            measurements: { ...prev.measurements, shoulder: e.target.value } 
                          }))}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#8c7355]"
                          placeholder="cm"
                        />
                        <span className="absolute right-2 top-2.5 text-[9px] text-stone-400">cm</span>
                      </div>
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-stone-600 uppercase font-medium">特殊定制诉求 / 体型备注 (Remarks)</label>
                    <textarea 
                      rows={3}
                      value={selections.measurements.remarks}
                      onChange={(e) => setSelections(prev => ({ 
                        ...prev, 
                        measurements: { ...prev.measurements, remarks: e.target.value } 
                      }))}
                      placeholder="例：脖子偏短希望立领做薄；小腹微凸希望前摆设计略松..."
                      className="w-full bg-white border border-stone-300 rounded p-3 text-xs text-stone-800 focus:outline-none focus:border-[#8c7355]"
                    />
                  </div>

                  {/* Illustrated Guide */}
                  <div className="border border-stone-200 bg-stone-50 rounded p-4 space-y-3">
                    <span className="text-[10px] tracking-widest text-stone-500 font-semibold uppercase">如何量取净尺寸？(Measuring Guide)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] text-stone-600 font-light leading-relaxed">
                      <div>
                        <span className="font-semibold text-stone-800">1. 净胸围：</span>
                        软尺通过胸部最丰满处，保持水平，松紧适度，不拉紧也不过分放松。
                      </div>
                      <div>
                        <span className="font-semibold text-stone-800">2. 净腰围：</span>
                        腰部最细处（肋骨下缘与胯骨上缘连线中点）水平环绕一周测量。
                      </div>
                      <div>
                        <span className="font-semibold text-stone-800">3. 净臀围：</span>
                        软尺环绕臀部最丰满隆起处水平环绕一周测量。
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Price Calculations and CTA */}
            <div className="border-t border-stone-300 pt-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <div className="space-y-0.5">
                  <span className="text-xs text-stone-500 font-light">高定总计 · Total Bespoke Fee</span>
                  <p className="text-[9px] text-stone-400 leading-normal">
                    * 费用包含选定真丝或非遗面料、剪裁大师开版费、全手工打样与包边
                  </p>
                </div>
                <div className="text-right">
                  <span className="serif-display text-2xl font-medium text-stone-900">
                    ¥{currentPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAiAdvisor(!showAiAdvisor)}
                  className={`border ${
                    showAiAdvisor ? 'bg-[#8c7355]/10 border-[#8c7355] text-[#8c7355]' : 'border-stone-300 hover:border-stone-800 text-stone-800'
                  } text-xs py-3 px-4 rounded transition-colors cursor-pointer flex items-center justify-center space-x-2`}
                >
                  <Sparkles size={13} className="animate-pulse" />
                  <span>{showAiAdvisor ? '隐藏 AI 顾问' : '呼叫 AI 量体顾问'}</span>
                </button>

                <button
                  onClick={handleAddToBespokeCart}
                  disabled={isAdding}
                  className="flex-1 bg-[#121110] hover:bg-black text-white text-xs font-semibold tracking-widest py-3 rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Scissors size={12} />
                  <span>{isAdding ? '正在生成高定订单...' : '加入我的高定雅囊 (ADD TO BESPOKE)'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-6 text-[9px] text-stone-400 font-light bg-[#ebe9e2]/50 p-2 rounded">
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={12} className="text-stone-500" />
                  <span>非遗传承手工刺绣</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={12} className="text-stone-500" />
                  <span>一次定制 · 终身免费微调</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 3: AI Advisor side drawer (conditionally rendered next to parameters) */}
          {showAiAdvisor && (
            <div className="w-full lg:w-[32%] border-t lg:border-t-0 lg:border-l border-stone-300 p-4 bg-[#f0eee8] flex flex-col justify-between overflow-y-auto animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest text-stone-500 font-semibold uppercase">Madame Qi 主设室</span>
                <button 
                  onClick={() => setShowAiAdvisor(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-light"
                >
                  隐藏 ✕
                </button>
              </div>
              
              <div className="flex-1">
                <AiStylist 
                  currentSelections={selections}
                  onApplyPreset={handleApplyPreset}
                />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Embedded Simple Keyframes */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
