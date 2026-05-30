import { PresetTrollComment, ResourceItem } from "./types";

export const PRESET_COMMENTS: PresetTrollComment[] = [
  {
    id: "hamas-elect",
    category: "Választási felelősség",
    commentText: "A gázaiak maguk választották a Hamászt 2006-ban, így most ne csodálkozzanak a következményeken. Kollektíven felelősek a tetteikért.",
    mythSummary: "2006-os választások és a lakosság kollektív bűnössé tétele."
  },
  {
    id: "arab-countries",
    category: "Áthelyezés / Menekülés",
    commentText: "Miért nem mennek a palesztinok Egyiptomba vagy Jordániába? Olyan sok gazdag arab ország van, miért nem fogadják be őket a testvéreik?",
    mythSummary: "Kényszerű elvándorlás javaslata és a visszatérési jog megtagadása."
  },
  {
    id: "never-exists",
    category: "Történelmi tagadás",
    commentText: "Soha nem létezett olyan ország, hogy Palesztina. Nincs palesztin nyelv, nincs palesztin kultúra, ők csak arabok, akiket odaköltöztettek.",
    mythSummary: "A palesztin nemzeti identitás és önrendelkezési jog tagadása."
  },
  {
    id: "civilian-shields",
    category: "Humán pajzsok",
    commentText: "Minden palesztin áldozatért a Hamász a felelős, mert az iskolák és kórházak mögé bújnak, és humán pajzsként használják a saját népüket.",
    mythSummary: "A civil áldozatok kizárólagos hárítása és a nemzetközi jogi felelősség relativizálása."
  },
  {
    id: "partition-1947",
    category: "1947-es felosztás",
    commentText: "Izrael elfogadta az ENSZ 181-es határozatát 1947-ben, de az arabok nemet mondtak és rátámadtak a fiatal zsidó államra. Maguknak keresték a bajt.",
    mythSummary: "A történelmi felosztás egyoldalú felelősséghárítása az őslakos lakosság elűzésének elhallgatásával."
  },
  {
    id: "cisjordan-security",
    category: "Ciszjordániai megszállás",
    commentText: "Ciszjordániában (West Bank) sincs béke, pedig ott nincs Hamász kormányon. Izraelnek muszáj fenntartania a katonai ellenőrzést, a falakat és az ellenőrzőpontokat, különben megölnék az izraelieket.",
    mythSummary: "Az illegális telepek, az Apartheid-szerű bánásmód és a katonai elnyomás biztonsági indoklása."
  }
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    title: "UN OCHA (OPT)",
    description: "Az ENSZ Humanitárius Ügyeket Koordináló Hivatala. Naprakész statisztikák az áldozatokról, a házrombolásokról és a humanitárius segélyek helyzetéről.",
    linkText: "Statisztikák és Jelentések",
    url: "https://www.ochaopt.org/",
    category: "un"
  },
  {
    title: "Amnesty International - Apartheid Jelentés",
    description: "Alapos jogi és terepkutatási dokumentáció arról, hogyan valósít meg Izrael szegregációt és elnyomást a palesztin lakossággal szemben.",
    linkText: "Jelentés elolvasása",
    url: "https://www.amnesty.org/en/latest/campaigns/2022/02/israels-apartheid-against-palestinians/",
    category: "ngo"
  },
  {
    title: "Human Rights Watch - A Threshold Crossed",
    description: "A HRW átfogó vizsgálata az izraeli kormányzat politikájáról és az apartheid és üldöztetés bűntettének megvalósulásáról.",
    linkText: "Vizsgálati anyag",
    url: "https://www.hrw.org/report/2021/04/27/threshold-crossed/israeli-authorities-and-crimes-apartheid-and-persecution",
    category: "ngo"
  },
  {
    title: "ENSZ 242-es Biztonsági Tanácsi Határozat",
    description: "Az 1967-es hatnapos háború után hozott alapvető dokumentum, amely kimondja a területszerzés megengedhetetlenségét háború útján, és felszólít az izraeli csapatok kivonására.",
    linkText: "Határozat szövege",
    url: "https://www.un.org/unispal/document/auto-insert-184858/",
    category: "law"
  },
  {
    title: "B'Tselem - Az Izraeli Emberi Jogi Központ",
    description: "Izraeli emberi jogi szervezet, amely fáradhatatlanul dokumentálja a megszállás alatti jogsértéseket az igazságosság és egyenlőség érdekében.",
    linkText: "B'Tselem weboldal",
    url: "https://www.btselem.org/",
    category: "ngo"
  },
  {
    title: "Negyedik Genfi Egyezmény - 49. cikk",
    description: "Nemzetközi szerződés, amely szigorúan tiltja, hogy a megszálló hatalom a saját lakosságának részeit a megszállt területre telepítse át. Ez teszi az összes izraeli telepet illegálissá.",
    linkText: "Egyezmény részletei",
    url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-49",
    category: "law"
  }
];

export const DEBATE_STRATEGIES = [
  {
    id: "factual",
    title: "Tényellenőrző & Jogi",
    description: "Tényeken, nemzetközi egyezményeken és bírósági döntéseken alapuló, száraz, megdönthetetlen érvek.",
    icon: "Scale"
  },
  {
    id: "humanitarian",
    title: "Humanitárius fókusz",
    description: "Az emberi jogokra, a lakosság életkörülményeire és a szenvedések megállítására helyezi a hangsúlyt.",
    icon: "Heart"
  },
  {
    id: "historical",
    title: "Történelmi kontextus",
    description: "Megmutatja, hogy a konfliktus nem 2023. október 7-én kezdődött, hanem évtizedes gyökerei vannak.",
    icon: "History"
  },
  {
    id: "short",
    title: "Rövid / Social Media",
    description: "Ütős, jól olvasható válasz Twitterre (X), TikTokra, rövid vitákhoz, ami megfordítja a vádakat.",
    icon: "Zap"
  },
  {
    id: "logical_debunk",
    title: "Logikai Cáfolat",
    description: "Feltárja a troll érvelési hibáit (pl. whataboutism, szalmabáb, hamis dilemma) intelligensen.",
    icon: "Brain"
  },
  {
    id: "socratic",
    title: "Szókratészi Kérdező",
    description: "Nemzetközi jogi és morális kérdésekkel készteti önreflexióra a vitázót és az olvasókat.",
    icon: "HelpCircle"
  },
  {
    id: "empathetic",
    title: "Empatikus & Személyes",
    description: "Az egyetemes szabadságvágyra, méltóságra és az emberi sorsokra feszíti a fókuszt.",
    icon: "MessageSquare"
  },
  {
    id: "creative_analogy",
    title: "Kreatív Analógia",
    description: "Könnyen átlátható, mindennapi vagy történelmi példák segítségével mutatja be az aránytalan helyzetet.",
    icon: "FileText"
  },
  {
    id: "sarcastic",
    title: "Maró Gúny & Irónia",
    description: "Pikírt, intellektuális és maróan szarkasztikus stílus, ami nevetségessé teszi az abszurd kettős mérrcéket.",
    icon: "Flame"
  }
];
