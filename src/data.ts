import { Product } from './types';

export const IMAGES = {
  hero: '/images/qipao_hero_banner_1782488815540.jpg',
  embroidery: '/images/qipao_lookbook_1_1782488835886.jpg',
  modelGreen: '/images/qipao_lookbook_2_1782488850431.jpg',
  collarDetail: '/images/qipao_lookbook_3_1782488865594.jpg',
  atelier: '/images/qipao_tailor_atelier_1782488883669.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: '小玉兰 · 手绣桑蚕丝祺袍',
    englishName: 'The Petite Magnolia',
    price: 3680,
    description: '采用精选苏州桑蚕丝，手感软滑，如水般贴合。胸前及下摆点缀纯手工苏绣白玉兰，清雅出尘，修身中长款剪裁，尽显江南温婉。',
    image: IMAGES.embroidery,
    category: 'atelier',
    details: [
      '100% 桑蚕丝 (Mulberry Silk)',
      '全真丝乔其衬里，透气舒适',
      '手工白玉兰苏绣设计，耗时48个工时',
      '上海传统一字盘扣',
      '侧边隐形拉链设计'
    ],
    specs: {
      fabric: '100% 桑蚕丝',
      silhouette: '优雅中长裙 (Midi)',
      collar: '传统上海高领',
      craft: '苏绣手工刺绣'
    }
  },
  {
    id: 'prod-2',
    name: '听雨 · 镂空水滴真丝祺袍',
    englishName: 'Raindrops Echo',
    price: 3200,
    description: '水滴形前襟镂空设计，若隐若现，平添一分灵动与含蓄。墨绿色重绉真丝展现低调的华丽，顺滑显瘦，气场内敛。',
    image: IMAGES.modelGreen,
    category: 'modern',
    details: [
      '重磅真丝提花面料 (Heavy Crepe)',
      '精巧水滴形镂空领口',
      '复古琵琶扣饰，古典趣味',
      '飞飞袖剪裁，柔化肩部线条',
      '日常雅集与商务宴会皆宜'
    ],
    specs: {
      fabric: '重磅提花真丝',
      silhouette: '知性中长款',
      collar: '镂空水滴领',
      craft: '手工滚边拼缝'
    }
  },
  {
    id: 'prod-3',
    name: '玄雀 · 非遗重磅香云纱',
    englishName: 'The Obsidian Finch',
    price: 4800,
    description: '精选非遗纯手工晒莨香云纱。泥土与植物的油脂赋予面料深邃幽暗的光泽，越穿越见其温润古朴，展现高级知识分子的沉静与风骨。',
    image: IMAGES.collarDetail,
    category: 'heritage',
    details: [
      '非遗手作晒莨香云纱 (Heirloom Xiangyunsha)',
      '经典上海复古高领，挺括有型',
      '古董一字铜扣与手工盘扣完美融合',
      '双股真丝重工包边，防裂防磨',
      '典雅拖地长款，仪式感拉满'
    ],
    specs: {
      fabric: '老树汁纯晒莨香云纱',
      silhouette: '经典长裙 (Classic Long)',
      collar: '复古立领',
      craft: '纯手工剪裁缝制'
    }
  }
];

export const SILHOUETTE_OPTIONS = [
  { id: 'classic', name: '经典长裙', desc: '庄重典雅，展现至臻仪式感（适合婚宴、盛典、晚宴）', price: 600, tag: 'Classic Floor-length' },
  { id: 'midi', name: '优雅中长裙', desc: '知性大方，利落修身，露出纤细小腿（日常雅集、通勤）', price: 300, tag: 'Elegant Midi' },
  { id: 'mini', name: '当代短裙', desc: '轻盈摩登，灵动活泼，拉长双腿比例（度假、时尚街拍）', price: 0, tag: 'Modern Mini' }
];

export const COLLAR_OPTIONS = [
  { id: 'high', name: '上海高领', desc: '立领高约5.5cm，重塑颈部风骨，挺拔提气', price: 150, tag: 'Shanghai High' },
  { id: 'teardrop', name: '镂空水滴领', desc: '前襟开一滴水状镂空，含蓄且微露性感锁骨', price: 200, tag: 'Teardrop Keyhole' },
  { id: 'low', name: '低领 / 凤仙领', desc: '立领高度2.5cm，舒适好穿，日常活动自如不卡喉咙', price: 0, tag: 'Low Mandarin' }
];

