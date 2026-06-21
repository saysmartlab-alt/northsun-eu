# Úvodní prompt pro Claude Code (VS Code) — Northsun web

Tento text zkopíruj a vlož jako první zprávu v Claude Code, jakmile otevřeš projekt.

---

## Prompt:

Ahoj, jdeme upgradovat pre-launch web Northsun na plnohodnotnou homepage. Mám pevný deadline úterý 9.6. (veletrh), takže musíme být efektivní.

**Co máme:**
- Pre-launch s "coming soon" odpočítáváním už běží na northsun-eu.com (Next.js 15, Vercel, i18n CZ/EN)
- Domain a HTTPS funguje
- Materiály (fotky, texty, PDF) jsou ve sdílené složce a v `/public/images/`

**Co potřebuji:**
Plnohodnotnou homepage s těmito sekcemi (shora dolů):
1. Header (sticky, s navigací a language switchem)
2. Hero (full-viewport, fotka floating-solar jako background)
3. About short (Engineering-led EPC firma)
4. Services (6 produktových linií, grid karet)
5. Why Northsun (4 diferenciátory)
6. References (6 projektů, mix vlastních a partnerských)
7. Partners (PanelClaw, Sunsurf, Solar SK)
8. Contact (formulář + kontaktní info)
9. Footer

**Kontext, který si přečti jako první:**
- `CLAUDE.md` v rootu projektu (kompletní brief)
- `.claude/agents/` — máš 4 specializované sub-agenty: content-writer, ui-designer, frontend-builder, qa-reviewer

**Jak postupovat:**

**Krok 1:** Přečti si `CLAUDE.md` a vrať mi krátký souhrn (5-6 vět), abych věděl, že jsi to pochopil.

**Krok 2:** Použij `frontend-builder` agenta, aby zkontroloval aktuální stav projektu (struktura souborů, dependencies, tailwind config) a navrhl, co je potřeba upravit/přidat pro setup design systému.

**Krok 3:** Než začneš psát kód:
- Použij `content-writer` agenta na finalizaci textů (CZ + EN) podle CLAUDE.md
- Použij `ui-designer` agenta na rozvržení hero sekce a typografii

**Krok 4:** Implementuj sekce postupně shora dolů. Po každé sekci:
- Commit s popisným message
- Push (auto-deploy na Vercel)
- Stručně mě informuj, abych mohl vidět progress

**Krok 5:** Před finálním deploy spusť `qa-reviewer` agenta na kompletní kontrolu.

**Důležité principy:**
- Premium estetika, ne korporátní (editorial design, hodně whitespace)
- Mobile-first (návštěvníci z QR kódu na telefonu)
- Žádné em-dashy (—) v češtině, přirozená čeština
- Server Components by default, Client jen kde nutné
- Performance: Lighthouse ≥ 90 ve všech kategoriích
- Reference s transparentními labely (vlastní vs partner)

**Co se mě ptej:**
- Jakákoli rozhodnutí, která mění strukturu projektu
- Cokoli, kde mohu poskytnout doplňující kontext

**Co rozhodni sám:**
- Drobné design detaily v rámci design systému
- Konkrétní implementace komponent
- Volba nástrojů pro detaily (např. konkrétní lucide ikona pro službu)

**Pojďme začít. Začni Krokem 1: přečti CLAUDE.md a dej mi souhrn.**

---

## Až ti řekne, že přečetl CLAUDE.md, řekni:

"Super. Teď použij `frontend-builder` agenta na kontrolu projektu a navrh setup design systému. Až bude hotovo, použij `ui-designer` agenta na finální rozvržení hero sekce. Pak začneme implementovat."

---

## Užitečné prompty během práce

### Když chceš novou sekci
"Použij `ui-designer` agenta na rozvržení sekce [SLUŽBY/REFERENCE/atd.], pak `frontend-builder` agenta na implementaci."

### Když chceš upravit texty
"Použij `content-writer` agenta na upravení [TEXTU/SEKCE] tak, aby [POŽADAVEK]."

### Když chceš zkontrolovat kvalitu
"Použij `qa-reviewer` agenta na kontrolu [SEKCE/PROJEKTU]."

### Když ti něco nejde
"Vysvětli mi, co se děje, a navrh možné řešení. Nejdřív ukaž problém, pak řešení."

### Když chceš víc inicialivy od Claude
"Rozhodni se sám podle CLAUDE.md a design systému. Pak mi ukaž výsledek."

---

## Anti-patterny — čemu se vyhnout

❌ "Udělej mi celý web naráz" — bude to chaos, postupuj po sekcích
❌ "Použij random barvy" — vždy podle design systému
❌ "Přidej animace všude" — jemné, ne přehnané
❌ "Klikni a hotovo" — vždy se ujisti, že jsi otestoval na mobilu
❌ Nedávat Claude přístup k CLAUDE.md a agentům — pak nebude vědět kontext
