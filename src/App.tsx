import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale,
  MessageSquare,
  Search,
  Copy,
  Check,
  Trash2,
  History,
  BookOpen,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Heart,
  Zap,
  Globe,
  RefreshCw,
  AlertCircle,
  Info,
  Lock,
  FileText,
  MousePointer,
  ArrowRight,
  Brain,
  HelpCircle,
  Flame
} from "lucide-react";

import { PRESET_COMMENTS, RESOURCE_ITEMS, DEBATE_STRATEGIES } from "./data";
import { PresetTrollComment, GeneratedCounter, SavedResponse } from "./types";

const BrandLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Outer elegant ring representing unity */}
    <circle cx="50" cy="50" r="46" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    
    {/* Speech Bubble Base */}
    <path
      d="M30 28C20.0589 28 12 36.0589 12 46C12 55.9411 20.0589 64 30 64H36L44 71V64H70C79.9411 64 88 55.9411 88 46C88 36.0589 79.9411 28 70 28H30Z"
      fill="url(#logo-grad)"
    />
    
    {/* Palestinian Red Triangle accent inside/on bottom-side */}
    <path
      d="M12 46L22 41V51L12 46Z"
      fill="#ef4444"
    />
    
    {/* Balanced scales & Olive branch combined emblem */}
    <path
      d="M33 50C38 48 43 43 48 41C53 39 58 40 63 41"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Olive Leaf 1 */}
    <path
      d="M38 48C37 44 39 41 42 42C43 44 41 47 38 48Z"
      fill="#ffffff"
    />
    {/* Olive Leaf 2 */}
    <path
      d="M45 44C46 40 49 39 50 42C49 44 47 45 45 44Z"
      fill="#ffffff"
    />
    {/* Olive Leaf 3 */}
    <path
      d="M53 40C53 36 56 36 57 39C56 41 54 41 53 40Z"
      fill="#ffffff"
    />
    {/* Olive Leaf 4 */}
    <path
      d="M60 41C62 37 65 38 64 41C62 42 61 42 60 41Z"
      fill="#ffffff"
    />
    
    {/* Justice Scale Bar symbol */}
    <path d="M28 52.5H72" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" opacity="0.9" />
  </svg>
);

