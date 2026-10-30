# Design Critique: Equipment Rental Catalog (`/products`)

Method: dual-agent (A: a5178885-2fdf-493f-85b7-2d81ec37f0e1 · B: 6ee5b148-01b6-48f1-b74b-7d9f3d9fbe3a)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Menampilkan jumlah produk aktif dan hitungan per kategori, namun belum ada visual loading state saat filter berganti. |
| 2 | Match System / Real World | 3/4 | Nomenklatur produk sewa Indonesia sudah tepat dan akurat, namun header banner masih berbahasa Inggris ("Equipment Rental / Premium Event Catalog"). |
| 3 | User Control and Freedom | 3/4 | Pemilihan kategori instan dan reset "Semua Produk" lancar, namun input pencarian belum memiliki tombol 'Clear' (X) instan. |
| 4 | Consistency and Standards | 2/4 | Campuran bahasa (Header Inggris vs Konten Indonesia), tag `<img>` biasa alih-alih `next/image`, dan inline hex `#be3168` alih-alih token Tailwind. |
| 5 | Error Prevention | 3/4 | Empty state ramah saat pencarian nihil, namun belum ada tombol 1-klik "Reset Filter". |
| 6 | Recognition Rather Than Recall | 3/4 | Foto peralatan asli dan harga sewa jelas, namun belum ada fitur seleksi multi-item (keranjang estimasi sewa) untuk EO. |
| 7 | Flexibility and Efficiency | 2/4 | 15 pill kategori membungkus (*wrap*) menjadi 3-4 baris bertumpuk di mobile; pagination memerlukan klik berkali-kali. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Tampilan terang bersih, namun barisan kategori yang bertumpuk menciptakan 'wall of pills' yang mendominasi viewport sebelum kartu produk terlihat. |
| 9 | Error Recovery | 3/4 | Pesan saat produk tidak ditemukan jelas dan komunikatif. |
| 10 | Help and Documentation | 3/4 | Tombol langsung WhatsApp di setiap kartu sangat responsif untuk inquiry, namun info syarat sewa/kebijakan load-in belum tercantum. |
| **Total** | | **28/40** | **Moderate Quality (Production-Functional with Clear Refinement Needs)** |

## Design Specificity Verdict

- **LLM Assessment**: Halaman katalog `/products` sudah berfungsi dengan baik sebagai inventaris sewa perlengkapan panggung, namun karakternya saat ini masih terasa seperti etalase toko retail biasa (mirip toko e-commerce produk fisik umum) daripada katalog vendor fabrikasi panggung dan kontraktor event B2B terkemuka. Headline banner berbahasa Inggris terputus dari audiens korporat lokal Indonesia yang menjadi target utama.
- **Deterministic Scan (`detect.mjs`)**: Exit code 0 (`[]`). Tidak ada pelanggaran mekanikal kritis (kontras warna WCAG AA terpenuhi, tidak ada font di bawah 12px, tidak ada shadow blur 0).
- **Technical & Accessibility Inspection**:
  1. Input pencarian tidak memiliki atribut `aria-label` eksplisit (WCAG 4.1.2).
  2. Gambar produk menggunakan tag `<img>` natif tanpa optimasi `next/image` (`fill`, `sizes`, `srcset`).
  3. Warna inline hardcoded (`#be3168`, `#FFD400`, `#25D366`) menduplikasi token Tailwind yang sudah didefinisikan di `globals.css` (`brand-magenta`, `brand-yellow`, `brand-whatsapp`).

## Overall Impression
Katalog memiliki fondasi inventaris yang sangat kuat (48 produk lengkap dengan spesifikasi teknis dan foto asli berkualitas tinggi). Namun, navigasi kategori 15 tombol yang bertumpuk (*flex-wrap*) dan header berbahasa Inggris mengurangi kesan premium dan efisiensi belanja bagi Event Organizer profesional yang membutuhkan pencarian cepat.

## What's Working
1. **Foto Produk Riil & Akurat**: Seluruh 48 perlengkapan pameran kini menampilkan foto peralatan asli bersolusi tinggi (4:3) tanpa broken image atau ilustrasi generic.
2. **Koneksi Direct WhatsApp yang Pintar**: Tombol WhatsApp di setiap kartu langsung memformat template pesan pemesanan spesifik produk dan harga sewa terkait, memangkas friksi B2B sales.
3. **Penyajian Harga Fleksibel**: Pemisahan jelas antara item bermetrik pasti (Rp/unit, Rp/meter) dan item konsultasi paket (*Custom / Hubungi Tim*) menjaga kredibilitas vendor.

## Priority Issues

