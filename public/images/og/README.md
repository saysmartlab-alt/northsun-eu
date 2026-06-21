# Open Graph fotky (sdílení na sociálních sítích)

Fotky, které se zobrazí při sdílení odkazu na webu (LinkedIn, Facebook, WhatsApp, Slack atd.).

## Soubory (vytvořit)

### `og-default.jpg` (povinné)
- **Použití:** Default OG image pro celý web (homepage a stránky bez vlastní)
- **Rozlišení:** **1200x630px** (Facebook/LinkedIn standard)
- **Obsah:** Hero fotka (floating-solar.jpg) + Northsun logo + tagline overlay
- **Formát:** JPG, kvalita 85%, do 300 KB

### `og-homepage.jpg` (volitelné)
- **Použití:** Homepage specifický OG (pokud chceš jiný než default)

### `og-projects.jpg` (volitelné)
- **Použití:** Stránka "Reference" / "Naše projekty"

### `og-contact.jpg` (volitelné)
- **Použití:** Stránka "Kontakt"

## Šablona pro tvorbu OG

V Affinity Designer:
1. Nový dokument 1200x630px
2. Hero fotka jako background (s tmavým overlay 40-60%)
3. Northsun logo vlevo nahoře (200px šířka)
4. Hlavní text na střed: "Premium solární EPC napříč severní Evropou"
5. Tagline pod tím: "Neděláme nejlevněji, děláme nejlépe."
6. Export jako JPG (sRGB barevný prostor)

## Použití v kódu

V `app/[locale]/layout.tsx`:

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: "Northsun — Premium solární EPC",
    description: "...",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Northsun — Premium solární EPC napříč severní Evropou",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og/og-default.jpg"],
  },
};
```

## Test

Po nasazení otestuj:
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **OpenGraph.xyz:** https://www.opengraph.xyz/

Při změně OG image vyčisti cache v jednotlivých nástrojích.
