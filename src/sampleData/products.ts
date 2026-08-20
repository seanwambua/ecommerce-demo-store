import { createProduct } from "../lib/product";
import {
  createAdmin,
  createBuyer,
  createUser,
  createVendor,
} from "../lib/users";
import type {
  User,
  Vendor,
  Buyer,
  Admin,
  Address,
  Product,
  ProductImage,
  Category,
  Brand,
  Discount,
  Inventory,
  Review,
  Order,
  Cart,
  CartItem,
  PaymentMethod,
  Transaction,
  Notification,
} from "../features/auth/types";

export function populateDB() {
  try {
    // Create Users
    createUser("usr-01", sampleUser);

    // Create User Accounts
    createBuyer("buyer-001", sampleBuyer);
    createVendor("vendor-001", sampleVendor);
    createAdmin("admin-001", sampleAdmin);

    const sampleProductId = createProduct(sampleProduct);

    return console.log(sampleProductId);
  } catch {
    throw Error;
  }
}

// -----------------------------------------------------------------------------
// 1. ADDRESSES
// -----------------------------------------------------------------------------
export const sampleAddressBuyer: Address = {
  id: "addr-buyer-001",
  userId: "usr-buyer-01",
  addressLine1: "123 Innovation Way",
  addressLine2: "Apt 4B",
  city: "Nairobi",
  state: "Nairobi County",
  postalCode: "00100",
  country: "Kenya",
  createdAt: new Date("2026-01-10T08:00:00Z"),
  updatedAt: new Date("2026-01-10T08:00:00Z"),
};

export const sampleAddressVendor: Address = {
  id: "addr-vendor-001",
  userId: "usr-vendor-01",
  addressLine1: "456 Logistics Boulevard",
  city: "Nairobi",
  state: "Nairobi County",
  postalCode: "00200",
  country: "Kenya",
  createdAt: new Date("2026-01-05T09:30:00Z"),
  updatedAt: new Date("2026-01-05T09:30:00Z"),
};

// -----------------------------------------------------------------------------
// 2. USERS (Buyer-only, Vendor-User, Admin-User)
// -----------------------------------------------------------------------------
export const sampleUser: User = {
  id: "usr-01",
  fname: "Jane",
  lname: "Doe",
  email: "jane.doe@example.com",
  displayName: "Jane D.",
  photoURL: "https://example.com/avatars/janedoe.jpg",
  verified: true
}

// -----------------------------------------------------------------------------
// 3. ROLES (Buyer, Vendor, Admin)
// -----------------------------------------------------------------------------
export const sampleBuyer: Buyer = {
  id: "buyer-001",
  userId: "usr-01",
  anonymous: false,
  name: "Jane Doe",
  email: "jane.doe@example.com",
  createdAt: new Date,
  updatedAt: new Date,
  address: sampleAddressBuyer
};

export const sampleVendor: Vendor = {
  id: "vendor-001",
  userId: "usr-01",
  name: "Orange Line Apparel Ltd",
  contactEmail: "support@orangeline.com",
  contactPhone: "+254700000000",
  createdAt: new Date("2026-01-05T09:30:00Z"),
  updatedAt: new Date("2026-01-05T09:30:00Z"),
  address: sampleAddressVendor
}

export const sampleAdmin: Admin = {
  id: "admin-001",
  userId: "usr-01",
  name: "Sarah Connor",
  email: "sarah.admin@store.com",
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z")
};

// -----------------------------------------------------------------------------
// 4. PRODUCT AUXILIARIES (Brand, Categories, Discount, Image, Inventory, Review)
// -----------------------------------------------------------------------------
export const sampleBrand: Brand = {
  id: "brand-orange-line",
  name: "Orange Line Athletics",
  description:
    "Performance footwear built for outdoor adventure and daily endurance.",
  createdAt: new Date("2024-01-15T08:00:00Z"),
  updatedAt: new Date("2024-01-15T08:00:00Z"),
};

export const sampleCategory: Category = {
  id: "cat-footwear",
  name: "Footwear",
  description: "Shoes, sneakers, and boots",
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-01T00:00:00Z"),
};

