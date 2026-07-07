"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// dist/common/utils/timezone.util.js
var require_timezone_util = __commonJS({
  "dist/common/utils/timezone.util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getAppTimezone = getAppTimezone;
    exports2.applyProcessTimezone = applyProcessTimezone;
    function getAppTimezone() {
      return process.env.APP_TIMEZONE ?? "America/Bogota";
    }
    function applyProcessTimezone() {
      process.env.TZ = getAppTimezone();
    }
  }
});

// dist/common/enums/index.js
var require_enums = __commonJS({
  "dist/common/enums/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OptionGroupKind = exports2.StockUnit = exports2.ProductType = exports2.InventoryMovementType = exports2.PaymentMethod = exports2.CashSessionStatus = exports2.UserRole = void 0;
    var UserRole;
    (function(UserRole2) {
      UserRole2["SUPER_ADMIN"] = "super_admin";
      UserRole2["ADMIN"] = "admin";
      UserRole2["CASHIER"] = "cashier";
    })(UserRole || (exports2.UserRole = UserRole = {}));
    var CashSessionStatus;
    (function(CashSessionStatus2) {
      CashSessionStatus2["OPEN"] = "open";
      CashSessionStatus2["CLOSED"] = "closed";
    })(CashSessionStatus || (exports2.CashSessionStatus = CashSessionStatus = {}));
    var PaymentMethod;
    (function(PaymentMethod2) {
      PaymentMethod2["CASH"] = "cash";
      PaymentMethod2["CARD"] = "card";
      PaymentMethod2["MIXED"] = "mixed";
    })(PaymentMethod || (exports2.PaymentMethod = PaymentMethod = {}));
    var InventoryMovementType;
    (function(InventoryMovementType2) {
      InventoryMovementType2["SALE"] = "sale";
      InventoryMovementType2["PURCHASE"] = "purchase";
      InventoryMovementType2["ADJUSTMENT_IN"] = "adjustment_in";
      InventoryMovementType2["ADJUSTMENT_OUT"] = "adjustment_out";
      InventoryMovementType2["PRODUCTION"] = "production";
    })(InventoryMovementType || (exports2.InventoryMovementType = InventoryMovementType = {}));
    var ProductType;
    (function(ProductType2) {
      ProductType2["SIMPLE"] = "simple";
      ProductType2["BULK"] = "bulk";
      ProductType2["PORTION"] = "portion";
      ProductType2["COMPOSITE"] = "composite";
      ProductType2["PREPARED"] = "prepared";
    })(ProductType || (exports2.ProductType = ProductType = {}));
    var StockUnit;
    (function(StockUnit2) {
      StockUnit2["UNIT"] = "unit";
      StockUnit2["G"] = "g";
      StockUnit2["ML"] = "ml";
    })(StockUnit || (exports2.StockUnit = StockUnit = {}));
    var OptionGroupKind;
    (function(OptionGroupKind2) {
      OptionGroupKind2["FLAVOR"] = "flavor";
      OptionGroupKind2["CONTAINER"] = "container";
      OptionGroupKind2["ADDON"] = "addon";
    })(OptionGroupKind || (exports2.OptionGroupKind = OptionGroupKind = {}));
  }
});

// dist/settings/entities/setting.entity.js
var require_setting_entity = __commonJS({
  "dist/settings/entities/setting.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Setting = void 0;
    var typeorm_1 = require("typeorm");
    var store_entity_1 = require_store_entity();
    var Setting = class Setting {
      id;
      storeId;
      store;
      businessName;
      address;
      phone;
      taxRate;
      logoUrl;
      currency;
      updatedAt;
    };
    exports2.Setting = Setting;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Setting.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Setting.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, (store) => store.settings),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Setting.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "business_name", length: 200, default: "Mi Negocio" }),
      __metadata("design:type", String)
    ], Setting.prototype, "businessName", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], Setting.prototype, "address", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 20, nullable: true }),
      __metadata("design:type", String)
    ], Setting.prototype, "phone", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "tax_rate", type: "decimal", precision: 5, scale: 4, default: 0.16 }),
      __metadata("design:type", Number)
    ], Setting.prototype, "taxRate", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "logo_url", nullable: true }),
      __metadata("design:type", String)
    ], Setting.prototype, "logoUrl", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 3, default: "COP" }),
      __metadata("design:type", String)
    ], Setting.prototype, "currency", void 0);
    __decorate([
      (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
      __metadata("design:type", Date)
    ], Setting.prototype, "updatedAt", void 0);
    exports2.Setting = Setting = __decorate([
      (0, typeorm_1.Entity)("settings"),
      (0, typeorm_1.Unique)(["storeId"])
    ], Setting);
  }
});

// dist/stores/entities/store.entity.js
var require_store_entity = __commonJS({
  "dist/stores/entities/store.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Store = void 0;
    var typeorm_1 = require("typeorm");
    var user_entity_1 = require_user_entity();
    var setting_entity_1 = require_setting_entity();
    var Store = class Store {
      id;
      name;
      code;
      address;
      phone;
      active;
      users;
      settings;
      createdAt;
    };
    exports2.Store = Store;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Store.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 150 }),
      __metadata("design:type", String)
    ], Store.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ unique: true, length: 50 }),
      __metadata("design:type", String)
    ], Store.prototype, "code", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], Store.prototype, "address", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 20, nullable: true }),
      __metadata("design:type", String)
    ], Store.prototype, "phone", void 0);
    __decorate([
      (0, typeorm_1.Column)({ default: true }),
      __metadata("design:type", Boolean)
    ], Store.prototype, "active", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.store),
      __metadata("design:type", Array)
    ], Store.prototype, "users", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => setting_entity_1.Setting, (setting) => setting.store),
      __metadata("design:type", Array)
    ], Store.prototype, "settings", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Store.prototype, "createdAt", void 0);
    exports2.Store = Store = __decorate([
      (0, typeorm_1.Entity)("stores")
    ], Store);
  }
});

// dist/customers/entities/customer.entity.js
var require_customer_entity = __commonJS({
  "dist/customers/entities/customer.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Customer = void 0;
    var typeorm_1 = require("typeorm");
    var store_entity_1 = require_store_entity();
    var sale_entity_1 = require_sale_entity();
    var Customer = class Customer {
      id;
      storeId;
      store;
      name;
      email;
      phone;
      address;
      active;
      sales;
      createdAt;
      updatedAt;
    };
    exports2.Customer = Customer;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Customer.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Customer.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Customer.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 150 }),
      __metadata("design:type", String)
    ], Customer.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 150, nullable: true }),
      __metadata("design:type", String)
    ], Customer.prototype, "email", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 20, nullable: true }),
      __metadata("design:type", String)
    ], Customer.prototype, "phone", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], Customer.prototype, "address", void 0);
    __decorate([
      (0, typeorm_1.Column)({ default: true }),
      __metadata("design:type", Boolean)
    ], Customer.prototype, "active", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, (sale) => sale.customer),
      __metadata("design:type", Array)
    ], Customer.prototype, "sales", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Customer.prototype, "createdAt", void 0);
    __decorate([
      (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
      __metadata("design:type", Date)
    ], Customer.prototype, "updatedAt", void 0);
    exports2.Customer = Customer = __decorate([
      (0, typeorm_1.Entity)("customers")
    ], Customer);
  }
});

// dist/categories/entities/category.entity.js
var require_category_entity = __commonJS({
  "dist/categories/entities/category.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Category = void 0;
    var typeorm_1 = require("typeorm");
    var store_entity_1 = require_store_entity();
    var product_entity_1 = require_product_entity();
    var Category = class Category {
      id;
      storeId;
      store;
      name;
      description;
      active;
      products;
      createdAt;
      updatedAt;
    };
    exports2.Category = Category;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Category.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Category.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 100 }),
      __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], Category.prototype, "description", void 0);
    __decorate([
      (0, typeorm_1.Column)({ default: true }),
      __metadata("design:type", Boolean)
    ], Category.prototype, "active", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.category),
      __metadata("design:type", Array)
    ], Category.prototype, "products", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Category.prototype, "createdAt", void 0);
    __decorate([
      (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
      __metadata("design:type", Date)
    ], Category.prototype, "updatedAt", void 0);
    exports2.Category = Category = __decorate([
      (0, typeorm_1.Entity)("categories"),
      (0, typeorm_1.Unique)(["storeId", "name"])
    ], Category);
  }
});

// dist/inventory/entities/inventory-movement.entity.js
var require_inventory_movement_entity = __commonJS({
  "dist/inventory/entities/inventory-movement.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InventoryMovement = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var store_entity_1 = require_store_entity();
    var product_entity_1 = require_product_entity();
    var user_entity_1 = require_user_entity();
    var InventoryMovement = class InventoryMovement {
      id;
      storeId;
      store;
      productId;
      product;
      type;
      quantity;
      stockBefore;
      stockAfter;
      reference;
      notes;
      userId;
      user;
      createdAt;
    };
    exports2.InventoryMovement = InventoryMovement;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], InventoryMovement.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "product_id" }),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "productId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.movements),
      (0, typeorm_1.JoinColumn)({ name: "product_id" }),
      __metadata("design:type", product_entity_1.Product)
    ], InventoryMovement.prototype, "product", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "enum", enum: enums_1.InventoryMovementType }),
      __metadata("design:type", String)
    ], InventoryMovement.prototype, "type", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 3 }),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "quantity", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "stock_before", type: "decimal", precision: 12, scale: 3 }),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "stockBefore", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "stock_after", type: "decimal", precision: 12, scale: 3 }),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "stockAfter", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], InventoryMovement.prototype, "reference", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], InventoryMovement.prototype, "notes", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "user_id", nullable: true }),
      __metadata("design:type", Number)
    ], InventoryMovement.prototype, "userId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
      (0, typeorm_1.JoinColumn)({ name: "user_id" }),
      __metadata("design:type", user_entity_1.User)
    ], InventoryMovement.prototype, "user", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], InventoryMovement.prototype, "createdAt", void 0);
    exports2.InventoryMovement = InventoryMovement = __decorate([
      (0, typeorm_1.Entity)("inventory_movements")
    ], InventoryMovement);
  }
});

// dist/suppliers/entities/supplier.entity.js
var require_supplier_entity = __commonJS({
  "dist/suppliers/entities/supplier.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Supplier = void 0;
    var typeorm_1 = require("typeorm");
    var store_entity_1 = require_store_entity();
    var purchase_entity_1 = require_purchase_entity();
    var Supplier = class Supplier {
      id;
      storeId;
      store;
      name;
      nit;
      email;
      phone;
      address;
      contact;
      active;
      purchases;
      createdAt;
      updatedAt;
    };
    exports2.Supplier = Supplier;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Supplier.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Supplier.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Supplier.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
      __metadata("design:type", Object)
    ], Supplier.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
      __metadata("design:type", Object)
    ], Supplier.prototype, "nit", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
      __metadata("design:type", Object)
    ], Supplier.prototype, "email", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
      __metadata("design:type", Object)
    ], Supplier.prototype, "phone", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", Object)
    ], Supplier.prototype, "address", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
      __metadata("design:type", Object)
    ], Supplier.prototype, "contact", void 0);
    __decorate([
      (0, typeorm_1.Column)({ default: true }),
      __metadata("design:type", Boolean)
    ], Supplier.prototype, "active", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => purchase_entity_1.Purchase, (purchase) => purchase.supplier),
      __metadata("design:type", Array)
    ], Supplier.prototype, "purchases", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Supplier.prototype, "createdAt", void 0);
    __decorate([
      (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
      __metadata("design:type", Date)
    ], Supplier.prototype, "updatedAt", void 0);
    exports2.Supplier = Supplier = __decorate([
      (0, typeorm_1.Entity)("suppliers")
    ], Supplier);
  }
});

// dist/purchases/entities/purchase.entity.js
var require_purchase_entity = __commonJS({
  "dist/purchases/entities/purchase.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Purchase = void 0;
    var typeorm_1 = require("typeorm");
    var store_entity_1 = require_store_entity();
    var supplier_entity_1 = require_supplier_entity();
    var user_entity_1 = require_user_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var Purchase = class Purchase {
      id;
      storeId;
      store;
      invoiceNumber;
      total;
      notes;
      supplierId;
      supplier;
      userId;
      user;
      items;
      createdAt;
    };
    exports2.Purchase = Purchase;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Purchase.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Purchase.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Purchase.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "invoice_number", length: 50, nullable: true }),
      __metadata("design:type", String)
    ], Purchase.prototype, "invoiceNumber", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], Purchase.prototype, "total", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], Purchase.prototype, "notes", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "supplier_id" }),
      __metadata("design:type", Number)
    ], Purchase.prototype, "supplierId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (supplier) => supplier.purchases),
      (0, typeorm_1.JoinColumn)({ name: "supplier_id" }),
      __metadata("design:type", supplier_entity_1.Supplier)
    ], Purchase.prototype, "supplier", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "user_id" }),
      __metadata("design:type", Number)
    ], Purchase.prototype, "userId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
      (0, typeorm_1.JoinColumn)({ name: "user_id" }),
      __metadata("design:type", user_entity_1.User)
    ], Purchase.prototype, "user", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => purchase_item_entity_1.PurchaseItem, (item) => item.purchase, { cascade: true }),
      __metadata("design:type", Array)
    ], Purchase.prototype, "items", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Purchase.prototype, "createdAt", void 0);
    exports2.Purchase = Purchase = __decorate([
      (0, typeorm_1.Entity)("purchases")
    ], Purchase);
  }
});

// dist/purchases/entities/purchase-item.entity.js
var require_purchase_item_entity = __commonJS({
  "dist/purchases/entities/purchase-item.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PurchaseItem = void 0;
    var typeorm_1 = require("typeorm");
    var purchase_entity_1 = require_purchase_entity();
    var product_entity_1 = require_product_entity();
    var PurchaseItem = class PurchaseItem {
      id;
      purchaseId;
      purchase;
      productId;
      product;
      quantity;
      unitCost;
      subtotal;
    };
    exports2.PurchaseItem = PurchaseItem;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], PurchaseItem.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "purchase_id" }),
      __metadata("design:type", Number)
    ], PurchaseItem.prototype, "purchaseId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => purchase_entity_1.Purchase, (purchase) => purchase.items, { onDelete: "CASCADE" }),
      (0, typeorm_1.JoinColumn)({ name: "purchase_id" }),
      __metadata("design:type", purchase_entity_1.Purchase)
    ], PurchaseItem.prototype, "purchase", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "product_id" }),
      __metadata("design:type", Number)
    ], PurchaseItem.prototype, "productId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.purchaseItems),
      (0, typeorm_1.JoinColumn)({ name: "product_id" }),
      __metadata("design:type", product_entity_1.Product)
    ], PurchaseItem.prototype, "product", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "int" }),
      __metadata("design:type", Number)
    ], PurchaseItem.prototype, "quantity", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "unit_cost", type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], PurchaseItem.prototype, "unitCost", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], PurchaseItem.prototype, "subtotal", void 0);
    exports2.PurchaseItem = PurchaseItem = __decorate([
      (0, typeorm_1.Entity)("purchase_items")
    ], PurchaseItem);
  }
});

// dist/products/entities/product-recipe.entity.js
var require_product_recipe_entity = __commonJS({
  "dist/products/entities/product-recipe.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProductRecipe = void 0;
    var typeorm_1 = require("typeorm");
    var product_entity_1 = require_product_entity();
    var enums_1 = require_enums();
    var ProductRecipe = class ProductRecipe {
      id;
      productId;
      product;
      ingredientProductId;
      ingredient;
      quantity;
      unit;
    };
    exports2.ProductRecipe = ProductRecipe;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], ProductRecipe.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "product_id" }),
      __metadata("design:type", Number)
    ], ProductRecipe.prototype, "productId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.recipe, { onDelete: "CASCADE" }),
      (0, typeorm_1.JoinColumn)({ name: "product_id" }),
      __metadata("design:type", product_entity_1.Product)
    ], ProductRecipe.prototype, "product", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "ingredient_product_id" }),
      __metadata("design:type", Number)
    ], ProductRecipe.prototype, "ingredientProductId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { eager: false }),
      (0, typeorm_1.JoinColumn)({ name: "ingredient_product_id" }),
      __metadata("design:type", product_entity_1.Product)
    ], ProductRecipe.prototype, "ingredient", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 3 }),
      __metadata("design:type", Number)
    ], ProductRecipe.prototype, "quantity", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "enum", enum: enums_1.StockUnit, default: enums_1.StockUnit.G }),
      __metadata("design:type", String)
    ], ProductRecipe.prototype, "unit", void 0);
    exports2.ProductRecipe = ProductRecipe = __decorate([
      (0, typeorm_1.Entity)("product_recipes")
    ], ProductRecipe);
  }
});

// dist/products/entities/product-option.entity.js
var require_product_option_entity = __commonJS({
  "dist/products/entities/product-option.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProductOption = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var product_entity_1 = require_product_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var ProductOption = class ProductOption {
      id;
      groupId;
      group;
      name;
      ingredientProductId;
      ingredient;
      quantity;
      unit;
      unitCost;
      unitPrice;
    };
    exports2.ProductOption = ProductOption;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], ProductOption.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "group_id" }),
      __metadata("design:type", Number)
    ], ProductOption.prototype, "groupId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_option_group_entity_1.ProductOptionGroup, (group) => group.options, { onDelete: "CASCADE" }),
      (0, typeorm_1.JoinColumn)({ name: "group_id" }),
      __metadata("design:type", product_option_group_entity_1.ProductOptionGroup)
    ], ProductOption.prototype, "group", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 100 }),
      __metadata("design:type", String)
    ], ProductOption.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "ingredient_product_id", nullable: true }),
      __metadata("design:type", Object)
    ], ProductOption.prototype, "ingredientProductId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { nullable: true }),
      (0, typeorm_1.JoinColumn)({ name: "ingredient_product_id" }),
      __metadata("design:type", Object)
    ], ProductOption.prototype, "ingredient", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 3 }),
      __metadata("design:type", Number)
    ], ProductOption.prototype, "quantity", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "enum", enum: enums_1.StockUnit, default: enums_1.StockUnit.G }),
      __metadata("design:type", String)
    ], ProductOption.prototype, "unit", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "unit_cost", type: "decimal", precision: 12, scale: 2, default: 0 }),
      __metadata("design:type", Number)
    ], ProductOption.prototype, "unitCost", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "unit_price", type: "decimal", precision: 12, scale: 2, default: 0 }),
      __metadata("design:type", Number)
    ], ProductOption.prototype, "unitPrice", void 0);
    exports2.ProductOption = ProductOption = __decorate([
      (0, typeorm_1.Entity)("product_options")
    ], ProductOption);
  }
});

// dist/products/entities/product-option-group.entity.js
var require_product_option_group_entity = __commonJS({
  "dist/products/entities/product-option-group.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProductOptionGroup = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var product_entity_1 = require_product_entity();
    var product_option_entity_1 = require_product_option_entity();
    var ProductOptionGroup = class ProductOptionGroup {
      id;
      productId;
      product;
      name;
      kind;
      minSelect;
      maxSelect;
      sortOrder;
      options;
    };
    exports2.ProductOptionGroup = ProductOptionGroup;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], ProductOptionGroup.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "product_id" }),
      __metadata("design:type", Number)
    ], ProductOptionGroup.prototype, "productId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.optionGroups, { onDelete: "CASCADE" }),
      (0, typeorm_1.JoinColumn)({ name: "product_id" }),
      __metadata("design:type", product_entity_1.Product)
    ], ProductOptionGroup.prototype, "product", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 100 }),
      __metadata("design:type", String)
    ], ProductOptionGroup.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "enum", enum: enums_1.OptionGroupKind }),
      __metadata("design:type", String)
    ], ProductOptionGroup.prototype, "kind", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "min_select", type: "int", default: 1 }),
      __metadata("design:type", Number)
    ], ProductOptionGroup.prototype, "minSelect", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "max_select", type: "int", default: 1 }),
      __metadata("design:type", Number)
    ], ProductOptionGroup.prototype, "maxSelect", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "sort_order", type: "int", default: 0 }),
      __metadata("design:type", Number)
    ], ProductOptionGroup.prototype, "sortOrder", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => product_option_entity_1.ProductOption, (option) => option.group, { cascade: true }),
      __metadata("design:type", Array)
    ], ProductOptionGroup.prototype, "options", void 0);
    exports2.ProductOptionGroup = ProductOptionGroup = __decorate([
      (0, typeorm_1.Entity)("product_option_groups")
    ], ProductOptionGroup);
  }
});

// dist/products/entities/product.entity.js
var require_product_entity = __commonJS({
  "dist/products/entities/product.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Product = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var store_entity_1 = require_store_entity();
    var category_entity_1 = require_category_entity();
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var product_recipe_entity_1 = require_product_recipe_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var Product = class Product {
      id;
      storeId;
      store;
      sku;
      name;
      description;
      imageKey;
      productType;
      stockUnit;
      baseProductId;
      baseProduct;
      portionSize;
      recipeBatchSize;
      scoopCount;
      variableScoops;
      scoopPrices;
      salePrice;
      costPrice;
      stock;
      minStock;
      categoryId;
      category;
      active;
      visibleInPos;
      recipe;
      optionGroups;
      movements;
      saleItems;
      purchaseItems;
      createdAt;
      updatedAt;
    };
    exports2.Product = Product;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Product.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Product.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 50 }),
      __metadata("design:type", String)
    ], Product.prototype, "sku", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 200 }),
      __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "image_key", type: "varchar", length: 500, nullable: true }),
      __metadata("design:type", Object)
    ], Product.prototype, "imageKey", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "product_type", type: "enum", enum: enums_1.ProductType, default: enums_1.ProductType.SIMPLE }),
      __metadata("design:type", String)
    ], Product.prototype, "productType", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "stock_unit", type: "enum", enum: enums_1.StockUnit, default: enums_1.StockUnit.UNIT }),
      __metadata("design:type", String)
    ], Product.prototype, "stockUnit", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "base_product_id", nullable: true }),
      __metadata("design:type", Object)
    ], Product.prototype, "baseProductId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => Product, { nullable: true }),
      (0, typeorm_1.JoinColumn)({ name: "base_product_id" }),
      __metadata("design:type", Object)
    ], Product.prototype, "baseProduct", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "portion_size", type: "decimal", precision: 12, scale: 3, nullable: true }),
      __metadata("design:type", Object)
    ], Product.prototype, "portionSize", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "recipe_batch_size", type: "decimal", precision: 12, scale: 3, nullable: true }),
      __metadata("design:type", Object)
    ], Product.prototype, "recipeBatchSize", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "scoop_count", type: "int", nullable: true }),
      __metadata("design:type", Object)
    ], Product.prototype, "scoopCount", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "variable_scoops", default: false }),
      __metadata("design:type", Boolean)
    ], Product.prototype, "variableScoops", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "scoop_prices", type: "json", nullable: true }),
      __metadata("design:type", Object)
    ], Product.prototype, "scoopPrices", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "sale_price", type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], Product.prototype, "salePrice", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "cost_price", type: "decimal", precision: 12, scale: 2, default: 0 }),
      __metadata("design:type", Number)
    ], Product.prototype, "costPrice", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 3, default: 0 }),
      __metadata("design:type", Number)
    ], Product.prototype, "stock", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "min_stock", type: "decimal", precision: 12, scale: 3, default: 0 }),
      __metadata("design:type", Number)
    ], Product.prototype, "minStock", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "category_id", nullable: true }),
      __metadata("design:type", Number)
    ], Product.prototype, "categoryId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.products, { nullable: true }),
      (0, typeorm_1.JoinColumn)({ name: "category_id" }),
      __metadata("design:type", category_entity_1.Category)
    ], Product.prototype, "category", void 0);
    __decorate([
      (0, typeorm_1.Column)({ default: true }),
      __metadata("design:type", Boolean)
    ], Product.prototype, "active", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "visible_in_pos", default: true }),
      __metadata("design:type", Boolean)
    ], Product.prototype, "visibleInPos", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => product_recipe_entity_1.ProductRecipe, (recipe) => recipe.product),
      __metadata("design:type", Array)
    ], Product.prototype, "recipe", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => product_option_group_entity_1.ProductOptionGroup, (group) => group.product),
      __metadata("design:type", Array)
    ], Product.prototype, "optionGroups", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => inventory_movement_entity_1.InventoryMovement, (movement) => movement.product),
      __metadata("design:type", Array)
    ], Product.prototype, "movements", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => sale_item_entity_1.SaleItem, (item) => item.product),
      __metadata("design:type", Array)
    ], Product.prototype, "saleItems", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => purchase_item_entity_1.PurchaseItem, (item) => item.product),
      __metadata("design:type", Array)
    ], Product.prototype, "purchaseItems", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Product.prototype, "createdAt", void 0);
    __decorate([
      (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
      __metadata("design:type", Date)
    ], Product.prototype, "updatedAt", void 0);
    exports2.Product = Product = __decorate([
      (0, typeorm_1.Entity)("products"),
      (0, typeorm_1.Unique)(["storeId", "sku"])
    ], Product);
  }
});

// dist/sales/entities/sale-item.entity.js
var require_sale_item_entity = __commonJS({
  "dist/sales/entities/sale-item.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SaleItem = void 0;
    var typeorm_1 = require("typeorm");
    var sale_entity_1 = require_sale_entity();
    var product_entity_1 = require_product_entity();
    var SaleItem = class SaleItem {
      id;
      saleId;
      sale;
      productId;
      product;
      productName;
      quantity;
      unitPrice;
      unitCost;
      subtotal;
      selectedOptions;
    };
    exports2.SaleItem = SaleItem;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "sale_id" }),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "saleId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => sale_entity_1.Sale, (sale) => sale.items, { onDelete: "CASCADE" }),
      (0, typeorm_1.JoinColumn)({ name: "sale_id" }),
      __metadata("design:type", sale_entity_1.Sale)
    ], SaleItem.prototype, "sale", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "product_id" }),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "productId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.saleItems),
      (0, typeorm_1.JoinColumn)({ name: "product_id" }),
      __metadata("design:type", product_entity_1.Product)
    ], SaleItem.prototype, "product", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 200 }),
      __metadata("design:type", String)
    ], SaleItem.prototype, "productName", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "int" }),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "quantity", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "unit_price", type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "unitPrice", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "unit_cost", type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "unitCost", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], SaleItem.prototype, "subtotal", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "selected_options", type: "json", nullable: true }),
      __metadata("design:type", Object)
    ], SaleItem.prototype, "selectedOptions", void 0);
    exports2.SaleItem = SaleItem = __decorate([
      (0, typeorm_1.Entity)("sale_items")
    ], SaleItem);
  }
});

// dist/sales/entities/sale.entity.js
var require_sale_entity = __commonJS({
  "dist/sales/entities/sale.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sale = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var store_entity_1 = require_store_entity();
    var user_entity_1 = require_user_entity();
    var customer_entity_1 = require_customer_entity();
    var cash_session_entity_1 = require_cash_session_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var Sale = class Sale {
      id;
      storeId;
      store;
      ticketNumber;
      subtotal;
      taxAmount;
      total;
      profit;
      paymentMethod;
      amountPaid;
      change;
      customerId;
      customer;
      userId;
      user;
      cashSessionId;
      cashSession;
      items;
      createdAt;
    };
    exports2.Sale = Sale;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], Sale.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], Sale.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], Sale.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "ticket_number", length: 30 }),
      __metadata("design:type", String)
    ], Sale.prototype, "ticketNumber", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], Sale.prototype, "subtotal", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "tax_amount", type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], Sale.prototype, "taxAmount", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], Sale.prototype, "total", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
      __metadata("design:type", Number)
    ], Sale.prototype, "profit", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "payment_method", type: "enum", enum: enums_1.PaymentMethod, default: enums_1.PaymentMethod.CASH }),
      __metadata("design:type", String)
    ], Sale.prototype, "paymentMethod", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "amount_paid", type: "decimal", precision: 12, scale: 2, nullable: true }),
      __metadata("design:type", Number)
    ], Sale.prototype, "amountPaid", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, nullable: true }),
      __metadata("design:type", Number)
    ], Sale.prototype, "change", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "customer_id", nullable: true }),
      __metadata("design:type", Number)
    ], Sale.prototype, "customerId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.sales, { nullable: true }),
      (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
      __metadata("design:type", customer_entity_1.Customer)
    ], Sale.prototype, "customer", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "user_id" }),
      __metadata("design:type", Number)
    ], Sale.prototype, "userId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sales),
      (0, typeorm_1.JoinColumn)({ name: "user_id" }),
      __metadata("design:type", user_entity_1.User)
    ], Sale.prototype, "user", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "cash_session_id" }),
      __metadata("design:type", Number)
    ], Sale.prototype, "cashSessionId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => cash_session_entity_1.CashSession, (session) => session.sales),
      (0, typeorm_1.JoinColumn)({ name: "cash_session_id" }),
      __metadata("design:type", cash_session_entity_1.CashSession)
    ], Sale.prototype, "cashSession", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => sale_item_entity_1.SaleItem, (item) => item.sale, { cascade: true }),
      __metadata("design:type", Array)
    ], Sale.prototype, "items", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], Sale.prototype, "createdAt", void 0);
    exports2.Sale = Sale = __decorate([
      (0, typeorm_1.Entity)("sales"),
      (0, typeorm_1.Unique)(["storeId", "ticketNumber"])
    ], Sale);
  }
});

// dist/cash-sessions/entities/cash-session.entity.js
var require_cash_session_entity = __commonJS({
  "dist/cash-sessions/entities/cash-session.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CashSession = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var store_entity_1 = require_store_entity();
    var user_entity_1 = require_user_entity();
    var sale_entity_1 = require_sale_entity();
    var CashSession = class CashSession {
      id;
      storeId;
      store;
      openingAmount;
      closingAmount;
      expectedAmount;
      difference;
      status;
      notes;
      userId;
      user;
      sales;
      openedAt;
      closedAt;
    };
    exports2.CashSession = CashSession;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], CashSession.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id" }),
      __metadata("design:type", Number)
    ], CashSession.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], CashSession.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "opening_amount", type: "decimal", precision: 12, scale: 2 }),
      __metadata("design:type", Number)
    ], CashSession.prototype, "openingAmount", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "closing_amount", type: "decimal", precision: 12, scale: 2, nullable: true }),
      __metadata("design:type", Number)
    ], CashSession.prototype, "closingAmount", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "expected_amount", type: "decimal", precision: 12, scale: 2, nullable: true }),
      __metadata("design:type", Number)
    ], CashSession.prototype, "expectedAmount", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, nullable: true }),
      __metadata("design:type", Number)
    ], CashSession.prototype, "difference", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "enum", enum: enums_1.CashSessionStatus, default: enums_1.CashSessionStatus.OPEN }),
      __metadata("design:type", String)
    ], CashSession.prototype, "status", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "text", nullable: true }),
      __metadata("design:type", String)
    ], CashSession.prototype, "notes", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "user_id" }),
      __metadata("design:type", Number)
    ], CashSession.prototype, "userId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cashSessions),
      (0, typeorm_1.JoinColumn)({ name: "user_id" }),
      __metadata("design:type", user_entity_1.User)
    ], CashSession.prototype, "user", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, (sale) => sale.cashSession),
      __metadata("design:type", Array)
    ], CashSession.prototype, "sales", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "opened_at" }),
      __metadata("design:type", Date)
    ], CashSession.prototype, "openedAt", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "closed_at", type: "datetime", nullable: true }),
      __metadata("design:type", Date)
    ], CashSession.prototype, "closedAt", void 0);
    exports2.CashSession = CashSession = __decorate([
      (0, typeorm_1.Entity)("cash_sessions")
    ], CashSession);
  }
});

// dist/users/entities/user.entity.js
var require_user_entity = __commonJS({
  "dist/users/entities/user.entity.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.User = void 0;
    var typeorm_1 = require("typeorm");
    var enums_1 = require_enums();
    var store_entity_1 = require_store_entity();
    var cash_session_entity_1 = require_cash_session_entity();
    var sale_entity_1 = require_sale_entity();
    var User = class User {
      id;
      name;
      email;
      passwordHash;
      role;
      storeId;
      store;
      active;
      cashSessions;
      sales;
      createdAt;
      updatedAt;
    };
    exports2.User = User;
    __decorate([
      (0, typeorm_1.PrimaryGeneratedColumn)(),
      __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
      (0, typeorm_1.Column)({ length: 100 }),
      __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
      (0, typeorm_1.Column)({ unique: true, length: 150 }),
      __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "password_hash" }),
      __metadata("design:type", String)
    ], User.prototype, "passwordHash", void 0);
    __decorate([
      (0, typeorm_1.Column)({ type: "enum", enum: enums_1.UserRole, default: enums_1.UserRole.CASHIER }),
      __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
      (0, typeorm_1.Column)({ name: "store_id", nullable: true }),
      __metadata("design:type", Object)
    ], User.prototype, "storeId", void 0);
    __decorate([
      (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, (store) => store.users, { nullable: true }),
      (0, typeorm_1.JoinColumn)({ name: "store_id" }),
      __metadata("design:type", store_entity_1.Store)
    ], User.prototype, "store", void 0);
    __decorate([
      (0, typeorm_1.Column)({ default: true }),
      __metadata("design:type", Boolean)
    ], User.prototype, "active", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => cash_session_entity_1.CashSession, (session) => session.user),
      __metadata("design:type", Array)
    ], User.prototype, "cashSessions", void 0);
    __decorate([
      (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, (sale) => sale.user),
      __metadata("design:type", Array)
    ], User.prototype, "sales", void 0);
    __decorate([
      (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
      __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
      (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
      __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    exports2.User = User = __decorate([
      (0, typeorm_1.Entity)("users")
    ], User);
  }
});

// dist/auth/auth.service.js
var require_auth_service = __commonJS({
  "dist/auth/auth.service.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AuthService = void 0;
    var common_1 = require("@nestjs/common");
    var jwt_1 = require("@nestjs/jwt");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var bcrypt = __importStar(require("bcryptjs"));
    var user_entity_1 = require_user_entity();
    var AuthService = class AuthService {
      usersRepo;
      jwtService;
      constructor(usersRepo, jwtService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
      }
      async login(email, password) {
        const user = await this.usersRepo.createQueryBuilder("u").leftJoinAndSelect("u.store", "store").where("LOWER(u.email) = LOWER(:email)", { email: email.trim() }).getOne();
        if (!user || !user.active) {
          throw new common_1.UnauthorizedException("Credenciales inv\xE1lidas");
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          throw new common_1.UnauthorizedException("Credenciales inv\xE1lidas");
        }
        const payload = {
          sub: user.id,
          email: user.email,
          role: user.role,
          storeId: user.storeId
        };
        return {
          accessToken: this.jwtService.sign(payload),
          user: this.toUserResponse(user)
        };
      }
      async getProfile(userId) {
        const user = await this.usersRepo.findOne({
          where: { id: userId },
          relations: ["store"]
        });
        if (!user)
          throw new common_1.UnauthorizedException();
        return this.toUserResponse(user);
      }
      async changePassword(userId, currentPassword, newPassword) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user || !user.active) {
          throw new common_1.UnauthorizedException("Usuario no encontrado");
        }
        const valid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!valid) {
          throw new common_1.BadRequestException("La contrase\xF1a actual es incorrecta");
        }
        if (currentPassword === newPassword) {
          throw new common_1.BadRequestException("La nueva contrase\xF1a debe ser diferente a la actual");
        }
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await this.usersRepo.save(user);
        return { message: "Contrase\xF1a actualizada correctamente" };
      }
      toUserResponse(user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          storeId: user.storeId,
          storeName: user.store?.name ?? null
        };
      }
    };
    exports2.AuthService = AuthService;
    exports2.AuthService = AuthService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        jwt_1.JwtService
      ])
    ], AuthService);
  }
});

// dist/auth/dto/login.dto.js
var require_login_dto = __commonJS({
  "dist/auth/dto/login.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LoginDto = void 0;
    var class_validator_1 = require("class-validator");
    var LoginDto = class {
      email;
      password;
    };
    exports2.LoginDto = LoginDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.Matches)(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email inv\xE1lido" }),
      __metadata("design:type", String)
    ], LoginDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(4),
      __metadata("design:type", String)
    ], LoginDto.prototype, "password", void 0);
  }
});

// dist/auth/dto/change-password.dto.js
var require_change_password_dto = __commonJS({
  "dist/auth/dto/change-password.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ChangePasswordDto = void 0;
    var class_validator_1 = require("class-validator");
    var ChangePasswordDto = class {
      currentPassword;
      newPassword;
    };
    exports2.ChangePasswordDto = ChangePasswordDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(4, { message: "La contrase\xF1a actual es requerida" }),
      __metadata("design:type", String)
    ], ChangePasswordDto.prototype, "currentPassword", void 0);
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(6, { message: "La nueva contrase\xF1a debe tener al menos 6 caracteres" }),
      __metadata("design:type", String)
    ], ChangePasswordDto.prototype, "newPassword", void 0);
  }
});

// dist/common/decorators/public.decorator.js
var require_public_decorator = __commonJS({
  "dist/common/decorators/public.decorator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Public = exports2.IS_PUBLIC_KEY = void 0;
    var common_1 = require("@nestjs/common");
    exports2.IS_PUBLIC_KEY = "isPublic";
    var Public = () => (0, common_1.SetMetadata)(exports2.IS_PUBLIC_KEY, true);
    exports2.Public = Public;
  }
});

// dist/auth/jwt-auth.guard.js
var require_jwt_auth_guard = __commonJS({
  "dist/auth/jwt-auth.guard.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JwtAuthGuard = void 0;
    var common_1 = require("@nestjs/common");
    var passport_1 = require("@nestjs/passport");
    var core_1 = require("@nestjs/core");
    var public_decorator_1 = require_public_decorator();
    var JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
      reflector;
      constructor(reflector) {
        super();
        this.reflector = reflector;
      }
      canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass()
        ]);
        if (isPublic)
          return true;
        return super.canActivate(context);
      }
    };
    exports2.JwtAuthGuard = JwtAuthGuard;
    exports2.JwtAuthGuard = JwtAuthGuard = __decorate([
      (0, common_1.Injectable)(),
      __metadata("design:paramtypes", [core_1.Reflector])
    ], JwtAuthGuard);
  }
});

// dist/common/decorators/current-user.decorator.js
var require_current_user_decorator = __commonJS({
  "dist/common/decorators/current-user.decorator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CurrentUser = void 0;
    var common_1 = require("@nestjs/common");
    exports2.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
      return data ? user?.[data] : user;
    });
  }
});

// dist/auth/auth.controller.js
var require_auth_controller = __commonJS({
  "dist/auth/auth.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AuthController = void 0;
    var common_1 = require("@nestjs/common");
    var auth_service_1 = require_auth_service();
    var login_dto_1 = require_login_dto();
    var change_password_dto_1 = require_change_password_dto();
    var public_decorator_1 = require_public_decorator();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var current_user_decorator_1 = require_current_user_decorator();
    var AuthController = class AuthController {
      authService;
      constructor(authService) {
        this.authService = authService;
      }
      login(dto) {
        return this.authService.login(dto.email, dto.password);
      }
      me(userId) {
        return this.authService.getProfile(userId);
      }
      changePassword(userId, dto) {
        return this.authService.changePassword(userId, dto.currentPassword, dto.newPassword);
      }
    };
    exports2.AuthController = AuthController;
    __decorate([
      (0, public_decorator_1.Public)(),
      (0, common_1.Post)("login"),
      __param(0, (0, common_1.Body)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [login_dto_1.LoginDto]),
      __metadata("design:returntype", void 0)
    ], AuthController.prototype, "login", null);
    __decorate([
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
      (0, common_1.Get)("me"),
      __param(0, (0, current_user_decorator_1.CurrentUser)("sub")),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number]),
      __metadata("design:returntype", void 0)
    ], AuthController.prototype, "me", null);
    __decorate([
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
      (0, common_1.Patch)("change-password"),
      __param(0, (0, current_user_decorator_1.CurrentUser)("sub")),
      __param(1, (0, common_1.Body)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, change_password_dto_1.ChangePasswordDto]),
      __metadata("design:returntype", void 0)
    ], AuthController.prototype, "changePassword", null);
    exports2.AuthController = AuthController = __decorate([
      (0, common_1.Controller)("auth"),
      __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], AuthController);
  }
});

// dist/auth/jwt.strategy.js
var require_jwt_strategy = __commonJS({
  "dist/auth/jwt.strategy.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JwtStrategy = void 0;
    var common_1 = require("@nestjs/common");
    var passport_1 = require("@nestjs/passport");
    var passport_jwt_1 = require("passport-jwt");
    var config_1 = require("@nestjs/config");
    var JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
      constructor(config) {
        super({
          jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: config.get("JWT_SECRET", "secret")
        });
      }
      validate(payload) {
        return payload;
      }
    };
    exports2.JwtStrategy = JwtStrategy;
    exports2.JwtStrategy = JwtStrategy = __decorate([
      (0, common_1.Injectable)(),
      __metadata("design:paramtypes", [config_1.ConfigService])
    ], JwtStrategy);
  }
});

// dist/auth/auth.module.js
var require_auth_module = __commonJS({
  "dist/auth/auth.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AuthModule = void 0;
    var common_1 = require("@nestjs/common");
    var jwt_1 = require("@nestjs/jwt");
    var passport_1 = require("@nestjs/passport");
    var typeorm_1 = require("@nestjs/typeorm");
    var config_1 = require("@nestjs/config");
    var auth_service_1 = require_auth_service();
    var auth_controller_1 = require_auth_controller();
    var jwt_strategy_1 = require_jwt_strategy();
    var user_entity_1 = require_user_entity();
    var AuthModule = class AuthModule {
    };
    exports2.AuthModule = AuthModule;
    exports2.AuthModule = AuthModule = __decorate([
      (0, common_1.Module)({
        imports: [
          typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
          passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
          jwt_1.JwtModule.registerAsync({
            imports: [config_1.ConfigModule],
            inject: [config_1.ConfigService],
            useFactory: (config) => ({
              secret: config.get("JWT_SECRET", "secret"),
              signOptions: {
                expiresIn: config.get("JWT_EXPIRES_IN", "8h")
              }
            })
          })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule]
      })
    ], AuthModule);
  }
});

// dist/common/utils/store-context.util.js
var require_store_context_util = __commonJS({
  "dist/common/utils/store-context.util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveStoreContext = resolveStoreContext;
    exports2.requireStoreId = requireStoreId;
    exports2.reportStoreId = reportStoreId;
    exports2.storeWhere = storeWhere;
    var common_1 = require("@nestjs/common");
    var enums_1 = require_enums();
    function resolveStoreContext(user, headerStoreId) {
      const isSuperAdmin = user.role === enums_1.UserRole.SUPER_ADMIN;
      if (isSuperAdmin) {
        const parsed = headerStoreId ? parseInt(headerStoreId, 10) : NaN;
        const activeStoreId = !isNaN(parsed) && parsed > 0 ? parsed : null;
        return {
          userStoreId: null,
          activeStoreId,
          isSuperAdmin: true,
          allStores: activeStoreId === null
        };
      }
      if (!user.storeId) {
        throw new common_1.ForbiddenException("Usuario sin tienda asignada");
      }
      return {
        userStoreId: user.storeId,
        activeStoreId: user.storeId,
        isSuperAdmin: false,
        allStores: false
      };
    }
    function requireStoreId(ctx) {
      if (ctx.activeStoreId)
        return ctx.activeStoreId;
      throw new common_1.BadRequestException("Selecciona una tienda activa (header X-Store-Id) para esta operaci\xF3n");
    }
    function reportStoreId(ctx) {
      if (ctx.allStores)
        return void 0;
      return requireStoreId(ctx);
    }
    function storeWhere(ctx) {
      if (ctx.allStores)
        return {};
      if (ctx.activeStoreId)
        return { storeId: ctx.activeStoreId };
      return {};
    }
  }
});

// dist/common/interceptors/store-context.interceptor.js
var require_store_context_interceptor = __commonJS({
  "dist/common/interceptors/store-context.interceptor.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StoreContextInterceptor = void 0;
    var common_1 = require("@nestjs/common");
    var store_context_util_1 = require_store_context_util();
    var StoreContextInterceptor = class StoreContextInterceptor {
      intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
          const headerStoreId = request.headers["x-store-id"];
          request.storeContext = (0, store_context_util_1.resolveStoreContext)(request.user, headerStoreId);
        }
        return next.handle();
      }
    };
    exports2.StoreContextInterceptor = StoreContextInterceptor;
    exports2.StoreContextInterceptor = StoreContextInterceptor = __decorate([
      (0, common_1.Injectable)()
    ], StoreContextInterceptor);
  }
});

// dist/users/users.service.js
var require_users_service = __commonJS({
  "dist/users/users.service.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UsersService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var bcrypt = __importStar(require("bcryptjs"));
    var user_entity_1 = require_user_entity();
    var enums_1 = require_enums();
    var store_context_util_1 = require_store_context_util();
    var UsersService = class UsersService {
      repo;
      constructor(repo) {
        this.repo = repo;
      }
      async findAll(query, ctx) {
        const { page = 1, limit = 10, search } = query;
        const scope = (0, store_context_util_1.storeWhere)(ctx);
        const qb = this.repo.createQueryBuilder("u").leftJoinAndSelect("u.store", "store").orderBy("u.id", "DESC").skip((page - 1) * limit).take(limit).select(["u.id", "u.name", "u.email", "u.role", "u.active", "u.storeId", "u.createdAt", "store.id", "store.name"]);
        if (scope.storeId)
          qb.andWhere("u.storeId = :storeId", { storeId: scope.storeId });
        if (search)
          qb.andWhere("(u.name LIKE :s OR u.email LIKE :s)", { s: `%${search}%` });
        const [data, total] = await qb.getManyAndCount();
        const mapped = data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          active: u.active,
          storeId: u.storeId,
          storeName: u.store?.name ?? null,
          createdAt: u.createdAt
        }));
        return { data: mapped, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findOne(id, ctx) {
        const user = await this.repo.findOne({
          where: { id },
          relations: ["store"],
          select: ["id", "name", "email", "role", "active", "storeId", "createdAt"]
        });
        if (!user)
          throw new common_1.NotFoundException("Usuario no encontrado");
        if (!ctx.isSuperAdmin && user.storeId !== ctx.userStoreId) {
          throw new common_1.ForbiddenException("No tienes acceso a este usuario");
        }
        return {
          ...user,
          storeName: user.store?.name ?? null
        };
      }
      async create(dto, ctx) {
        this.validateUserDto(dto.role, dto.storeId, ctx);
        const exists = await this.repo.findOne({ where: { email: dto.email } });
        if (exists)
          throw new common_1.ConflictException("El email ya est\xE1 registrado");
        const storeId = dto.role === enums_1.UserRole.SUPER_ADMIN ? null : dto.storeId;
        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.repo.create({
          name: dto.name,
          email: dto.email,
          role: dto.role,
          storeId,
          passwordHash: hash
        });
        const saved = await this.repo.save(user);
        return this.findOne(saved.id, ctx);
      }
      async update(id, dto, ctx) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user)
          throw new common_1.NotFoundException("Usuario no encontrado");
        if (!ctx.isSuperAdmin && user.storeId !== ctx.userStoreId) {
          throw new common_1.ForbiddenException("No tienes acceso a este usuario");
        }
        if (dto.role || dto.storeId !== void 0) {
          const role = dto.role ?? user.role;
          const storeId = dto.storeId !== void 0 ? dto.storeId : user.storeId ?? void 0;
          this.validateUserDto(role, storeId ?? void 0, ctx);
        }
        if (dto.email && dto.email !== user.email) {
          const exists = await this.repo.findOne({ where: { email: dto.email } });
          if (exists)
            throw new common_1.ConflictException("El email ya est\xE1 registrado");
        }
        if (dto.password) {
          user.passwordHash = await bcrypt.hash(dto.password, 10);
        }
        if (dto.role === enums_1.UserRole.SUPER_ADMIN) {
          user.storeId = null;
        } else if (dto.storeId !== void 0) {
          user.storeId = dto.storeId;
        }
        Object.assign(user, {
          name: dto.name ?? user.name,
          email: dto.email ?? user.email,
          role: dto.role ?? user.role,
          active: dto.active ?? user.active
        });
        await this.repo.save(user);
        return this.findOne(id, ctx);
      }
      async remove(id, ctx) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user)
          throw new common_1.NotFoundException("Usuario no encontrado");
        if (!ctx.isSuperAdmin && user.storeId !== ctx.userStoreId) {
          throw new common_1.ForbiddenException("No tienes acceso a este usuario");
        }
        await this.repo.remove(user);
        return { message: "Usuario eliminado" };
      }
      validateUserDto(role, storeId, ctx) {
        if (role === enums_1.UserRole.SUPER_ADMIN) {
          if (!ctx.isSuperAdmin)
            throw new common_1.ForbiddenException("Solo super admin puede crear super admins");
          return;
        }
        if (!storeId)
          throw new common_1.BadRequestException("storeId es requerido para admin/cajero");
        if (!ctx.isSuperAdmin && storeId !== ctx.userStoreId) {
          throw new common_1.ForbiddenException("No puedes asignar usuarios a otra tienda");
        }
        (0, store_context_util_1.requireStoreId)({ ...ctx, activeStoreId: storeId, allStores: false });
      }
    };
    exports2.UsersService = UsersService;
    exports2.UsersService = UsersService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
      __metadata("design:paramtypes", [typeorm_2.Repository])
    ], UsersService);
  }
});

// dist/users/dto/user.dto.js
var require_user_dto = __commonJS({
  "dist/users/dto/user.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateUserDto = exports2.CreateUserDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var enums_1 = require_enums();
    var CreateUserDto = class {
      name;
      email;
      password;
      role;
      storeId;
    };
    exports2.CreateUserDto = CreateUserDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      __metadata("design:type", String)
    ], CreateUserDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsEmail)(),
      __metadata("design:type", String)
    ], CreateUserDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(4),
      __metadata("design:type", String)
    ], CreateUserDto.prototype, "password", void 0);
    __decorate([
      (0, class_validator_1.IsEnum)(enums_1.UserRole),
      __metadata("design:type", String)
    ], CreateUserDto.prototype, "role", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.role !== enums_1.UserRole.SUPER_ADMIN),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], CreateUserDto.prototype, "storeId", void 0);
    var UpdateUserDto = class {
      name;
      email;
      password;
      role;
      active;
      storeId;
    };
    exports2.UpdateUserDto = UpdateUserDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      __metadata("design:type", String)
    ], UpdateUserDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEmail)(),
      __metadata("design:type", String)
    ], UpdateUserDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(4),
      __metadata("design:type", String)
    ], UpdateUserDto.prototype, "password", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEnum)(enums_1.UserRole),
      __metadata("design:type", String)
    ], UpdateUserDto.prototype, "role", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateUserDto.prototype, "active", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], UpdateUserDto.prototype, "storeId", void 0);
  }
});

// dist/common/dto/pagination.dto.js
var require_pagination_dto = __commonJS({
  "dist/common/dto/pagination.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PaginationDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var PaginationDto = class {
      page = 1;
      limit = 10;
      search;
    };
    exports2.PaginationDto = PaginationDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], PaginationDto.prototype, "page", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      (0, class_validator_1.Max)(100),
      __metadata("design:type", Number)
    ], PaginationDto.prototype, "limit", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], PaginationDto.prototype, "search", void 0);
  }
});

// dist/common/decorators/roles.decorator.js
var require_roles_decorator = __commonJS({
  "dist/common/decorators/roles.decorator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Roles = exports2.ROLES_KEY = void 0;
    var common_1 = require("@nestjs/common");
    exports2.ROLES_KEY = "roles";
    var Roles = (...roles) => (0, common_1.SetMetadata)(exports2.ROLES_KEY, roles);
    exports2.Roles = Roles;
  }
});

// dist/common/guards/roles.guard.js
var require_roles_guard = __commonJS({
  "dist/common/guards/roles.guard.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RolesGuard = void 0;
    var common_1 = require("@nestjs/common");
    var core_1 = require("@nestjs/core");
    var roles_decorator_1 = require_roles_decorator();
    var RolesGuard = class RolesGuard {
      reflector;
      constructor(reflector) {
        this.reflector = reflector;
      }
      canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles)
          return true;
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user?.role === role);
      }
    };
    exports2.RolesGuard = RolesGuard;
    exports2.RolesGuard = RolesGuard = __decorate([
      (0, common_1.Injectable)(),
      __metadata("design:paramtypes", [core_1.Reflector])
    ], RolesGuard);
  }
});

// dist/common/decorators/store-context.decorator.js
var require_store_context_decorator = __commonJS({
  "dist/common/decorators/store-context.decorator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StoreCtx = void 0;
    var common_1 = require("@nestjs/common");
    exports2.StoreCtx = (0, common_1.createParamDecorator)((_data, ctx) => {
      const request = ctx.switchToHttp().getRequest();
      return request.storeContext;
    });
  }
});

// dist/users/users.controller.js
var require_users_controller = __commonJS({
  "dist/users/users.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UsersController = void 0;
    var common_1 = require("@nestjs/common");
    var users_service_1 = require_users_service();
    var user_dto_1 = require_user_dto();
    var pagination_dto_1 = require_pagination_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var UsersController = class UsersController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, ctx) {
        return this.service.create(dto, ctx);
      }
      update(id, dto, ctx) {
        return this.service.update(id, dto, ctx);
      }
      remove(id, ctx) {
        return this.service.remove(id, ctx);
      }
    };
    exports2.UsersController = UsersController;
    __decorate([
      (0, common_1.Get)(),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
      __metadata("design:returntype", void 0)
    ], UsersController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], UsersController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
      __metadata("design:returntype", void 0)
    ], UsersController.prototype, "create", null);
    __decorate([
      (0, common_1.Patch)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, user_dto_1.UpdateUserDto, Object]),
      __metadata("design:returntype", void 0)
    ], UsersController.prototype, "update", null);
    __decorate([
      (0, common_1.Delete)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], UsersController.prototype, "remove", null);
    exports2.UsersController = UsersController = __decorate([
      (0, common_1.Controller)("users"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __metadata("design:paramtypes", [users_service_1.UsersService])
    ], UsersController);
  }
});

// dist/users/users.module.js
var require_users_module = __commonJS({
  "dist/users/users.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UsersModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var user_entity_1 = require_user_entity();
    var users_service_1 = require_users_service();
    var users_controller_1 = require_users_controller();
    var UsersModule = class UsersModule {
    };
    exports2.UsersModule = UsersModule;
    exports2.UsersModule = UsersModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService]
      })
    ], UsersModule);
  }
});

// dist/stores/stores.service.js
var require_stores_service = __commonJS({
  "dist/stores/stores.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StoresService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var store_entity_1 = require_store_entity();
    var setting_entity_1 = require_setting_entity();
    var StoresService = class StoresService {
      repo;
      settingsRepo;
      constructor(repo, settingsRepo) {
        this.repo = repo;
        this.settingsRepo = settingsRepo;
      }
      async findAll(ctx) {
        if (ctx.isSuperAdmin && ctx.allStores) {
          return this.repo.find({ order: { name: "ASC" } });
        }
        const storeId = ctx.activeStoreId ?? ctx.userStoreId;
        if (!storeId)
          return [];
        const store = await this.repo.findOne({ where: { id: storeId } });
        return store ? [store] : [];
      }
      async findOne(id) {
        const store = await this.repo.findOne({ where: { id } });
        if (!store)
          throw new common_1.NotFoundException("Tienda no encontrada");
        return store;
      }
      async create(dto) {
        const exists = await this.repo.findOne({ where: { code: dto.code } });
        if (exists)
          throw new common_1.ConflictException("El c\xF3digo de tienda ya existe");
        const store = await this.repo.save(this.repo.create(dto));
        await this.settingsRepo.save(this.settingsRepo.create({
          storeId: store.id,
          businessName: dto.name,
          address: dto.address,
          phone: dto.phone,
          taxRate: 0.19,
          currency: "COP"
        }));
        return store;
      }
      async update(id, dto) {
        const store = await this.findOne(id);
        Object.assign(store, dto);
        return this.repo.save(store);
      }
      async deactivate(id) {
        return this.update(id, { active: false });
      }
    };
    exports2.StoresService = StoresService;
    exports2.StoresService = StoresService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
      __param(1, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.Repository
      ])
    ], StoresService);
  }
});

// dist/stores/dto/store.dto.js
var require_store_dto = __commonJS({
  "dist/stores/dto/store.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateStoreDto = exports2.CreateStoreDto = void 0;
    var class_validator_1 = require("class-validator");
    var CreateStoreDto = class {
      name;
      code;
      address;
      phone;
    };
    exports2.CreateStoreDto = CreateStoreDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      (0, class_validator_1.MaxLength)(150),
      __metadata("design:type", String)
    ], CreateStoreDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      (0, class_validator_1.MaxLength)(50),
      __metadata("design:type", String)
    ], CreateStoreDto.prototype, "code", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreateStoreDto.prototype, "address", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreateStoreDto.prototype, "phone", void 0);
    var UpdateStoreDto = class {
      name;
      address;
      phone;
      active;
    };
    exports2.UpdateStoreDto = UpdateStoreDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      (0, class_validator_1.MaxLength)(150),
      __metadata("design:type", String)
    ], UpdateStoreDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateStoreDto.prototype, "address", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateStoreDto.prototype, "phone", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      __metadata("design:type", Boolean)
    ], UpdateStoreDto.prototype, "active", void 0);
  }
});

// dist/stores/stores.controller.js
var require_stores_controller = __commonJS({
  "dist/stores/stores.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StoresController = void 0;
    var common_1 = require("@nestjs/common");
    var stores_service_1 = require_stores_service();
    var store_dto_1 = require_store_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var StoresController = class StoresController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(ctx) {
        return this.service.findAll(ctx);
      }
      findOne(id) {
        return this.service.findOne(id);
      }
      create(dto) {
        return this.service.create(dto);
      }
      update(id, dto) {
        return this.service.update(id, dto);
      }
      deactivate(id) {
        return this.service.deactivate(id);
      }
    };
    exports2.StoresController = StoresController;
    __decorate([
      (0, common_1.Get)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], StoresController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number]),
      __metadata("design:returntype", void 0)
    ], StoresController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN),
      __param(0, (0, common_1.Body)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [store_dto_1.CreateStoreDto]),
      __metadata("design:returntype", void 0)
    ], StoresController.prototype, "create", null);
    __decorate([
      (0, common_1.Patch)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, store_dto_1.UpdateStoreDto]),
      __metadata("design:returntype", void 0)
    ], StoresController.prototype, "update", null);
    __decorate([
      (0, common_1.Patch)(":id/deactivate"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number]),
      __metadata("design:returntype", void 0)
    ], StoresController.prototype, "deactivate", null);
    exports2.StoresController = StoresController = __decorate([
      (0, common_1.Controller)("stores"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      __metadata("design:paramtypes", [stores_service_1.StoresService])
    ], StoresController);
  }
});

// dist/stores/stores.module.js
var require_stores_module = __commonJS({
  "dist/stores/stores.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StoresModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var store_entity_1 = require_store_entity();
    var setting_entity_1 = require_setting_entity();
    var stores_service_1 = require_stores_service();
    var stores_controller_1 = require_stores_controller();
    var StoresModule = class StoresModule {
    };
    exports2.StoresModule = StoresModule;
    exports2.StoresModule = StoresModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([store_entity_1.Store, setting_entity_1.Setting])],
        controllers: [stores_controller_1.StoresController],
        providers: [stores_service_1.StoresService],
        exports: [stores_service_1.StoresService]
      })
    ], StoresModule);
  }
});

// dist/categories/categories.service.js
var require_categories_service = __commonJS({
  "dist/categories/categories.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CategoriesService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var category_entity_1 = require_category_entity();
    var store_context_util_1 = require_store_context_util();
    var CategoriesService = class CategoriesService {
      repo;
      constructor(repo) {
        this.repo = repo;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async findAll(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, search } = query;
        const where = { storeId };
        if (search)
          where.name = (0, typeorm_2.Like)(`%${search}%`);
        const [data, total] = await this.repo.findAndCount({
          where,
          order: { name: "ASC" },
          skip: (page - 1) * limit,
          take: limit
        });
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findAllActive(ctx) {
        const storeId = this.scopeStore(ctx);
        return this.repo.find({ where: { storeId, active: true }, order: { name: "ASC" } });
      }
      async findOne(id, ctx) {
        const cat = await this.repo.findOne({ where: { id } });
        if (!cat)
          throw new common_1.NotFoundException("Categor\xEDa no encontrada");
        if (cat.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Categor\xEDa no pertenece a esta tienda");
        }
        return cat;
      }
      async create(dto, ctx) {
        const storeId = this.scopeStore(ctx);
        return this.repo.save(this.repo.create({ ...dto, storeId }));
      }
      async update(id, dto, ctx) {
        const cat = await this.findOne(id, ctx);
        Object.assign(cat, dto);
        return this.repo.save(cat);
      }
      async remove(id, ctx) {
        const cat = await this.findOne(id, ctx);
        await this.repo.remove(cat);
        return { message: "Categor\xEDa eliminada" };
      }
    };
    exports2.CategoriesService = CategoriesService;
    exports2.CategoriesService = CategoriesService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
      __metadata("design:paramtypes", [typeorm_2.Repository])
    ], CategoriesService);
  }
});

// dist/categories/dto/category.dto.js
var require_category_dto = __commonJS({
  "dist/categories/dto/category.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateCategoryDto = exports2.CreateCategoryDto = void 0;
    var class_validator_1 = require("class-validator");
    var CreateCategoryDto = class {
      name;
      description;
    };
    exports2.CreateCategoryDto = CreateCategoryDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      __metadata("design:type", String)
    ], CreateCategoryDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreateCategoryDto.prototype, "description", void 0);
    var UpdateCategoryDto = class {
      name;
      description;
      active;
    };
    exports2.UpdateCategoryDto = UpdateCategoryDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      __metadata("design:type", String)
    ], UpdateCategoryDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateCategoryDto.prototype, "description", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateCategoryDto.prototype, "active", void 0);
  }
});

// dist/categories/categories.controller.js
var require_categories_controller = __commonJS({
  "dist/categories/categories.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CategoriesController = void 0;
    var common_1 = require("@nestjs/common");
    var categories_service_1 = require_categories_service();
    var category_dto_1 = require_category_dto();
    var pagination_dto_1 = require_pagination_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var CategoriesController = class CategoriesController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      findAllActive(ctx) {
        return this.service.findAllActive(ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, ctx) {
        return this.service.create(dto, ctx);
      }
      update(id, dto, ctx) {
        return this.service.update(id, dto, ctx);
      }
      remove(id, ctx) {
        return this.service.remove(id, ctx);
      }
    };
    exports2.CategoriesController = CategoriesController;
    __decorate([
      (0, common_1.Get)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
      __metadata("design:returntype", void 0)
    ], CategoriesController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)("active"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], CategoriesController.prototype, "findAllActive", null);
    __decorate([
      (0, common_1.Get)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], CategoriesController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto, Object]),
      __metadata("design:returntype", void 0)
    ], CategoriesController.prototype, "create", null);
    __decorate([
      (0, common_1.Patch)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, category_dto_1.UpdateCategoryDto, Object]),
      __metadata("design:returntype", void 0)
    ], CategoriesController.prototype, "update", null);
    __decorate([
      (0, common_1.Delete)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], CategoriesController.prototype, "remove", null);
    exports2.CategoriesController = CategoriesController = __decorate([
      (0, common_1.Controller)("categories"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      __metadata("design:paramtypes", [categories_service_1.CategoriesService])
    ], CategoriesController);
  }
});

// dist/categories/categories.module.js
var require_categories_module = __commonJS({
  "dist/categories/categories.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CategoriesModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var category_entity_1 = require_category_entity();
    var categories_service_1 = require_categories_service();
    var categories_controller_1 = require_categories_controller();
    var CategoriesModule = class CategoriesModule {
    };
    exports2.CategoriesModule = CategoriesModule;
    exports2.CategoriesModule = CategoriesModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category])],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
        exports: [categories_service_1.CategoriesService]
      })
    ], CategoriesModule);
  }
});

// dist/products/product-stock.util.js
var require_product_stock_util = __commonJS({
  "dist/products/product-stock.util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.planStockDeductions = planStockDeductions;
    exports2.applyStockDeductions = applyStockDeductions;
    exports2.getSellableUnits = getSellableUnits;
    exports2.isLowStock = isLowStock;
    exports2.computeProductionDeductions = computeProductionDeductions;
    exports2.planProductionDeductions = planProductionDeductions;
    exports2.calculateSaleUnitCost = calculateSaleUnitCost;
    exports2.calculateSaleUnitPrice = calculateSaleUnitPrice;
    var common_1 = require("@nestjs/common");
    var product_entity_1 = require_product_entity();
    var product_recipe_entity_1 = require_product_recipe_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var enums_1 = require_enums();
    function num(v) {
      return Number(v ?? 0);
    }
    async function loadOptionGroups(manager, productId) {
      return manager.find(product_option_group_entity_1.ProductOptionGroup, {
        where: { productId },
        relations: ["options", "options.ingredient"],
        order: { sortOrder: "ASC", id: "ASC" }
      });
    }
    async function expandIngredientDeductions(manager, ingredient, saleQty, storeId) {
      if (ingredient.productType === enums_1.ProductType.COMPOSITE) {
        const recipes = await manager.find(product_recipe_entity_1.ProductRecipe, {
          where: { productId: ingredient.id },
          relations: ["ingredient"]
        });
        if (!recipes.length) {
          throw new common_1.BadRequestException(`${ingredient.name} no tiene receta para usar como adicional`);
        }
        return recipes.map((line) => ({
          productId: line.ingredientProductId,
          productName: line.ingredient?.name ?? ingredient.name,
          quantity: num(line.quantity) * saleQty
        }));
      }
      return [{
        productId: ingredient.id,
        productName: ingredient.name,
        quantity: saleQty
      }];
    }
    async function planPortionWithOptions(manager, product, saleQty, storeId, selectedOptionIds) {
      const groups = product.optionGroups?.length ? product.optionGroups : await loadOptionGroups(manager, product.id);
      if (groups.length === 0) {
        throw new common_1.BadRequestException(`${product.name} no tiene opciones configuradas`);
      }
      const optionMap = /* @__PURE__ */ new Map();
      for (const group of groups) {
        for (const option of group.options ?? []) {
          optionMap.set(option.id, { group, option });
        }
      }
      const byGroup = /* @__PURE__ */ new Map();
      for (const optionId of selectedOptionIds) {
        const entry = optionMap.get(optionId);
        if (!entry) {
          throw new common_1.BadRequestException("Opci\xF3n no v\xE1lida para este producto");
        }
        const list = byGroup.get(entry.group.id) ?? [];
        list.push(optionId);
        byGroup.set(entry.group.id, list);
      }
      for (const group of groups) {
        if (group.kind === enums_1.OptionGroupKind.FLAVOR)
          continue;
        const selected = byGroup.get(group.id) ?? [];
        if (selected.length < group.minSelect || selected.length > group.maxSelect) {
          throw new common_1.BadRequestException(`Selecciona ${group.minSelect} opci\xF3n(es) de "${group.name}"`);
        }
      }
      const totals = /* @__PURE__ */ new Map();
      for (const optionId of selectedOptionIds) {
        const { option } = optionMap.get(optionId);
        if (!option.ingredientProductId)
          continue;
        const ingredient = option.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: option.ingredientProductId, storeId } });
        if (!ingredient) {
          throw new common_1.BadRequestException(`Insumo de "${option.name}" no encontrado`);
        }
        const deduct = num(option.quantity) * saleQty;
        const prev = totals.get(ingredient.id);
        totals.set(ingredient.id, {
          name: ingredient.name,
          quantity: (prev?.quantity ?? 0) + deduct
        });
      }
      const deductions = [];
      for (const [productId, entry] of totals) {
        const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: productId, storeId } });
        if (!ingredient || num(ingredient.stock) < entry.quantity) {
          throw new common_1.BadRequestException(`Stock insuficiente de ${entry.name} (requiere ${entry.quantity} ${ingredient?.stockUnit ?? ""})`);
        }
        deductions.push({ productId, productName: entry.name, quantity: entry.quantity });
      }
      return deductions;
    }
    async function planStockDeductions(manager, product, saleQty, storeId, selectedOptionIds) {
      if (saleQty <= 0) {
        throw new common_1.BadRequestException("Cantidad inv\xE1lida");
      }
      switch (product.productType) {
        case enums_1.ProductType.SIMPLE: {
          const groups = product.optionGroups?.length ? product.optionGroups : await loadOptionGroups(manager, product.id);
          const hasAddons = groups.some((g) => g.kind === enums_1.OptionGroupKind.ADDON);
          if (hasAddons) {
            if (num(product.stock) < saleQty) {
              throw new common_1.BadRequestException(`Stock insuficiente para ${product.name}`);
            }
            const deductions = [{
              productId: product.id,
              productName: product.name,
              quantity: saleQty
            }];
            if (selectedOptionIds?.length) {
              const addonDeductions = await planAddonDeductions(manager, product, saleQty, storeId, selectedOptionIds);
              for (const addon of addonDeductions) {
                const existing = deductions.find((d) => d.productId === addon.productId);
                if (existing) {
                  existing.quantity += addon.quantity;
                } else {
                  deductions.push(addon);
                }
              }
              for (const d of deductions) {
                if (d.productId === product.id)
                  continue;
                const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: d.productId, storeId } });
                if (!ingredient || num(ingredient.stock) < d.quantity) {
                  throw new common_1.BadRequestException(`Stock insuficiente de ${d.productName} (requiere ${d.quantity} ${ingredient?.stockUnit ?? ""})`);
                }
              }
            }
            return deductions;
          }
          if (num(product.stock) < saleQty) {
            throw new common_1.BadRequestException(`Stock insuficiente para ${product.name}`);
          }
          return [{ productId: product.id, productName: product.name, quantity: saleQty }];
        }
        case enums_1.ProductType.BULK:
          throw new common_1.BadRequestException(`${product.name} es un insumo base y no se vende directamente`);
        case enums_1.ProductType.PREPARED:
          throw new common_1.BadRequestException(`${product.name} es un elaborado interno y no se vende directamente`);
        case enums_1.ProductType.PORTION: {
          const groups = product.optionGroups?.length ? product.optionGroups : await loadOptionGroups(manager, product.id);
          if (groups.length > 0) {
            if (!selectedOptionIds?.length) {
              throw new common_1.BadRequestException(`Selecciona envase para ${product.name}`);
            }
            return planPortionWithOptions(manager, product, saleQty, storeId, selectedOptionIds);
          }
          if (!product.baseProductId || !product.portionSize) {
            throw new common_1.BadRequestException(`${product.name} no tiene insumo base configurado`);
          }
          const base = await manager.findOne(product_entity_1.Product, {
            where: { id: product.baseProductId, storeId }
          });
          if (!base) {
            throw new common_1.BadRequestException(`Insumo base de ${product.name} no encontrado`);
          }
          const deduct = num(product.portionSize) * saleQty;
          if (num(base.stock) < deduct) {
            throw new common_1.BadRequestException(`Stock insuficiente de ${base.name} (requiere ${deduct} ${base.stockUnit})`);
          }
          return [{ productId: base.id, productName: base.name, quantity: deduct }];
        }
        case enums_1.ProductType.COMPOSITE: {
          const recipes = await manager.find(product_recipe_entity_1.ProductRecipe, {
            where: { productId: product.id },
            relations: ["ingredient"]
          });
          if (recipes.length === 0) {
            throw new common_1.BadRequestException(`${product.name} no tiene ingredientes en la receta`);
          }
          const deductions = [];
          for (const line of recipes) {
            const ingredient = line.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: line.ingredientProductId, storeId } });
            if (!ingredient) {
              throw new common_1.BadRequestException(`Ingrediente no encontrado en receta de ${product.name}`);
            }
            const deduct = num(line.quantity) * saleQty;
            if (num(ingredient.stock) < deduct) {
              throw new common_1.BadRequestException(`Stock insuficiente de ${ingredient.name} (requiere ${deduct} ${ingredient.stockUnit})`);
            }
            deductions.push({
              productId: ingredient.id,
              productName: ingredient.name,
              quantity: deduct
            });
          }
          if (selectedOptionIds?.length) {
            const addonDeductions = await planAddonDeductions(manager, product, saleQty, storeId, selectedOptionIds);
            for (const addon of addonDeductions) {
              const existing = deductions.find((d) => d.productId === addon.productId);
              if (existing) {
                existing.quantity += addon.quantity;
              } else {
                deductions.push(addon);
              }
            }
            for (const d of deductions) {
              const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: d.productId, storeId } });
              if (!ingredient || num(ingredient.stock) < d.quantity) {
                throw new common_1.BadRequestException(`Stock insuficiente de ${d.productName} (requiere ${d.quantity} ${ingredient?.stockUnit ?? ""})`);
              }
            }
          }
          return deductions;
        }
        default:
          throw new common_1.BadRequestException("Tipo de producto no soportado");
      }
    }
    async function applyStockDeductions(manager, deductions, storeId, userId, reference) {
      for (const d of deductions) {
        const product = await manager.findOne(product_entity_1.Product, { where: { id: d.productId, storeId } });
        if (!product)
          continue;
        const stockBefore = num(product.stock);
        const stockAfter = Number((stockBefore - d.quantity).toFixed(3));
        product.stock = stockAfter;
        await manager.save(product);
        await manager.save(manager.create(inventory_movement_entity_1.InventoryMovement, {
          storeId,
          productId: product.id,
          type: enums_1.InventoryMovementType.SALE,
          quantity: d.quantity,
          stockBefore,
          stockAfter,
          reference,
          userId
        }));
      }
    }
    async function sellableForPortionWithOptions(manager, product) {
      const groups = product.optionGroups?.length ? product.optionGroups : await loadOptionGroups(manager, product.id);
      if (groups.length === 0 || !product.portionSize)
        return 0;
      const scoopCount = product.scoopCount ?? 1;
      const minScoops = product.variableScoops ? 1 : scoopCount;
      const limits = [];
      for (const group of groups) {
        if (group.kind === enums_1.OptionGroupKind.FLAVOR) {
          let maxFlavor = -1;
          for (const option of group.options ?? []) {
            if (!option.ingredientProductId)
              continue;
            const ingredient = option.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: option.ingredientProductId } });
            if (!ingredient || num(option.quantity) <= 0)
              continue;
            maxFlavor = Math.max(maxFlavor, Math.floor(num(ingredient.stock) / num(option.quantity)));
          }
          if (maxFlavor >= 0) {
            limits.push(Math.floor(maxFlavor / minScoops));
          }
        }
        if (group.kind === enums_1.OptionGroupKind.CONTAINER) {
          let maxContainer = -1;
          for (const option of group.options ?? []) {
            if (!option.ingredientProductId)
              continue;
            const ingredient = option.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: option.ingredientProductId } });
            if (!ingredient || num(option.quantity) <= 0)
              continue;
            maxContainer = Math.max(maxContainer, Math.floor(num(ingredient.stock) / num(option.quantity)));
          }
          if (maxContainer >= 0) {
            limits.push(maxContainer);
          }
        }
      }
      if (!limits.length)
        return 9999;
      return Math.min(...limits);
    }
    async function getSellableUnits(manager, product) {
      switch (product.productType) {
        case enums_1.ProductType.SIMPLE:
          return Math.floor(num(product.stock));
        case enums_1.ProductType.BULK:
          return 0;
        case enums_1.ProductType.PORTION: {
          const groups = product.optionGroups?.length ? product.optionGroups : await loadOptionGroups(manager, product.id);
          if (groups.length > 0) {
            return sellableForPortionWithOptions(manager, product);
          }
          if (!product.baseProductId || !product.portionSize)
            return 0;
          const base = product.baseProduct ?? await manager.findOne(product_entity_1.Product, { where: { id: product.baseProductId } });
          if (!base || num(product.portionSize) <= 0)
            return 0;
          return Math.floor(num(base.stock) / num(product.portionSize));
        }
        case enums_1.ProductType.COMPOSITE: {
          const recipes = product.recipe?.length ? product.recipe : await manager.find(product_recipe_entity_1.ProductRecipe, {
            where: { productId: product.id },
            relations: ["ingredient"]
          });
          if (recipes.length === 0)
            return 0;
          let minUnits = Infinity;
          for (const line of recipes) {
            const ingredient = line.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: line.ingredientProductId } });
            if (!ingredient || num(line.quantity) <= 0)
              return 0;
            minUnits = Math.min(minUnits, Math.floor(num(ingredient.stock) / num(line.quantity)));
          }
          return minUnits === Infinity ? 0 : minUnits;
        }
        case enums_1.ProductType.PREPARED:
          return 0;
        default:
          return 0;
      }
    }
    function isLowStock(product) {
      return num(product.stock) <= num(product.minStock);
    }
    async function computeProductionDeductions(manager, product, quantityProduced, storeId) {
      const batchSize = num(product.recipeBatchSize);
      if (batchSize <= 0) {
        throw new common_1.BadRequestException(`${product.name} no tiene tama\xF1o de lote configurado`);
      }
      const qty = num(quantityProduced);
      if (qty <= 0) {
        throw new common_1.BadRequestException("Cantidad de producci\xF3n inv\xE1lida");
      }
      const batches = qty / batchSize;
      const recipes = product.recipe?.length ? product.recipe : await manager.find(product_recipe_entity_1.ProductRecipe, {
        where: { productId: product.id },
        relations: ["ingredient"]
      });
      if (recipes.length === 0) {
        throw new common_1.BadRequestException(`${product.name} no tiene receta configurada`);
      }
      const deductions = [];
      for (const line of recipes) {
        const ingredient = line.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: line.ingredientProductId, storeId } });
        if (!ingredient) {
          throw new common_1.BadRequestException(`Ingrediente no encontrado en receta de ${product.name}`);
        }
        deductions.push({
          productId: ingredient.id,
          productName: ingredient.name,
          quantity: Number((num(line.quantity) * batches).toFixed(3))
        });
      }
      return { deductions, batches: Number(batches.toFixed(6)) };
    }
    async function planProductionDeductions(manager, product, quantityProduced, storeId) {
      const plan = await computeProductionDeductions(manager, product, quantityProduced, storeId);
      for (const d of plan.deductions) {
        const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: d.productId, storeId } });
        if (!ingredient || num(ingredient.stock) < d.quantity) {
          throw new common_1.BadRequestException(`Stock insuficiente de ${d.productName} (requiere ${d.quantity} ${ingredient?.stockUnit ?? ""})`);
        }
      }
      return plan;
    }
    function resolveOptionUnitCost(option) {
      const stored = num(option.unitCost);
      if (stored > 0)
        return stored;
      const ingredient = option.ingredient;
      if (!ingredient)
        return 0;
      return Number((num(ingredient.costPrice) * num(option.quantity)).toFixed(2));
    }
    function buildOptionLookup(product) {
      const optionMap = /* @__PURE__ */ new Map();
      const groupByOptionId = /* @__PURE__ */ new Map();
      for (const group of product.optionGroups ?? []) {
        for (const option of group.options ?? []) {
          optionMap.set(option.id, option);
          groupByOptionId.set(option.id, group);
        }
      }
      return { optionMap, groupByOptionId };
    }
    async function planAddonDeductions(manager, product, saleQty, storeId, selectedOptionIds) {
      const groups = product.optionGroups?.length ? product.optionGroups : await loadOptionGroups(manager, product.id);
      const addonGroups = groups.filter((g) => g.kind === enums_1.OptionGroupKind.ADDON);
      if (!addonGroups.length)
        return [];
      const optionMap = /* @__PURE__ */ new Map();
      const addonOptionIds = /* @__PURE__ */ new Set();
      for (const group of addonGroups) {
        for (const option of group.options ?? []) {
          optionMap.set(option.id, option);
          addonOptionIds.add(option.id);
        }
      }
      const selectedAddons = selectedOptionIds.filter((id) => addonOptionIds.has(id));
      if (!selectedAddons.length)
        return [];
      const byGroup = /* @__PURE__ */ new Map();
      for (const optionId of selectedAddons) {
        const option = optionMap.get(optionId);
        if (!option) {
          throw new common_1.BadRequestException("Adicional no v\xE1lido para este producto");
        }
        const group = addonGroups.find((g) => g.options?.some((o) => o.id === optionId));
        if (!group)
          continue;
        const list = byGroup.get(group.id) ?? [];
        list.push(optionId);
        byGroup.set(group.id, list);
      }
      for (const group of addonGroups) {
        const selected = byGroup.get(group.id) ?? [];
        if (selected.length < group.minSelect || selected.length > group.maxSelect) {
          throw new common_1.BadRequestException(`Selecciona entre ${group.minSelect} y ${group.maxSelect} opci\xF3n(es) de "${group.name}"`);
        }
      }
      const totals = /* @__PURE__ */ new Map();
      for (const optionId of selectedAddons) {
        const option = optionMap.get(optionId);
        if (!option.ingredientProductId)
          continue;
        const ingredient = option.ingredient ?? await manager.findOne(product_entity_1.Product, { where: { id: option.ingredientProductId, storeId } });
        if (!ingredient) {
          throw new common_1.BadRequestException(`Insumo de "${option.name}" no encontrado`);
        }
        const deductQty = num(option.quantity) * saleQty;
        const lines = await expandIngredientDeductions(manager, ingredient, deductQty, storeId);
        for (const line of lines) {
          const prev = totals.get(line.productId);
          totals.set(line.productId, {
            name: line.productName,
            quantity: (prev?.quantity ?? 0) + line.quantity
          });
        }
      }
      return Array.from(totals.entries()).map(([productId, entry]) => ({
        productId,
        productName: entry.name,
        quantity: entry.quantity
      }));
    }
    function calculateSaleUnitCost(product, selectedOptionIds, _portionScoopCount) {
      const isComposite = product.productType === enums_1.ProductType.COMPOSITE;
      if (!selectedOptionIds?.length || !product.optionGroups?.length) {
        return num(product.costPrice);
      }
      const { optionMap, groupByOptionId } = buildOptionLookup(product);
      let total = isComposite ? num(product.costPrice) : 0;
      for (const optionId of selectedOptionIds) {
        const option = optionMap.get(optionId);
        if (!option)
          continue;
        const group = groupByOptionId.get(optionId);
        if (isComposite) {
          if (group?.kind === enums_1.OptionGroupKind.ADDON) {
            total += resolveOptionUnitCost(option);
          }
        } else {
          total += resolveOptionUnitCost(option);
        }
      }
      return Number(total.toFixed(2));
    }
    function countSelectedByKind(product, selectedOptionIds, kind) {
      if (!selectedOptionIds?.length || !product.optionGroups?.length)
        return 0;
      const ids = /* @__PURE__ */ new Set();
      for (const group of product.optionGroups) {
        if (group.kind !== kind)
          continue;
        for (const option of group.options ?? []) {
          ids.add(option.id);
        }
      }
      return selectedOptionIds.filter((id) => ids.has(id)).length;
    }
    function calculateSaleUnitPrice(product, selectedOptionIds, portionScoopCount) {
      let price = num(product.salePrice);
      if (product.productType === enums_1.ProductType.PORTION && product.variableScoops && product.scoopPrices?.length) {
        const flavorCount = countSelectedByKind(product, selectedOptionIds, enums_1.OptionGroupKind.FLAVOR);
        const scoops = portionScoopCount ?? (flavorCount > 0 ? flavorCount : 0);
        if (scoops > 0) {
          price = num(product.scoopPrices[scoops - 1] ?? product.salePrice);
        }
      }
      if (!selectedOptionIds?.length || !product.optionGroups?.length) {
        return price;
      }
      const { optionMap, groupByOptionId } = buildOptionLookup(product);
      for (const optionId of selectedOptionIds) {
        const option = optionMap.get(optionId);
        if (!option)
          continue;
        const group = groupByOptionId.get(optionId);
        if (group?.kind === enums_1.OptionGroupKind.ADDON) {
          price += num(option.unitPrice);
        }
      }
      return Number(price.toFixed(2));
    }
  }
});

// dist/storage/storage.service.js
var require_storage_service = __commonJS({
  "dist/storage/storage.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var StorageService_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StorageService = void 0;
    var common_1 = require("@nestjs/common");
    var config_1 = require("@nestjs/config");
    var client_s3_1 = require("@aws-sdk/client-s3");
    var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
    var ALLOWED_MIME = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif"
    };
    var StorageService = StorageService_1 = class StorageService {
      config;
      logger = new common_1.Logger(StorageService_1.name);
      client = null;
      bucket = "imagenes";
      configured = false;
      constructor(config) {
        this.config = config;
        const endpoint = config.get("SUPABASE_S3_ENDPOINT")?.trim();
        const accessKeyId = config.get("SUPABASE_S3_ACCESS_KEY_ID")?.trim();
        const secretAccessKey = config.get("SUPABASE_S3_SECRET_ACCESS_KEY")?.trim();
        const region = config.get("SUPABASE_S3_REGION")?.trim() ?? "us-east-1";
        this.bucket = config.get("SUPABASE_STORAGE_BUCKET")?.trim() ?? "imagenes";
        if (endpoint && accessKeyId && secretAccessKey) {
          this.client = new client_s3_1.S3Client({
            forcePathStyle: true,
            region,
            endpoint,
            credentials: { accessKeyId, secretAccessKey },
            requestChecksumCalculation: "WHEN_REQUIRED",
            responseChecksumValidation: "WHEN_REQUIRED"
          });
          this.configured = true;
          this.logger.log(`Storage S3 listo (bucket: ${this.bucket}, region: ${region})`);
        } else {
          this.logger.warn("Supabase S3 no configurado \u2014 revisa SUPABASE_S3_* en .env / Vercel");
        }
      }
      isConfigured() {
        return this.configured;
      }
      assertConfigured() {
        if (!this.client) {
          throw new common_1.ServiceUnavailableException("Almacenamiento S3 no configurado. Agrega SUPABASE_S3_* en Vercel o .env");
        }
      }
      validateImageFile(file) {
        const ext = ALLOWED_MIME[file.mimetype];
        if (!ext) {
          throw new common_1.BadRequestException("Solo se permiten im\xE1genes JPG, PNG, WEBP o GIF");
        }
        return ext;
      }
      buildProductImageKey(storeId, productId, ext) {
        return `products/${storeId}/${productId}.${ext}`;
      }
      async readS3Error(err) {
        const e = err;
        try {
          const body = await e.$response?.body?.transformToString?.();
          if (body?.trim())
            return body.trim();
        } catch {
        }
        return e.message ?? "Error desconocido de S3";
      }
      async uploadProductImage(storeId, productId, file) {
        this.assertConfigured();
        const ext = this.validateImageFile(file);
        const key = this.buildProductImageKey(storeId, productId, ext);
        try {
          await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            CacheControl: "public, max-age=31536000"
          }));
        } catch (err) {
          const detail = await this.readS3Error(err);
          this.logger.error(`Upload fall\xF3 (${key}): ${detail}`);
          throw new common_1.ServiceUnavailableException(`No se pudo subir la imagen a Supabase: ${detail}. Verifica en Supabase \u2192 Storage \u2192 S3 que endpoint, regi\xF3n y claves coincidan.`);
        }
        return key;
      }
      async getSignedUrl(key, expiresIn = 3600) {
        this.assertConfigured();
        try {
          return await (0, s3_request_presigner_1.getSignedUrl)(this.client, new client_s3_1.GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn });
        } catch (err) {
          const detail = await this.readS3Error(err);
          this.logger.error(`Signed URL fall\xF3 (${key}): ${detail}`);
          throw new common_1.ServiceUnavailableException("No se pudo generar la URL de la imagen");
        }
      }
      async deleteObject(key) {
        if (!this.client || !key)
          return;
        try {
          await this.client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
          }));
        } catch (err) {
          const detail = await this.readS3Error(err);
          this.logger.warn(`No se pudo eliminar ${key}: ${detail}`);
        }
      }
    };
    exports2.StorageService = StorageService;
    exports2.StorageService = StorageService = StorageService_1 = __decorate([
      (0, common_1.Injectable)(),
      __metadata("design:paramtypes", [config_1.ConfigService])
    ], StorageService);
  }
});

// dist/products/products.service.js
var require_products_service = __commonJS({
  "dist/products/products.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProductsService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var product_entity_1 = require_product_entity();
    var product_recipe_entity_1 = require_product_recipe_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var product_option_entity_1 = require_product_option_entity();
    var enums_1 = require_enums();
    var store_context_util_1 = require_store_context_util();
    var product_stock_util_1 = require_product_stock_util();
    var storage_service_1 = require_storage_service();
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var PRODUCT_RELATIONS = [
      "category",
      "baseProduct",
      "recipe",
      "recipe.ingredient",
      "optionGroups",
      "optionGroups.options",
      "optionGroups.options.ingredient"
    ];
    var ProductsService = class ProductsService {
      repo;
      recipeRepo;
      dataSource;
      storage;
      constructor(repo, recipeRepo, dataSource, storage) {
        this.repo = repo;
        this.recipeRepo = recipeRepo;
        this.dataSource = dataSource;
        this.storage = storage;
      }
      async enrichProduct(product, sellableUnits) {
        const { imageKey, ...rest } = product;
        const enriched = {
          ...rest,
          sellableUnits: sellableUnits ?? void 0,
          lowStock: (0, product_stock_util_1.isLowStock)(product)
        };
        if (imageKey && this.storage.isConfigured()) {
          try {
            enriched.imageUrl = await this.storage.getSignedUrl(imageKey);
          } catch {
          }
        }
        return enriched;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async findAll(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, search, categoryId, active, productType } = query;
        const qb = this.repo.createQueryBuilder("p").leftJoinAndSelect("p.category", "category").leftJoinAndSelect("p.baseProduct", "baseProduct").leftJoinAndSelect("p.recipe", "recipe").leftJoinAndSelect("recipe.ingredient", "ingredient").leftJoinAndSelect("p.optionGroups", "optionGroups").leftJoinAndSelect("optionGroups.options", "options").leftJoinAndSelect("options.ingredient", "optionIngredient").where("p.storeId = :storeId", { storeId }).orderBy("p.name", "ASC").skip((page - 1) * limit).take(limit);
        if (search)
          qb.andWhere("(p.name LIKE :s OR p.sku LIKE :s)", { s: `%${search}%` });
        if (categoryId)
          qb.andWhere("p.categoryId = :categoryId", { categoryId });
        if (active !== void 0)
          qb.andWhere("p.active = :active", { active });
        if (productType)
          qb.andWhere("p.productType = :productType", { productType });
        const [rows, total] = await qb.getManyAndCount();
        const data = await Promise.all(rows.map(async (p) => {
          const sellable = [enums_1.ProductType.BULK, enums_1.ProductType.PREPARED].includes(p.productType) ? void 0 : await (0, product_stock_util_1.getSellableUnits)(this.repo.manager, p);
          return this.enrichProduct(p, sellable);
        }));
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findBulkProducts(ctx) {
        const storeId = this.scopeStore(ctx);
        return this.repo.find({
          where: { storeId, productType: (0, typeorm_2.In)([enums_1.ProductType.BULK, enums_1.ProductType.PREPARED]), active: true },
          order: { name: "ASC" }
        });
      }
      async findForPos(search, categoryId, ctx) {
        const storeId = this.scopeStore(ctx);
        const qb = this.repo.createQueryBuilder("p").leftJoinAndSelect("p.category", "category").leftJoinAndSelect("p.baseProduct", "baseProduct").leftJoinAndSelect("p.recipe", "recipe").leftJoinAndSelect("recipe.ingredient", "ingredient").leftJoinAndSelect("p.optionGroups", "optionGroups").leftJoinAndSelect("optionGroups.options", "options").leftJoinAndSelect("options.ingredient", "optionIngredient").where("p.storeId = :storeId", { storeId }).andWhere("p.active = true").andWhere("p.visibleInPos = true").andWhere("p.productType NOT IN (:...excluded)", {
          excluded: [enums_1.ProductType.BULK, enums_1.ProductType.PREPARED]
        }).orderBy("p.name", "ASC");
        if (search)
          qb.andWhere("(p.name LIKE :s OR p.sku LIKE :s)", { s: `%${search}%` });
        if (categoryId)
          qb.andWhere("p.categoryId = :categoryId", { categoryId });
        const products = await qb.getMany();
        const result = [];
        for (const p of products) {
          const sellable = await (0, product_stock_util_1.getSellableUnits)(this.repo.manager, p);
          p.sellableUnits = sellable;
          result.push(await this.enrichProduct(p, sellable));
        }
        return result;
      }
      async findLowStock(ctx) {
        const storeId = this.scopeStore(ctx);
        const products = await this.repo.createQueryBuilder("p").leftJoinAndSelect("p.category", "category").where("p.storeId = :storeId", { storeId }).andWhere("p.active = true").andWhere("p.productType IN (:...types)", { types: [enums_1.ProductType.SIMPLE, enums_1.ProductType.BULK, enums_1.ProductType.PREPARED] }).andWhere("p.stock <= p.minStock").orderBy("p.stock", "ASC").getMany();
        return products;
      }
      async findOne(id, ctx) {
        const product = await this.repo.findOne({
          where: { id },
          relations: [...PRODUCT_RELATIONS]
        });
        if (!product)
          throw new common_1.NotFoundException("Producto no encontrado");
        if (product.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Producto no pertenece a esta tienda");
        }
        const sellable = [enums_1.ProductType.BULK, enums_1.ProductType.PREPARED].includes(product.productType) ? void 0 : await (0, product_stock_util_1.getSellableUnits)(this.repo.manager, product);
        return this.enrichProduct(product, sellable);
      }
      validateProductDto(dto, type) {
        if (type === enums_1.ProductType.PORTION) {
          const hasOptions = "optionGroups" in dto && dto.optionGroups?.length;
          if (!hasOptions) {
            if (!("baseProductId" in dto) || !dto.baseProductId) {
              throw new common_1.BadRequestException("Selecciona el insumo base o configura sabores");
            }
          } else {
            if (!("scoopCount" in dto) || !dto.scoopCount) {
              throw new common_1.BadRequestException("Indica cu\xE1ntas bolas incluye el helado");
            }
            const flavorGroup = dto.optionGroups.find((g) => g.kind === enums_1.OptionGroupKind.FLAVOR);
            const containerGroup = dto.optionGroups.find((g) => g.kind === enums_1.OptionGroupKind.CONTAINER);
            if (!containerGroup?.options?.length) {
              throw new common_1.BadRequestException("Agrega al menos un envase (galleta o vaso)");
            }
            if (flavorGroup?.options?.length) {
            }
          }
          if (!("portionSize" in dto) || !dto.portionSize) {
            throw new common_1.BadRequestException("Indica cu\xE1ntos gramos/ml descuenta cada bola");
          }
        }
        if (type === enums_1.ProductType.COMPOSITE) {
          if (!("recipe" in dto) || !dto.recipe?.length) {
            throw new common_1.BadRequestException("Agrega al menos un ingrediente a la receta");
          }
          if (dto.optionGroups?.some((g) => g.kind !== enums_1.OptionGroupKind.ADDON)) {
            throw new common_1.BadRequestException("Los productos compuestos solo admiten adicionales");
          }
        }
        if (type === enums_1.ProductType.PREPARED) {
          if (!("recipe" in dto) || !dto.recipe?.length) {
            throw new common_1.BadRequestException("Agrega al menos un ingrediente a la receta");
          }
          if (!("recipeBatchSize" in dto) || !dto.recipeBatchSize || Number(dto.recipeBatchSize) <= 0) {
            throw new common_1.BadRequestException("Indica cu\xE1nto rinde un lote completo de la receta");
          }
          const unit = dto.stockUnit ?? enums_1.StockUnit.G;
          if (![enums_1.StockUnit.G, enums_1.StockUnit.ML].includes(unit)) {
            throw new common_1.BadRequestException("Los elaborados usan gramos (g) o mililitros (ml)");
          }
        }
        if (type === enums_1.ProductType.SIMPLE) {
          if (dto.optionGroups?.some((g) => g.kind !== enums_1.OptionGroupKind.ADDON)) {
            throw new common_1.BadRequestException("Los productos por unidad solo admiten adicionales");
          }
        }
        if (type === enums_1.ProductType.BULK && !dto.stockUnit) {
          throw new common_1.BadRequestException("Indica la unidad del insumo (g, ml o uds)");
        }
      }
      async create(dto, ctx) {
        const storeId = this.scopeStore(ctx);
        const exists = await this.repo.findOne({ where: { storeId, sku: dto.sku } });
        if (exists)
          throw new common_1.ConflictException("El SKU ya existe en esta tienda");
        const productType = dto.productType ?? enums_1.ProductType.SIMPLE;
        this.validateProductDto(dto, productType);
        if (dto.baseProductId) {
          const base = await this.repo.findOne({ where: { id: dto.baseProductId, storeId } });
          if (!base || ![enums_1.ProductType.BULK, enums_1.ProductType.PREPARED].includes(base.productType)) {
            throw new common_1.BadRequestException("El insumo base debe ser un producto bulk o elaborado");
          }
        }
        let savedId = 0;
        await this.dataSource.transaction(async (manager) => {
          const hasOptions = productType === enums_1.ProductType.PORTION && dto.optionGroups?.length;
          const product = manager.create(product_entity_1.Product, {
            ...dto,
            storeId,
            productType,
            stockUnit: dto.stockUnit ?? (productType === enums_1.ProductType.BULK || productType === enums_1.ProductType.PREPARED ? enums_1.StockUnit.G : productType === enums_1.ProductType.PORTION ? enums_1.StockUnit.G : enums_1.StockUnit.UNIT),
            stock: productType === enums_1.ProductType.PORTION || productType === enums_1.ProductType.COMPOSITE ? 0 : dto.stock ?? 0,
            salePrice: productType === enums_1.ProductType.BULK || productType === enums_1.ProductType.PREPARED ? 0 : dto.salePrice,
            recipeBatchSize: productType === enums_1.ProductType.PREPARED ? dto.recipeBatchSize ?? null : null,
            baseProductId: hasOptions ? null : dto.baseProductId ?? null,
            scoopCount: hasOptions ? dto.scoopCount : null,
            variableScoops: hasOptions ? dto.variableScoops ?? false : false,
            scoopPrices: hasOptions && dto.variableScoops ? dto.scoopPrices ?? null : null,
            visibleInPos: dto.visibleInPos ?? (productType !== enums_1.ProductType.BULK && productType !== enums_1.ProductType.PREPARED)
          });
          const saved = await manager.save(product);
          savedId = saved.id;
          if ((productType === enums_1.ProductType.COMPOSITE || productType === enums_1.ProductType.PREPARED) && dto.recipe) {
            for (const line of dto.recipe) {
              await this.validateIngredient(manager, line.ingredientProductId, storeId, saved.id);
              await manager.save(manager.create(product_recipe_entity_1.ProductRecipe, {
                productId: saved.id,
                ingredientProductId: line.ingredientProductId,
                quantity: line.quantity,
                unit: line.unit ?? enums_1.StockUnit.G
              }));
            }
          }
          if (hasOptions && dto.optionGroups) {
            await this.saveOptionGroups(manager, saved.id, dto.optionGroups, dto.portionSize, dto.scoopCount, storeId, dto.stockUnit ?? enums_1.StockUnit.G, dto.variableScoops ?? false);
          } else if (productType === enums_1.ProductType.COMPOSITE && dto.optionGroups?.length) {
            await this.saveOptionGroups(manager, saved.id, dto.optionGroups, 1, 1, storeId, enums_1.StockUnit.UNIT, false);
          } else if (productType === enums_1.ProductType.SIMPLE && dto.optionGroups?.length) {
            await this.saveOptionGroups(manager, saved.id, dto.optionGroups, 1, 1, storeId, enums_1.StockUnit.UNIT, false);
          }
        });
        return this.findOne(savedId, ctx);
      }
      async update(id, dto, ctx) {
        const existing = await this.repo.findOne({ where: { id } });
        if (!existing)
          throw new common_1.NotFoundException("Producto no encontrado");
        if (existing.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Producto no pertenece a esta tienda");
        }
        if (dto.sku && dto.sku !== existing.sku) {
          const exists = await this.repo.findOne({ where: { storeId: existing.storeId, sku: dto.sku } });
          if (exists)
            throw new common_1.ConflictException("El SKU ya existe en esta tienda");
        }
        if (dto.recipe && ![enums_1.ProductType.COMPOSITE, enums_1.ProductType.PREPARED].includes(existing.productType)) {
          throw new common_1.BadRequestException("Solo productos compuestos o elaborados tienen receta");
        }
        if (existing.productType === enums_1.ProductType.PORTION && dto.optionGroups) {
          this.validateProductDto({ ...dto, productType: enums_1.ProductType.PORTION }, enums_1.ProductType.PORTION);
        }
        if (existing.productType === enums_1.ProductType.COMPOSITE && dto.optionGroups) {
          const invalid = dto.optionGroups.some((g) => g.kind !== enums_1.OptionGroupKind.ADDON);
          if (invalid) {
            throw new common_1.BadRequestException("Los productos compuestos solo admiten adicionales");
          }
        }
        if (existing.productType === enums_1.ProductType.SIMPLE && dto.optionGroups) {
          const invalid = dto.optionGroups.some((g) => g.kind !== enums_1.OptionGroupKind.ADDON);
          if (invalid) {
            throw new common_1.BadRequestException("Los productos por unidad solo admiten adicionales");
          }
        }
        if (existing.productType === enums_1.ProductType.PREPARED && (dto.recipe || dto.recipeBatchSize !== void 0)) {
          this.validateProductDto({ ...dto, productType: enums_1.ProductType.PREPARED }, enums_1.ProductType.PREPARED);
        }
        if (dto.baseProductId) {
          const base = await this.repo.findOne({ where: { id: dto.baseProductId, storeId: existing.storeId } });
          if (!base || ![enums_1.ProductType.BULK, enums_1.ProductType.PREPARED].includes(base.productType)) {
            throw new common_1.BadRequestException("El insumo base debe ser un producto bulk o elaborado");
          }
        }
        await this.dataSource.transaction(async (manager) => {
          const { recipe, optionGroups, ...scalarFields } = dto;
          const hasPortionOptions = optionGroups?.length && existing.productType === enums_1.ProductType.PORTION;
          const hasCompositeAddons = optionGroups !== void 0 && existing.productType === enums_1.ProductType.COMPOSITE;
          const hasSimpleAddons = optionGroups !== void 0 && existing.productType === enums_1.ProductType.SIMPLE;
          if (hasPortionOptions) {
            const oldGroups = await manager.find(product_option_group_entity_1.ProductOptionGroup, {
              where: { productId: existing.id },
              select: ["id"]
            });
            if (oldGroups.length) {
              await manager.delete(product_option_entity_1.ProductOption, { groupId: (0, typeorm_2.In)(oldGroups.map((g) => g.id)) });
              await manager.delete(product_option_group_entity_1.ProductOptionGroup, { productId: existing.id });
            }
          }
          if (hasCompositeAddons || hasSimpleAddons) {
            const oldGroups = await manager.find(product_option_group_entity_1.ProductOptionGroup, {
              where: { productId: existing.id },
              select: ["id"]
            });
            if (oldGroups.length) {
              await manager.delete(product_option_entity_1.ProductOption, { groupId: (0, typeorm_2.In)(oldGroups.map((g) => g.id)) });
              await manager.delete(product_option_group_entity_1.ProductOptionGroup, { productId: existing.id });
            }
          }
          if (recipe && [enums_1.ProductType.COMPOSITE, enums_1.ProductType.PREPARED].includes(existing.productType)) {
            await manager.delete(product_recipe_entity_1.ProductRecipe, { productId: existing.id });
          }
          const productPatch = { ...scalarFields };
          if (existing.productType !== enums_1.ProductType.PORTION) {
            productPatch.scoopCount = null;
            productPatch.variableScoops = false;
            productPatch.scoopPrices = null;
          }
          if (hasPortionOptions) {
            productPatch.baseProductId = null;
            productPatch.scoopCount = dto.scoopCount ?? existing.scoopCount;
            productPatch.variableScoops = dto.variableScoops ?? existing.variableScoops;
            productPatch.scoopPrices = dto.variableScoops ? dto.scoopPrices ?? existing.scoopPrices : null;
          }
          if (Object.keys(productPatch).length > 0) {
            await manager.update(product_entity_1.Product, { id: existing.id }, productPatch);
          }
          if (recipe && [enums_1.ProductType.COMPOSITE, enums_1.ProductType.PREPARED].includes(existing.productType)) {
            for (const line of recipe) {
              await this.validateIngredient(manager, line.ingredientProductId, existing.storeId, existing.id);
              await manager.save(manager.create(product_recipe_entity_1.ProductRecipe, {
                productId: existing.id,
                ingredientProductId: line.ingredientProductId,
                quantity: line.quantity,
                unit: line.unit ?? enums_1.StockUnit.G
              }));
            }
          }
          if (hasPortionOptions && optionGroups) {
            const portionUnit = dto.stockUnit ?? existing.stockUnit;
            await this.saveOptionGroups(manager, existing.id, optionGroups, dto.portionSize ?? Number(existing.portionSize), dto.scoopCount ?? existing.scoopCount ?? 1, existing.storeId, portionUnit, dto.variableScoops ?? existing.variableScoops ?? false);
          }
          if ((hasCompositeAddons || hasSimpleAddons) && optionGroups) {
            await this.saveOptionGroups(manager, existing.id, optionGroups, 1, 1, existing.storeId, enums_1.StockUnit.UNIT, false);
          }
        });
        return this.findOne(existing.id, ctx);
      }
      async saveOptionGroups(manager, productId, groups, portionSize, scoopCount, storeId, portionUnit = enums_1.StockUnit.G, variableScoops = false) {
        let sortOrder = 0;
        for (const groupDto of groups ?? []) {
          const isAddon = groupDto.kind === enums_1.OptionGroupKind.ADDON;
          const isFlavor = groupDto.kind === enums_1.OptionGroupKind.FLAVOR;
          const minSelect = isFlavor ? 0 : isAddon ? 0 : 1;
          const maxSelect = isFlavor ? Math.max(groupDto.options?.length ?? 0, scoopCount) : isAddon ? Math.max(groupDto.options?.length ?? 0, 1) : minSelect;
          const group = await manager.save(manager.create(product_option_group_entity_1.ProductOptionGroup, {
            productId,
            name: groupDto.name,
            kind: groupDto.kind,
            minSelect,
            maxSelect,
            sortOrder: sortOrder++
          }));
          for (const opt of groupDto.options) {
            const ingredientId = opt.ingredientProductId ? Number(opt.ingredientProductId) : null;
            if (isAddon) {
              if (ingredientId) {
                await this.validateAddonIngredient(manager, ingredientId, storeId);
              }
            } else if (ingredientId) {
              await this.validateIngredient(manager, ingredientId, storeId);
            }
            const quantity = opt.quantity ?? (groupDto.kind === enums_1.OptionGroupKind.FLAVOR ? portionSize : 1);
            const unit = opt.unit ?? (groupDto.kind === enums_1.OptionGroupKind.FLAVOR ? portionUnit : enums_1.StockUnit.UNIT);
            let unitCost = opt.unitCost !== void 0 && opt.unitCost !== null ? Number(opt.unitCost) : null;
            if (unitCost === null && ingredientId) {
              const ingredient = await manager.findOne(product_entity_1.Product, {
                where: { id: ingredientId, storeId }
              });
              if (ingredient) {
                unitCost = Number((Number(ingredient.costPrice) * Number(quantity)).toFixed(2));
              } else {
                unitCost = 0;
              }
            } else if (unitCost === null) {
              unitCost = 0;
            }
            const unitPrice = opt.unitPrice !== void 0 && opt.unitPrice !== null ? Number(opt.unitPrice) : 0;
            await manager.save(manager.create(product_option_entity_1.ProductOption, {
              groupId: group.id,
              name: opt.name,
              ingredientProductId: ingredientId,
              quantity,
              unit,
              unitCost,
              unitPrice
            }));
          }
        }
      }
      async validateIngredient(manager, ingredientId, storeId, excludeProductId) {
        const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: ingredientId, storeId } });
        if (!ingredient) {
          throw new common_1.BadRequestException(`Ingrediente ${ingredientId} no encontrado`);
        }
        if (excludeProductId && ingredientId === excludeProductId) {
          throw new common_1.BadRequestException("Un producto no puede ser ingrediente de s\xED mismo");
        }
        if (![enums_1.ProductType.BULK, enums_1.ProductType.SIMPLE, enums_1.ProductType.PREPARED].includes(ingredient.productType)) {
          throw new common_1.BadRequestException(`${ingredient.name} no puede ser ingrediente`);
        }
      }
      async validateAddonIngredient(manager, ingredientId, storeId) {
        const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: ingredientId, storeId } });
        if (!ingredient) {
          throw new common_1.BadRequestException(`Producto ${ingredientId} no encontrado para el adicional`);
        }
        if (![enums_1.ProductType.BULK, enums_1.ProductType.SIMPLE, enums_1.ProductType.COMPOSITE].includes(ingredient.productType)) {
          throw new common_1.BadRequestException(`${ingredient.name} no puede usarse como adicional`);
        }
      }
      async remove(id, ctx) {
        const product = await this.repo.findOne({ where: { id } });
        if (!product)
          throw new common_1.NotFoundException("Producto no encontrado");
        const storeId = this.scopeStore(ctx);
        if (product.storeId !== storeId) {
          throw new common_1.ForbiddenException("Producto no pertenece a esta tienda");
        }
        try {
          await this.dataSource.transaction(async (manager) => {
            await this.assertCanDeleteProduct(manager, id, storeId);
            await this.cleanupIngredientReferences(manager, id, storeId);
            const groups = await manager.find(product_option_group_entity_1.ProductOptionGroup, { where: { productId: id } });
            if (groups.length) {
              await manager.delete(product_option_entity_1.ProductOption, { groupId: (0, typeorm_2.In)(groups.map((g) => g.id)) });
              await manager.delete(product_option_group_entity_1.ProductOptionGroup, { productId: id });
            }
            await manager.delete(product_recipe_entity_1.ProductRecipe, { productId: id });
            await manager.delete(inventory_movement_entity_1.InventoryMovement, { productId: id });
            await manager.delete(product_entity_1.Product, { id });
          });
        } catch (err) {
          if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException || err instanceof common_1.ForbiddenException) {
            throw err;
          }
          if (err instanceof typeorm_2.QueryFailedError && String(err.message).includes("foreign key constraint")) {
            throw new common_1.BadRequestException("No se puede eliminar el producto porque tiene registros asociados (ventas, compras o uso como ingrediente).");
          }
          throw err;
        }
        if (product.imageKey) {
          await this.storage.deleteObject(product.imageKey);
        }
        return { message: "Producto eliminado" };
      }
      async assertCanDeleteProduct(manager, productId, storeId) {
        const saleCount = await manager.count(sale_item_entity_1.SaleItem, { where: { productId } });
        if (saleCount > 0) {
          throw new common_1.BadRequestException("No se puede eliminar: el producto tiene ventas registradas. Desact\xEDvalo en su lugar.");
        }
        const purchaseCount = await manager.count(purchase_item_entity_1.PurchaseItem, { where: { productId } });
        if (purchaseCount > 0) {
          throw new common_1.BadRequestException("No se puede eliminar: el producto tiene compras registradas.");
        }
      }
      async cleanupIngredientReferences(manager, productId, storeId) {
        const options = await manager.find(product_option_entity_1.ProductOption, { where: { ingredientProductId: productId } });
        if (options.length) {
          const groupIds = [...new Set(options.map((o) => o.groupId))];
          await manager.delete(product_option_entity_1.ProductOption, { ingredientProductId: productId });
          for (const groupId of groupIds) {
            const remaining = await manager.count(product_option_entity_1.ProductOption, { where: { groupId } });
            if (remaining === 0) {
              await manager.delete(product_option_group_entity_1.ProductOptionGroup, { id: groupId });
            }
          }
        }
        await manager.delete(product_recipe_entity_1.ProductRecipe, { ingredientProductId: productId });
        await manager.update(product_entity_1.Product, { baseProductId: productId, storeId }, { baseProductId: null });
      }
      async uploadImage(id, file, ctx) {
        if (!file)
          throw new common_1.BadRequestException("Selecciona una imagen");
        const product = await this.repo.findOne({ where: { id } });
        if (!product)
          throw new common_1.NotFoundException("Producto no encontrado");
        const storeId = this.scopeStore(ctx);
        if (product.storeId !== storeId) {
          throw new common_1.ForbiddenException("Producto no pertenece a esta tienda");
        }
        const previousKey = product.imageKey;
        const imageKey = await this.storage.uploadProductImage(storeId, id, file);
        product.imageKey = imageKey;
        await this.repo.save(product);
        if (previousKey && previousKey !== imageKey) {
          await this.storage.deleteObject(previousKey);
        }
        const imageUrl = await this.storage.getSignedUrl(imageKey);
        return { imageUrl };
      }
      async getImageUrl(id, ctx) {
        const product = await this.repo.findOne({ where: { id } });
        if (!product)
          throw new common_1.NotFoundException("Producto no encontrado");
        if (product.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Producto no pertenece a esta tienda");
        }
        if (!product.imageKey) {
          throw new common_1.NotFoundException("Este producto no tiene imagen");
        }
        const imageUrl = await this.storage.getSignedUrl(product.imageKey);
        return { imageUrl };
      }
      async removeImage(id, ctx) {
        const product = await this.repo.findOne({ where: { id } });
        if (!product)
          throw new common_1.NotFoundException("Producto no encontrado");
        if (product.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Producto no pertenece a esta tienda");
        }
        if (product.imageKey) {
          await this.storage.deleteObject(product.imageKey);
          product.imageKey = null;
          await this.repo.save(product);
        }
        return { message: "Imagen eliminada" };
      }
    };
    exports2.ProductsService = ProductsService;
    exports2.ProductsService = ProductsService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
      __param(1, (0, typeorm_1.InjectRepository)(product_recipe_entity_1.ProductRecipe)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        storage_service_1.StorageService
      ])
    ], ProductsService);
  }
});

// node_modules/multer/node_modules/media-typer/index.js
var require_media_typer = __commonJS({
  "node_modules/multer/node_modules/media-typer/index.js"(exports2) {
    var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
    var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/;
    var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/;
    var qescRegExp = /\\([\u0000-\u007f])/g;
    var quoteRegExp = /([\\"])/g;
    var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/;
    var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/;
    var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
    exports2.format = format;
    exports2.parse = parse;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var subtype = obj.subtype;
      var suffix = obj.suffix;
      var type = obj.type;
      if (!type || !typeNameRegExp.test(type)) {
        throw new TypeError("invalid type");
      }
      if (!subtype || !subtypeNameRegExp.test(subtype)) {
        throw new TypeError("invalid subtype");
      }
      var string = type + "/" + subtype;
      if (suffix) {
        if (!typeNameRegExp.test(suffix)) {
          throw new TypeError("invalid suffix");
        }
        string += "+" + suffix;
      }
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          if (!tokenRegExp.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      if (typeof string === "object") {
        string = getcontenttype(string);
      }
      if (typeof string !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index = string.indexOf(";");
      var type = index !== -1 ? string.substr(0, index) : string;
      var key;
      var match;
      var obj = splitType(type);
      var params = {};
      var value;
      paramRegExp.lastIndex = index;
      while (match = paramRegExp.exec(string)) {
        if (match.index !== index) {
          throw new TypeError("invalid parameter format");
        }
        index += match[0].length;
        key = match[1].toLowerCase();
        value = match[2];
        if (value[0] === '"') {
          value = value.substr(1, value.length - 2).replace(qescRegExp, "$1");
        }
        params[key] = value;
      }
      if (index !== -1 && index !== string.length) {
        throw new TypeError("invalid parameter format");
      }
      obj.parameters = params;
      return obj;
    }
    function getcontenttype(obj) {
      if (typeof obj.getHeader === "function") {
        return obj.getHeader("content-type");
      }
      if (typeof obj.headers === "object") {
        return obj.headers && obj.headers["content-type"];
      }
    }
    function qstring(val) {
      var str = String(val);
      if (tokenRegExp.test(str)) {
        return str;
      }
      if (str.length > 0 && !textRegExp.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(quoteRegExp, "\\$1") + '"';
    }
    function splitType(string) {
      var match = typeRegExp.exec(string.toLowerCase());
      if (!match) {
        throw new TypeError("invalid media type");
      }
      var type = match[1];
      var subtype = match[2];
      var suffix;
      var index = subtype.lastIndexOf("+");
      if (index !== -1) {
        suffix = subtype.substr(index + 1);
        subtype = subtype.substr(0, index);
      }
      var obj = {
        type,
        subtype,
        suffix
      };
      return obj;
    }
  }
});

// node_modules/multer/node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/multer/node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/multer/node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/multer/node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// node_modules/multer/node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/multer/node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/multer/node_modules/type-is/index.js
var require_type_is = __commonJS({
  "node_modules/multer/node_modules/type-is/index.js"(exports2, module2) {
    "use strict";
    var typer = require_media_typer();
    var mime = require_mime_types();
    module2.exports = typeofrequest;
    module2.exports.is = typeis;
    module2.exports.hasBody = hasbody;
    module2.exports.normalize = normalize;
    module2.exports.match = mimeMatch;
    function typeis(value, types_) {
      var i;
      var types = types_;
      var val = tryNormalizeType(value);
      if (!val) {
        return false;
      }
      if (types && !Array.isArray(types)) {
        types = new Array(arguments.length - 1);
        for (i = 0; i < types.length; i++) {
          types[i] = arguments[i + 1];
        }
      }
      if (!types || !types.length) {
        return val;
      }
      var type;
      for (i = 0; i < types.length; i++) {
        if (mimeMatch(normalize(type = types[i]), val)) {
          return type[0] === "+" || type.indexOf("*") !== -1 ? val : type;
        }
      }
      return false;
    }
    function hasbody(req) {
      return req.headers["transfer-encoding"] !== void 0 || !isNaN(req.headers["content-length"]);
    }
    function typeofrequest(req, types_) {
      var types = types_;
      if (!hasbody(req)) {
        return null;
      }
      if (arguments.length > 2) {
        types = new Array(arguments.length - 1);
        for (var i = 0; i < types.length; i++) {
          types[i] = arguments[i + 1];
        }
      }
      var value = req.headers["content-type"];
      return typeis(value, types);
    }
    function normalize(type) {
      if (typeof type !== "string") {
        return false;
      }
      switch (type) {
        case "urlencoded":
          return "application/x-www-form-urlencoded";
        case "multipart":
          return "multipart/*";
      }
      if (type[0] === "+") {
        return "*/*" + type;
      }
      return type.indexOf("/") === -1 ? mime.lookup(type) : type;
    }
    function mimeMatch(expected, actual) {
      if (expected === false) {
        return false;
      }
      var actualParts = actual.split("/");
      var expectedParts = expected.split("/");
      if (actualParts.length !== 2 || expectedParts.length !== 2) {
        return false;
      }
      if (expectedParts[0] !== "*" && expectedParts[0] !== actualParts[0]) {
        return false;
      }
      if (expectedParts[1].substr(0, 2) === "*+") {
        return expectedParts[1].length <= actualParts[1].length + 1 && expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length);
      }
      if (expectedParts[1] !== "*" && expectedParts[1] !== actualParts[1]) {
        return false;
      }
      return true;
    }
    function normalizeType(value) {
      var type = typer.parse(value);
      type.parameters = void 0;
      return typer.format(type);
    }
    function tryNormalizeType(value) {
      if (!value) {
        return null;
      }
      try {
        return normalizeType(value);
      } catch (err) {
        return null;
      }
    }
  }
});

// node_modules/busboy/lib/utils.js
var require_utils = __commonJS({
  "node_modules/busboy/lib/utils.js"(exports2, module2) {
    "use strict";
    function parseContentType(str) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code !== 47 || i === 0)
            return;
          break;
        }
      }
      if (i === str.length)
        return;
      const type = str.slice(0, i).toLowerCase();
      const subtypeStart = ++i;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (i === subtypeStart)
            return;
          if (parseContentTypeParams(str, i, params) === void 0)
            return;
          break;
        }
      }
      if (i === subtypeStart)
        return;
      const subtype = str.slice(subtypeStart, i).toLowerCase();
      return { type, subtype, params };
    }
    function parseContentTypeParams(str, i, params) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code !== 61)
              return;
            break;
          }
        }
        if (i === str.length)
          return;
        name = str.slice(nameStart, i);
        ++i;
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        if (str.charCodeAt(i) === 34) {
          valueStart = ++i;
          let escaping = false;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 92) {
              if (escaping) {
                valueStart = i;
                escaping = false;
              } else {
                value += str.slice(valueStart, i);
                escaping = true;
              }
              continue;
            }
            if (code === 34) {
              if (escaping) {
                valueStart = i;
                escaping = false;
                continue;
              }
              value += str.slice(valueStart, i);
              break;
            }
            if (escaping) {
              valueStart = i - 1;
              escaping = false;
            }
            if (QDTEXT[code] !== 1)
              return;
          }
          if (i === str.length)
            return;
          ++i;
        } else {
          valueStart = i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (TOKEN[code] !== 1) {
              if (i === valueStart)
                return;
              break;
            }
          }
          value = str.slice(valueStart, i);
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    function parseDisposition(str, defDecoder) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (parseDispositionParams(str, i, params, defDecoder) === void 0)
            return;
          break;
        }
      }
      const type = str.slice(0, i).toLowerCase();
      return { type, params };
    }
    function parseDispositionParams(str, i, params, defDecoder) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code === 61)
              break;
            return;
          }
        }
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        let charset;
        name = str.slice(nameStart, i);
        if (name.charCodeAt(name.length - 1) === 42) {
          const charsetStart = ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (CHARSET[code] !== 1) {
              if (code !== 39)
                return;
              break;
            }
          }
          if (i === str.length)
            return;
          charset = str.slice(charsetStart, i);
          ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 39)
              break;
          }
          if (i === str.length)
            return;
          ++i;
          if (i === str.length)
            return;
          valueStart = i;
          let encode = 0;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (EXTENDED_VALUE[code] !== 1) {
              if (code === 37) {
                let hexUpper;
                let hexLower;
                if (i + 2 < str.length && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1 && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
                  const byteVal = (hexUpper << 4) + hexLower;
                  value += str.slice(valueStart, i);
                  value += String.fromCharCode(byteVal);
                  i += 2;
                  valueStart = i + 1;
                  if (byteVal >= 128)
                    encode = 2;
                  else if (encode === 0)
                    encode = 1;
                  continue;
                }
                return;
              }
              break;
            }
          }
          value += str.slice(valueStart, i);
          value = convertToUTF8(value, charset, encode);
          if (value === void 0)
            return;
        } else {
          ++i;
          if (i === str.length)
            return;
          if (str.charCodeAt(i) === 34) {
            valueStart = ++i;
            let escaping = false;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (code === 92) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                } else {
                  value += str.slice(valueStart, i);
                  escaping = true;
                }
                continue;
              }
              if (code === 34) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                  continue;
                }
                value += str.slice(valueStart, i);
                break;
              }
              if (escaping) {
                valueStart = i - 1;
                escaping = false;
              }
              if (QDTEXT[code] !== 1)
                return;
            }
            if (i === str.length)
              return;
            ++i;
          } else {
            valueStart = i;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (TOKEN[code] !== 1) {
                if (i === valueStart)
                  return;
                break;
              }
            }
            value = str.slice(valueStart, i);
          }
          value = defDecoder(value, 2);
          if (value === void 0)
            return;
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    function getDecoder(charset) {
      let lc;
      while (true) {
        switch (charset) {
          case "utf-8":
          case "utf8":
            return decoders.utf8;
          case "latin1":
          case "ascii":
          // TODO: Make these a separate, strict decoder?
          case "us-ascii":
          case "iso-8859-1":
          case "iso8859-1":
          case "iso88591":
          case "iso_8859-1":
          case "windows-1252":
          case "iso_8859-1:1987":
          case "cp1252":
          case "x-cp1252":
            return decoders.latin1;
          case "utf16le":
          case "utf-16le":
          case "ucs2":
          case "ucs-2":
            return decoders.utf16le;
          case "base64":
            return decoders.base64;
          default:
            if (lc === void 0) {
              lc = true;
              charset = charset.toLowerCase();
              continue;
            }
            return decoders.other.bind(charset);
        }
      }
    }
    var decoders = {
      utf8: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string") {
          if (hint < 2)
            return data;
          data = Buffer.from(data, "latin1");
        }
        return data.utf8Slice(0, data.length);
      },
      latin1: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          return data;
        return data.latin1Slice(0, data.length);
      },
      utf16le: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.ucs2Slice(0, data.length);
      },
      base64: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.base64Slice(0, data.length);
      },
      other: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        try {
          const decoder = new TextDecoder(exports2);
          return decoder.decode(data);
        } catch {
        }
      }
    };
    function convertToUTF8(data, charset, hint) {
      const decode = getDecoder(charset);
      if (decode)
        return decode(data, hint);
    }
    function basename(path) {
      if (typeof path !== "string")
        return "";
      for (let i = path.length - 1; i >= 0; --i) {
        switch (path.charCodeAt(i)) {
          case 47:
          // '/'
          case 92:
            path = path.slice(i + 1);
            return path === ".." || path === "." ? "" : path;
        }
      }
      return path === ".." || path === "." ? "" : path;
    }
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var QDTEXT = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    var CHARSET = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var EXTENDED_VALUE = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    };
  }
});

// node_modules/streamsearch/lib/sbmh.js
var require_sbmh = __commonJS({
  "node_modules/streamsearch/lib/sbmh.js"(exports2, module2) {
    "use strict";
    function memcmp(buf1, pos1, buf2, pos2, num) {
      for (let i = 0; i < num; ++i) {
        if (buf1[pos1 + i] !== buf2[pos2 + i])
          return false;
      }
      return true;
    }
    var SBMH = class {
      constructor(needle, cb) {
        if (typeof cb !== "function")
          throw new Error("Missing match callback");
        if (typeof needle === "string")
          needle = Buffer.from(needle);
        else if (!Buffer.isBuffer(needle))
          throw new Error(`Expected Buffer for needle, got ${typeof needle}`);
        const needleLen = needle.length;
        this.maxMatches = Infinity;
        this.matches = 0;
        this._cb = cb;
        this._lookbehindSize = 0;
        this._needle = needle;
        this._bufPos = 0;
        this._lookbehind = Buffer.allocUnsafe(needleLen);
        this._occ = [
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen
        ];
        if (needleLen > 1) {
          for (let i = 0; i < needleLen - 1; ++i)
            this._occ[needle[i]] = needleLen - 1 - i;
        }
      }
      reset() {
        this.matches = 0;
        this._lookbehindSize = 0;
        this._bufPos = 0;
      }
      push(chunk, pos) {
        let result;
        if (!Buffer.isBuffer(chunk))
          chunk = Buffer.from(chunk, "latin1");
        const chunkLen = chunk.length;
        this._bufPos = pos || 0;
        while (result !== chunkLen && this.matches < this.maxMatches)
          result = feed(this, chunk);
        return result;
      }
      destroy() {
        const lbSize = this._lookbehindSize;
        if (lbSize)
          this._cb(false, this._lookbehind, 0, lbSize, false);
        this.reset();
      }
    };
    function feed(self2, data) {
      const len = data.length;
      const needle = self2._needle;
      const needleLen = needle.length;
      let pos = -self2._lookbehindSize;
      const lastNeedleCharPos = needleLen - 1;
      const lastNeedleChar = needle[lastNeedleCharPos];
      const end = len - needleLen;
      const occ = self2._occ;
      const lookbehind = self2._lookbehind;
      if (pos < 0) {
        while (pos < 0 && pos <= end) {
          const nextPos = pos + lastNeedleCharPos;
          const ch = nextPos < 0 ? lookbehind[self2._lookbehindSize + nextPos] : data[nextPos];
          if (ch === lastNeedleChar && matchNeedle(self2, data, pos, lastNeedleCharPos)) {
            self2._lookbehindSize = 0;
            ++self2.matches;
            if (pos > -self2._lookbehindSize)
              self2._cb(true, lookbehind, 0, self2._lookbehindSize + pos, false);
            else
              self2._cb(true, void 0, 0, 0, true);
            return self2._bufPos = pos + needleLen;
          }
          pos += occ[ch];
        }
        while (pos < 0 && !matchNeedle(self2, data, pos, len - pos))
          ++pos;
        if (pos < 0) {
          const bytesToCutOff = self2._lookbehindSize + pos;
          if (bytesToCutOff > 0) {
            self2._cb(false, lookbehind, 0, bytesToCutOff, false);
          }
          self2._lookbehindSize -= bytesToCutOff;
          lookbehind.copy(lookbehind, 0, bytesToCutOff, self2._lookbehindSize);
          lookbehind.set(data, self2._lookbehindSize);
          self2._lookbehindSize += len;
          self2._bufPos = len;
          return len;
        }
        self2._cb(false, lookbehind, 0, self2._lookbehindSize, false);
        self2._lookbehindSize = 0;
      }
      pos += self2._bufPos;
      const firstNeedleChar = needle[0];
      while (pos <= end) {
        const ch = data[pos + lastNeedleCharPos];
        if (ch === lastNeedleChar && data[pos] === firstNeedleChar && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
          ++self2.matches;
          if (pos > 0)
            self2._cb(true, data, self2._bufPos, pos, true);
          else
            self2._cb(true, void 0, 0, 0, true);
          return self2._bufPos = pos + needleLen;
        }
        pos += occ[ch];
      }
      while (pos < len) {
        if (data[pos] !== firstNeedleChar || !memcmp(data, pos, needle, 0, len - pos)) {
          ++pos;
          continue;
        }
        data.copy(lookbehind, 0, pos, len);
        self2._lookbehindSize = len - pos;
        break;
      }
      if (pos > 0)
        self2._cb(false, data, self2._bufPos, pos < len ? pos : len, true);
      self2._bufPos = len;
      return len;
    }
    function matchNeedle(self2, data, pos, len) {
      const lb = self2._lookbehind;
      const lbSize = self2._lookbehindSize;
      const needle = self2._needle;
      for (let i = 0; i < len; ++i, ++pos) {
        const ch = pos < 0 ? lb[lbSize + pos] : data[pos];
        if (ch !== needle[i])
          return false;
      }
      return true;
    }
    module2.exports = SBMH;
  }
});

// node_modules/busboy/lib/types/multipart.js
var require_multipart = __commonJS({
  "node_modules/busboy/lib/types/multipart.js"(exports2, module2) {
    "use strict";
    var { Readable, Writable } = require("stream");
    var StreamSearch = require_sbmh();
    var {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    } = require_utils();
    var BUF_CRLF = Buffer.from("\r\n");
    var BUF_CR = Buffer.from("\r");
    var BUF_DASH = Buffer.from("-");
    function noop() {
    }
    var MAX_HEADER_PAIRS = 2e3;
    var MAX_HEADER_SIZE = 16 * 1024;
    var HPARSER_NAME = 0;
    var HPARSER_PRE_OWS = 1;
    var HPARSER_VALUE = 2;
    var HeaderParser = class {
      constructor(cb) {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
        this.cb = cb;
      }
      reset() {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
      }
      push(chunk, pos, end) {
        let start = pos;
        while (pos < end) {
          switch (this.state) {
            case HPARSER_NAME: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (TOKEN[code] !== 1) {
                  if (code !== 58)
                    return -1;
                  this.name += chunk.latin1Slice(start, pos);
                  if (this.name.length === 0)
                    return -1;
                  ++pos;
                  done = true;
                  this.state = HPARSER_PRE_OWS;
                  break;
                }
              }
              if (!done) {
                this.name += chunk.latin1Slice(start, pos);
                break;
              }
            }
            case HPARSER_PRE_OWS: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (code !== 32 && code !== 9) {
                  start = pos;
                  done = true;
                  this.state = HPARSER_VALUE;
                  break;
                }
              }
              if (!done)
                break;
            }
            case HPARSER_VALUE:
              switch (this.crlf) {
                case 0:
                  for (; pos < end; ++pos) {
                    if (this.byteCount === MAX_HEADER_SIZE)
                      return -1;
                    ++this.byteCount;
                    const code = chunk[pos];
                    if (FIELD_VCHAR[code] !== 1) {
                      if (code !== 13)
                        return -1;
                      ++this.crlf;
                      break;
                    }
                  }
                  this.value += chunk.latin1Slice(start, pos++);
                  break;
                case 1:
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  ++this.crlf;
                  break;
                case 2: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  const code = chunk[pos];
                  if (code === 32 || code === 9) {
                    start = pos;
                    this.crlf = 0;
                  } else {
                    if (++this.pairCount < MAX_HEADER_PAIRS) {
                      this.name = this.name.toLowerCase();
                      if (this.header[this.name] === void 0)
                        this.header[this.name] = [this.value];
                      else
                        this.header[this.name].push(this.value);
                    }
                    if (code === 13) {
                      ++this.crlf;
                      ++pos;
                    } else {
                      start = pos;
                      this.crlf = 0;
                      this.state = HPARSER_NAME;
                      this.name = "";
                      this.value = "";
                    }
                  }
                  break;
                }
                case 3: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  const header = this.header;
                  this.reset();
                  this.cb(header);
                  return pos;
                }
              }
              break;
          }
        }
        return pos;
      }
    };
    var FileStream = class extends Readable {
      constructor(opts, owner) {
        super(opts);
        this.truncated = false;
        this._readcb = null;
        this.once("end", () => {
          this._read();
          if (--owner._fileEndsLeft === 0 && owner._finalcb) {
            const cb = owner._finalcb;
            owner._finalcb = null;
            process.nextTick(cb);
          }
        });
      }
      _read(n) {
        const cb = this._readcb;
        if (cb) {
          this._readcb = null;
          cb();
        }
      }
    };
    var ignoreData = {
      push: (chunk, pos) => {
      },
      destroy: () => {
      }
    };
    function callAndUnsetCb(self2, err) {
      const cb = self2._writecb;
      self2._writecb = null;
      if (err)
        self2.destroy(err);
      else if (cb)
        cb();
    }
    function nullDecoder(val, hint) {
      return val;
    }
    var Multipart = class extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        if (!cfg.conType.params || typeof cfg.conType.params.boundary !== "string")
          throw new Error("Multipart: Boundary not found");
        const boundary = cfg.conType.params.boundary;
        const paramDecoder = typeof cfg.defParamCharset === "string" && cfg.defParamCharset ? getDecoder(cfg.defParamCharset) : nullDecoder;
        const defCharset = cfg.defCharset || "utf8";
        const preservePath = cfg.preservePath;
        const fileOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.fileHwm === "number" ? cfg.fileHwm : void 0
        };
        const limits = cfg.limits;
        const fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        const fileSizeLimit = limits && typeof limits.fileSize === "number" ? limits.fileSize : Infinity;
        const filesLimit = limits && typeof limits.files === "number" ? limits.files : Infinity;
        const fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        const partsLimit = limits && typeof limits.parts === "number" ? limits.parts : Infinity;
        let parts = -1;
        let fields = 0;
        let files = 0;
        let skipPart = false;
        this._fileEndsLeft = 0;
        this._fileStream = void 0;
        this._complete = false;
        let fileSize = 0;
        let field;
        let fieldSize = 0;
        let partCharset;
        let partEncoding;
        let partType;
        let partName;
        let partTruncated = false;
        let hitFilesLimit = false;
        let hitFieldsLimit = false;
        this._hparser = null;
        const hparser = new HeaderParser((header) => {
          this._hparser = null;
          skipPart = false;
          partType = "text/plain";
          partCharset = defCharset;
          partEncoding = "7bit";
          partName = void 0;
          partTruncated = false;
          let filename;
          if (!header["content-disposition"]) {
            skipPart = true;
            return;
          }
          const disp = parseDisposition(
            header["content-disposition"][0],
            paramDecoder
          );
          if (!disp || disp.type !== "form-data") {
            skipPart = true;
            return;
          }
          if (disp.params) {
            if (disp.params.name)
              partName = disp.params.name;
            if (disp.params["filename*"])
              filename = disp.params["filename*"];
            else if (disp.params.filename)
              filename = disp.params.filename;
            if (filename !== void 0 && !preservePath)
              filename = basename(filename);
          }
          if (header["content-type"]) {
            const conType = parseContentType(header["content-type"][0]);
            if (conType) {
              partType = `${conType.type}/${conType.subtype}`;
              if (conType.params && typeof conType.params.charset === "string")
                partCharset = conType.params.charset.toLowerCase();
            }
          }
          if (header["content-transfer-encoding"])
            partEncoding = header["content-transfer-encoding"][0].toLowerCase();
          if (partType === "application/octet-stream" || filename !== void 0) {
            if (files === filesLimit) {
              if (!hitFilesLimit) {
                hitFilesLimit = true;
                this.emit("filesLimit");
              }
              skipPart = true;
              return;
            }
            ++files;
            if (this.listenerCount("file") === 0) {
              skipPart = true;
              return;
            }
            fileSize = 0;
            this._fileStream = new FileStream(fileOpts, this);
            ++this._fileEndsLeft;
            this.emit(
              "file",
              partName,
              this._fileStream,
              {
                filename,
                encoding: partEncoding,
                mimeType: partType
              }
            );
          } else {
            if (fields === fieldsLimit) {
              if (!hitFieldsLimit) {
                hitFieldsLimit = true;
                this.emit("fieldsLimit");
              }
              skipPart = true;
              return;
            }
            ++fields;
            if (this.listenerCount("field") === 0) {
              skipPart = true;
              return;
            }
            field = [];
            fieldSize = 0;
          }
        });
        let matchPostBoundary = 0;
        const ssCb = (isMatch, data, start, end, isDataSafe) => {
          retrydata:
            while (data) {
              if (this._hparser !== null) {
                const ret = this._hparser.push(data, start, end);
                if (ret === -1) {
                  this._hparser = null;
                  hparser.reset();
                  this.emit("error", new Error("Malformed part header"));
                  break;
                }
                start = ret;
              }
              if (start === end)
                break;
              if (matchPostBoundary !== 0) {
                if (matchPostBoundary === 1) {
                  switch (data[start]) {
                    case 45:
                      matchPostBoundary = 2;
                      ++start;
                      break;
                    case 13:
                      matchPostBoundary = 3;
                      ++start;
                      break;
                    default:
                      matchPostBoundary = 0;
                  }
                  if (start === end)
                    return;
                }
                if (matchPostBoundary === 2) {
                  matchPostBoundary = 0;
                  if (data[start] === 45) {
                    this._complete = true;
                    this._bparser = ignoreData;
                    return;
                  }
                  const writecb = this._writecb;
                  this._writecb = noop;
                  ssCb(false, BUF_DASH, 0, 1, false);
                  this._writecb = writecb;
                } else if (matchPostBoundary === 3) {
                  matchPostBoundary = 0;
                  if (data[start] === 10) {
                    ++start;
                    if (parts >= partsLimit)
                      break;
                    this._hparser = hparser;
                    if (start === end)
                      break;
                    continue retrydata;
                  } else {
                    const writecb = this._writecb;
                    this._writecb = noop;
                    ssCb(false, BUF_CR, 0, 1, false);
                    this._writecb = writecb;
                  }
                }
              }
              if (!skipPart) {
                if (this._fileStream) {
                  let chunk;
                  const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fileSize += chunk.length;
                  if (fileSize === fileSizeLimit) {
                    if (chunk.length > 0)
                      this._fileStream.push(chunk);
                    this._fileStream.emit("limit");
                    this._fileStream.truncated = true;
                    skipPart = true;
                  } else if (!this._fileStream.push(chunk)) {
                    if (this._writecb)
                      this._fileStream._readcb = this._writecb;
                    this._writecb = null;
                  }
                } else if (field !== void 0) {
                  let chunk;
                  const actualLen = Math.min(
                    end - start,
                    fieldSizeLimit - fieldSize
                  );
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fieldSize += actualLen;
                  field.push(chunk);
                  if (fieldSize === fieldSizeLimit) {
                    skipPart = true;
                    partTruncated = true;
                  }
                }
              }
              break;
            }
          if (isMatch) {
            matchPostBoundary = 1;
            if (this._fileStream) {
              this._fileStream.push(null);
              this._fileStream = null;
            } else if (field !== void 0) {
              let data2;
              switch (field.length) {
                case 0:
                  data2 = "";
                  break;
                case 1:
                  data2 = convertToUTF8(field[0], partCharset, 0);
                  break;
                default:
                  data2 = convertToUTF8(
                    Buffer.concat(field, fieldSize),
                    partCharset,
                    0
                  );
              }
              field = void 0;
              fieldSize = 0;
              this.emit(
                "field",
                partName,
                data2,
                {
                  nameTruncated: false,
                  valueTruncated: partTruncated,
                  encoding: partEncoding,
                  mimeType: partType
                }
              );
            }
            if (++parts === partsLimit)
              this.emit("partsLimit");
          }
        };
        this._bparser = new StreamSearch(`\r
--${boundary}`, ssCb);
        this._writecb = null;
        this._finalcb = null;
        this.write(BUF_CRLF);
      }
      static detect(conType) {
        return conType.type === "multipart" && conType.subtype === "form-data";
      }
      _write(chunk, enc, cb) {
        this._writecb = cb;
        this._bparser.push(chunk, 0);
        if (this._writecb)
          callAndUnsetCb(this);
      }
      _destroy(err, cb) {
        this._hparser = null;
        this._bparser = ignoreData;
        if (!err)
          err = checkEndState(this);
        const fileStream = this._fileStream;
        if (fileStream) {
          this._fileStream = null;
          fileStream.destroy(err);
        }
        cb(err);
      }
      _final(cb) {
        this._bparser.destroy();
        if (!this._complete)
          return cb(new Error("Unexpected end of form"));
        if (this._fileEndsLeft)
          this._finalcb = finalcb.bind(null, this, cb);
        else
          finalcb(this, cb);
      }
    };
    function finalcb(self2, cb, err) {
      if (err)
        return cb(err);
      err = checkEndState(self2);
      cb(err);
    }
    function checkEndState(self2) {
      if (self2._hparser)
        return new Error("Malformed part header");
      const fileStream = self2._fileStream;
      if (fileStream) {
        self2._fileStream = null;
        fileStream.destroy(new Error("Unexpected end of file"));
      }
      if (!self2._complete)
        return new Error("Unexpected end of form");
    }
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var FIELD_VCHAR = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    module2.exports = Multipart;
  }
});

// node_modules/busboy/lib/types/urlencoded.js
var require_urlencoded = __commonJS({
  "node_modules/busboy/lib/types/urlencoded.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var { getDecoder } = require_utils();
    var URLEncoded = class extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        let charset = cfg.defCharset || "utf8";
        if (cfg.conType.params && typeof cfg.conType.params.charset === "string")
          charset = cfg.conType.params.charset;
        this.charset = charset;
        const limits = cfg.limits;
        this.fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        this.fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        this.fieldNameSizeLimit = limits && typeof limits.fieldNameSize === "number" ? limits.fieldNameSize : 100;
        this._inKey = true;
        this._keyTrunc = false;
        this._valTrunc = false;
        this._bytesKey = 0;
        this._bytesVal = 0;
        this._fields = 0;
        this._key = "";
        this._val = "";
        this._byte = -2;
        this._lastPos = 0;
        this._encode = 0;
        this._decoder = getDecoder(charset);
      }
      static detect(conType) {
        return conType.type === "application" && conType.subtype === "x-www-form-urlencoded";
      }
      _write(chunk, enc, cb) {
        if (this._fields >= this.fieldsLimit)
          return cb();
        let i = 0;
        const len = chunk.length;
        this._lastPos = 0;
        if (this._byte !== -2) {
          i = readPctEnc(this, chunk, i, len);
          if (i === -1)
            return cb(new Error("Malformed urlencoded form"));
          if (i >= len)
            return cb();
          if (this._inKey)
            ++this._bytesKey;
          else
            ++this._bytesVal;
        }
        main:
          while (i < len) {
            if (this._inKey) {
              i = skipKeyBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 61:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    this._inKey = false;
                    continue main;
                  case 38:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0) {
                      this.emit(
                        "field",
                        this._key,
                        "",
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: false,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue;
                  case 43:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._key += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesKey;
                    i = skipKeyBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesKey;
                i = skipKeyBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._key += chunk.latin1Slice(this._lastPos, i);
            } else {
              i = skipValBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 38:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._inKey = true;
                    this._val = this._decoder(this._val, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0 || this._bytesVal > 0) {
                      this.emit(
                        "field",
                        this._key,
                        this._val,
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: this._valTrunc,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue main;
                  case 43:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._val += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesVal;
                    i = skipValBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesVal;
                i = skipValBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._val += chunk.latin1Slice(this._lastPos, i);
            }
          }
        cb();
      }
      _final(cb) {
        if (this._byte !== -2)
          return cb(new Error("Malformed urlencoded form"));
        if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
          if (this._inKey)
            this._key = this._decoder(this._key, this._encode);
          else
            this._val = this._decoder(this._val, this._encode);
          this.emit(
            "field",
            this._key,
            this._val,
            {
              nameTruncated: this._keyTrunc,
              valueTruncated: this._valTrunc,
              encoding: this.charset,
              mimeType: "text/plain"
            }
          );
        }
        cb();
      }
    };
    function readPctEnc(self2, chunk, pos, len) {
      if (pos >= len)
        return len;
      if (self2._byte === -1) {
        const hexUpper = HEX_VALUES[chunk[pos++]];
        if (hexUpper === -1)
          return -1;
        if (hexUpper >= 8)
          self2._encode = 2;
        if (pos < len) {
          const hexLower = HEX_VALUES[chunk[pos++]];
          if (hexLower === -1)
            return -1;
          if (self2._inKey)
            self2._key += String.fromCharCode((hexUpper << 4) + hexLower);
          else
            self2._val += String.fromCharCode((hexUpper << 4) + hexLower);
          self2._byte = -2;
          self2._lastPos = pos;
        } else {
          self2._byte = hexUpper;
        }
      } else {
        const hexLower = HEX_VALUES[chunk[pos++]];
        if (hexLower === -1)
          return -1;
        if (self2._inKey)
          self2._key += String.fromCharCode((self2._byte << 4) + hexLower);
        else
          self2._val += String.fromCharCode((self2._byte << 4) + hexLower);
        self2._byte = -2;
        self2._lastPos = pos;
      }
      return pos;
    }
    function skipKeyBytes(self2, chunk, pos, len) {
      if (self2._bytesKey > self2.fieldNameSizeLimit) {
        if (!self2._keyTrunc) {
          if (self2._lastPos < pos)
            self2._key += chunk.latin1Slice(self2._lastPos, pos - 1);
        }
        self2._keyTrunc = true;
        for (; pos < len; ++pos) {
          const code = chunk[pos];
          if (code === 61 || code === 38)
            break;
          ++self2._bytesKey;
        }
        self2._lastPos = pos;
      }
      return pos;
    }
    function skipValBytes(self2, chunk, pos, len) {
      if (self2._bytesVal > self2.fieldSizeLimit) {
        if (!self2._valTrunc) {
          if (self2._lastPos < pos)
            self2._val += chunk.latin1Slice(self2._lastPos, pos - 1);
        }
        self2._valTrunc = true;
        for (; pos < len; ++pos) {
          if (chunk[pos] === 38)
            break;
          ++self2._bytesVal;
        }
        self2._lastPos = pos;
      }
      return pos;
    }
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = URLEncoded;
  }
});

// node_modules/busboy/lib/index.js
var require_lib = __commonJS({
  "node_modules/busboy/lib/index.js"(exports2, module2) {
    "use strict";
    var { parseContentType } = require_utils();
    function getInstance(cfg) {
      const headers = cfg.headers;
      const conType = parseContentType(headers["content-type"]);
      if (!conType)
        throw new Error("Malformed content type");
      for (const type of TYPES) {
        const matched = type.detect(conType);
        if (!matched)
          continue;
        const instanceCfg = {
          limits: cfg.limits,
          headers,
          conType,
          highWaterMark: void 0,
          fileHwm: void 0,
          defCharset: void 0,
          defParamCharset: void 0,
          preservePath: false
        };
        if (cfg.highWaterMark)
          instanceCfg.highWaterMark = cfg.highWaterMark;
        if (cfg.fileHwm)
          instanceCfg.fileHwm = cfg.fileHwm;
        instanceCfg.defCharset = cfg.defCharset;
        instanceCfg.defParamCharset = cfg.defParamCharset;
        instanceCfg.preservePath = cfg.preservePath;
        return new type(instanceCfg);
      }
      throw new Error(`Unsupported content type: ${headers["content-type"]}`);
    }
    var TYPES = [
      require_multipart(),
      require_urlencoded()
    ].filter(function(typemod) {
      return typeof typemod.detect === "function";
    });
    module2.exports = (cfg) => {
      if (typeof cfg !== "object" || cfg === null)
        cfg = {};
      if (typeof cfg.headers !== "object" || cfg.headers === null || typeof cfg.headers["content-type"] !== "string") {
        throw new Error("Missing Content-Type");
      }
      return getInstance(cfg);
    };
  }
});

// node_modules/append-field/lib/parse-path.js
var require_parse_path = __commonJS({
  "node_modules/append-field/lib/parse-path.js"(exports2, module2) {
    var reFirstKey = /^[^\[]*/;
    var reDigitPath = /^\[(\d+)\]/;
    var reNormalPath = /^\[([^\]]+)\]/;
    function parsePath(key) {
      function failure() {
        return [{ type: "object", key, last: true }];
      }
      var firstKey = reFirstKey.exec(key)[0];
      if (!firstKey) return failure();
      var len = key.length;
      var pos = firstKey.length;
      var tail = { type: "object", key: firstKey };
      var steps = [tail];
      while (pos < len) {
        var m;
        if (key[pos] === "[" && key[pos + 1] === "]") {
          pos += 2;
          tail.append = true;
          if (pos !== len) return failure();
          continue;
        }
        m = reDigitPath.exec(key.substring(pos));
        if (m !== null) {
          pos += m[0].length;
          tail.nextType = "array";
          tail = { type: "array", key: parseInt(m[1], 10) };
          steps.push(tail);
          continue;
        }
        m = reNormalPath.exec(key.substring(pos));
        if (m !== null) {
          pos += m[0].length;
          tail.nextType = "object";
          tail = { type: "object", key: m[1] };
          steps.push(tail);
          continue;
        }
        return failure();
      }
      tail.last = true;
      return steps;
    }
    module2.exports = parsePath;
  }
});

// node_modules/append-field/lib/set-value.js
var require_set_value = __commonJS({
  "node_modules/append-field/lib/set-value.js"(exports2, module2) {
    function valueType(value) {
      if (value === void 0) return "undefined";
      if (Array.isArray(value)) return "array";
      if (typeof value === "object") return "object";
      return "scalar";
    }
    function setLastValue(context, step, currentValue, entryValue) {
      switch (valueType(currentValue)) {
        case "undefined":
          if (step.append) {
            context[step.key] = [entryValue];
          } else {
            context[step.key] = entryValue;
          }
          break;
        case "array":
          context[step.key].push(entryValue);
          break;
        case "object":
          return setLastValue(currentValue, { type: "object", key: "", last: true }, currentValue[""], entryValue);
        case "scalar":
          context[step.key] = [context[step.key], entryValue];
          break;
      }
      return context;
    }
    function setValue(context, step, currentValue, entryValue) {
      if (step.last) return setLastValue(context, step, currentValue, entryValue);
      var obj;
      switch (valueType(currentValue)) {
        case "undefined":
          if (step.nextType === "array") {
            context[step.key] = [];
          } else {
            context[step.key] = /* @__PURE__ */ Object.create(null);
          }
          return context[step.key];
        case "object":
          return context[step.key];
        case "array":
          if (step.nextType === "array") {
            return currentValue;
          }
          obj = /* @__PURE__ */ Object.create(null);
          context[step.key] = obj;
          currentValue.forEach(function(item, i) {
            if (item !== void 0) obj["" + i] = item;
          });
          return obj;
        case "scalar":
          obj = /* @__PURE__ */ Object.create(null);
          obj[""] = currentValue;
          context[step.key] = obj;
          return obj;
      }
    }
    module2.exports = setValue;
  }
});

// node_modules/append-field/index.js
var require_append_field = __commonJS({
  "node_modules/append-field/index.js"(exports2, module2) {
    var parsePath = require_parse_path();
    var setValue = require_set_value();
    function appendField(store, key, value) {
      var steps = parsePath(key);
      steps.reduce(function(context, step) {
        return setValue(context, step, context[step.key], value);
      }, store);
    }
    module2.exports = appendField;
  }
});

// node_modules/multer/lib/counter.js
var require_counter = __commonJS({
  "node_modules/multer/lib/counter.js"(exports2, module2) {
    var EventEmitter = require("events").EventEmitter;
    function Counter() {
      EventEmitter.call(this);
      this.value = 0;
    }
    Counter.prototype = Object.create(EventEmitter.prototype);
    Counter.prototype.increment = function increment() {
      this.value++;
    };
    Counter.prototype.decrement = function decrement() {
      if (--this.value === 0) this.emit("zero");
    };
    Counter.prototype.isZero = function isZero() {
      return this.value === 0;
    };
    Counter.prototype.onceZero = function onceZero(fn) {
      if (this.isZero()) return fn();
      this.once("zero", fn);
    };
    module2.exports = Counter;
  }
});

// node_modules/multer/lib/multer-error.js
var require_multer_error = __commonJS({
  "node_modules/multer/lib/multer-error.js"(exports2, module2) {
    var util = require("util");
    var errorMessages = {
      LIMIT_PART_COUNT: "Too many parts",
      LIMIT_FILE_SIZE: "File too large",
      LIMIT_FILE_COUNT: "Too many files",
      LIMIT_FIELD_KEY: "Field name too long",
      LIMIT_FIELD_VALUE: "Field value too long",
      LIMIT_FIELD_COUNT: "Too many fields",
      LIMIT_UNEXPECTED_FILE: "Unexpected field",
      MISSING_FIELD_NAME: "Field name missing"
    };
    function MulterError(code, field) {
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.message = errorMessages[code];
      this.code = code;
      if (field) this.field = field;
    }
    util.inherits(MulterError, Error);
    module2.exports = MulterError;
  }
});

// node_modules/multer/lib/file-appender.js
var require_file_appender = __commonJS({
  "node_modules/multer/lib/file-appender.js"(exports2, module2) {
    function arrayRemove(arr, item) {
      var idx = arr.indexOf(item);
      if (~idx) arr.splice(idx, 1);
    }
    function FileAppender(strategy, req) {
      this.strategy = strategy;
      this.req = req;
      switch (strategy) {
        case "NONE":
          break;
        case "VALUE":
          break;
        case "ARRAY":
          req.files = [];
          break;
        case "OBJECT":
          req.files = /* @__PURE__ */ Object.create(null);
          break;
        default:
          throw new Error("Unknown file strategy: " + strategy);
      }
    }
    FileAppender.prototype.insertPlaceholder = function(file) {
      var placeholder = {
        fieldname: file.fieldname
      };
      switch (this.strategy) {
        case "NONE":
          break;
        case "VALUE":
          break;
        case "ARRAY":
          this.req.files.push(placeholder);
          break;
        case "OBJECT":
          if (this.req.files[file.fieldname]) {
            this.req.files[file.fieldname].push(placeholder);
          } else {
            this.req.files[file.fieldname] = [placeholder];
          }
          break;
      }
      return placeholder;
    };
    FileAppender.prototype.removePlaceholder = function(placeholder) {
      switch (this.strategy) {
        case "NONE":
          break;
        case "VALUE":
          break;
        case "ARRAY":
          arrayRemove(this.req.files, placeholder);
          break;
        case "OBJECT":
          if (this.req.files[placeholder.fieldname].length === 1) {
            delete this.req.files[placeholder.fieldname];
          } else {
            arrayRemove(this.req.files[placeholder.fieldname], placeholder);
          }
          break;
      }
    };
    FileAppender.prototype.replacePlaceholder = function(placeholder, file) {
      if (this.strategy === "VALUE") {
        this.req.file = file;
        return;
      }
      delete placeholder.fieldname;
      Object.assign(placeholder, file);
    };
    module2.exports = FileAppender;
  }
});

// node_modules/multer/lib/remove-uploaded-files.js
var require_remove_uploaded_files = __commonJS({
  "node_modules/multer/lib/remove-uploaded-files.js"(exports2, module2) {
    function removeUploadedFiles(uploadedFiles, remove, cb) {
      var length = uploadedFiles.length;
      var errors = [];
      if (length === 0) return cb(null, errors);
      function handleFile(idx) {
        var file = uploadedFiles[idx];
        remove(file, function(err) {
          if (err) {
            err.file = file;
            err.field = file.fieldname;
            errors.push(err);
          }
          if (idx < length - 1) {
            setImmediate(function() {
              handleFile(idx + 1);
            });
          } else {
            cb(null, errors);
          }
        });
      }
      handleFile(0);
    }
    module2.exports = removeUploadedFiles;
  }
});

// node_modules/multer/lib/make-middleware.js
var require_make_middleware = __commonJS({
  "node_modules/multer/lib/make-middleware.js"(exports2, module2) {
    var is = require_type_is();
    var Busboy = require_lib();
    var appendField = require_append_field();
    var Counter = require_counter();
    var MulterError = require_multer_error();
    var FileAppender = require_file_appender();
    var removeUploadedFiles = require_remove_uploaded_files();
    function drainStream(stream) {
      stream.on("readable", () => {
        while (stream.read() !== null) {
        }
      });
    }
    function makeMiddleware(setup) {
      return function multerMiddleware(req, res, next) {
        if (!is(req, ["multipart"])) return next();
        var options = setup();
        var limits = options.limits;
        var storage = options.storage;
        var fileFilter = options.fileFilter;
        var fileStrategy = options.fileStrategy;
        var preservePath = options.preservePath;
        var defParamCharset = options.defParamCharset;
        req.body = /* @__PURE__ */ Object.create(null);
        var busboy;
        var appender = null;
        var isDone = false;
        var readFinished = false;
        var errorOccured = false;
        var pendingWrites = new Counter();
        var uploadedFiles = [];
        function done(err) {
          var called = false;
          function onFinished() {
            if (called) return;
            called = true;
            next(err);
          }
          if (isDone) return;
          isDone = true;
          if (busboy) {
            req.unpipe(busboy);
            setImmediate(() => {
              busboy.removeAllListeners();
            });
          }
          drainStream(req);
          req.resume();
          if (err && req.readable && !req.destroyed) {
            req.once("end", onFinished);
            req.once("error", onFinished);
            req.once("close", onFinished);
            return;
          }
          next(err);
        }
        function indicateDone() {
          if (readFinished && pendingWrites.isZero() && !errorOccured) done();
        }
        function abortWithError(uploadError, skipPendingWait) {
          if (errorOccured) return;
          errorOccured = true;
          function finishAbort() {
            function remove(file, cb) {
              storage._removeFile(req, file, cb);
            }
            removeUploadedFiles(uploadedFiles, remove, function(err, storageErrors) {
              if (err) return done(err);
              uploadError.storageErrors = storageErrors;
              done(uploadError);
            });
          }
          if (skipPendingWait) {
            finishAbort();
          } else {
            pendingWrites.onceZero(finishAbort);
          }
        }
        function abortWithCode(code, optionalField) {
          abortWithError(new MulterError(code, optionalField));
        }
        function handleRequestFailure(err) {
          if (isDone) return;
          if (busboy) {
            req.unpipe(busboy);
            busboy.destroy(err);
          }
          abortWithError(err, true);
        }
        req.on("error", function(err) {
          handleRequestFailure(err || new Error("Request error"));
        });
        req.on("aborted", function() {
          handleRequestFailure(new Error("Request aborted"));
        });
        req.on("close", function() {
          if (req.readableEnded) return;
          handleRequestFailure(new Error("Request closed"));
        });
        try {
          busboy = Busboy({
            headers: req.headers,
            limits,
            preservePath,
            defParamCharset
          });
        } catch (err) {
          return next(err);
        }
        appender = new FileAppender(fileStrategy, req);
        busboy.on("field", function(fieldname, value, { nameTruncated, valueTruncated }) {
          if (fieldname == null) return abortWithCode("MISSING_FIELD_NAME");
          if (nameTruncated) return abortWithCode("LIMIT_FIELD_KEY");
          if (valueTruncated) return abortWithCode("LIMIT_FIELD_VALUE", fieldname);
          if (limits && Object.prototype.hasOwnProperty.call(limits, "fieldNameSize")) {
            if (fieldname.length > limits.fieldNameSize) return abortWithCode("LIMIT_FIELD_KEY");
          }
          appendField(req.body, fieldname, value);
        });
        busboy.on("file", function(fieldname, fileStream, { filename, encoding, mimeType }) {
          var pendingWritesIncremented = false;
          fileStream.on("error", function(err) {
            if (pendingWritesIncremented) {
              pendingWrites.decrement();
            }
            abortWithError(err);
          });
          if (fieldname == null) return abortWithCode("MISSING_FIELD_NAME");
          if (!filename) return fileStream.resume();
          if (limits && Object.prototype.hasOwnProperty.call(limits, "fieldNameSize")) {
            if (fieldname.length > limits.fieldNameSize) return abortWithCode("LIMIT_FIELD_KEY");
          }
          var file = {
            fieldname,
            originalname: filename,
            encoding,
            mimetype: mimeType
          };
          var placeholder = appender.insertPlaceholder(file);
          fileFilter(req, file, function(err, includeFile) {
            if (errorOccured) {
              appender.removePlaceholder(placeholder);
              return fileStream.resume();
            }
            if (err) {
              appender.removePlaceholder(placeholder);
              return abortWithError(err);
            }
            if (!includeFile) {
              appender.removePlaceholder(placeholder);
              return fileStream.resume();
            }
            var aborting = false;
            pendingWritesIncremented = true;
            pendingWrites.increment();
            Object.defineProperty(file, "stream", {
              configurable: true,
              enumerable: false,
              value: fileStream
            });
            fileStream.on("limit", function() {
              aborting = true;
              abortWithCode("LIMIT_FILE_SIZE", fieldname);
            });
            storage._handleFile(req, file, function(err2, info) {
              if (aborting) {
                appender.removePlaceholder(placeholder);
                uploadedFiles.push({ ...file, ...info });
                return pendingWrites.decrement();
              }
              if (err2) {
                appender.removePlaceholder(placeholder);
                pendingWrites.decrement();
                return abortWithError(err2);
              }
              var fileInfo = { ...file, ...info };
              appender.replacePlaceholder(placeholder, fileInfo);
              uploadedFiles.push(fileInfo);
              pendingWrites.decrement();
              indicateDone();
            });
          });
        });
        busboy.on("error", function(err) {
          abortWithError(err);
        });
        busboy.on("partsLimit", function() {
          abortWithCode("LIMIT_PART_COUNT");
        });
        busboy.on("filesLimit", function() {
          abortWithCode("LIMIT_FILE_COUNT");
        });
        busboy.on("fieldsLimit", function() {
          abortWithCode("LIMIT_FIELD_COUNT");
        });
        busboy.on("close", function() {
          readFinished = true;
          indicateDone();
        });
        req.pipe(busboy);
      };
    }
    module2.exports = makeMiddleware;
  }
});

// node_modules/multer/storage/disk.js
var require_disk = __commonJS({
  "node_modules/multer/storage/disk.js"(exports2, module2) {
    var fs = require("fs");
    var os = require("os");
    var path = require("path");
    var crypto = require("crypto");
    function getFilename(req, file, cb) {
      crypto.randomBytes(16, function(err, raw) {
        cb(err, err ? void 0 : raw.toString("hex"));
      });
    }
    function getDestination(req, file, cb) {
      cb(null, os.tmpdir());
    }
    function DiskStorage(opts) {
      this.getFilename = opts.filename || getFilename;
      if (typeof opts.destination === "string") {
        fs.mkdirSync(opts.destination, { recursive: true });
        this.getDestination = function($0, $1, cb) {
          cb(null, opts.destination);
        };
      } else {
        this.getDestination = opts.destination || getDestination;
      }
    }
    DiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
      var that = this;
      that.getDestination(req, file, function(err, destination) {
        if (err) return cb(err);
        that.getFilename(req, file, function(err2, filename) {
          if (err2) return cb(err2);
          var finalPath = path.join(destination, filename);
          var outStream = fs.createWriteStream(finalPath);
          file.stream.pipe(outStream);
          outStream.on("error", cb);
          outStream.on("finish", function() {
            cb(null, {
              destination,
              filename,
              path: finalPath,
              size: outStream.bytesWritten
            });
          });
        });
      });
    };
    DiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
      var path2 = file.path;
      delete file.destination;
      delete file.filename;
      delete file.path;
      fs.unlink(path2, cb);
    };
    module2.exports = function(opts) {
      return new DiskStorage(opts);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/stream.js"(exports2, module2) {
    module2.exports = require("stream");
  }
});

// node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports2, module2) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = require("buffer");
    var Buffer2 = _require.Buffer;
    var _require2 = require("util");
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer2.prototype.copy.call(src, target, offset);
    }
    module2.exports = /* @__PURE__ */ (function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0) return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) ret += s + p.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0) return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    })();
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports2, module2) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            process.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose) return;
      if (self2._readableState && !self2._readableState.emitClose) return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
      else stream.emit("error", err);
    }
    module2.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// node_modules/readable-stream/errors.js
var require_errors = __commonJS({
  "node_modules/readable-stream/errors.js"(exports2, module2) {
    "use strict";
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      class NodeError extends Base {
        constructor(arg1, arg2, arg3) {
          super(getMessage(arg1, arg2, arg3));
        }
      }
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i) => String(i));
        if (len > 2) {
          return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        } else if (len === 2) {
          return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        } else {
          return `of ${thing} ${expected[0]}`;
        }
      } else {
        return `of ${thing} ${String(expected)}`;
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      let determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      let msg;
      if (endsWith(name, " argument")) {
        msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
      } else {
        const type = includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
      }
      msg += `. Received type ${typeof actual}`;
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module2.exports.codes = codes;
  }
});

// node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/state.js"(exports2, module2) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module2.exports = {
      getHighWaterMark
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS({
  "node_modules/util-deprecate/node.js"(exports2, module2) {
    module2.exports = require("util").deprecate;
  }
});

// node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "node_modules/readable-stream/lib/_stream_writable.js"(exports2, module2) {
    "use strict";
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_node()
    };
    var Stream = require_stream();
    var Buffer2 = require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits()(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = "buffer";
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== "function") cb = nop;
      if (state.ending) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        process.nextTick(cb, er);
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null) state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending) endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          process.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "node_modules/readable-stream/lib/_stream_duplex.js"(exports2, module2) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) keys2.push(key);
      return keys2;
    };
    module2.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits()(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended) return;
      process.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "node_modules/string_decoder/lib/string_decoder.js"(exports2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports2.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports2, module2) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable) onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module2.exports = eos;
  }
});

// node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports2, module2) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished = require_end_of_stream();
    var kLastResolve = /* @__PURE__ */ Symbol("lastResolve");
    var kLastReject = /* @__PURE__ */ Symbol("lastReject");
    var kError = /* @__PURE__ */ Symbol("error");
    var kEnded = /* @__PURE__ */ Symbol("ended");
    var kLastPromise = /* @__PURE__ */ Symbol("lastPromise");
    var kHandlePromise = /* @__PURE__ */ Symbol("handlePromise");
    var kStream = /* @__PURE__ */ Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      process.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            process.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module2.exports = createReadableStreamAsyncIterator;
  }
});

// node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/from.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var ERR_INVALID_ARG_TYPE = require_errors().codes.ERR_INVALID_ARG_TYPE;
    function from(Readable, iterable, opts) {
      var iterator;
      if (iterable && typeof iterable.next === "function") {
        iterator = iterable;
      } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
      else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
      else throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
      var readable = new Readable(_objectSpread({
        objectMode: true
      }, opts));
      var reading = false;
      readable._read = function() {
        if (!reading) {
          reading = true;
          next();
        }
      };
      function next() {
        return _next2.apply(this, arguments);
      }
      function _next2() {
        _next2 = _asyncToGenerator(function* () {
          try {
            var _yield$iterator$next = yield iterator.next(), value = _yield$iterator$next.value, done = _yield$iterator$next.done;
            if (done) {
              readable.push(null);
            } else if (readable.push(yield value)) {
              next();
            } else {
              reading = false;
            }
          } catch (err) {
            readable.destroy(err);
          }
        });
        return _next2.apply(this, arguments);
      }
      return readable;
    }
    module2.exports = from;
  }
});

// node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "node_modules/readable-stream/lib/_stream_readable.js"(exports2, module2) {
    "use strict";
    module2.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream();
    var Buffer2 = require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = require("util");
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function debug2() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable)) return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "") this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;
      if (n !== n) {
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
      }
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) process.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false) this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) ;
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = /* @__PURE__ */ (function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          })(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n, state) {
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
  }
});

// node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "node_modules/readable-stream/lib/_stream_transform.js"(exports2, module2) {
    "use strict";
    module2.exports = Transform;
    var _require$codes = require_errors().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "node_modules/readable-stream/lib/_stream_passthrough.js"(exports2, module2) {
    "use strict";
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports2, module2) {
    "use strict";
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err) throw err;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0) eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length) return noop;
      if (typeof streams[streams.length - 1] !== "function") return noop;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module2.exports = pipeline;
  }
});

// node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  "node_modules/readable-stream/readable.js"(exports2, module2) {
    var Stream = require("stream");
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module2.exports = Stream.Readable;
      Object.assign(module2.exports, Stream);
      module2.exports.Stream = Stream;
    } else {
      exports2 = module2.exports = require_stream_readable();
      exports2.Stream = Stream || exports2;
      exports2.Readable = exports2;
      exports2.Writable = require_stream_writable();
      exports2.Duplex = require_stream_duplex();
      exports2.Transform = require_stream_transform();
      exports2.PassThrough = require_stream_passthrough();
      exports2.finished = require_end_of_stream();
      exports2.pipeline = require_pipeline();
    }
  }
});

// node_modules/buffer-from/index.js
var require_buffer_from = __commonJS({
  "node_modules/buffer-from/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    var isModern = typeof Buffer !== "undefined" && typeof Buffer.alloc === "function" && typeof Buffer.allocUnsafe === "function" && typeof Buffer.from === "function";
    function isArrayBuffer(input) {
      return toString.call(input).slice(8, -1) === "ArrayBuffer";
    }
    function fromArrayBuffer(obj, byteOffset, length) {
      byteOffset >>>= 0;
      var maxLength = obj.byteLength - byteOffset;
      if (maxLength < 0) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (length === void 0) {
        length = maxLength;
      } else {
        length >>>= 0;
        if (length > maxLength) {
          throw new RangeError("'length' is out of bounds");
        }
      }
      return isModern ? Buffer.from(obj.slice(byteOffset, byteOffset + length)) : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)));
    }
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }
      return isModern ? Buffer.from(string, encoding) : new Buffer(string, encoding);
    }
    function bufferFrom(value, encodingOrOffset, length) {
      if (typeof value === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (isArrayBuffer(value)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      return isModern ? Buffer.from(value) : new Buffer(value);
    }
    module2.exports = bufferFrom;
  }
});

// node_modules/typedarray/index.js
var require_typedarray = __commonJS({
  "node_modules/typedarray/index.js"(exports2) {
    var undefined2 = void 0;
    var MAX_ARRAY_LENGTH = 1e5;
    var ECMAScript = /* @__PURE__ */ (function() {
      var opts = Object.prototype.toString, ophop = Object.prototype.hasOwnProperty;
      return {
        // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
        Class: function(v) {
          return opts.call(v).replace(/^\[object *|\]$/g, "");
        },
        HasProperty: function(o, p) {
          return p in o;
        },
        HasOwnProperty: function(o, p) {
          return ophop.call(o, p);
        },
        IsCallable: function(o) {
          return typeof o === "function";
        },
        ToInt32: function(v) {
          return v >> 0;
        },
        ToUint32: function(v) {
          return v >>> 0;
        }
      };
    })();
    var LN2 = Math.LN2;
    var abs = Math.abs;
    var floor = Math.floor;
    var log = Math.log;
    var min = Math.min;
    var pow = Math.pow;
    var round = Math.round;
    function configureProperties(obj) {
      if (getOwnPropNames && defineProp) {
        var props = getOwnPropNames(obj), i;
        for (i = 0; i < props.length; i += 1) {
          defineProp(obj, props[i], {
            value: obj[props[i]],
            writable: false,
            enumerable: false,
            configurable: false
          });
        }
      }
    }
    var defineProp;
    if (Object.defineProperty && (function() {
      try {
        Object.defineProperty({}, "x", {});
        return true;
      } catch (e) {
        return false;
      }
    })()) {
      defineProp = Object.defineProperty;
    } else {
      defineProp = function(o, p, desc) {
        if (!o === Object(o)) throw new TypeError("Object.defineProperty called on non-object");
        if (ECMAScript.HasProperty(desc, "get") && Object.prototype.__defineGetter__) {
          Object.prototype.__defineGetter__.call(o, p, desc.get);
        }
        if (ECMAScript.HasProperty(desc, "set") && Object.prototype.__defineSetter__) {
          Object.prototype.__defineSetter__.call(o, p, desc.set);
        }
        if (ECMAScript.HasProperty(desc, "value")) {
          o[p] = desc.value;
        }
        return o;
      };
    }
    var getOwnPropNames = Object.getOwnPropertyNames || function(o) {
      if (o !== Object(o)) throw new TypeError("Object.getOwnPropertyNames called on non-object");
      var props = [], p;
      for (p in o) {
        if (ECMAScript.HasOwnProperty(o, p)) {
          props.push(p);
        }
      }
      return props;
    };
    function makeArrayAccessors(obj) {
      if (!defineProp) {
        return;
      }
      if (obj.length > MAX_ARRAY_LENGTH) throw new RangeError("Array too large for polyfill");
      function makeArrayAccessor(index) {
        defineProp(obj, index, {
          "get": function() {
            return obj._getter(index);
          },
          "set": function(v) {
            obj._setter(index, v);
          },
          enumerable: true,
          configurable: false
        });
      }
      var i;
      for (i = 0; i < obj.length; i += 1) {
        makeArrayAccessor(i);
      }
    }
    function as_signed(value, bits) {
      var s = 32 - bits;
      return value << s >> s;
    }
    function as_unsigned(value, bits) {
      var s = 32 - bits;
      return value << s >>> s;
    }
    function packI8(n) {
      return [n & 255];
    }
    function unpackI8(bytes) {
      return as_signed(bytes[0], 8);
    }
    function packU8(n) {
      return [n & 255];
    }
    function unpackU8(bytes) {
      return as_unsigned(bytes[0], 8);
    }
    function packU8Clamped(n) {
      n = round(Number(n));
      return [n < 0 ? 0 : n > 255 ? 255 : n & 255];
    }
    function packI16(n) {
      return [n >> 8 & 255, n & 255];
    }
    function unpackI16(bytes) {
      return as_signed(bytes[0] << 8 | bytes[1], 16);
    }
    function packU16(n) {
      return [n >> 8 & 255, n & 255];
    }
    function unpackU16(bytes) {
      return as_unsigned(bytes[0] << 8 | bytes[1], 16);
    }
    function packI32(n) {
      return [n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255];
    }
    function unpackI32(bytes) {
      return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);
    }
    function packU32(n) {
      return [n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255];
    }
    function unpackU32(bytes) {
      return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);
    }
    function packIEEE754(v, ebits, fbits) {
      var bias = (1 << ebits - 1) - 1, s, e, f, ln, i, bits, str, bytes;
      function roundToEven(n) {
        var w = floor(n), f2 = n - w;
        if (f2 < 0.5)
          return w;
        if (f2 > 0.5)
          return w + 1;
        return w % 2 ? w + 1 : w;
      }
      if (v !== v) {
        e = (1 << ebits) - 1;
        f = pow(2, fbits - 1);
        s = 0;
      } else if (v === Infinity || v === -Infinity) {
        e = (1 << ebits) - 1;
        f = 0;
        s = v < 0 ? 1 : 0;
      } else if (v === 0) {
        e = 0;
        f = 0;
        s = 1 / v === -Infinity ? 1 : 0;
      } else {
        s = v < 0;
        v = abs(v);
        if (v >= pow(2, 1 - bias)) {
          e = min(floor(log(v) / LN2), 1023);
          f = roundToEven(v / pow(2, e) * pow(2, fbits));
          if (f / pow(2, fbits) >= 2) {
            e = e + 1;
            f = 1;
          }
          if (e > bias) {
            e = (1 << ebits) - 1;
            f = 0;
          } else {
            e = e + bias;
            f = f - pow(2, fbits);
          }
        } else {
          e = 0;
          f = roundToEven(v / pow(2, 1 - bias - fbits));
        }
      }
      bits = [];
      for (i = fbits; i; i -= 1) {
        bits.push(f % 2 ? 1 : 0);
        f = floor(f / 2);
      }
      for (i = ebits; i; i -= 1) {
        bits.push(e % 2 ? 1 : 0);
        e = floor(e / 2);
      }
      bits.push(s ? 1 : 0);
      bits.reverse();
      str = bits.join("");
      bytes = [];
      while (str.length) {
        bytes.push(parseInt(str.substring(0, 8), 2));
        str = str.substring(8);
      }
      return bytes;
    }
    function unpackIEEE754(bytes, ebits, fbits) {
      var bits = [], i, j, b, str, bias, s, e, f;
      for (i = bytes.length; i; i -= 1) {
        b = bytes[i - 1];
        for (j = 8; j; j -= 1) {
          bits.push(b % 2 ? 1 : 0);
          b = b >> 1;
        }
      }
      bits.reverse();
      str = bits.join("");
      bias = (1 << ebits - 1) - 1;
      s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
      e = parseInt(str.substring(1, 1 + ebits), 2);
      f = parseInt(str.substring(1 + ebits), 2);
      if (e === (1 << ebits) - 1) {
        return f !== 0 ? NaN : s * Infinity;
      } else if (e > 0) {
        return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
      } else if (f !== 0) {
        return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
      } else {
        return s < 0 ? -0 : 0;
      }
    }
    function unpackF64(b) {
      return unpackIEEE754(b, 11, 52);
    }
    function packF64(v) {
      return packIEEE754(v, 11, 52);
    }
    function unpackF32(b) {
      return unpackIEEE754(b, 8, 23);
    }
    function packF32(v) {
      return packIEEE754(v, 8, 23);
    }
    (function() {
      var ArrayBuffer = function ArrayBuffer2(length) {
        length = ECMAScript.ToInt32(length);
        if (length < 0) throw new RangeError("ArrayBuffer size is not a small enough positive integer");
        this.byteLength = length;
        this._bytes = [];
        this._bytes.length = length;
        var i;
        for (i = 0; i < this.byteLength; i += 1) {
          this._bytes[i] = 0;
        }
        configureProperties(this);
      };
      exports2.ArrayBuffer = exports2.ArrayBuffer || ArrayBuffer;
      var ArrayBufferView = function ArrayBufferView2() {
      };
      function makeConstructor(bytesPerElement, pack, unpack) {
        var ctor;
        ctor = function(buffer, byteOffset, length) {
          var array, sequence, i, s;
          if (!arguments.length || typeof arguments[0] === "number") {
            this.length = ECMAScript.ToInt32(arguments[0]);
            if (length < 0) throw new RangeError("ArrayBufferView size is not a small enough positive integer");
            this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            this.buffer = new ArrayBuffer(this.byteLength);
            this.byteOffset = 0;
          } else if (typeof arguments[0] === "object" && arguments[0].constructor === ctor) {
            array = arguments[0];
            this.length = array.length;
            this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            this.buffer = new ArrayBuffer(this.byteLength);
            this.byteOffset = 0;
            for (i = 0; i < this.length; i += 1) {
              this._setter(i, array._getter(i));
            }
          } else if (typeof arguments[0] === "object" && !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === "ArrayBuffer")) {
            sequence = arguments[0];
            this.length = ECMAScript.ToUint32(sequence.length);
            this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            this.buffer = new ArrayBuffer(this.byteLength);
            this.byteOffset = 0;
            for (i = 0; i < this.length; i += 1) {
              s = sequence[i];
              this._setter(i, Number(s));
            }
          } else if (typeof arguments[0] === "object" && (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === "ArrayBuffer")) {
            this.buffer = buffer;
            this.byteOffset = ECMAScript.ToUint32(byteOffset);
            if (this.byteOffset > this.buffer.byteLength) {
              throw new RangeError("byteOffset out of range");
            }
            if (this.byteOffset % this.BYTES_PER_ELEMENT) {
              throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");
            }
            if (arguments.length < 3) {
              this.byteLength = this.buffer.byteLength - this.byteOffset;
              if (this.byteLength % this.BYTES_PER_ELEMENT) {
                throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");
              }
              this.length = this.byteLength / this.BYTES_PER_ELEMENT;
            } else {
              this.length = ECMAScript.ToUint32(length);
              this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            }
            if (this.byteOffset + this.byteLength > this.buffer.byteLength) {
              throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
            }
          } else {
            throw new TypeError("Unexpected argument type(s)");
          }
          this.constructor = ctor;
          configureProperties(this);
          makeArrayAccessors(this);
        };
        ctor.prototype = new ArrayBufferView();
        ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;
        ctor.prototype._pack = pack;
        ctor.prototype._unpack = unpack;
        ctor.BYTES_PER_ELEMENT = bytesPerElement;
        ctor.prototype._getter = function(index) {
          if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
          index = ECMAScript.ToUint32(index);
          if (index >= this.length) {
            return undefined2;
          }
          var bytes = [], i, o;
          for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {
            bytes.push(this.buffer._bytes[o]);
          }
          return this._unpack(bytes);
        };
        ctor.prototype.get = ctor.prototype._getter;
        ctor.prototype._setter = function(index, value) {
          if (arguments.length < 2) throw new SyntaxError("Not enough arguments");
          index = ECMAScript.ToUint32(index);
          if (index >= this.length) {
            return undefined2;
          }
          var bytes = this._pack(value), i, o;
          for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {
            this.buffer._bytes[o] = bytes[i];
          }
        };
        ctor.prototype.set = function(index, value) {
          if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
          var array, sequence, offset, len, i, s, d, byteOffset, byteLength, tmp;
          if (typeof arguments[0] === "object" && arguments[0].constructor === this.constructor) {
            array = arguments[0];
            offset = ECMAScript.ToUint32(arguments[1]);
            if (offset + array.length > this.length) {
              throw new RangeError("Offset plus length of array is out of range");
            }
            byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
            byteLength = array.length * this.BYTES_PER_ELEMENT;
            if (array.buffer === this.buffer) {
              tmp = [];
              for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
                tmp[i] = array.buffer._bytes[s];
              }
              for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
                this.buffer._bytes[d] = tmp[i];
              }
            } else {
              for (i = 0, s = array.byteOffset, d = byteOffset; i < byteLength; i += 1, s += 1, d += 1) {
                this.buffer._bytes[d] = array.buffer._bytes[s];
              }
            }
          } else if (typeof arguments[0] === "object" && typeof arguments[0].length !== "undefined") {
            sequence = arguments[0];
            len = ECMAScript.ToUint32(sequence.length);
            offset = ECMAScript.ToUint32(arguments[1]);
            if (offset + len > this.length) {
              throw new RangeError("Offset plus length of array is out of range");
            }
            for (i = 0; i < len; i += 1) {
              s = sequence[i];
              this._setter(offset + i, Number(s));
            }
          } else {
            throw new TypeError("Unexpected argument type(s)");
          }
        };
        ctor.prototype.subarray = function(start, end) {
          function clamp(v, min2, max) {
            return v < min2 ? min2 : v > max ? max : v;
          }
          start = ECMAScript.ToInt32(start);
          end = ECMAScript.ToInt32(end);
          if (arguments.length < 1) {
            start = 0;
          }
          if (arguments.length < 2) {
            end = this.length;
          }
          if (start < 0) {
            start = this.length + start;
          }
          if (end < 0) {
            end = this.length + end;
          }
          start = clamp(start, 0, this.length);
          end = clamp(end, 0, this.length);
          var len = end - start;
          if (len < 0) {
            len = 0;
          }
          return new this.constructor(
            this.buffer,
            this.byteOffset + start * this.BYTES_PER_ELEMENT,
            len
          );
        };
        return ctor;
      }
      var Int8Array = makeConstructor(1, packI8, unpackI8);
      var Uint8Array2 = makeConstructor(1, packU8, unpackU8);
      var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);
      var Int16Array = makeConstructor(2, packI16, unpackI16);
      var Uint16Array = makeConstructor(2, packU16, unpackU16);
      var Int32Array = makeConstructor(4, packI32, unpackI32);
      var Uint32Array = makeConstructor(4, packU32, unpackU32);
      var Float32Array = makeConstructor(4, packF32, unpackF32);
      var Float64Array = makeConstructor(8, packF64, unpackF64);
      exports2.Int8Array = exports2.Int8Array || Int8Array;
      exports2.Uint8Array = exports2.Uint8Array || Uint8Array2;
      exports2.Uint8ClampedArray = exports2.Uint8ClampedArray || Uint8ClampedArray;
      exports2.Int16Array = exports2.Int16Array || Int16Array;
      exports2.Uint16Array = exports2.Uint16Array || Uint16Array;
      exports2.Int32Array = exports2.Int32Array || Int32Array;
      exports2.Uint32Array = exports2.Uint32Array || Uint32Array;
      exports2.Float32Array = exports2.Float32Array || Float32Array;
      exports2.Float64Array = exports2.Float64Array || Float64Array;
    })();
    (function() {
      function r(array, index) {
        return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];
      }
      var IS_BIG_ENDIAN = (function() {
        var u16array = new exports2.Uint16Array([4660]), u8array = new exports2.Uint8Array(u16array.buffer);
        return r(u8array, 0) === 18;
      })();
      var DataView = function DataView2(buffer, byteOffset, byteLength) {
        if (arguments.length === 0) {
          buffer = new exports2.ArrayBuffer(0);
        } else if (!(buffer instanceof exports2.ArrayBuffer || ECMAScript.Class(buffer) === "ArrayBuffer")) {
          throw new TypeError("TypeError");
        }
        this.buffer = buffer || new exports2.ArrayBuffer(0);
        this.byteOffset = ECMAScript.ToUint32(byteOffset);
        if (this.byteOffset > this.buffer.byteLength) {
          throw new RangeError("byteOffset out of range");
        }
        if (arguments.length < 3) {
          this.byteLength = this.buffer.byteLength - this.byteOffset;
        } else {
          this.byteLength = ECMAScript.ToUint32(byteLength);
        }
        if (this.byteOffset + this.byteLength > this.buffer.byteLength) {
          throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
        }
        configureProperties(this);
      };
      function makeGetter(arrayType) {
        return function(byteOffset, littleEndian) {
          byteOffset = ECMAScript.ToUint32(byteOffset);
          if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
            throw new RangeError("Array index out of range");
          }
          byteOffset += this.byteOffset;
          var uint8Array = new exports2.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT), bytes = [], i;
          for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
            bytes.push(r(uint8Array, i));
          }
          if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
            bytes.reverse();
          }
          return r(new arrayType(new exports2.Uint8Array(bytes).buffer), 0);
        };
      }
      DataView.prototype.getUint8 = makeGetter(exports2.Uint8Array);
      DataView.prototype.getInt8 = makeGetter(exports2.Int8Array);
      DataView.prototype.getUint16 = makeGetter(exports2.Uint16Array);
      DataView.prototype.getInt16 = makeGetter(exports2.Int16Array);
      DataView.prototype.getUint32 = makeGetter(exports2.Uint32Array);
      DataView.prototype.getInt32 = makeGetter(exports2.Int32Array);
      DataView.prototype.getFloat32 = makeGetter(exports2.Float32Array);
      DataView.prototype.getFloat64 = makeGetter(exports2.Float64Array);
      function makeSetter(arrayType) {
        return function(byteOffset, value, littleEndian) {
          byteOffset = ECMAScript.ToUint32(byteOffset);
          if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
            throw new RangeError("Array index out of range");
          }
          var typeArray = new arrayType([value]), byteArray = new exports2.Uint8Array(typeArray.buffer), bytes = [], i, byteView;
          for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
            bytes.push(r(byteArray, i));
          }
          if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
            bytes.reverse();
          }
          byteView = new exports2.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);
          byteView.set(bytes);
        };
      }
      DataView.prototype.setUint8 = makeSetter(exports2.Uint8Array);
      DataView.prototype.setInt8 = makeSetter(exports2.Int8Array);
      DataView.prototype.setUint16 = makeSetter(exports2.Uint16Array);
      DataView.prototype.setInt16 = makeSetter(exports2.Int16Array);
      DataView.prototype.setUint32 = makeSetter(exports2.Uint32Array);
      DataView.prototype.setInt32 = makeSetter(exports2.Int32Array);
      DataView.prototype.setFloat32 = makeSetter(exports2.Float32Array);
      DataView.prototype.setFloat64 = makeSetter(exports2.Float64Array);
      exports2.DataView = exports2.DataView || DataView;
    })();
  }
});

// node_modules/concat-stream/index.js
var require_concat_stream = __commonJS({
  "node_modules/concat-stream/index.js"(exports2, module2) {
    var Writable = require_readable().Writable;
    var inherits = require_inherits();
    var bufferFrom = require_buffer_from();
    if (typeof Uint8Array === "undefined") {
      U8 = require_typedarray().Uint8Array;
    } else {
      U8 = Uint8Array;
    }
    var U8;
    function ConcatStream(opts, cb) {
      if (!(this instanceof ConcatStream)) return new ConcatStream(opts, cb);
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      if (!opts) opts = {};
      var encoding = opts.encoding;
      var shouldInferEncoding = false;
      if (!encoding) {
        shouldInferEncoding = true;
      } else {
        encoding = String(encoding).toLowerCase();
        if (encoding === "u8" || encoding === "uint8") {
          encoding = "uint8array";
        }
      }
      Writable.call(this, { objectMode: true });
      this.encoding = encoding;
      this.shouldInferEncoding = shouldInferEncoding;
      if (cb) this.on("finish", function() {
        cb(this.getBody());
      });
      this.body = [];
    }
    module2.exports = ConcatStream;
    inherits(ConcatStream, Writable);
    ConcatStream.prototype._write = function(chunk, enc, next) {
      this.body.push(chunk);
      next();
    };
    ConcatStream.prototype.inferEncoding = function(buff) {
      var firstBuffer = buff === void 0 ? this.body[0] : buff;
      if (Buffer.isBuffer(firstBuffer)) return "buffer";
      if (typeof Uint8Array !== "undefined" && firstBuffer instanceof Uint8Array) return "uint8array";
      if (Array.isArray(firstBuffer)) return "array";
      if (typeof firstBuffer === "string") return "string";
      if (Object.prototype.toString.call(firstBuffer) === "[object Object]") return "object";
      return "buffer";
    };
    ConcatStream.prototype.getBody = function() {
      if (!this.encoding && this.body.length === 0) return [];
      if (this.shouldInferEncoding) this.encoding = this.inferEncoding();
      if (this.encoding === "array") return arrayConcat(this.body);
      if (this.encoding === "string") return stringConcat(this.body);
      if (this.encoding === "buffer") return bufferConcat(this.body);
      if (this.encoding === "uint8array") return u8Concat(this.body);
      return this.body;
    };
    function isArrayish(arr) {
      return /Array\]$/.test(Object.prototype.toString.call(arr));
    }
    function isBufferish(p) {
      return typeof p === "string" || isArrayish(p) || p && typeof p.subarray === "function";
    }
    function stringConcat(parts) {
      var strings = [];
      var needsToString = false;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (typeof p === "string") {
          strings.push(p);
        } else if (Buffer.isBuffer(p)) {
          strings.push(p);
        } else if (isBufferish(p)) {
          strings.push(bufferFrom(p));
        } else {
          strings.push(bufferFrom(String(p)));
        }
      }
      if (Buffer.isBuffer(parts[0])) {
        strings = Buffer.concat(strings);
        strings = strings.toString("utf8");
      } else {
        strings = strings.join("");
      }
      return strings;
    }
    function bufferConcat(parts) {
      var bufs = [];
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (Buffer.isBuffer(p)) {
          bufs.push(p);
        } else if (isBufferish(p)) {
          bufs.push(bufferFrom(p));
        } else {
          bufs.push(bufferFrom(String(p)));
        }
      }
      return Buffer.concat(bufs);
    }
    function arrayConcat(parts) {
      var res = [];
      for (var i = 0; i < parts.length; i++) {
        res.push.apply(res, parts[i]);
      }
      return res;
    }
    function u8Concat(parts) {
      var len = 0;
      for (var i = 0; i < parts.length; i++) {
        if (typeof parts[i] === "string") {
          parts[i] = bufferFrom(parts[i]);
        }
        len += parts[i].length;
      }
      var u8 = new U8(len);
      for (var i = 0, offset = 0; i < parts.length; i++) {
        var part = parts[i];
        for (var j = 0; j < part.length; j++) {
          u8[offset++] = part[j];
        }
      }
      return u8;
    }
  }
});

// node_modules/multer/storage/memory.js
var require_memory = __commonJS({
  "node_modules/multer/storage/memory.js"(exports2, module2) {
    var concat = require_concat_stream();
    function MemoryStorage(opts) {
    }
    MemoryStorage.prototype._handleFile = function _handleFile(req, file, cb) {
      file.stream.pipe(concat({ encoding: "buffer" }, function(data) {
        cb(null, {
          buffer: data,
          size: data.length
        });
      }));
    };
    MemoryStorage.prototype._removeFile = function _removeFile(req, file, cb) {
      delete file.buffer;
      cb(null);
    };
    module2.exports = function(opts) {
      return new MemoryStorage(opts);
    };
  }
});

// node_modules/multer/index.js
var require_multer = __commonJS({
  "node_modules/multer/index.js"(exports2, module2) {
    var makeMiddleware = require_make_middleware();
    var diskStorage = require_disk();
    var memoryStorage = require_memory();
    var MulterError = require_multer_error();
    function allowAll(req, file, cb) {
      cb(null, true);
    }
    function Multer(options) {
      if (options.storage) {
        this.storage = options.storage;
      } else if (options.dest) {
        this.storage = diskStorage({ destination: options.dest });
      } else {
        this.storage = memoryStorage();
      }
      this.limits = options.limits;
      this.preservePath = options.preservePath;
      this.defParamCharset = options.defParamCharset || "latin1";
      this.fileFilter = options.fileFilter || allowAll;
    }
    Multer.prototype._makeMiddleware = function(fields, fileStrategy) {
      function setup() {
        var fileFilter = this.fileFilter;
        var filesLeft = /* @__PURE__ */ Object.create(null);
        fields.forEach(function(field) {
          if (typeof field.maxCount === "number") {
            filesLeft[field.name] = field.maxCount;
          } else {
            filesLeft[field.name] = Infinity;
          }
        });
        function wrappedFileFilter(req, file, cb) {
          if ((filesLeft[file.fieldname] || 0) <= 0) {
            return cb(new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
          }
          filesLeft[file.fieldname] -= 1;
          fileFilter(req, file, cb);
        }
        return {
          limits: this.limits,
          preservePath: this.preservePath,
          defParamCharset: this.defParamCharset,
          storage: this.storage,
          fileFilter: wrappedFileFilter,
          fileStrategy
        };
      }
      return makeMiddleware(setup.bind(this));
    };
    Multer.prototype.single = function(name) {
      return this._makeMiddleware([{ name, maxCount: 1 }], "VALUE");
    };
    Multer.prototype.array = function(name, maxCount) {
      return this._makeMiddleware([{ name, maxCount }], "ARRAY");
    };
    Multer.prototype.fields = function(fields) {
      return this._makeMiddleware(fields, "OBJECT");
    };
    Multer.prototype.none = function() {
      return this._makeMiddleware([], "NONE");
    };
    Multer.prototype.any = function() {
      function setup() {
        return {
          limits: this.limits,
          preservePath: this.preservePath,
          defParamCharset: this.defParamCharset,
          storage: this.storage,
          fileFilter: this.fileFilter,
          fileStrategy: "ARRAY"
        };
      }
      return makeMiddleware(setup.bind(this));
    };
    function multer(options) {
      if (options === void 0) {
        return new Multer({});
      }
      if (typeof options === "object" && options !== null) {
        return new Multer(options);
      }
      throw new TypeError("Expected object for argument options");
    }
    module2.exports = multer;
    module2.exports.diskStorage = diskStorage;
    module2.exports.memoryStorage = memoryStorage;
    module2.exports.MulterError = MulterError;
  }
});

// dist/products/dto/product.dto.js
var require_product_dto = __commonJS({
  "dist/products/dto/product.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateProductDto = exports2.CreateProductDto = exports2.ProductOptionGroupDto = exports2.ProductOptionDto = exports2.RecipeItemDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var enums_1 = require_enums();
    var RecipeItemDto = class {
      ingredientProductId;
      quantity;
      unit;
    };
    exports2.RecipeItemDto = RecipeItemDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], RecipeItemDto.prototype, "ingredientProductId", void 0);
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(1e-3),
      __metadata("design:type", Number)
    ], RecipeItemDto.prototype, "quantity", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEnum)(enums_1.StockUnit),
      __metadata("design:type", String)
    ], RecipeItemDto.prototype, "unit", void 0);
    var ProductOptionDto = class {
      name;
      ingredientProductId;
      quantity;
      unit;
      unitCost;
      unitPrice;
    };
    exports2.ProductOptionDto = ProductOptionDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(1),
      __metadata("design:type", String)
    ], ProductOptionDto.prototype, "name", void 0);
    __decorate([
      (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === void 0 || value === "" || value === 0)
          return void 0;
        const n = Number(value);
        return Number.isFinite(n) ? n : void 0;
      }),
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], ProductOptionDto.prototype, "ingredientProductId", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(1e-3),
      __metadata("design:type", Number)
    ], ProductOptionDto.prototype, "quantity", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEnum)(enums_1.StockUnit),
      __metadata("design:type", String)
    ], ProductOptionDto.prototype, "unit", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], ProductOptionDto.prototype, "unitCost", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], ProductOptionDto.prototype, "unitPrice", void 0);
    var ProductOptionGroupDto = class {
      name;
      kind;
      options;
    };
    exports2.ProductOptionGroupDto = ProductOptionGroupDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(1),
      __metadata("design:type", String)
    ], ProductOptionGroupDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsEnum)(enums_1.OptionGroupKind),
      __metadata("design:type", String)
    ], ProductOptionGroupDto.prototype, "kind", void 0);
    __decorate([
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => ProductOptionDto),
      __metadata("design:type", Array)
    ], ProductOptionGroupDto.prototype, "options", void 0);
    var CreateProductDto = class {
      sku;
      name;
      description;
      productType;
      stockUnit;
      baseProductId;
      portionSize;
      scoopCount;
      variableScoops;
      scoopPrices;
      optionGroups;
      salePrice;
      costPrice;
      stock;
      minStock;
      categoryId;
      recipe;
      recipeBatchSize;
      visibleInPos;
    };
    exports2.CreateProductDto = CreateProductDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(1),
      __metadata("design:type", String)
    ], CreateProductDto.prototype, "sku", void 0);
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      __metadata("design:type", String)
    ], CreateProductDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreateProductDto.prototype, "description", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEnum)(enums_1.ProductType),
      __metadata("design:type", String)
    ], CreateProductDto.prototype, "productType", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEnum)(enums_1.StockUnit),
      __metadata("design:type", String)
    ], CreateProductDto.prototype, "stockUnit", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PORTION && !o.optionGroups?.length),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "baseProductId", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PORTION),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(1e-3),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "portionSize", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PORTION && o.optionGroups?.length),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "scoopCount", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PORTION && o.optionGroups?.length),
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], CreateProductDto.prototype, "variableScoops", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PORTION && o.variableScoops),
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsArray)(),
      __metadata("design:type", Array)
    ], CreateProductDto.prototype, "scoopPrices", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PORTION && o.optionGroups?.length || o.productType === enums_1.ProductType.COMPOSITE || o.productType === enums_1.ProductType.SIMPLE && o.optionGroups?.length),
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => ProductOptionGroupDto),
      __metadata("design:type", Array)
    ], CreateProductDto.prototype, "optionGroups", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType !== enums_1.ProductType.BULK && o.productType !== enums_1.ProductType.PREPARED),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "salePrice", void 0);
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "costPrice", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "stock", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "minStock", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "categoryId", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.COMPOSITE || o.productType === enums_1.ProductType.PREPARED),
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => RecipeItemDto),
      __metadata("design:type", Array)
    ], CreateProductDto.prototype, "recipe", void 0);
    __decorate([
      (0, class_validator_1.ValidateIf)((o) => o.productType === enums_1.ProductType.PREPARED),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(1e-3),
      __metadata("design:type", Number)
    ], CreateProductDto.prototype, "recipeBatchSize", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], CreateProductDto.prototype, "visibleInPos", void 0);
    var UpdateProductDto = class {
      sku;
      name;
      description;
      stockUnit;
      baseProductId;
      portionSize;
      salePrice;
      costPrice;
      minStock;
      categoryId;
      scoopCount;
      variableScoops;
      scoopPrices;
      optionGroups;
      active;
      visibleInPos;
      recipe;
      recipeBatchSize;
    };
    exports2.UpdateProductDto = UpdateProductDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateProductDto.prototype, "sku", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateProductDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateProductDto.prototype, "description", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEnum)(enums_1.StockUnit),
      __metadata("design:type", String)
    ], UpdateProductDto.prototype, "stockUnit", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "baseProductId", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(1e-3),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "portionSize", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "salePrice", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "costPrice", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "minStock", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "categoryId", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "scoopCount", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateProductDto.prototype, "variableScoops", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsArray)(),
      __metadata("design:type", Array)
    ], UpdateProductDto.prototype, "scoopPrices", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => ProductOptionGroupDto),
      __metadata("design:type", Array)
    ], UpdateProductDto.prototype, "optionGroups", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateProductDto.prototype, "active", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateProductDto.prototype, "visibleInPos", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => RecipeItemDto),
      __metadata("design:type", Array)
    ], UpdateProductDto.prototype, "recipe", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(1e-3),
      __metadata("design:type", Number)
    ], UpdateProductDto.prototype, "recipeBatchSize", void 0);
  }
});

// dist/products/products.controller.js
var require_products_controller = __commonJS({
  "dist/products/products.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProductsController = void 0;
    var common_1 = require("@nestjs/common");
    var platform_express_1 = require("@nestjs/platform-express");
    var multer_1 = require_multer();
    var products_service_1 = require_products_service();
    var product_dto_1 = require_product_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var IMAGE_UPLOAD = {
      storage: (0, multer_1.memoryStorage)(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
          cb(new common_1.BadRequestException("Solo im\xE1genes JPG, PNG, WEBP o GIF"), false);
          return;
        }
        cb(null, true);
      }
    };
    var ProductsController = class ProductsController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      findForPos(search, categoryId, ctx) {
        return this.service.findForPos(search, categoryId ? +categoryId : void 0, ctx);
      }
      findLowStock(ctx) {
        return this.service.findLowStock(ctx);
      }
      findBulk(ctx) {
        return this.service.findBulkProducts(ctx);
      }
      getImageUrl(id, ctx) {
        return this.service.getImageUrl(id, ctx);
      }
      uploadImage(id, file, ctx) {
        return this.service.uploadImage(id, file, ctx);
      }
      removeImage(id, ctx) {
        return this.service.removeImage(id, ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, ctx) {
        return this.service.create(dto, ctx);
      }
      update(id, dto, ctx) {
        return this.service.update(id, dto, ctx);
      }
      remove(id, ctx) {
        return this.service.remove(id, ctx);
      }
    };
    exports2.ProductsController = ProductsController;
    __decorate([
      (0, common_1.Get)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)("pos"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Query)("search")),
      __param(1, (0, common_1.Query)("categoryId")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object, Object, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findForPos", null);
    __decorate([
      (0, common_1.Get)("low-stock"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findLowStock", null);
    __decorate([
      (0, common_1.Get)("bulk"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findBulk", null);
    __decorate([
      (0, common_1.Get)(":id/image-url"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "getImageUrl", null);
    __decorate([
      (0, common_1.Post)(":id/image"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", IMAGE_UPLOAD)),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.UploadedFile)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "uploadImage", null);
    __decorate([
      (0, common_1.Delete)(":id/image"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "removeImage", null);
    __decorate([
      (0, common_1.Get)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [product_dto_1.CreateProductDto, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "create", null);
    __decorate([
      (0, common_1.Patch)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, product_dto_1.UpdateProductDto, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "update", null);
    __decorate([
      (0, common_1.Delete)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "remove", null);
    exports2.ProductsController = ProductsController = __decorate([
      (0, common_1.Controller)("products"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      __metadata("design:paramtypes", [products_service_1.ProductsService])
    ], ProductsController);
  }
});

// dist/products/products.module.js
var require_products_module = __commonJS({
  "dist/products/products.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProductsModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var product_entity_1 = require_product_entity();
    var product_recipe_entity_1 = require_product_recipe_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var product_option_entity_1 = require_product_option_entity();
    var products_service_1 = require_products_service();
    var products_controller_1 = require_products_controller();
    var ProductsModule = class ProductsModule {
    };
    exports2.ProductsModule = ProductsModule;
    exports2.ProductsModule = ProductsModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, product_recipe_entity_1.ProductRecipe, product_option_group_entity_1.ProductOptionGroup, product_option_entity_1.ProductOption])],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService]
      })
    ], ProductsModule);
  }
});

// dist/customers/customers.service.js
var require_customers_service = __commonJS({
  "dist/customers/customers.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CustomersService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var customer_entity_1 = require_customer_entity();
    var store_context_util_1 = require_store_context_util();
    var CustomersService = class CustomersService {
      repo;
      constructor(repo) {
        this.repo = repo;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async findAll(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, search } = query;
        const qb = this.repo.createQueryBuilder("c").where("c.storeId = :storeId", { storeId }).orderBy("c.name", "ASC").skip((page - 1) * limit).take(limit);
        if (search) {
          qb.andWhere("(c.name LIKE :s OR c.phone LIKE :s OR c.email LIKE :s)", { s: `%${search}%` });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findOne(id, ctx) {
        const customer = await this.repo.findOne({ where: { id } });
        if (!customer)
          throw new common_1.NotFoundException("Cliente no encontrado");
        if (customer.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Cliente no pertenece a esta tienda");
        }
        return customer;
      }
      async create(dto, ctx) {
        const storeId = this.scopeStore(ctx);
        return this.repo.save(this.repo.create({ ...dto, storeId }));
      }
      async update(id, dto, ctx) {
        const customer = await this.findOne(id, ctx);
        Object.assign(customer, dto);
        return this.repo.save(customer);
      }
      async remove(id, ctx) {
        const customer = await this.findOne(id, ctx);
        await this.repo.remove(customer);
        return { message: "Cliente eliminado" };
      }
    };
    exports2.CustomersService = CustomersService;
    exports2.CustomersService = CustomersService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
      __metadata("design:paramtypes", [typeorm_2.Repository])
    ], CustomersService);
  }
});

// dist/customers/dto/customer.dto.js
var require_customer_dto = __commonJS({
  "dist/customers/dto/customer.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateCustomerDto = exports2.CreateCustomerDto = void 0;
    var class_validator_1 = require("class-validator");
    var CreateCustomerDto = class {
      name;
      email;
      phone;
      address;
    };
    exports2.CreateCustomerDto = CreateCustomerDto;
    __decorate([
      (0, class_validator_1.IsString)(),
      (0, class_validator_1.MinLength)(2),
      __metadata("design:type", String)
    ], CreateCustomerDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEmail)(),
      __metadata("design:type", String)
    ], CreateCustomerDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreateCustomerDto.prototype, "phone", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreateCustomerDto.prototype, "address", void 0);
    var UpdateCustomerDto = class {
      name;
      email;
      phone;
      address;
      active;
    };
    exports2.UpdateCustomerDto = UpdateCustomerDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateCustomerDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEmail)(),
      __metadata("design:type", String)
    ], UpdateCustomerDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateCustomerDto.prototype, "phone", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateCustomerDto.prototype, "address", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateCustomerDto.prototype, "active", void 0);
  }
});

// dist/customers/customers.controller.js
var require_customers_controller = __commonJS({
  "dist/customers/customers.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CustomersController = void 0;
    var common_1 = require("@nestjs/common");
    var customers_service_1 = require_customers_service();
    var customer_dto_1 = require_customer_dto();
    var pagination_dto_1 = require_pagination_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var CustomersController = class CustomersController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, ctx) {
        return this.service.create(dto, ctx);
      }
      update(id, dto, ctx) {
        return this.service.update(id, dto, ctx);
      }
      remove(id, ctx) {
        return this.service.remove(id, ctx);
      }
    };
    exports2.CustomersController = CustomersController;
    __decorate([
      (0, common_1.Get)(),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
      __metadata("design:returntype", void 0)
    ], CustomersController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], CustomersController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [customer_dto_1.CreateCustomerDto, Object]),
      __metadata("design:returntype", void 0)
    ], CustomersController.prototype, "create", null);
    __decorate([
      (0, common_1.Patch)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, customer_dto_1.UpdateCustomerDto, Object]),
      __metadata("design:returntype", void 0)
    ], CustomersController.prototype, "update", null);
    __decorate([
      (0, common_1.Delete)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], CustomersController.prototype, "remove", null);
    exports2.CustomersController = CustomersController = __decorate([
      (0, common_1.Controller)("customers"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __metadata("design:paramtypes", [customers_service_1.CustomersService])
    ], CustomersController);
  }
});

// dist/customers/customers.module.js
var require_customers_module = __commonJS({
  "dist/customers/customers.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CustomersModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var customer_entity_1 = require_customer_entity();
    var customers_service_1 = require_customers_service();
    var customers_controller_1 = require_customers_controller();
    var CustomersModule = class CustomersModule {
    };
    exports2.CustomersModule = CustomersModule;
    exports2.CustomersModule = CustomersModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer])],
        controllers: [customers_controller_1.CustomersController],
        providers: [customers_service_1.CustomersService],
        exports: [customers_service_1.CustomersService]
      })
    ], CustomersModule);
  }
});

// dist/suppliers/suppliers.service.js
var require_suppliers_service = __commonJS({
  "dist/suppliers/suppliers.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SuppliersService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var supplier_entity_1 = require_supplier_entity();
    var store_context_util_1 = require_store_context_util();
    var SuppliersService = class SuppliersService {
      repo;
      constructor(repo) {
        this.repo = repo;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async findAll(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, search } = query;
        const where = { storeId };
        if (search)
          where.name = (0, typeorm_2.Like)(`%${search}%`);
        const [data, total] = await this.repo.findAndCount({
          where,
          order: { name: "ASC" },
          skip: (page - 1) * limit,
          take: limit
        });
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findOne(id, ctx) {
        const supplier = await this.repo.findOne({ where: { id } });
        if (!supplier)
          throw new common_1.NotFoundException("Proveedor no encontrado");
        if (supplier.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Proveedor no pertenece a esta tienda");
        }
        return supplier;
      }
      async create(dto, ctx) {
        const storeId = this.scopeStore(ctx);
        return this.repo.save(this.repo.create({ ...dto, storeId }));
      }
      async update(id, dto, ctx) {
        const supplier = await this.findOne(id, ctx);
        Object.assign(supplier, dto);
        return this.repo.save(supplier);
      }
      async remove(id, ctx) {
        const supplier = await this.findOne(id, ctx);
        await this.repo.remove(supplier);
        return { message: "Proveedor eliminado" };
      }
    };
    exports2.SuppliersService = SuppliersService;
    exports2.SuppliersService = SuppliersService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
      __metadata("design:paramtypes", [typeorm_2.Repository])
    ], SuppliersService);
  }
});

// dist/suppliers/dto/supplier.dto.js
var require_supplier_dto = __commonJS({
  "dist/suppliers/dto/supplier.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateSupplierDto = exports2.CreateSupplierDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    function emptyToUndefined({ value }) {
      if (value === "" || value === null)
        return void 0;
      return typeof value === "string" ? value.trim() : value;
    }
    var CreateSupplierDto = class {
      name;
      nit;
      email;
      phone;
      address;
      contact;
    };
    exports2.CreateSupplierDto = CreateSupplierDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], CreateSupplierDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], CreateSupplierDto.prototype, "nit", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEmail)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], CreateSupplierDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], CreateSupplierDto.prototype, "phone", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], CreateSupplierDto.prototype, "address", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], CreateSupplierDto.prototype, "contact", void 0);
    var UpdateSupplierDto = class {
      name;
      nit;
      email;
      phone;
      address;
      contact;
      active;
    };
    exports2.UpdateSupplierDto = UpdateSupplierDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], UpdateSupplierDto.prototype, "name", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], UpdateSupplierDto.prototype, "nit", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsEmail)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], UpdateSupplierDto.prototype, "email", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], UpdateSupplierDto.prototype, "phone", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], UpdateSupplierDto.prototype, "address", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      (0, class_transformer_1.Transform)(emptyToUndefined),
      __metadata("design:type", String)
    ], UpdateSupplierDto.prototype, "contact", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsBoolean)(),
      __metadata("design:type", Boolean)
    ], UpdateSupplierDto.prototype, "active", void 0);
  }
});

// dist/suppliers/suppliers.controller.js
var require_suppliers_controller = __commonJS({
  "dist/suppliers/suppliers.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SuppliersController = void 0;
    var common_1 = require("@nestjs/common");
    var suppliers_service_1 = require_suppliers_service();
    var supplier_dto_1 = require_supplier_dto();
    var pagination_dto_1 = require_pagination_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var SuppliersController = class SuppliersController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, ctx) {
        return this.service.create(dto, ctx);
      }
      update(id, dto, ctx) {
        return this.service.update(id, dto, ctx);
      }
      remove(id, ctx) {
        return this.service.remove(id, ctx);
      }
    };
    exports2.SuppliersController = SuppliersController;
    __decorate([
      (0, common_1.Get)(),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
      __metadata("design:returntype", void 0)
    ], SuppliersController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], SuppliersController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [supplier_dto_1.CreateSupplierDto, Object]),
      __metadata("design:returntype", void 0)
    ], SuppliersController.prototype, "create", null);
    __decorate([
      (0, common_1.Patch)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, supplier_dto_1.UpdateSupplierDto, Object]),
      __metadata("design:returntype", void 0)
    ], SuppliersController.prototype, "update", null);
    __decorate([
      (0, common_1.Delete)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], SuppliersController.prototype, "remove", null);
    exports2.SuppliersController = SuppliersController = __decorate([
      (0, common_1.Controller)("suppliers"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __metadata("design:paramtypes", [suppliers_service_1.SuppliersService])
    ], SuppliersController);
  }
});

// dist/suppliers/suppliers.module.js
var require_suppliers_module = __commonJS({
  "dist/suppliers/suppliers.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SuppliersModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var supplier_entity_1 = require_supplier_entity();
    var suppliers_service_1 = require_suppliers_service();
    var suppliers_controller_1 = require_suppliers_controller();
    var SuppliersModule = class SuppliersModule {
    };
    exports2.SuppliersModule = SuppliersModule;
    exports2.SuppliersModule = SuppliersModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([supplier_entity_1.Supplier])],
        controllers: [suppliers_controller_1.SuppliersController],
        providers: [suppliers_service_1.SuppliersService],
        exports: [suppliers_service_1.SuppliersService]
      })
    ], SuppliersModule);
  }
});

// dist/settings/settings.service.js
var require_settings_service = __commonJS({
  "dist/settings/settings.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SettingsService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var setting_entity_1 = require_setting_entity();
    var store_context_util_1 = require_store_context_util();
    var SettingsService = class SettingsService {
      repo;
      constructor(repo) {
        this.repo = repo;
      }
      async get(storeId) {
        let setting = await this.repo.findOne({ where: { storeId } });
        if (!setting) {
          setting = await this.repo.save(this.repo.create({ storeId, businessName: "Mi Negocio POS", taxRate: 0.19, currency: "COP" }));
        }
        return setting;
      }
      async getForContext(ctx) {
        const storeId = (0, store_context_util_1.requireStoreId)(ctx);
        return this.get(storeId);
      }
      async getTaxRate(storeId) {
        const setting = await this.get(storeId);
        return Number(setting.taxRate);
      }
      async update(dto, ctx) {
        const storeId = (0, store_context_util_1.requireStoreId)(ctx);
        const setting = await this.get(storeId);
        Object.assign(setting, dto);
        return this.repo.save(setting);
      }
    };
    exports2.SettingsService = SettingsService;
    exports2.SettingsService = SettingsService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
      __metadata("design:paramtypes", [typeorm_2.Repository])
    ], SettingsService);
  }
});

// dist/settings/dto/setting.dto.js
var require_setting_dto = __commonJS({
  "dist/settings/dto/setting.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpdateSettingDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var UpdateSettingDto = class {
      businessName;
      address;
      phone;
      taxRate;
      logoUrl;
      currency;
    };
    exports2.UpdateSettingDto = UpdateSettingDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateSettingDto.prototype, "businessName", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateSettingDto.prototype, "address", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateSettingDto.prototype, "phone", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      (0, class_validator_1.Max)(1),
      __metadata("design:type", Number)
    ], UpdateSettingDto.prototype, "taxRate", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateSettingDto.prototype, "logoUrl", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], UpdateSettingDto.prototype, "currency", void 0);
  }
});

// dist/settings/settings.controller.js
var require_settings_controller = __commonJS({
  "dist/settings/settings.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SettingsController = void 0;
    var common_1 = require("@nestjs/common");
    var settings_service_1 = require_settings_service();
    var setting_dto_1 = require_setting_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var SettingsController = class SettingsController {
      service;
      constructor(service) {
        this.service = service;
      }
      get(ctx) {
        return this.service.getForContext(ctx);
      }
      update(dto, ctx) {
        return this.service.update(dto, ctx);
      }
    };
    exports2.SettingsController = SettingsController;
    __decorate([
      (0, common_1.Get)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], SettingsController.prototype, "get", null);
    __decorate([
      (0, common_1.Patch)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [setting_dto_1.UpdateSettingDto, Object]),
      __metadata("design:returntype", void 0)
    ], SettingsController.prototype, "update", null);
    exports2.SettingsController = SettingsController = __decorate([
      (0, common_1.Controller)("settings"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      __metadata("design:paramtypes", [settings_service_1.SettingsService])
    ], SettingsController);
  }
});

// dist/settings/settings.module.js
var require_settings_module = __commonJS({
  "dist/settings/settings.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SettingsModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var setting_entity_1 = require_setting_entity();
    var settings_service_1 = require_settings_service();
    var settings_controller_1 = require_settings_controller();
    var SettingsModule = class SettingsModule {
    };
    exports2.SettingsModule = SettingsModule;
    exports2.SettingsModule = SettingsModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([setting_entity_1.Setting])],
        controllers: [settings_controller_1.SettingsController],
        providers: [settings_service_1.SettingsService],
        exports: [settings_service_1.SettingsService]
      })
    ], SettingsModule);
  }
});

// dist/inventory/inventory.service.js
var require_inventory_service = __commonJS({
  "dist/inventory/inventory.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InventoryService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var product_entity_1 = require_product_entity();
    var enums_1 = require_enums();
    var store_context_util_1 = require_store_context_util();
    var product_stock_util_1 = require_product_stock_util();
    var InventoryService = class InventoryService {
      movementRepo;
      productRepo;
      dataSource;
      constructor(movementRepo, productRepo, dataSource) {
        this.movementRepo = movementRepo;
        this.productRepo = productRepo;
        this.dataSource = dataSource;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async getMovements(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, productId } = query;
        const qb = this.movementRepo.createQueryBuilder("m").leftJoinAndSelect("m.product", "product").leftJoinAndSelect("m.user", "user").where("m.storeId = :storeId", { storeId }).orderBy("m.createdAt", "DESC").skip((page - 1) * limit).take(limit);
        if (productId)
          qb.andWhere("m.productId = :productId", { productId });
        const [data, total] = await qb.getManyAndCount();
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async productionPreview(productId, quantity, ctx) {
        const storeId = this.scopeStore(ctx);
        const product = await this.productRepo.findOne({
          where: { id: productId, storeId },
          relations: ["recipe", "recipe.ingredient"]
        });
        if (!product)
          throw new common_1.NotFoundException("Producto no encontrado");
        if (product.productType !== enums_1.ProductType.PREPARED) {
          throw new common_1.BadRequestException("Solo productos elaborados tienen vista previa de producci\xF3n");
        }
        const plan = await (0, product_stock_util_1.computeProductionDeductions)(this.dataSource.manager, product, quantity, storeId);
        const ingredients = await Promise.all(plan.deductions.map(async (d) => {
          const ingredient = await this.productRepo.findOne({ where: { id: d.productId, storeId } });
          const available = Number(ingredient?.stock ?? 0);
          return {
            productId: d.productId,
            name: d.productName,
            quantity: d.quantity,
            stockUnit: ingredient?.stockUnit ?? "g",
            available,
            sufficient: available >= d.quantity
          };
        }));
        return {
          productId: product.id,
          productName: product.name,
          quantityProduced: quantity,
          recipeBatchSize: Number(product.recipeBatchSize),
          stockUnit: product.stockUnit,
          batches: plan.batches,
          ingredients,
          canProduce: ingredients.every((i) => i.sufficient)
        };
      }
      async adjust(dto, userId, ctx) {
        const storeId = this.scopeStore(ctx);
        if (![enums_1.InventoryMovementType.ADJUSTMENT_IN, enums_1.InventoryMovementType.ADJUSTMENT_OUT].includes(dto.type)) {
          throw new common_1.BadRequestException("Tipo de ajuste inv\xE1lido");
        }
        return this.dataSource.transaction(async (manager) => {
          const product = await manager.findOne(product_entity_1.Product, {
            where: { id: dto.productId, storeId },
            relations: ["recipe", "recipe.ingredient"]
          });
          if (!product)
            throw new common_1.NotFoundException("Producto no encontrado");
          const qty = Number(dto.quantity);
          if (qty <= 0)
            throw new common_1.BadRequestException("Cantidad inv\xE1lida");
          if (product.productType === enums_1.ProductType.PREPARED && dto.type === enums_1.InventoryMovementType.ADJUSTMENT_IN) {
            return this.executeProduction(manager, product, qty, dto.notes, userId, storeId);
          }
          const stockBefore = Number(product.stock);
          let stockAfter;
          if (dto.type === enums_1.InventoryMovementType.ADJUSTMENT_IN) {
            stockAfter = Number((stockBefore + qty).toFixed(3));
          } else {
            if (stockBefore < qty) {
              throw new common_1.BadRequestException("Stock insuficiente para el ajuste");
            }
            stockAfter = Number((stockBefore - qty).toFixed(3));
          }
          product.stock = stockAfter;
          await manager.save(product);
          const movement = manager.create(inventory_movement_entity_1.InventoryMovement, {
            storeId,
            productId: dto.productId,
            type: dto.type,
            quantity: dto.quantity,
            stockBefore,
            stockAfter,
            notes: dto.notes,
            userId,
            reference: `ADJ-${Date.now()}`
          });
          await manager.save(movement);
          return movement;
        });
      }
      async executeProduction(manager, product, quantityProduced, notes, userId, storeId) {
        const plan = await (0, product_stock_util_1.planProductionDeductions)(manager, product, quantityProduced, storeId);
        const reference = `PROD-${Date.now()}`;
        const productionNote = notes?.trim() ? notes.trim() : `Producci\xF3n de ${quantityProduced} ${product.stockUnit}`;
        for (const deduction of plan.deductions) {
          const ingredient = await manager.findOne(product_entity_1.Product, { where: { id: deduction.productId, storeId } });
          if (!ingredient) {
            throw new common_1.BadRequestException(`Ingrediente ${deduction.productName} no encontrado`);
          }
          const stockBefore2 = Number(ingredient.stock);
          const stockAfter2 = Number((stockBefore2 - deduction.quantity).toFixed(3));
          ingredient.stock = stockAfter2;
          await manager.save(ingredient);
          await manager.save(manager.create(inventory_movement_entity_1.InventoryMovement, {
            storeId,
            productId: ingredient.id,
            type: enums_1.InventoryMovementType.ADJUSTMENT_OUT,
            quantity: deduction.quantity,
            stockBefore: stockBefore2,
            stockAfter: stockAfter2,
            notes: `Consumo producci\xF3n: ${product.name}`,
            userId,
            reference
          }));
        }
        const stockBefore = Number(product.stock);
        const stockAfter = Number((stockBefore + quantityProduced).toFixed(3));
        product.stock = stockAfter;
        await manager.save(product);
        const movement = await manager.save(manager.create(inventory_movement_entity_1.InventoryMovement, {
          storeId,
          productId: product.id,
          type: enums_1.InventoryMovementType.PRODUCTION,
          quantity: quantityProduced,
          stockBefore,
          stockAfter,
          notes: productionNote,
          userId,
          reference
        }));
        return movement;
      }
    };
    exports2.InventoryService = InventoryService;
    exports2.InventoryService = InventoryService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(inventory_movement_entity_1.InventoryMovement)),
      __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource
      ])
    ], InventoryService);
  }
});

// dist/inventory/dto/inventory.dto.js
var require_inventory_dto = __commonJS({
  "dist/inventory/dto/inventory.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AdjustInventoryDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var enums_1 = require_enums();
    var AdjustInventoryDto = class {
      productId;
      type;
      quantity;
      notes;
    };
    exports2.AdjustInventoryDto = AdjustInventoryDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], AdjustInventoryDto.prototype, "productId", void 0);
    __decorate([
      (0, class_validator_1.IsEnum)(enums_1.InventoryMovementType),
      __metadata("design:type", String)
    ], AdjustInventoryDto.prototype, "type", void 0);
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], AdjustInventoryDto.prototype, "quantity", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], AdjustInventoryDto.prototype, "notes", void 0);
  }
});

// dist/inventory/inventory.controller.js
var require_inventory_controller = __commonJS({
  "dist/inventory/inventory.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InventoryController = void 0;
    var common_1 = require("@nestjs/common");
    var inventory_service_1 = require_inventory_service();
    var inventory_dto_1 = require_inventory_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var current_user_decorator_1 = require_current_user_decorator();
    var store_context_decorator_1 = require_store_context_decorator();
    var InventoryController = class InventoryController {
      service;
      constructor(service) {
        this.service = service;
      }
      getMovements(query, ctx) {
        return this.service.getMovements(query, ctx);
      }
      productionPreview(productId, quantity, ctx) {
        return this.service.productionPreview(Number(productId), Number(quantity), ctx);
      }
      adjust(dto, userId, ctx) {
        return this.service.adjust(dto, userId, ctx);
      }
    };
    exports2.InventoryController = InventoryController;
    __decorate([
      (0, common_1.Get)("movements"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object, Object]),
      __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "getMovements", null);
    __decorate([
      (0, common_1.Get)("production-preview"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Query)("productId")),
      __param(1, (0, common_1.Query)("quantity")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [String, String, Object]),
      __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "productionPreview", null);
    __decorate([
      (0, common_1.Post)("adjust"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, current_user_decorator_1.CurrentUser)("sub")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [inventory_dto_1.AdjustInventoryDto, Number, Object]),
      __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "adjust", null);
    exports2.InventoryController = InventoryController = __decorate([
      (0, common_1.Controller)("inventory"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      __metadata("design:paramtypes", [inventory_service_1.InventoryService])
    ], InventoryController);
  }
});

// dist/inventory/inventory.module.js
var require_inventory_module = __commonJS({
  "dist/inventory/inventory.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InventoryModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var product_entity_1 = require_product_entity();
    var inventory_service_1 = require_inventory_service();
    var inventory_controller_1 = require_inventory_controller();
    var InventoryModule = class InventoryModule {
    };
    exports2.InventoryModule = InventoryModule;
    exports2.InventoryModule = InventoryModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inventory_movement_entity_1.InventoryMovement, product_entity_1.Product])],
        controllers: [inventory_controller_1.InventoryController],
        providers: [inventory_service_1.InventoryService],
        exports: [inventory_service_1.InventoryService]
      })
    ], InventoryModule);
  }
});

// dist/purchases/purchases.service.js
var require_purchases_service = __commonJS({
  "dist/purchases/purchases.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PurchasesService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var purchase_entity_1 = require_purchase_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var product_entity_1 = require_product_entity();
    var supplier_entity_1 = require_supplier_entity();
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var enums_1 = require_enums();
    var store_context_util_1 = require_store_context_util();
    var PurchasesService = class PurchasesService {
      purchaseRepo;
      dataSource;
      constructor(purchaseRepo, dataSource) {
        this.purchaseRepo = purchaseRepo;
        this.dataSource = dataSource;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async findAll(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, supplierId } = query;
        const where = { storeId };
        if (supplierId)
          where.supplierId = supplierId;
        const [data, total] = await this.purchaseRepo.findAndCount({
          where,
          relations: ["supplier", "user", "items", "items.product"],
          order: { createdAt: "DESC" },
          skip: (page - 1) * limit,
          take: limit
        });
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findOne(id, ctx) {
        const purchase = await this.purchaseRepo.findOne({
          where: { id },
          relations: ["supplier", "user", "items", "items.product"]
        });
        if (!purchase)
          throw new common_1.NotFoundException("Compra no encontrada");
        if (purchase.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Compra no pertenece a esta tienda");
        }
        return purchase;
      }
      async create(dto, userId, ctx) {
        const storeId = this.scopeStore(ctx);
        return this.dataSource.transaction(async (manager) => {
          const supplier = await manager.findOne(supplier_entity_1.Supplier, { where: { id: dto.supplierId, storeId } });
          if (!supplier)
            throw new common_1.NotFoundException("Proveedor no encontrado");
          let total = 0;
          const purchaseItems = [];
          for (const item of dto.items) {
            const product = await manager.findOne(product_entity_1.Product, { where: { id: item.productId, storeId } });
            if (!product)
              throw new common_1.NotFoundException(`Producto ${item.productId} no encontrado`);
            const subtotal = item.quantity * item.unitCost;
            total += subtotal;
            if (![enums_1.ProductType.SIMPLE, enums_1.ProductType.BULK].includes(product.productType)) {
              throw new common_1.BadRequestException(`${product.name} no recibe compras directas`);
            }
            const qty = Number(item.quantity);
            const stockBefore = Number(product.stock);
            const stockAfter = Number((stockBefore + qty).toFixed(3));
            product.stock = stockAfter;
            const currentStock = stockBefore;
            const weightedCost = stockAfter > 0 ? (Number(product.costPrice) * currentStock + item.unitCost * qty) / stockAfter : item.unitCost;
            product.costPrice = Number(weightedCost.toFixed(2));
            await manager.save(product);
            await manager.save(manager.create(inventory_movement_entity_1.InventoryMovement, {
              storeId,
              productId: product.id,
              type: enums_1.InventoryMovementType.PURCHASE,
              quantity: qty,
              stockBefore,
              stockAfter,
              reference: `PUR-${Date.now()}`,
              userId
            }));
            purchaseItems.push(manager.create(purchase_item_entity_1.PurchaseItem, {
              productId: item.productId,
              quantity: item.quantity,
              unitCost: item.unitCost,
              subtotal
            }));
          }
          const purchase = manager.create(purchase_entity_1.Purchase, {
            storeId,
            supplierId: dto.supplierId,
            invoiceNumber: dto.invoiceNumber,
            notes: dto.notes,
            total,
            userId,
            items: purchaseItems
          });
          return manager.save(purchase);
        });
      }
    };
    exports2.PurchasesService = PurchasesService;
    exports2.PurchasesService = PurchasesService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.DataSource
      ])
    ], PurchasesService);
  }
});

// dist/purchases/dto/purchase.dto.js
var require_purchase_dto = __commonJS({
  "dist/purchases/dto/purchase.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreatePurchaseDto = exports2.PurchaseItemDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var PurchaseItemDto = class {
      productId;
      quantity;
      unitCost;
    };
    exports2.PurchaseItemDto = PurchaseItemDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], PurchaseItemDto.prototype, "productId", void 0);
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], PurchaseItemDto.prototype, "quantity", void 0);
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], PurchaseItemDto.prototype, "unitCost", void 0);
    var CreatePurchaseDto = class {
      supplierId;
      invoiceNumber;
      notes;
      items;
    };
    exports2.CreatePurchaseDto = CreatePurchaseDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], CreatePurchaseDto.prototype, "supplierId", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreatePurchaseDto.prototype, "invoiceNumber", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CreatePurchaseDto.prototype, "notes", void 0);
    __decorate([
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ArrayMinSize)(1),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => PurchaseItemDto),
      __metadata("design:type", Array)
    ], CreatePurchaseDto.prototype, "items", void 0);
  }
});

// dist/purchases/dto/purchase-query.dto.js
var require_purchase_query_dto = __commonJS({
  "dist/purchases/dto/purchase-query.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PurchaseQueryDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var pagination_dto_1 = require_pagination_dto();
    var PurchaseQueryDto = class extends pagination_dto_1.PaginationDto {
      supplierId;
    };
    exports2.PurchaseQueryDto = PurchaseQueryDto;
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], PurchaseQueryDto.prototype, "supplierId", void 0);
  }
});

// dist/purchases/purchases.controller.js
var require_purchases_controller = __commonJS({
  "dist/purchases/purchases.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PurchasesController = void 0;
    var common_1 = require("@nestjs/common");
    var purchases_service_1 = require_purchases_service();
    var purchase_dto_1 = require_purchase_dto();
    var purchase_query_dto_1 = require_purchase_query_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var current_user_decorator_1 = require_current_user_decorator();
    var store_context_decorator_1 = require_store_context_decorator();
    var PurchasesController = class PurchasesController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, userId, ctx) {
        return this.service.create(dto, userId, ctx);
      }
    };
    exports2.PurchasesController = PurchasesController;
    __decorate([
      (0, common_1.Get)(),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [purchase_query_dto_1.PurchaseQueryDto, Object]),
      __metadata("design:returntype", void 0)
    ], PurchasesController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], PurchasesController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, current_user_decorator_1.CurrentUser)("sub")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [purchase_dto_1.CreatePurchaseDto, Number, Object]),
      __metadata("design:returntype", void 0)
    ], PurchasesController.prototype, "create", null);
    exports2.PurchasesController = PurchasesController = __decorate([
      (0, common_1.Controller)("purchases"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __metadata("design:paramtypes", [purchases_service_1.PurchasesService])
    ], PurchasesController);
  }
});

// dist/purchases/purchases.module.js
var require_purchases_module = __commonJS({
  "dist/purchases/purchases.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PurchasesModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var purchase_entity_1 = require_purchase_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var purchases_service_1 = require_purchases_service();
    var purchases_controller_1 = require_purchases_controller();
    var PurchasesModule = class PurchasesModule {
    };
    exports2.PurchasesModule = PurchasesModule;
    exports2.PurchasesModule = PurchasesModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([purchase_entity_1.Purchase, purchase_item_entity_1.PurchaseItem])],
        controllers: [purchases_controller_1.PurchasesController],
        providers: [purchases_service_1.PurchasesService]
      })
    ], PurchasesModule);
  }
});

// dist/cash-sessions/cash-sessions.service.js
var require_cash_sessions_service = __commonJS({
  "dist/cash-sessions/cash-sessions.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CashSessionsService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var cash_session_entity_1 = require_cash_session_entity();
    var sale_entity_1 = require_sale_entity();
    var enums_1 = require_enums();
    var store_context_util_1 = require_store_context_util();
    var CashSessionsService = class CashSessionsService {
      repo;
      saleRepo;
      constructor(repo, saleRepo) {
        this.repo = repo;
        this.saleRepo = saleRepo;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      isAdmin(role) {
        return role === enums_1.UserRole.ADMIN || role === enums_1.UserRole.SUPER_ADMIN;
      }
      sanitizeSession(session, role) {
        if (this.isAdmin(role))
          return session;
        const { expectedAmount, difference, ...safe } = session;
        return safe;
      }
      sanitizeSummary(summary, role) {
        if (this.isAdmin(role))
          return summary;
        const { cashTotal, ...safe } = summary;
        return safe;
      }
      async getCurrent(userId, ctx, role) {
        const storeId = this.scopeStore(ctx);
        const session = await this.repo.findOne({
          where: { storeId, userId, status: enums_1.CashSessionStatus.OPEN },
          relations: ["user"]
        });
        if (!session)
          return null;
        const summary = await this.getSessionSummary(session.id);
        return { ...this.sanitizeSession(session, role), summary: this.sanitizeSummary(summary, role) };
      }
      async open(dto, userId, role, ctx) {
        const storeId = this.scopeStore(ctx);
        const existing = await this.repo.findOne({
          where: { storeId, userId, status: enums_1.CashSessionStatus.OPEN }
        });
        if (existing) {
          throw new common_1.BadRequestException("Ya tienes una caja abierta");
        }
        const session = await this.repo.save(this.repo.create({
          openingAmount: dto.openingAmount,
          userId,
          storeId,
          status: enums_1.CashSessionStatus.OPEN
        }));
        const summary = await this.getSessionSummary(session.id);
        return { ...session, summary: this.sanitizeSummary(summary, role) };
      }
      async close(id, dto, userId, role, ctx) {
        const storeId = this.scopeStore(ctx);
        const session = await this.repo.findOne({ where: { id, storeId, userId } });
        if (!session)
          throw new common_1.NotFoundException("Sesi\xF3n de caja no encontrada");
        if (session.status === enums_1.CashSessionStatus.CLOSED) {
          throw new common_1.BadRequestException("La caja ya est\xE1 cerrada");
        }
        const summary = await this.getSessionSummary(id);
        const expectedAmount = Number(session.openingAmount) + summary.cashTotal;
        const difference = dto.closingAmount - expectedAmount;
        session.closingAmount = dto.closingAmount;
        session.expectedAmount = expectedAmount;
        session.difference = difference;
        session.status = enums_1.CashSessionStatus.CLOSED;
        session.closedAt = /* @__PURE__ */ new Date();
        session.notes = dto.notes || session.notes;
        const saved = await this.repo.save(session);
        return this.sanitizeSession(saved, role);
      }
      async findAll(query, userId, role, ctx) {
        const { page = 1, limit = 15 } = query;
        const storeId = this.scopeStore(ctx);
        const isAdmin = role === enums_1.UserRole.ADMIN || role === enums_1.UserRole.SUPER_ADMIN;
        const where = isAdmin ? { storeId } : { storeId, userId };
        const [sessions, total] = await this.repo.findAndCount({
          where,
          relations: ["user"],
          order: { openedAt: "DESC" },
          skip: (page - 1) * limit,
          take: limit
        });
        const data = await Promise.all(sessions.map(async (session) => ({
          ...session,
          summary: await this.getSessionSummary(session.id)
        })));
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findOne(id, userId, role, ctx) {
        const storeId = this.scopeStore(ctx);
        const session = await this.repo.findOne({
          where: { id, storeId },
          relations: ["user"]
        });
        if (!session)
          throw new common_1.NotFoundException("Sesi\xF3n no encontrada");
        const isAdmin = role === enums_1.UserRole.ADMIN || role === enums_1.UserRole.SUPER_ADMIN;
        if (!isAdmin && session.userId !== userId) {
          throw new common_1.ForbiddenException("No tienes acceso a esta sesi\xF3n");
        }
        const summary = await this.getSessionSummary(id);
        const sales = await this.saleRepo.find({
          where: { cashSessionId: id },
          relations: ["customer", "user"],
          order: { createdAt: "DESC" }
        });
        return { session, summary, sales };
      }
      async getSessionSummary(sessionId) {
        const sales = await this.saleRepo.find({ where: { cashSessionId: sessionId } });
        const totalSales = sales.length;
        const totalRevenue = sales.reduce((s, v) => s + Number(v.total), 0);
        const totalProfit = sales.reduce((s, v) => s + Number(v.profit), 0);
        const cashTotal = sales.filter((s) => [enums_1.PaymentMethod.CASH, enums_1.PaymentMethod.MIXED].includes(s.paymentMethod)).reduce((s, v) => s + Number(v.total), 0);
        const cardTotal = sales.filter((s) => s.paymentMethod === enums_1.PaymentMethod.CARD).reduce((s, v) => s + Number(v.total), 0);
        return {
          totalSales,
          totalRevenue: Number(totalRevenue.toFixed(2)),
          totalProfit: Number(totalProfit.toFixed(2)),
          cashTotal: Number(cashTotal.toFixed(2)),
          cardTotal: Number(cardTotal.toFixed(2))
        };
      }
    };
    exports2.CashSessionsService = CashSessionsService;
    exports2.CashSessionsService = CashSessionsService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(cash_session_entity_1.CashSession)),
      __param(1, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.Repository
      ])
    ], CashSessionsService);
  }
});

// dist/cash-sessions/dto/cash-session.dto.js
var require_cash_session_dto = __commonJS({
  "dist/cash-sessions/dto/cash-session.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CloseCashSessionDto = exports2.OpenCashSessionDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var OpenCashSessionDto = class {
      openingAmount;
    };
    exports2.OpenCashSessionDto = OpenCashSessionDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], OpenCashSessionDto.prototype, "openingAmount", void 0);
    var CloseCashSessionDto = class {
      closingAmount;
      notes;
    };
    exports2.CloseCashSessionDto = CloseCashSessionDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], CloseCashSessionDto.prototype, "closingAmount", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsString)(),
      __metadata("design:type", String)
    ], CloseCashSessionDto.prototype, "notes", void 0);
  }
});

// dist/cash-sessions/cash-sessions.controller.js
var require_cash_sessions_controller = __commonJS({
  "dist/cash-sessions/cash-sessions.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CashSessionsController = void 0;
    var common_1 = require("@nestjs/common");
    var cash_sessions_service_1 = require_cash_sessions_service();
    var cash_session_dto_1 = require_cash_session_dto();
    var pagination_dto_1 = require_pagination_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var current_user_decorator_1 = require_current_user_decorator();
    var store_context_decorator_1 = require_store_context_decorator();
    var CashSessionsController = class CashSessionsController {
      service;
      constructor(service) {
        this.service = service;
      }
      getCurrent(user, ctx) {
        return this.service.getCurrent(user.sub, ctx, user.role);
      }
      open(dto, user, ctx) {
        return this.service.open(dto, user.sub, user.role, ctx);
      }
      close(id, dto, user, ctx) {
        return this.service.close(id, dto, user.sub, user.role, ctx);
      }
      findAll(query, user, ctx) {
        return this.service.findAll(query, user.sub, user.role, ctx);
      }
      findOne(id, user, ctx) {
        return this.service.findOne(id, user.sub, user.role, ctx);
      }
    };
    exports2.CashSessionsController = CashSessionsController;
    __decorate([
      (0, common_1.Get)("current"),
      __param(0, (0, current_user_decorator_1.CurrentUser)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object, Object]),
      __metadata("design:returntype", void 0)
    ], CashSessionsController.prototype, "getCurrent", null);
    __decorate([
      (0, common_1.Post)("open"),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, current_user_decorator_1.CurrentUser)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [cash_session_dto_1.OpenCashSessionDto, Object, Object]),
      __metadata("design:returntype", void 0)
    ], CashSessionsController.prototype, "open", null);
    __decorate([
      (0, common_1.Post)(":id/close"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, common_1.Body)()),
      __param(2, (0, current_user_decorator_1.CurrentUser)()),
      __param(3, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, cash_session_dto_1.CloseCashSessionDto, Object, Object]),
      __metadata("design:returntype", void 0)
    ], CashSessionsController.prototype, "close", null);
    __decorate([
      (0, common_1.Get)(),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, current_user_decorator_1.CurrentUser)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object, Object]),
      __metadata("design:returntype", void 0)
    ], CashSessionsController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, current_user_decorator_1.CurrentUser)()),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object, Object]),
      __metadata("design:returntype", void 0)
    ], CashSessionsController.prototype, "findOne", null);
    exports2.CashSessionsController = CashSessionsController = __decorate([
      (0, common_1.Controller)("cash-sessions"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __metadata("design:paramtypes", [cash_sessions_service_1.CashSessionsService])
    ], CashSessionsController);
  }
});

// dist/cash-sessions/cash-sessions.module.js
var require_cash_sessions_module = __commonJS({
  "dist/cash-sessions/cash-sessions.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CashSessionsModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var cash_session_entity_1 = require_cash_session_entity();
    var sale_entity_1 = require_sale_entity();
    var cash_sessions_service_1 = require_cash_sessions_service();
    var cash_sessions_controller_1 = require_cash_sessions_controller();
    var CashSessionsModule = class CashSessionsModule {
    };
    exports2.CashSessionsModule = CashSessionsModule;
    exports2.CashSessionsModule = CashSessionsModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cash_session_entity_1.CashSession, sale_entity_1.Sale])],
        controllers: [cash_sessions_controller_1.CashSessionsController],
        providers: [cash_sessions_service_1.CashSessionsService],
        exports: [cash_sessions_service_1.CashSessionsService]
      })
    ], CashSessionsModule);
  }
});

// dist/common/utils/date.util.js
var require_date_util = __commonJS({
  "dist/common/utils/date.util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.COLOMBIA_TZ = void 0;
    exports2.todayColombia = todayColombia;
    exports2.colombiaDayStart = colombiaDayStart;
    exports2.colombiaDayEnd = colombiaDayEnd;
    exports2.todayRangeColombia = todayRangeColombia;
    exports2.dateRangeColombia = dateRangeColombia;
    exports2.toColombiaDateString = toColombiaDateString;
    exports2.COLOMBIA_TZ = "America/Bogota";
    function todayColombia() {
      return new Intl.DateTimeFormat("en-CA", { timeZone: exports2.COLOMBIA_TZ }).format(/* @__PURE__ */ new Date());
    }
    function colombiaDayStart(dateStr) {
      return /* @__PURE__ */ new Date(`${dateStr}T00:00:00-05:00`);
    }
    function colombiaDayEnd(dateStr) {
      return /* @__PURE__ */ new Date(`${dateStr}T23:59:59.999-05:00`);
    }
    function todayRangeColombia() {
      const today = todayColombia();
      return { start: colombiaDayStart(today), end: colombiaDayEnd(today) };
    }
    function dateRangeColombia(from, to) {
      return { start: colombiaDayStart(from), end: colombiaDayEnd(to) };
    }
    function toColombiaDateString(date) {
      return new Intl.DateTimeFormat("en-CA", { timeZone: exports2.COLOMBIA_TZ }).format(date);
    }
  }
});

// dist/common/utils/tax.util.js
var require_tax_util = __commonJS({
  "dist/common/utils/tax.util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.calculateTaxFromIncludedPrice = calculateTaxFromIncludedPrice;
    exports2.generateTicketNumber = generateTicketNumber;
    var date_util_1 = require_date_util();
    function calculateTaxFromIncludedPrice(totalWithTax, taxRate) {
      const total = Number(totalWithTax.toFixed(2));
      const taxAmount = Number((total - total / (1 + taxRate)).toFixed(2));
      const subtotal = Number((total - taxAmount).toFixed(2));
      return { subtotal, taxAmount, total };
    }
    function generateTicketNumber() {
      const date = (0, date_util_1.todayColombia)().replace(/-/g, "");
      const random = Math.floor(Math.random() * 1e4).toString().padStart(4, "0");
      return `TKT-${date}-${random}`;
    }
  }
});

// dist/sales/sales.service.js
var require_sales_service = __commonJS({
  "dist/sales/sales.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SalesService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var sale_entity_1 = require_sale_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var product_entity_1 = require_product_entity();
    var cash_session_entity_1 = require_cash_session_entity();
    var enums_1 = require_enums();
    var tax_util_1 = require_tax_util();
    var settings_service_1 = require_settings_service();
    var store_context_util_1 = require_store_context_util();
    var date_util_1 = require_date_util();
    var product_stock_util_1 = require_product_stock_util();
    var SalesService = class SalesService {
      saleRepo;
      settingsService;
      dataSource;
      constructor(saleRepo, settingsService, dataSource) {
        this.saleRepo = saleRepo;
        this.settingsService = settingsService;
        this.dataSource = dataSource;
      }
      scopeStore(ctx) {
        return (0, store_context_util_1.requireStoreId)(ctx);
      }
      async findAll(query, ctx) {
        const storeId = this.scopeStore(ctx);
        const { page = 1, limit = 10, from, to } = query;
        const where = { storeId };
        if (from && to) {
          const { start, end } = (0, date_util_1.dateRangeColombia)(from, to);
          where.createdAt = (0, typeorm_2.Between)(start, end);
        }
        const [data, total] = await this.saleRepo.findAndCount({
          where,
          relations: ["customer", "user", "items", "items.product"],
          order: { createdAt: "DESC" },
          skip: (page - 1) * limit,
          take: limit
        });
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
      }
      async findOne(id, ctx) {
        const sale = await this.saleRepo.findOne({
          where: { id },
          relations: ["customer", "user", "items", "items.product", "cashSession"]
        });
        if (!sale)
          throw new common_1.NotFoundException("Venta no encontrada");
        if (sale.storeId !== this.scopeStore(ctx)) {
          throw new common_1.ForbiddenException("Venta no pertenece a esta tienda");
        }
        return sale;
      }
      async getTicket(id, ctx) {
        const sale = await this.findOne(id, ctx);
        const settings = await this.settingsService.get(sale.storeId);
        return { sale, settings };
      }
      async create(dto, userId, ctx) {
        const storeId = this.scopeStore(ctx);
        const taxRate = await this.settingsService.getTaxRate(storeId);
        return this.dataSource.transaction(async (manager) => {
          const cashSession = await manager.findOne(cash_session_entity_1.CashSession, {
            where: { storeId, userId, status: enums_1.CashSessionStatus.OPEN }
          });
          if (!cashSession) {
            throw new common_1.BadRequestException("Debes abrir la caja antes de realizar ventas");
          }
          const saleItems = [];
          let totalWithTax = 0;
          let profit = 0;
          for (const item of dto.items) {
            const product = await manager.findOne(product_entity_1.Product, {
              where: { id: item.productId, storeId },
              relations: [
                "baseProduct",
                "recipe",
                "recipe.ingredient",
                "optionGroups",
                "optionGroups.options",
                "optionGroups.options.ingredient"
              ]
            });
            if (!product || !product.active) {
              throw new common_1.NotFoundException(`Producto ${item.productId} no encontrado`);
            }
            const deductions = await (0, product_stock_util_1.planStockDeductions)(manager, product, item.quantity, storeId, item.selectedOptionIds);
            const reference = `SALE-${Date.now()}-${product.id}`;
            await (0, product_stock_util_1.applyStockDeductions)(manager, deductions, storeId, userId, reference);
            const unitPrice = (0, product_stock_util_1.calculateSaleUnitPrice)(product, item.selectedOptionIds, item.portionScoopCount);
            const unitCost = (0, product_stock_util_1.calculateSaleUnitCost)(product, item.selectedOptionIds, item.portionScoopCount);
            const subtotal2 = unitPrice * item.quantity;
            totalWithTax += subtotal2;
            profit += (unitPrice - unitCost) * item.quantity;
            let productName = product.name;
            let selectedOptions = null;
            const labels = [];
            if (item.portionScoopCount && item.portionScoopCount > 0) {
              labels.push(`${item.portionScoopCount} bola${item.portionScoopCount > 1 ? "s" : ""}`);
            }
            if (item.selectedOptionIds?.length) {
              for (const group of product.optionGroups ?? []) {
                for (const option of group.options ?? []) {
                  if (item.selectedOptionIds.includes(option.id)) {
                    labels.push(option.name);
                  }
                }
              }
            }
            if (labels.length) {
              productName = `${product.name} (${labels.join(", ")})`;
              selectedOptions = {
                optionIds: item.selectedOptionIds ?? [],
                labels
              };
            }
            saleItems.push(manager.create(sale_item_entity_1.SaleItem, {
              productId: product.id,
              productName,
              quantity: item.quantity,
              unitPrice,
              unitCost,
              subtotal: subtotal2,
              selectedOptions
            }));
          }
          const { subtotal, taxAmount, total } = (0, tax_util_1.calculateTaxFromIncludedPrice)(totalWithTax, taxRate);
          let amountPaid = dto.amountPaid ?? total;
          let change = 0;
          if (dto.paymentMethod === enums_1.PaymentMethod.CASH || dto.paymentMethod === enums_1.PaymentMethod.MIXED) {
            if (amountPaid < total) {
              throw new common_1.BadRequestException("El monto pagado es insuficiente");
            }
            change = Number((amountPaid - total).toFixed(2));
          } else {
            amountPaid = total;
          }
          const sale = manager.create(sale_entity_1.Sale, {
            storeId,
            ticketNumber: (0, tax_util_1.generateTicketNumber)(),
            subtotal,
            taxAmount,
            total,
            profit: Number(profit.toFixed(2)),
            paymentMethod: dto.paymentMethod,
            amountPaid,
            change,
            customerId: dto.customerId,
            userId,
            cashSessionId: cashSession.id,
            items: saleItems
          });
          return manager.save(sale);
        });
      }
    };
    exports2.SalesService = SalesService;
    exports2.SalesService = SalesService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        settings_service_1.SettingsService,
        typeorm_2.DataSource
      ])
    ], SalesService);
  }
});

// dist/sales/dto/sale.dto.js
var require_sale_dto = __commonJS({
  "dist/sales/dto/sale.dto.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CreateSaleDto = exports2.SaleItemDto = void 0;
    var class_validator_1 = require("class-validator");
    var class_transformer_1 = require("class-transformer");
    var enums_1 = require_enums();
    var SaleItemDto = class {
      productId;
      quantity;
      selectedOptionIds;
      portionScoopCount;
    };
    exports2.SaleItemDto = SaleItemDto;
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], SaleItemDto.prototype, "productId", void 0);
    __decorate([
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], SaleItemDto.prototype, "quantity", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsArray)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)({ each: true }),
      __metadata("design:type", Array)
    ], SaleItemDto.prototype, "selectedOptionIds", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      (0, class_validator_1.Min)(1),
      __metadata("design:type", Number)
    ], SaleItemDto.prototype, "portionScoopCount", void 0);
    var CreateSaleDto = class {
      items;
      customerId;
      paymentMethod;
      amountPaid;
    };
    exports2.CreateSaleDto = CreateSaleDto;
    __decorate([
      (0, class_validator_1.IsArray)(),
      (0, class_validator_1.ArrayMinSize)(1),
      (0, class_validator_1.ValidateNested)({ each: true }),
      (0, class_transformer_1.Type)(() => SaleItemDto),
      __metadata("design:type", Array)
    ], CreateSaleDto.prototype, "items", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsInt)(),
      __metadata("design:type", Number)
    ], CreateSaleDto.prototype, "customerId", void 0);
    __decorate([
      (0, class_validator_1.IsEnum)(enums_1.PaymentMethod),
      __metadata("design:type", String)
    ], CreateSaleDto.prototype, "paymentMethod", void 0);
    __decorate([
      (0, class_validator_1.IsOptional)(),
      (0, class_transformer_1.Type)(() => Number),
      (0, class_validator_1.IsNumber)(),
      (0, class_validator_1.Min)(0),
      __metadata("design:type", Number)
    ], CreateSaleDto.prototype, "amountPaid", void 0);
  }
});

// dist/sales/sales.controller.js
var require_sales_controller = __commonJS({
  "dist/sales/sales.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SalesController = void 0;
    var common_1 = require("@nestjs/common");
    var sales_service_1 = require_sales_service();
    var sale_dto_1 = require_sale_dto();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var current_user_decorator_1 = require_current_user_decorator();
    var store_context_decorator_1 = require_store_context_decorator();
    var SalesController = class SalesController {
      service;
      constructor(service) {
        this.service = service;
      }
      findAll(query, ctx) {
        return this.service.findAll(query, ctx);
      }
      getTicket(id, ctx) {
        return this.service.getTicket(id, ctx);
      }
      findOne(id, ctx) {
        return this.service.findOne(id, ctx);
      }
      create(dto, userId, ctx) {
        return this.service.create(dto, userId, ctx);
      }
    };
    exports2.SalesController = SalesController;
    __decorate([
      (0, common_1.Get)(),
      __param(0, (0, common_1.Query)()),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object, Object]),
      __metadata("design:returntype", void 0)
    ], SalesController.prototype, "findAll", null);
    __decorate([
      (0, common_1.Get)(":id/ticket"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], SalesController.prototype, "getTicket", null);
    __decorate([
      (0, common_1.Get)(":id"),
      __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
      __param(1, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Number, Object]),
      __metadata("design:returntype", void 0)
    ], SalesController.prototype, "findOne", null);
    __decorate([
      (0, common_1.Post)(),
      __param(0, (0, common_1.Body)()),
      __param(1, (0, current_user_decorator_1.CurrentUser)("sub")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [sale_dto_1.CreateSaleDto, Number, Object]),
      __metadata("design:returntype", void 0)
    ], SalesController.prototype, "create", null);
    exports2.SalesController = SalesController = __decorate([
      (0, common_1.Controller)("sales"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __metadata("design:paramtypes", [sales_service_1.SalesService])
    ], SalesController);
  }
});

// dist/sales/sales.module.js
var require_sales_module = __commonJS({
  "dist/sales/sales.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SalesModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var sale_entity_1 = require_sale_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var sales_service_1 = require_sales_service();
    var sales_controller_1 = require_sales_controller();
    var settings_module_1 = require_settings_module();
    var SalesModule = class SalesModule {
    };
    exports2.SalesModule = SalesModule;
    exports2.SalesModule = SalesModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sale_entity_1.Sale, sale_item_entity_1.SaleItem]), settings_module_1.SettingsModule],
        controllers: [sales_controller_1.SalesController],
        providers: [sales_service_1.SalesService],
        exports: [sales_service_1.SalesService]
      })
    ], SalesModule);
  }
});

// dist/reports/reports.service.js
var require_reports_service = __commonJS({
  "dist/reports/reports.service.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReportsService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var sale_entity_1 = require_sale_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var product_entity_1 = require_product_entity();
    var enums_1 = require_enums();
    var store_context_util_1 = require_store_context_util();
    var date_util_1 = require_date_util();
    var ReportsService = class ReportsService {
      saleRepo;
      saleItemRepo;
      productRepo;
      constructor(saleRepo, saleItemRepo, productRepo) {
        this.saleRepo = saleRepo;
        this.saleItemRepo = saleItemRepo;
        this.productRepo = productRepo;
      }
      async getDashboard(ctx) {
        const { start, end } = (0, date_util_1.todayRangeColombia)();
        const storeId = (0, store_context_util_1.reportStoreId)(ctx);
        const qb = this.saleRepo.createQueryBuilder("s").where("s.createdAt BETWEEN :start AND :end", { start, end });
        if (storeId)
          qb.andWhere("s.storeId = :storeId", { storeId });
        const salesToday = await qb.getMany();
        const totalSales = salesToday.length;
        const revenue = salesToday.reduce((s, v) => s + Number(v.total), 0);
        const profit = salesToday.reduce((s, v) => s + Number(v.profit), 0);
        const topQb = this.saleItemRepo.createQueryBuilder("si").innerJoin("si.sale", "s").select("si.productName", "name").addSelect("SUM(si.quantity)", "quantity").addSelect("SUM(si.subtotal)", "revenue").where("s.createdAt BETWEEN :start AND :end", { start, end });
        if (storeId)
          topQb.andWhere("s.storeId = :storeId", { storeId });
        const topProducts = await topQb.groupBy("si.productName").orderBy("quantity", "DESC").limit(5).getRawMany();
        const lowQb = this.productRepo.createQueryBuilder("p").where("p.active = true").andWhere("p.stock <= p.minStock");
        if (storeId)
          lowQb.andWhere("p.storeId = :storeId", { storeId });
        const lowStock = await lowQb.getCount();
        return {
          totalSales,
          revenue: Number(revenue.toFixed(2)),
          profit: Number(profit.toFixed(2)),
          topProducts,
          lowStockCount: lowStock
        };
      }
      async getSalesReport(from, to, ctx) {
        const storeId = (0, store_context_util_1.reportStoreId)(ctx);
        const { start, end } = (0, date_util_1.dateRangeColombia)(from, to);
        const where = {
          createdAt: (0, typeorm_2.Between)(start, end)
        };
        if (storeId)
          where.storeId = storeId;
        const sales = await this.saleRepo.find({
          where,
          relations: ["user", "customer"],
          order: { createdAt: "DESC" }
        });
        const summary = {
          count: sales.length,
          revenue: sales.reduce((s, v) => s + Number(v.total), 0),
          profit: sales.reduce((s, v) => s + Number(v.profit), 0),
          tax: sales.reduce((s, v) => s + Number(v.taxAmount), 0)
        };
        return { sales, summary };
      }
      async getInventoryReport(ctx) {
        const storeId = (0, store_context_util_1.reportStoreId)(ctx);
        const where = storeId ? { storeId } : {};
        const products = await this.productRepo.find({
          where,
          relations: ["category"],
          order: { name: "ASC" }
        });
        const stockNum = (p) => Number(p.stock ?? 0);
        const stockProducts = products.filter((p) => p.productType === enums_1.ProductType.SIMPLE || p.productType === enums_1.ProductType.BULK);
        const totalValue = stockProducts.reduce((s, p) => s + Number(p.costPrice) * stockNum(p), 0);
        const totalRetail = products.filter((p) => p.productType === enums_1.ProductType.SIMPLE).reduce((s, p) => s + Number(p.salePrice) * stockNum(p), 0);
        return {
          products,
          summary: {
            totalProducts: products.length,
            totalUnits: products.filter((p) => p.productType === enums_1.ProductType.SIMPLE).reduce((s, p) => s + Math.floor(stockNum(p)), 0),
            bulkInsumos: products.filter((p) => p.productType === enums_1.ProductType.BULK && stockNum(p) > 0).length,
            inventoryCost: Number(totalValue.toFixed(2)),
            inventoryRetail: Number(totalRetail.toFixed(2))
          }
        };
      }
      async getProfitabilityReport(from, to, ctx) {
        const storeId = (0, store_context_util_1.reportStoreId)(ctx);
        const { start, end } = (0, date_util_1.dateRangeColombia)(from, to);
        const where = {
          createdAt: (0, typeorm_2.Between)(start, end)
        };
        if (storeId)
          where.storeId = storeId;
        const sales = await this.saleRepo.find({ where });
        const revenue = sales.reduce((s, v) => s + Number(v.total), 0);
        const profit = sales.reduce((s, v) => s + Number(v.profit), 0);
        const cost = revenue - profit;
        return {
          revenue: Number(revenue.toFixed(2)),
          cost: Number(cost.toFixed(2)),
          profit: Number(profit.toFixed(2)),
          margin: revenue > 0 ? Number((profit / revenue * 100).toFixed(2)) : 0,
          salesCount: sales.length
        };
      }
      async getProductsReport(from, to, ctx) {
        const storeId = (0, store_context_util_1.reportStoreId)(ctx);
        const { start, end } = (0, date_util_1.dateRangeColombia)(from, to);
        const qb = this.saleItemRepo.createQueryBuilder("si").innerJoin("si.sale", "s").leftJoin("si.product", "p").leftJoin("p.category", "c").select("si.productId", "productId").addSelect("si.productName", "name").addSelect("COALESCE(c.name, 'Sin categor\xEDa')", "category").addSelect("SUM(si.quantity)", "quantity").addSelect("SUM(si.subtotal)", "revenue").addSelect("SUM(si.quantity * si.unitCost)", "cost").where("s.createdAt BETWEEN :start AND :end", { start, end });
        if (storeId)
          qb.andWhere("s.storeId = :storeId", { storeId });
        const products = await qb.groupBy("si.productId").addGroupBy("si.productName").addGroupBy("c.name").orderBy("revenue", "DESC").getRawMany();
        const items = products.map((p) => {
          const revenue = Number(p.revenue);
          const cost = Number(p.cost);
          const profit = revenue - cost;
          return {
            productId: p.productId,
            name: p.name,
            category: p.category,
            quantity: Number(p.quantity),
            revenue: Number(revenue.toFixed(2)),
            cost: Number(cost.toFixed(2)),
            profit: Number(profit.toFixed(2)),
            margin: revenue > 0 ? Number((profit / revenue * 100).toFixed(1)) : 0
          };
        });
        const summary = {
          totalProducts: items.length,
          totalUnits: items.reduce((s, i) => s + i.quantity, 0),
          revenue: items.reduce((s, i) => s + i.revenue, 0),
          profit: items.reduce((s, i) => s + i.profit, 0)
        };
        return { products: items, summary };
      }
      async getDailySales(from, to, ctx) {
        const storeId = (0, store_context_util_1.reportStoreId)(ctx);
        const { start, end } = (0, date_util_1.dateRangeColombia)(from, to);
        const where = {
          createdAt: (0, typeorm_2.Between)(start, end)
        };
        if (storeId)
          where.storeId = storeId;
        const sales = await this.saleRepo.find({ where, order: { createdAt: "ASC" } });
        const byDay = /* @__PURE__ */ new Map();
        for (const sale of sales) {
          const date = (0, date_util_1.toColombiaDateString)(sale.createdAt);
          const entry = byDay.get(date) || { date, revenue: 0, profit: 0, count: 0 };
          entry.revenue += Number(sale.total);
          entry.profit += Number(sale.profit);
          entry.count += 1;
          byDay.set(date, entry);
        }
        return Array.from(byDay.values()).map((d) => ({
          ...d,
          revenue: Number(d.revenue.toFixed(2)),
          profit: Number(d.profit.toFixed(2))
        }));
      }
    };
    exports2.ReportsService = ReportsService;
    exports2.ReportsService = ReportsService = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
      __param(1, (0, typeorm_1.InjectRepository)(sale_item_entity_1.SaleItem)),
      __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository
      ])
    ], ReportsService);
  }
});

// dist/reports/reports.controller.js
var require_reports_controller = __commonJS({
  "dist/reports/reports.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReportsController = void 0;
    var common_1 = require("@nestjs/common");
    var reports_service_1 = require_reports_service();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var store_context_decorator_1 = require_store_context_decorator();
    var date_util_1 = require_date_util();
    var ReportsController = class ReportsController {
      service;
      constructor(service) {
        this.service = service;
      }
      getDashboard(ctx) {
        return this.service.getDashboard(ctx);
      }
      getSalesReport(from, to, ctx) {
        const today = (0, date_util_1.todayColombia)();
        return this.service.getSalesReport(from || today, to || today, ctx);
      }
      getInventoryReport(ctx) {
        return this.service.getInventoryReport(ctx);
      }
      getProfitabilityReport(from, to, ctx) {
        const today = (0, date_util_1.todayColombia)();
        return this.service.getProfitabilityReport(from || today, to || today, ctx);
      }
      getProductsReport(from, to, ctx) {
        const today = (0, date_util_1.todayColombia)();
        return this.service.getProductsReport(from || today, to || today, ctx);
      }
      getDailySales(from, to, ctx) {
        const today = (0, date_util_1.todayColombia)();
        return this.service.getDailySales(from || today, to || today, ctx);
      }
    };
    exports2.ReportsController = ReportsController;
    __decorate([
      (0, common_1.Get)("dashboard"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], ReportsController.prototype, "getDashboard", null);
    __decorate([
      (0, common_1.Get)("sales"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Query)("from")),
      __param(1, (0, common_1.Query)("to")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [String, String, Object]),
      __metadata("design:returntype", void 0)
    ], ReportsController.prototype, "getSalesReport", null);
    __decorate([
      (0, common_1.Get)("inventory"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [Object]),
      __metadata("design:returntype", void 0)
    ], ReportsController.prototype, "getInventoryReport", null);
    __decorate([
      (0, common_1.Get)("profitability"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN),
      __param(0, (0, common_1.Query)("from")),
      __param(1, (0, common_1.Query)("to")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [String, String, Object]),
      __metadata("design:returntype", void 0)
    ], ReportsController.prototype, "getProfitabilityReport", null);
    __decorate([
      (0, common_1.Get)("products"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Query)("from")),
      __param(1, (0, common_1.Query)("to")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [String, String, Object]),
      __metadata("design:returntype", void 0)
    ], ReportsController.prototype, "getProductsReport", null);
    __decorate([
      (0, common_1.Get)("daily-sales"),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.ADMIN, enums_1.UserRole.CASHIER),
      __param(0, (0, common_1.Query)("from")),
      __param(1, (0, common_1.Query)("to")),
      __param(2, (0, store_context_decorator_1.StoreCtx)()),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [String, String, Object]),
      __metadata("design:returntype", void 0)
    ], ReportsController.prototype, "getDailySales", null);
    exports2.ReportsController = ReportsController = __decorate([
      (0, common_1.Controller)("reports"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      __metadata("design:paramtypes", [reports_service_1.ReportsService])
    ], ReportsController);
  }
});

// dist/reports/reports.module.js
var require_reports_module = __commonJS({
  "dist/reports/reports.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReportsModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var sale_entity_1 = require_sale_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var product_entity_1 = require_product_entity();
    var reports_service_1 = require_reports_service();
    var reports_controller_1 = require_reports_controller();
    var ReportsModule = class ReportsModule {
    };
    exports2.ReportsModule = ReportsModule;
    exports2.ReportsModule = ReportsModule = __decorate([
      (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sale_entity_1.Sale, sale_item_entity_1.SaleItem, product_entity_1.Product])],
        controllers: [reports_controller_1.ReportsController],
        providers: [reports_service_1.ReportsService]
      })
    ], ReportsModule);
  }
});

// dist/seed/demo.data.js
var require_demo_data = __commonJS({
  "dist/seed/demo.data.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.demoPurchases = exports2.demoCashier = exports2.demoStoreAdmin2 = exports2.demoStoreAdmin = exports2.demoStores = exports2.demoSuperAdmin = exports2.demoSuppliers = exports2.demoCustomers = exports2.demoMenuSimpleProductsCali = exports2.demoIceCreamContainersCali = exports2.demoIngredientSimplesCali = exports2.demoBulkProductsCali = exports2.demoCompositeProductsCali = exports2.demoPortionProductsCali = exports2.demoCompositeProducts = exports2.demoMenuSimpleProducts = exports2.demoPortionProducts = exports2.demoIceCreamContainers = exports2.demoIngredientSimples = exports2.demoBulkProducts = exports2.demoProducts = exports2.demoCategories = void 0;
    exports2.demoCategories = [
      { name: "Bebidas", description: "Refrescos, jugos y agua" },
      { name: "Snacks", description: "Botanas y golosinas" },
      { name: "L\xE1cteos", description: "Leche, queso y yogurt" },
      { name: "Limpieza", description: "Productos de limpieza del hogar" },
      { name: "Panader\xEDa", description: "Pan, galletas y pasteles" },
      { name: "Abarrotes", description: "Productos de despensa b\xE1sica" },
      { name: "Helader\xEDa", description: "Helados y postres" },
      { name: "Comida r\xE1pida", description: "Hamburguesas y platos preparados" },
      { name: "Chuzos", description: "Brochetas de pollo, carne y mixtas" }
    ];
    exports2.demoProducts = [
      { sku: "BEB-001", name: "Coca-Cola 600ml", category: "Bebidas", salePrice: 4500, costPrice: 3200, stock: 48, minStock: 10 },
      { sku: "BEB-002", name: "Agua Natural 1L", category: "Bebidas", salePrice: 2500, costPrice: 1800, stock: 60, minStock: 15 },
      { sku: "BEB-003", name: "Jugo Del Valle 1L", category: "Bebidas", salePrice: 6500, costPrice: 4800, stock: 24, minStock: 8 },
      { sku: "BEB-004", name: "Red Bull 250ml", category: "Bebidas", salePrice: 8500, costPrice: 6200, stock: 20, minStock: 5 },
      { sku: "SNK-001", name: "Papas Fritas 45g", category: "Snacks", salePrice: 3500, costPrice: 2400, stock: 36, minStock: 10 },
      { sku: "SNK-002", name: "Nachos Queso 62g", category: "Snacks", salePrice: 4200, costPrice: 2900, stock: 30, minStock: 8 },
      { sku: "SNK-003", name: "Palomitas Mantequilla", category: "Snacks", salePrice: 2800, costPrice: 1800, stock: 25, minStock: 6 },
      { sku: "SNK-004", name: "Chocolate Snickers", category: "Snacks", salePrice: 3200, costPrice: 2200, stock: 40, minStock: 10 },
      { sku: "LAC-001", name: "Leche Entera 1L", category: "L\xE1cteos", salePrice: 5500, costPrice: 3900, stock: 32, minStock: 8 },
      { sku: "LAC-002", name: "Yogurt Fresa", category: "L\xE1cteos", salePrice: 3200, costPrice: 2200, stock: 28, minStock: 6 },
      { sku: "LAC-003", name: "Queso Campesino 400g", category: "L\xE1cteos", salePrice: 18900, costPrice: 14500, stock: 12, minStock: 3 },
      { sku: "LIM-001", name: "Blanqueador 930ml", category: "Limpieza", salePrice: 7200, costPrice: 5200, stock: 18, minStock: 5 },
      { sku: "LIM-002", name: "Desinfectante 828ml", category: "Limpieza", salePrice: 8500, costPrice: 6200, stock: 15, minStock: 4 },
      { sku: "LIM-003", name: "Detergente 1kg", category: "Limpieza", salePrice: 14500, costPrice: 10500, stock: 10, minStock: 3 },
      { sku: "PAN-001", name: "Pan Tajado", category: "Panader\xEDa", salePrice: 9500, costPrice: 6800, stock: 20, minStock: 5 },
      { sku: "PAN-002", name: "Galletas 170g", category: "Panader\xEDa", salePrice: 3200, costPrice: 2200, stock: 35, minStock: 8 },
      { sku: "PAN-003", name: "Ponqu\xE9 Individual", category: "Panader\xEDa", salePrice: 2500, costPrice: 1700, stock: 45, minStock: 10 },
      { sku: "ABA-001", name: "Arroz 1kg", category: "Abarrotes", salePrice: 6500, costPrice: 4800, stock: 40, minStock: 10 },
      { sku: "ABA-002", name: "Frijol 900g", category: "Abarrotes", salePrice: 7200, costPrice: 5200, stock: 30, minStock: 8 },
      { sku: "ABA-003", name: "Aceite 1L", category: "Abarrotes", salePrice: 10800, costPrice: 7800, stock: 22, minStock: 5 },
      { sku: "ABA-004", name: "Az\xFAcar 1kg", category: "Abarrotes", salePrice: 5800, costPrice: 4200, stock: 3, minStock: 5 }
    ];
    exports2.demoBulkProducts = [
      {
        sku: "INS-HEL-001",
        name: "Helado vainilla (insumo)",
        category: "Helader\xEDa",
        description: "Balde de helado \u2014 stock en gramos",
        stock: 1e4,
        minStock: 500,
        costPrice: 12
      },
      {
        sku: "INS-HEL-FRE",
        name: "Helado fresa (insumo)",
        category: "Helader\xEDa",
        description: "Balde de helado de fresa",
        stock: 8e3,
        minStock: 400,
        costPrice: 13
      },
      {
        sku: "INS-HEL-CHO",
        name: "Helado chocolate (insumo)",
        category: "Helader\xEDa",
        description: "Balde de helado de chocolate",
        stock: 8e3,
        minStock: 400,
        costPrice: 14
      },
      {
        sku: "INS-HEL-MEN",
        name: "Helado menta (insumo)",
        category: "Helader\xEDa",
        stock: 6e3,
        minStock: 300,
        costPrice: 13
      },
      {
        sku: "INS-PIN-001",
        name: "Pi\xF1a calada (insumo)",
        category: "Comida r\xE1pida",
        description: "Pi\xF1a en alm\xEDbar para hamburguesas",
        stock: 5e3,
        minStock: 200,
        costPrice: 8
      },
      {
        sku: "INS-CAR-001",
        name: "Carne molida (insumo)",
        category: "Comida r\xE1pida",
        stock: 8e3,
        minStock: 300,
        costPrice: 18
      },
      {
        sku: "INS-QUE-001",
        name: "Queso cheddar (insumo)",
        category: "Comida r\xE1pida",
        stock: 3e3,
        minStock: 150,
        costPrice: 22
      },
      {
        sku: "INS-LEC-001",
        name: "Lechuga picada (insumo)",
        category: "Comida r\xE1pida",
        stock: 2e3,
        minStock: 100,
        costPrice: 6
      },
      {
        sku: "INS-POL-001",
        name: "Pollo marinado (insumo)",
        category: "Comida r\xE1pida",
        description: "Pechuga en cubos para hamburguesas y chuzos",
        stock: 6e3,
        minStock: 250,
        costPrice: 16
      },
      {
        sku: "INS-RES-001",
        name: "Carne en cubos (insumo)",
        category: "Chuzos",
        description: "Res en cubos para brochetas",
        stock: 5e3,
        minStock: 200,
        costPrice: 24
      },
      {
        sku: "INS-TOM-001",
        name: "Tomate (insumo)",
        category: "Comida r\xE1pida",
        stock: 3e3,
        minStock: 150,
        costPrice: 5
      },
      {
        sku: "INS-CEB-001",
        name: "Cebolla (insumo)",
        category: "Comida r\xE1pida",
        stock: 2500,
        minStock: 120,
        costPrice: 4
      },
      {
        sku: "INS-SAL-001",
        name: "Salsa BBQ (insumo)",
        category: "Comida r\xE1pida",
        stock: 2e3,
        minStock: 100,
        costPrice: 7
      },
      {
        sku: "INS-PAP-FRI",
        name: "Papas prefritas (insumo)",
        category: "Comida r\xE1pida",
        stock: 8e3,
        minStock: 300,
        costPrice: 9
      }
    ];
    exports2.demoIngredientSimples = [
      {
        sku: "INS-PAN-001",
        name: "Pan hamburguesa",
        category: "Comida r\xE1pida",
        salePrice: 0,
        costPrice: 800,
        stock: 120,
        minStock: 15
      },
      {
        sku: "INS-PAL-001",
        name: "Palito brocheta",
        category: "Chuzos",
        salePrice: 0,
        costPrice: 150,
        stock: 300,
        minStock: 30
      }
    ];
    exports2.demoIceCreamContainers = [
      {
        sku: "INS-GAL-001",
        name: "Galleta wafer",
        category: "Helader\xEDa",
        salePrice: 0,
        costPrice: 300,
        stock: 200,
        minStock: 20
      },
      {
        sku: "INS-VAS-001",
        name: "Vaso desechable",
        category: "Helader\xEDa",
        salePrice: 0,
        costPrice: 250,
        stock: 150,
        minStock: 15
      }
    ];
    exports2.demoPortionProducts = [
      {
        sku: "POR-HEL-001",
        name: "Helado 1 bola",
        category: "Helader\xEDa",
        description: "Elige sabor y envase al vender",
        scoopCount: 1,
        portionSize: 90,
        salePrice: 4500,
        costPrice: 1080,
        optionGroups: [
          {
            name: "Sabor",
            kind: "flavor",
            options: [
              { name: "Vainilla", ingredientSku: "INS-HEL-001" },
              { name: "Fresa", ingredientSku: "INS-HEL-FRE" },
              { name: "Chocolate", ingredientSku: "INS-HEL-CHO" },
              { name: "Menta", ingredientSku: "INS-HEL-MEN" }
            ]
          },
          {
            name: "Envase",
            kind: "container",
            options: [
              { name: "Galleta", ingredientSku: "INS-GAL-001" },
              { name: "Vaso", ingredientSku: "INS-VAS-001" }
            ]
          }
        ]
      },
      {
        sku: "POR-HEL-002",
        name: "Helado 2 bolas",
        category: "Helader\xEDa",
        description: "Dos bolas \u2014 elige sabor de cada una",
        scoopCount: 2,
        portionSize: 90,
        salePrice: 7500,
        costPrice: 2160,
        optionGroups: [
          {
            name: "Sabor",
            kind: "flavor",
            options: [
              { name: "Vainilla", ingredientSku: "INS-HEL-001" },
              { name: "Fresa", ingredientSku: "INS-HEL-FRE" },
              { name: "Chocolate", ingredientSku: "INS-HEL-CHO" },
              { name: "Menta", ingredientSku: "INS-HEL-MEN" }
            ]
          },
          {
            name: "Envase",
            kind: "container",
            options: [
              { name: "Galleta", ingredientSku: "INS-GAL-001" },
              { name: "Vaso", ingredientSku: "INS-VAS-001" }
            ]
          }
        ]
      },
      {
        sku: "POR-HEL-003",
        name: "Helado 3 bolas",
        category: "Helader\xEDa",
        description: "Tres bolas \u2014 elige sabor de cada una",
        scoopCount: 3,
        portionSize: 90,
        salePrice: 10500,
        costPrice: 3240,
        optionGroups: [
          {
            name: "Sabor",
            kind: "flavor",
            options: [
              { name: "Vainilla", ingredientSku: "INS-HEL-001" },
              { name: "Fresa", ingredientSku: "INS-HEL-FRE" },
              { name: "Chocolate", ingredientSku: "INS-HEL-CHO" },
              { name: "Menta", ingredientSku: "INS-HEL-MEN" }
            ]
          },
          {
            name: "Envase",
            kind: "container",
            options: [
              { name: "Galleta", ingredientSku: "INS-GAL-001" },
              { name: "Vaso", ingredientSku: "INS-VAS-001" }
            ]
          }
        ]
      }
    ];
    exports2.demoMenuSimpleProducts = [
      {
        sku: "MENU-PAP-001",
        name: "Papas fritas medianas",
        category: "Comida r\xE1pida",
        description: "Porci\xF3n individual de papas",
        salePrice: 6500,
        costPrice: 2200,
        stock: 45,
        minStock: 10
      },
      {
        sku: "MENU-LIM-001",
        name: "Limonada natural",
        category: "Bebidas",
        salePrice: 5e3,
        costPrice: 1500,
        stock: 35,
        minStock: 8
      },
      {
        sku: "MENU-ARE-001",
        name: "Arepa con queso",
        category: "Comida r\xE1pida",
        salePrice: 4500,
        costPrice: 2e3,
        stock: 28,
        minStock: 6
      },
      {
        sku: "MENU-SAL-001",
        name: "Salchipapas",
        category: "Comida r\xE1pida",
        salePrice: 12e3,
        costPrice: 4500,
        stock: 22,
        minStock: 5
      },
      {
        sku: "MENU-PER-001",
        name: "Perro caliente sencillo",
        category: "Comida r\xE1pida",
        salePrice: 8500,
        costPrice: 3200,
        stock: 30,
        minStock: 8
      }
    ];
    exports2.demoCompositeProducts = [
      {
        sku: "COM-HAM-001",
        name: "Hamburguesa hawaiana",
        category: "Comida r\xE1pida",
        description: "Carne, pi\xF1a calada, queso y lechuga",
        salePrice: 18500,
        costPrice: 7200,
        recipe: [
          { ingredientSku: "INS-CAR-001", quantity: 120, unit: "g" },
          { ingredientSku: "INS-PIN-001", quantity: 40, unit: "g" },
          { ingredientSku: "INS-PAN-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-QUE-001", quantity: 25, unit: "g" },
          { ingredientSku: "INS-LEC-001", quantity: 15, unit: "g" }
        ]
      },
      {
        sku: "COM-HAM-002",
        name: "Hamburguesa cl\xE1sica",
        category: "Comida r\xE1pida",
        description: "Carne, queso, tomate y lechuga",
        salePrice: 15500,
        costPrice: 5800,
        recipe: [
          { ingredientSku: "INS-CAR-001", quantity: 120, unit: "g" },
          { ingredientSku: "INS-PAN-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-QUE-001", quantity: 20, unit: "g" },
          { ingredientSku: "INS-TOM-001", quantity: 25, unit: "g" },
          { ingredientSku: "INS-LEC-001", quantity: 15, unit: "g" }
        ]
      },
      {
        sku: "COM-HAM-003",
        name: "Hamburguesa doble carne",
        category: "Comida r\xE1pida",
        description: "Doble carne, doble queso",
        salePrice: 22e3,
        costPrice: 9200,
        recipe: [
          { ingredientSku: "INS-CAR-001", quantity: 240, unit: "g" },
          { ingredientSku: "INS-PAN-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-QUE-001", quantity: 40, unit: "g" },
          { ingredientSku: "INS-TOM-001", quantity: 20, unit: "g" },
          { ingredientSku: "INS-LEC-001", quantity: 15, unit: "g" }
        ]
      },
      {
        sku: "COM-HAM-004",
        name: "Hamburguesa de pollo",
        category: "Comida r\xE1pida",
        description: "Pechuga de pollo, lechuga y tomate",
        salePrice: 16500,
        costPrice: 6100,
        recipe: [
          { ingredientSku: "INS-POL-001", quantity: 130, unit: "g" },
          { ingredientSku: "INS-PAN-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-LEC-001", quantity: 15, unit: "g" },
          { ingredientSku: "INS-TOM-001", quantity: 20, unit: "g" },
          { ingredientSku: "INS-SAL-001", quantity: 15, unit: "ml" }
        ]
      },
      {
        sku: "COM-CHU-001",
        name: "Chuzo de pollo",
        category: "Chuzos",
        description: "Brochetas de pollo con tomate, cebolla y salsa",
        salePrice: 12500,
        costPrice: 4200,
        recipe: [
          { ingredientSku: "INS-POL-001", quantity: 150, unit: "g" },
          { ingredientSku: "INS-PAL-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-TOM-001", quantity: 30, unit: "g" },
          { ingredientSku: "INS-CEB-001", quantity: 20, unit: "g" },
          { ingredientSku: "INS-SAL-001", quantity: 10, unit: "ml" }
        ]
      },
      {
        sku: "COM-CHU-002",
        name: "Chuzo de carne",
        category: "Chuzos",
        description: "Brochetas de res con tomate, cebolla y salsa BBQ",
        salePrice: 14500,
        costPrice: 5100,
        recipe: [
          { ingredientSku: "INS-RES-001", quantity: 150, unit: "g" },
          { ingredientSku: "INS-PAL-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-TOM-001", quantity: 30, unit: "g" },
          { ingredientSku: "INS-CEB-001", quantity: 20, unit: "g" },
          { ingredientSku: "INS-SAL-001", quantity: 10, unit: "ml" }
        ]
      },
      {
        sku: "COM-CHU-003",
        name: "Chuzo mixto",
        category: "Chuzos",
        description: "Pollo y carne en la misma brocheta",
        salePrice: 15500,
        costPrice: 5500,
        recipe: [
          { ingredientSku: "INS-POL-001", quantity: 80, unit: "g" },
          { ingredientSku: "INS-RES-001", quantity: 80, unit: "g" },
          { ingredientSku: "INS-PAL-001", quantity: 1, unit: "unit" },
          { ingredientSku: "INS-TOM-001", quantity: 25, unit: "g" },
          { ingredientSku: "INS-CEB-001", quantity: 15, unit: "g" },
          { ingredientSku: "INS-SAL-001", quantity: 10, unit: "ml" }
        ]
      },
      {
        sku: "COM-PAP-001",
        name: "Papas fritas porci\xF3n",
        category: "Comida r\xE1pida",
        description: "Porci\xF3n preparada desde insumo de papas",
        salePrice: 6500,
        costPrice: 1800,
        recipe: [
          { ingredientSku: "INS-PAP-FRI", quantity: 200, unit: "g" },
          { ingredientSku: "INS-SAL-001", quantity: 5, unit: "ml" }
        ]
      }
    ];
    exports2.demoPortionProductsCali = exports2.demoPortionProducts.filter((p) => p.sku === "POR-HEL-001");
    exports2.demoCompositeProductsCali = exports2.demoCompositeProducts.filter((p) => ["COM-HAM-001", "COM-HAM-002", "COM-CHU-001", "COM-CHU-002"].includes(p.sku));
    exports2.demoBulkProductsCali = exports2.demoBulkProducts.filter((b) => [
      "INS-HEL-001",
      "INS-HEL-FRE",
      "INS-HEL-CHO",
      "INS-CAR-001",
      "INS-POL-001",
      "INS-RES-001",
      "INS-PIN-001",
      "INS-QUE-001",
      "INS-LEC-001",
      "INS-TOM-001",
      "INS-CEB-001",
      "INS-SAL-001"
    ].includes(b.sku));
    exports2.demoIngredientSimplesCali = exports2.demoIngredientSimples;
    exports2.demoIceCreamContainersCali = exports2.demoIceCreamContainers;
    exports2.demoMenuSimpleProductsCali = exports2.demoMenuSimpleProducts.filter((p) => ["MENU-PAP-001", "MENU-LIM-001"].includes(p.sku));
    exports2.demoCustomers = [
      { name: "Mar\xEDa Gonz\xE1lez", email: "maria@email.com", phone: "300-1234567", address: "Calle 45 #12-34, Bogot\xE1" },
      { name: "Carlos Ruiz", email: "carlos@email.com", phone: "310-5678901", address: "Carrera 7 #80-15, Bogot\xE1" },
      { name: "Ana Mart\xEDnez", phone: "320-9012345", address: "Av. El Dorado 69-76, Bogot\xE1" },
      { name: "Jos\xE9 Hern\xE1ndez", email: "jose@email.com", phone: "315-3456789" },
      { name: "Laura S\xE1nchez", phone: "318-7890123", address: "Calle 100 #19-52, Bogot\xE1" }
    ];
    exports2.demoSuppliers = [
      { name: "Distribuidora Andina SAS", email: "ventas@andina.com", phone: "601-1000100", contact: "Roberto D\xEDaz", address: "Zona Industrial Fontib\xF3n, Bogot\xE1" },
      { name: "Comercial del Valle", email: "pedidos@valle.com", phone: "602-2000200", contact: "Patricia L\xF3pez", address: "Calle 15 #23-45, Cali" },
      { name: "Alimentos del Caribe", email: "b2b@caribe.com", phone: "605-3000300", contact: "Gerente Ventas", address: "Av. Circunvalar, Cartagena" }
    ];
    exports2.demoSuperAdmin = {
      name: "Super Administrador",
      email: "super@pos.local",
      password: "super123"
    };
    exports2.demoStores = [
      {
        code: "bogota",
        name: "Tienda Demo Bogot\xE1",
        address: "Calle 72 #10-34, Bogot\xE1",
        phone: "601-5550100"
      },
      {
        code: "cali",
        name: "Tienda Demo Cali",
        address: "Calle 15 #23-45, Cali",
        phone: "602-5550200"
      }
    ];
    exports2.demoStoreAdmin = {
      name: "Administrador Bogot\xE1",
      email: "admin@pos.local",
      password: "admin123",
      storeCode: "bogota"
    };
    exports2.demoStoreAdmin2 = {
      name: "Administrador Cali",
      email: "admin2@pos.local",
      password: "admin123",
      storeCode: "cali"
    };
    exports2.demoCashier = {
      name: "Juan Cajero",
      email: "cajero@pos.local",
      password: "cajero123",
      storeCode: "bogota"
    };
    exports2.demoPurchases = [
      {
        supplier: "Distribuidora Andina SAS",
        invoiceNumber: "FEV-10234",
        notes: "Pedido semanal de bebidas",
        daysAgo: 12,
        items: [
          { sku: "BEB-001", quantity: 24, unitCost: 3200 },
          { sku: "BEB-002", quantity: 30, unitCost: 1800 },
          { sku: "BEB-003", quantity: 12, unitCost: 4800 }
        ]
      },
      {
        supplier: "Distribuidora Andina SAS",
        invoiceNumber: "FEV-10456",
        notes: "Reposici\xF3n Red Bull",
        daysAgo: 3,
        items: [
          { sku: "BEB-004", quantity: 15, unitCost: 6200 }
        ]
      },
      {
        supplier: "Comercial del Valle",
        invoiceNumber: "CDV-8891",
        notes: "Snacks y l\xE1cteos",
        daysAgo: 8,
        items: [
          { sku: "SNK-001", quantity: 20, unitCost: 2400 },
          { sku: "SNK-002", quantity: 18, unitCost: 2900 },
          { sku: "LAC-001", quantity: 16, unitCost: 3900 },
          { sku: "LAC-002", quantity: 12, unitCost: 2200 }
        ]
      },
      {
        supplier: "Comercial del Valle",
        invoiceNumber: "CDV-9012",
        notes: "Panader\xEDa",
        daysAgo: 5,
        items: [
          { sku: "PAN-001", quantity: 10, unitCost: 6800 },
          { sku: "PAN-002", quantity: 20, unitCost: 2200 },
          { sku: "PAN-003", quantity: 25, unitCost: 1700 }
        ]
      },
      {
        supplier: "Alimentos del Caribe",
        invoiceNumber: "ADC-5501",
        notes: "Abarrotes y limpieza",
        daysAgo: 15,
        items: [
          { sku: "ABA-001", quantity: 20, unitCost: 4800 },
          { sku: "ABA-002", quantity: 15, unitCost: 5200 },
          { sku: "ABA-003", quantity: 10, unitCost: 7800 },
          { sku: "LIM-001", quantity: 8, unitCost: 5200 },
          { sku: "LIM-003", quantity: 6, unitCost: 10500 }
        ]
      },
      {
        supplier: "Alimentos del Caribe",
        invoiceNumber: "ADC-5620",
        notes: "Queso y az\xFAcar",
        daysAgo: 2,
        items: [
          { sku: "LAC-003", quantity: 8, unitCost: 14500 },
          { sku: "ABA-004", quantity: 12, unitCost: 4200 }
        ]
      },
      {
        supplier: "Comercial del Valle",
        invoiceNumber: "CDV-HEL01",
        notes: "Insumo helado vainilla (5 kg)",
        daysAgo: 4,
        items: [{ sku: "INS-HEL-001", quantity: 5e3, unitCost: 12 }]
      },
      {
        supplier: "Comercial del Valle",
        invoiceNumber: "CDV-HAM01",
        notes: "Insumos hamburguesa hawaiana",
        daysAgo: 6,
        items: [
          { sku: "INS-CAR-001", quantity: 3e3, unitCost: 18 },
          { sku: "INS-PIN-001", quantity: 2e3, unitCost: 8 },
          { sku: "INS-PAN-001", quantity: 40, unitCost: 800 }
        ]
      },
      {
        supplier: "Comercial del Valle",
        invoiceNumber: "CDV-CHU01",
        notes: "Insumos chuzos y brochetas",
        daysAgo: 5,
        items: [
          { sku: "INS-POL-001", quantity: 2500, unitCost: 16 },
          { sku: "INS-RES-001", quantity: 2e3, unitCost: 24 },
          { sku: "INS-PAL-001", quantity: 100, unitCost: 150 },
          { sku: "INS-TOM-001", quantity: 1500, unitCost: 5 },
          { sku: "INS-CEB-001", quantity: 1200, unitCost: 4 }
        ]
      },
      {
        supplier: "Comercial del Valle",
        invoiceNumber: "CDV-HEL02",
        notes: "Reposici\xF3n helados fresa, chocolate y menta",
        daysAgo: 3,
        items: [
          { sku: "INS-HEL-FRE", quantity: 3e3, unitCost: 13 },
          { sku: "INS-HEL-CHO", quantity: 3e3, unitCost: 14 },
          { sku: "INS-HEL-MEN", quantity: 2e3, unitCost: 13 },
          { sku: "INS-GAL-001", quantity: 80, unitCost: 300 },
          { sku: "INS-VAS-001", quantity: 60, unitCost: 250 }
        ]
      }
    ];
  }
});

// dist/seed/seed.service.js
var require_seed_service = __commonJS({
  "dist/seed/seed.service.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    var SeedService_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeedService = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var typeorm_2 = require("typeorm");
    var bcrypt = __importStar(require("bcryptjs"));
    var user_entity_1 = require_user_entity();
    var setting_entity_1 = require_setting_entity();
    var store_entity_1 = require_store_entity();
    var category_entity_1 = require_category_entity();
    var product_entity_1 = require_product_entity();
    var customer_entity_1 = require_customer_entity();
    var supplier_entity_1 = require_supplier_entity();
    var purchase_entity_1 = require_purchase_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var product_option_entity_1 = require_product_option_entity();
    var enums_1 = require_enums();
    var demo_data_1 = require_demo_data();
    function getSeedMenuSkipStoreCodes() {
      const codes = /* @__PURE__ */ new Set(["flor-de-luna"]);
      const fromEnv = process.env.SEED_SKIP_STORES?.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      if (fromEnv?.length)
        fromEnv.forEach((c) => codes.add(c));
      return codes;
    }
    var SeedService = SeedService_1 = class SeedService {
      usersRepo;
      settingsRepo;
      storesRepo;
      categoriesRepo;
      productsRepo;
      customersRepo;
      suppliersRepo;
      purchasesRepo;
      purchaseItemsRepo;
      dataSource;
      logger = new common_1.Logger(SeedService_1.name);
      constructor(usersRepo, settingsRepo, storesRepo, categoriesRepo, productsRepo, customersRepo, suppliersRepo, purchasesRepo, purchaseItemsRepo, dataSource) {
        this.usersRepo = usersRepo;
        this.settingsRepo = settingsRepo;
        this.storesRepo = storesRepo;
        this.categoriesRepo = categoriesRepo;
        this.productsRepo = productsRepo;
        this.customersRepo = customersRepo;
        this.suppliersRepo = suppliersRepo;
        this.purchasesRepo = purchasesRepo;
        this.purchaseItemsRepo = purchaseItemsRepo;
        this.dataSource = dataSource;
      }
      async onModuleInit() {
        if (process.env.VERCEL || process.env.SKIP_SEED === "1")
          return;
        await this.seedSuperAdmin();
        await this.seedDemo();
        await this.seedMenuProductsAllStores();
      }
      async seedSuperAdmin() {
        const exists = await this.usersRepo.findOne({ where: { email: demo_data_1.demoSuperAdmin.email } });
        if (!exists) {
          const hash = await bcrypt.hash(demo_data_1.demoSuperAdmin.password, 10);
          await this.usersRepo.save(this.usersRepo.create({
            name: demo_data_1.demoSuperAdmin.name,
            email: demo_data_1.demoSuperAdmin.email,
            passwordHash: hash,
            role: enums_1.UserRole.SUPER_ADMIN,
            storeId: null,
            active: true
          }));
          this.logger.log("Super admin creado: super@pos.local / super123");
        }
      }
      async seedDemo(force = false) {
        const productCount = await this.productsRepo.count();
        if (productCount > 0 && !force) {
          this.logger.log("Demo data already exists, skipping seed");
          return;
        }
        if (force && productCount > 0) {
          await this.clearDemoData();
        }
        this.logger.log("Seeding multitienda demo data...");
        const storeMap = /* @__PURE__ */ new Map();
        for (const s of demo_data_1.demoStores) {
          let store = await this.storesRepo.findOne({ where: { code: s.code } });
          if (!store) {
            store = await this.storesRepo.save(this.storesRepo.create(s));
            await this.settingsRepo.save(this.settingsRepo.create({
              storeId: store.id,
              businessName: s.name,
              address: s.address,
              phone: s.phone,
              taxRate: 0.19,
              currency: "COP"
            }));
          }
          storeMap.set(s.code, store.id);
        }
        await this.seedUser(demo_data_1.demoStoreAdmin, enums_1.UserRole.ADMIN, storeMap.get(demo_data_1.demoStoreAdmin.storeCode));
        await this.seedUser(demo_data_1.demoStoreAdmin2, enums_1.UserRole.ADMIN, storeMap.get(demo_data_1.demoStoreAdmin2.storeCode));
        await this.seedUser(demo_data_1.demoCashier, enums_1.UserRole.CASHIER, storeMap.get(demo_data_1.demoCashier.storeCode));
        for (const [code, storeId] of storeMap) {
          await this.seedStoreCatalog(storeId, code === "cali");
        }
        await this.seedPurchases(storeMap.get("bogota"));
        this.logger.log("Multitienda demo seeded successfully");
      }
      async seedUser(demo, role, storeId) {
        const exists = await this.usersRepo.findOne({ where: { email: demo.email } });
        if (exists) {
          if (!exists.storeId) {
            exists.storeId = storeId;
            exists.role = role;
            await this.usersRepo.save(exists);
          }
          return;
        }
        const hash = await bcrypt.hash(demo.password, 10);
        await this.usersRepo.save(this.usersRepo.create({
          name: demo.name,
          email: demo.email,
          passwordHash: hash,
          role,
          storeId,
          active: true
        }));
      }
      async seedStoreCatalog(storeId, caliSubset = false) {
        const existing = await this.productsRepo.count({ where: { storeId } });
        if (existing > 0)
          return;
        const categoryMap = /* @__PURE__ */ new Map();
        for (const cat of demo_data_1.demoCategories) {
          const saved = await this.categoriesRepo.save(this.categoriesRepo.create({ ...cat, storeId }));
          categoryMap.set(cat.name, saved.id);
        }
        const products = caliSubset ? demo_data_1.demoProducts.slice(0, 10) : demo_data_1.demoProducts;
        for (const prod of products) {
          await this.productsRepo.save(this.productsRepo.create({
            sku: prod.sku,
            name: prod.name,
            salePrice: prod.salePrice,
            costPrice: prod.costPrice,
            stock: prod.stock,
            minStock: prod.minStock,
            categoryId: categoryMap.get(prod.category),
            storeId,
            productType: enums_1.ProductType.SIMPLE,
            stockUnit: enums_1.StockUnit.UNIT,
            active: true
          }));
        }
        await this.seedMenuProducts(storeId, categoryMap, caliSubset);
        const customers = caliSubset ? demo_data_1.demoCustomers.slice(0, 2) : demo_data_1.demoCustomers;
        for (const cust of customers) {
          await this.customersRepo.save(this.customersRepo.create({ ...cust, storeId }));
        }
        for (const sup of demo_data_1.demoSuppliers) {
          await this.suppliersRepo.save(this.suppliersRepo.create({ ...sup, storeId }));
        }
      }
      async seedMenuProductsAllStores() {
        const stores = await this.storesRepo.find({ where: { active: true } });
        const skipStores = getSeedMenuSkipStoreCodes();
        for (const store of stores) {
          if (skipStores.has(store.code.toLowerCase())) {
            this.logger.log(`Seed men\xFA omitido para ${store.name} (${store.code})`);
            continue;
          }
          const categoryMap = await this.ensureCategoryMap(store.id);
          const isCali = store.code === "cali";
          await this.seedMenuProducts(store.id, categoryMap, isCali);
        }
      }
      async ensureCategoryMap(storeId) {
        const map = /* @__PURE__ */ new Map();
        for (const cat of demo_data_1.demoCategories) {
          let existing = await this.categoriesRepo.findOne({ where: { storeId, name: cat.name } });
          if (!existing) {
            existing = await this.categoriesRepo.save(this.categoriesRepo.create({ ...cat, storeId }));
          }
          map.set(cat.name, existing.id);
        }
        return map;
      }
      async seedMenuProducts(storeId, categoryMap, caliSubset = false) {
        const bulkList = caliSubset ? demo_data_1.demoBulkProductsCali : demo_data_1.demoBulkProducts;
        const portionList = caliSubset ? demo_data_1.demoPortionProductsCali : demo_data_1.demoPortionProducts;
        const compositeList = caliSubset ? demo_data_1.demoCompositeProductsCali : demo_data_1.demoCompositeProducts;
        const simpleIngredients = caliSubset ? demo_data_1.demoIngredientSimplesCali : demo_data_1.demoIngredientSimples;
        const menuSimples = caliSubset ? demo_data_1.demoMenuSimpleProductsCali : demo_data_1.demoMenuSimpleProducts;
        const containers = caliSubset ? demo_data_1.demoIceCreamContainersCali : demo_data_1.demoIceCreamContainers;
        const skuToId = /* @__PURE__ */ new Map();
        const existingProducts = await this.productsRepo.find({ where: { storeId } });
        for (const p of existingProducts)
          skuToId.set(p.sku, p.id);
        for (const bulk of bulkList) {
          if (skuToId.has(bulk.sku))
            continue;
          const saved = await this.productsRepo.save(this.productsRepo.create({
            sku: bulk.sku,
            name: bulk.name,
            description: bulk.description,
            productType: enums_1.ProductType.BULK,
            stockUnit: enums_1.StockUnit.G,
            salePrice: 0,
            costPrice: bulk.costPrice,
            stock: bulk.stock,
            minStock: bulk.minStock,
            categoryId: categoryMap.get(bulk.category),
            storeId,
            active: true
          }));
          skuToId.set(bulk.sku, saved.id);
          this.logger.log(`Menu demo: insumo ${bulk.sku} en tienda ${storeId}`);
        }
        for (const simple of simpleIngredients) {
          if (skuToId.has(simple.sku))
            continue;
          const saved = await this.productsRepo.save(this.productsRepo.create({
            sku: simple.sku,
            name: simple.name,
            productType: enums_1.ProductType.SIMPLE,
            stockUnit: enums_1.StockUnit.UNIT,
            salePrice: simple.salePrice,
            costPrice: simple.costPrice,
            stock: simple.stock,
            minStock: simple.minStock,
            categoryId: categoryMap.get(simple.category),
            storeId,
            active: true
          }));
          skuToId.set(simple.sku, saved.id);
        }
        for (const menuItem of menuSimples) {
          if (skuToId.has(menuItem.sku))
            continue;
          const saved = await this.productsRepo.save(this.productsRepo.create({
            sku: menuItem.sku,
            name: menuItem.name,
            description: menuItem.description,
            productType: enums_1.ProductType.SIMPLE,
            stockUnit: enums_1.StockUnit.UNIT,
            salePrice: menuItem.salePrice,
            costPrice: menuItem.costPrice,
            stock: menuItem.stock,
            minStock: menuItem.minStock,
            categoryId: categoryMap.get(menuItem.category),
            storeId,
            active: true
          }));
          skuToId.set(menuItem.sku, saved.id);
          this.logger.log(`Menu demo: producto ${menuItem.sku} en tienda ${storeId}`);
        }
        for (const container of containers) {
          if (skuToId.has(container.sku))
            continue;
          const saved = await this.productsRepo.save(this.productsRepo.create({
            sku: container.sku,
            name: container.name,
            productType: enums_1.ProductType.SIMPLE,
            stockUnit: enums_1.StockUnit.UNIT,
            salePrice: container.salePrice,
            costPrice: container.costPrice,
            stock: container.stock,
            minStock: container.minStock,
            categoryId: categoryMap.get(container.category),
            storeId,
            active: true
          }));
          skuToId.set(container.sku, saved.id);
        }
        for (const portion of portionList) {
          const hasOptions = "optionGroups" in portion && portion.optionGroups?.length;
          const existing = await this.productsRepo.findOne({
            where: { storeId, sku: portion.sku },
            relations: ["optionGroups"]
          });
          if (existing) {
            skuToId.set(portion.sku, existing.id);
            if (hasOptions) {
              const needsOptions = !existing.optionGroups?.length || existing.baseProductId != null;
              if (needsOptions) {
                existing.baseProductId = null;
                existing.scoopCount = portion.scoopCount ?? null;
                existing.portionSize = portion.portionSize;
                existing.description = portion.description ?? existing.description;
                await this.productsRepo.save(existing);
                await this.attachPortionOptionGroups(existing.id, portion, skuToId);
                this.logger.log(`Menu demo: opciones agregadas a ${portion.sku} en tienda ${storeId}`);
              }
            }
            continue;
          }
          const saved = await this.productsRepo.save(this.productsRepo.create({
            sku: portion.sku,
            name: portion.name,
            description: portion.description,
            productType: enums_1.ProductType.PORTION,
            stockUnit: enums_1.StockUnit.G,
            baseProductId: hasOptions ? null : skuToId.get(portion.baseSku) ?? null,
            portionSize: portion.portionSize,
            scoopCount: hasOptions ? portion.scoopCount : null,
            salePrice: portion.salePrice,
            costPrice: portion.costPrice,
            stock: 0,
            minStock: 0,
            categoryId: categoryMap.get(portion.category),
            storeId,
            active: true
          }));
          skuToId.set(portion.sku, saved.id);
          if (hasOptions && portion.optionGroups) {
            await this.attachPortionOptionGroups(saved.id, portion, skuToId);
          }
          this.logger.log(`Menu demo: porci\xF3n ${portion.sku} en tienda ${storeId}`);
        }
        for (const composite of compositeList) {
          if (skuToId.has(composite.sku))
            continue;
          const already = await this.productsRepo.findOne({ where: { storeId, sku: composite.sku } });
          if (already) {
            skuToId.set(composite.sku, already.id);
            continue;
          }
          const recipeLines = composite.recipe.map((line) => {
            const ingredientProductId = skuToId.get(line.ingredientSku);
            if (!ingredientProductId)
              return null;
            return {
              ingredientProductId,
              quantity: line.quantity,
              unit: line.unit === "unit" ? enums_1.StockUnit.UNIT : line.unit === "ml" ? enums_1.StockUnit.ML : enums_1.StockUnit.G
            };
          }).filter(Boolean);
          if (recipeLines.length !== composite.recipe.length) {
            this.logger.warn(`Menu demo: receta incompleta para ${composite.sku}`);
            continue;
          }
          const saved = await this.productsRepo.save(this.productsRepo.create({
            sku: composite.sku,
            name: composite.name,
            description: composite.description,
            productType: enums_1.ProductType.COMPOSITE,
            stockUnit: enums_1.StockUnit.UNIT,
            salePrice: composite.salePrice,
            costPrice: composite.costPrice,
            stock: 0,
            minStock: 0,
            categoryId: categoryMap.get(composite.category),
            storeId,
            active: true,
            recipe: recipeLines
          }));
          skuToId.set(composite.sku, saved.id);
          this.logger.log(`Menu demo: compuesto ${composite.sku} en tienda ${storeId}`);
        }
      }
      async attachPortionOptionGroups(productId, portion, skuToId) {
        await this.dataSource.transaction(async (manager) => {
          const oldGroups = await manager.find(product_option_group_entity_1.ProductOptionGroup, { where: { productId } });
          if (oldGroups.length) {
            await manager.delete(product_option_entity_1.ProductOption, { groupId: (0, typeorm_2.In)(oldGroups.map((g) => g.id)) });
            await manager.delete(product_option_group_entity_1.ProductOptionGroup, { productId });
          }
          let sortOrder = 0;
          for (const groupDto of portion.optionGroups) {
            const minSelect = groupDto.kind === "flavor" ? portion.scoopCount : 1;
            const group = await manager.save(manager.create(product_option_group_entity_1.ProductOptionGroup, {
              productId,
              name: groupDto.name,
              kind: groupDto.kind === "flavor" ? enums_1.OptionGroupKind.FLAVOR : enums_1.OptionGroupKind.CONTAINER,
              minSelect,
              maxSelect: minSelect,
              sortOrder: sortOrder++
            }));
            for (const opt of groupDto.options) {
              const ingredientProductId = skuToId.get(opt.ingredientSku);
              if (!ingredientProductId)
                continue;
              await manager.save(manager.create(product_option_entity_1.ProductOption, {
                groupId: group.id,
                name: opt.name,
                ingredientProductId,
                quantity: groupDto.kind === "flavor" ? portion.portionSize : 1,
                unit: groupDto.kind === "flavor" ? enums_1.StockUnit.G : enums_1.StockUnit.UNIT
              }));
            }
          }
        });
      }
      async seedPurchases(storeId) {
        const admin = await this.usersRepo.findOne({ where: { email: demo_data_1.demoStoreAdmin.email } });
        if (!admin)
          return;
        const suppliers = await this.suppliersRepo.find({ where: { storeId } });
        const products = await this.productsRepo.find({ where: { storeId } });
        if (suppliers.length === 0 || products.length === 0)
          return;
        const supplierMap = new Map(suppliers.map((s) => [s.name, s.id]));
        const productMap = new Map(products.map((p) => [p.sku, p.id]));
        for (const demo of demo_data_1.demoPurchases.slice(0, 3)) {
          const supplierId = supplierMap.get(demo.supplier);
          if (!supplierId)
            continue;
          let total = 0;
          const items = [];
          for (const item of demo.items) {
            const productId = productMap.get(item.sku);
            if (!productId)
              continue;
            const subtotal = item.quantity * item.unitCost;
            total += subtotal;
            items.push({ productId, quantity: item.quantity, unitCost: item.unitCost, subtotal });
          }
          if (items.length === 0)
            continue;
          const createdAt = /* @__PURE__ */ new Date();
          createdAt.setDate(createdAt.getDate() - demo.daysAgo);
          const purchase = await this.purchasesRepo.save(this.purchasesRepo.create({
            storeId,
            supplierId,
            userId: admin.id,
            invoiceNumber: demo.invoiceNumber,
            notes: demo.notes,
            total,
            createdAt
          }));
          for (const item of items) {
            await this.purchaseItemsRepo.save(this.purchaseItemsRepo.create({ ...item, purchaseId: purchase.id }));
          }
        }
      }
      async clearDemoData() {
        await this.dataSource.query("SET FOREIGN_KEY_CHECKS = 0");
        await this.dataSource.query("DELETE FROM sale_items");
        await this.dataSource.query("DELETE FROM sales");
        await this.dataSource.query("DELETE FROM purchase_items");
        await this.dataSource.query("DELETE FROM purchases");
        await this.dataSource.query("DELETE FROM product_options");
        await this.dataSource.query("DELETE FROM product_option_groups");
        await this.dataSource.query("DELETE FROM product_recipes");
        await this.dataSource.query("DELETE FROM inventory_movements");
        await this.dataSource.query("DELETE FROM cash_sessions");
        await this.dataSource.query("DELETE FROM products");
        await this.dataSource.query("DELETE FROM categories");
        await this.dataSource.query("DELETE FROM customers");
        await this.dataSource.query("DELETE FROM suppliers");
        await this.dataSource.query("DELETE FROM settings");
        await this.dataSource.query("DELETE FROM users WHERE role != 'super_admin'");
        await this.dataSource.query("DELETE FROM stores");
        await this.dataSource.query("SET FOREIGN_KEY_CHECKS = 1");
      }
    };
    exports2.SeedService = SeedService;
    exports2.SeedService = SeedService = SeedService_1 = __decorate([
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
      __param(1, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
      __param(2, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
      __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
      __param(4, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
      __param(5, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
      __param(6, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
      __param(7, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
      __param(8, (0, typeorm_1.InjectRepository)(purchase_item_entity_1.PurchaseItem)),
      __metadata("design:paramtypes", [
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource
      ])
    ], SeedService);
  }
});

// dist/seed/seed.controller.js
var require_seed_controller = __commonJS({
  "dist/seed/seed.controller.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = exports2 && exports2.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeedController = void 0;
    var common_1 = require("@nestjs/common");
    var seed_service_1 = require_seed_service();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var roles_guard_1 = require_roles_guard();
    var roles_decorator_1 = require_roles_decorator();
    var enums_1 = require_enums();
    var SeedController = class SeedController {
      seedService;
      constructor(seedService) {
        this.seedService = seedService;
      }
      async seedDemo(force) {
        await this.seedService.seedDemo(force === "true");
        return { message: "Datos demo cargados correctamente" };
      }
      async seedMenu() {
        await this.seedService.seedMenuProductsAllStores();
        return { message: "Productos de men\xFA demo (helados y hamburguesa) cargados" };
      }
    };
    exports2.SeedController = SeedController;
    __decorate([
      (0, common_1.Post)("demo"),
      __param(0, (0, common_1.Query)("force")),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", [String]),
      __metadata("design:returntype", Promise)
    ], SeedController.prototype, "seedDemo", null);
    __decorate([
      (0, common_1.Post)("menu"),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", []),
      __metadata("design:returntype", Promise)
    ], SeedController.prototype, "seedMenu", null);
    exports2.SeedController = SeedController = __decorate([
      (0, common_1.Controller)("seed"),
      (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
      (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
      __metadata("design:paramtypes", [seed_service_1.SeedService])
    ], SeedController);
  }
});

// dist/seed/seed.module.js
var require_seed_module = __commonJS({
  "dist/seed/seed.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeedModule = void 0;
    var common_1 = require("@nestjs/common");
    var typeorm_1 = require("@nestjs/typeorm");
    var store_entity_1 = require_store_entity();
    var user_entity_1 = require_user_entity();
    var setting_entity_1 = require_setting_entity();
    var category_entity_1 = require_category_entity();
    var product_entity_1 = require_product_entity();
    var customer_entity_1 = require_customer_entity();
    var supplier_entity_1 = require_supplier_entity();
    var purchase_entity_1 = require_purchase_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var seed_service_1 = require_seed_service();
    var seed_controller_1 = require_seed_controller();
    var SeedModule = class SeedModule {
    };
    exports2.SeedModule = SeedModule;
    exports2.SeedModule = SeedModule = __decorate([
      (0, common_1.Module)({
        imports: [
          typeorm_1.TypeOrmModule.forFeature([store_entity_1.Store, user_entity_1.User, setting_entity_1.Setting, category_entity_1.Category, product_entity_1.Product, customer_entity_1.Customer, supplier_entity_1.Supplier, purchase_entity_1.Purchase, purchase_item_entity_1.PurchaseItem])
        ],
        controllers: [seed_controller_1.SeedController],
        providers: [seed_service_1.SeedService],
        exports: [seed_service_1.SeedService]
      })
    ], SeedModule);
  }
});

// dist/storage/storage.module.js
var require_storage_module = __commonJS({
  "dist/storage/storage.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StorageModule = void 0;
    var common_1 = require("@nestjs/common");
    var storage_service_1 = require_storage_service();
    var StorageModule = class StorageModule {
    };
    exports2.StorageModule = StorageModule;
    exports2.StorageModule = StorageModule = __decorate([
      (0, common_1.Global)(),
      (0, common_1.Module)({
        providers: [storage_service_1.StorageService],
        exports: [storage_service_1.StorageService]
      })
    ], StorageModule);
  }
});

// dist/app.module.js
var require_app_module = __commonJS({
  "dist/app.module.js"(exports2) {
    "use strict";
    var __decorate = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AppModule = void 0;
    var common_1 = require("@nestjs/common");
    var config_1 = require("@nestjs/config");
    var typeorm_1 = require("@nestjs/typeorm");
    var core_1 = require("@nestjs/core");
    var auth_module_1 = require_auth_module();
    var jwt_auth_guard_1 = require_jwt_auth_guard();
    var store_context_interceptor_1 = require_store_context_interceptor();
    var users_module_1 = require_users_module();
    var stores_module_1 = require_stores_module();
    var categories_module_1 = require_categories_module();
    var products_module_1 = require_products_module();
    var customers_module_1 = require_customers_module();
    var suppliers_module_1 = require_suppliers_module();
    var settings_module_1 = require_settings_module();
    var inventory_module_1 = require_inventory_module();
    var purchases_module_1 = require_purchases_module();
    var cash_sessions_module_1 = require_cash_sessions_module();
    var sales_module_1 = require_sales_module();
    var reports_module_1 = require_reports_module();
    var seed_module_1 = require_seed_module();
    var storage_module_1 = require_storage_module();
    var store_entity_1 = require_store_entity();
    var user_entity_1 = require_user_entity();
    var category_entity_1 = require_category_entity();
    var product_entity_1 = require_product_entity();
    var product_recipe_entity_1 = require_product_recipe_entity();
    var product_option_group_entity_1 = require_product_option_group_entity();
    var product_option_entity_1 = require_product_option_entity();
    var customer_entity_1 = require_customer_entity();
    var supplier_entity_1 = require_supplier_entity();
    var setting_entity_1 = require_setting_entity();
    var inventory_movement_entity_1 = require_inventory_movement_entity();
    var purchase_entity_1 = require_purchase_entity();
    var purchase_item_entity_1 = require_purchase_item_entity();
    var cash_session_entity_1 = require_cash_session_entity();
    var sale_entity_1 = require_sale_entity();
    var sale_item_entity_1 = require_sale_item_entity();
    var AppModule = class AppModule {
    };
    exports2.AppModule = AppModule;
    exports2.AppModule = AppModule = __decorate([
      (0, common_1.Module)({
        imports: [
          config_1.ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: !!process.env.VERCEL
          }),
          storage_module_1.StorageModule,
          typeorm_1.TypeOrmModule.forRootAsync({
            imports: [config_1.ConfigModule],
            inject: [config_1.ConfigService],
            useFactory: (config) => {
              const onVercel = !!process.env.VERCEL;
              return {
                type: "mysql",
                host: config.get("DB_HOST", "localhost"),
                port: config.get("DB_PORT", 3306),
                username: config.get("DB_USERNAME", "root"),
                password: config.get("DB_PASSWORD", ""),
                database: config.get("DB_DATABASE", "pos_db"),
                entities: [
                  store_entity_1.Store,
                  user_entity_1.User,
                  category_entity_1.Category,
                  product_entity_1.Product,
                  product_recipe_entity_1.ProductRecipe,
                  product_option_group_entity_1.ProductOptionGroup,
                  product_option_entity_1.ProductOption,
                  customer_entity_1.Customer,
                  supplier_entity_1.Supplier,
                  setting_entity_1.Setting,
                  inventory_movement_entity_1.InventoryMovement,
                  purchase_entity_1.Purchase,
                  purchase_item_entity_1.PurchaseItem,
                  cash_session_entity_1.CashSession,
                  sale_entity_1.Sale,
                  sale_item_entity_1.SaleItem
                ],
                synchronize: false,
                timezone: "Z",
                logging: process.env.NODE_ENV === "production" ? ["error"] : true,
                retryAttempts: onVercel ? 1 : 3,
                retryDelay: onVercel ? 500 : 2e3,
                extra: {
                  connectionLimit: onVercel ? 1 : 5,
                  connectTimeout: onVercel ? 5e3 : 1e4
                }
              };
            }
          }),
          auth_module_1.AuthModule,
          stores_module_1.StoresModule,
          users_module_1.UsersModule,
          categories_module_1.CategoriesModule,
          products_module_1.ProductsModule,
          customers_module_1.CustomersModule,
          suppliers_module_1.SuppliersModule,
          settings_module_1.SettingsModule,
          inventory_module_1.InventoryModule,
          purchases_module_1.PurchasesModule,
          cash_sessions_module_1.CashSessionsModule,
          sales_module_1.SalesModule,
          reports_module_1.ReportsModule,
          seed_module_1.SeedModule
        ],
        providers: [
          { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
          { provide: core_1.APP_INTERCEPTOR, useClass: store_context_interceptor_1.StoreContextInterceptor }
        ]
      })
    ], AppModule);
  }
});

// dist/app-bootstrap.js
var require_app_bootstrap = __commonJS({
  "dist/app-bootstrap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.applyAppConfig = applyAppConfig;
    exports2.createNestApp = createNestApp;
    var common_1 = require("@nestjs/common");
    var core_1 = require("@nestjs/core");
    var platform_express_1 = require("@nestjs/platform-express");
    var app_module_1 = require_app_module();
    function isOriginAllowed(origin) {
      if (!origin)
        return true;
      const configured = process.env.CORS_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean);
      if (configured?.length) {
        if (configured.includes("*"))
          return true;
        return configured.includes(origin);
      }
      if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        return true;
      }
      try {
        return /\.vercel\.app$/i.test(new URL(origin).hostname);
      } catch {
        return false;
      }
    }
    function applyAppConfig(app) {
      app.enableCors({
        origin: (origin, callback) => {
          callback(null, isOriginAllowed(origin));
        },
        credentials: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "X-Store-Id",
          "Accept",
          "Origin",
          "X-Requested-With"
        ],
        exposedHeaders: ["Authorization"],
        maxAge: 86400
      });
      if (process.env.VERCEL) {
        app.setGlobalPrefix("api");
      }
      app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }
      }));
    }
    async function createNestApp(expressApp2) {
      const logger = process.env.NODE_ENV === "production" ? ["error", "warn"] : ["log", "error", "warn"];
      const nestOptions = { logger, abortOnError: false };
      const app = expressApp2 ? await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp2), nestOptions) : await core_1.NestFactory.create(app_module_1.AppModule, nestOptions);
      applyAppConfig(app);
      return app;
    }
  }
});

// dist/vercel.js
var __importDefault = exports && exports.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = getApp;
exports.handler = handler;
var dotenv_1 = require("dotenv");
var express_1 = __importDefault(require("express"));
var timezone_util_1 = require_timezone_util();
var app_bootstrap_1 = require_app_bootstrap();
(0, dotenv_1.config)();
(0, timezone_util_1.applyProcessTimezone)();
var expressApp;
var bootstrapPromise;
var bootstrapError;
function requestUrl(req) {
  const raw = req.url ?? "/";
  const original = req.headers["x-vercel-original-url"];
  if (typeof original === "string" && original.startsWith("/")) {
    return original.split("?")[0] + (raw.includes("?") ? raw.slice(raw.indexOf("?")) : "");
  }
  return raw;
}
function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}
async function bootstrap() {
  const dbHost = process.env.DB_HOST;
  if (!dbHost) {
    throw new Error("DB_HOST no est\xE1 configurado en Vercel (Environment Variables)");
  }
  console.log(`[vercel] Iniciando NestJS \u2014 DB: ${dbHost}:${process.env.DB_PORT ?? 3306}`);
  const app = (0, express_1.default)();
  const nestApp = await (0, app_bootstrap_1.createNestApp)(app);
  await nestApp.init();
  console.log("[vercel] NestJS listo");
  return app;
}
async function getApp() {
  if (bootstrapError)
    throw bootstrapError;
  if (!expressApp) {
    if (!bootstrapPromise) {
      bootstrapPromise = bootstrap().then((app) => {
        expressApp = app;
        return app;
      }).catch((err) => {
        bootstrapError = err;
        bootstrapPromise = void 0;
        console.error("[vercel] Bootstrap fall\xF3:", err.message);
        throw err;
      });
    }
    expressApp = await bootstrapPromise;
  }
  return expressApp;
}
async function handler(req, res) {
  const url = requestUrl(req);
  const pathOnly = url.split("?")[0];
  if (pathOnly === "/api/ping" || pathOnly === "/ping") {
    sendJson(res, 200, { pong: true, ts: Date.now() });
    return;
  }
  if (pathOnly === "/" || pathOnly === "/api") {
    sendJson(res, 200, {
      ok: true,
      service: "vendipro-back",
      dbHost: process.env.DB_HOST ?? null,
      dbDatabase: process.env.DB_DATABASE ?? null,
      hasJwtSecret: !!process.env.JWT_SECRET
    });
    return;
  }
  if (pathOnly === "/api/health" || pathOnly === "/health") {
    sendJson(res, 200, {
      ok: true,
      dbHost: process.env.DB_HOST ?? null,
      dbDatabase: process.env.DB_DATABASE ?? null,
      hasJwtSecret: !!process.env.JWT_SECRET
    });
    return;
  }
  try {
    const app = await getApp();
    app(req, res);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("[vercel] Error:", err);
    if (!res.headersSent) {
      sendJson(res, 503, {
        statusCode: 503,
        message: "No se pudo conectar a la base de datos",
        detail: message
      });
    }
  }
}
exports.default = handler;
/*! Bundled license information:

media-typer/index.js:
  (*!
   * media-typer
   * Copyright(c) 2014 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

type-is/index.js:
  (*!
   * type-is
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2014-2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
