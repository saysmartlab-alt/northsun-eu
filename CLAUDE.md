# NorthSun — instrukce pro Claude

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
- **Analytika:** Plausible
- **Hosting:** Vercel

## Pravidla pro práci
- Po každé úpravě commit + push (Vercel auto-deploy)
- Nikdy nepoužívat em pomlčku (—), nahrazovat čárkou
- Spojky (a, i, v, s, k, z, u, o) nesmí zůstat na konci řádku (česká typografie)
- CZ verze používá **vykání** (formálnější než starý web)
- Neposílat odkaz na localhost, uživatel kontroluje na Vercelu
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

## Co NENÍ v MVP
- Carports, BIPV/fasády, FPV/plovoucí, opravy a re-engineering
- B2B landing DE, Sanity blog systém, search, SE/NO/DE jazyky

## Postup vývoje
1. Inkrementálně, sekci po sekci
2. Začít od základní struktury a layoutu
3. Pak homepage, pak ostatní stránky
4. Sanity schema až bude struktura webu jasná
5. Po každé větší sekci ověřit na desktop i mobil
