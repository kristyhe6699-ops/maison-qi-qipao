import { useState, useEffect } from 'react';
import { CartItem, Product } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Lookbook from './components/Lookbook';
import Story from './components/Story';
import Customizer from './components/Customizer';
import Footer from './components/Footer';
import { ShoppingBag, X, Scissors, Check, MessageSquare } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [selectedProductForCustomization, setSelectedProductForCustomization] = useState<Product | null>(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('maison_qi_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage when updated
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('maison_qi_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(c => 
      c.isCustom 
        ? c.id === item.id 
        : c.id === item.id && !c.isCustom
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += item.quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    const updated = cart.filter(c => c.id !== id);
    saveCart(updated);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    const updated = cart.map(c => c.id === id ? { ...c, quantity: qty } : c);
    saveCart(updated);
  };

  const handleCustomiseProduct = (product: Product) => {
    setSelectedProductForCustomization(product);
    setCustomizerOpen(true);
  };

  const handleOpenGeneralCustomizer = () => {
    setSelectedProductForCustomization(null);
    setCustomizerOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCheckout = () => {
    // Perform standard checkout visualization
    setCartOpen(false);
    setShowCheckoutSuccess(true);
    saveCart([]); // Empty the cart on checkout
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] text-stone-900 flex flex-col relative">
      
      {/* 1. Header with cart state */}
      <Header 
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onOpenCustomizer={handleOpenGeneralCustomizer}
        onScrollTo={handleScrollTo}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        onCheckout={handleCheckout}
      />

      {/* 2. Hero Landing */}
      <Hero 
        onExplore={handleOpenGeneralCustomizer}
        onScrollTo={handleScrollTo}
      />

      {/* 3. Collections & Catalog */}
      <Collections 
        onCustomiseProduct={handleCustomiseProduct}
        onAddToCart={handleAddToCart}
        setCartOpen={setCartOpen}
      />

      {/* 4. Lookbook Staggered Grid */}
      <Lookbook />

      {/* 5. Brand Heritage & Story */}
      <Story />

      {/* 6. Footer & Email Join */}
      <Footer />

      {/* 7. Bespoke Customizer Dialog/Modal Overlay */}
      {customizerOpen && (
        <Customizer 
          initialProduct={selectedProductForCustomization}
          onClose={() => setCustomizerOpen(false)}
          onAddToCart={handleAddToCart}
          setCartOpen={setCartOpen}
        />
      )}

      {/* 8. Floating Action button to trigger customizer directly */}
      <button
        onClick={handleOpenGeneralCustomizer}
        className="fixed bottom-6 right-6 z-30 bg-stone-900 hover:bg-stone-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2 group"
        title="在线量身定制"
      >
        <Scissors size={18} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs tracking-widest font-semibold uppercase pr-1 hidden sm:inline">高定室</span>
      </button>

      {/* 9. Checkout Success Modal Overlay */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-[fade-in_0.3s_ease]">
          <div className="bg-[#f5f4f0] max-w-md w-full p-8 rounded shadow-2xl border border-stone-200 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center mx-auto border-2 border-stone-700">
              <Check size={32} className="text-amber-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="serif-display text-xl text-stone-900">高定支付成功 · Order Confirmed</h3>
              <p className="text-[10px] text-stone-400 font-mono tracking-wider uppercase">Maison Qi Couture Chamber</p>
            </div>

            <div className="text-xs text-stone-600 font-light leading-relaxed bg-stone-100 p-4 rounded text-left space-y-3">
              <p>尊敬的雅客，您的订单已递交至 Madame Qi 量体缝纫室。</p>
              <p className="text-[11px] border-t border-stone-200/50 pt-2">
                <strong>高定工期须知：</strong> 祺袍属于全手工缝制打样，我们的剪裁大师将在本工作日内致电或致信给您，核对肩宽、胸围细节，确保贴身自如。
              </p>
            </div>

            <button 
              onClick={() => setShowCheckoutSuccess(false)}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs tracking-widest py-3.5 rounded font-medium transition-colors cursor-pointer"
            >
              谢过大设，返回前厅
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
