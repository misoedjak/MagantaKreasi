"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Star,
  CheckCircle,
  EyeOff,
  Trash
} from "lucide-react";
import { deletePortfolio } from "@/app/actions/admin";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  categoryId: string | null;
  category?: { id: string; name: string } | null;
  projectDate: Date | null;
  location: string | null;
  thumbnail: string;
  featured: boolean;
  status: string;
  createdAt: Date;
}

interface PortfolioListProps {
  initialPortfolios: PortfolioItem[];
  categories: { id: string; name: string }[];
}

export function PortfolioList({ initialPortfolios, categories }: PortfolioListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Delete dialog State
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Filter computations
  const filteredProjects = initialPortfolios.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "ALL" || project.categoryId === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (project: PortfolioItem) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!selectedProject) return;

    startTransition(async () => {
      try {
        await deletePortfolio(selectedProject.id);
        toast.success("Portfolio project deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedProject(null);
        router.refresh();
      } catch (err: any) {
        toast.error("Failed to delete project");
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-gray-200"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Label htmlFor="category-select" className="text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0">Category:</Label>
            <select
              id="category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 border border-gray-200 bg-white rounded-xl px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD400]"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <Link href="/admin/portfolio/new" className="inline-flex">
            <Button 
              className="w-full sm:w-auto bg-[#FFD400] text-black hover:bg-[#e6be00] font-semibold h-10 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-100">
              <TableHead className="font-semibold text-gray-700 py-4 pl-6 w-16">Image</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">Title / Category</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">Client</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">Featured</TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                  No portfolio projects found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50/50 border-b border-gray-100">
                  <TableCell className="py-4 pl-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-semibold text-gray-900">{project.title}</div>
                    <div className="text-xs text-gray-500 font-mono">{project.category?.name || 'Uncategorized'}</div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="text-sm text-gray-800">{project.client || "Not Specified"}</div>
                    <div className="text-xs text-gray-500">
                      {project.projectDate ? new Date(project.projectDate).toLocaleDateString() : "No Date"}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {project.status === "published" ? (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                        <CheckCircle className="h-3 w-3" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-gray-100 text-gray-800 flex items-center gap-1 w-max">
                        <EyeOff className="h-3 w-3" />
                        <span>Draft</span>
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    {project.featured ? (
                      <span className="flex items-center gap-1 text-xs text-[#FFD400] font-semibold">
                        <Star className="h-4 w-4 fill-current text-[#FFD400]" />
                        <span>Yes</span>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">No</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/portfolio/edit/${project.id}`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-500 hover:text-gray-900 rounded-lg"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        onClick={() => handleDeleteClick(project)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md bg-white text-gray-900 rounded-2xl border-none shadow-xl">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-lg font-bold text-red-600 flex items-center gap-2">
              <Trash className="h-5 w-5" />
              <span>Delete Portfolio Project</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the project <strong>{selectedProject?.title}</strong>? This action cannot be undone and will delete all associated media.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteOpen(false)}
              disabled={isPending}
              className="border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={handleDeleteSubmit}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
