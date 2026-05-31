# Útmutató az Android Alkalmazás Építéséhez és Futtatásához

Ez a projekt fel lett készítve arra, hogy egy teljes értékű, natív Android-alkalmazásként fusson mobiltelefonon. A mobilalkalmazás alapjául a **Capacitor** technológia szolgál, amely a rendkívül gyors és reszponzív React és Tailwind felületedet közvetlenül egy natív Android WebView környezetbe csomagolja, miközben a válaszgenerálást az éles backend kiszolgáló végzi.

---

## 🛠️ Előfeltételek a számítógépeden

A fordításhoz és a telefonra való telepítéshez az alábbi ingyenes szoftverekre lesz szükség a gépeden:

1. **Node.js** (LTS verzió ajánlott) – [Letöltés](https://nodejs.org/)
2. **Android Studio** (A hivatalos Android fejlesztőeszköz) – [Letöltés](https://developer.android.com/studio)

---

## 📦 1. Lépés: A forráskód letöltése

Töltsd le a teljes projektet az AI Studio felületéről:
1. Kattints a jobb felső sarokban található **Beállítások (Fogaskerék / Export)** menüre.
2. Válaszd az **Export to ZIP** lehetőséget (vagy küldd be közvetlenül egy saját GitHub repóba az *Export to GitHub* gombbal).
3. Csomagold ki a letöltött ZIP fájlt egy tetszőleges mappába a számítógépeden.

---

## 🚀 2. Lépés: Függőségek telepítése és fordítás

Nyisd meg a parancssort (Terminal / PowerShell) a kicsomagolt projekt mappájában, majd futtasd a következő parancsokat:

```bash
# 1. Telepítsd a szükséges fejlesztői modulokat
npm install

# 2. Építsd fel a webes felületet (ez elkészíti a legfrissebb dist/ mappát)
npm run build

# 3. Szinkronizáld a webes kódot és a Capacitor erőforrásokat a natív Android projekttel
npx cap sync
```

---

## 📱 3. Lépés: Megnyitás és Futtatás Android Studio-ban

A legegyszerűbb módja az alkalmazás futtatásának és tesztelésének, ha megnyitod az Android Studio programban:

1. Indítsd el az **Android Studio**-t.
2. Válaszd az **Open** (Megnyitás) lehetőséget.
3. Keresd meg a kicsomagolt projekt mappáját, és válaszd ki a benne található **`android`** alkönyvtárat.
4. Várj 1-2 percet, amíg az Android Studio letölti a szükséges Gradle függőségeket (a háttérben szinkronizál).
5. **Futtatás:**
   - **Virtuális eszközön (Emulátor):** Hozz létre egy virtuális telefont az Android Studio *Device Manager* eszközével, indítsd el, majd kattints a felül lévő zöld **Run (Lejátszás / Futtatás)** billentyűre.
   - **Saját telefonon:** Csatlakoztasd az Android telefonodat a gépedhez USB-kábellel. Győződj meg róla, hogy a telefonodon be van kapcsolva a *Fejlesztői beállítások* (Developer Options) alatt az **USB Hibakeresés** (USB Debugging). Válaszd ki a telefonodat a felső listából, és kattints a zöld **Run** gombra.

---

## 🎨 Saját ikon és indítóképernyő (Splash Screen) beállítása

Az alkalmazás jelenleg a Capacitor alapértelmezett indítóképét és ikonjait tartalmazza. Ha ezt szeretnéd megváltoztatni a saját új logódra:

1. Az Android Studio-ban nyiss meg egy tetszőleges fájlt.
2. Kattints jobb gombbal az `app` mappára a bal oldali projektfán, majd válaszd a **New > Image Asset** lehetőséget.
3. Az **Icon Type** legyen *Launcher Icons (Adaptive and Legacy)*.
4. A **Path** mezőben keresd ki a saját logód képfájlját (PNG vagy SVG formátum).
5. Állítsd be a méretezést, majd kattints a **Next** és végül a **Finish** gombra. Az Android Studio automatikusan legenerálja az összes szükséges méretet és felbontást!

---

## 🌐 Hogyan kommunikál az app a mesterséges intelligenciával?

Mivel a Gemini AI kulcs és a válaszgeneráló motor biztonsági okokból a szerveren fut (így senki nem tudja ellopni a Gemini API kulcsodat a telefonról), az Android alkalmazás az éles szervereddel kommunikál.

A kódot már úgy készítettük fel, hogy automatikusan felismerje az Androidos környezetet és a közvetlen webes eléréshez irányítsa a kéréseket:
- Az API kéréseket a következő címre továbbítja: `https://ais-pre-ikpxmp3zwudpehdhk7ofrl-759050678263.europe-west2.run.app/api/counter-comment`
- Ha saját Render szerverre vagy egyéb hostingra költözteted a weboldalt, csak írd át ezt a címet a `src/App.tsx` fájl tetején található `getApiUrl` függvényben a saját éles szervered URL címére, és futtasd le újra a `npm run build && npx cap sync` parancsot.