export default function App() {
  // Input states
  const [inputText, setInputText] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState("factual");
  const [customContext, setCustomContext] = useState("");
  const [responseLanguage, setResponseLanguage] = useState("Hungarian");

  // Output states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [currentResult, setCurrentResult] = useState<GeneratedCounter | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // History states
  const [history, setHistory] = useState<SavedResponse[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  // UI status feedback
  const [copyStatus, setCopyStatus] = useState<string | null>(null); // 'response' | 'fact-X' | etc.
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resultRef = useRef<HTMLDivElement | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("higgadt_valasz_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Nem sikerült betölteni a helyi előzményeket:", e);
    }
  }, []);

  // Sync history to localStorage
  const saveHistoryToLocal = (newHistory: SavedResponse[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("higgadt_valasz_history", JSON.stringify(newHistory));
    } catch (e) {
      console.error("Nem sikerült menteni a helyi előzményeket:", e);
    }
  };

  // Preset loading trigger
  const handleSelectPreset = (preset: PresetTrollComment) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.commentText);
  };

  // Generate Counter Response via Backend API
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setErrorMsg("Kérlek először válassz egy sablont vagy írj be egy kommentet!");
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);
    setErrorMsg(null);
    setCurrentResult(null);
    setSelectedHistoryId(null);

    // Staggered loading animations to entertain and inform
    const loadingIntervals = [
      setTimeout(() => setLoadingStep(1), 800),
      setTimeout(() => setLoadingStep(2), 2000),
      setTimeout(() => setLoadingStep(3), 3400),
    ];

    try {
      const response = await fetch("/api/counter-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: inputText,
          tone: selectedStrategy,
          customContext: customContext,
          language: responseLanguage === "Hungarian" ? "Hungarian (magyar)" : "English (angol)"
        })
      });

      const data = await response.json();

      // Clear the loading step timeouts
      loadingIntervals.forEach(clearTimeout);

      if (!response.ok) {
        throw new Error(data.error || "Kommunikációs hiba történt a szerverrel.");
      }

      setCurrentResult(data);

      // Save into history
      const newSavedItem: SavedResponse = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        originalComment: inputText,
        tone: selectedStrategy,
        generatedAt: new Date().toLocaleString("hu-HU"),
        response: data.response,
        tacticalAdvice: data.tacticalAdvice,
        keyFactsUsed: data.keyFactsUsed,
        pitfallsToAvoid: data.pitfallsToAvoid
      };

      const updatedHistory = [newSavedItem, ...history];
      saveHistoryToLocal(updatedHistory);

      // Smooth scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

    } catch (err: any) {
      loadingIntervals.forEach(clearTimeout);
      console.error(err);
      setErrorMsg(err.message || "Ismeretlen hiba lépett fel a válaszgenerálás során.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle history item select
  const handleSelectHistoryItem = (item: SavedResponse) => {
    setSelectedHistoryId(item.id);
    setInputText(item.originalComment);
    setSelectedPresetId(null);
    setSelectedStrategy(item.tone);
    setCurrentResult({
      response: item.response,
      tacticalAdvice: item.tacticalAdvice,
      keyFactsUsed: item.keyFactsUsed,
      pitfallsToAvoid: item.pitfallsToAvoid
    });

    // Smooth scroll to results
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Delete history item
  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = history.filter(item => item.id !== id);
    saveHistoryToLocal(filtered);
    if (selectedHistoryId === id) {
      setSelectedHistoryId(null);
      setCurrentResult(null);
    }
  };

  // Copy to clipboard utility
  const copyToClipboard = (text: string, typeId: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(typeId);
    setTimeout(() => {
      setCopyStatus(null);
    }, 2000);
  };

  // Loading indicator messages step-by-step
  const getLoadingMessage = () => {
    switch (loadingStep) {
      case 0:
        return "Troll komment elemzése és nyelvezet értelmezése...";
      case 1:
        return "Történelmi háttér, ENSZ határozatok és jogi érvek feltérképezése...";
      case 2:
        return "Békés, határozott de higgadt palesztin válasz megfogalmazása gyűlöletbeszéd nélkül...";
      case 3:
        return "Utolsó simítások: Taktikai óvintézkedések és elkerülendő csapdák összegyűjtése...";
      default:
        return "Válasz generálása...";
    }
  };

  // Filters preset comments dynamically
  const filteredPresets = PRESET_COMMENTS.filter(preset => {
    const matchesSearch = preset.commentText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          preset.mythSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          preset.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Visual Header Panel with Palestine colors subtle integration */}
      <header className="relative bg-white border-b border-slate-200 overflow-hidden">
        {/* Top-line colors representing the Palestinian flag */}
        <div className="h-2 flex w-full">
          <div className="bg-black w-1/3 h-full"></div>
          <div className="bg-[#009739] w-1/3 h-full"></div>
          <div className="bg-[#ef4444] w-1/12 h-full relative">
            {/* Red triangle effect */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-[#ef4444]"></div>
          </div>
          <div className="bg-white w-3/12 h-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center p-1 bg-emerald-50 text-emerald-600 rounded-lg">
                  <BrandLogo className="w-10 h-10" />
                </span>
                <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
                  Higgadt Válaszadó
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  pro-Palesztin Narratíva Segéd
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500 max-w-2xl">
                Békés, tényalapú és nemzetközi jogi fókuszú válaszgenerátor a palesztin ügy méltóságteljes képviseletére és az online dezinformáció cáfolatára.
              </p>
            </div>

            {/* Quick stats / ethical banner */}
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 max-w-xs">
              <ShieldAlert className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Békés elköteleződés:</strong> Nem támogatunk erőszakot vagy gyűlöletbeszédet. Célunk az intelligens és méltó felvilágosítás.
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Control & Troll Presets (cols: 5) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Presets and Sablonok selection */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  Gyakori troll érvek keresője
                </h2>
                <span className="text-xs text-slate-400">Kattints egyre a teszteléshez</span>
              </div>

              {/* Search within presets */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Keresés az érvek, mítoszok között..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 bg-slate-50/50"
                  id="preset-search-input"
                />
              </div>

              {/* Preset List */}
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {filteredPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border sm:hover:border-emerald-300 sm:hover:bg-emerald-50/20 active:bg-emerald-50 ${
                      selectedPresetId === preset.id
                        ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                    type="button"
                    id={`preset-btn-${preset.id}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[10px] uppercase tracking-wide bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-sm">
                        {preset.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5 font-mono">
                        Kipróbálás <MousePointer className="w-3 h-3" />
                      </span>
                    </div>
                    <span className="font-medium text-slate-500 block line-clamp-1 mb-0.5">
                      Mítosz: {preset.mythSummary}
                    </span>
                    <p className="text-slate-800 line-clamp-2 italic font-serif">
                      &quot;{preset.commentText}&quot;
                    </p>
                  </button>
                ))}
                {filteredPresets.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Nincs a keresésnek megfelelő előre beállított érv.
                  </p>
                )}
              </div>
            </div>

            {/* Custom Input form & settings */}
            <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col gap-4">
              <div>
                <label htmlFor="comment-textarea" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Magad találtad? Másold be a troll kommentet:
                </label>
                <textarea
                  id="comment-textarea"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setSelectedPresetId(null); // Deselect preset since they are modifying/writing
                  }}
                  rows={4}
                  placeholder="Fejtsd le az Izrael-Palesztina témájú troll vagy támadó kommentet ide, amire választ akarsz adni..."
                  className="w-full p-3 text-sm rounded-lg border border-slate-200 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  required
                />
                <div className="text-right text-[11px] text-slate-400 mt-1">
                  Karakterszám: {inputText.length}
                </div>
              </div>

              {/* Tone style selection */}
              <div>
                <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Válaszreakció stratégiája ({DEBATE_STRATEGIES.length})
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {DEBATE_STRATEGIES.map((strat) => {
                    const isSelected = selectedStrategy === strat.id;
                    return (
                      <button
                        key={strat.id}
                        type="button"
                        onClick={() => setSelectedStrategy(strat.id)}
                        className={`p-2.5 rounded-lg text-left border transition-all text-xs flex flex-col justify-between h-20 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-950 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 sm:hover:bg-slate-50"
                        }`}
                        id={`strat-btn-${strat.id}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-semibold">{strat.title}</span>
                          {strat.id === "factual" && <Scale className="w-3.5 h-3.5" />}
                          {strat.id === "humanitarian" && <Heart className="w-3.5 h-3.5" />}
                          {strat.id === "historical" && <History className="w-3.5 h-3.5" />}
                          {strat.id === "short" && <Zap className="w-3.5 h-3.5" />}
                          {strat.id === "logical_debunk" && <Brain className="w-3.5 h-3.5" />}
                          {strat.id === "socratic" && <HelpCircle className="w-3.5 h-3.5" />}
                          {strat.id === "empathetic" && <MessageSquare className="w-3.5 h-3.5" />}
                          {strat.id === "creative_analogy" && <FileText className="w-3.5 h-3.5" />}
                          {strat.id === "sarcastic" && <Flame className="w-3.5 h-3.5 text-orange-500" />}
                        </div>
                        <span className={`text-[10px] leading-tight block line-clamp-2 ${
                          isSelected ? "text-slate-300" : "text-slate-400"
                        }`}>
                          {strat.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom criteria & Output Language */}
              <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <label htmlFor="lang-select" className="block text-[11px] font-semibold text-slate-600 uppercase">
                      Válasz nyelve:
                    </label>
                    <p className="text-[10px] text-slate-400">Hol folyik a vita?</p>
                  </div>
                  <select
                    id="lang-select"
                    value={responseLanguage}
                    onChange={(e) => setResponseLanguage(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-md p-1.5 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Hungarian">🇭🇺 Magyar (Standard)</option>
                    <option value="English">🇬🇧 English (Nemzetközi)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="custom-context" className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Extra szempont, egyéni kérés (Opcionális):
                  </label>
                  <input
                    type="text"
                    id="custom-context"
                    value={customContext}
                    onChange={(e) => setCustomContext(e.target.value)}
                    placeholder="pl: legyen kedves de határozott / említsd a bojkottot"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm text-white shadow-xs transition-all flex items-center justify-center gap-2 ${
                  isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 sm:hover:bg-emerald-700 active:bg-emerald-800"
                }`}
                id="generate-response-btn"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Higgadt válasz generálása...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Cáfolat Generálása</span>
                  </>
                )}
              </button>

              {errorMsg && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-100 text-xs flex gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Hiba történt:</span> {errorMsg}
                  </div>
                </div>
              )}
            </form>

            {/* Local History log */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3 text-slate-900">
                <h3 className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-4 h-4 text-slate-500" />
                  Korábbi generálások ({history.length})
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Biztosan törlöd az összes korábbi válaszodat az előzményekből?")) {
                        saveHistoryToLocal([]);
                      }
                    }}
                    className="text-[10px] text-red-500 sm:hover:text-red-700"
                    type="button"
                  >
                    Összes törlése
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                  <History className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                  <p className="text-xs text-slate-400 px-4">Egyelőre nincsenek elmentett válaszok. A generált válaszok ide mentődnek vissza.</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectHistoryItem(item)}
                      className={`text-left p-2 rounded-lg text-xs cursor-pointer border transition-all flex items-start gap-2 ${
                        selectedHistoryId === item.id
                          ? "bg-slate-100 border-slate-400 font-medium"
                          : "bg-slate-50/80 border-slate-100 sm:hover:bg-slate-50 text-slate-600"
                      }`}
                      id={`history-item-${item.id}`}
                    >
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${selectedHistoryId === item.id ? "text-emerald-500" : "text-slate-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span>{item.generatedAt}</span>
                          <span className="font-semibold uppercase text-[8px] bg-slate-200 text-slate-800 px-1 rounded">
                            {item.tone}
                          </span>
                        </div>
                        <p className="line-clamp-1 italic text-slate-500 text-[11px] mb-0.5">&quot;{item.originalComment}&quot;</p>
                        <p className="line-clamp-1 text-slate-900 font-medium text-[11px]">{item.response}</p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                        className="text-slate-400 sm:hover:text-red-600 p-1 flex-shrink-0"
                        title="Törlés"
                        type="button"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>

          {/* RIGHT COLUMN: Output Dashboard & Context Resources (cols: 7) */}
          <section ref={resultRef} className="lg:col-span-7 flex flex-col gap-6">
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                /* Interactive elegant loading window */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-xl shadow-xs border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[450px]"
                >
                  <div className="relative mb-6">
                    {/* Animated outer circle representing Palestinian colors */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="w-16 h-16 rounded-full border-4 border-t-white border-l-[#10b981] border-r-[#ef4444] border-b-black animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-emerald-500 absolute inset-0 m-auto" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                    Érvek megfogalmazása folyamatban...
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mb-6 h-12 flex items-center justify-center italic">
                    {getLoadingMessage()}
                  </p>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full max-w-md overflow-hidden relative">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-700"
                      style={{ width: `${(loadingStep + 1) * 25}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-8 space-y-2 text-left text-xs text-slate-400 max-w-md bg-slate-50 border border-slate-100 p-4 rounded-lg">
                    <span className="font-semibold text-slate-500 block">Miért tart ez pár másodpercig?</span>
                    <p>A Higgadt Válaszadó gondosan megvizsgálja a nemzetközi jogot, áthelyezi a fókuszt a puszta vádaskodásról a dokumentált igazságtalanságokra, és ellenőrzi a hangsúlyt, hogy az ne sértsen jóérzést, ne tartalmazzon antiszemita felhangot és mentes legyen az erőszak dicsőítésétől.</p>
                  </div>
                </motion.div>
              ) : currentResult ? (
                /* Generated results display window */
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* The Counter Response Card */}
                  <div className="bg-white rounded-xl shadow-xs border border-emerald-100 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 -z-0 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-4 relative z-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          Javasolt Counter-Komment (Másolható)
                        </h3>
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(currentResult.response, "response")}
                        className="inline-flex items-center gap-1.5 text-xs bg-slate-900 sm:hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg font-medium transition-all"
                        id="copy-comment-btn"
                        type="button"
                      >
                        {copyStatus === "response" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Másolva!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Válasz másolása</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Original comment citation */}
                    {inputText && (
                      <div className="mb-4 p-3 bg-slate-50 border-l-2 border-slate-300 text-slate-500 text-xs italic">
                        <span className="text-[10px] font-bold block text-slate-400 select-none uppercase mb-1">Eredeti provokáció:</span>
                        &quot;{inputText}&quot;
                      </div>
                    )}

                    {/* Generated Draft area */}
                    <div className="bg-emerald-50/20 rounded-lg border border-emerald-50 p-4 relative">
                      <p className="text-slate-800 font-serif leading-relaxed text-sm whitespace-pre-wrap selection:bg-emerald-200">
                        {currentResult.response}
                      </p>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 flex-shrink-0" />
                      Tipp: Beillesztés előtt átolvashatod és személyre is szabhatod a saját szavaiddal a hitelesség kedvéért!
                    </p>
                  </div>

                  {/* Tactical Advice & Taktikai Útmutató */}
                  <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Miért működik ez a válasz? (Taktikai tanács)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {currentResult.tacticalAdvice}
                    </p>
                  </div>

                  {/* Facts list & Nemzetközi jogi forrástár */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* CSATORNÁZOTT TÉNYEK */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                      <div className="flex items-center gap-1.5 mb-3 text-emerald-800 border-b border-slate-100 pb-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Felhasznált Tények, Források
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {currentResult.keyFactsUsed.map((fact, index) => (
                          <li key={index} className="text-xs text-slate-700 flex gap-2 items-start">
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono h-5 w-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="leading-relaxed">{fact}</p>
                              <button
                                onClick={() => copyToClipboard(fact, `fact-${index}`)}
                                className="text-[9px] text-slate-400 font-semibold sm:hover:text-emerald-500 mt-1 inline-flex items-center gap-1"
                                type="button"
                              >
                                {copyStatus === `fact-${index}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-500" />
                                    <span className="text-emerald-600">Másolva!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-2.5 h-2.5" />
                                    <span>Tény másolása külön</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CSAPDÁK ELKERÜLÉSE */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                      <div className="flex items-center gap-1.5 mb-3 text-red-800 border-b border-slate-100 pb-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Kerülendő Csapdák vitában
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {currentResult.pitfallsToAvoid.map((pitfall, index) => (
                          <li key={index} className="text-xs text-slate-700 flex gap-2 items-start">
                            <span className="bg-red-50 text-red-700 border border-red-100 text-[9px] font-mono h-5 w-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                              !
                            </span>
                            <p className="leading-relaxed leading-normal">{pitfall}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </motion.div>
              ) : (
                /* Empty / Waiting State */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-xs border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[480px]"
                >
                  <div className="mb-4">
                    <BrandLogo className="w-20 h-20 mx-auto" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    Higgadt palesztin-barát érvelő pult
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                    Válassz ki egy gyakori troll állítást a bal oldali listából, vagy másolj be egy hozzászólást a közösségi médiáról. Miután kiválasztottad a beszédmód-stratégiát, kattints a <strong className="text-emerald-700">Cáfolat Generálása</strong> gombra!
                  </p>

                  {/* Simple instructional steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md text-left text-[11px] text-slate-400 border-t border-slate-100 pt-6">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <span className="w-4 h-4 bg-slate-200 rounded-full inline-flex items-center justify-center font-mono text-[9px]">1</span>
                        Komment Másolás
                      </span>
                      <span>Másold be a megválaszolatlan, elfogult vagy hibás állítást.</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <span className="w-4 h-4 bg-slate-200 rounded-full inline-flex items-center justify-center font-mono text-[9px]">2</span>
                        Fókusz Kiválasztás
                      </span>
                      <span>Döntsd el, hogy számadatokkal, történelmi adatokkal vagy röviden reagálsz.</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <span className="w-4 h-4 bg-slate-200 rounded-full inline-flex items-center justify-center font-mono text-[9px]">3</span>
                        Békés Aktivizmus
                      </span>
                      <span>Másold és illeszd be, hogy eloszlasd a dezinformációs fellegeket.</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Békés Etikai Kódex / Ethical discourse code card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 mt-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
                Online Etikai Kódex a Palesztin Narratíva Védelméért
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="space-y-2">
                  <p className="font-semibold text-slate-800">1. Válaszd külön a zsidó embereket és az izraeli állam tetteit</p>
                  <p className="leading-relaxed">Zsidó szervezetek és egyének ezrei állnak ki világszerte a palesztin szabadság mellett. Az antiszemitizmus elfogadhatatlan, gyengíti a palesztin ügy legitimitását, és áthelyezi a fókuszt a bűncselekményekről.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-800">2. Mutass empátiát az ártatlan civilek irányába</p>
                  <p className="leading-relaxed">Bármilyen katonai akció okozta civil szenvedést (legyen az palesztin vagy izraeli) elítélünk. Hangsúlyozd, hogy mi békét, egyenlőséget és a katonai megszállás megszüntetését kérjük.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-800">3. Kerüld a vádaskodáson való dühöngést</p>
                  <p className="leading-relaxed">A dühös visszavágás és szidalmazás pontosan az, amit a trollok akarnak (derailing). Ha tényeken, jogsértéseken és az ENSZ alapszabályain maradsz, a trolloknak nincs kapaszkodójuk.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-800">4. Használj elismert külső forrásokat</p>
                  <p className="leading-relaxed">Ha téged vádolnak elfogultsággal, utalj rá, hogy az érveid izraeli emberi jogi szervezetektől (B&apos;Tselem) vagy elismert nemzetközi NGO-któl származnak.</p>
                </div>
              </div>
            </div>

          </section>

        </div>

        {/* BOTTOM SECTION: Permanent Reference Library & Evidence Locker */}
        <section className="mt-8 bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Hiteles Nemzetközi Ténytár és ENSZ Alapok
              </h3>
              <p className="text-xs text-slate-400">Az alábbi nemzetközi források segítenek elmélyíteni a tudásod és biztosítják az egyértelmű hivatkozási pontokat online vitákban.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCE_ITEMS.map((resItem, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between hover:shadow-xs transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      resItem.category === "un" ? "bg-blue-100 text-blue-800" :
                      resItem.category === "ngo" ? "bg-purple-100 text-purple-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {resItem.category === "un" ? "ENSZ Szervezet" :
                       resItem.category === "ngo" ? "Nemzetközi Jogvédő" : "Nemzetközi Jog"}
                    </span>
                    <button
                      onClick={() => copyToClipboard(resItem.url, `res-${idx}`)}
                      className="text-[10px] text-slate-400 sm:hover:text-emerald-500 inline-flex items-center gap-1"
                      type="button"
                    >
                      {copyStatus === `res-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600">Link másolva</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Link másolása</span>
                        </>
                      )}
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">{resItem.title}</h4>
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">{resItem.description}</p>
                </div>
                <a
                  href={resItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-600 sm:hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
                  referrerPolicy="no-referrer"
                >
                  {resItem.linkText} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Modern minimal footer with developer / AI Studio information */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>© 2026 Higgadt Válaszadó. Minden jog fenntartva.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Powered by Gemini 3.5-flash AI & aistudio-build</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium">Békés online kultúráért, egyenjogúságért</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
