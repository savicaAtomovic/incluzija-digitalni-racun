# Kako Dodati Novu Opciju na Početnu Stranu

## Korak 1: Dodaj novi događaj u events.json

Otvori `src/assets/mock-data/events.json` i dodaj novi objekat na kraj niza:

```json
{
  "id": 5,
  "name": "Naziv nove opcije",
  "description": "Kratak opis",
  "image": "assets/multimedia/nova_opcija.png",
  "descriptionALB": "Emri i opsionit të ri",
  "eventItems": [
    {
      "id": 1,
      "orderNumber": 1,
      "description": "Tekst za prvi korak...",
      "image": "assets/multimedia/5/images/without-text/1.jpg",
      "sound": "assets/multimedia/5/sound/female/1.mp3",
      "soundMale": "assets/multimedia/5/sound/male/1.mp3",
      "soundAlb": "assets/multimedia/5/sound/albfemale/1.mp3",
      "descriptionAlb": "Teksti për hapin e parë..."
    }
    // Dodaj više koraka po potrebi
  ]
}
```

## Korak 2: Kreiraj strukturu foldera

```bash
mkdir -p src/assets/multimedia/5/images/without-text
mkdir -p src/assets/multimedia/5/sound/female
mkdir -p src/assets/multimedia/5/sound/male
mkdir -p src/assets/multimedia/5/sound/albfemale
```

## Korak 3: Dodaj slike

Kopiraj slike u odgovarajući folder:

```bash
cp slika1.jpg src/assets/multimedia/5/images/without-text/1.jpg
cp slika2.jpg src/assets/multimedia/5/images/without-text/2.jpg
# itd...
```

## Korak 4: Dodaj audio fajlove

Kopiraj audio fajlove:

```bash
# Ženski glas
cp audio1_female.mp3 src/assets/multimedia/5/sound/female/1.mp3

# Muški glas
cp audio1_male.mp3 src/assets/multimedia/5/sound/male/1.mp3

# Albanski glas
cp audio1_alb.mp3 src/assets/multimedia/5/sound/albfemale/1.mp3
```

## Korak 5: Dodaj sliku za početnu stranu (opciono)

Ako želiš posebnu sliku za početnu stranu:

```bash
cp nova_opcija.png src/assets/multimedia/nova_opcija.png
```

## Gotovo!

Aplikacija će automatski učitati novu opciju na početnu stranu.
Nije potrebno mijenjati kod - sve se učitava dinamički iz `events.json`.

## Napomene

- **ID mora biti jedinstven** - ne smije biti isti kao postojeći
- **orderNumber** određuje redoslijed koraka
- **Imena fajlova** moraju odgovarati onome što je navedeno u JSON-u
- **Sve putanje** moraju počinjati sa `assets/multimedia/`
