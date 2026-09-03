"use client";

import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Landmark, Image, Users, BookOpen, Map, Clock, BarChart3,
  Shield, RefreshCw, Eye, Search, ChevronRight, ExternalLink,
  AlertCircle, CheckCircle, Plus, Trash2, Edit3, Save, X,
  Video, FileText, Headphones, Globe, Database, Heart,
  ChevronLeft, MapPin, Calendar, Layers, AlertTriangle,
} from "lucide-react";
import { api } from "@/services/api";

/* ========================================
   Types
   ======================================== */

interface OverviewData {
  heritage_entities: number;
  media: number;
  images: number;
  videos: number;
  relationships: number;
  collections: number;
  collection_items: number;
  chatbot_knowledge: number;
  supported_states: number;
  historical_periods: number;
  analytics_events: number;
  locations: number;
  sources: number;
  users: number;
  user_favorites: number;
}

interface HeritageItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  period_id: string | null;
  location_id: string | null;
  source_id: string | null;
  state: string | null;
  location_name: string | null;
  period_name: string | null;
  source_title: string | null;
  media?: MediaItem[];
}

interface MediaItem {
  id: string;
  entity_id: string;
  entity_name?: string;
  entity_slug?: string;
  type: string;
  url: string;
  caption: string;
  alt_text: string;
  credit: string;
  is_primary: boolean;
  display_order: number;
}

interface LocationItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  state: string | null;
  parent_id: string | null;
  heritage_count: number;
}

interface SourceItem {
  id: string;
  title: string;
  author: string | null;
  url: string | null;
  source_type: string;
  verification_status: string;
  publisher: string | null;
  publication_date: string | null;
  heritage_count: number;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  created_at: string;
  favorite_count: number;
  favorites?: Array<{ heritage_id: string; name: string; slug: string }>;
}

interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  entity_count: number;
  is_active: boolean;
  display_order: number;
}

interface PeriodItem {
  id: string;
  name: string;
  start_year: number;
  end_year: number | null;
  description: string;
  heritage_count: number;
}

type AdminTab = "overview" | "heritage" | "media" | "locations" | "sources" | "users" | "collections" | "periods";

/* ========================================
   Auth Gate
   ======================================== */

