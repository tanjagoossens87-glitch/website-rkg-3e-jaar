# Design system: godsdienst bij mevrouw Goossens

De oefenwebsite gebruikt een warme, rustige huisstijl: roomwit, zachtroze, beige, mosterd, roest en donkerbruin. De persoonlijke visuele referentie van de eigenaar bepaalt het palet. De referentie zelf hoort niet bij de openbare website.

## Kleuren en bestaande componenten

Gebruik de waarden uit `tokens.css`; `tokens.json` bevat dezelfde waarden als data. De bestaande componenten in `components/` blijven bruikbaar. Hun `ai-` klassen en tokennamen blijven behouden zodat de werking niet verandert.

- `bg` en `surface`: roomwitte pagina, kaarten en invoervelden.
- `surface-sunken`: zachtroze inleidingen en ondersteunende vlakken.
- `brand`: mosterd voor decoratie en voortgang, met `on-brand` als tekstkleur.
- `brand-text` en `primary`: donkere roest voor links, accenten en primaire knoppen. De roest is iets donkerder dan de decoratieve referentiekleur om tekst leesbaar te houden.
- `ink` en `forest`: donkerbruine tekst en koppen. `forest` is de bestaande tokennaam.
- `ink-muted`: bruine hulptekst.
- `line`: beige scheidingslijnen; `line-strong`: duidelijkere randen van velden en antwoordopties.
- `ai`, `ai-soft` en `ai-text`: bruine en mosterdkleurige accenten voor bestaande componenten.
- `success`, `danger`, `warning` en hun zachte vlakken: feedback. Toon altijd ook een woord en een symbool; kleur alleen volstaat niet.

De AI-barometerbeelden en `level-0` tot `level-3` bewaren hun eigen betekenis en kleuren. Ze bepalen niet de huisstijl van de oefenwebsite. Ook het oudere Arcadia-materiaal blijft beschikbaar voor de oorspronkelijke componentvoorbeelden; gebruik het niet als logo op de publieke website.

## Logo

`src/components/TeacherLogo.astro` bevat het woordlogo: twee kleine roestkleurige christelijke kruisjes met daartussen **mevrouw Goossens**. De kruisjes zijn eenvoudige vectorlijnen; de naam is gewone tekst en blijft scherp op elk scherm. Het geheel heeft één toegankelijke naam. De gemeenschappelijke layout toont het op de startpagina en alle oefenpagina’s. Gebruik voldoende vrije ruimte en laat het woordlogo niet afbreken.

## Leesbaarheid en bediening

Er zijn lichte en donkere tokens via `data-theme` op `html`; de website gebruikt standaard licht. Tekstcombinaties halen minimaal 4,5:1. Randen van velden en de toetsenbordfocus halen minimaal 3:1. Focus blijft een zichtbare ring van 2px met 2px afstand. Zet `ai-root` op `body`. Respecteer `prefers-reduced-motion`.

## Letters, ruimte en vorm

Figtree met Segoe UI als vervanger voor tekst en koppen; JetBrains Mono alleen voor prompts. Koppen zijn stevig, lopende tekst rustig. Gebruik de bestaande typografische stijlen en ruimtetokens. Kaarten en invoervelden behouden afgeronde hoeken; de oefeninleiding krijgt een zacht, ongelijk afgerond roze vlak. Houd de inhoud binnen `content-max` en laat kolommen op smalle schermen onder elkaar lopen.

## Gebruiken in Astro

Laad `tokens.css` en `components/bundle.css` één keer in de layout. Gebruik `TeacherLogo` voor het persoonlijke logo. Bestaande componenten zijn gewone HTML en hebben geen extra framework nodig. `components/bundle.js` verzorgt waar nodig het bestaande gedrag via data-attributen. De oefeningen mogen hun eigen interactie en feedback behouden.
