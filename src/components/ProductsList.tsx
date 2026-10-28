"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Search, Tag, Info } from "lucide-react";

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

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  whatsappNumber: string;
}

export default function ProductsList({ products, categories, whatsappNumber }: ProductsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset page count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "semua" || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    }).format(price).replace("IDR", "Rp");
  };

  const handleInquiry = (productName: string, priceStr: string) => {
    let cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.startsWith("0")) {
      cleanNumber = "62" + cleanNumber.substring(1);
    }
    const message = encodeURIComponent(`Halo Maganta Kreasi, saya tertarik untuk menyewa/memesan produk berikut:\n\n*Produk:* ${productName}\n*Harga:* ${priceStr}\n\nMohon informasi ketersediaan dan detail pemesanannya. Terima kasih!`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="w-full">
      {/* Search & Category Filter Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory("semua")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "semua"
                ? "bg-[#be3168] text-white shadow-md shadow-[#be3168]/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
            }`}
          >
            Semua Produk ({products.filter(p => p.status === 'active').length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id && p.status === "active").length;
            if (count === 0) return null; // Only show active categories
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#be3168] text-white shadow-md shadow-[#be3168]/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-white border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be3168]/20 focus:border-[#be3168]"
          />
        </div>
      </div>

      {/* Results Count Feedback */}
      <div className="mb-6 flex justify-between items-center text-xs text-gray-500">
        <span>Menampilkan {Math.min(visibleCount, filteredProducts.length)} dari {filteredProducts.length} produk</span>
        {filteredProducts.length > 0 && (
          <span>Halaman 1 dari {Math.ceil(filteredProducts.length / 12)}</span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Info size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">Tidak ada produk yang cocok dengan kriteria pencarian Anda.</p>
        </div>
      ) : (
        <div className="space-y-12">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product) => {
                const formattedPrice =
                  product.price > 0
                    ? `${formatPrice(product.price)} / ${product.priceUnit}`
                    : "Custom / Hubungi Tim";
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200/80 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full bg-gray-50 overflow-hidden flex items-center justify-center shrink-0 border-b border-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-300 gap-1.5">
                        <Tag size={28} />
                        <span className="text-xs">Tidak Ada Gambar</span>
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-[#FFD400] text-black font-semibold text-xs px-2.5 py-1 rounded-full shadow-sm">
                        Sewa Terbaik
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-xs font-semibold text-[#be3168]/80 tracking-wider uppercase mb-1.5 block">
                      {product.category.name}
                    </span>
                    <h3 className="font-heading font-bold text-gray-900 group-hover:text-[#be3168] transition-colors mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                      {product.description || "Perlengkapan sewa premium dari Maganta Kreasi. Hubungi kami untuk harga khusus."}
                    </p>

                    {/* Price and Action */}
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex flex-col gap-3">
                        <div>
                          <span className="text-xs text-gray-400 block font-medium">Harga Sewa</span>
                          <span className="text-[#be3168] font-bold text-base md:text-lg">
                            {product.price > 0 ? (
                              <>
                                {formatPrice(product.price)}
                                <span className="text-xs text-gray-500 font-medium"> / {product.priceUnit}</span>
                              </>
                            ) : (
                              "Custom / Hubungi Tim"
                            )}
                          </span>
                        </div>
                        <button
                          onClick={() => handleInquiry(product.name, formattedPrice)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20ba56] hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#25D366]/10 transition-all duration-200"
                        >
                          <MessageSquare size={14} /> Hubungi WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length > visibleCount && (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-3.5 rounded-full bg-white text-gray-700 border border-gray-200 hover:border-brand-magenta hover:text-brand-magenta hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-sm shadow-sm"
            >
              Muat Lebih Banyak Produk ({filteredProducts.length - visibleCount} tersisa)
            </button>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
