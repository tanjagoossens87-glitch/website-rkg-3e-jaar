# Godsdienst voor het derde middelbaar

## Doel

Leerlingen maken interactieve godsdienstoefeningen via één vaste website. Na het indienen ziet de leerkracht de score meteen in een klasoverzicht, zodat ze kan opvolgen wie de leerstof begrijpt.

## Doelgroep

Leerlingen van het derde middelbaar en hun godsdienstleerkracht. Leerlingen vinden de oefeningen via hun klasteam in Microsoft Teams.

## Eerste versie

- Start met de bestaande [oefening over imago en authenticiteit](https://copper-terry-48.tiiny.site/). Behoud de eigen interactieve vorm en de directe feedback bij antwoorden.
- Leerlingen melden zich aan met het schoolaccount dat ze ook voor Teams gebruiken. Ze dienen hun oefening in en zien een bevestiging met hun score.
- De leerkracht ziet ingediende scores per leerling en per klas in een afgeschermd overzicht en kan ze downloaden voor het jaarlijkse Teams-archief.
- Nieuwe oefeningen worden samen met Codex gemaakt en gepubliceerd. Elke oefening krijgt een eigen link om te delen in Teams.

## Nog niet

- Oefeningen die meetellen voor het rapport en export naar Skore in Smartschool.
- Een scherm waarmee de leerkracht zelf oefeningen toevoegt of aanpast.

## Platform

Een website die leerlingen in hun browser openen vanuit Teams. Zo kan elke oefening haar eigen vorm en feedback behouden.

## Frameworks en bouwstenen

Astro bouwt de website en geeft elke oefening een eigen pagina. JavaScript verzorgt de interactie en de feedback. Voor aanmelding is de Microsoft-omgeving van de school het uitgangspunt. De school moet nog bevestigen of ze de website daarin kan registreren en welke dienst voor de scores gebruikt mag worden.

## Opslag

Een door de school goedgekeurde, afgeschermde dienst bewaart per inzending wie indiende, voor welke klas en oefening, en welke score de leerling behaalde. Alleen bevoegde gebruikers krijgen toegang tot de resultaten. De Teams-map dient voor het jaararchief. Tijdens het ontwikkelen gebruiken we fictieve resultaten. Namen, echte scores en toegangsgegevens horen nooit in de projectbestanden of op openbare webpagina’s.

## Vormgeving

De website gebruikt het persoonlijke design system in `design-system/`: roomwit, roze, beige, mosterd, roest en donkerbruin, met het woordlogo ‘mevrouw Goossens’ tussen twee kleine kruisjes. Oefeningen behouden ruimte voor hun eigen interactieve vorm.

## Publicatie

GitHub Pages is de voorgestelde host voor de oefenpagina’s. Elke wijziging die in de hoofdbranch terechtkomt, gaat automatisch online via een publicatieworkflow. De beveiligde verwerking van leerlingenscores verloopt via de dienst die de school goedkeurt.
