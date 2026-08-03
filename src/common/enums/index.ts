export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CASHIER = 'cashier',
}

export enum CashSessionStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum TableOrderStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  MIXED = 'mixed',
}

export enum SaleStatus {
  COMPLETED = 'completed',
  REVERSED = 'reversed',
}

export enum InventoryMovementType {
  SALE = 'sale',
  PURCHASE = 'purchase',
  ADJUSTMENT_IN = 'adjustment_in',
  ADJUSTMENT_OUT = 'adjustment_out',
  PRODUCTION = 'production',
  SALE_REVERSAL = 'sale_reversal',
}

export enum ProductType {
  SIMPLE = 'simple',
  BULK = 'bulk',
  PORTION = 'portion',
  COMPOSITE = 'composite',
  PREPARED = 'prepared',
}

export enum StockUnit {
  UNIT = 'unit',
  G = 'g',
  ML = 'ml',
}

export enum OptionGroupKind {
  FLAVOR = 'flavor',
  CONTAINER = 'container',
  ADDON = 'addon',
}
