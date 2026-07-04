export interface CustomizationSelections {
  id: string;
  silhouette: 'classic' | 'midi' | 'mini';
  collar: 'high' | 'teardrop' | 'low';
  sleeve: 'cap' | 'elbow' | 'long' | 'none';
  fabric: 'mulberry_silk' | 'xiangyunsha' | 'heavy_crepe' | 'brocade';
  pankou: 'straight' | 'pipa' | 'floral';
  embroidery: 'magnolia' | 'plum' | 'bamboo' | 'none';
  measurements: {
    height: string;
    bust: string;
    waist: string;
    hips: string;
    shoulder: string;
    remarks: string;
  };
}

export interface Product {
  id: string;
  name: string;
  englishName: string;
  price: number;
  description: string;
  image: string;
  category: 'atelier' | 'modern' | 'heritage';
  details: string[];
  specs: {
    fabric: string;
    silhouette: string;
    collar: string;
    craft: string;
  };
}

export interface CartItem {
  id: string; // Could be product ID or custom Qipao configuration ID
  name: string;
  price: number;
  image: string;
  quantity: number;
  isCustom: boolean;
  customSelections?: CustomizationSelections;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
