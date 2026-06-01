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
  FileText,
  MousePointer,
  Brain,
  HelpCircle,
  Flame,
  Trophy,
  RotateCcw,
  Compass,
  CheckCircle2,
  XCircle,
  Download,
  Cloud,
  Eye,
  Terminal,
  Sliders,
  Code
} from "lucide-react";

import {
  PRESET_COMMENTS,
  RESOURCE_ITEMS,
  DEBATE_STRATEGIES,
  PROPAGANDA_TACTICS,
  QUIZ_QUESTIONS
} from "./data";
import {
  PresetTrollComment,
  GeneratedCounter,
  SavedResponse,
  PropagandaTactic,
  QuizQuestion,
  OsintResult,
  OsintFinding,
  OsintNarrative
} from "./types";

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
    <circle cx="50" cy="50" r="46" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
    <path
      d="M30 28C20.0589 28 12 36.0589 12 46C12 55.9411 20.0589 64 30 64H36L44 71V64H70C79.9411 64 88 55.9411 88 46C88 36.0589 79.9411 28 70 28H30Z"
      fill="url(#logo-grad)"
    />
    <path
      d="M12 46L22 41V51L12 46Z"
      fill="#ef4444"
    />
    <path
      d="M33 50C38 48 43 43 48 41C53 39 58 40 63 41"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M38 48C37 44 39 41 42 42C43 44 41 47 38 48Z"
      fill="#ffffff"
    />
    <path
      d="M45 44C46 40 49 39 50 42C49 44 47 45 45 44Z"
      fill="#ffffff"
    />
    <path
      d="M53 40C53 36 56 36 57 39C56 41 54 41 53 40Z"
      fill="#ffffff"
    />
    <path
      d="M60 41C62 37 65 38 64 41C62 42 61 42 60 41Z"
      fill="#ffffff"
    />
    <path d="M28 52.5H72" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" opacity="0.9" />
  </svg>
);

const getApiUrl = (path: string): string => {
  const isCapacitor = typeof window !== "undefined" && (
    (window as any).Capacitor || 
    window.location.protocol === "capacitor:" ||
    window.location.protocol === "file:" ||
    (window.location.hostname === "localhost" && !window.location.port)
  );

  if (isCapacitor) {
    return `https://ais-pre-ikpxmp3zwudpehdhk7ofrl-759050678263.europe-west2.run.app${path}`;
  }
  return path;
};

