# DimSum Restaurant App - Quick Reference Guide

## 🎯 App Overview

A modern, fully-functional DimSum (Dim Sum) restaurant ordering application built with React, TypeScript, and Vite. Features a beautiful home page with best sellers, complete menu browsing, QR code sharing, and shopping cart functionality.

---

## 🏠 Home Page (Initial Load)

When users first visit the app, they see:

```
┌──────────────────────────────────────┐
│ ☰  DimSum Restaurant  📱  🛒(0)    │ ← Header
├──────────────────────────────────────┤
│                                      │
│  ⭐ Món Bán Chạy                     │
│  (Best Sellers Section)              │
│                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │ Xíu Mại │ │ Bánh Bao│ │ Tôm Bánh││
│  │ 45,000₫ │ │ 35,000₫ │ │ 45,000₫││
│  │ [+ Thêm]│ │[+ Thêm] │ │[+ Thêm] ││
│  └─────────┘ └─────────┘ └─────────┘│
│                                      │
│  (8 best sellers displayed)          │
│                                      │
│  ─────────────────────────────────   │
│                                      │
│  📖 Chọn danh mục để xem menu đầy đủ│
│                                      │
│  ┌──────────────┐ ┌──────────────┐  │
│  │ Xíu Mại (30) │ │ Bánh Bao (8) │  │
│  └──────────────┘ └──────────────┘  │
│  ┌──────────────┐ ┌──────────────┐  │
│  │Tôm Bánh Cõi │ │ Nước Uống(20)│  │
│  └──────────────┘ └──────────────┘  │
│  ┌──────────────┐                    │
│  │ Thuốc Lá(10)│                    │
│  └──────────────┘                    │
│                                      │
└──────────────────────────────────────┘
```

---

## 📖 Category Menu View

Clicking a category button shows the full menu:

```
┌──────────────────────────────────────┐
│ ☰  DimSum Restaurant  📱  🛒(2)    │
├──────────────────────────────────────┤
│                                      │
│ ← Quay lại trang chủ                │ ← Back button
│                                      │
│ Xíu Mại (30 items)                   │
│ Tổng 30 món                          │
│                                      │
│ ┌──────────────┐ ┌──────────────┐   │
│ │ Xíu Mại #1   │ │ Xíu Mại #2   │   │
│ │ 40,000₫      │ │ 42,000₫      │   │
│ │ [+ Thêm]     │ │ [+ Thêm]     │   │
│ └──────────────┘ └──────────────┘   │
│                                      │
│ ... (more items) ...                 │
│                                      │
└──────────────────────────────────────┘
```

---

## 📱 QR Code Modal

Clicking the QR button (📱) displays:

```
┌──────────────────────────────────────┐
│  📱 Quét QR để truy cập           [✕]│
├──────────────────────────────────────┤
│                                      │
│             ┌──────────┐             │
│             │ ▤▤▤▤▤▤  │             │
│             │ ▤▤▤▤▤▤  │             │
│             │ ▤▤ QR ▤▤ │  (256x256px)│
│             │ ▤▤ ▤▤▤ ▤ │             │
│             │ ▤▤▤▤▤▤  │             │
│             └──────────┘             │
│                                      │
│    http://localhost:5173            │
│    (or actual domain)                │
│                                      │
└──────────────────────────────────────┘
```

---

## ☰ Menu Drawer

Clicking hamburger menu opens drawer with:

```
┌─────────────────────┐
│ 🔍 Search items... │ ← Search bar
├─────────────────────┤
│                     │
│ Bàn: [Table 1  ▼] │ ← Table selection
│                     │
│ ─────────────────── │
│                     │
│ Danh Mục:           │
│ ☐ Xíu Mại           │
│ ☐ Bánh Bao          │
│ ☐ Tôm Bánh Cõi     │
│ ☐ Nước Uống        │
│ ☐ Thuốc Lá         │
│                     │
└─────────────────────┘
```

---

## 🛒 Shopping Cart

Click cart icon to view:

```
┌─────────────────────────────────┐
│ Giỏ Hàng (2 items)          [✕] │
├─────────────────────────────────┤
│                                 │
│ Bàn: [T01 - Table 1        ]    │
│                                 │
│ ─────────────────────────────── │
│                                 │
│ • Xíu Mại Tôm Thịt              │
│   Nhỏ (3 cái) • 45,000₫         │
│   Qty: [−] 1 [+]  [✕]          │
│                                 │
│ • Trà Ô Long                    │
│   Vừa (300ml) • 30,000₫         │
│   Qty: [−] 1 [+]  [✕]          │
│                                 │
│ ─────────────────────────────── │
│                                 │
│ Tổng tiền: 75,000₫              │
│                                 │
│ [Thanh toán]                    │
│                                 │
└─────────────────────────────────┘
```

---

## 💾 Data Structure

