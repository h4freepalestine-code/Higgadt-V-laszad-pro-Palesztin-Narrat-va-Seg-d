import { PresetTrollComment, ResourceItem, PropagandaTactic, QuizQuestion } from "./types";

export const PRESET_COMMENTS: PresetTrollComment[] = [
  {
    id: "hamas-elect",
    category: "Választási felelősség",
    commentText: "A gázaiak maguk választották a Hamászt 2006-ban, így most ne csodálkozzanak a következményeken. Kollektíven felelősek a tetteikért.",
    mythSummary: "2006-os gázai választások és a lakosság kollektív bűnössé tétele.",
    localDebunk: {
      rebuttal: "A gázai lakosság kollektív felelőssé tétele jogilag és ténybelileg is téves. A legutolsó választás 2006-ban volt (húsz éve), azóta a Hamász nem tart demokratikus választásokat és autoriter módon uralkodik. A jelenlegi gázai lakosság több mint 55%-a meg sem született, vagy kiskorú gyermek volt 2006-ban, ráadásul a Hamász akkor is csak a szavazatok 44%-át kapta meg a megosztott palesztin politikai palettán. A kollektív büntetés minden formája háborús bűncselekménynek minősül a Negyedik Genfi Egyezmény 33. cikke szerint.",
      keyFacts: [
        "A gázai lakosság medián életkora 18 év, ami azt jelenti, hogy többségük nem is élt még 2006-ban.",
        "A 2006-os törvényhozási választásokon a Hamász a szavazatok 44%-át szerezte meg, nem a teljes támogatottságot.",
        "A Negyedik Genfi Egyezmény 33. cikke egyértelműen kimondja: 'Személyes felelősséget nem viselő egyén büntetése kollektív bűnösség alapján tilos.'"
      ],
      lawsApplicable: [
        "Negyedik Genfi Egyezmény (1949) - 33. cikk (Kollektív büntetés tilalma)",
        "Nürnbergi elvek - Az egyéni felelősség elve"
      ]
    }
  },
  {
    id: "arab-countries",
    category: "Áthelyezés / Menekülés",
    commentText: "Miért nem mennek a palesztinok Egyiptomba vagy Jordániába? Olyan sok gazdag arab ország van, miért nem fogadják be őket a testvéreik?",
    mythSummary: "Kényszerű elvándorlás javaslata és a visszatérési jog megtagadása.",
    localDebunk: {
      rebuttal: "A palesztinok elüldözése vagy más arab országokba való kényszerítése az etnikai tisztogatás és a lakosságcsere nemzetközi jogi tilalmába ütközik. Ráadásul a szomszédos országok (különösen Jordánia és Libanon) már most is palesztin menekültek millióit látják el több mint 75 éve. A visszatérési jogot a menekültek számára az ENSZ Közgyűlés 194-es határozata rögzíti, amelyet Izrael folyamatosan megsért. A hazájuk elhagyására kényszerítés a gyarmatosító politika klasszikus eszköze, amellyel véglegesen kisajátítják a palesztinok földjeit.",
      keyFacts: [
        "Jordániában jelenleg több mint 2 millió, Libanonban és Szíriában pedig további 1 millió palesztin menekült él regisztráltan.",
        "Az ENSZ 194-es határozata (11. cikk) rögzíti a menekültek visszatérési jogát a saját otthonaikba.",
        "Az emberek kényszerű áttelepítése a Római Statútum 7. cikke szerint emberiesség elleni bűncselekménynek tekintendő."
      ],
      lawsApplicable: [
        "ENSZ Közgyűlés 194-es Határozata (11. bekezdés, 1948)",
        "Nemzetközi Büntetőbíróság Római Statútuma - 7. cikk / Deportálás és kényszerű áttelepítés"
      ]
    }
  },
  {
    id: "never-exists",
    category: "Történelmi tagadás",
    commentText: "Soha nem létezett olyan ország, hogy Palesztina. Nincs palesztin nyelv, nincs palesztin kultúra, ők csak arabok, akiket odaköltöztettek.",
    mythSummary: "A palesztin nemzeti identitás és önrendelkezési jog tagadása.",
    localDebunk: {
      rebuttal: "Ez a klasszikus siralmas érvelés összemossa a modern nemzetállami kereteket az őslakos lakosság létezésével. Palesztina mint földrajzi, kulturális és közigazgatási egység évszázadok óta dokumentáltan létezik (az Oszmán Birodalomtól a Brit Mandátumig). Sajátos kulturális identitással, egyedi palesztin-arab nyelvjárással, ősi mezőgazdasággal, folklórral, palesztin font érmékkel és útlevéllel rendelkeztek a cionizmus megjelenése előtt is. Az önrendelkezési jog egyetemes emberi jog, amely nem függ attól, hogy egy népnek volt-e korábban nyugati értelemben vett független parlamentje.",
      keyFacts: [
        "A brit és oszmán archívumok milliónyi térképet, útlevelet, adóbevallást és hivatalos dokumentumot őriznek 'Palestine' megnevezéssel.",
        "Az 1920-as és 30-as években független palesztin újságok, rádiók, sportklubok és kulturális intézmények egész hálózata virágzott.",
        "Az ENSZ Alapokmánya az önrendelkezési jogot minden nép elidegeníthetetlen jogának tartja, függetlenül történelmi államszervezeti előzményeitől."
      ],
      lawsApplicable: [
        "ENSZ Alapokmány 1. cikk (Önrendelkezési jog)",
        "Polgári és Politikai Jogok Nemzetközi Egyezségokmánya (ICCPR) - 1. cikk"
      ]
    }
  },
  {
    id: "civilian-shields",
    category: "Humán pajzsok",
    commentText: "Minden palesztin áldozatról a Hamász tehet, mert az iskolák és kórházak mögé bújnak, és humán pajzsként használják a saját népüket.",
    mythSummary: "A civil áldozatok kizárólagos hárítása és a nemzetközi jogi felelősség relativizálása.",
    localDebunk: {
      rebuttal: "A nemzetközi humanitárius jog szerint a 'humán pajzsok' feltételezett jelenléte sem mentesíti a támadó felet az arányosság (proportionality) és a megkülönböztetés (distinction) kötelezettsége alól. Ha egy hadsereg tudja, hogy egy katonai célpont mellett tucatnyi vagy százas nagyságrendű fegyvertelen család van, a támadás végrehajtása aránytalanná és háborús bűncselekménnyé válik. Továbbá, független emberi jogi szervezetek (mint az Amnesty International) rámutattak, hogy maga az izraeli hadsereg rendszeresen használja ezt a narratívát sablonként a sűrűn lakott menekülttáborok, iskolák és kórházak szőnyegbombázásának morális legitimálására.",
      keyFacts: [
        "Az Első Kiegészítő Jegyzőkönyv (Genfi Egyezmények) 51. és 57. cikke szigorúan előírja a támadó félnek a civil károk minimalizálását.",
        "Ha a civil áldozatok száma aránytalanul meghaladja a várható katonai előnyt, a csapás tilos, függetlenül az ellenség elhelyezkedésétől.",
        "Gáza a világ egyik legsűrűbben lakott területe (kb. 2.3 millió ember 365 négyzetkilométeren), ahol fizikailag nincs nyílt csatatér."
      ],
      lawsApplicable: [
        "1949-es Genfi Egyezmények Első Kiegészítő Jegyzőkönyve (1977) - 51(5)(b) cikk (Arányosság elve)",
        "Genfi Egyezmény - 57. cikk / Megkülönböztetés elve"
      ]
    }
  },
  {
    id: "partition-1947",
    category: "1947-es felosztás",
    commentText: "Izrael elfogadta az ENSZ 181-es határozatát 1947-ben, de az arabok nemet mondtak és rátámadtak a fiatal zsidó államra. Maguknak keresték a bajt.",
    mythSummary: "A történelmi felosztás egyoldalú felelősséghárítása az őslakos lakosság elűzésének elhallgatásával.",
    localDebunk: {
      rebuttal: "Az 1947-es ENSZ 181-es felosztási terv mélyen antidemokratikus és aránytalan volt: a földterület több mint 56%-át tervezte adni a zsidó bevándorlóknak, miközben ők a lakosság alig 33%-át alkották és a megművelhető földterület csupán 6-7%-át birtokolták. A palesztin lakosság mint őslakos többség számára ez a szuverenitásuk brutális és egyoldalú megsértését jelentette. Ráadásul a cionista katonai milíciák (Haganah, Irgun) már a szomszédos arab országok beavatkozása ELŐTT megkezdték a palesztin falvak szisztematikus megtámadását és kiürítését (Plan Dalet), ami elindította a Nakbát.",
      keyFacts: [
        "A felosztási terv idején a palesztinok alkották a lakosság kétharmadát, és övék volt a magánkézben lévő földek több mint 93%-a.",
        "A Nakba (katasztrófa) során 750 000 palesztint kényszerítettek menekülésre és több mint 500 palesztin települést pusztítottak el végleg.",
        "A cionista erők már 1947 végén és 1948 elején brutális mészárlásokat hajtottak végre (pl. Deir Yassin faluban, 1948. április 9-én)."
      ],
      lawsApplicable: [
        "ENSZ 181-es Határozat (Közgyűlési ajánlás volt, nem kötelező érvényű BT határozat)",
        "Egyetemes Emberi Jogok Nyilatkozata - 17. cikk (Tulajdontól való önkényes megfosztás tilalma)"
      ]
    }
  },
  {
    id: "cisjordan-security",
    category: "Ciszjordániai megszállás",
    commentText: "Ciszjordániában sincs béke, pedig ott nincs Hamasz kormányon. Izraelnek muszáj fenntartania a katonai ellenőrzést, a falakat és ellenőrzőpontokat, különben megölnék az izraelieket.",
    mythSummary: "Az illegális telepek, az Apartheid-szerű bánásmód és a katonai elnyomás biztonsági indoklása.",
    localDebunk: {
      rebuttal: "Ciszjordánia feszültsége éppen a folyamatban lévő, illegális katonai megszállás és a palesztin földek módszeres kisajátításának közvetlen következménye. Több mint 700 000 izraeli telepes él mélyen a palesztin területeken, külön, kizárólagos használatú utakon, míg a palesztinokat katonai bíróságok (99%-os elítélési aránnyal), mozgáskorlátozás és kollektív megalázás sújtja. A Nemzetközi Bíróság (ICJ) 2004-ben kimondta, hogy az elválasztó fal illegális, 2024-ben pedig megerősítette, hogy Izrael egész ciszjordániai jelenléte jogellenes és apartheid-szerű faji szegregációt valósít meg.",
      keyFacts: [
        "A palesztin magánföldeken felépített izraeli telepesvárosok és fegyveres telepesek közvetlen nemzetközi jogsértések.",
        "Izrael Ciszjordániában kettős jogrendszert működtet: az izraeli telepesekre a civil polgári jog, míg a palesztinokra a fegyveres katonai törvénykezés vonatkozik.",
        "A palesztinoktól elkobzott vízkészletek 80%-át az izraeli kormány a telepeseknek osztja ki, miközben a palesztinoknak szigorú kvóták jutnak."
      ],
      lawsApplicable: [
        "Negyedik Genfi Egyezmény - 49. cikk / Megszálló lakosság betelepítése tilos",
        "ENSZ BT 2334-es Határozata (2016) az izraeli telepek illegális voltáról",
        "Nemzetközi Bíróság (ICJ) 2024. júliusi Tanácsadó Véleménye a megszállás jogellenességéről"
      ]
    }
  },
  {
    id: "desert-bloomed",
    category: "Történelmi tagadás",
    commentText: "A palesztinok előtt itt csak lakatlan mocsár és kietlen sivatag volt. Valójában a zsidó úttörők virágoztatták fel a földet a semmiből.",
    mythSummary: "A palesztin mezőgazdaság, fejlett társadalom és jelenlét teljes elhallgatása.",
    localDebunk: {
      rebuttal: "Ez a 'föld nép nélkül, népnek föld nélkül' kolonialista és rasszista mítosza, amely megpróbálja letagadni a palesztinok puszta létezését is a földön. Történelmi dokumentumok, utazók beszámolói és korabeli statisztikák bizonyítják, hogy Palesztina területén már a 19. században fejlett gabona-, narancs-, szőlő- és olajbogyó-termesztés folyt. Jaffa a világ egyik leghíresebb narancsexportőre volt, a palesztin szappanipar és textilgyárak pedig az egész régiót ellátták áruval. A palesztinok nem csupán éltek itt, de virágzó mezőgazdasági és városi társadalmat alkottak.",
      keyFacts: [
        "A jaffai narancsmárka egy ősi palesztin termesztésű hírneves termék volt, amelyet a zsidó telepesek vettek át és sajátítottak ki.",
        "A 19. század végén a brit és oszmán adókönyvek szerint a földek túlnyomó részét palesztin családok művelték meg generációk óta.",
        "A Nakba előtt több mint 500 palesztin településen pezsgő társadalmi élet, iskolák, könyvtárak és piacok működtek."
      ],
      lawsApplicable: [
        "ENSZ 1514 (XV) Határozat az önrendelkezésről és a gyarmati elnyomás megszüntetéséről"
      ]
    }
  },
  {
    id: "only-democracy",
    category: "Demokrácia mítosza",
    commentText: "Izrael a Közel-Kelet egyetlen demokráciája, ahol az arabok is képviselve vannak a parlamentben, így nincs semmiféle elnyomás vagy apartheid.",
    mythSummary: "Izrael belső demokratikus arculatának fegyverré tétele a katonai elnyomás leplezésére.",
    localDebunk: {
      rebuttal: "Egyetlen állam sem nevezheti magát demokráciának, miközben a tényleges katonai és közigazgatási ellenőrzése alatt álló lakosság csaknem felét (a gázai és ciszjordániai palesztinokat) teljesen megfosztja a politikai önrendelkezéstől, a szavazati jogtól és az alapvető emberi jogoktól. Az izraeli arab képviselők jelenléte a Kneszetben csupán kirakatka, miközben több mint 65 olyan izraeli törvény létezik, amely nyíltan diszkriminálja az izraeli arab polgárokat. A 2018-as Nemzetállami Törvény deklarálja, hogy a nemzeti önrendelkezési jog kizárólag a zsidó népet illeti meg az országban.",
      keyFacts: [
        "A palesztinok milliói élnek Izrael teljes ellenőrzése alatt Ciszjordániában és Gázában anélkül, hogy beleszólásuk lenne az izraeli törvényalkotásba.",
        "A 2018-as zsidó nemzetállami alaptörvény törvényesítette az intézményes szegregációt, és megfosztotta az arab nyelvet hivatalos állami státuszától.",
        "Már az izraeli emberi jogi szervezetek (B'Tselem, Yesh Din) is hivatalos jelentésekben mondták ki, hogy Izrael egy apartheid rendszer."
      ],
      lawsApplicable: [
        "1973-as Apartheid Elleni Egyezmény (ENSZ)",
        "Római Statútum - Apartheid mint emberiesség elleni bűncselekmény"
      ]
    }
  },
  {
    id: "pinkwashing",
    category: "Pinkwashing / LMBTQ",
    commentText: "Izrael LMBTQ-barát és védi az emberi jogokat, míg a palesztinok homofóbok és elnyomják a melegeket. Miért kellene támogatni egy ilyen elmaradott népet?",
    mythSummary: "A liberális és LMBTQ jogok eszközként való használata a katonai gyarmatosítás igazolására.",
    localDebunk: {
      rebuttal: "Az LMBTQ+ jogok állítólagos tisztelete nem adhat morális feloldozást vagy biankó csekket egy másik nép elnyomására, földjeinek kisajátítására és lemészárlására. Ez a klasszikus 'pinkwashing' stratégia, amely a szexuális kisebbségek védelmét használja PR-pajzsként. A palesztin LMBTQ emberek ugyanúgy szenvednek a bombázásoktól, a blokádtól, a megszégyenítő ellenőrzőpontoktól és a családjaik otthonainak lerombolásától. Az emberi jogok nem szelektívek: a szabadsághoz és méltósághoz való jog minden embert megillet, függetlenül attól, hogy társadalmuk éppen milyen fázisban tart a kisebbségi jogok elfogadásában.",
      keyFacts: [
        "Az izraeli titkosszolgálat (Shin Bet) köztudottan zsarolásra használja a palesztin LMBTQ fiatalok szexuális orientációját, besúgásra kényszerítve őket.",
        "A bombák nem válogatnak: az izraeli csapásokban palesztin melegek, leszbikusok és transzneműek százai vesztették életüket.",
        "A palesztin társadalomban is aktív palesztin queer szervezetek (pl. Al-Qaws) küzdenek a jogaikért és a megszállás ellen egyszerre."
      ],
      lawsApplicable: [
        "Egyetemes Emberi Jogok Nyilatkozata - 2. cikk (Diszkriminációmentesség elve)",
        "Az ENSZ Emberi Jogi Tanácsának állásfoglalásai a diszkrimináció ellen"
      ]
    }
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
    description: "Pikírt, intellektuális és maróan szarkasztikus stílus, ami nevetségessé teszi az abszurd kettős mércéket.",
    icon: "Flame"
  }
];

