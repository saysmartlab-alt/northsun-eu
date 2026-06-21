# Northsun web — struktura fotek a obrázků

Tato složka obsahuje všechny fotky, loga a vizuální materiály pro web Northsun.

## Struktura

```
public/images/
├── hero/                    # Hero fotky pro homepage
│   └── README.md
├── projects/                # Reference projekty
│   ├── walraven/           # Walraven NL (komerční střecha + fasáda)
│   ├── solar-park-eu/      # Solar park jižní Evropa (sunset fotky)
│   ├── solar-park-norway/  # Norsko solar park (z prezentace)
│   ├── solar-roof-norway/  # Norsko střecha/fasáda (s YouTube videem)
│   └── floating-solar/     # Plovoucí elektrárna (hero kandidát)
├── partners/                # Loga a info o partnerech
│   ├── panelclaw/          # US, certifikovaný partner
│   ├── sunsurf/            # SE, floating + landfill
│   └── solarsk/            # UA, carporty
├── certifications/          # PanelClaw certifikát + badges
└── og/                      # Open Graph fotky pro social sharing
```

V každé složce je vlastní README s konkrétními instrukcemi.

## Konvence názvů souborů

### Pro reference projekty
- `cover.jpg` — hlavní fotka karty (povinné)
- `gallery-*.jpg` — další fotky pro detail (volitelné)
- `thumbnail.jpg` — náhled pro listing (volitelné)
- `video-thumbnail.jpg` — náhled video embedu (volitelné)

### Pro partnery
- `logo.svg` (preferováno) nebo `logo.png`
- `logo-white.svg` — pro tmavá pozadí
- `logo-dark.svg` — pro světlá pozadí

### Pro certifikace
- Popisné názvy: `panelclaw-certificate.png`, `panelclaw-badge.svg`

### Pro OG
- `og-default.jpg` — default 1200x630px
- `og-{stranka}.jpg` — specifické pro jednotlivé stránky

## Doporučená rozlišení

| Účel | Rozlišení | Aspect ratio | Formát |
|------|-----------|--------------|--------|
| Hero background | 2400x1600px | 3:2 | JPG/WebP, 85% |
| Cover (reference) | 1600x1067px | 3:2 | JPG/WebP, 85% |
| Gallery | 1600x1067px | 3:2 | JPG/WebP, 85% |
| Thumbnail | 800x500px | 16:10 | JPG/WebP, 80% |
| OG image | 1200x630px | 1.9:1 | JPG, 85%, do 300KB |
| Logo | vektor SVG | n/a | SVG (PNG fallback 400x200) |

## Optimalizace

Před nahráním fotek na web:

1. **Zmenši rozlišení** podle tabulky výše (nepoužívej 5000px fotky pro 800px náhled)
2. **Konvertuj do WebP** (volitelně) — menší soubory, lepší kvalita
3. **Komprese** — pro JPG kvalita 80-85% (rozdíl proti 100% je nevidět)
4. **Strip metadata** — odstraň EXIF (GPS, kamera info)

### Nástroje
- **Squoosh.app** (online, zdarma) — komprese + WebP konverze
- **TinyPNG.com** (online, zdarma) — komprese
- **Affinity Designer** — kompletní úpravy
- **Next.js automaticky** — `next/image` optimalizuje při buildu

## Použití v kódu

Vždy přes `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/images/projects/floating-solar/cover.jpg"
  alt="Plovoucí solární elektrárna"
  width={1600}
  height={1067}
  priority  // jen pro above-the-fold (hero)
  className="object-cover"
/>
```

## Status materiálů k 21.6.2026

| Kategorie | Status | Akce |
|-----------|--------|------|
| Hero (floating-solar) | ✅ k dispozici | Vložit, ověřit autorství |
| Walraven | ✅ k dispozici (koláž) | Vyextrahovat jednotlivé fotky |
| Solar park jižní Evropa | ✅ k dispozici (HEIC → JPG) | Vybrat nejlepší fotku |
| Solar park Norsko | ⚠️ z PDF | Vyextrahovat z prezentace |
| Solar roof Norsko | ⚠️ z PDF | Vyextrahovat + YouTube embed |
| PanelClaw logo | ✅ k dispozici | Případně převést na SVG |
| PanelClaw certifikát | ✅ k dispozici | Připravit modal s velkou verzí |
| Sunsurf logo | ❌ chybí | Získat od Lukáše |
| Solar SK logo | ✅ k dispozici | Případně převést na SVG |
| OG default | ❌ vytvořit | V Affinity Designer 1200x630 |

## ⚠️ K ověření s Lukášem

Před zveřejněním webu ověř s Lukášem K. (nebo Bílkem):

1. **Walraven** — vlastní nebo s partnerem? Můžeme zveřejnit jméno klienta?
2. **Floating solar** — vlastní Northsun nebo Sunsurf realizace?
3. **Solar park jižní Evropa** — lokace, rok, výkon, vlastní?
4. **Solar park Norsko** — lokace, rok, výkon, klient?
5. **Solar roof Norsko** — lokace, klient, můžeme embedovat YouTube?
6. **Sunsurf** — máme oficiální logo? Můžeme prezentovat jako partnera?

## Pravidlo transparentnosti

**Vlastní realizace** = badge "Vlastní realizace" (success green)
**Partnerské** = badge "Ve spolupráci s [partner]" (muted gray)

Nikdy nezamlčet partnerství, vždy uvést.
