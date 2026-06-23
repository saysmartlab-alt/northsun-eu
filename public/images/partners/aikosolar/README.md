# Aiko Solar — partner

Čínský/EU výrobce solárních panelů. Klíčový dodavatel pro projekty Northsun.

## Soubory

### `logo.svg` (default — pro světlá pozadí)
- Wordmark v navy (#030057), oranžová ikona zachovaná
- **Vektor** — škálovatelné, ostré v každém rozlišení
- **Použití:** Sekce Partneři na bílém pozadí

### `logo-white.svg` (originál pro tmavá pozadí)
- Bílý wordmark + oranžová ikona
- **Použití:** Footer, dark sections

### `logo.png` + `logo-white.png` (PNG fallbacky)
- 400px wide PNG verze
- **Použití:** Pro emaily nebo prostředí bez SVG podpory

## Použití v kódu

```tsx
// V Partners sekci (bílé pozadí) — SVG je preferované
<Image
  src="/images/partners/aikosolar/logo.svg"
  alt="Aiko Solar — dodavatel solárních panelů"
  width={200}
  height={67}
/>

// Ve footeru (navy pozadí)
<Image
  src="/images/partners/aikosolar/logo-white.svg"
  alt="Aiko Solar"
  width={150}
  height={50}
/>
```

## Informace o partnerovi

- **Firma:** Aiko Solar
- **Země:** Čína (s EU distribucí)
- **Specializace:** Výroba a distribuce solárních panelů
- **Vztah k Northsun:** Klíčový partner pro distribuci a naceňování zakázek
- **Web:** https://aikosolar.com

## ⚠️ Pozn. k formulaci

NEPOUŽÍVAT "výhradní" / "exkluzivní". Místo toho:
- "Klíčový partner pro distribuci"
- "Strategický dodavatel panelů"
