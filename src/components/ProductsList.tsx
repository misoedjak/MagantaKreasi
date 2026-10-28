"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Search,
  Tag,
  Info,
  X,
  Plus,
  Minus,
  Trash2,
  ClipboardList,
  Calendar,
  MapPin,
  FileText,
  ChevronRight,
  Check,
  RotateCcw
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceUnit: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  status: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  whatsappNumber: string;
}

export default function ProductsList({ products, categories, whatsappNumber }: ProductsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Multi-Item Rental Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventNotes, setEventNotes] = useState("");

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

  // Lock body scroll when modal drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "semua" || product.categoryId === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch && product.status === "active";
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("IDR", "Rp");
  };

  const getCleanWhatsappNumber = () => {
    let clean = whatsappNumber.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) {
      clean = "62" + clean.substring(1);
    }
    return clean || "6282115151515";
  };

  // Direct single-product inquiry
  const handleSingleInquiry = (productName: string, priceStr: string) => {
    const cleanNumber = getCleanWhatsappNumber();
    const message = encodeURIComponent(
      `Halo Maganta Kreasi, saya tertarik untuk menyewa/memesan peralatan berikut:\n\n*Produk:* ${productName}\n*Harga:* ${priceStr}\n\nMohon informasi ketersediaan tanggal dan detail pemesanannya. Terima kasih!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (productId: string) => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  // Calculations for Multi-Item Cart
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimatedPrice = cart.reduce((sum, item) => {
    return sum + (item.product.price > 0 ? item.product.price * item.quantity : 0);
  }, 0);
  const hasCustomItems = cart.some((item) => item.product.price === 0);

  // Send entire multi-item quotation to WhatsApp
  const handleCheckoutToWhatsApp = () => {
    if (cart.length === 0) return;

    const cleanNumber = getCleanWhatsappNumber();
    let messageText = `Halo Maganta Kreasi, saya ingin mengajukan penawaran estimasi sewa untuk daftar peralatan berikut:\n\n`;
    messageText += `📋 *DAFTAR PERALATAN SEWA:*\n`;

    cart.forEach((item, index) => {
      const priceText =
        item.product.price > 0
          ? `${formatPrice(item.product.price)} / ${item.product.priceUnit} (Subtotal: ${formatPrice(
              item.product.price * item.quantity
            )})`
          : `Custom / Hubungi Tim`;
      messageText += `${index + 1}. *${item.product.name}*\n   - Qty: ${item.quantity} ${item.product.priceUnit}\n   - Tarif: ${priceText}\n`;
    });

    messageText += `\n📊 *RINGKASAN ESTIMASI:*\n`;
    messageText += `• Total Item: ${cart.length} jenis (${totalUnits} unit)\n`;
    messageText += `• Estimasi Subtotal Sewa: *${formatPrice(totalEstimatedPrice)}*${
      hasCustomItems ? " (+ item custom/paket)" : ""
    }\n`;

    if (eventDate.trim() || eventLocation.trim() || eventNotes.trim()) {
      messageText += `\n📍 *INFORMASI EVENT:*\n`;
      if (eventDate.trim()) messageText += `• Tanggal Pelaksanaan: ${eventDate.trim()}\n`;
      if (eventLocation.trim()) messageText += `• Lokasi/Venue: ${eventLocation.trim()}\n`;
      if (eventNotes.trim()) messageText += `• Catatan Khusus: ${eventNotes.trim()}\n`;
    }

    messageText += `\nMohon konfirmasi ketersediaan jadwal, penawaran resmi, dan detail pengiriman/instalasi. Terima kasih!`;

    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="w-full relative">
      {/* Search & Category Filter Section */}
      <div className="flex flex-col lg:flex-row gap-5 justify-between items-stretch lg:items-center mb-8">
        {/* Category Tabs: Horizontal Scroll with Snap on Mobile, Wrap on Desktop */}
        <div className="w-full lg:max-w-4xl overflow-x-auto scrollbar-none snap-x py-1">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory("semua")}
              className={`snap-start px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === "semua"
                  ? "bg-brand-magenta text-white shadow-md shadow-brand-magenta/25"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-brand-magenta/40 hover:bg-gray-50"
              }`}
            >
              Semua ({products.filter((p) => p.status === "active").length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id && p.status === "active").length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-brand-magenta text-white shadow-md shadow-brand-magenta/25"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-brand-magenta/40 hover:bg-gray-50"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessible Search Bar with Clear Button */}
        <div className="relative w-full lg:w-80 shrink-0">
          <label htmlFor="product-search" className="sr-only">
            Cari peralatan sewa event
          </label>
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
            aria-hidden="true"
          />
          <input
            id="product-search"
            type="text"
            placeholder="Cari alat (genset, tenda, sound)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari peralatan sewa event"
            className="w-full h-11 pl-10 pr-10 bg-white border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 focus:border-brand-magenta shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Results Feedback Header */}
      <div className="mb-6 flex flex-wrap justify-between items-center text-xs text-gray-500 gap-2">
        <span className="font-medium">
          Menampilkan <span className="text-gray-900 font-bold">{Math.min(visibleCount, filteredProducts.length)}</span> dari{" "}
          <span className="text-gray-900 font-bold">{filteredProducts.length}</span> peralatan sewa
        </span>
        {searchQuery && (
          <span className="bg-brand-yellow/30 text-gray-800 px-2.5 py-1 rounded-md text-xs font-medium">
            Hasil pencarian: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
          <Info size={44} className="mx-auto text-gray-300 mb-4" />
          <h3 className="font-heading font-bold text-gray-800 text-lg mb-2">Peralatan Tidak Ditemukan</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Tidak ada perlengkapan yang sesuai dengan filter atau kata kunci &ldquo;{searchQuery}&rdquo;. Silakan reset
            pencarian atau hubungi tim kami untuk permintaan kustom.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("semua");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-magenta text-white font-medium text-xs hover:bg-brand-magenta-hover transition-colors shadow-sm"
          >
            <RotateCcw size={14} /> Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product, idx) => {
                const qtyInCart = getItemQuantity(product.id);
                const formattedPrice =
                  product.price > 0
                    ? `${formatPrice(product.price)} / ${product.priceUnit}`
                    : "Custom / Hubungi Tim";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    key={product.id}
                    className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col h-full ${
                      qtyInCart > 0
                        ? "border-brand-magenta ring-2 ring-brand-magenta/15 shadow-lg"
                        : "border-gray-100 hover:shadow-xl hover:border-gray-200/90"
                    }`}
                  >
                    {/* Image Container with Next.js Image Optimization */}
                    <div className="relative aspect-square w-full bg-brand-gray overflow-hidden flex items-center justify-center shrink-0 border-b border-gray-100">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority={idx < 4}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400 gap-1.5">
                          <Tag size={28} />
                          <span className="text-xs font-medium">Foto Segera Hadir</span>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-brand-yellow text-brand-dark font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                          Sewa Terbaik
                        </div>
                      )}

                      {/* In-Cart Indicator Pill */}
                      {qtyInCart > 0 && (
                        <div className="absolute top-3 right-3 bg-brand-magenta text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Check size={12} strokeWidth={3} /> {qtyInCart} di daftar
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-[11px] font-semibold text-brand-magenta tracking-wider uppercase mb-1.5 block">
                        {product.category.name}
                      </span>
                      <h3 className="font-heading font-bold text-gray-900 group-hover:text-brand-magenta transition-colors mb-2 line-clamp-1 text-base">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                        {product.description ||
                          "Perlengkapan sewa berstandar produksi profesional dari Maganta Kreasi. Hubungi kami untuk penawaran jadwal."}
                      </p>

                      {/* Price & Action Row */}
                      <div className="pt-4 border-t border-gray-100 mt-auto">
                        <div className="mb-3.5">
                          <span className="text-[11px] text-gray-400 block font-medium uppercase tracking-wider">
                            Tarif Sewa
                          </span>
                          <span className="text-brand-magenta font-bold text-base md:text-lg">
                            {product.price > 0 ? (
                              <>
                                {formatPrice(product.price)}
                                <span className="text-xs text-gray-500 font-normal"> / {product.priceUnit}</span>
                              </>
                            ) : (
                              "Custom / Hubungi Tim"
                            )}
                          </span>
                        </div>

                        {/* Interactive Action Controls */}
                        <div className="flex flex-col gap-2">
                          {/* Multi-Item Cart Stepper / Add Button */}
                          {qtyInCart > 0 ? (
                            <div className="flex items-center justify-between bg-brand-magenta/5 border border-brand-magenta/30 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(product.id, -1)}
                                aria-label="Kurangi jumlah"
                                className="w-8 h-8 rounded-lg bg-white text-brand-magenta font-bold flex items-center justify-center hover:bg-brand-magenta hover:text-white transition-colors shadow-sm"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-heading font-bold text-sm text-brand-magenta">
                                {qtyInCart} {product.priceUnit}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, 1)}
                                aria-label="Tambah jumlah"
                                className="w-8 h-8 rounded-lg bg-brand-magenta text-white font-bold flex items-center justify-center hover:bg-brand-magenta-hover transition-colors shadow-sm"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-brand-dark text-white font-semibold text-xs hover:bg-brand-magenta hover:shadow-md transition-all duration-200"
                            >
                              <Plus size={14} /> Tambah ke Daftar Sewa
                            </button>
                          )}

                          {/* Direct 1-Item Instant WhatsApp Inquiry */}
                          <button
                            onClick={() => handleSingleInquiry(product.name, formattedPrice)}
                            aria-label={`Tanya langsung tentang ${product.name} via WhatsApp`}
                            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-whatsapp/10 text-brand-whatsapp font-semibold text-xs hover:bg-brand-whatsapp hover:text-white transition-all duration-200"
                          >
                            <MessageSquare size={13} /> Tanya Satuan via WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Load More Pagination */}
          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-8 py-3.5 rounded-full bg-white text-gray-700 border border-gray-200 hover:border-brand-magenta hover:text-brand-magenta hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-sm shadow-sm cursor-pointer"
              >
                Muat Lebih Banyak Produk ({filteredProducts.length - visibleCount} tersisa)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Bottom Bar: Multi-Item Rental Estimator Trigger */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-40 md:w-full md:max-w-xl"
          >
            <div className="bg-brand-dark/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-magenta flex items-center justify-center text-white shrink-0 relative">
                  <ClipboardList size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-yellow text-brand-dark text-[10px] font-black rounded-full flex items-center justify-center border-2 border-brand-dark">
                    {cart.length}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-300 font-medium truncate">
                    {cart.length} jenis alat ({totalUnits} unit)
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {totalEstimatedPrice > 0 ? formatPrice(totalEstimatedPrice) : "Estimasi Custom"}
                    {hasCustomItems && totalEstimatedPrice > 0 && (
                      <span className="text-[11px] text-brand-yellow font-normal"> + custom</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-magenta text-white font-semibold text-xs sm:text-sm hover:bg-brand-magenta-hover transition-colors shadow-md shadow-brand-magenta/30 cursor-pointer"
                >
                  Lihat Estimasi <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-Up Drawer Modal: Complete Rental Quotation Review */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-magenta/10 text-brand-magenta flex items-center justify-center">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-gray-900 text-base sm:text-lg">
                      Daftar Estimasi Sewa
                    </h2>
                    <p className="text-xs text-gray-500">
                      {cart.length} jenis perlengkapan dipilih ({totalUnits} total unit)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearCart}
                    title="Kosongkan keranjang"
                    className="text-xs text-gray-400 hover:text-red-500 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 font-medium"
                  >
                    <Trash2 size={13} /> Kosongkan
                  </button>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    aria-label="Tutup rincian"
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="px-6 py-4 overflow-y-auto space-y-4 max-h-[50vh] sm:max-h-[55vh]">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ClipboardList size={36} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Daftar estimasi sewa masih kosong.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Tag size={16} />
                          </div>
                        )}
                      </div>

                      {/* Info & Line Subtotal */}
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] font-semibold text-brand-magenta uppercase tracking-wider block">
                          {item.product.category.name}
                        </span>
                        <h4 className="font-heading font-bold text-gray-900 text-sm truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.product.price > 0 ? (
                            <>
                              {formatPrice(item.product.price)} / {item.product.priceUnit}
                            </>
                          ) : (
                            <span className="text-brand-magenta font-medium">Custom / Konsultasi</span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Kurangi"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Tambah"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[11px] text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={11} /> Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* Optional Event Details Form */}
                {cart.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 space-y-3">
                    <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      Detail Kebutuhan Event (Opsional)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-gray-500 mb-1 flex items-center gap-1">
                          <Calendar size={12} /> Tanggal Pelaksanaan
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 15-17 Nov 2026"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-magenta"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-gray-500 mb-1 flex items-center gap-1">
                          <MapPin size={12} /> Lokasi / Venue
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: ICE BSD / Jakarta"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-magenta"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-gray-500 mb-1 flex items-center gap-1">
                        <FileText size={12} /> Catatan Khusus
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Butuh teknisi standby / loading malam"
                        value={eventNotes}
                        onChange={(e) => setEventNotes(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-magenta"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Summary & WhatsApp Submit */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/60 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-xs text-gray-500 font-medium block">
                        Estimasi Subtotal Sewa Alat:
                      </span>
                      <span className="text-[11px] text-gray-400">
                        *Belum termasuk mobilisasi / teknisi panggung jika diperlukan
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold font-heading text-brand-magenta">
                        {totalEstimatedPrice > 0 ? formatPrice(totalEstimatedPrice) : "Hubungi Tim"}
                      </span>
                      {hasCustomItems && totalEstimatedPrice > 0 && (
                        <div className="text-[11px] text-amber-600 font-medium">
                          + konsultasi item paket kustom
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutToWhatsApp}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-brand-whatsapp text-white font-bold text-sm sm:text-base hover:bg-brand-whatsapp-hover shadow-lg shadow-brand-whatsapp/20 transition-all cursor-pointer"
                  >
                    <MessageSquare size={18} /> Kirim Rincian Sewa ke WhatsApp (1 Klik)
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
