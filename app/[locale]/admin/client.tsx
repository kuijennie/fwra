"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  UsersIcon as Users,
  PlantIcon as Sprout,
  ShoppingBagIcon as ShoppingBag,
  ShieldIcon as Shield,
  GlobeIcon as Globe,
  FileTextIcon as FileText,
  LightbulbIcon as Lightbulb,
  BellIcon as Bell,
  CircleNotchIcon as Loader2,
  ShieldWarningIcon as ShieldAlert,
  MagnifyingGlassIcon as Search,
  BookOpenIcon as BookOpen,
  PaperPlaneTiltIcon as PaperPlaneTilt,
  PlusIcon as Plus,
  TrashIcon as Trash,
  PencilSimpleIcon as PencilSimple,
} from "@phosphor-icons/react";
import { Id } from "@/convex/_generated/dataModel";

type Tab = "overview" | "users" | "content";

const B = "#06402B";
const B10 = "rgba(6,64,43,0.10)";
const B06 = "rgba(6,64,43,0.06)";
const BG = "var(--background)";
const SUR = "var(--surface)";
const BRD = "var(--border)";
const FG = "var(--foreground)";
const FGM = "var(--foreground-muted)";

type StepDraft = { titleEn: string; titleSw: string; contentEn: string; contentSw: string };

const emptyTutorialForm = () => ({
  titleEn: "",
  titleSw: "",
  descEn: "",
  descSw: "",
  category: "composting",
  difficulty: "beginner",
  duration: "",
  steps: [{ titleEn: "", titleSw: "", contentEn: "", contentSw: "" }] as StepDraft[],
});