export const PROPAGANDA_TACTICS: PropagandaTactic[] = [
  {
    id: "whataboutism",
    name: "Whataboutism (Elterelés)",
    description: "A troll ahelyett, hogy megválaszolná az izraeli jogsértést (pl. telepesek erőszakossága), azonnal egy másik, általában távoli országra (pl. Kína, Szíria) tereli a szót, azt állítva, hogy ott rosszabb.",
    example: "'Miért csak Izraelt szidod? Miért nem beszélsz arról, hogy mi folyik Jemenben vagy Kínában az ujgurokkal?'",
    counterStrategy: "Hozd vissza a beszélgetést a medrébe higgadtan: 'Jemenben is szörnyű jogsértések zajlanak, de most konkrétan a ciszjordániai izraeli megszállásról beszélünk, amelyet a saját adónkból vagy nemzetközi támogatásainkból is finanszírozunk. Válaszolna a feltett kérdésre?'"
  },
  {
    id: "victim-blaming",
    name: "Áldozathibáztatás",
    description: "Minden palesztin elnyomást, házrombolást, katonai túlerőt és polgári áldozatot azzal hárít el, hogy a palesztinok nem működnek együtt, vagy a Hamász miatt történik.",
    example: "'Házrombolás? Ha nem támogatnák a terort, Izraelnek nem kellene lerombolnia a családjaik házát.'",
    counterStrategy: "Világíts rá a kollektív büntetés mivoltára és az egyenlőtlen viszonyokra: 'A nemzetközi jog szerint a gyanúsított családjának házát lerombolni kollektív büntetés, ami háborús bűncselekmény. Az egyéni bűnösséget független bíróságnak kell bizonyítania, nem fegyveres dózerekkel eldönteni.'"
  },
  {
    id: "semantic-shift",
    name: "Szemantikai csúsztatás",
    description: "Minden palesztin ellenállást, békés bojkottmozgalmat (BDS), vagy emberi jogi kritikát azonnal 'terrorizmusnak' vagy 'antiszemitizmusnak' titulál.",
    example: "'Mindenki antiszemita, aki bojkottálni akarja az izraeli termékeket, vagy apartheidnek nevezi az izraeli rendszert.'",
    counterStrategy: "Idézz elismert forrásokat: 'Ha a kritika antiszemita lenne, akkor miért nevezi magát Izraelt apartheidnek a legnagyobb izraeli emberi jogi szervezet (B'Tselem) és az ENSZ is? Az állami politika bírálata a szólásszabadság része, az emberi jogok egyetemesek.'"
  },
  {
    id: "cherry-picking",
    name: "Történelmi mazsolázás",
    description: "A konfliktus történetéből önkényesen kiválaszt egyetlen időpontot (pl. 2023. október 7. vagy 1948), teljesen elhallgatva az azt megelőző évtizedes katonai blokádot és szisztematikus földrablást.",
    example: "'Minden békés volt, amíg október 7-én meg nem támadták az ártatlan izraeli falvakat a semmiből.'",
    counterStrategy: "Adj történelmi mélységet: 'A civilek elleni erőszak elítélendő, de nem a semmiből indult. Gáza már 17 éve hermetikus katonai és humanitárius blokád alatt állt, amelyet az ENSZ is illegálisnak nevezett. A feszültség igazi gyökere a 75 éves folyamatos megszállás.'"
  },
  {
    id: "double-standard",
    name: "Kettős mérce (Önvédelem)",
    description: "Azt állítja, hogy Izraelnek abszolút joga van az 'önvédelemre' (akár 40 000 civil megölésével is), miközben a palesztinoktól teljesen elvitatja a megszállás elleni védekezés jogát.",
    example: "'Izrael csak megvédi magát a rakétáktól. Minden országnak joga van az önvédelemhez.'",
    counterStrategy: "Tisztázd a megszállás és az önvédelem közti jogi különbséget: 'A nemzetközi jog szerint egy megszálló hatalom nem hivatkozhat önvédelemre az általa megszállt lakossággal szemben a blokád és megszállás fenntartására (ahogy azt az ICJ is kimondta). Minden embernek joga van a biztonságra és szabadságra; a tartós béke kulcsa a megszállás felszámolása.'"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Melyik nemzetközi egyezmény tiltja meg kifejezetten, hogy a megszálló hatalom a saját lakosságát a megszállt területre telepítse?",
    options: [
      "Első Brüsszeli Konvenció",
      "Negyedik Genfi Egyezmény (49. cikk)",
      "Versailles-i Békeszerződés",
      "ENSZ Alapokmány 2. cikk"
    ],
    correctIndex: 1,
    explanation: "A Negyedik Genfi Egyezmény 49. cikke szigorúan kimondja: 'A Megszálló Hatalom nem deportálhatja vagy telepítheti át saját polgári lakosságának részeit az általa megszállt területre.' Ez teszi az összes izraeli ciszjordániai telepet nemzetközileg illegálissá.",
    source: "Negyedik Genfi Egyezmény, 49. cikk"
  },
  {
    id: "q2",
    question: "Mennyi a gázai lakosság hozzávetőleges átlagéletkora (medián életkora)?",
    options: [
      "Körülbelül 18 év",
      "Körülbelül 29 év",
      "Körülbelül 38 év",
      "Körülbelül 45 év"
    ],
    correctIndex: 0,
    explanation: "Gáza lakossága rendkívül fiatal, a lakosság több mint fele kiskorú vagy fiatal felnőtt, a medián életkor mindössze 18 év körül van. Ezért a 2006-os utolsó választásokra való hivatkozás morálisan és statisztikailag is megbukik, mint kollektív bűnösségi érv.",
    source: "UN OCHA / CIA World Factbook"
  },
  {
    id: "q3",
    question: "Melyik ENSZ határozat mondta ki először a palesztin menekültek visszatérési jogát a házaikba és földjeikre?",
    options: [
      "ENSZ BT 242-es határozat",
      "ENSZ BT 338-as határozat",
      "ENSZ Közgyűlés 194-es határozat",
      "ENSZ Közgyűlés 181-es határozat"
    ],
    correctIndex: 2,
    explanation: "A palesztin menekültek hazatérési jogát az ENSZ Közgyűlésének 194-es határozata (11. cikk) fektette le 1948 decemberében, kijelentve, hogy a békében élni akaró menekülteknek engedélyezni kell a visszatérést otthonaikba a legkorábbi gyakorlati időpontban.",
    source: "ENSZ Közgyűlés - Resolution 194"
  },
  {
    id: "q4",
    question: "Melyik izraeli emberi jogi civil szervezet adott ki átfogó elemzést arról, hogy az izraeli rezsim apartheidnek minősül a Jordán folyótól a Földközi-tengerig terjedő teljes területen?",
    options: [
      "Peace Now",
      "B'Tselem",
      "Shalom Archívum",
      "Mossad Kutatócsoport"
    ],
    correctIndex: 1,
    explanation: "A B'Tselem (Az Izraeli Emberi Jogi Információs Központ) 2021 januárjában tette közzé nagy hatású állásfoglalását 'A regime of Jewish supremacy from the Jordan River to the Mediterranean Sea: This is apartheid' címmel, amit később az Amnesty s HRW is jóváhagyott.",
    source: "B'Tselem Jelentés (2021)"
  },
  {
    id: "q5",
    question: "Miként minősítette a Nemzetközi Bíróság (ICJ) 2024. júliusi átfogó tanácsadó véleménye Izrael jelenlétét a megszállt palesztin területeken?",
    options: [
      "Ideiglenes és teljesen indokolt biztonsági jelenlétnek",
      "Jogellenesnek, amelynek a lehető leggyorsabban véget kell vetni",
      "Egyoldalú palesztin fegyverkezés miatti kikerülhetetlen válaszlépésnek",
      "Jogilag nem osztályozható, vitatott területi státusznak"
    ],
    correctIndex: 1,
    explanation: "A Nemzetközi Bíróság (ICJ) történelmi, 2024. július 19-i döntése kimondta, hogy Izrael jelenléte a megszállt palesztin területeken (Gáza, Ciszjordánia, Kelet-Jeruzsálem) jogellenes, sérti az önrendelkezési jogot, apartheid jellegű faji szegregációt valósít meg, és Izrael köteles azt azonnal felszámolni.",
    source: "Nemzetközi Bíróság (ICJ) Tanácsadó Vélemény, 2024. július"
  }
];
