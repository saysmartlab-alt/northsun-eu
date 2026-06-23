# Loga partnerů — instrukce pro Claude

Tato složka obsahuje **3 nová loga partnerů** (Pillar, Ecosol, Aiko Solar) ve všech potřebných variantách.

## Co dělat

**Zkopíruj obsah `partners/` do `public/images/partners/`** v projektu. Tím doplníš:

```
public/images/partners/
├── panelclaw/    ← už máš
├── sunsurf/      ← už máš
├── solarsk/      ← už máš
├── pillar/       ← NOVÉ (z tohoto ZIP)
├── ecosol/       ← NOVÉ (z tohoto ZIP)
└── aikosolar/    ← NOVÉ (z tohoto ZIP)
```

## Struktura a logika názvů

Každá partner složka má:

- **`logo.svg`** nebo **`logo.png`** = DEFAULT verze pro běžné použití (světlé pozadí)
- **`logo-white.*`** = pro tmavá pozadí (footer, hero, dark sections)
- **`logo-400w.png`** (volitelné) = menší verze pro mobile/kompaktní karty

### Pravidlo

V Partners sekci (světlé pozadí) → použij `logo.svg` nebo `logo.png`  
Ve footeru (navy pozadí) → použij `logo-white.svg` nebo `logo-white.png`

## Stav log

| Partner | Default | White verze | Vektor SVG |
|---------|---------|-------------|------------|
| **PanelClaw** | ✅ logo.png | (existuje) | ❌ |
| **Pillar** | ✅ logo.png (NOVÉ — wordmark v navy) | ✅ logo-white.png | ❌ |
| **Sunsurf** | ✅ logo.svg | ✅ logo-white.svg | ✅ |
| **Aiko Solar** | ✅ logo.svg (NOVÉ — wordmark v navy) | ✅ logo-white.svg | ✅ |
| **Ecosol** | ✅ logo.png (NOVÉ — barevné) | (stejné — barevné) | ❌ |
| **Solar SK** | ✅ logo.png | (existuje) | ❌ |

## ⚠️ Důležité poznámky

### Pillar a Aiko logo úpravy

Originální loga obou těchto firem mají **bílý wordmark** (navrženo pro tmavá pozadí). Pro Northsun web s **bílým pozadím** v Partners sekci jsem vytvořil **upravené verze**:

- **Pillar:** Bílý wordmark nahrazen navy (#030057). Žlutá ikona zachována.
- **Aiko Solar:** Bílý wordmark v SVG nahrazen navy. Oranžový čtvereček ikony zachován.

Tím jsou viditelné a ladí s tvojí brand barvou.

### Pokud se loga budou ukazovat v "trust strip" v hero (na navy pozadí)

V tom případě použij **`logo-white.*`** verze (originální bílé).

## Použití v kódu

```tsx
// Příklad: Partners grid sekce na světlém pozadí
const partners = [
  {
    name: "PanelClaw",
    logo: "/images/partners/panelclaw/logo.png",
    country: "USA · Mounting systémy",
    description: "..."
  },
  {
    name: "Pillar",
    logo: "/images/partners/pillar/logo.png",
    country: "Ukrajina · Solární parky, carporty",
    description: "..."
  },
  {
    name: "Sunsurf",
    logo: "/images/partners/sunsurf/logo.svg",
    country: "Švédsko · Floating PV a piling-free",
    description: "..."
  },
  {
    name: "Aiko Solar",
    logo: "/images/partners/aikosolar/logo.svg",
    country: "Čína / EU · Solární panely",
    description: "..."
  },
  {
    name: "Ecosol",
    logo: "/images/partners/ecosol/logo.png",
    country: "Norsko · Instalace",
    description: "..."
  },
  {
    name: "Solar SK",
    logo: "/images/partners/solarsk/logo.png",
    country: "Ukrajina · Carport mounting",
    description: "..."
  },
];
```

## Doporučení pro zobrazení v gridu

Aby loga vypadala konzistentně přes všechny karty:

```tsx
<div className="h-16 flex items-center justify-center">
  <Image
    src={partner.logo}
    alt={`${partner.name} logo`}
    width={160}
    height={40}
    className="max-h-12 w-auto object-contain"
  />
</div>
```

Loga mají různé poměry stran (Aiko je téměř čtvercové, Pillar je široké), takže `max-h-12 w-auto object-contain` zajistí, že **výška je konzistentní** a loga se proporčně škálují.