### [P1] Tumpukan 15 Pill Kategori (Mobile & Tablet Friction)
- **Why it matters**: 15 tombol kategori dengan `flex-wrap` bertumpuk menjadi 3 hingga 4 baris di layar mobile dan tablet, menyita hingga 40% tinggi layar sebelum pengunjung melihat satu pun kartu produk.
- **Fix**: Ubah wadah kategori menjadi horizontal scroll baris tunggal dengan `overflow-x-auto snap-x scrollbar-none` (seperti yang sudah sukses diterapkan di section Portofolio).
- **Suggested command**: `/impeccable layout`

### [P1] Inkonsistensi Bahasa & Hirarki Header Banner
- **Why it matters**: Banner menggunakan bahasa Inggris (*"Premium Event Catalog"*, *"Equipment Rental"*, *"Professional-grade event equipment..."*), sementara seluruh produk, filter, tombol CTA (*"Sewa"*, *"Hubungi WhatsApp"*), dan navbar menggunakan bahasa Indonesia. Ini membingungkan target klien BUMN dan korporat lokal.
- **Fix**: Selaraskan teks hero ke bahasa Indonesia editorial yang berwibawa: *"Katalog Penyewaan Peralatan Event & Produksi"* lengkap dengan deskripsi kesiapan workshop in-house.
- **Suggested command**: `/impeccable clarify`

### [P2] Penggunaan Tag `<img>` Mentah alih-alih `next/image`
- **Why it matters**: Menggunakan tag `<img>` biasa membypass kompresi otomatis Next.js (WebP/AVIF) dan fitur *responsive sizes*, menyebabkan browser mengunduh gambar ukuran penuh yang memperlambat LCP di koneksi seluler.
- **Fix**: Ganti dengan komponen `Image` dari `next/image` dengan `fill`, `sizes`, dan `priority` pada 4 item pertama di viewport.
- **Suggested command**: `/impeccable optimize`

### [P2] Aksesibilitas Input Pencarian (Missing Accessible Name)
- **Why it matters**: Kolom input pencarian tidak memiliki `<label>` terhubung maupun `aria-label`, melanggar kriteria WCAG 2.1 AA (4.1.2 Name, Role, Value) bagi pengguna screen reader.
- **Fix**: Tambahkan `aria-label="Cari peralatan sewa event"` dan tombol pembersih pencarian (*clear button* `X`) saat input terisi.
- **Suggested command**: `/impeccable harden`

### [P3] Standarisasi Token Tailwind
- **Why it matters**: Menggunakan kelas arbitrary `bg-[#be3168]` dan `bg-[#25D366]` menyulitkan pemeliharaan tema terpusat.
- **Fix**: Refactor ke `bg-brand-magenta`, `text-brand-magenta`, `bg-brand-whatsapp`, dan `text-brand-yellow`.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

- **Rina (Corporate Event Producer - Tight Deadline)**: Membuka website lewat smartphone saat meeting lokasi. Tertahan oleh 4 baris tombol kategori yang memenuhi layar. Ingin menyewa 5 jenis barang sekaligus (Genset, Tenda, Kursi, Videotron) tetapi harus membuka WhatsApp terpisah 5 kali karena belum ada sistem rangkuman paket / multi-item quote.
- **Hendra (BUMN Procurement Officer)**: Memerlukan rincian teknis kapasitas daya dan sertifikasi keselamatan untuk diajukan ke atasan. Tidak menemukan info batasan minimum sewa, durasi sewa, atau ketentuan instalasi/load-in panggung.
- **Alex (First-Timer Event Organizer)**: Bingung saat membaca "Equipment Rental" di atas tetapi di bawah semua berbahasa Indonesia. Mencari item di search bar tapi tidak ada tombol silang (X) untuk menghapus kata kunci pencarian.

## Minor Observations
- Filter kategori aktif saat ini menggunakan warna magenta dengan border; akan lebih kontras dan mudah dikenali jika badge kategori aktif memiliki aksen dot kuning atau kontras teks lebih tegas.
- Tombol *"Muat Lebih Banyak Produk"* hanya menambah 12 item. Mengingat total produk 48 item, opsi tombol *"Tampilkan Semua"* atau *items per page* selector akan sangat membantu power user.

## Questions to Consider
- *"Bagaimana jika pengunjung bisa memilih beberapa item sekaligus dan mengirim satu draft daftar kebutuhan sewa ke WhatsApp dalam satu klik?"*
- *"Apakah barisan kategori lebih nyaman jika disajikan sebagai tab slider 1 baris yang rapi atau dropdown filter bertingkat?"*
