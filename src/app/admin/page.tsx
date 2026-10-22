import { prisma } from "@/lib/db";
import Link from "next/link";
import { 
  Briefcase, 
  FolderTree, 
  Mail, 
  Users, 
  Plus, 
  Eye, 
  Edit,
  TrendingUp,
  Clock,
  ArrowRight
} from "lucide-react";

export const revalidate = 0; // Disable server component caching

export default async function AdminDashboardPage() {
  // Fetch real-time database counts
  const totalProjects = await prisma.portfolio.count();
  const totalCategories = await prisma.category.count();
  const totalQuotes = await prisma.quoteRequest.count();
  const fakeVisitors = 1420; // Placeholder analytics

  // Fetch recent activities
  const recentProjects = await prisma.portfolio.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  const recentQuotes = await prisma.quoteRequest.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  const kpis = [
    { name: "Total Proyek", value: totalProjects, icon: Briefcase, color: "bg-blue-500" },
    { name: "Kategori", value: totalCategories, icon: FolderTree, color: "bg-purple-500" },
    { name: "Permintaan Penawaran", value: totalQuotes, icon: Mail, color: "bg-amber-500" },
    { name: "Estimasi Pengunjung Bulanan", value: fakeVisitors, icon: Users, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ringkasan Dashboard</h1>
          <p className="text-gray-500 mt-1">Status waktu nyata dari platform fabrikasi event Anda.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/admin/portfolio/new" 
            className="flex items-center gap-2 bg-[#FFD400] text-black font-semibold px-4 py-2 rounded-xl text-sm shadow-md shadow-[#FFD400]/10 hover:bg-[#e6be00] transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Portofolio</span>
          </Link>
          <Link 
            href="/admin/quotes" 
            className="flex items-center gap-2 bg-gray-900 text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-all"
          >
            <Eye className="h-4 w-4" />
            <span>Lihat Penawaran</span>
          </Link>
          <Link 
            href="/admin/profile" 
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition-all"
          >
            <Edit className="h-4 w-4" />
            <span>Ubah Profil</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{kpi.name}</p>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <div className={`p-4 rounded-xl text-white ${kpi.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Quote Requests (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-lg text-gray-900">Permintaan Penawaran Terbaru</h2>
            </div>
            <Link href="/admin/quotes" className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1">
              <span>Lihat Semua</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentQuotes.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Belum ada permintaan penawaran yang diterima.
              </div>
            ) : (
              recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{quote.contact}</p>
                    <p className="text-xs text-gray-500">{quote.company || "Tanpa Perusahaan"} &bull; {quote.eventType || "Umum"}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      quote.status === "NEW" ? "bg-blue-100 text-blue-800" :
                      quote.status === "CONTACTED" ? "bg-amber-100 text-amber-800" :
                      quote.status === "QUOTED" ? "bg-purple-100 text-purple-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {quote.status}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Portfolios Added (Takes 1 column) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-lg text-gray-900">Proyek Terbaru</h2>
            </div>
            <Link href="/admin/portfolio" className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1">
              <span>Lihat Semua</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Belum ada proyek portofolio yang ditambahkan.
              </div>
            ) : (
              recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                    <img 
                      src={project.thumbnail || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=150&q=80"} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{project.title}</p>
                    <p className="text-xs text-gray-500 truncate">{project.category?.name || 'Uncategorized'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