export function AdminDashboardClient() {
  const t = useTranslations();
  const { user: clerkUser } = useUser();
  const adminEmail = clerkUser?.primaryEmailAddress?.emailAddress;
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [userSearch, setUserSearch] = useState("");

  // Tutorial form state
  const [showCreateTutorial, setShowCreateTutorial] = useState(false);
  const [editingTutorialId, setEditingTutorialId] = useState<Id<"tutorials"> | null>(null);
  const [tutorialForm, setTutorialForm] = useState(emptyTutorialForm());
  const [savingTutorial, setSavingTutorial] = useState(false);
  const [tutorialError, setTutorialError] = useState<string | null>(null);

  // Email state: maps item ID → { sending, result }
  const [emailState, setEmailState] = useState<Record<string, { sending: boolean; sent?: number; error?: string }>>({});

  const currentUser = useQuery(api.users.getCurrent);
  const fallbackUser = useQuery(api.users.getByEmail, adminEmail ? { email: adminEmail } : "skip");
  const effectiveUser = currentUser ?? fallbackUser;
  const useFallback = !currentUser && !!adminEmail;

  const statsJwt = useQuery(api.users.getStats, !useFallback ? {} : "skip");
  const statsFallback = useQuery(api.users.getStatsByEmail, useFallback ? { adminEmail: adminEmail! } : "skip");
  const stats = statsJwt ?? statsFallback;

  const usersJwt = useQuery(api.users.listAll, !useFallback ? {} : "skip");
  const usersFallback = useQuery(api.users.listAllByEmail, useFallback ? { adminEmail: adminEmail! } : "skip");
  const users = usersJwt ?? usersFallback;

  const tutorials = useQuery(api.tutorials.adminListAll, useFallback ? { adminEmail: adminEmail! } : {});

  const updateRole = useMutation(api.users.updateRole);
  const updateRoleByEmail = useMutation(api.users.updateRoleByEmail);
  const createTutorial = useMutation(api.tutorials.adminCreate);
  const updateTutorial = useMutation(api.tutorials.adminUpdate);
  const deleteTutorial = useMutation(api.tutorials.adminDelete);
  const setPublished = useMutation(api.tutorials.adminSetPublished);
  const sendTutorialEmail = useAction(api.email.sendTutorialEmail);

  if (currentUser === undefined || (adminEmail && fallbackUser === undefined)) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-8" style={{ background: BG }}>
        <Loader2 weight="duotone" className="h-7 w-7 animate-spin" style={{ color: B }} />
      </main>
    );
  }

  if (!effectiveUser || effectiveUser.role !== "admin") {
    return (
      <main className="min-h-screen px-4 py-8" style={{ background: BG }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center rounded-2xl border p-12 text-center" style={{ background: SUR, borderColor: BRD }}>
            <div className="mb-4 rounded-full p-4" style={{ background: B10 }}>
              <ShieldAlert weight="duotone" className="h-10 w-10" style={{ color: B }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: FG }}>
              {t("admin.accessDenied")}
            </h2>
          </div>
        </div>
      </main>
    );
  }

  const filteredUsers = users?.filter((u) => {
    if (!userSearch) return true;
    const q = userSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q) ||
      u.county.toLowerCase().includes(q)
    );
  });

  const handleRoleChange = (userId: Id<"users">, role: string) => {
    if (useFallback) return updateRoleByEmail({ adminEmail: adminEmail!, userId, role });
    return updateRole({ userId, role });
  };

  // ── Tutorial handlers ─────────────────────────────────────────────────────
  const addStep = () =>
    setTutorialForm((f) => ({
      ...f,
      steps: [...f.steps, { titleEn: "", titleSw: "", contentEn: "", contentSw: "" }],
    }));

  const removeStep = (i: number) =>
    setTutorialForm((f) => ({ ...f, steps: f.steps.filter((_, idx) => idx !== i) }));

  const updateStep = (i: number, field: keyof StepDraft, value: string) =>
    setTutorialForm((f) => {
      const steps = [...f.steps];
      steps[i] = { ...steps[i], [field]: value };
      return { ...f, steps };
    });

  const closeTutorialForm = () => {
    setShowCreateTutorial(false);
    setEditingTutorialId(null);
    setTutorialForm(emptyTutorialForm());
    setTutorialError(null);
  };

  const handleSaveTutorial = async () => {
    setTutorialError(null);
    if (!tutorialForm.titleEn || !tutorialForm.titleSw || !tutorialForm.duration) {
      setTutorialError("Title (English), Title (Swahili), and Duration are required.");
      return;
    }
    setSavingTutorial(true);
    try {
      const payload = {
        category: tutorialForm.category,
        title: { en: tutorialForm.titleEn, sw: tutorialForm.titleSw },
        description: { en: tutorialForm.descEn, sw: tutorialForm.descSw },
        difficulty: tutorialForm.difficulty,
        duration: tutorialForm.duration,
        steps: tutorialForm.steps.map((s, i) => ({
          stepNumber: i + 1,
          title: { en: s.titleEn, sw: s.titleSw },
          content: { en: s.contentEn, sw: s.contentSw },
        })),
      };
      const fallback = useFallback ? { adminEmail: adminEmail! } : {};
      if (editingTutorialId) {
        await updateTutorial({ id: editingTutorialId, ...payload, ...fallback });
      } else {
        const slug =
          tutorialForm.titleEn
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") +
          "-" +
          Date.now();
        await createTutorial({ slug, ...payload, ...fallback });
      }
      closeTutorialForm();
    } catch (err) {
      setTutorialError(err instanceof Error ? err.message : "Failed to save tutorial. Please try again.");
    } finally {
      setSavingTutorial(false);
    }
  };

  const handleEditTutorial = (tut: NonNullable<typeof tutorials>[number]) => {
    setTutorialForm({
      titleEn: tut.title.en,
      titleSw: tut.title.sw,
      descEn: tut.description.en,
      descSw: tut.description.sw,
      category: tut.category,
      difficulty: tut.difficulty,
      duration: tut.duration,
      steps: tut.steps.map((s) => ({
        titleEn: s.title.en,
        titleSw: s.title.sw,
        contentEn: s.content.en,
        contentSw: s.content.sw,
      })),
    });
    setEditingTutorialId(tut._id);
    setShowCreateTutorial(true);
  };

  const handleDeleteTutorial = async (id: Id<"tutorials">) => {
    if (!confirm("Delete this tutorial?")) return;
    await deleteTutorial({ id, ...(useFallback ? { adminEmail: adminEmail! } : {}) });
  };

  const handleSendTutorialEmail = async (id: Id<"tutorials">) => {
    setEmailState((s) => ({ ...s, [id]: { sending: true } }));
    try {
      const result = await sendTutorialEmail({ tutorialId: id });
      setEmailState((s) => ({ ...s, [id]: { sending: false, sent: result.sent } }));
    } catch (e) {
      setEmailState((s) => ({ ...s, [id]: { sending: false, error: (e as Error).message } }));
    }
  };

  return (
    <main className="min-h-screen px-4 py-8" style={{ background: BG }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="font-display mb-1 text-2xl font-bold italic" style={{ color: FG }}>
            {t("admin.title")}
          </h1>
          <p className="text-sm" style={{ color: FGM }}>
            {t("admin.subtitle")}
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex gap-1 rounded-xl p-1" style={{ background: B06 }}>
          {([
            { id: "overview" as const, label: t("admin.tabOverview") },
            { id: "users" as const, label: t("admin.tabUsers") },
            { id: "content" as const, label: t("admin.tabContent") },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              style={activeTab === tab.id ? { background: SUR, color: B } : { color: FGM }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Overview ───────────────────────────────────────────────────── */}
        {activeTab === "overview" && stats && (
          <div className="space-y-6">
            <StatGroup label={t("admin.userStats")}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard icon={<Users weight="duotone" className="h-5 w-5" />} label={t("admin.totalUsers")} value={stats.totalUsers} />
                <StatCard icon={<Sprout weight="duotone" className="h-5 w-5" />} label={t("admin.farmers")} value={stats.farmers} />
                <StatCard icon={<ShoppingBag weight="duotone" className="h-5 w-5" />} label={t("admin.buyers")} value={stats.buyers} />
                <StatCard icon={<Shield weight="duotone" className="h-5 w-5" />} label={t("admin.admins")} value={stats.admins} />
                <StatCard icon={<Globe weight="duotone" className="h-5 w-5" />} label={t("admin.anonymousSessions")} value={stats.anonymousSessions} />
              </div>
            </StatGroup>

            <StatGroup label={t("admin.systemUsage")}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard icon={<FileText weight="duotone" className="h-5 w-5" />} label={t("admin.totalEntries")} value={stats.totalEntries} />
                <StatCard icon={<Lightbulb weight="duotone" className="h-5 w-5" />} label={t("admin.totalRecommendations")} value={stats.totalRecommendations} />
                <StatCard icon={<Bell weight="duotone" className="h-5 w-5" />} label={t("admin.totalReminders")} value={stats.totalReminders} />
              </div>
            </StatGroup>
          </div>
        )}

        {/* ── Users ──────────────────────────────────────────────────────── */}
        {activeTab === "users" && (
          <section className="overflow-hidden rounded-2xl border" style={{ background: SUR, borderColor: BRD }}>
            <div className="flex items-center gap-4 border-b px-6 py-4" style={{ borderColor: BRD }}>
              <h2 className="flex-1 text-lg font-semibold" style={{ color: FG }}>
                {t("admin.tabUsers")}
              </h2>
              <div className="relative">
                <Search weight="duotone" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: FGM }} />
                <input
                  type="text"
                  placeholder={t("admin.searchUsers")}
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="rounded-lg border py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: BRD, background: BG, color: FG, "--tw-ring-color": B } as React.CSSProperties}
                />
              </div>
            </div>

            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ background: B06, borderColor: BRD }}>
                      {[t("admin.colName"), t("admin.colEmail"), t("admin.colCounty"), t("admin.changeRole"), t("admin.colLastActive")].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: FGM }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b" style={{ borderColor: BRD }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ background: B10, color: B }}>
                              {user.name[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm font-medium" style={{ color: FG }}>{user.name}</span>
                            {user._id === effectiveUser._id && (
                              <span className="text-xs" style={{ color: FGM }}>(you)</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: FGM }}>
                          {user.email ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize" style={{ color: FGM }}>
                          {user.county.replace(/_/g, " ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id as Id<"users">, e.target.value)}
                            disabled={user._id === effectiveUser._id}
                            className="rounded-lg border px-2 py-1 text-sm disabled:opacity-50"
                            style={{ borderColor: BRD, background: SUR, color: FG }}
                          >
                            <option value="farmer">{t("roles.farmer")}</option>
                            <option value="buyer">{t("roles.buyer")}</option>
                            <option value="admin">{t("roles.admin")}</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: FGM }}>
                          {new Date(user.lastActive).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text={userSearch ? t("admin.noUsersFound") : t("admin.noUsers")} />
            )}
          </section>
        )}

        {/*  Content */}
        {activeTab === "content" && (
          <section className="overflow-hidden rounded-2xl border" style={{ background: SUR, borderColor: BRD }}>
            <div className="flex items-center border-b px-6 py-4" style={{ borderColor: BRD }}>
              <div className="flex-1">
                <h2 className="text-lg font-semibold" style={{ color: FG }}>{t("admin.tutorials")}</h2>
                <p className="text-xs mt-0.5" style={{ color: FGM }}>{t("admin.tutorialsSubtitle")}</p>
              </div>
              <button
                onClick={() => setShowCreateTutorial((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                style={{ background: B, color: "#fff" }}
              >
                <Plus weight="bold" className="h-4 w-4" />
                {t("admin.createTutorial")}
              </button>
            </div>

            {/* Create tutorial form */}
            {showCreateTutorial && (
              <div className="border-b px-6 py-6 space-y-4" style={{ borderColor: BRD, background: B06 }}>
                <h3 className="text-sm font-semibold" style={{ color: FG }}>{editingTutorialId ? t("admin.editTutorial") : t("admin.createTutorial")}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label={t("admin.titleEn")}>
                    <input value={tutorialForm.titleEn} onChange={(e) => setTutorialForm((f) => ({ ...f, titleEn: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none" />
                  </FormField>
                  <FormField label={t("admin.titleSw")}>
                    <input value={tutorialForm.titleSw} onChange={(e) => setTutorialForm((f) => ({ ...f, titleSw: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none" />
                  </FormField>
                  <FormField label={t("admin.descriptionEn")}>
                    <textarea rows={2} value={tutorialForm.descEn} onChange={(e) => setTutorialForm((f) => ({ ...f, descEn: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none resize-none" />
                  </FormField>
                  <FormField label={t("admin.descriptionSw")}>
                    <textarea rows={2} value={tutorialForm.descSw} onChange={(e) => setTutorialForm((f) => ({ ...f, descSw: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none resize-none" />
                  </FormField>
                  <FormField label={t("admin.category")}>
                    <select value={tutorialForm.category} onChange={(e) => setTutorialForm((f) => ({ ...f, category: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none">
                      {["composting", "biogas", "mulching", "animal_feed", "vermicompost"].map((c) => (
                        <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label={t("admin.difficulty")}>
                    <select value={tutorialForm.difficulty} onChange={(e) => setTutorialForm((f) => ({ ...f, difficulty: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none">
                      {["beginner", "intermediate", "advanced"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label={t("admin.duration")}>
                    <input placeholder="e.g. 2–3 hours" value={tutorialForm.duration} onChange={(e) => setTutorialForm((f) => ({ ...f, duration: e.target.value }))} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none" />
                  </FormField>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: FGM }}>Steps</p>
                  {tutorialForm.steps.map((step, i) => (
                    <div key={i} className="rounded-xl border p-4 space-y-3" style={{ background: SUR, borderColor: BRD }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: B }}>Step {i + 1}</span>
                        {tutorialForm.steps.length > 1 && (
                          <button onClick={() => removeStep(i)} className="text-xs" style={{ color: FGM }}>
                            {t("admin.removeStep")}
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <FormField label={t("admin.stepTitleEn")}>
                          <input value={step.titleEn} onChange={(e) => updateStep(i, "titleEn", e.target.value)} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none" />
                        </FormField>
                        <FormField label={t("admin.stepTitleSw")}>
                          <input value={step.titleSw} onChange={(e) => updateStep(i, "titleSw", e.target.value)} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none" />
                        </FormField>
                        <FormField label={t("admin.stepContentEn")}>
                          <textarea rows={2} value={step.contentEn} onChange={(e) => updateStep(i, "contentEn", e.target.value)} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none resize-none" />
                        </FormField>
                        <FormField label={t("admin.stepContentSw")}>
                          <textarea rows={2} value={step.contentSw} onChange={(e) => updateStep(i, "contentSw", e.target.value)} style={{ borderColor: BRD, background: BG, color: FG }} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none resize-none" />
                        </FormField>
                      </div>
                    </div>
                  ))}
                  <button onClick={addStep} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: B }}>
                    <Plus weight="bold" className="h-3.5 w-3.5" />
                    {t("admin.addStep")}
                  </button>
                </div>

                {tutorialError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
                    {tutorialError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button onClick={handleSaveTutorial} disabled={savingTutorial} className="rounded-lg px-5 py-2 text-sm font-semibold disabled:opacity-50" style={{ background: B, color: "#fff" }}>
                    {savingTutorial ? t("admin.creating") : editingTutorialId ? t("common.save") : t("admin.saveDraft")}
                  </button>
                  <button onClick={closeTutorialForm} className="rounded-lg px-5 py-2 text-sm font-medium" style={{ color: FGM }}>
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            )}

            {/* Tutorials list */}
            {tutorials && tutorials.length > 0 ? (
              <div className="divide-y" style={{ borderColor: BRD }}>
                {tutorials.map((tut) => {
                  const es = emailState[tut._id];
                  return (
                    <div key={tut._id} className="flex flex-wrap items-center gap-3 px-6 py-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: FG }}>{tut.title.en}</p>
                        <p className="text-xs mt-0.5 capitalize" style={{ color: FGM }}>
                          {tut.category.replace(/_/g, " ")} · {tut.difficulty} · {tut.steps.length} steps
                        </p>
                      </div>
                      <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={tut.isPublished ? { background: "#dcfce7", color: "#166534" } : { background: B06, color: FGM }}>
                        {tut.isPublished ? t("admin.published") : t("admin.unpublished")}
                      </span>
                      <button
                        onClick={() => handleEditTutorial(tut)}
                        className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium"
                        style={{ borderColor: BRD, color: FG, background: SUR }}
                      >
                        <PencilSimple weight="duotone" className="h-3.5 w-3.5" />
                        {t("admin.edit")}
                      </button>
                      <button
                        onClick={() => handleDeleteTutorial(tut._id)}
                        className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium"
                        style={{ borderColor: BRD, color: "#dc2626", background: SUR }}
                      >
                        <Trash weight="duotone" className="h-3.5 w-3.5" />
                        {t("admin.delete")}
                      </button>
                      <button
                        onClick={() => setPublished({ id: tut._id, isPublished: !tut.isPublished, ...(useFallback ? { adminEmail: adminEmail! } : {}) })}
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{ borderColor: BRD, color: FG, background: SUR }}
                      >
                        {tut.isPublished ? t("admin.unpublish") : t("admin.publish")}
                      </button>
                      <button
                        onClick={() => handleSendTutorialEmail(tut._id)}
                        disabled={es?.sending}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-50 transition-colors"
                        style={{ background: B10, color: B }}
                      >
                        {es?.sending
                          ? <Loader2 weight="duotone" className="h-3.5 w-3.5 animate-spin" />
                          : <PaperPlaneTilt weight="duotone" className="h-3.5 w-3.5" />
                        }
                        {es?.sending ? t("admin.sending") : t("admin.sendEmail")}
                      </button>
                      {es?.sent !== undefined && (
                        <span className="text-xs" style={{ color: "#166534" }}>✓ {t("admin.emailSent", { count: es.sent })}</span>
                      )}
                      {es?.error && (
                        <span className="text-xs text-red-500 max-w-xs truncate" title={es.error}>{es.error}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState text={t("admin.noTutorials")} />
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>{label}</label>
      {children}
    </div>
  );
}

function StatGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-muted)" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="mb-3 inline-flex rounded-lg p-2" style={{ background: "rgba(6,64,43,0.08)", color: "#06402B" }}>
        {icon}
      </div>
      <div className="font-display text-2xl font-bold italic" style={{ color: "var(--foreground)" }}>
        {value}
      </div>
      <div className="mt-0.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
        {label}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>{text}</p>
    </div>
  );
}
