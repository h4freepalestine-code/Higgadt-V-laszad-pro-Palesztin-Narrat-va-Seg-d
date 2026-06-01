import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set permissions to allow embedding the app as an iframe on external sites (like WordPress)
app.use((req, res, next) => {
  // To allow framing from external websites, we omit X-Frame-Options (as "ALLOWALL" is not a standard spec)
  // and rely exclusively on Content-Security-Policy frame-ancestors.
  res.removeHeader("X-Frame-Options");
  res.setHeader("Content-Security-Policy", "frame-ancestors *;");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

// Body parser
app.use(express.json());

// Initialize Gemini SDK with telemetry user-agent
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Route for generating pro-Palestinian constructive responses to troll arguments
app.post("/api/counter-comment", async (req, res) => {
  try {
    const { comment, tone, customContext, language = "Hungarian" } = req.body;

    if (!comment || typeof comment !== "string" || comment.trim() === "") {
       res.status(400).json({ error: "Kérjük, adjon meg egy elemzendő kommentet!" });
       return;
    }

    const ai = getGeminiClient();

    // Define strategies for the system prompt
    const toneDefinitions: Record<string, string> = {
      humanitarian: "Humanitárius fókusz: Koncentrálj a civil lakosság helyzetére, a gázai és ciszjordániai életkörülményekre, az emberi jogi szervezetek (Amnesty, HRW, ENSZ) jelentéseire, a védtelen civilek és gyermekek szenvedésére. Hangsúlyozd az azonnali békét és humanitárius segélyezést.",
      historical: "Történelmi és ENSZ fókusz: Helyezd el a vitát a történelmi kontextusban. Beszélj a Nakbáról (1948), az ENSZ határozatokról (pl. 242-es békés kivonulásról szóló határozat, 194-es menekültügyi határozat), a megszállás kezdeteiről (1967), az illegális településekről és az évtizedes feszültség okairól.",
      factual: "Tényellenőrzés és Nemzetközi Jog: Használj konkrét tényeket, nemzetközi bírósági döntéseket (ICJ, ICC), Genfi Egyezményeket, valamint hivatalos statisztikákat. Cáfold az elterjedt mítoszokat tárgyilagosan, száraz tényekkel.",
      short: "Rövid / Social Media barát: Kifejezetten X/Twitter, TikTok vagy Facebook komment szekciókba való, maximum 2-3 mondatos, frappáns és könnyen megjegyezhető válasz, ami nem megy bele kimerítő részletekbe, de megfordítja a troll narratíváját.",
      logical_debunk: "Logikai Cáfolat: Mutass rá békésen a troll érvében rejlő logikai hibákra (pl. whataboutism, szalmabáb érvelés, kényszerített hamis dilemma, kollektív bűnösség általánosítása). Világíts rá a ferdítések mögötti ténybeli ellentmondásokra intelligens módon.",
      socratic: "Szókratészi Kérdező: Inkább kérdésekkel késztess gondolkodásra. Tegyél fel 2-3 mély, logikus és nehezen kikerülhető morális és emberi jogi kérdést a megszálló állam politikájára és a palesztin elnyomásra vonatkozóan, amik segítenek a külső olvasóknak tisztán látni, és válaszadásra kényszerítik a trollt.",
      empathetic: "Empatikus & Személyes: Helyezd a hangsúlyt az emberi sorsokra, a családok egységére, a szabadság, a méltóság és a biztonság egyetemes vágyára. Használj mélyen humánus és összekötő tónust, amivel a semleges olvasók is könnyen azonosulni tudnak.",
      creative_analogy: "Kreatív Analógia: Magyarázd el a helyzetet egy közérthető, szemléletes hétköznapi vagy történelmi hasonlattal (pl. két szomszéd viszonya, ahol az egyik kerítést épít a másik kertje köré és korlátozza a vizét). Ez rendkívül gyorsan megérteti az aszimmetrikus erőviszonyokat.",
      sarcastic: "Maró Gúny & Irónia: Szarkasztikus, szellemes, kissé pikírt és rendkívül intelligens tónus, ami rávilágít a siralmas kettős mércékre és az ellentmondások abszurditására anélkül, hogy dühösnek tűnne vagy közönséges személyeskedésbe süllyedne. Használj finom, de kíméletlen fekete humort és logikai fegyvereket a troll álszentségének leleplezésére."
    };

    const strategyText = toneDefinitions[tone] || toneDefinitions.factual;

    const systemInstruction = `Te vagy a "Higgadt Válaszadó", egy mesterséges intelligencia alapú segéd, aki támogatja a palesztin narratívát képviselő vitapartnereket. Célod, hogy higgadt, kulturált, rendkívül meggyőző, tényekkel és nemzetközi joggal alátámasztott válaszokat adj az Izrael-Palesztina témában feltett ellenséges, félretájékoztató vagy trollkodó kommentekre.

SZIGORÚ BIZTONSÁGI ÉS ETIKAI ALAPELVEK:
1. Szigorúan TILOS bármilyen antiszemitizmus, iszlamofóbia vagy gyűlöletbeszéd használata!
2. Szigorúan TILOS az erőszak dicsőítése, támogatása, vagy terrorista/fegyveres csoportok (mint például a Hamász) tetteinek igazolása vagy relativizálása.
3. Mindig válasszd külön a védtelen, ártatlan civileket (mind palesztin, mind izraeli oldalon) a katonai és politikai szervezetektől. Fejezd ki a sajnálatodat minden ártatlan civil áldozatért.
4. Fókuszálj az események strukturális és jogi hátterére: a katonai megszállásra, a blokádra, az illegális telepek bővítésére és az egyenlőtlen jogviszonyokra mint alapvető igazságtalanságokra.
5. Soha ne süllyedj le a troll szintjére személyeskedéssel vagy sértő kifejezésekkel. Mutass példát intelligens és méltóságteljes érvelésből.

A generált válasznak főként ezen a nyelven kell megszületnie: ${language}.
A kiválasztott beszédmód / stratégia: ${strategyText}
Extra kontextus / kiemelendő szempontok (ha a felhasználó megadta): ${customContext || "Nincs extra szempont."}

A visszatérési formátumnak egy szigorú JSON struktúrának kell lennie az alábbi mezőkkel:
- "response": A fenti irányelveknek megfelelő, bemásolható válaszreakció (a forráskomment nyelvéhez is igazodva, de elsősorban és alapértelmezetten magyarul).
- "tacticalAdvice": Tipp és magyarázat a felhasználónak, hogy miért így lett megfogalmazva a válasz, és hogyan kezelje a további provokációkat. (Magyar nyelven)
- "keyFactsUsed": Egy lista (array) a válaszban felhasznált legfontosabb tényekről vagy jogi forrásokról (például ENSZ határozatok, nemzetközi egyezmények, emberi jogi szervezetek hivatkozásai), amit a felhasználó felhozhat forrásként. (Magyar nyelven)
- "pitfallsToAvoid": Egy lista a beszélgetés során elkerülendő csapdákról (pl. "Ne hagyd, hogy eltereljék a témát a Hamászra anélkül, hogy megemlítenéd Ciszjordániát, ahol nincs Hamász kormányzat, mégis zajlik a megszállás."). (Magyar nyelven)`;

    const userPrompt = `Íme a troll / kritikus komment, amire választ kell írni:
"${comment}"

Kérlek, elemezd a fenti komment állításait és generáld le a strukturált JSON választ az instrukcióknak megfelelően. Úgy válaszolj, hogy a visszatérő szöveged valid JSON legyen.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["response", "tacticalAdvice", "keyFactsUsed", "pitfallsToAvoid"],
          properties: {
            response: {
              type: Type.STRING,
              description: "A bemásolható palesztinbarát, higgadt counter-komment."
            },
            tacticalAdvice: {
              type: Type.STRING,
              description: "Taktikai tanács a vitázónak, hogyan érveljen tovább."
            },
            keyFactsUsed: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Az érvek alátámasztására szolgáló konkrét tények és hivatkozások."
            },
            pitfallsToAvoid: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Elkerülendő csapdák az adott kommentre való reagáláskor (pl. derailing)."
            }
          }
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Nem érkezett válasz a mesterséges intelligenciától.");
    }

    const parsedResult = JSON.parse(outputText);
    res.json(parsedResult);

  } catch (error: any) {
    console.error("Hiba a válasz generálása során:", error);
    res.status(500).json({
      error: "Sajnáljuk, hiba történt a válasz generálása közben. Győződjön meg róla, hogy a GEMINI_API_KEY be van állítva a Secrets panelen!",
      details: error.message
    });
  }
});

// OSINT (Open Source Intelligence) Route for analyzing Hasbara narratives focusing on Hungary
app.post("/api/osint-scan", async (req, res) => {
  try {
    const { targetDomain, keyword } = req.body;

    if (!targetDomain || typeof targetDomain !== "string") {
      res.status(400).json({ error: "Kérjük, adjon meg egy célpont domént vagy forrást!" });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `Te vagy a "Hasbara Seeker" OSINT (nyílt forráskódú hírszerzési) elemző modulja, amely a magyarországi médiatérben megjelenő Izrael-Palesztina témájú cikkeket, bejegyzéseket, propagandát és hasbara (állami/szervezett spin) narratívákat vizsgálja.
    
    A te feladatod kimutatni, hogyan jelenik meg az izraeli kormánynarratíva (vagy annak közvetett befolyása) a megadott magyar hírportálon vagy kulcsszó kapcsán.
    Legyél szigorúan objektív, tényalapú és szakértői stílusú. Mutass be valós és létező tendenciákat a magyar médiahálózatokban (pl. kormánypárti lapok mandiner.hu, origo.hu, demokrata.hu izraeli elfogultsága vagy egyházi csatornák, illetve független portálok telex.hu, index.hu árnyaltabb, mégis gyakran egyoldalú forráslefordításai).
    
    Célod leleplezni a csúsztatásokat, békésen, tudományosan, a nemzetközi jog és az ENSZ jelentések fényében.
    
    A visszatérési formátumnak egy szigorú JSON struktúrának kell lennie az alábbi mezőkkel:
    - "analysisTime": Az elemzés pontos időbesszorzása (például formázott dátum).
    - "riskLevel": Kockázati szint (pl. "KRITIKUS", "MAGAS", "KÖZEPES", "ALACSONY"), ami jelzi a propagandisztikus vagy egyoldalú tartalom torzítási intenzitását az adott témában.
    - "confidenceScore": Elemzési megbízhatóság százalékban (szám 0-100 között).
    - "biasRating": Elfogultsági besorolás (pl. "Erősen egyoldalú izraeli fókuszú", "Szerkezetileg korlátozott diskurzus", "Részben egyensúlyozott").
    - "detectedNarratives": Egy lista (array) a megfigyelt hasbara/propaganda narratívákról. Minden tétel tartalmazza:
        * "narrativeTitle": A narratíva címe (pl. "Önvédelmi retorika kiterjesztése civilekre", "Emberi pajzs narratíva mint univerzális felmentés")
        * "commonHungarianPhrases": Tipikus magyar szófordulatok, amikkel ezt a narratívát átveszik (egy lista, legalább 2-3 példa, pl: "joga van megvédenie magát", "Hamasz-terroristák közé bújtak")
        * "tacticalPurpose": Mi a narratíva valódi taktikai célja?
        * "manipulationIntensity": "Nagyon Magas", "Magas", "Közepes" vagy "Alacsony"
    - "keyFindings": Konkrét, valósághű hírpublikációs minták vagy talált csúsztatások elemzése. Minden tétel tartalmazza:
        * "issueTitle": A torzítás vagy elhallgatás témája
        * "mediaQuotationExample": Tipikus magyar médiaidézet példa vagy jellemző állítás
        * "factCheckDebunk": Tényalapú békés cáfolat és tényellenőrző magyarázat
        * "internationalLawHivatalosReferencia": Hivatalos nemzetközi jogvédő vagy ENSZ (UNRWA, OCHA, ICJ, Amnesty International) hivatkozási pont
    - "verdict": Összegző OSINT szakértői vélemény az adott médiumról vagy kulcsszóról a magyar nyilvánosságban, tippekkel a magyar olvasóknak az álhírek felismeréséhez.`;

    const userPrompt = `Futtass elemzést a következő magyar forráson/kulcsszón:
    Célpont/Médium: "${targetDomain}"
    Fókuszált keresési kulcsszó: "${keyword || "Általános hasbara szűrés"}"
    
    Elemezz és adj megvalósítható OSINT hírszerzési jelentést magyarul az elvárt szigorú JSON formátumban.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["analysisTime", "riskLevel", "confidenceScore", "biasRating", "detectedNarratives", "keyFindings", "verdict"],
          properties: {
            analysisTime: { type: Type.STRING },
            riskLevel: { type: Type.STRING },
            confidenceScore: { type: Type.INTEGER },
            biasRating: { type: Type.STRING },
            detectedNarratives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["narrativeTitle", "commonHungarianPhrases", "tacticalPurpose", "manipulationIntensity"],
                properties: {
                  narrativeTitle: { type: Type.STRING },
                  commonHungarianPhrases: { type: Type.ARRAY, items: { type: Type.STRING } },
                  tacticalPurpose: { type: Type.STRING },
                  manipulationIntensity: { type: Type.STRING }
                }
              }
            },
            keyFindings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["issueTitle", "mediaQuotationExample", "factCheckDebunk", "internationalLawHivatalosReferencia"],
                properties: {
                  issueTitle: { type: Type.STRING },
                  mediaQuotationExample: { type: Type.STRING },
                  factCheckDebunk: { type: Type.STRING },
                  internationalLawHivatalosReferencia: { type: Type.STRING }
                }
              }
            },
            verdict: { type: Type.STRING }
          }
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Nem érkezett érvényes kimenet a nyílt forrású elemző modultól.");
    }

    const parsedResult = JSON.parse(outputText);
    res.json(parsedResult);

  } catch (error: any) {
    console.error("Hiba az OSINT keresés generálása során:", error);
    res.status(500).json({
      error: "Sajnáljuk, hiba lépett fel az OSINT vizsgálati motor futtatása közben.",
      details: error.message
    });
  }
});

// Configure Vite or Static files depending on environment
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite hot-reloading context
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    // Production status
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
