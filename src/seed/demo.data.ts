export const demoCategories = [
  { name: 'Bebidas', description: 'Refrescos, jugos y agua' },
  { name: 'Snacks', description: 'Botanas y golosinas' },
  { name: 'Lácteos', description: 'Leche, queso y yogurt' },
  { name: 'Limpieza', description: 'Productos de limpieza del hogar' },
  { name: 'Panadería', description: 'Pan, galletas y pasteles' },
  { name: 'Abarrotes', description: 'Productos de despensa básica' },
  { name: 'Heladería', description: 'Helados y postres' },
  { name: 'Comida rápida', description: 'Hamburguesas y platos preparados' },
];

export const demoProducts = [
  { sku: 'BEB-001', name: 'Coca-Cola 600ml', category: 'Bebidas', salePrice: 4500, costPrice: 3200, stock: 48, minStock: 10 },
  { sku: 'BEB-002', name: 'Agua Natural 1L', category: 'Bebidas', salePrice: 2500, costPrice: 1800, stock: 60, minStock: 15 },
  { sku: 'BEB-003', name: 'Jugo Del Valle 1L', category: 'Bebidas', salePrice: 6500, costPrice: 4800, stock: 24, minStock: 8 },
  { sku: 'BEB-004', name: 'Red Bull 250ml', category: 'Bebidas', salePrice: 8500, costPrice: 6200, stock: 20, minStock: 5 },
  { sku: 'SNK-001', name: 'Papas Fritas 45g', category: 'Snacks', salePrice: 3500, costPrice: 2400, stock: 36, minStock: 10 },
  { sku: 'SNK-002', name: 'Nachos Queso 62g', category: 'Snacks', salePrice: 4200, costPrice: 2900, stock: 30, minStock: 8 },
  { sku: 'SNK-003', name: 'Palomitas Mantequilla', category: 'Snacks', salePrice: 2800, costPrice: 1800, stock: 25, minStock: 6 },
  { sku: 'SNK-004', name: 'Chocolate Snickers', category: 'Snacks', salePrice: 3200, costPrice: 2200, stock: 40, minStock: 10 },
  { sku: 'LAC-001', name: 'Leche Entera 1L', category: 'Lácteos', salePrice: 5500, costPrice: 3900, stock: 32, minStock: 8 },
  { sku: 'LAC-002', name: 'Yogurt Fresa', category: 'Lácteos', salePrice: 3200, costPrice: 2200, stock: 28, minStock: 6 },
  { sku: 'LAC-003', name: 'Queso Campesino 400g', category: 'Lácteos', salePrice: 18900, costPrice: 14500, stock: 12, minStock: 3 },
  { sku: 'LIM-001', name: 'Blanqueador 930ml', category: 'Limpieza', salePrice: 7200, costPrice: 5200, stock: 18, minStock: 5 },
  { sku: 'LIM-002', name: 'Desinfectante 828ml', category: 'Limpieza', salePrice: 8500, costPrice: 6200, stock: 15, minStock: 4 },
  { sku: 'LIM-003', name: 'Detergente 1kg', category: 'Limpieza', salePrice: 14500, costPrice: 10500, stock: 10, minStock: 3 },
  { sku: 'PAN-001', name: 'Pan Tajado', category: 'Panadería', salePrice: 9500, costPrice: 6800, stock: 20, minStock: 5 },
  { sku: 'PAN-002', name: 'Galletas 170g', category: 'Panadería', salePrice: 3200, costPrice: 2200, stock: 35, minStock: 8 },
  { sku: 'PAN-003', name: 'Ponqué Individual', category: 'Panadería', salePrice: 2500, costPrice: 1700, stock: 45, minStock: 10 },
  { sku: 'ABA-001', name: 'Arroz 1kg', category: 'Abarrotes', salePrice: 6500, costPrice: 4800, stock: 40, minStock: 10 },
  { sku: 'ABA-002', name: 'Frijol 900g', category: 'Abarrotes', salePrice: 7200, costPrice: 5200, stock: 30, minStock: 8 },
  { sku: 'ABA-003', name: 'Aceite 1L', category: 'Abarrotes', salePrice: 10800, costPrice: 7800, stock: 22, minStock: 5 },
  { sku: 'ABA-004', name: 'Azúcar 1kg', category: 'Abarrotes', salePrice: 5800, costPrice: 4200, stock: 3, minStock: 5 },
];

