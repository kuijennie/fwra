"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { RoleGuard } from "@/components/auth/role-guard";
import { Id } from "@/convex/_generated/dataModel";
import {
  Tag,
  Phone,
  WhatsappLogo,
  Plus,
  CircleNotch as Loader2,
  CheckCircle,
  Trash,
  ArrowLeft,
  Package,
} from "@phosphor-icons/react";
import { Link } from "@/lib/i18n/navigation";

const B = "#06402B";
const PRODUCT_TYPES = [
  "compost",
  "biogas_slurry",
  "silage",
  "mulch",
  "animal_feed",
  "vermicompost",
  "bio_fertilizer",
  "other",
] as const;

const COUNTIES = [
  "nairobi","mombasa","kisumu","nakuru","kiambu","machakos","kajiado",
  "murang_a","nyeri","meru","embu","kakamega","bungoma","uasin_gishu",
  "trans_nzoia","nandi","kericho","bomet","narok","laikipia","nyandarua",
  "kirinyaga","tharaka_nithi","kitui","makueni","kilifi","kwale",
  "taita_taveta","lamu","tana_river","garissa","wajir","mandera",
  "marsabit","isiolo","samburu","turkana","west_pokot","elgeyo_marakwet",
  "baringo","vihiga","busia","siaya","homa_bay","migori","kisii","nyamira",
];

type FormState = {
  title: string;
  wasteType: string;
  quantityKg: string;
  pricePerKg: string;
  county: string;
  description: string;
  contactPhone: string;
  contactWhatsapp: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  wasteType: "",
  quantityKg: "",
  pricePerKg: "",
  county: "",
  description: "",
  contactPhone: "",
  contactWhatsapp: "",
};

export function FarmerSellClient() {
  const t = useTranslations();
  const ts = useTranslations("sell");
  const { user } = useUser();
  const clerkId = user?.id;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const myListings = useQuery(api.wasteListings.getMine, clerkId ? { clerkId } : "skip");
  const createListing = useMutation(api.wasteListings.create);
  const updateStatus = useMutation(api.wasteListings.updateStatus);
  const removeListing = useMutation(api.wasteListings.remove);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.wasteType || !form.quantityKg || !form.county || !form.description || !form.contactPhone) return;
    setSubmitting(true);
    try {
      const id = await createListing({
        clerkId,
        title: form.title,
        wasteType: form.wasteType,
        quantityKg: Number(form.quantityKg),
        pricePerKg: form.pricePerKg ? Number(form.pricePerKg) : undefined,
        county: form.county,
        description: form.description,
        contactPhone: form.contactPhone,
        contactWhatsapp: form.contactWhatsapp || undefined,
      });
      setSuccessId(id);
      setForm(EMPTY_FORM);
      setShowForm(false);
      setTimeout(() => setSuccessId(null), 4000);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMarkSold(id: Id<"wasteListings">) {
    await updateStatus({ clerkId, id, status: "sold" });
  }

  async function handleDelete(id: Id<"wasteListings">) {
    setDeletingId(id);
    try {
      await removeListing({ clerkId, id });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <RoleGuard allowedRoles={["farmer"]}>
      <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl">

          {/* Header */}
          <div className="mb-6 rounded-3xl border border-green-200 bg-gradient-to-br from-[#06402B] via-[#0b5a3d] to-[#d8eddc] px-6 py-8 text-white">
            <Link href="/farmer" className="mb-4 inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white">
              <ArrowLeft weight="bold" className="h-3.5 w-3.5" />
              {t("farmerDashboard.eyebrow")}
            </Link>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              {ts("eyebrow")}
            </p>
            <h1 className="mb-2 text-3xl font-bold">{ts("title")}</h1>
            <p className="max-w-xl text-sm text-white/80">{ts("subtitle")}</p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#06402B] transition-opacity hover:opacity-90"
            >
              <Plus weight="bold" className="h-4 w-4" />
              {ts("newListing")}
            </button>
          </div>

          {/* Success toast */}
          {successId && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
              <CheckCircle weight="duotone" className="h-5 w-5" />
              {ts("posted")}
            </div>
          )}

          {/* New listing form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">{ts("newListing")}</h2>

              <div className="grid gap-4">
                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{ts("listingTitle")}</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder={ts("titlePlaceholder")}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Product type + Quantity */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{ts("wasteType")}</label>
                    <select
                      value={form.wasteType}
                      onChange={(e) => setForm({ ...form, wasteType: e.target.value })}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">{ts("selectType")}</option>
                      {PRODUCT_TYPES.map((type) => (
                        <option key={type} value={type}>{ts(`productTypes.${type}`)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{ts("quantityKg")}</label>
                    <input
                      type="number"
                      min="1"
                      value={form.quantityKg}
                      onChange={(e) => setForm({ ...form, quantityKg: e.target.value })}
                      required
                      placeholder="e.g. 200"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Price + County */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {ts("pricePerKg")} <span className="text-gray-400">({ts("priceOptional")})</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={form.pricePerKg}
                      onChange={(e) => setForm({ ...form, pricePerKg: e.target.value })}
                      placeholder={ts("negotiable")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{t("wasteInput.location")}</label>
                    <select
                      value={form.county}
                      onChange={(e) => setForm({ ...form, county: e.target.value })}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">{t("wasteInput.selectCounty")}</option>
                      {COUNTIES.map((c) => (
                        <option key={c} value={c}>{t(`counties.${c}`)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{ts("description")}</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={ts("descriptionPlaceholder")}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{ts("contactPhone")}</label>
                    <input
                      type="tel"
                      value={form.contactPhone}
                      onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                      placeholder="+254 7XX XXX XXX"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{ts("contactWhatsapp")}</label>
                    <input
                      type="tel"
                      value={form.contactWhatsapp}
                      onChange={(e) => setForm({ ...form, contactWhatsapp: e.target.value })}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: B }}
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Package weight="duotone" className="h-4 w-4" />}
                  {ts("postListing")}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </form>
          )}

          {/* My Listings */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{ts("myListings")}</h2>

            {myListings === undefined ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 weight="duotone" className="h-7 w-7 animate-spin text-green-600" />
              </div>
            ) : myListings === null || myListings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 px-4 py-10 text-center dark:border-gray-700">
                <Package weight="duotone" className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{ts("noListings")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{listing.title}</h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {listing.quantityKg} kg · {t(`counties.${listing.county}`)}
                        </p>
                      </div>
                      <StatusBadge status={listing.status} t={ts} />
                    </div>

                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{listing.description}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Tag weight="duotone" className="h-3.5 w-3.5" />
                        {listing.pricePerKg ? `KES ${listing.pricePerKg}/kg` : ts("negotiable")}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Phone weight="duotone" className="h-3.5 w-3.5" />
                        {listing.contactPhone}
                      </div>
                    </div>

                    {listing.status === "available" && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleMarkSold(listing._id)}
                          className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
                        >
                          <CheckCircle weight="duotone" className="mr-1 inline h-3.5 w-3.5" />
                          {ts("markSold")}
                        </button>
                        <button
                          onClick={() => handleDelete(listing._id)}
                          disabled={deletingId === listing._id}
                          className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
                        >
                          {deletingId === listing._id
                            ? <Loader2 className="inline h-3.5 w-3.5 animate-spin" />
                            : <Trash weight="duotone" className="mr-1 inline h-3.5 w-3.5" />}
                          {ts("deleteListing")}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const styles: Record<string, string> = {
    available: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    sold: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
    expired: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? styles.available}`}>
      {t(`status.${status}`)}
    </span>
  );
}