function AdminLogin({ onAuth }: { onAuth: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(
        "/admin/overview", "GET", { "X-Admin-Token": token }
      );
      if (res.success) {
        onAuth(token);
      } else {
        setError(res.error?.message || "Invalid admin token");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container size="narrow">
        <FadeIn>
          <div className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 mx-auto mb-5">
              <Shield className="h-7 w-7 text-terracotta" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-charcoal mb-2">Admin Portal</h1>
            <p className="text-muted mb-6">Enter your admin token to access the management dashboard.</p>
            <div className="max-w-sm mx-auto">
              <div className="relative mb-3">
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin token"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30"
                  aria-label="Admin token"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 mb-3 bg-red-50 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              <button
                onClick={handleLogin}
                disabled={loading || !token.trim()}
                className="w-full rounded-lg bg-terracotta hover:bg-terracotta-dark text-white py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Access Dashboard"}
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

/* ========================================
   Notification Toast
   ======================================== */

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
      type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
    }`}>
      {type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
      {message}
    </div>
  );
}

/* ========================================
   Confirmation Dialog
   ======================================== */

function ConfirmDialog({ title, message, onConfirm, onCancel }: {
  title: string; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h3 className="font-display text-lg text-charcoal">{title}</h3>
        </div>
        <p className="text-sm text-muted mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700">Confirm</button>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   Overview Tab
   ======================================== */

function OverviewTab({ overview }: { overview: OverviewData }) {
  const stats = [
    { label: "Heritage Entities", value: overview.heritage_entities, icon: Landmark, color: "text-terracotta" },
    { label: "Locations", value: overview.locations, icon: MapPin, color: "text-heritage-gold" },
    { label: "Media Records", value: overview.media, icon: Image, color: "text-terracotta" },
    { label: "Images", value: overview.images, icon: Image, color: "text-heritage-gold" },
    { label: "Videos", value: overview.videos, icon: Video, color: "text-terracotta-dark" },
    { label: "Sources", value: overview.sources, icon: BookOpen, color: "text-terracotta" },
    { label: "Collections", value: overview.collections, icon: Layers, color: "text-heritage-gold" },
    { label: "Collection Items", value: overview.collection_items, icon: Database, color: "text-terracotta-dark" },
    { label: "Users", value: overview.users, icon: Users, color: "text-terracotta" },
    { label: "States", value: overview.supported_states, icon: Globe, color: "text-heritage-gold" },
    { label: "Periods", value: overview.historical_periods, icon: Clock, color: "text-terracotta-dark" },
    { label: "Relationships", value: overview.relationships, icon: Heart, color: "text-terracotta" },
    { label: "Chatbot Knowledge", value: overview.chatbot_knowledge, icon: BookOpen, color: "text-heritage-gold" },
    { label: "Analytics Events", value: overview.analytics_events, icon: BarChart3, color: "text-terracotta-dark" },
    { label: "Favorites", value: overview.user_favorites, icon: Heart, color: "text-terracotta" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-[10px] text-muted font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="font-display text-xl text-charcoal">{stat.value.toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================
   Heritage Tab
   ======================================== */

function HeritageTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [heritage, setHeritage] = useState<HeritageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [editing, setEditing] = useState<HeritageItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<HeritageItem | null>(null);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [periods, setPeriods] = useState<PeriodItem[]>([]);
  const [sources, setSources] = useState<SourceItem[]>([]);

  // Form state
  const [form, setForm] = useState({ name: "", category: "monument", description: "", period_id: "", location_id: "", source_id: "" });

  const categories = ["monument", "craft", "tradition", "natural_landmark", "waterfall", "festival", "cuisine", "person", "architecture", "event", "food", "community"];
  const states = ["Gujarat", "Rajasthan", "Punjab", "Goa", "Tamil Nadu", "Maharashtra", "Madhya Pradesh", "Delhi", "Kerala", "Jammu & Kashmir", "Assam", "Odisha"];

  const fetchHeritage = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (categoryFilter) params.set("category", categoryFilter);
      if (stateFilter) params.set("state", stateFilter);
      const qs = params.toString();
      const res = await api.requestWithHeaders<{ success: boolean; data: HeritageItem[] }>(
        `/admin/heritage${qs ? `?${qs}` : ""}`, "GET", { "X-Admin-Token": adminToken }
      );
      if (res.success) setHeritage(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken, search, categoryFilter, stateFilter]);

  useEffect(() => { fetchHeritage(); }, [fetchHeritage]);

  // Load dropdowns
  useEffect(() => {
    const loadDropdowns = async () => {
      const [locRes, perRes, srcRes] = await Promise.all([
        api.requestWithHeaders<{ success: boolean; data: LocationItem[] }>("/admin/locations", "GET", { "X-Admin-Token": adminToken }),
        api.requestWithHeaders<{ success: boolean; data: PeriodItem[] }>("/admin/periods", "GET", { "X-Admin-Token": adminToken }),
        api.requestWithHeaders<{ success: boolean; data: SourceItem[] }>("/admin/sources", "GET", { "X-Admin-Token": adminToken }),
      ]);
      if (locRes.success) setLocations(locRes.data || []);
      if (perRes.success) setPeriods(perRes.data || []);
      if (srcRes.success) setSources(srcRes.data || []);
    };
    loadDropdowns();
  }, [adminToken]);

  const startEdit = (item: HeritageItem) => {
    setEditing(item);
    setCreating(false);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description || "",
      period_id: item.period_id || "",
      location_id: item.location_id || "",
      source_id: item.source_id || "",
    });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ name: "", category: "monument", description: "", period_id: "", location_id: "", source_id: "" });
  };

  const handleSave = async () => {
    try {
      if (creating) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(
          "/admin/heritage", "POST", { "X-Admin-Token": adminToken }, form
        );
        if (res.success) { showToast("Heritage created", "success"); setCreating(false); fetchHeritage(); }
        else { showToast(res.error?.message || "Create failed", "error"); }
      } else if (editing) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(
          `/admin/heritage/${editing.id}`, "PUT", { "X-Admin-Token": adminToken }, form
        );
        if (res.success) { showToast("Heritage updated", "success"); setEditing(null); fetchHeritage(); }
        else { showToast(res.error?.message || "Update failed", "error"); }
      }
    } catch (err) { showToast("Request failed", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(
        `/admin/heritage/${deleteTarget.id}`, "DELETE", { "X-Admin-Token": adminToken }
      );
      if (res.success) { showToast("Heritage deleted", "success"); setDeleteTarget(null); fetchHeritage(); }
      else { showToast(res.error?.message || "Delete failed", "error"); }
    } catch { showToast("Delete failed", "error"); }
  };

  return (
    <div>
      {/* Filters + Actions */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search heritage..."
            className="w-full rounded-lg border border-border bg-white pl-9 pr-3 py-2 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
        </select>
        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
          <option value="">All States</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={startCreate}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
          <Plus className="h-4 w-4" /> Add Heritage
        </button>
      </div>

      {/* Create/Edit Form */}
      {(creating || editing) && (
        <div className="mb-6 rounded-xl border border-terracotta/20 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">{creating ? "Create Heritage" : `Edit: ${editing?.name}`}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="text-muted hover:text-charcoal"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                {categories.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Location</label>
              <select value={form.location_id} onChange={(e) => setForm({ ...form, location_id: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="">None</option>
                {locations.map((l) => <option key={l.id} value={l.id}>{l.name} ({l.state || l.type})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Period</label>
              <select value={form.period_id} onChange={(e) => setForm({ ...form, period_id: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="">None</option>
                {periods.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.start_year}{p.end_year ? ` – ${p.end_year}` : " – present"})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Source</label>
              <select value={form.source_id} onChange={(e) => setForm({ ...form, source_id: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="">None</option>
                {sources.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
              <Save className="h-4 w-4" /> {creating ? "Create" : "Save Changes"}
            </button>
            <button onClick={() => { setCreating(false); setEditing(null); }}
              className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal">Cancel</button>
          </div>
        </div>
      )}

      {/* Heritage Table */}
      {loading ? <LoadingState /> : heritage.length === 0 ? (
        <div className="text-center py-12">
          <Landmark className="h-10 w-10 text-muted mx-auto mb-3" />
          <p className="text-muted">No heritage entities found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-stone">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden sm:table-cell">State</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">Period</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">Source</th>
                  <th className="text-right px-4 py-3 font-medium text-stone">Actions</th>
                </tr>
              </thead>
              <tbody>
                {heritage.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-charcoal">{item.name}</div>
                      <div className="text-xs text-muted truncate max-w-[200px]">{item.slug}</div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs capitalize">{item.category?.replace("_", " ")}</Badge></td>
                    <td className="px-4 py-3 text-stone hidden sm:table-cell">{item.state || "—"}</td>
                    <td className="px-4 py-3 text-stone hidden md:table-cell">{item.period_name || "—"}</td>
                    <td className="px-4 py-3 text-stone hidden md:table-cell">{item.source_title || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => startEdit(item)} className="p-1.5 rounded text-muted hover:text-terracotta hover:bg-terracotta/5" title="Edit">
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <a href={`/heritage/${item.slug}`} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded text-muted hover:text-terracotta hover:bg-terracotta/5" title="View">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded text-muted hover:text-red-600 hover:bg-red-50" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-3 text-xs text-muted">Showing {heritage.length} heritage entities</div>

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Heritage"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This will also remove associated media, relationships, collection items, and favorites. This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

/* ========================================
   Media Tab
   ======================================== */

function MediaTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [heritageList, setHeritageList] = useState<HeritageItem[]>([]);
  const [form, setForm] = useState({ entity_id: "", type: "image", url: "", caption: "", alt_text: "", credit: "", is_primary: false });

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const qs = typeFilter ? `?type=${typeFilter}` : "";
      const res = await api.requestWithHeaders<{ success: boolean; data: MediaItem[] }>(
        `/admin/media${qs}`, "GET", { "X-Admin-Token": adminToken }
      );
      if (res.success) setMedia(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken, typeFilter]);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  useEffect(() => {
    api.requestWithHeaders<{ success: boolean; data: HeritageItem[] }>(
      "/admin/heritage", "GET", { "X-Admin-Token": adminToken }
    ).then((r) => { if (r.success) setHeritageList(r.data || []); });
  }, [adminToken]);

  const handleSave = async () => {
    try {
      if (creating) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(
          "/admin/media", "POST", { "X-Admin-Token": adminToken }, form
        );
        if (res.success) { showToast("Media added", "success"); setCreating(false); fetchMedia(); }
        else { showToast(res.error?.message || "Failed", "error"); }
      } else if (editing) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(
          `/admin/media/${editing.id}`, "PUT", { "X-Admin-Token": adminToken }, form
        );
        if (res.success) { showToast("Media updated", "success"); setEditing(null); fetchMedia(); }
        else { showToast(res.error?.message || "Failed", "error"); }
      }
    } catch { showToast("Request failed", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await api.requestWithHeaders<{ success: boolean }>(
      `/admin/media/${deleteTarget.id}`, "DELETE", { "X-Admin-Token": adminToken }
    );
    if (res.success) { showToast("Media deleted", "success"); setDeleteTarget(null); fetchMedia(); }
  };

  const startEdit = (item: MediaItem) => {
    setEditing(item); setCreating(false);
    setForm({ entity_id: item.entity_id, type: item.type, url: item.url, caption: item.caption || "", alt_text: item.alt_text || "", credit: item.credit || "", is_primary: item.is_primary });
  };

  // Admin only manages image and video. Existing audio/document records are preserved but not created via Admin.
  const typeIcon = (t: string) => {
    switch (t) { case "image": return <Image className="h-4 w-4" />; case "video": return <Video className="h-4 w-4" />; default: return <FileText className="h-4 w-4" />; }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
          <option value="">All Types</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="document">Document</option>
          <option value="audio">Audio</option>
        </select>
        <button onClick={() => { setCreating(true); setEditing(null); setForm({ entity_id: "", type: "image", url: "", caption: "", alt_text: "", credit: "", is_primary: false }); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
          <Plus className="h-4 w-4" /> Add Media
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 rounded-xl border border-terracotta/20 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">{creating ? "Add Media" : "Edit Media"}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="text-muted hover:text-charcoal"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Heritage Entity *</label>
              <select value={form.entity_id} onChange={(e) => setForm({ ...form, entity_id: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="">Select heritage...</option>
                {heritageList.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">URL *</label>
              <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..."
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Caption</label>
              <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Alt Text</label>
              <input type="text" value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.is_primary} onChange={(e) => setForm({ ...form, is_primary: e.target.checked })} id="is_primary"
                className="rounded border-border text-terracotta focus:ring-terracotta" />
              <label htmlFor="is_primary" className="text-sm text-muted">Primary media</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
              <Save className="h-4 w-4" /> {creating ? "Add" : "Save"}
            </button>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <LoadingState /> : media.length === 0 ? (
        <div className="text-center py-12"><Image className="h-10 w-10 text-muted mx-auto mb-3" /><p className="text-muted">No media records found.</p></div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-stone">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Entity</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">URL</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden sm:table-cell">Primary</th>
                  <th className="text-right px-4 py-3 font-medium text-stone">Actions</th>
                </tr>
              </thead>
              <tbody>
                {media.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5">{typeIcon(item.type)}<span className="capitalize">{item.type}</span></div></td>
                    <td className="px-4 py-3"><div className="text-charcoal text-xs">{item.entity_name || "—"}</div></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="text-muted text-xs truncate max-w-[300px]">{item.url}</div></td>
                    <td className="px-4 py-3 hidden sm:table-cell">{item.is_primary ? <Badge variant="default" className="text-[10px]">Primary</Badge> : "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => startEdit(item)} className="p-1.5 rounded text-muted hover:text-terracotta"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded text-muted hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-3 text-xs text-muted">Showing {media.length} media records</div>

      {deleteTarget && (
        <ConfirmDialog title="Delete Media" message="Are you sure you want to delete this media record?"
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

/* ========================================
   Locations Tab
   ======================================== */

function LocationsTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<LocationItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LocationItem | null>(null);
  const [form, setForm] = useState({ name: "", type: "site", description: "", latitude: "", longitude: "", state: "", parent_id: "" });

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (typeFilter) params.set("type", typeFilter);
      const qs = params.toString();
      const res = await api.requestWithHeaders<{ success: boolean; data: LocationItem[] }>(
        `/admin/locations${qs ? `?${qs}` : ""}`, "GET", { "X-Admin-Token": adminToken }
      );
      if (res.success) setLocations(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken, search, typeFilter]);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  const handleSave = async () => {
    const payload = { ...form, latitude: form.latitude ? parseFloat(form.latitude) : null, longitude: form.longitude ? parseFloat(form.longitude) : null };
    try {
      if (creating) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>("/admin/locations", "POST", { "X-Admin-Token": adminToken }, payload);
        if (res.success) { showToast("Location created", "success"); setCreating(false); fetchLocations(); } else { showToast(res.error?.message || "Failed", "error"); }
      } else if (editing) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/locations/${editing.id}`, "PUT", { "X-Admin-Token": adminToken }, payload);
        if (res.success) { showToast("Location updated", "success"); setEditing(null); fetchLocations(); } else { showToast(res.error?.message || "Failed", "error"); }
      }
    } catch { showToast("Request failed", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/locations/${deleteTarget.id}`, "DELETE", { "X-Admin-Token": adminToken });
    if (res.success) { showToast("Location deleted", "success"); setDeleteTarget(null); fetchLocations(); }
    else { showToast(res.error?.message || "Cannot delete — location is in use", "error"); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search locations..."
            className="w-full rounded-lg border border-border bg-white pl-9 pr-3 py-2 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
          <option value="">All Types</option>
          <option value="state">State</option>
          <option value="district">District</option>
          <option value="city">City</option>
          <option value="village">Village</option>
          <option value="site">Site</option>
        </select>
        <button onClick={() => { setCreating(true); setEditing(null); setForm({ name: "", type: "site", description: "", latitude: "", longitude: "", state: "", parent_id: "" }); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
          <Plus className="h-4 w-4" /> Add Location
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 rounded-xl border border-terracotta/20 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">{creating ? "Create Location" : `Edit: ${editing?.name}`}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="text-muted hover:text-charcoal"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="state">State</option><option value="district">District</option><option value="city">City</option>
                <option value="village">Village</option><option value="site">Site</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">State</label>
              <input type="text" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="e.g. Gujarat"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Latitude (-90 to 90)</label>
              <input type="number" step="any" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} placeholder="23.0225"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Longitude (-180 to 180)</label>
              <input type="number" step="any" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} placeholder="72.5714"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta resize-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
              <Save className="h-4 w-4" /> {creating ? "Create" : "Save"}
            </button>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <LoadingState /> : locations.length === 0 ? (
        <div className="text-center py-12"><MapPin className="h-10 w-10 text-muted mx-auto mb-3" /><p className="text-muted">No locations found.</p></div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-stone">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden sm:table-cell">State</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">Coords</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Heritage</th>
                  <th className="text-right px-4 py-3 font-medium text-stone">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3"><div className="font-medium text-charcoal">{item.name}</div></td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs capitalize">{item.type}</Badge></td>
                    <td className="px-4 py-3 text-stone hidden sm:table-cell">{item.state || "—"}</td>
                    <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                      {(() => {
                        const lat = item.latitude != null ? Number(item.latitude) : null;
                        const lng = item.longitude != null ? Number(item.longitude) : null;
                        if (lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng)) {
                          return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        }
                        return "—";
                      })()}
                    </td>
                    <td className="px-4 py-3 text-stone">{item.heritage_count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => { setEditing(item); setCreating(false); setForm({ name: item.name, type: item.type, description: item.description || "", latitude: item.latitude?.toString() || "", longitude: item.longitude?.toString() || "", state: item.state || "", parent_id: item.parent_id || "" }); }}
                          className="p-1.5 rounded text-muted hover:text-terracotta"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded text-muted hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-3 text-xs text-muted">Showing {locations.length} locations</div>

      {deleteTarget && (
        <ConfirmDialog title="Delete Location" message={`Delete "${deleteTarget.name}"? It must not be used by any heritage entities.`}
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

/* ========================================
   Sources Tab
   ======================================== */

function SourcesTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<SourceItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SourceItem | null>(null);
  const [form, setForm] = useState({ title: "", author: "", url: "", source_type: "OTHER", verification_status: "UNVERIFIED", publisher: "", publication_date: "", notes: "" });

  const fetchSources = useCallback(async () => {
    setLoading(true);
    try {
      const qs = search ? `?q=${encodeURIComponent(search)}` : "";
      const res = await api.requestWithHeaders<{ success: boolean; data: SourceItem[] }>(`/admin/sources${qs}`, "GET", { "X-Admin-Token": adminToken });
      if (res.success) setSources(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken, search]);

  useEffect(() => { fetchSources(); }, [fetchSources]);

  const handleSave = async () => {
    try {
      if (creating) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>("/admin/sources", "POST", { "X-Admin-Token": adminToken }, form);
        if (res.success) { showToast("Source created", "success"); setCreating(false); fetchSources(); } else { showToast(res.error?.message || "Failed", "error"); }
      } else if (editing) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/sources/${editing.id}`, "PUT", { "X-Admin-Token": adminToken }, form);
        if (res.success) { showToast("Source updated", "success"); setEditing(null); fetchSources(); } else { showToast(res.error?.message || "Failed", "error"); }
      }
    } catch { showToast("Request failed", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/sources/${deleteTarget.id}`, "DELETE", { "X-Admin-Token": adminToken });
    if (res.success) { showToast("Source deleted", "success"); setDeleteTarget(null); fetchSources(); }
    else { showToast(res.error?.message || "Cannot delete — source is in use", "error"); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sources..."
            className="w-full rounded-lg border border-border bg-white pl-9 pr-3 py-2 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30" />
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); setForm({ title: "", author: "", url: "", source_type: "OTHER", verification_status: "UNVERIFIED", publisher: "", publication_date: "", notes: "" }); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
          <Plus className="h-4 w-4" /> Add Source
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 rounded-xl border border-terracotta/20 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">{creating ? "Add Source" : "Edit Source"}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="text-muted hover:text-charcoal"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Author</label>
              <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Source Type</label>
              <select value={form.source_type} onChange={(e) => setForm({ ...form, source_type: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="ACADEMIC">Academic</option><option value="GOVERNMENT">Government</option>
                <option value="NEWS">News</option><option value="BOOK">Book</option>
                <option value="WEBSITE">Website</option><option value="ARCHIVE">Archive</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">URL</label>
              <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..."
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Verification</label>
              <select value={form.verification_status} onChange={(e) => setForm({ ...form, verification_status: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta">
                <option value="UNVERIFIED">Unverified</option><option value="REVIEWED">Reviewed</option><option value="VERIFIED">Verified</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Publisher</label>
              <input type="text" value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Publication Date</label>
              <input type="date" value={form.publication_date} onChange={(e) => setForm({ ...form, publication_date: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
              <Save className="h-4 w-4" /> {creating ? "Add" : "Save"}
            </button>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <LoadingState /> : sources.length === 0 ? (
        <div className="text-center py-12"><BookOpen className="h-10 w-10 text-muted mx-auto mb-3" /><p className="text-muted">No sources found.</p></div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-stone">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden sm:table-cell">Author</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Heritage</th>
                  <th className="text-right px-4 py-3 font-medium text-stone">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3"><div className="font-medium text-charcoal truncate max-w-[250px]">{item.title}</div></td>
                    <td className="px-4 py-3 text-stone hidden sm:table-cell">{item.author || "—"}</td>
                    <td className="px-4 py-3 hidden md:table-cell"><Badge variant="outline" className="text-xs">{item.source_type}</Badge></td>
                    <td className="px-4 py-3 hidden md:table-cell"><Badge variant={item.verification_status === "VERIFIED" ? "default" : "secondary"} className="text-xs">{item.verification_status}</Badge></td>
                    <td className="px-4 py-3 text-stone">{item.heritage_count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => { setEditing(item); setCreating(false); setForm({ title: item.title, author: item.author || "", url: item.url || "", source_type: item.source_type, verification_status: item.verification_status, publisher: item.publisher || "", publication_date: item.publication_date || "", notes: "" }); }}
                          className="p-1.5 rounded text-muted hover:text-terracotta"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded text-muted hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog title="Delete Source" message={`Delete "${deleteTarget.title}"? It must not be used by any heritage entities.`}
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

/* ========================================
   Users Tab
   ======================================== */

function UsersTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserItem | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const qs = search ? `?q=${encodeURIComponent(search)}` : "";
      const res = await api.requestWithHeaders<{ success: boolean; data: UserItem[] }>(`/admin/users${qs}`, "GET", { "X-Admin-Token": adminToken });
      if (res.success) setUsers(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken, search]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const viewUser = async (user: UserItem) => {
    const res = await api.requestWithHeaders<{ success: boolean; data: UserItem }>(`/admin/users/${user.id}`, "GET", { "X-Admin-Token": adminToken });
    if (res.success) setSelectedUser(res.data);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/users/${deleteTarget.id}`, "DELETE", { "X-Admin-Token": adminToken });
    if (res.success) { showToast("User deleted", "success"); setDeleteTarget(null); setSelectedUser(null); fetchUsers(); }
    else { showToast(res.error?.message || "Failed", "error"); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users by name or email..."
            className="w-full rounded-lg border border-border bg-white pl-9 pr-3 py-2 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30" />
        </div>
      </div>

      {selectedUser && (
        <div className="mb-6 rounded-xl border border-terracotta/20 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">User: {selectedUser.name}</h3>
            <button onClick={() => setSelectedUser(null)} className="text-muted hover:text-charcoal"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div><span className="text-xs text-muted uppercase">Email</span><p className="text-sm font-medium text-charcoal">{selectedUser.email}</p></div>
            <div><span className="text-xs text-muted uppercase">Joined</span><p className="text-sm font-medium text-charcoal">{new Date(selectedUser.created_at).toLocaleDateString()}</p></div>
            <div><span className="text-xs text-muted uppercase">Favorites</span><p className="text-sm font-medium text-charcoal">{selectedUser.favorites?.length || 0}</p></div>
          </div>
          {selectedUser.favorites && selectedUser.favorites.length > 0 && (
            <div>
              <span className="text-xs text-muted uppercase mb-2 block">Favorites</span>
              <div className="flex flex-wrap gap-2">
                {selectedUser.favorites.map((f) => (
                  <a key={f.heritage_id} href={`/heritage/${f.slug}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-cream/50 text-xs text-charcoal hover:text-terracotta">
                    {f.name} <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button onClick={() => setDeleteTarget(selectedUser)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-xs text-red-600 hover:bg-red-50">
              <Trash2 className="h-3 w-3" /> Delete User
            </button>
          </div>
        </div>
      )}

      {loading ? <LoadingState /> : users.length === 0 ? (
        <div className="text-center py-12"><Users className="h-10 w-10 text-muted mx-auto mb-3" /><p className="text-muted">No users found.</p></div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-stone">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden sm:table-cell">Joined</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Favorites</th>
                  <th className="text-right px-4 py-3 font-medium text-stone">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-charcoal">{user.name}</td>
                    <td className="px-4 py-3 text-stone">{user.email}</td>
                    <td className="px-4 py-3 text-muted text-xs hidden sm:table-cell">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-stone">{user.favorite_count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => viewUser(user)} className="p-1.5 rounded text-muted hover:text-terracotta" title="View"><Eye className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteTarget(user)} className="p-1.5 rounded text-muted hover:text-red-600" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog title="Delete User" message={`Delete "${deleteTarget.name}" (${deleteTarget.email})? This will also remove their ${deleteTarget.favorite_count} favorites.`}
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

/* ========================================
   Collections Tab
   ======================================== */

function CollectionsTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.requestWithHeaders<{ success: boolean; data: CollectionItem[] }>("/admin/collections", "GET", { "X-Admin-Token": adminToken });
      if (res.success) setCollections(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken]);

  useEffect(() => { fetchCollections(); }, [fetchCollections]);

  return (
    <div>
      {loading ? <LoadingState /> : collections.length === 0 ? (
        <div className="text-center py-12"><Layers className="h-10 w-10 text-muted mx-auto mb-3" /><p className="text-muted">No collections found.</p></div>
      ) : (
        <div className="grid gap-3">
          {collections.map((col) => (
            <div key={col.id} className="rounded-xl border border-border bg-card p-4 hover:border-terracotta/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg text-charcoal">{col.name}</h3>
                    <Badge variant={col.is_active ? "default" : "secondary"} className="text-xs">{col.is_active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <p className="text-sm text-muted truncate">{col.slug}</p>
                  {col.description && <p className="text-sm text-stone mt-1 line-clamp-2">{col.description}</p>}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted"><BookOpen className="h-3 w-3 inline mr-1" />{col.entity_count} entities</span>
                    <span className="text-xs text-muted">Order: {col.display_order}</span>
                  </div>
                </div>
                <a href={`/collections/${col.slug}`} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 ml-4 inline-flex items-center gap-1 text-xs text-terracotta hover:text-terracotta-dark">
                  View <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================================
   Periods Tab
   ======================================== */

function PeriodsTab({ adminToken, showToast }: { adminToken: string; showToast: (msg: string, type: "success" | "error") => void }) {
  const [periods, setPeriods] = useState<PeriodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<PeriodItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PeriodItem | null>(null);
  const [form, setForm] = useState({ name: "", start_year: "", end_year: "", description: "" });

  const fetchPeriods = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.requestWithHeaders<{ success: boolean; data: PeriodItem[] }>("/admin/periods", "GET", { "X-Admin-Token": adminToken });
      if (res.success) setPeriods(res.data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [adminToken]);

  useEffect(() => { fetchPeriods(); }, [fetchPeriods]);

  const formatYear = (y: number | string) => {
    const n = Number(y);
    return Number.isFinite(n) ? (n < 0 ? `${Math.abs(n)} BCE` : `${n} CE`) : String(y);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      start_year: form.start_year ? parseInt(form.start_year) : null,
      end_year: form.end_year ? parseInt(form.end_year) : null,
      description: form.description || null,
    };
    try {
      if (creating) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>("/admin/periods", "POST", { "X-Admin-Token": adminToken }, payload);
        if (res.success) { showToast("Period created", "success"); setCreating(false); fetchPeriods(); }
        else { showToast(res.error?.message || "Failed", "error"); }
      } else if (editing) {
        const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/periods/${editing.id}`, "PUT", { "X-Admin-Token": adminToken }, payload);
        if (res.success) { showToast("Period updated", "success"); setEditing(null); fetchPeriods(); }
        else { showToast(res.error?.message || "Failed", "error"); }
      }
    } catch { showToast("Request failed", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await api.requestWithHeaders<{ success: boolean; error?: { message: string } }>(`/admin/periods/${deleteTarget.id}`, "DELETE", { "X-Admin-Token": adminToken });
    if (res.success) { showToast("Period deleted", "success"); setDeleteTarget(null); fetchPeriods(); }
    else { showToast(res.error?.message || "Cannot delete: period is in use", "error"); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={() => { setCreating(true); setEditing(null); setForm({ name: "", start_year: "", end_year: "", description: "" }); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
          <Plus className="h-4 w-4" /> Add Period
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 rounded-xl border border-terracotta/20 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">{creating ? "Create Period" : `Edit: ${editing?.name}`}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="text-muted hover:text-charcoal"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ancient Period"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Start Year * (negative = BCE, e.g. -3300)</label>
              <input type="number" value={form.start_year} onChange={(e) => setForm({ ...form, start_year: e.target.value })} placeholder="-3300"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">End Year (null = ongoing)</label>
              <input type="number" value={form.end_year} onChange={(e) => setForm({ ...form, end_year: e.target.value })} placeholder="700"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-terracotta resize-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark">
              <Save className="h-4 w-4" /> {creating ? "Create" : "Save"}
            </button>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <LoadingState /> : periods.length === 0 ? (
        <div className="text-center py-12"><Clock className="h-10 w-10 text-muted mx-auto mb-3" /><p className="text-muted">No periods found.</p></div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-stone">Period</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Duration</th>
                  <th className="text-left px-4 py-3 font-medium text-stone hidden md:table-cell">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-stone">Heritage</th>
                  <th className="text-right px-4 py-3 font-medium text-stone">Actions</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-charcoal">{p.name}</td>
                    <td className="px-4 py-3 text-stone text-xs">{formatYear(p.start_year)} — {p.end_year != null ? formatYear(p.end_year) : "present"}</td>
                    <td className="px-4 py-3 text-muted text-xs hidden md:table-cell line-clamp-2 max-w-[300px]">{p.description || "—"}</td>
                    <td className="px-4 py-3 text-stone">{p.heritage_count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => { setEditing(p); setCreating(false); setForm({ name: p.name, start_year: String(p.start_year), end_year: p.end_year != null ? String(p.end_year) : "", description: p.description || "" }); }}
                          className="p-1.5 rounded text-muted hover:text-terracotta"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded text-muted hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog title="Delete Period" message={`Delete \"${deleteTarget.name}\"? It must not be used by any heritage entities. (${deleteTarget.heritage_count} entities currently use it.)`}
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

/* ========================================
   Main Admin Page
   ======================================== */

export default function AdminPage() {
  const [adminToken, setAdminToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => setToast({ message, type });

  const fetchOverview = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const res = await api.requestWithHeaders<{ success: boolean; data: OverviewData }>("/admin/overview", "GET", { "X-Admin-Token": token });
      if (res.success) setOverview(res.data);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  const handleAuth = (token: string) => {
    setAdminToken(token);
    setAuthenticated(true);
    fetchOverview(token);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setAdminToken("");
    setOverview(null);
    setActiveTab("overview");
  };

  if (!authenticated) return <AdminLogin onAuth={handleAuth} />;

  const tabs: { key: AdminTab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "heritage", label: "Heritage", icon: Landmark },
    { key: "media", label: "Media", icon: Image },
    { key: "locations", label: "Locations", icon: MapPin },
    { key: "sources", label: "Sources", icon: BookOpen },
    { key: "users", label: "Users", icon: Users },
    { key: "collections", label: "Collections", icon: Layers },
    { key: "periods", label: "Periods", icon: Clock },
  ];

  return (
    <div className="py-6 sm:py-8">
      <Container>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">Admin Portal</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-charcoal">Management Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchOverview(adminToken)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted hover:text-charcoal transition-colors" title="Refresh">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted hover:text-red-600 hover:border-red-300 transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key ? "border-terracotta text-terracotta" : "border-transparent text-muted hover:text-charcoal"
                }`}>
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {loading && activeTab === "overview" ? <LoadingState /> : (
          <>
            {activeTab === "overview" && overview && <OverviewTab overview={overview} />}
            {activeTab === "heritage" && <HeritageTab adminToken={adminToken} showToast={showToast} />}
            {activeTab === "media" && <MediaTab adminToken={adminToken} showToast={showToast} />}
            {activeTab === "locations" && <LocationsTab adminToken={adminToken} showToast={showToast} />}
            {activeTab === "sources" && <SourcesTab adminToken={adminToken} showToast={showToast} />}
            {activeTab === "users" && <UsersTab adminToken={adminToken} showToast={showToast} />}
            {activeTab === "collections" && <CollectionsTab adminToken={adminToken} showToast={showToast} />}
            {activeTab === "periods" && <PeriodsTab adminToken={adminToken} showToast={showToast} />}
          </>
        )}
      </Container>
    </div>
  );
}