const PYTHON_SCRIPT_CODE = `#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
================================================================================
                    HASBARA SEEKER v1.2.0 - HUNGARIAN OSINT SCANNER
================================================================================
Ez a Python-alapú OSINT (nyílt forráskódú hírszerzési) projekt arra szolgál, hogy
szanálja és elemezze a főbb magyar hírportálok cikkeit az Izrael-Palesztina konfliktus
kapcsán. Kiszűri és pontozza a tipikus kormánynarratívákat, az izraeli hasbara pult
(spin gép) szófordulatait, és kimutatja a szövegbeli elfogultság szintjét.

Telepítési parancs:
   pip install requests beautifulsoup4 feedparser html5lib

Futtatási parancs:
   python hasbara_seeker.py
================================================================================
"""

import os
import re
import feedparser
import requests
from bs4 import BeautifulSoup

# Súlyozott indikátorok a magyarországi hírfolyamokhoz:
PRO_ISRAEL_INDICATORS = {
    "önvédelemhez való jog": 3,
    "joga van megvédeni magát": 3,
    "terroristák mögé bújnak": 3,
    "emberi pajzsként használ": 3,
    "a térség egyetlen demokráciája": 3,
    "palesztin terroristák": 2,
    "hamász-terroristák": 2,
    "terroralagút": 2,
    "fegyverraktárként használt": 3,
    "nem provokált": 2,
}

PRO_PALESTINE_INDICATORS = {
    "megszállás": 2,
    "illegális telepek": 3,
    "gázai népirtás": 3,
    "apartheid-rendszer": 3,
    "civil áldozatok": 1,
    "humanitárius katasztrófa": 2,
    "kollektív büntetés": 3,
    "nemzetközi bíróság": 2,
    "ensz határozat": 2,
}

FEEDS = {
    "Mandiner-Külföld": "https://mandiner.hu/rss/rss_all.xml",
    "Telex-Külföld": "https://telex.hu/rss/kulvelemeny",
    "Index-Külföld": "https://index.hu/kulfold/rss",
    "Origo-Külföld": "https://www.origo.hu/rss/kulfold/index.xml"
}

def analyze_text(text):
    text_lower = text.lower()
    h_score = 0
    p_score = 0
    matched = []
    
    for kw, weight in PRO_ISRAEL_INDICATORS.items():
        count = len(re.findall(re.escape(kw), text_lower))
        if count > 0:
            h_score += count * weight
            matched.append(f"{kw} [HASBARA] (x{count})")
            
    for kw, weight in PRO_PALESTINE_INDICATORS.items():
        count = len(re.findall(re.escape(kw), text_lower))
        if count > 0:
            p_score += count * weight
            matched.append(f"{kw} [ELLENPONT] (x{count})")
            
    return h_score, p_score, matched

print("="*75)
print("             🛰️  HASBARA SEEKER PYTHON OSINT SCANNER v1.2.0  🛰️")
print("="*75)

for portal, url in FEEDS.items():
    print(f"\\n📡 Lekérés folyamatban: {portal}...")
    try:
        feed = feedparser.parse(url)
        print(f"   Friss hírfolyam tételek száma: {len(feed.entries)}")
        analyzed_count = 0
        
        for entry in feed.entries[:8]:
            title = entry.get("title", "")
            summary = entry.get("summary", entry.get("description", ""))
            content = title + " " + summary
            
            # Konfliktus-relevancia vizsgálat
            relevance = ["gáza", "izrael", "palesztin", "palesztina", "hamasz", "hamász"]
            if not any(r in content.lower() for r in relevance):
                continue
                
            analyzed_count += 1
            h_score, p_score, matches = analyze_text(content)
            
            bias_ratio = 0
            if (h_score + p_score) > 0:
                bias_ratio = (h_score - p_score) / (h_score + p_score)
                
            status = "KIEGYENSÚLYOZOTT CONTEXT"
            if bias_ratio > 0.2:
                status = "ERŐSEN PRO-ISRAEL / HASBARA"
            elif bias_ratio < -0.2:
                status = "KRITIKUS / PRO-PALESTIN"
                
            print(f"   -> Cikk: {title}")
            print(f"      Pontszámok: Hasbara: {h_score} | Palesztin: {p_score} | {status}")
            if matches:
                print(f"      Kiszűrt kulcsszavak: {', '.join(matches[:4])}")
                
        if analyzed_count == 0:
            print("   (Nincs aktuális közel-keleti cikk ezen a hírfolyamon.)")
    except Exception as e:
        print(f"   ❌ Hárítási hiba a hírfolyam olvasásában: {e}")
`;

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"ai" | "database" | "tactics" | "quiz" | "osint">("ai");

  // OSINT (Hasbara Seeker) States
  const [osintTargetDomain, setOsintTargetDomain] = useState("mandiner.hu");
  const [osintKeyword, setOsintKeyword] = useState("Gáza");
  const [osintResult, setOsintResult] = useState<OsintResult | null>(null);
  const [osintLoading, setOsintLoading] = useState(false);
  const [osintError, setOsintError] = useState<string | null>(null);
  const [osintConsoleLogs, setOsintConsoleLogs] = useState<string[]>([]);
  const [activeOsintView, setActiveOsintView] = useState<"terminal" | "code" | "findings">("terminal");

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

  // Search and filter states (Mítosztár tab)
  const [dbSearchQuery, setDbSearchQuery] = useState("");
  const [dbSelectedCategory, setDbSelectedCategory] = useState<string>("all");
  const [expandedMythId, setExpandedMythId] = useState<string | null>(null);

  // Quiz states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // UI status feedback
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const resultRef = useRef<HTMLDivElement | null>(null);

  // Categories extraction for Filter Chips
  const allCategories = ["all", ...Array.from(new Set(PRESET_COMMENTS.map(item => item.category)))];

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
      setTimeout(() => setLoadingStep(1), 850),
      setTimeout(() => setLoadingStep(2), 1900),
      setTimeout(() => setLoadingStep(3), 3100),
    ];

    try {
      const response = await fetch(getApiUrl("/api/counter-comment"), {
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

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

    } catch (err: any) {
      loadingIntervals.forEach(clearTimeout);
      console.error(err);
      setErrorMsg(err.message || "Ismeretlen hiba lépett fel a válaszgenerálás során. Kérjük ellenőrizze a GEMINI_API_KEY-t a Secrets menüben.");
    } finally {
      setIsLoading(false);
    }
  };

  // OSINT Hasbara Seeker execution
  const handleOsintScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setOsintLoading(true);
    setOsintError(null);
    setOsintResult(null);
    setActiveOsintView("terminal");
    setOsintConsoleLogs([
      "⚙️ HASBARA SEEKER v1.2.0 - OSINT vizsgáló motor indítása...",
      "🔍 Rendszer-paraméterek inicializálása a magyar nyilvántartásokra és hírfolyamokra..."
    ]);

    const addLog = (text: string, delay: number) => {
      return setTimeout(() => {
        setOsintConsoleLogs(prev => [...prev, text]);
      }, delay);
    };

    const timers = [
      addLog(`📡 Célpont vizsgálat: https://${osintTargetDomain}`, 600),
      addLog(`🧬 Kulcsszó- és kifejezésszűrő beállítva: "${osintKeyword}"`, 1300),
      addLog("📂 Magyar hírügynökségi hírfolyamok és archív RSS tételek szűrése...", 2100),
      addLog("🕷️ HTML struktúraelemzés és hivatkozott csatornák követése...", 3000),
      addLog("🤖 Szövegbányászat és egyoldalú nyelvi indikátor számlálók elemzése...", 4000),
      addLog("🪐 NLP narratíva-osztályozás és kormányszintű spin szűrés Gemini AI segítségével...", 5000),
      addLog("📊 Statisztikai mutatók képzése és manipulációs kockázat mérése...", 6000),
    ];

    try {
      const response = await fetch(getApiUrl("/api/osint-scan"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetDomain: osintTargetDomain,
          keyword: osintKeyword
        })
      });

      const data = await response.json();
      timers.forEach(clearTimeout);

      if (!response.ok) {
        throw new Error(data.error || "Kommunikációs hiba az OSINT szerverrel.");
      }

      setOsintConsoleLogs(prev => [
        ...prev,
        "✅ Sikeres adatlehívás és NLP narratíva-feldolgozás!",
        "📈 OSINT Hírszerzési Jelentés összeállítva.",
        `📉 Biztonsági kockázati szint kiszámolva: ${data.riskLevel}`,
        "💼 Vizsgálat sikeresen lezárva. Eredmények a kezelőpulton betöltve."
      ]);

      setOsintResult(data);
      setTimeout(() => {
        setActiveOsintView("findings");
      }, 1000);
      
    } catch (err: any) {
      timers.forEach(clearTimeout);
      console.error(err);
      setOsintError(err.message || "Ismeretlen hiba lépett fel az OSINT vizsgálat során. Győződj meg a Secrets beállításokról!");
      setOsintConsoleLogs(prev => [...prev, `❌ HIBA: Vizsgálat meghiúsult. Részletek: ${err.message}`]);
    } finally {
      setOsintLoading(false);
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

  // Load a database refutation into the AI generator
  const handleLoadToAi = (myth: PresetTrollComment) => {
    setInputText(myth.commentText);
    setSelectedPresetId(myth.id);
    setActiveTab("ai");
    setTimeout(() => {
      window.scrollTo({ top: 350, behavior: "smooth" });
    }, 200);
  };

  // Quiz submission & state change handlers
  const handleQuizOptionClick = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizIndex(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizIndex === null || quizSubmitted) return;
    setQuizSubmitted(true);
    const question = QUIZ_QUESTIONS[currentQuizIndex];
    if (selectedQuizIndex === question.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleQuizNext = () => {
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedQuizIndex(null);
      setQuizSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const getQuizRank = (score: number) => {
    const ratio = score / QUIZ_QUESTIONS.length;
    if (ratio >= 0.8) return "Tényszerű Diplomata 🇵🇸";
    if (ratio >= 0.5) return "Haladó Tizenkettedik";
    return "Ténybúvár Tanuló";
  };

  // Filter preset comments dynamically for search
  const filteredPresets = PRESET_COMMENTS.filter(preset => {
    const matchesSearch = preset.commentText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          preset.mythSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          preset.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Filter for database tab
  const filteredDbMyths = PRESET_COMMENTS.filter(myth => {
    const matchesSearch = myth.commentText.toLowerCase().includes(dbSearchQuery.toLowerCase()) ||
                          myth.mythSummary.toLowerCase().includes(dbSearchQuery.toLowerCase()) ||
                          (myth.localDebunk?.rebuttal.toLowerCase().includes(dbSearchQuery.toLowerCase()) || false);
    const matchesCategory = dbSelectedCategory === "all" || myth.category === dbSelectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLoadingMessage = () => {
    switch (loadingStep) {
      case 0:
        return "Troll komment mélyelemzése és érvelési pontok szétválasztása...";
      case 1:
        return "Törvényi alapok (Genfi Egyezmények, ENSZ határozatok) lekérdezése...";
      case 2:
        return "Békés, határozott palesztin válaszminta ölése szigorúan gyűlöletmentesen...";
      case 3:
        return "Utolsó ellenőrzés: taktikai intellektuális tanácsok és csapda-hárítás rendezése...";
      default:
        return "Válasz generálása...";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased font-sans">
      {/* Visual Header Panel with Palestine colors subtle integration */}
      <header className="relative bg-white border-b border-slate-200">
        <div className="h-2 flex w-full">
          <div className="bg-black w-1/3 h-full"></div>
          <div className="bg-[#009739] w-1/3 h-full"></div>
          <div className="bg-[#ef4444] w-1/12 h-full relative">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-[#ef4444]"></div>
          </div>
          <div className="bg-white w-3/12 h-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center p-1 bg-emerald-50 text-emerald-600 rounded-lg">
                  <BrandLogo className="w-10 h-10" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
                    Higgadt Válaszadó
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-sm">
                    Hasbara cáfolat és ténygyűjtemény
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl">
                Békés, nemzetközi jogi fókuszú és emberi jogi központú magyar válaszgenerátor az igazságos és méltóságteljes online képviseletért.
              </p>
            </div>

            {/* Quick stats / ethical banner */}
            <div className="flex items-center gap-2.5 text-[11px] text-emerald-800 bg-emerald-50/75 px-3.5 py-2.5 rounded-lg border border-emerald-100 max-w-sm">
              <ShieldAlert className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Békés elvek:</strong> Nemzetközi jogon és tényszerűségen alapuló megközelítés. Szigorúan gyűlöletbeszéd-mentesen és az erőszak dicsőítése nélkül.
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 scrollbar-none py-1.5">
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "ai"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/40"
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              🧠 AI Válaszadó Generator
            </button>
            <button
              onClick={() => setActiveTab("database")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "database"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/40"
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              🗃️ Mítosz-cáfoló Tár (Offline)
            </button>
            <button
              onClick={() => setActiveTab("tactics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "tactics"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/40"
              }`}
            >
              <Brain className="w-4 h-4 text-purple-500" />
              🛡️ Propaganda Technikák
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "quiz"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/40"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              🧠 Ismeretterjesztő Kvíz ({QUIZ_QUESTIONS.length})
            </button>
            <button
              onClick={() => setActiveTab("osint")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "osint"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/40"
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-600 animate-pulse" />
              🛰️ Hasbara Seeker (OSINT)
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: AI VÁLASZADÓ */}
        {activeTab === "ai" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Input Control & Troll Presets (cols: 5) */}
            <section className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Presets and Sablonok selection */}
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    Betelepített mítoszok keresője
                  </h2>
                  <span className="text-[10px] text-slate-400">Töltsd be az AI-ba</span>
                </div>

                {/* Search within presets */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Keresés pl: ENSZ, Gáza, választások..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 bg-slate-50/50"
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
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-[10px] uppercase tracking-wide bg-slate-200 text-slate-700 px-1.5  rounded-xs">
                          {preset.category}
                        </span>
                        <span className="text-[9px] text-slate-400 flex items-center gap-0.5 font-mono">
                          Kiválasztás <MousePointer className="w-3 h-3" />
                        </span>
                      </div>
                      <span className="font-semibold text-slate-600 block line-clamp-1 mb-0.5">
                        Mítosz: {preset.mythSummary}
                      </span>
                      <p className="text-slate-800 line-clamp-1 italic font-serif">
                        &quot;{preset.commentText}&quot;
                      </p>
                    </button>
                  ))}
                  {filteredPresets.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">
                      Nincs a keresésnek megfelelő előre beállított argumentum.
                    </p>
                  )}
                </div>
              </div>

              {/* Custom Input form & settings */}
              <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col gap-4">
                <div>
                  <label htmlFor="comment-textarea" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Egyéb kommentet bírálsz? Másold be ide:
                  </label>
                  <textarea
                    id="comment-textarea"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      setSelectedPresetId(null);
                    }}
                    rows={4}
                    placeholder="Másold be a közösségi médián (X, FB, reddit) látott Hasbara troll hozzászólást..."
                    className="w-full p-3 text-sm rounded-lg border border-slate-200 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    required
                  />
                  <div className="text-right text-[11px] text-slate-400 mt-1">
                    Karakterek száma: {inputText.length}
                  </div>
                </div>

                {/* Tone style selection */}
                <div>
                  <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Válaszreakció stílustónusa
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {DEBATE_STRATEGIES.map((strat) => {
                      const isSelected = selectedStrategy === strat.id;
                      return (
                        <button
                          key={strat.id}
                          type="button"
                          onClick={() => setSelectedStrategy(strat.id)}
                          className={`p-2 rounded-lg text-left border transition-all text-xs flex flex-col justify-between h-18 ${
                            isSelected
                              ? "bg-slate-900 text-white border-slate-950 shadow-xs"
                              : "bg-white text-slate-700 border-slate-200 sm:hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-[11px]">{strat.title}</span>
                            {strat.id === "factual" && <Scale className="w-3.5 h-3.5 text-blue-500" />}
                            {strat.id === "humanitarian" && <Heart className="w-3.5 h-3.5 text-red-500" />}
                            {strat.id === "historical" && <History className="w-3.5 h-3.5 text-amber-500" />}
                            {strat.id === "short" && <Zap className="w-3.5 h-3.5 text-yellow-500" />}
                            {strat.id === "logical_debunk" && <Brain className="w-3.5 h-3.5 text-purple-500" />}
                            {strat.id === "socratic" && <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />}
                            {strat.id === "empathetic" && <MessageSquare className="w-3.5 h-3.5 text-teal-400" />}
                            {strat.id === "creative_analogy" && <FileText className="w-3.5 h-3.5 text-sky-500" />}
                            {strat.id === "sarcastic" && <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />}
                          </div>
                          <span className={`text-[9px] leading-tight block line-clamp-2 ${
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
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <label htmlFor="lang-select" className="block text-[10px] font-semibold text-slate-600 uppercase">
                        Válasz generálási nyelv:
                      </label>
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
                    <label htmlFor="custom-context" className="block text-[10px] font-semibold text-slate-600 uppercase mb-1">
                      Különleges kérés, fókuszpont (Opcionális):
                    </label>
                    <input
                      type="text"
                      id="custom-context"
                      value={customContext}
                      onChange={(e) => setCustomContext(e.target.value)}
                      placeholder="pld. említsd meg a gázai vízkészlet hiányát / határozott, de elegáns tónus..."
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:outline-hidden"
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
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Hasbara Cáfolat kidolgozása...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Cáfolat Generálása (Gemini)</span>
                    </>
                  )}
                </button>

                {errorMsg && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-100 text-xs flex gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Szerver megjegyzés:</span> {errorMsg}
                    </div>
                  </div>
                )}
              </form>

              {/* Local History log */}
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3 text-slate-900">
                  <h3 className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-4 h-4 text-slate-500" />
                    Korábbi generálásaid ({history.length})
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
                    <p className="text-[11px] text-slate-400 px-4">Egyelőre nincsenek helyi előzmények. A sikeresen legenerált cáfolataid ide fognak mentődni.</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectHistoryItem(item)}
                        className={`text-left p-2 rounded-lg text-xs cursor-pointer border transition-all flex items-start gap-2 ${
                          selectedHistoryId === item.id
                            ? "bg-slate-100 border-slate-400 font-medium"
                            : "bg-slate-50/80 border-slate-100 sm:hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${selectedHistoryId === item.id ? "text-emerald-500" : "text-slate-400"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                            <span>{item.generatedAt}</span>
                            <span className="font-semibold uppercase text-[8px] bg-slate-200 text-slate-800 px-1 rounded-sm">
                              {item.tone}
                            </span>
                          </div>
                          <p className="line-clamp-1 italic text-slate-500 text-[10px] mb-0.5">&quot;{item.originalComment}&quot;</p>
                          <p className="line-clamp-1 text-slate-950 font-medium text-[10px]">{item.response}</p>
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
                      <div className="absolute inset-0 rounded-full border-4 border-slate-150"></div>
                      <div className="w-16 h-16 rounded-full border-4 border-t-[#009739] border-l-[#ef4444] border-r-black border-b-[#cbd5e1] animate-spin"></div>
                      <Sparkles className="w-6 h-6 text-emerald-500 absolute inset-0 m-auto" />
                    </div>

                    <h3 className="text-base font-bold text-slate-950 mb-2">
                      Factual & Legal Analízis...
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-6 h-10 flex items-center justify-center italic">
                      {getLoadingMessage()}
                    </p>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full max-w-sm overflow-hidden relative">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-700"
                        style={{ width: `${(loadingStep + 1) * 25}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-8 space-y-2 text-left text-[11px] text-slate-500 max-w-sm bg-slate-50 border border-slate-100 p-4 rounded-lg leading-relaxed">
                      <span className="font-semibold text-slate-700 block text-xs">A MI felelősségteljes háttérmunkája:</span>
                      <p>Kezdeményezett válaszaink soha nem süllyednek személyes sértések szintjére. Megkeressük az Amnesty International, HRW és az ENSZ hivatalos emberi jogi és legális hivatkozásait, hogy ellenállhatatlan, száraz tényszerű érveket és elkerülendő vitacsapdákat adjunk a kezedbe.</p>
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
                            Javasolt Cáfolat-Válasz (Másolható)
                          </h3>
                        </div>
                        
                        <button
                          onClick={() => copyToClipboard(currentResult.response, "response")}
                          className="inline-flex items-center gap-1.5 text-xs bg-slate-900 sm:hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg font-semibold transition-all"
                        >
                          {copyStatus === "response" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Másolva!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Szöveg másolása</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Original comment citation */}
                      {inputText && (
                        <div className="mb-4 p-3 bg-slate-50 border-l-2 border-slate-300 text-slate-500 text-xs italic">
                          <span className="text-[9px] font-bold block text-slate-400 select-none uppercase mb-0.5">Eredeti provokatív érv:</span>
                          &quot;{inputText}&quot;
                        </div>
                      )}

                      {/* Generated Draft area */}
                      <div className="bg-emerald-50/10 rounded-lg border border-emerald-100 p-4 relative">
                        <p className="text-slate-850 font-serif leading-relaxed text-sm whitespace-pre-wrap selection:bg-emerald-100">
                          {currentResult.response}
                        </p>
                      </div>

                      <p className="text-[10px] text-slate-400 mt-2.5 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 flex-shrink-0 text-slate-450" />
                        Tipp: Mindig javasoljuk, hogy az elküldés előtt olvasd át és szabkozd át a saját szavaiddal a teljesen organikus és emberi tónus érdekében!
                      </p>
                    </div>

                    {/* Tactical Advice */}
                    <div className="bg-slate-905 bg-slate-900 text-white rounded-xl p-5 shadow-xs relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          Miért működik ez a válaszminta? (Taktikai Tanács)
                        </h4>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentResult.tacticalAdvice}
                      </p>
                    </div>

                    {/* Facts list & Nemzetközi jogi forrástár */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* CSATORNÁZOTT TÉNYEK */}
                      <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center gap-1.5 mb-3 text-emerald-900 border-b border-slate-100 pb-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                            Beépített Tények és Hivatkozások
                          </h4>
                        </div>
                        <ul className="space-y-2.5">
                          {currentResult.keyFactsUsed.map((fact, index) => (
                            <li key={index} className="text-xs text-slate-700 flex gap-2 items-start">
                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 text-[9px] font-mono h-5 w-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="leading-relaxed text-slate-600">{fact}</p>
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
                        <div className="flex items-center gap-1.5 mb-3 text-red-900 border-b border-slate-100 pb-2">
                          <ShieldAlert className="w-4 h-4 text-red-500" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                            Kerülendő Csapdák ebben a vitatémában
                          </h4>
                        </div>
                        <ul className="space-y-2.5">
                          {currentResult.pitfallsToAvoid.map((pitfall, index) => (
                            <li key={index} className="text-xs text-slate-600 flex gap-2 items-start">
                              <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-mono h-5 w-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 font-bold">
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
                      <BrandLogo className="w-18 h-18 mx-auto" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
                      Interaktív válasz-szimulációs pult
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                      Válassz egyet a bal oldali népszerű mítoszok közül mintasablonként, vagy illessz be egy saját kezűleg talált elfogult kommentet. Válaszd ki hozzá a megcáfolási taktikádat, majd nyomj a <strong>Cáfolat Generálása</strong> gombra!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md text-left text-[11px] text-slate-400 border-t border-slate-100 pt-6">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-4 h-4 bg-slate-200 rounded-full inline-flex items-center justify-center font-mono text-[9px] text-slate-800">1</span>
                          Másold a bejegyzést
                        </span>
                        <span>Másolj be bármilyen manipulatív vagy fiktív hasbara felvetést.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-4 h-4 bg-slate-200 rounded-full inline-flex items-center justify-center font-mono text-[9px] text-slate-800">2</span>
                          Válassz stratégiát
                        </span>
                        <span>Szabályozd a stílust: tényalapú, szókratészi kérdező vagy finom irónia.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-4 h-4 bg-slate-200 rounded-full inline-flex items-center justify-center font-mono text-[9px] text-slate-800">3</span>
                          Győzz le a dezinformációt
                        </span>
                        <span>Oszlasd el a tévszellemeket száraz, megdönthetetlen nemzetközi jogi hivatkozásokkal.</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Békés Etikai Kódex */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
                  Aktivista Kódex az Igazságos Képviseletért
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">1. Soha ne használj antiszemitizmust</p>
                    <p className="leading-relaxed">A zsidó kulturális/vallási identitás és az izraeli megszálló állampolitika két teljesen különböző fogalom. Az antiszemita megjegyzések vállalhatatlanok, gyengítik a palesztin szabadság ügyét, és elterelik a szót a jogsérésekről.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">2. Fejezz ki együttérzést minden civil felé</p>
                    <p className="leading-relaxed">Egy fegyvertelen család, akár palesztin, akár izraeli származású, sérthetetlen és nem válhat katonai támadások célpontjává. A mi célunk a háborús bűnök és a hosszan tartó elnyomás megszüntetése, nem az indulatgerjesztés.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">3. Kerüld a személyeskedő anyázást</p>
                    <p className="leading-relaxed">A trollok legfőbb vágya a düh (derailing). Ha a fókuszt megingathatatlanul tényeken, jogsértési tényeken, statisztikákon és jogi paragrafusokon tartod, a trolloknak nincs válaszuk, s a semleges külső olvasó téged fog tisztelni.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">4. Használj hivatalos ENSZ és izraeli forrást</p>
                    <p className="leading-relaxed">Ha téged elfogultsággal vádolnak, hivatkozz izraeli emberi jogi szervezetekre (például B&apos;Tselem) vagy globális ernyőszervezetekre (Amnesty, HRW, ENSZ OCHA), melyeket Izrael sem tud érdemben megcáfolni.</p>
                  </div>
                </div>
              </div>

            </section>
          </div>
        )}

        {/* TAB 2: OFFLINE MÍTOSZ ADATBÁZIS */}
        {activeTab === "database" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Hasbara Mítoszok & Faktuális Cáfolatok Tára
                  </h2>
                  <p className="text-xs text-slate-450 mt-1">
                    Keress és olvass azonnali cáfolatot, nemzetközi jogi hivatkozásokat hálózati kapcsolat vagy promptolás nélkül. Copyzhatsz közvetlenül, vagy továbbtöltheted az észrevételeket az AI modellbe.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  {/* Search box built in offline page */}
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Gyorskeresés a mítoszokban..."
                      value={dbSearchQuery}
                      onChange={(e) => setDbSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 bg-slate-50/50"
                    />
                  </div>
                  
                  {/* Reset filters */}
                  {(dbSearchQuery || dbSelectedCategory !== "all") && (
                    <button
                      onClick={() => {
                        setDbSearchQuery("");
                        setDbSelectedCategory("all");
                      }}
                      className="text-xs text-emerald-600 sm:hover:text-emerald-700 font-semibold"
                    >
                      Szűrők törlése
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDbSelectedCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all border ${
                      dbSelectedCategory === cat
                        ? "bg-slate-900 text-white border-slate-950 shadow-xs"
                        : "bg-slate-100 text-slate-600 border-slate-200 sm:hover:bg-slate-200/60"
                    }`}
                  >
                    {cat === "all" ? "Összes kategória" : cat}
                  </button>
                ))}
              </div>

              {/* Claims database render grid */}
              <div className="grid grid-cols-1 gap-4">
                {filteredDbMyths.map((myth) => {
                  const isExpanded = expandedMythId === myth.id;
                  return (
                    <div
                      key={myth.id}
                      className={`rounded-xl border transition-all overflow-hidden ${
                        isExpanded
                          ? "border-slate-400 bg-slate-50/20 shadow-xs"
                          : "border-slate-200 bg-white sm:hover:border-slate-350"
                      }`}
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => setExpandedMythId(isExpanded ? null : myth.id)}
                        className="p-4 sm:p-5 flex items-start gap-4 cursor-pointer select-none"
                      >
                        <span className="bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-bold uppercase py-1 px-2.5 rounded-sm flex-shrink-0 mt-0.5">
                          {myth.category}
                        </span>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[14px] text-slate-900 mb-1 leading-snug">
                            {myth.mythSummary}
                          </h3>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wide">
                              Sűrűn ismételt vád:
                            </span>
                            <p className="text-slate-500 text-xs italic line-clamp-1 italic font-serif inline-block">
                              &quot;{myth.commentText}&quot;
                            </p>
                          </div>
                        </div>

                        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 self-center ${isExpanded ? "rotate-90 text-slate-705" : ""}`} />
                      </div>

                      {/* Accordion expanded content */}
                      {isExpanded && myth.localDebunk && (
                        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 space-y-5">
                          
                          {/* Ready to copy rebuttal comment */}
                          <div className="bg-emerald-50/20 border border-emerald-100 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                                Higgadt Cáfolat (Azonnal másolható és beilleszthető)
                              </span>
                              <button
                                onClick={() => copyToClipboard(myth.localDebunk?.rebuttal || "", `rebuttal-${myth.id}`)}
                                className="inline-flex items-center gap-1 py-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-semibold rounded-md transition-all"
                              >
                                {copyStatus === `rebuttal-${myth.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-350 font-bold">Másolva!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Másolás</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-slate-800 text-xs sm:text-sm font-serif leading-relaxed font-sans">
                              {myth.localDebunk.rebuttal}
                            </p>
                          </div>

                          {/* Key Facts list */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-100 pb-1">
                                Legfőbb bizonyítható tényadatok
                              </span>
                              <ul className="space-y-1.5">
                                {myth.localDebunk.keyFacts.map((fact, index) => (
                                  <li key={index} className="text-xs text-slate-600 flex gap-2 items-start leading-relaxed h-auto">
                                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-mono text-slate-700 font-bold flex-shrink-0 mt-0.5">
                                      {index + 1}
                                    </span>
                                    <span>{fact}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Applicable Laws */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-100 pb-1">
                                Vonatkozó Nemzetközi Jog & Határozat
                              </span>
                              <ul className="space-y-1.5">
                                {myth.localDebunk.lawsApplicable.map((law, index) => (
                                  <li key={index} className="text-xs text-slate-700 flex gap-2 items-start font-mono leading-normal">
                                    <Scale className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span>{law}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Load to AI trigger button */}
                          <div className="flex justify-end pt-3 border-t border-slate-100 gap-3">
                            <button
                              onClick={() => handleLoadToAi(myth)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2 rounded-lg transition-all border border-emerald-100"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Megnyitás az AI Válaszadóban (További testreszabás)
                            </button>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredDbMyths.length === 0 && (
                  <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Nincsen a keresésnek megfelelő mítosz az offline archívumban.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROPAGANDA TECHNIKÁK */}
        {activeTab === "tactics" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
              <div className="pb-4 border-b border-slate-100 mb-5">
                <h2 className="text-base font-bold text-slate-905 text-slate-905 text-slate-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Gyakori Hasbara & Propaganda Technikák Kezelése
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tanuld meg felismerni azokat a manipulatív érvelési sémákat és retorikai csapdákat (érvelési hibákat), amelyeket a trollok a palesztin elnyomás elrejtésére használnak.
                </p>
              </div>

              {/* Grid of strategies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROPAGANDA_TACTICS.map((tact) => (
                  <div
                    key={tact.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-slate-150 pb-2">
                        <h3 className="font-bold text-slate-900 text-[14px] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                          {tact.name}
                        </h3>
                        <span className="text-[9px] uppercase font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm font-semibold">
                          Taktika
                        </span>
                      </div>
                      
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">
                        {tact.description}
                      </p>

                      {/* Example Trap */}
                      <div className="bg-red-50 border-l-2 border-red-300 p-3 rounded-r-lg mb-4">
                        <span className="text-[9px] font-bold text-red-500 block uppercase mb-1">Példa Troll Állítás (Csapda):</span>
                        <p className="text-slate-800 font-serif italic text-xs">&quot;{tact.example}&quot;</p>
                      </div>

                      {/* Counter Strategy */}
                      <div className="bg-emerald-50/50 border-l-2 border-emerald-500 p-3 rounded-r-lg">
                        <span className="text-[9px] font-bold text-emerald-800 block uppercase mb-1">Hárítás / Ajánlott Ellencsapás:</span>
                        <p className="text-slate-700 text-xs leading-relaxed font-sans">{tact.counterStrategy}</p>
                      </div>
                    </div>
                  </div>
                ))}
            
                {/* Visual info footer card inside tactics */}
                <div className="md:col-span-2 p-5 rounded-xl border border-blue-100 bg-blue-50/20 flex gap-4">
                  <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                    <span className="font-bold text-slate-800 block text-sm">Hogyan hatástalanítsd a vitát?</span>
                    <p>Amikor a troll érvelési hibát használ (pl. whataboutism), az olvasók figyelme a trollra terelődik. Ha nyugodtan, szárazon nevén nevezed az érvelési hibát, azzal azonnal visszaszerzed a vitapozíciódat: <em>&quot;Ez egy klasszikus whataboutism, amivel el akarja terelni a témát az Amnesty jelentéséről...&quot;</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ISMERETTERJESZTŐ KVÍZ */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 min-h-[460px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {!quizCompleted ? (
                  /* Question Display & Interactive answering */
                  <motion.div
                    key="question-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    {/* Quiz Progress header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
                        <div>
                          <h2 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
                            Palesztin Jogi és Történelmi Kvíz
                          </h2>
                          <p className="text-[10px] text-slate-450">Tényeken, jogi határozatokon alapuló teszt</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-800 text-[11px] font-mono px-3 py-1 rounded-full font-bold">
                        {currentQuizIndex + 1} / {QUIZ_QUESTIONS.length} kérdés
                      </span>
                    </div>

                    {/* Question description */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {QUIZ_QUESTIONS[currentQuizIndex].question}
                      </p>
                    </div>

                    {/* Interactive Options list */}
                    <div className="space-y-2">
                      {QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                        // Evaluation states visual highlight
                        let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 sm:hover:bg-slate-100";
                        if (selectedQuizIndex === idx && !quizSubmitted) {
                          btnStyle = "bg-slate-800 text-white border-slate-900 ring-1 ring-slate-950/20";
                        }
                        if (quizSubmitted) {
                          const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                          const isSelected = idx === selectedQuizIndex;
                          if (isCorrect) {
                            btnStyle = "bg-green-100 text-green-800 border-green-500 font-semibold";
                          } else if (isSelected) {
                            btnStyle = "bg-red-100 text-red-800 border-red-500";
                          } else {
                            btnStyle = "bg-slate-50 text-slate-400 border-slate-200 line-through opacity-60";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleQuizOptionClick(idx)}
                            className={`w-full text-left p-3.5 rounded-lg text-xs sm:text-sm transition-all border flex items-center justify-between gap-3 ${btnStyle}`}
                            disabled={quizSubmitted}
                            type="button"
                          >
                            <span>{option}</span>
                            {quizSubmitted && idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            )}
                            {quizSubmitted && idx === selectedQuizIndex && idx !== QUIZ_QUESTIONS[currentQuizIndex].correctIndex && (
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 gap-4">
                      <div className="text-[11px] text-slate-400 font-medium">
                        Összeszedett pontszám: <strong className="text-emerald-700">{quizScore}</strong> helyes válasz eddig.
                      </div>
                      
                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={selectedQuizIndex === null}
                          className={`px-6 py-2 rounded-lg text-xs font-bold text-white shadow-xs transition-all ${
                            selectedQuizIndex === null
                              ? "bg-slate-300 cursor-not-allowed"
                              : "bg-slate-900 sm:hover:bg-slate-800"
                          }`}
                        >
                          Válasz ellenőrzése
                        </button>
                      ) : (
                        <button
                          onClick={handleQuizNext}
                          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs py-2 px-6 rounded-lg shadow-xs transition-all flex items-center gap-1"
                        >
                          <span>Szuper, menjünk tovább</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Explanation feedback card */}
                    {quizSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50/30 border border-emerald-150 p-4 rounded-xl text-xs space-y-2 mt-2 leading-relaxed"
                      >
                        <h4 className="font-bold text-emerald-800 flex items-center gap-1">
                          <Info className="w-4 h-4 flex-shrink-0" />
                          Hitelérdemű Magyarázat és Háttér:
                        </h4>
                        <p className="text-slate-700 leading-relaxed font-sans">
                          {QUIZ_QUESTIONS[currentQuizIndex].explanation}
                        </p>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Hivatalos forrástár: <strong>{QUIZ_QUESTIONS[currentQuizIndex].source}</strong>
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                ) : (
                  /* Quiz Completed End page */
                  <motion.div
                    key="completed-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-5 max-w-md mx-auto"
                  >
                    <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
                    <h3 className="text-xl font-bold text-slate-900">
                      Kvíz sikeresen befejezve!
                    </h3>
                    
                    <div className="bg-slate-50 border border-slate-150 p-6 rounded-xl space-y-2">
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Te kapott fokozatod:</p>
                      <h4 className="text-base font-bold text-emerald-700">
                        {getQuizRank(quizScore)}
                      </h4>
                      <p className="text-sm font-semibold text-slate-700">
                        Elért pontszám: <span className="text-slate-950 font-bold text-base">{quizScore}</span> a maximális <span className="font-bold">{QUIZ_QUESTIONS.length}</span> pontból.
                      </p>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-4">
                        <div
                          className="bg-emerald-500 h-full"
                          style={{ width: `${(quizScore / QUIZ_QUESTIONS.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Szuper! A megszerzett tényekkel és ENSZ hivatkozásokkal most már sokkal hatékonyabban és méltóságteljesebben tudsz érvényesülni a közösségi médiás viták során.
                    </p>

                    <button
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-1.5 bg-slate-905 bg-slate-900 text-white font-semibold text-xs py-2.5 px-6 rounded-lg hover:bg-slate-800 transition-all pointer-events-auto"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Kvíz Újraindítása
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        )}

        {/* TAB 5: OSINT HASBARA SEEKER PORTAL */}
        {activeTab === "osint" && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 md:p-8"
            >
              {/* Top Banner and Brand Description */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Terminal className="w-5 h-5 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">Hasbara Seeker Engine v1.2</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                    Magyarországi OSINT Hírszerző & Narratíva Kereső
                  </h2>
                  <p className="text-xs text-slate-500 max-w-2xl mt-1">
                    Nyílt forráskódú hírszerzési (OSINT) hálózati megfigyelő. Elemzi a nagyobb magyar médiafelületek hírforrásait, az átvett külföldi hírügynökségi spin sablonokat, s leleplezi a dezinformációt a nemzetközi jog mércéjével mérve.
                  </p>
                </div>
                
                {/* Visual quick status */}
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg flex items-center gap-3 border border-slate-700 min-w-[200px] font-mono text-[10px]">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <div>
                    <div className="text-slate-400">SEEKER NODE:</div>
                    <div className="font-bold text-emerald-400">ONLINE (EGYENRANGÚ)</div>
                  </div>
                </div>
              </div>

              {/* Grid with Inputs, Actions and Console View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Side: Inputs and Targeting Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                    🌐 Célpont Konfigurálás
                  </h3>
                  
                  <form onSubmit={handleOsintScan} className="space-y-4">
                    {/* Source domain */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Média hírportál / Célpont domén:
                      </label>
                      <div className="relative">
                        <select
                          value={osintTargetDomain}
                          onChange={(e) => setOsintTargetDomain(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5 text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-hidden appearance-none"
                        >
                          <option value="mandiner.hu">Mandiner (mandiner.hu) — Erősen kormánypárti / Pro-Izraeli belföldi fókusz</option>
                          <option value="origo.hu">Origo (origo.hu) — Kormányzati bulvár / Egyoldalú retorika</option>
                          <option value="neokohn.hu">Neokohn (neokohn.hu) — Szelektív cionista fókuszportál</option>
                          <option value="demokrata.hu">Magyar Demokrata (demokrata.hu) — Konzervatív hasbara-spin</option>
                          <option value="telex.hu">Telex (telex.hu) — Mainstream független / Nyugati hírügynökségi átvételek</option>
                          <option value="index.hu">Index (index.hu) — Mérsékelt / Befolyásolt hírügynökségi átvételek</option>
                          <option value="hitgyulekezet.hu">Hit Gyülekezete Újság — Vallási-cionista dogmatika</option>
                          <option value="Egyedi magyar források">Egyedi magyar források / Közösségi média nyilvánosság</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-550">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Custom input override */}
                    {osintTargetDomain === "Egyedi magyar források" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <input
                          type="text"
                          placeholder="Írj be tetszőleges hírportált vagy FB oldalt..."
                          value={osintTargetDomain === "Egyedi magyar források" ? "" : osintTargetDomain}
                          onChange={(e) => setOsintTargetDomain(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5 text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                        />
                      </motion.div>
                    )}

                    {/* Keyword selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Keresett kiemelt kulcsszó / Témafókusz:
                      </label>
                      <input
                        type="text"
                        value={osintKeyword}
                        onChange={(e) => setOsintKeyword(e.target.value)}
                        placeholder="Pl. Gáza, Hamász, civil áldozatok, önvédelem..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5 text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                        required
                      />
                    </div>

                    {/* Preset keywords shortcuts */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Gyors-kulcsszavak választása:</span>
                      <div className="flex flex-wrap gap-1">
                        {["Gáza szőnyegbombázás", "Áldozatok száma", "Hamász emberi pajzs", "UNRWA és segélyek", "Ciszjordániai telepek", "Izrael önvédelmi joga"].map((kw) => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => setOsintKeyword(kw)}
                            className={`px-2.5 py-1.5 rounded text-[10px] font-medium transition-all ${
                              osintKeyword === kw
                                ? "bg-emerald-600 text-white shadow-3xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            #{kw}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit scan */}
                    <button
                      type="submit"
                      disabled={osintLoading}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-4 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:opacity-50 pointer-events-auto"
                    >
                      {osintLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                          <span>Adatbányászat folyamatban...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Futtatás: OSINT Narratíva Keresés</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Right Side: Interactive sub-views (Console, Results, Source Code) */}
                <div className="lg:col-span-12 xl:col-span-7 flex flex-col min-h-[460px] bg-slate-50 rounded-xl border border-slate-200/60 overflow-hidden shadow-2xs">
                  
                  {/* Console navigation bar */}
                  <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setActiveOsintView("terminal")}
                        className={`px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 ${
                          activeOsintView === "terminal"
                            ? "bg-slate-900 text-emerald-400 shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        Terminál & Logok
                      </button>
                      
                      <button
                        onClick={() => {
                          if (!osintResult) return;
                          setActiveOsintView("findings");
                        }}
                        disabled={!osintResult}
                        className={`px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 ${
                          !osintResult ? "opacity-55 cursor-not-allowed text-slate-400" : ""
                        } ${
                          activeOsintView === "findings"
                            ? "bg-slate-900 text-emerald-400 shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Vizsgálati Jelentés {osintResult && "(Kész)"}
                      </button>

                      <button
                        onClick={() => setActiveOsintView("code")}
                        className={`px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 ${
                          activeOsintView === "code"
                            ? "bg-slate-900 text-emerald-400 shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <Code className="w-3.5 h-3.5" />
                        Eredeti Python Kód
                      </button>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
                      SESSION_ID: OSINT_TARGET
                    </div>
                  </div>

                  {/* SUB-VIEW Content rendering */}
                  <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto font-sans bg-slate-50/50">
                    
                    {/* CASE 1: Terminal Log (Hacker screen) */}
                    {activeOsintView === "terminal" && (
                      <div className="bg-slate-950 text-slate-100 rounded-lg p-4 font-mono text-[11px] leading-relaxed flex-1 space-y-1.5 overflow-y-auto max-h-[400px] shadow-inner select-text">
                        {osintConsoleLogs.length === 0 ? (
                          <div className="text-slate-500 h-full flex flex-col items-center justify-center py-16 text-center">
                            <Terminal className="w-12 h-12 text-slate-800 mb-2" />
                            <p className="font-bold text-slate-400">Hasbara Seeker terminál készenlétben.</p>
                            <p className="text-[10px]">Indíts lekérdezést a bal oldali paraméterek segítségével!</p>
                          </div>
                        ) : (
                          <>
                            {osintConsoleLogs.map((log, index) => (
                              <div
                                key={index}
                                className={
                                  log.startsWith("❌")
                                    ? "text-red-400 font-bold"
                                    : log.startsWith("✅")
                                    ? "text-[#00c853] font-bold"
                                    : log.startsWith("⚙️") || log.startsWith("📡") || log.startsWith("🧬")
                                    ? "text-sky-300 font-semibold"
                                    : "text-emerald-400"
                                }
                              >
                                {log}
                              </div>
                            ))}
                            {osintLoading && (
                              <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse mt-2.5 pt-1.5 border-t border-slate-900">
                                <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-bounce"></span>
                                <span>Adatbányászat folyamatban, kormánypolitikai spin detektor aktív a magyar portálokon...</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* CASE 2: Findings Details & Metrics */}
                    {activeOsintView === "findings" && osintResult && (
                      <div className="space-y-5 animate-fadeIn">
                        
                        {/* Risk Gauge Header */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-3xs p-4 flex flex-col sm:flex-row items-stretch justify-between gap-4">
                          
                          {/* Score and level meter */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">TORZÍTÁSI KOCKÁZAT MEGÁLLAPÍTÁSA:</span>
                              <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                {osintResult.biasRating}
                              </div>
                            </div>
                            
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black text-slate-900 tracking-tight">
                                {osintResult.confidenceScore}%
                              </span>
                              <span className="text-xs text-slate-405 text-slate-400 font-medium">Belső hasbara-indikátor sűrűség</span>
                            </div>

                            {/* Risk level visualization bar */}
                            <div className="w-full bg-slate-150 h-2 rounded-full overflow-hidden relative">
                              <div
                                className={`h-full transition-all ${
                                  osintResult.riskLevel === "KRITIKUS" || osintResult.riskLevel === "MAGAS"
                                    ? "bg-red-500"
                                    : osintResult.riskLevel === "KÖZEPES"
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                                style={{ width: `${osintResult.confidenceScore}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Quick Diagnosis badges */}
                          <div className="sm:border-l sm:border-slate-100 sm:pl-4 flex flex-col justify-center min-w-[140px] space-y-1">
                            <div className="text-[10px] text-slate-404 text-slate-400 font-bold uppercase tracking-wider">Kockázati fok:</div>
                            <div className={`text-base font-black ${
                              osintResult.riskLevel === "KRITIKUS" || osintResult.riskLevel === "MAGAS" ? "text-red-600" : "text-amber-600"
                            }`}>
                              ⚠️ {osintResult.riskLevel}
                            </div>
                            <div className="text-[10px] text-slate-405 text-slate-400 font-mono">
                              Idő: {osintResult.analysisTime}
                            </div>
                          </div>
                        </div>

                        {/* Identified propaganda narratives */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            <Eye className="w-4 h-4 text-emerald-600" />
                            Kiszűrt hasbara spin narratívák a magyar lapokban:
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {osintResult.detectedNarratives.map((n, i) => (
                              <div key={i} className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2">
                                <div className="flex justify-between items-start gap-2">
                                  <h5 className="font-bold text-xs text-slate-900">{n.narrativeTitle}</h5>
                                  <span className="bg-red-50 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 flex-shrink-0">
                                    {n.manipulationIntensity}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-normal">
                                  <strong>Mögöttes taktikai cél:</strong> {n.tacticalPurpose}
                                </p>
                                
                                {/* Typical Hungarian translation sentences */}
                                <div className="bg-slate-50 p-2 rounded-md space-y-1 border border-slate-150">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Tipikus magyar átvett fordulatok:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {n.commonHungarianPhrases.map((phrase, pi) => (
                                      <span key={pi} className="text-[9px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-100 font-semibold italic">
                                        "{phrase}"
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Detailed Fact-Checks Table */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-505 text-slate-500">
                            🔎 Konkrét csúsztatások mély elemzése és békés megcáfolása:
                          </h4>
                          
                          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-150 overflow-hidden leading-relaxed shadow-3xs">
                            {osintResult.keyFindings.map((finding, idx) => (
                              <div key={idx} className="p-4 space-y-2.5">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold">
                                    {idx + 1}
                                  </span>
                                  <h5 className="font-bold text-xs sm:text-sm text-slate-900 underline decoration-slate-300 decoration-2">
                                    {finding.issueTitle}
                                  </h5>
                                </div>

                                <blockquote className="p-3 bg-red-50/50 rounded-lg border-l-4 border-red-400 text-xs text-slate-700 font-medium italic">
                                  <strong>Magyar médiaállítás:</strong> "{finding.mediaQuotationExample}"
                                </blockquote>

                                <div className="text-xs text-slate-700 leading-relaxed font-sans pl-1.5 space-y-1">
                                  <p className="font-semibold text-emerald-800 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>Tényalapú békés cáfolat és ellenpont:</span>
                                  </p>
                                  <p className="text-slate-650 bg-slate-50/50 p-2.5 rounded-lg border border-slate-150">
                                    {finding.factCheckDebunk}
                                  </p>
                                </div>

                                <div className="text-[10px] text-slate-500 font-mono bg-slate-100/60 py-1.5 px-3 rounded-md flex items-center gap-1">
                                  <Info className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                  <span>Hivatalos nemzetközi jogvédő forrás: <strong className="text-slate-700 font-semibold">{finding.internationalLawHivatalosReferencia}</strong></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* OSINT Expert Verdict summary */}
                        <div className="bg-emerald-50/20 border border-emerald-150 rounded-xl p-4 space-y-1.5 leading-relaxed font-sans">
                          <h4 className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                            <ShieldAlert className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                            OSINT SZAKÉRTŐI JELENTÉS ÖSSZEGZÉSE / VERDICT:
                          </h4>
                          <p className="text-xs text-slate-750 font-sans leading-relaxed">
                            {osintResult.verdict}
                          </p>
                          <p className="text-[10px] text-slate-400 italic font-mono mt-1 pt-1 border-t border-slate-200">
                            *Az elemzést a Hasbara Seeker offline szótára és a Valós idejű NLP mintagenerátor AI készítette.
                          </p>
                        </div>

                      </div>
                    )}

                    {/* CASE 3: Python Source Code (Offline Local execution tool) */}
                    {activeOsintView === "code" && (
                      <div className="space-y-4 font-sans text-xs">
                        <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
                          <h4 className="font-bold text-slate-900">Futass saját Hasbara Seeker Python OSINT projektet!</h4>
                          <p className="text-slate-500 leading-normal">
                            Az alábbi Python kódot letöltheted és közvetlenül a saját számítógépeden futtathatod. Valós időben szűri a magyar hírportálok (Mandiner, Index, Telex, Origo, Demokrata) RSS hírfolyamait, megszámolja az Izrael-Palesztina és a propaganda-spin kulcsszavak és narratívák eloszlását a hazai sajtóban.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">Python 3.x</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">feedparser</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">beautifulsoup4</span>
                          </div>
                        </div>

                        {/* Code Display pre with Copy Button */}
                        <div className="relative rounded-lg border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden shadow-inner leading-relaxed select-text font-mono text-[10px] sm:text-xs">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(PYTHON_SCRIPT_CODE);
                              alert("Python kód a vágólapra másolva! Hozz létre egy 'hasbara_seeker.py' fájlt, illeszd be, majd futtasd a gépeden.");
                            }}
                            className="absolute top-2.5 right-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg px-2.5 py-1.5 flex items-center gap-1 transition-all text-[11px] pointer-events-auto"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kód Másolása</span>
                          </button>
                          
                          <pre className="p-4 overflow-x-auto max-h-[300px] leading-relaxed">
                            {PYTHON_SCRIPT_CODE}
                          </pre>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-xs text-amber-800 space-y-1.5 font-sans leading-relaxed">
                          <span className="font-bold block">💡 Így futtasd lokálisan:</span>
                          <ol className="list-decimal pl-4 space-y-1.5 text-slate-700">
                            <li>Telepítsd a csomagokat: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-250 font-mono text-[11px]">pip install feedparser beautifulsoup4 requests</code></li>
                            <li>Mentsd el ezt a kódot a számítógépeden <code className="bg-white px-1.5 py-0.5 rounded border border-amber-250 font-mono text-[11px]">hasbara_seeker.py</code> néven.</li>
                            <li>Futtasd le a terminálból/parancssorból: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-250 font-mono text-[11px]">python hasbara_seeker.py</code></li>
                          </ol>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}



        {/* BOTTOM SECTION: Permanent Reference Library & Evidence Locker */}
        <section className="mt-8 bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Nemzetközi Jogvédő Szervezetek & ENSZ Archívumok
              </h3>
              <p className="text-xs text-slate-400">Az alábbi elismert globális és izraeli szervezetek anyagai képezik cáfolataink legfőbb megdönthetetlen hivatkozási pontjait.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCE_ITEMS.map((resItem, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between hover:shadow-xs transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      resItem.category === "un" ? "bg-blue-100 text-blue-800" :
                      resItem.category === "ngo" ? "bg-purple-100 text-purple-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {resItem.category === "un" ? "ENSZ Szervezet" :
                       resItem.category === "ngo" ? "Nemzetközi Jogvédő" : "Nemzetközi Jog"}
                    </span>
                    <button
                      onClick={() => copyToClipboard(resItem.url, `res-${idx}`)}
                      className="text-[9px] text-slate-400 sm:hover:text-emerald-500 inline-flex items-center gap-1"
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
