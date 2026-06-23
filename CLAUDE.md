# NorthSun — instrukce pro Claude

## Aktuální deadline (PRIORITA)

**Úterý 23.6.2026, veletrh s QR kódem.**

Návštěvníci naskenují QR kód na telefonu, musí během 10 sekund:
1. Pochopit, kdo NorthSun je
2. Vidět, co děláme (přehled služeb)
3. Najít kontakt (telefon, email, formulář)

Funkční MVP před úterým > perfektní web po úterý.

## Projekt
Premium web pro NorthSun (česko-švédsko-norská solární EPC firma).
Kořen projektu: `c:\Users\spiso\OneDrive\Dokumenty\claude_projects\northsun-eu\`
Doména: northsun-eu.com (Vercel)

## Tech stack
- **Framework:** Next.js 15 (App Router)
- **Jazyk:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **CMS:** Sanity (headless)
- **Animace:** Framer Motion
- **Formuláře:** react-hook-form + zod
- **Mail:** Resend
- **Analytika:** Vercel Analytics
- **Hosting:** Vercel

## Materiály k dispozici

V `/public/images/` jsou připravené fotky a loga (po konverzi z HEIC):

**Reference fotky:**
- `floating-solar.jpg` — plovoucí solární elektrárna (KANDIDÁT NA HERO!)
- `walraven.png` — Nizozemsko, bytový dům + industriální objekt, koláž
- `solar-park-1.jpg`, `solar-park-2.jpg`, `solar-park-3.jpg` — jižní Evropa, montovaná konstrukce, sunset

**Partneři:**
- `panelclaw-logo.jpeg` — logo
- `panelclaw-cert.png` — oficiální certifikát kvality pro North Sun s.r.o. (důležitý social proof!)
- `solarsk-logo.png` — Solar SK partner

**PDF s kontextem (ne pro web, jen pro orientaci):**
- `presentation_file_northsun_eng_update.pdf` — investorská prezentace v EN
- `North_Sun_x_Sunsurf.pdf` — partnerství se Sunsurf (floating + landfill)
- `DATA_SHEET_SCP-A-612.pdf` — technický datasheet Solar SK

## Pravidla pro práci

### Git workflow (MVP fáze, od 2026-06-21)
- **Pracovní branch: `dev`** — všechny změny commitovat tam
- **`master` = pre-launch produkce** — NIKDY na něj nepushovat bez explicitního souhlasu uživatele
- **`git push` jen na vyžádání** — commitovat lokálně, push až řekne uživatel
- Po větších změnách spustit `npm run dev`, poslat localhost URL (`http://localhost:3000`)
- Vercel auto-deploy je vázaný na master → push na master = nasazení pre-launch verze, pozor!

### Obsah a stylistika
- Nikdy nepoužívat em pomlčku (—), nahrazovat čárkou
- Spojky (a, i, v, s, k, z, u, o) nesmí zůstat na konci řádku (česká typografie)
- CZ verze používá **vykání** (formálnější než starý web)

### Architektura
- Server Components default, Client Components jen kde je potřeba interaktivity
- Mobile-first design (50%+ traffic z mobilu)
- Lighthouse 90+ ve všech kategoriích

## Brand barvy (z brand booku)
- `--navy: #030057` (primární tmavá)
- `--yellow: #FCC013` (akcent, tlačítka)
- `--white: #FFFFFF`
- `--gray-light: #F3F3F3` (sekundární pozadí)
- Logo má embedded #004AAD jako střední modrou

## Typografie
- **Syne** (Google Fonts), váhy 400/500/600/700/800
- Nadpisy: Syne 800, letter-spacing -0.025em
- Body: Syne 400, line-height 1.6

## Tagline a komunikace
- Tagline: "Neděláme nejlevněji, děláme nejlépe."
- Tón: profesionální, ale přátelský, engineering-led
- Zakázané fráze: "nejlepší v branži", "lídr trhu", marketingová prázdnota
- Preferovat: konkrétní čísla, MWp, ROI, počet instalací

## Co JE v MVP (fáze 1)
- Homepage, O nás, Pro domácnosti (B2C), Solární parky (B2B), Reference, Kontakt
- Jazyky: CZ + EN

## Reference (pro web)

**Vlastní (3 ověřené s Lukášem, 2026-06-21):**
- **Walraven (NL)** — komerční solární střecha (2023). NE fasáda, jen střecha.
- **Solar roof Norsko (Oslo + Hammar)** — komerční střecha 1-2 MW (2024). YouTube video: https://www.youtube.com/watch?v=YvpCblroTYY
- **Floating solar (SE)** — plovoucí elektrárna se Sunsurf, vlastní realizace ve spolupráci. Badge: "Vlastní realizace ve spolupráci se Sunsurf".

