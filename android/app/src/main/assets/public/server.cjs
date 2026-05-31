var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader("Content-Security-Policy", "frame-ancestors *;");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});
app.use(import_express.default.json());
var getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables.");
  }
  return new import_genai.GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
app.post("/api/counter-comment", async (req, res) => {
  try {
    const { comment, tone, customContext, language = "Hungarian" } = req.body;
    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      res.status(400).json({ error: "K\xE9rj\xFCk, adjon meg egy elemzend\u0151 kommentet!" });
      return;
    }
    const ai = getGeminiClient();
    const toneDefinitions = {
      humanitarian: "Humanit\xE1rius f\xF3kusz: Koncentr\xE1lj a civil lakoss\xE1g helyzet\xE9re, a g\xE1zai \xE9s ciszjord\xE1niai \xE9letk\xF6r\xFClm\xE9nyekre, az emberi jogi szervezetek (Amnesty, HRW, ENSZ) jelent\xE9seire, a v\xE9dtelen civilek \xE9s gyermekek szenved\xE9s\xE9re. Hangs\xFAlyozd az azonnali b\xE9k\xE9t \xE9s humanit\xE1rius seg\xE9lyez\xE9st.",
      historical: "T\xF6rt\xE9nelmi \xE9s ENSZ f\xF3kusz: Helyezd el a vit\xE1t a t\xF6rt\xE9nelmi kontextusban. Besz\xE9lj a Nakb\xE1r\xF3l (1948), az ENSZ hat\xE1rozatokr\xF3l (pl. 242-es b\xE9k\xE9s kivonul\xE1sr\xF3l sz\xF3l\xF3 hat\xE1rozat, 194-es menek\xFClt\xFCgyi hat\xE1rozat), a megsz\xE1ll\xE1s kezdeteir\u0151l (1967), az illeg\xE1lis telep\xFCl\xE9sekr\u0151l \xE9s az \xE9vtizedes fesz\xFClts\xE9g okair\xF3l.",
      factual: "T\xE9nyellen\u0151rz\xE9s \xE9s Nemzetk\xF6zi Jog: Haszn\xE1lj konkr\xE9t t\xE9nyeket, nemzetk\xF6zi b\xEDr\xF3s\xE1gi d\xF6nt\xE9seket (ICJ, ICC), Genfi Egyezm\xE9nyeket, valamint hivatalos statisztik\xE1kat. C\xE1fold az elterjedt m\xEDtoszokat t\xE1rgyilagosan, sz\xE1raz t\xE9nyekkel.",
      short: "R\xF6vid / Social Media bar\xE1t: Kifejezetten X/Twitter, TikTok vagy Facebook komment szekci\xF3kba val\xF3, maximum 2-3 mondatos, frapp\xE1ns \xE9s k\xF6nnyen megjegyezhet\u0151 v\xE1lasz, ami nem megy bele kimer\xEDt\u0151 r\xE9szletekbe, de megford\xEDtja a troll narrat\xEDv\xE1j\xE1t.",
      logical_debunk: "Logikai C\xE1folat: Mutass r\xE1 b\xE9k\xE9sen a troll \xE9rv\xE9ben rejl\u0151 logikai hib\xE1kra (pl. whataboutism, szalmab\xE1b \xE9rvel\xE9s, k\xE9nyszer\xEDtett hamis dilemma, kollekt\xEDv b\u0171n\xF6ss\xE9g \xE1ltal\xE1nos\xEDt\xE1sa). Vil\xE1g\xEDts r\xE1 a ferd\xEDt\xE9sek m\xF6g\xF6tti t\xE9nybeli ellentmond\xE1sokra intelligens m\xF3don.",
      socratic: "Sz\xF3krat\xE9szi K\xE9rdez\u0151: Ink\xE1bb k\xE9rd\xE9sekkel k\xE9sztess gondolkod\xE1sra. Tegy\xE9l fel 2-3 m\xE9ly, logikus \xE9s nehezen kiker\xFClhet\u0151 mor\xE1lis \xE9s emberi jogi k\xE9rd\xE9st a megsz\xE1ll\xF3 \xE1llam politik\xE1j\xE1ra \xE9s a palesztin elnyom\xE1sra vonatkoz\xF3an, amik seg\xEDtenek a k\xFCls\u0151 olvas\xF3knak tiszt\xE1n l\xE1tni, \xE9s v\xE1laszad\xE1sra k\xE9nyszer\xEDtik a trollt.",
      empathetic: "Empatikus & Szem\xE9lyes: Helyezd a hangs\xFAlyt az emberi sorsokra, a csal\xE1dok egys\xE9g\xE9re, a szabads\xE1g, a m\xE9lt\xF3s\xE1g \xE9s a biztons\xE1g egyetemes v\xE1gy\xE1ra. Haszn\xE1lj m\xE9lyen hum\xE1nus \xE9s \xF6sszek\xF6t\u0151 t\xF3nust, amivel a semleges olvas\xF3k is k\xF6nnyen azonosulni tudnak.",
      creative_analogy: "Kreat\xEDv Anal\xF3gia: Magyar\xE1zd el a helyzetet egy k\xF6z\xE9rthet\u0151, szeml\xE9letes h\xE9tk\xF6znapi vagy t\xF6rt\xE9nelmi hasonlattal (pl. k\xE9t szomsz\xE9d viszonya, ahol az egyik ker\xEDt\xE9st \xE9p\xEDt a m\xE1sik kertje k\xF6r\xE9 \xE9s korl\xE1tozza a viz\xE9t). Ez rendk\xEDv\xFCl gyorsan meg\xE9rteti az aszimmetrikus er\u0151viszonyokat.",
      sarcastic: "Mar\xF3 G\xFAny & Ir\xF3nia: Szarkasztikus, szellemes, kiss\xE9 pik\xEDrt \xE9s rendk\xEDv\xFCl intelligens t\xF3nus, ami r\xE1vil\xE1g\xEDt a siralmas kett\u0151s m\xE9rc\xE9kre \xE9s az ellentmond\xE1sok abszurdit\xE1s\xE1ra an\xE9lk\xFCl, hogy d\xFCh\xF6snek t\u0171nne vagy k\xF6z\xF6ns\xE9ges szem\xE9lyesked\xE9sbe s\xFCllyedne. Haszn\xE1lj finom, de k\xEDm\xE9letlen fekete humort \xE9s logikai fegyvereket a troll \xE1lszents\xE9g\xE9nek leleplez\xE9s\xE9re."
    };
    const strategyText = toneDefinitions[tone] || toneDefinitions.factual;
    const systemInstruction = `Te vagy a "Higgadt V\xE1laszad\xF3", egy mesters\xE9ges intelligencia alap\xFA seg\xE9d, aki t\xE1mogatja a palesztin narrat\xEDv\xE1t k\xE9pvisel\u0151 vitapartnereket. C\xE9lod, hogy higgadt, kultur\xE1lt, rendk\xEDv\xFCl meggy\u0151z\u0151, t\xE9nyekkel \xE9s nemzetk\xF6zi joggal al\xE1t\xE1masztott v\xE1laszokat adj az Izrael-Palesztina t\xE9m\xE1ban feltett ellens\xE9ges, f\xE9lret\xE1j\xE9koztat\xF3 vagy trollkod\xF3 kommentekre.

SZIGOR\xDA BIZTONS\xC1GI \xC9S ETIKAI ALAPELVEK:
1. Szigor\xFAan TILOS b\xE1rmilyen antiszemitizmus, iszlamof\xF3bia vagy gy\u0171l\xF6letbesz\xE9d haszn\xE1lata!
2. Szigor\xFAan TILOS az er\u0151szak dics\u0151\xEDt\xE9se, t\xE1mogat\xE1sa, vagy terrorista/fegyveres csoportok (mint p\xE9ld\xE1ul a Ham\xE1sz) tetteinek igazol\xE1sa vagy relativiz\xE1l\xE1sa.
3. Mindig v\xE1lasszd k\xFCl\xF6n a v\xE9dtelen, \xE1rtatlan civileket (mind palesztin, mind izraeli oldalon) a katonai \xE9s politikai szervezetekt\u0151l. Fejezd ki a sajn\xE1latodat minden \xE1rtatlan civil \xE1ldozat\xE9rt.
4. F\xF3kusz\xE1lj az esem\xE9nyek struktur\xE1lis \xE9s jogi h\xE1tter\xE9re: a katonai megsz\xE1ll\xE1sra, a blok\xE1dra, az illeg\xE1lis telepek b\u0151v\xEDt\xE9s\xE9re \xE9s az egyenl\u0151tlen jogviszonyokra mint alapvet\u0151 igazs\xE1gtalans\xE1gokra.
5. Soha ne s\xFCllyedj le a troll szintj\xE9re szem\xE9lyesked\xE9ssel vagy s\xE9rt\u0151 kifejez\xE9sekkel. Mutass p\xE9ld\xE1t intelligens \xE9s m\xE9lt\xF3s\xE1gteljes \xE9rvel\xE9sb\u0151l.

A gener\xE1lt v\xE1lasznak f\u0151k\xE9nt ezen a nyelven kell megsz\xFCletnie: ${language}.
A kiv\xE1lasztott besz\xE9dm\xF3d / strat\xE9gia: ${strategyText}
Extra kontextus / kiemelend\u0151 szempontok (ha a felhaszn\xE1l\xF3 megadta): ${customContext || "Nincs extra szempont."}

A visszat\xE9r\xE9si form\xE1tumnak egy szigor\xFA JSON strukt\xFAr\xE1nak kell lennie az al\xE1bbi mez\u0151kkel:
- "response": A fenti ir\xE1nyelveknek megfelel\u0151, bem\xE1solhat\xF3 v\xE1laszreakci\xF3 (a forr\xE1skomment nyelv\xE9hez is igazodva, de els\u0151sorban \xE9s alap\xE9rtelmezetten magyarul).
- "tacticalAdvice": Tipp \xE9s magyar\xE1zat a felhaszn\xE1l\xF3nak, hogy mi\xE9rt \xEDgy lett megfogalmazva a v\xE1lasz, \xE9s hogyan kezelje a tov\xE1bbi provok\xE1ci\xF3kat. (Magyar nyelven)
- "keyFactsUsed": Egy lista (array) a v\xE1laszban felhaszn\xE1lt legfontosabb t\xE9nyekr\u0151l vagy jogi forr\xE1sokr\xF3l (p\xE9ld\xE1ul ENSZ hat\xE1rozatok, nemzetk\xF6zi egyezm\xE9nyek, emberi jogi szervezetek hivatkoz\xE1sai), amit a felhaszn\xE1l\xF3 felhozhat forr\xE1sk\xE9nt. (Magyar nyelven)
- "pitfallsToAvoid": Egy lista a besz\xE9lget\xE9s sor\xE1n elker\xFClend\u0151 csapd\xE1kr\xF3l (pl. "Ne hagyd, hogy elterelj\xE9k a t\xE9m\xE1t a Ham\xE1szra an\xE9lk\xFCl, hogy megeml\xEDten\xE9d Ciszjord\xE1ni\xE1t, ahol nincs Ham\xE1sz korm\xE1nyzat, m\xE9gis zajlik a megsz\xE1ll\xE1s."). (Magyar nyelven)`;
    const userPrompt = `\xCDme a troll / kritikus komment, amire v\xE1laszt kell \xEDrni:
"${comment}"

K\xE9rlek, elemezd a fenti komment \xE1ll\xEDt\xE1sait \xE9s gener\xE1ld le a struktur\xE1lt JSON v\xE1laszt az instrukci\xF3knak megfelel\u0151en. \xDAgy v\xE1laszolj, hogy a visszat\xE9r\u0151 sz\xF6veged valid JSON legyen.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          required: ["response", "tacticalAdvice", "keyFactsUsed", "pitfallsToAvoid"],
          properties: {
            response: {
              type: import_genai.Type.STRING,
              description: "A bem\xE1solhat\xF3 palesztinbar\xE1t, higgadt counter-komment."
            },
            tacticalAdvice: {
              type: import_genai.Type.STRING,
              description: "Taktikai tan\xE1cs a vit\xE1z\xF3nak, hogyan \xE9rveljen tov\xE1bb."
            },
            keyFactsUsed: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Az \xE9rvek al\xE1t\xE1maszt\xE1s\xE1ra szolg\xE1l\xF3 konkr\xE9t t\xE9nyek \xE9s hivatkoz\xE1sok."
            },
            pitfallsToAvoid: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Elker\xFClend\u0151 csapd\xE1k az adott kommentre val\xF3 reag\xE1l\xE1skor (pl. derailing)."
            }
          }
        }
      }
    });
    const outputText = response.text;
    if (!outputText) {
      throw new Error("Nem \xE9rkezett v\xE1lasz a mesters\xE9ges intelligenci\xE1t\xF3l.");
    }
    const parsedResult = JSON.parse(outputText);
    res.json(parsedResult);
  } catch (error) {
    console.error("Hiba a v\xE1lasz gener\xE1l\xE1sa sor\xE1n:", error);
    res.status(500).json({
      error: "Sajn\xE1ljuk, hiba t\xF6rt\xE9nt a v\xE1lasz gener\xE1l\xE1sa k\xF6zben. Gy\u0151z\u0151dj\xF6n meg r\xF3la, hogy a GEMINI_API_KEY be van \xE1ll\xEDtva a Secrets panelen!",
      details: error.message
    });
  }
});
var startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
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
//# sourceMappingURL=server.cjs.map