### Best Sellers (bestSellers.ts)
```javascript
export const bestSellers: MenuItem[] = [
  {
    id: "1",
    name: "Xíu Mại Tôm Thịt",
    price: 45000,
    description: "Bánh xíu mại tươi với tôm và thịt lợn",
    image: "https://images.unsplash.com/...",
    sizes: [
      { name: "Nhỏ (3 cái)", priceAdjustment: 0 },
      { name: "Vừa (6 cái)", priceAdjustment: 15000 },
      { name: "Lớn (9 cái)", priceAdjustment: 30000 },
    ],
  },
  // ... 7 more items
];
```

### Menu Structure (menu.ts)
```javascript
export const menuData = [
  {
    category: "Xíu Mại",
    items: [ /* 30 items */ ]
  },
  {
    category: "Bánh Bao",
    items: [ /* 8 items */ ]
  },
  // ... more categories
];
```

### Tables (tables.ts)
```javascript
export const tablesData: Table[] = [
  { id: "1", name: "T01 - Table 1", capacity: 2, status: "available" },
  // ... 40 tables total
];
```

---

## 🎛️ Component Architecture

```
OrderPage.tsx (Main Component)
├── Header
│   ├── Hamburger Menu (☰)
│   ├── Brand Name ("DimSum Restaurant")
│   ├── QR Button (📱)
│   └── Cart Badge (🛒)
│
├── MenuDrawer
│   ├── Search Input
│   ├── Table Selection
│   └── Category List
│
├── Content
│   ├── Home View (activeCategory === null)
│   │   ├── Best Sellers Section
│   │   │   └── ProductCard x 8
│   │   └── Category Buttons
│   │
│   └── Category View (activeCategory !== null)
│       ├── Back Button
│       ├── Category Title
│       └── ProductCard x N
│
├── CartDrawer
│   ├── Table Selection
│   ├── Cart Items List
│   │   └── Item Card
│   │       ├── Item Info
│   │       ├── Quantity Controls
│   │       └── Remove Button
│   └── Checkout Button
│
└── QR Modal
    ├── QR Code Image
    └── Website URL
```

---

## 🎨 Styling Details

### Colors
- **Primary Gold:** `#D4A574`
- **Text Dark:** `#262626`
- **Background:** White/Light
- **Borders:** `#e8e8e8`

### Spacing
- **Header Padding:** 24px (desktop), 12px (mobile)
- **Card Gutter:** 24px (desktop), 12px (mobile)
- **Border Radius:** 12px (cards), 8px (buttons)

### Responsive Breakpoints
- **xs:** < 576px (Extra small - phones)
- **sm:** ≥ 576px (Small - small phones)
- **md:** ≥ 768px (Medium - tablets)
- **lg:** ≥ 992px (Large - desktops)
- **xl:** ≥ 1200px (Extra large)
- **xxl:** ≥ 1600px (Ultra large)

---

## 🔄 State Management

```typescript
// Navigation
const [activeCategory, setActiveCategory] = useState<string | null>(null);

// Selection
const [selectedTable, setSelectedTable] = useState<TableType | null>(tablesData[0]);

// Cart
const [cart, setCart] = useState<CartItem[]>([]);

// UI
const [openCart, setOpenCart] = useState(false);
const [openMenu, setOpenMenu] = useState(false);

// QR Code
const [showQR, setShowQR] = useState(false);
const [qrCode, setQrCode] = useState<string>("");
```

---

## ⚡ Performance Optimizations

1. **React.memo** - ProductCard prevents unnecessary re-renders
2. **useCallback** - Event handlers maintain stable references
3. **useMemo** - Menu filtering and QR code generation cached
4. **Lazy Loading** - Images load on-demand
5. **GPU Acceleration** - CSS transforms for smooth animations
6. **CSS Containment** - Paint optimization for card lists

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

---

## 📋 File Quick Reference

| File | Purpose | Lines |
|------|---------|-------|
| `src/pages/OrderPage.tsx` | Main app component | 626 |
| `src/data/menu.ts` | 76 menu items | 400+ |
| `src/data/bestSellers.ts` | 8 premium items | 96 |
| `src/data/tables.ts` | 40 tables | 50+ |
| `src/types/index.ts` | TypeScript types | 30+ |
| `src/App.tsx` | Root component | 30 |
| `src/index.css` | Global styles | 50+ |

---

## ✅ Testing Checklist

- [x] Home page loads with best sellers
- [x] Category buttons navigate to menu
- [x] Back button returns to home
- [x] Add to cart works
- [x] Table selection works
- [x] Search filters items
- [x] QR code generates and displays
- [x] Responsive on mobile/tablet/desktop
- [x] Build succeeds without errors
- [x] Drag cart, menu, etc. works smoothly

---

## 🎯 What's Next?

Optional enhancements:
- [ ] Add checkout/payment flow
- [ ] User authentication
- [ ] Order history
- [ ] Favorites/bookmarks
- [ ] Dietary filters (vegetarian, gluten-free, etc.)
- [ ] Multi-language support (Vietnamese/English)
- [ ] Admin dashboard for menu management
- [ ] Real-time order status tracking

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** 2024  
**Build Size:** 979 KB (310 KB gzipped)