export const SLEEVE_OPTIONS = [
  { id: 'cap', name: '飞飞袖', desc: '微型飞袖，遮住大臂最粗处，显瘦利落', price: 100, tag: 'Cap Sleeve' },
  { id: 'elbow', name: '玉兰中袖', desc: '及肘中袖，线条流畅温婉，极其端庄显沉静', price: 150, tag: 'Elbow Length' },
  { id: 'long', name: '长袖', desc: '传统长袖设计，端庄大方，秋冬保暖之选', price: 0, tag: 'Full Length' }
];

export const FABRIC_OPTIONS = [
  { id: 'silk', name: '桑蚕丝', desc: '顶级桑蚕丝，丝滑亲肤，天然光泽，四季皆宜', price: 0, tag: 'Mulberry Silk' },
  { id: 'crepe', name: '重磅真丝绉', desc: '重磅真丝绉面料，有垂坠感，显瘦利落，有质感', price: 300, tag: 'Heavy Silk Crepe' },
  { id: 'xiangyun', name: '香云纱', desc: '非遗手作晒莨香云纱，越穿越润，独一无二的复古光泽', price: 800, tag: 'Xiangyunsha Silk' }
];

export const EMBROIDERY_OPTIONS = [
  { id: 'none', name: '无刺绣', desc: '纯净无饰，极简之美，面料本身的质感就是最好的装饰', price: 0, tag: 'No Embroidery' },
  { id: 'su', name: '苏绣白玉兰', desc: '苏州非遗手绣白玉兰，清雅脱俗，每一朵都是独一无二的', price: 1200, tag: 'Suzhou White Magnolia' },
  { id: 'yun', name: '云锦金线凤凰', desc: '南京非遗云锦，金线凤凰图腾，富丽堂皇，仅婚宴礼服可用', price: 3500, tag: 'Yunjin Golden Phoenix' }
];

export const BUTTON_OPTIONS = [
  { id: 'standard', name: '一字盘扣', desc: '经典一字盘扣，简洁大方，上海祺袍标志设计', price: 0, tag: 'Standard Knot' },
  { id: 'pipa', name: '琵琶扣', desc: '复古琵琶扣饰，古典趣味，如琵琶弦上流动的韵律', price: 200, tag: 'Pipa Knot' },
  { id: 'copper', name: '古董铜扣', desc: '精铸古董铜扣，民国时期风格，低调的贵气', price: 350, tag: 'Antique Copper' }
];

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const COLOR_OPTIONS = [
  { name: '墨绿', hex: '#2D4A3E' },
  { name: '黛蓝', hex: '#1E3A5F' },
  { name: '绛红', hex: '#8B2252' },
  { name: '月白', hex: '#F0F0E8' },
  { name: '藏青', hex: '#1A2744' }
];

export const FAQ_ITEMS = [
  {
    question: '定制周期需要多长时间？',
    answer: '基础款通常需要 15-20 个工作日。如果选择了手工刺绣（苏绣/云锦），则需要 30-45 个工作日。我们会在确认订单后提供精确的交付日期。'
  },
  {
    question: '如何测量我的尺寸？',
    answer: '我们提供详细的测量指南和视频教程。您也可以预约到店量身服务（上海/北京/苏州），我们的专业裁缝会为您精准测量 20+ 个身体数据点。'
  },
  {
    question: '可以修改已有的设计吗？',
    answer: '当然可以！我们的定制系统支持多种领型、袖型、面料和刺绣组合。如果您有特殊的设计想法，也可以通过 AI 款式顾问与我们沟通，我们会尽力满足您的需求。'
  },
  {
    question: '价格包含哪些内容？',
    answer: '价格包含面料、裁剪、缝制、基础配件（盘扣等）和包装。手工刺绣、特殊面料加价和到店量身服务需要额外收费，具体价格请参考定制系统的报价。'
  }
];
