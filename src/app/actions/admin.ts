"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

// Helper to enforce session and role security
async function requireAuth(allowedRoles?: string[]) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
  return session;
}

// ----------------------------------------------------
// CATEGORIES ACTIONS
// ----------------------------------------------------

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable().optional(),
  features: z.string().nullable().optional(),
  bgImageUrl: z.string().nullable().optional(),
});

export async function createCategory(data: z.infer<typeof categorySchema>) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  const parsed = categorySchema.parse(data);

  const category = await prisma.category.create({
    data: parsed,
  });

  revalidatePath("/admin/categories");
  return category;
}

export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  const parsed = categorySchema.parse(data);

  const category = await prisma.category.update({
    where: { id },
    data: parsed,
  });

  revalidatePath("/admin/categories");
  return category;
}

export async function deleteCategory(id: string) {
  await requireAuth(["SUPER_ADMIN", "ADMIN"]);
  
  // Prevent deletion if category is assigned to portfolios
  const hasPortfolios = await prisma.portfolio.count({
    where: { categoryId: id },
  });
  if (hasPortfolios > 0) {
    throw new Error("Cannot delete category with associated projects.");
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  return { success: true };
}

// ----------------------------------------------------
// PORTFOLIO ACTIONS
// ----------------------------------------------------

const portfolioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  client: z.string().nullable().optional(),
  categoryId: z.string().min(1, "Category is required"),
  projectDate: z.date().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  videoUrl: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  status: z.string().default("draft"),
  seoTitle: z.string().nullable().optional(),
  seoDesc: z.string().nullable().optional(),
  images: z.array(z.string()).optional(), // List of image URLs
});

export async function createPortfolio(data: z.infer<typeof portfolioSchema>) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  const { images, ...rest } = portfolioSchema.parse(data);

  const portfolio = await prisma.portfolio.create({
    data: {
      ...rest,
      client: rest.client || null,
      location: rest.location || null,
      seoTitle: rest.seoTitle || null,
      seoDesc: rest.seoDesc || null,
      images: images && images.length > 0 ? {
        create: images.map((url, idx) => ({
          url,
          order: idx,
        })),
      } : undefined,
    },
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return portfolio;
}

export async function updatePortfolio(id: string, data: z.infer<typeof portfolioSchema>) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  const { images, ...rest } = portfolioSchema.parse(data);

  // Use a transaction to clean up images and update portfolio details
  const portfolio = await prisma.$transaction(async (tx) => {
    // Delete existing gallery images
    await tx.portfolioImage.deleteMany({
      where: { portfolioId: id },
    });

    // Update details
    return await tx.portfolio.update({
      where: { id },
      data: {
        ...rest,
        client: rest.client || null,
        location: rest.location || null,
        seoTitle: rest.seoTitle || null,
        seoDesc: rest.seoDesc || null,
        images: images && images.length > 0 ? {
          create: images.map((url, idx) => ({
            url,
            order: idx,
          })),
        } : undefined,
      },
    });
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return portfolio;
}

export async function deletePortfolio(id: string) {
  await requireAuth(["SUPER_ADMIN", "ADMIN"]);
  
  await prisma.portfolio.delete({
    where: { id },
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}

// ----------------------------------------------------
// QUOTE REQUESTS ACTIONS
// ----------------------------------------------------

export async function updateQuoteStatus(id: string, status: string) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  
  const quote = await prisma.quoteRequest.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/quotes");
  return quote;
}

export async function deleteQuote(id: string) {
  await requireAuth(["SUPER_ADMIN", "ADMIN"]);
  
  await prisma.quoteRequest.delete({
    where: { id },
  });

  revalidatePath("/admin/quotes");
  return { success: true };
}

// ----------------------------------------------------
// COMPANY PROFILE ACTIONS
// ----------------------------------------------------

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  vision: z.string().nullable().optional(),
  mission: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  phoneName: z.string().nullable().optional(),
  phone2: z.string().nullable().optional(),
  phone2Name: z.string().nullable().optional(),
  email: z.string().email("Invalid email").nullable().optional().or(z.literal("")),
  mapUrl: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  whatsappName: z.string().nullable().optional(),
  whatsapp2: z.string().nullable().optional(),
  whatsapp2Name: z.string().nullable().optional(),
});

export async function updateCompanyProfile(id: string, data: z.infer<typeof profileSchema>) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  const parsed = profileSchema.parse(data);

  // Normalize blank email to null
  const emailValue = parsed.email || null;

  const profile = await prisma.companyProfile.update({
    where: { id },
    data: {
      ...parsed,
      email: emailValue,
    },
  });

  revalidatePath("/admin/profile");
  revalidatePath("/");
  return profile;
}

// ----------------------------------------------------
// SETTINGS ACTIONS
// ----------------------------------------------------

const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  logoUrl: z.string().nullable().optional(),
  faviconUrl: z.string().nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDesc: z.string().nullable().optional(),
  gaId: z.string().nullable().optional(),
});

export async function updateSettings(id: string, data: z.infer<typeof settingsSchema>) {
  await requireAuth(["SUPER_ADMIN", "ADMIN"]);
  const parsed = settingsSchema.parse(data);

  const settings = await prisma.settings.update({
    where: { id },
    data: parsed,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return settings;
}

// ----------------------------------------------------
// GALLERY ACTIONS
// ----------------------------------------------------

export async function addGalleryImage(url: string) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);
  
  // Find highest order to place image at the end
  const maxOrder = await prisma.gallery.aggregate({
    _max: { order: true }
  });
  const order = (maxOrder._max.order ?? -1) + 1;

  const image = await prisma.gallery.create({
    data: { url, order }
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return image;
}

export async function deleteGalleryImage(id: string) {
  await requireAuth(["SUPER_ADMIN", "ADMIN"]);
  
  await prisma.gallery.delete({
    where: { id }
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function reorderGallery(images: { id: string; order: number }[]) {
  await requireAuth(["SUPER_ADMIN", "ADMIN", "EDITOR"]);

  await prisma.$transaction(
    images.map((img) =>
      prisma.gallery.update({
        where: { id: img.id },
        data: { order: img.order },
      })
    )
  );

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  return { success: true };
}

// ----------------------------------------------------
// USER ACTIONS
// ----------------------------------------------------

const userSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().nullable().optional(),
  role: z.string().default("ADMIN"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
});

export async function createUser(data: z.infer<typeof userSchema>) {
  await requireAuth(["SUPER_ADMIN"]);
  const { password, ...rest } = userSchema.parse(data);

  if (!password) {
    throw new Error("Password is required for new users");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });

  revalidatePath("/admin/users");
  return user;
}

export async function updateUser(id: string, data: z.infer<typeof userSchema>) {
  await requireAuth(["SUPER_ADMIN"]);
  const { password, ...rest } = userSchema.parse(data);

  const updateData: any = { ...rest };
  if (password && password.length > 0) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/users");
  return user;
}

export async function deleteUser(id: string) {
  const session = await requireAuth(["SUPER_ADMIN"]);
  
  // Prevent self-deletion
  if (session.user.id === id) {
    throw new Error("You cannot delete your own account.");
  }

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
  return { success: true };
}