/** Insumos base en gramos (no se venden en POS) */
export const demoBulkProducts = [
  {
    sku: 'INS-HEL-001',
    name: 'Helado vainilla (insumo)',
    category: 'Heladería',
    description: 'Balde de helado — stock en gramos',
    stock: 10000,
    minStock: 500,
    costPrice: 12,
  },
  {
    sku: 'INS-PIN-001',
    name: 'Piña calada (insumo)',
    category: 'Comida rápida',
    description: 'Piña en almíbar para hamburguesas',
    stock: 5000,
    minStock: 200,
    costPrice: 8,
  },
  {
    sku: 'INS-CAR-001',
    name: 'Carne molida (insumo)',
    category: 'Comida rápida',
    stock: 8000,
    minStock: 300,
    costPrice: 18,
  },
  {
    sku: 'INS-QUE-001',
    name: 'Queso cheddar (insumo)',
    category: 'Comida rápida',
    stock: 3000,
    minStock: 150,
    costPrice: 22,
  },
  {
    sku: 'INS-LEC-001',
    name: 'Lechuga picada (insumo)',
    category: 'Comida rápida',
    stock: 2000,
    minStock: 100,
    costPrice: 6,
  },
];

/** Pan para hamburguesa — unidad simple usada como ingrediente */
export const demoIngredientSimple = {
  sku: 'INS-PAN-001',
  name: 'Pan hamburguesa',
  category: 'Comida rápida',
  salePrice: 0,
  costPrice: 800,
  stock: 80,
  minStock: 10,
};

/** Porciones de venta ligadas a un insumo base */
export const demoPortionProducts = [
  {
    sku: 'POR-HEL-001',
    name: 'Helado 1 bola',
    category: 'Heladería',
    description: 'Una bola de helado vainilla (90 g)',
    baseSku: 'INS-HEL-001',
    portionSize: 90,
    salePrice: 4500,
    costPrice: 1080,
  },
  {
    sku: 'POR-HEL-002',
    name: 'Helado 2 bolas',
    category: 'Heladería',
    description: 'Dos bolas de helado vainilla (180 g)',
    baseSku: 'INS-HEL-001',
    portionSize: 180,
    salePrice: 7500,
    costPrice: 2160,
  },
  {
    sku: 'POR-HEL-003',
    name: 'Helado 3 bolas',
    category: 'Heladería',
    description: 'Tres bolas de helado vainilla (270 g)',
    baseSku: 'INS-HEL-001',
    portionSize: 270,
    salePrice: 10500,
    costPrice: 3240,
  },
];

/** Productos compuestos con receta */
export const demoCompositeProducts = [
  {
    sku: 'COM-HAM-001',
    name: 'Hamburguesa hawaiana',
    category: 'Comida rápida',
    description: 'Carne, piña calada, queso y lechuga',
    salePrice: 18500,
    costPrice: 7200,
    recipe: [
      { ingredientSku: 'INS-CAR-001', quantity: 120, unit: 'g' as const },
      { ingredientSku: 'INS-PIN-001', quantity: 40, unit: 'g' as const },
      { ingredientSku: 'INS-PAN-001', quantity: 1, unit: 'unit' as const },
      { ingredientSku: 'INS-QUE-001', quantity: 25, unit: 'g' as const },
      { ingredientSku: 'INS-LEC-001', quantity: 15, unit: 'g' as const },
    ],
  },
];

/** Subconjunto Cali: helado 1 bola + hamburguesa */
export const demoPortionProductsCali = demoPortionProducts.filter((p) => p.sku === 'POR-HEL-001');
export const demoCompositeProductsCali = demoCompositeProducts;
export const demoBulkProductsCali = demoBulkProducts;
export const demoIngredientSimpleCali = demoIngredientSimple;

export const demoCustomers = [
  { name: 'María González', email: 'maria@email.com', phone: '300-1234567', address: 'Calle 45 #12-34, Bogotá' },
  { name: 'Carlos Ruiz', email: 'carlos@email.com', phone: '310-5678901', address: 'Carrera 7 #80-15, Bogotá' },
  { name: 'Ana Martínez', phone: '320-9012345', address: 'Av. El Dorado 69-76, Bogotá' },
  { name: 'José Hernández', email: 'jose@email.com', phone: '315-3456789' },
  { name: 'Laura Sánchez', phone: '318-7890123', address: 'Calle 100 #19-52, Bogotá' },
];

export const demoSuppliers = [
  { name: 'Distribuidora Andina SAS', email: 'ventas@andina.com', phone: '601-1000100', contact: 'Roberto Díaz', address: 'Zona Industrial Fontibón, Bogotá' },
  { name: 'Comercial del Valle', email: 'pedidos@valle.com', phone: '602-2000200', contact: 'Patricia López', address: 'Calle 15 #23-45, Cali' },
  { name: 'Alimentos del Caribe', email: 'b2b@caribe.com', phone: '605-3000300', contact: 'Gerente Ventas', address: 'Av. Circunvalar, Cartagena' },
];

