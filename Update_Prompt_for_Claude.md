# Update prompt pro Claude Code

Tento prompt zkopíruj a vlož do Claude Code. Claude si projde tvé soubory a aktualizuje je sám.

---

## Prompt:

Mám v projektu několik souborů, které potřebuji sloučit a aktualizovat. Postupuj systematicky:

### Krok 1: Přečti všechny relevantní soubory
- `CLAUDE.md` v rootu projektu
- `CLAUDE_addendum.md` v rootu projektu (pokud existuje)
- `.claude/agents/content-writer.md`
- `.claude/agents/ui-designer.md`
- `.claude/agents/frontend-builder.md`
- `.claude/agents/qa-reviewer.md`

### Krok 2: Sloučit CLAUDE_addendum.md do CLAUDE.md

Zpracuj obsah z `CLAUDE_addendum.md` do `CLAUDE.md` logicky:
- "Aktuální deadline" přidej na začátek (před "Projekt")
- "Materiály k dispozici" přidej za "Tech stack"
- "Reference" přidej za "Co JE v MVP"
- "Klíčový obsah pro homepage" přidej jako novou sekci
- "Sub-agenti" přidej jako referenci na konec
- "Strategie pro úterý" přidej jako poslední sekci

Po sloučení **smaž soubor CLAUDE_addendum.md**.

### Krok 3: Aktualizuj barvy ve všech agentech

V souborech `.claude/agents/ui-designer.md` a `.claude/agents/frontend-builder.md` najdi všechny zmínky o barevné paletě a **nahrad' je tímto** (brand kniha NorthSun):

```css
--navy: #030057;          /* primární tmavá - z brand booku */
--navy-mid: #004AAD;      /* střední modrá - z loga */
--yellow: #FCC013;        /* akcent, CTA tlačítka - z brand booku */
--white: #FFFFFF;
--gray-light: #F3F3F3;    /* sekundární pozadí */
--gray-medium: #6B7280;   /* sekundární text */
--gray-dark: #111827;     /* hlavní text */
--border: #E5E7EB;
```

**Pravidla použití:**
- Navy = dominantní (hlavičky, footer, dark sections, primární text)
- Yellow = akcenty (CTA tlačítka, klíčové highlights, badge "Vlastní realizace")
- Gray-light = sekundární pozadí sekcí
- NEPOUŽÍVAT yellow na linky (jen na CTA buttony)

### Krok 4: Aktualizuj font ve všech agentech

V souborech `.claude/agents/ui-designer.md` a `.claude/agents/frontend-builder.md` **nahrad' Inter za Syne** (Google Fonts).

Syne specs:
- Váhy: 400, 500, 600, 700, 800
- Nadpisy: Syne 800, letter-spacing: -0.025em
- Body: Syne 400, line-height: 1.6
- Import přes `next/font/google`

### Krok 5: Přidej česká typografická pravidla do content-writer

V `.claude/agents/content-writer.md` najdi sekci "Czech language quality" a **přidej pod ni**:

```markdown
### Czech typography rules
- Jednoznakové spojky a předložky (a, i, v, s, k, z, u, o) NESMÍ zůstat na konci řádku
- V textech používej `&nbsp;` (non-breaking space) za nimi
- Příklad: "Northsun je česko-švédsko-norská EPC firma a&nbsp;na rozdíl od běžných instalačních firem..."
- Toto pravidlo aplikuj ve VŠECH českých textech (JSON soubory, JSX, hardcoded stringy)
```

### Krok 6: Hláška o vykání

Ujisti se, že v content-writer agent je explicitně:
- CZ verze používá **vykání** (formálnější tón než starý web)
- Nikoli tykání, i když máte přátelské vztahy s klienty

### Krok 7: Hláška o em-dashech

Připomeň v content-writer agent:
- **NIKDY** nepoužívat em pomlčku (—)
- Nahrazovat čárkou nebo restrukturalizovat větu
- Toto pravidlo platí jak v textech, tak v JSX

### Krok 8: Souhrn

Po dokončení mi pošli:
1. Seznam souborů, které jsi upravil
2. Krátké shrnutí, co se v každém změnilo
3. Potvrzení, že CLAUDE_addendum.md byl smazán
4. Jestli vidíš nějaké další nesrovnalosti, na které bych si měl dát pozor

---

## Důležité

- **Nedělej žádné jiné změny** kromě výše uvedeného
- **Zachovej stávající strukturu** souborů (nepřepisuj celé sekce, kde stačí jen úprava)
- Pokud něco není jasné, **zeptej se před úpravou**, ne po ní