export const sampleDiscount: Discount = {
  id: "disc-summer-2026",
  code: "SUMMER10",
  description: "10% off end-of-season footwear promotion",
  percentage: 10,
  validFrom: new Date("2026-08-01T00:00:00Z"),
  validUntil: new Date("2026-08-31T23:59:59Z"),
  createdAt: new Date("2026-07-25T10:00:00Z"),
  updatedAt: new Date("2026-07-25T10:00:00Z"),
};

export const sampleProductImage: ProductImage = {
  id: "img-orange-line-runner-01",
  featuredImageLink:
    "./images/sports-shoe-feature.png",
  productShowCaseLinks: [
    "./images/sports-shoe-feature.png",
    "./images/showcase-1.png",
    "./images/showcase-2.png",
    "./images/showcase-3.png",
  ],
  createdAt: new Date("2026-08-12T05:00:00Z"),
  updatedAt: new Date("2026-08-12T05:00:00Z"),
};

export const sampleInventory: Inventory = {
  productId: "prod-orange-line-runner-01",
  quantity: 45,
  lastUpdated: new Date("2026-08-12T05:00:00Z"),
};

export const sampleReviews: Review[] = [
  {
    id: "rev-001",
    productId: "prod-orange-line-runner-01",
    userId: "usr-buyer-01",
    rating: 5,
    comment:
      "Super comfortable right out of the box! Great traction on wet trails.",
    createdAt: new Date("2026-08-01T10:30:00Z"),
    updatedAt: new Date("2026-08-01T10:30:00Z"),
  },
];

// -----------------------------------------------------------------------------
// 5. PRODUCT
// -----------------------------------------------------------------------------
export const sampleProduct: Product = {
  id: "prod-orange-line-runner-01",
  name: "Orange Line Trail Runner Pro",
  description:
    "Engineered for rugged terrain and urban paths alike, featuring breathable mesh uppers and a high-traction outsole.",
  price: 12999,
  image: sampleProductImage,
  brand: sampleBrand,
  category: sampleCategory,
  keywords: [
    "running",
    "trail",
    "sports shoe",
    "sneakers",
    "orange line",
    "athletic",
  ],
  inventory: sampleInventory,
  review: sampleReviews,
  discount: [sampleDiscount],
};

// -----------------------------------------------------------------------------
// 6. CART & CART ITEM
// -----------------------------------------------------------------------------
export const sampleCartItem: CartItem = {
  productId: "prod-orange-line-runner-01",
  quantity: 1,
};

export const sampleCart: Cart = {
  userId: "usr-buyer-01",
  items: [sampleCartItem],
  totalAmount: 116.99, // After 10% discount applied
  createdAt: new Date("2026-08-10T11:00:00Z"),
  updatedAt: new Date("2026-08-10T11:05:00Z"),
};

// -----------------------------------------------------------------------------
// 7. ORDER & PAYMENT METHOD & TRANSACTION
// -----------------------------------------------------------------------------
export const sampleOrder: Order = {
  id: "ord-2026-9901",
  userId: "usr-buyer-01",
  productIds: ["prod-orange-line-runner-01"],
  totalAmount: 116.99,
  status: "completed",
  createdAt: new Date("2026-08-10T11:10:00Z"),
  updatedAt: new Date("2026-08-10T11:15:00Z"),
};

export const samplePaymentMethod: PaymentMethod = {
  id: "pm-001",
  userId: "usr-buyer-01",
  cardNumber: "•••• •••• •••• 4242",
  cardHolderName: "Jane Doe",
  expirationDate: "12/28",
  createdAt: new Date("2026-01-10T08:15:00Z"),
  updatedAt: new Date("2026-01-10T08:15:00Z"),
};

export const sampleTransaction: Transaction = {
  id: "txn-8819203",
  orderId: "ord-2026-9901",
  paymentMethodId: "pm-001",
  amount: 116.99,
  status: "completed",
  createdAt: new Date("2026-08-10T11:10:05Z"),
  updatedAt: new Date("2026-08-10T11:10:10Z"),
};

// -----------------------------------------------------------------------------
// 8. NOTIFICATION
// -----------------------------------------------------------------------------
export const sampleNotification: Notification = {
  id: "notif-001",
  userId: "usr-buyer-01",
  message:
    "Your order #ord-2026-9901 has been confirmed and is being prepared for dispatch!",
  read: true,
  createdAt: new Date("2026-08-10T11:15:00Z"),
  updatedAt: new Date("2026-08-10T12:00:00Z"),
};