export const demoSuperAdmin = {
  name: 'Super Administrador',
  email: 'super@pos.local',
  password: 'super123',
};

export const demoStores = [
  {
    code: 'bogota',
    name: 'Tienda Demo Bogotá',
    address: 'Calle 72 #10-34, Bogotá',
    phone: '601-5550100',
  },
  {
    code: 'cali',
    name: 'Tienda Demo Cali',
    address: 'Calle 15 #23-45, Cali',
    phone: '602-5550200',
  },
];

export const demoStoreAdmin = {
  name: 'Administrador Bogotá',
  email: 'admin@pos.local',
  password: 'admin123',
  storeCode: 'bogota',
};

export const demoStoreAdmin2 = {
  name: 'Administrador Cali',
  email: 'admin2@pos.local',
  password: 'admin123',
  storeCode: 'cali',
};

export const demoCashier = {
  name: 'Juan Cajero',
  email: 'cajero@pos.local',
  password: 'cajero123',
  storeCode: 'bogota',
};

export const demoPurchases = [
  {
    supplier: 'Distribuidora Andina SAS',
    invoiceNumber: 'FEV-10234',
    notes: 'Pedido semanal de bebidas',
    daysAgo: 12,
    items: [
      { sku: 'BEB-001', quantity: 24, unitCost: 3200 },
      { sku: 'BEB-002', quantity: 30, unitCost: 1800 },
      { sku: 'BEB-003', quantity: 12, unitCost: 4800 },
    ],
  },
  {
    supplier: 'Distribuidora Andina SAS',
    invoiceNumber: 'FEV-10456',
    notes: 'Reposición Red Bull',
    daysAgo: 3,
    items: [
      { sku: 'BEB-004', quantity: 15, unitCost: 6200 },
    ],
  },
  {
    supplier: 'Comercial del Valle',
    invoiceNumber: 'CDV-8891',
    notes: 'Snacks y lácteos',
    daysAgo: 8,
    items: [
      { sku: 'SNK-001', quantity: 20, unitCost: 2400 },
      { sku: 'SNK-002', quantity: 18, unitCost: 2900 },
      { sku: 'LAC-001', quantity: 16, unitCost: 3900 },
      { sku: 'LAC-002', quantity: 12, unitCost: 2200 },
    ],
  },
  {
    supplier: 'Comercial del Valle',
    invoiceNumber: 'CDV-9012',
    notes: 'Panadería',
    daysAgo: 5,
    items: [
      { sku: 'PAN-001', quantity: 10, unitCost: 6800 },
      { sku: 'PAN-002', quantity: 20, unitCost: 2200 },
      { sku: 'PAN-003', quantity: 25, unitCost: 1700 },
    ],
  },
  {
    supplier: 'Alimentos del Caribe',
    invoiceNumber: 'ADC-5501',
    notes: 'Abarrotes y limpieza',
    daysAgo: 15,
    items: [
      { sku: 'ABA-001', quantity: 20, unitCost: 4800 },
      { sku: 'ABA-002', quantity: 15, unitCost: 5200 },
      { sku: 'ABA-003', quantity: 10, unitCost: 7800 },
      { sku: 'LIM-001', quantity: 8, unitCost: 5200 },
      { sku: 'LIM-003', quantity: 6, unitCost: 10500 },
    ],
  },
  {
    supplier: 'Alimentos del Caribe',
    invoiceNumber: 'ADC-5620',
    notes: 'Queso y azúcar',
    daysAgo: 2,
    items: [
      { sku: 'LAC-003', quantity: 8, unitCost: 14500 },
      { sku: 'ABA-004', quantity: 12, unitCost: 4200 },
    ],
  },
  {
    supplier: 'Comercial del Valle',
    invoiceNumber: 'CDV-HEL01',
    notes: 'Insumo helado vainilla (5 kg)',
    daysAgo: 4,
    items: [{ sku: 'INS-HEL-001', quantity: 5000, unitCost: 12 }],
  },
  {
    supplier: 'Comercial del Valle',
    invoiceNumber: 'CDV-HAM01',
    notes: 'Insumos hamburguesa hawaiana',
    daysAgo: 6,
    items: [
      { sku: 'INS-CAR-001', quantity: 3000, unitCost: 18 },
      { sku: 'INS-PIN-001', quantity: 2000, unitCost: 8 },
      { sku: 'INS-PAN-001', quantity: 40, unitCost: 800 },
    ],
  },
];