**Co NENÍ vlastní reference (z reference sekce ODSTRANIT):**
- Solar park Norsko — NorthSun pouze dodal technickou analýzu a nacenění, ne realizaci
- Solar park jižní Evropa (Chorvatsko) — fotky nejsou vlastní NorthSun

**Partneři (transparentně označit):**
- PanelClaw (US) — certifikovaný partner, máme oficiální certifikát
- Sunsurf (SE) — partner pro floating solar a piling-free landfill
- Solar SK (UA) — partner pro carport mounting systems

**Pravidlo:** Vlastní = yellow badge "Vlastní realizace". Vlastní s partnerem = yellow badge "Vlastní realizace ve spolupráci s X". Čistě partnerský projekt = gray badge "Ve spolupráci s X". Nikdy nezamlčet.

**Kvalita > kvantita:** 3 silné autentické reference jsou lepší než 6 pochybných.

## Co NENÍ v MVP
- Carports, BIPV/fasády, FPV/plovoucí, opravy a re-engineering
- B2B landing DE, Sanity blog systém, search, SE/NO/DE jazyky

## Klíčový obsah pro homepage

### Hero
- **H1 (CZ):** Premium solární EPC napříč severní Evropou
- **H1 (EN):** Premium solar EPC across Northern Europe
- **Sub (CZ):** Realizujeme i tam, kam ostatní nedosáhnou. Solární parky, plovoucí elektrárny, fasády a další po celé Evropě.
- **CTA primary:** Nezávazná konzultace
- **CTA secondary:** Naše projekty

### O firmě (krátká sekce)
NorthSun je česko-švédsko-norská EPC firma specializovaná na solární energetiku. Na rozdíl od běžných instalačních firem navrhujeme vlastní projektovou dokumentaci a provádíme statické výpočty. Náš tým komunikuje v 8 jazycích a pravidelně se vzdělává na Intersolar v Mnichově.

Pobočky:
- 🇨🇿 Vejprnice (HQ): Sokolská 137, 330 27
- 🇸🇪 Malmö
- 🇳🇴 Molde

### Diferenciátory (4 bloky pro "Proč NorthSun")
1. **Engineering-led EPC** — vlastní projektová dokumentace, PV syst, statika, simulace výnosů
2. **Mezinárodní zkušenosti** — reference v Německu, Nizozemsku, Švédsku, Norsku, Belgii a Chorvatsku
3. **Certifikovaná kvalita** — certifikováni od PanelClaw za úspěšnou instalaci jejich mounting systémů
4. **Multijazyčný tým** — komunikujeme v 8 jazycích, vzděláváme se na Intersolar v Mnichově

### Kontakt
- **Email:** northsunsro@gmail.com
- **Telefon:** +420 734 383 340 (Lukáš Bílek, Head of EPC Projects)

### Footer / legal
© 2026 North Sun s.r.o. · IČO 17279976 · DIČ CZ17279976 · Sokolská 137, 330 27 Vejprnice

## Postup vývoje
1. Inkrementálně, sekci po sekci
2. Začít od základní struktury a layoutu
3. Pak homepage, pak ostatní stránky
4. Sanity schema až bude struktura webu jasná
5. Po každé větší sekci ověřit na desktop i mobil

## Sub-agenti

V `.claude/agents/` najdeš 4 specializované agenty:
- **content-writer** — psaní a úpravy textů CZ + EN (drží přirozenou češtinu, žádné anglicismy ani em-dashy)
- **ui-designer** — design systému, layouty, typografie (premium estetika)
- **frontend-builder** — React/Next.js implementace (TypeScript strict, Server Components)
- **qa-reviewer** — kontrola před deploy (build, accessibility, mobile, content)

Claude Code je vyvolá automaticky podle typu úkolu, nebo můžeš explicitně říct: "Use the ui-designer agent to..."

## Strategie pro úterý 23.6.

Pokud nestíháš plný MVP, prioritizuj v tomto pořadí:

1. ✅ **MUST:** Hero, About short, Services, Contact, Footer
2. ✅ **MUST:** Mobilní responzivita, funkční formulář
3. 🔶 **SHOULD:** Reference (alespoň 4 karty), Why NorthSun (4 bloky)
4. 🔶 **SHOULD:** Subtle animace (Framer Motion fade-in-up)
5. 🔵 **NICE:** Partners section, YouTube video embed, FAQ

Pokud bys měl škrtat, škrtej od bodu 5 nahoru.
