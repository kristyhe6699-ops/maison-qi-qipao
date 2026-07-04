import { useState } from 'react';
import { ShoppingBag, Search, Scissors, Menu, X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onOpenCustomizer: () => void;
  onScrollTo: (sectionId: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  onCheckout: () => void;
}

export default function Header({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onOpenCustomizer,
  onScrollTo,
  cartOpen,
  setCartOpen,
  onCheckout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#E5DACE] px-6 lg:px-12 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-widest font-sans font-semibold text-[#8B5E3C]">
            <button 
              onClick={() => { onScrollTo('shop'); }} 
              className="hover:text-[#2D1B13] transition-colors uppercase cursor-pointer"
            >
              SHOP · 祺裳
            </button>
            <button 
              onClick={() => { onScrollTo('lookbook'); }} 
              className="hover:text-[#2D1B13] transition-colors uppercase cursor-pointer"
            >
              LOOKBOOK · 画册
            </button>
            <button 
              onClick={() => { onScrollTo('story'); }} 
              className="hover:text-[#2D1B13] transition-colors uppercase cursor-pointer"
            >
              ABOUT · 故事
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-[#2D1B13] hover:text-[#8B5E3C] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo (Centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center select-none">
            <span className="text-[7px] font-sans font-semibold tracking-[0.4em] text-[#8B5E3C] uppercase">
              祺 坊 · 高 定
            </span>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-5">
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="搜索祺裳..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-b border-[#E5DACE] text-xs px-2 py-1 mr-2 focus:outline-none focus:border-[#8B5E3C] w-24 md:w-36 font-light text-[#2D1B13]"
                />
              )}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#2D1B13] hover:text-[#8B5E3C] transition-colors p-1 cursor-pointer"
                title="搜索"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Customizer trigger (Scissors Icon) */}
            <button
              onClick={onOpenCustomizer}
              className="flex items-center space-x-1.5 text-white bg-[#2D1B13] hover:bg-[#4A2F22] px-4 py-2 rounded-sm text-[10px] tracking-widest font-semibold font-sans uppercase transition-colors cursor-pointer"
              title="在线量体高定"
            >
              <Scissors size={11} className="text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">量身定制 BESPOKE</span>
            </button>

            {/* Shopping Bag Icon with badge */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative text-[#2D1B13] hover:text-[#8B5E3C] transition-colors p-1 cursor-pointer"
              title="购物车"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8B5E3C] text-white text-[8px] font-sans font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center scale-90 border border-[#FDFCF8]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-30 bg-[#FDFCF8] flex flex-col p-8 space-y-6 border-t border-[#E5DACE] md:hidden">
          <button 
            onClick={() => { onScrollTo('shop'); setMobileMenuOpen(false); }}
            className="text-base font-medium uppercase tracking-widest text-left text-[#2D1B13] border-b border-[#E5DACE] pb-3"
          >
            SHOP · 祺裳系列
          </button>
          <button 
            onClick={() => { onScrollTo('lookbook'); setMobileMenuOpen(false); }}
            className="text-base font-medium uppercase tracking-widest text-left text-[#2D1B13] border-b border-[#E5DACE] pb-3"
          >
            LOOKBOOK · 主题画册
          </button>
          <button 
            onClick={() => { onScrollTo('story'); setMobileMenuOpen(false); }}
            className="text-base font-medium uppercase tracking-widest text-left text-[#2D1B13] border-b border-[#E5DACE] pb-3"
          >
            ABOUT · 故事
          </button>
          <button 
            onClick={() => { onOpenCustomizer(); setMobileMenuOpen(false); }}
            className="flex items-center justify-between text-base font-semibold uppercase tracking-widest text-left text-[#8B5E3C] border-b border-[#E5DACE] pb-3"
          >
            <span>ONLINE TAILOR · 量体高定</span>
            <Scissors size={18} />
          </button>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#2D1B13]/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FDFCF8] shadow-2xl flex flex-col">
              <div className="px-6 py-6 border-b border-[#E5DACE] flex items-center justify-between">
                <h2 className="serif-display text-lg tracking-wider text-[#2D1B13] font-normal">
                  购物雅囊 <span className="font-sans text-xs text-[#8B5E3C] font-semibold tracking-widest">({cartCount} 件商品)</span>
                </h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="text-stone-400 hover:text-[#2D1B13] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag size={48} className="text-[#8B5E3C]/40 stroke-[1]" />
                    <p className="text-sm font-light text-stone-600 tracking-wider">您的购物篮空空如也</p>
                    <button
                      onClick={() => { setCartOpen(false); onScrollTo('shop'); }}
                      className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#2D1B13] text-[#2D1B13] pb-1 hover:text-[#8B5E3C] hover:border-[#8B5E3C] transition-colors cursor-pointer"
                    >
                      浏览精品系列 →
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-[#E5DACE]">
                      <div className="w-20 h-24 bg-[#F5EFED] rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xs font-semibold text-[#2D1B13] tracking-wide line-clamp-1">{item.name}</h3>
                            {item.isCustom ? (
                              <span className="inline-block mt-1 bg-[#F5EFED] text-[#8B5E3C] text-[9px] px-1.5 py-0.5 border border-[#E5DACE] rounded font-medium">
                                专属高定款
                              </span>
                            ) : (
                              <span className="inline-block mt-1 bg-[#F5EFED]/60 text-stone-600 text-[9px] px-1.5 py-0.5 rounded font-medium">
                                现货精品
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-stone-400 hover:text-[#2D1B13] transition-colors p-1 cursor-pointer"
                            title="删除"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Custom Configurations Briefing */}
                        {item.isCustom && item.customSelections && (
                          <div className="mt-2 text-[9px] text-stone-600 font-light leading-relaxed grid grid-cols-2 gap-x-2 bg-[#F5EFED]/50 p-1.5 rounded border border-[#E5DACE]">
                            <div>• 版型: {item.customSelections.silhouette === 'classic' ? '经典长裙' : item.customSelections.silhouette === 'midi' ? '优雅中裙' : '当代短裙'}</div>
                            <div>• 领型: {item.customSelections.collar === 'high' ? '上海高领' : item.customSelections.collar === 'teardrop' ? '镂空水滴' : '低领凤仙'}</div>
                            <div>• 袖型: {item.customSelections.sleeve === 'cap' ? '飞飞袖' : item.customSelections.sleeve === 'elbow' ? '玉兰中袖' : item.customSelections.sleeve === 'long' ? '连肩长袖' : '无袖'}</div>
                            <div>• 面料: {item.customSelections.fabric === 'mulberry_silk' ? '特级桑蚕丝' : item.customSelections.fabric === 'xiangyunsha' ? '非遗香云纱' : item.customSelections.fabric === 'heavy_crepe' ? '双绉提花' : '金银织锦缎'}</div>
                            <div className="col-span-2 text-[#8B5E3C] font-semibold text-[8px] mt-1 pt-1 border-t border-[#E5DACE]">
                              尺码量体: 身高{item.customSelections.measurements.height || '--'}cm / 胸围{item.customSelections.measurements.bust || '--'}cm / 腰围{item.customSelections.measurements.waist || '--'}cm
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-[#E5DACE] rounded overflow-hidden">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 text-xs bg-[#F5EFED] hover:bg-[#E5DACE] text-[#2D1B13] transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs text-[#2D1B13] font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs bg-[#F5EFED] hover:bg-[#E5DACE] text-[#2D1B13] transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-[#2D1B13]">
                            ¥{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-[#E5DACE] space-y-4 bg-[#F5EFED]/30">
                  <div className="flex justify-between text-xs tracking-wider text-[#2D1B13]">
                    <span>商品总计</span>
                    <span className="text-[#2D1B13] font-bold text-sm">¥{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] text-stone-500 font-light text-center leading-normal">
                    * 高定产品由金牌裁剪大师手工特制，预计付款后 15-20 个工作日内交付
                  </div>
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-[#2D1B13] hover:bg-[#4A2F22] text-white text-xs font-semibold tracking-[0.2em] py-4 transition-colors uppercase rounded-sm flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>确认高定付款 · START PRODUCTION</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
