# Struktura Multimedia Foldera

Ovaj dokument objašnjava kako organizovati slike i audio fajlove za aplikaciju.

## Struktura Foldera

```
src/assets/multimedia/
├── 1/                          # Kako da otvorim račun
│   ├── images/
│   │   └── without-text/
│   │       ├── 1.jpg          # Slika za korak 1
│   │       ├── 2.jpg          # Slika za korak 2
│   │       ├── 3.jpg          # Slika za korak 3
│   │       ├── 4.jpg          # Slika za korak 4
│   │       ├── 5.jpg          # Slika za korak 5
│   │       ├── 6.jpg          # Slika za korak 6
│   │       └── 7.jpg          # Slika za korak 7
│   └── sound/
│       ├── female/
│       │   ├── 1.mp3          # Ženski glas - korak 1
│       │   ├── 2.mp3          # Ženski glas - korak 2
│       │   ├── 3.mp3          # Ženski glas - korak 3
│       │   ├── 4.mp3          # Ženski glas - korak 4
│       │   ├── 5.mp3          # Ženski glas - korak 5
│       │   ├── 6.mp3          # Ženski glas - korak 6
│       │   └── 7.mp3          # Ženski glas - korak 7
│       ├── male/
│       │   ├── 1.mp3          # Muški glas - korak 1
│       │   ├── 2.mp3          # Muški glas - korak 2
│       │   ├── 3.mp3          # Muški glas - korak 3
│       │   ├── 4.mp3          # Muški glas - korak 4
│       │   ├── 5.mp3          # Muški glas - korak 5
│       │   ├── 6.mp3          # Muški glas - korak 6
│       │   └── 7.mp3          # Muški glas - korak 7
│       └── albfemale/
│           ├── 1.mp3          # Albanski ženski glas - korak 1
│           ├── 2.mp3          # Albanski ženski glas - korak 2
│           ├── 3.mp3          # Albanski ženski glas - korak 3
│           ├── 4.mp3          # Albanski ženski glas - korak 4
│           ├── 5.mp3          # Albanski ženski glas - korak 5
│           ├── 6.mp3          # Albanski ženski glas - korak 6
│           └── 7.mp3          # Albanski ženski glas - korak 7
│
├── 2/                          # Kako da platim sa računa
│   ├── images/
│   │   └── without-text/
│   │       ├── 1.jpg          # Slika za korak 1
│   │       ├── 2.jpg          # Slika za korak 2
│   │       ├── 3.jpg          # Slika za korak 3
│   │       ├── 4.jpg          # Slika za korak 4
│   │       ├── 5.jpg          # Slika za korak 5
│   │       └── 6.jpg          # Slika za korak 6
│   └── sound/
│       ├── female/            # 6 MP3 fajlova
│       ├── male/              # 6 MP3 fajlova
│       └── albfemale/         # 6 MP3 fajlova
│
├── 3/                          # Kako da napišem prigovor
│   ├── images/
│   │   └── without-text/
│   │       ├── 1.jpg          # Slika za korak 1
│   │       ├── 2.jpg          # Slika za korak 2
│   │       ├── 3.jpg          # Slika za korak 3
│   │       ├── 4.jpg          # Slika za korak 4
│   │       ├── 5.jpg          # Slika za korak 5
│       │       └── 6.jpg          # Slika za korak 6
│   └── sound/
│       ├── female/            # 6 MP3 fajlova
│       ├── male/              # 6 MP3 fajlova
│       └── albfemale/         # 6 MP3 fajlova
│
└── 4/                          # Kako da provjerim stanje
    ├── images/
    │   └── without-text/
    │       ├── 1.jpg          # Slika za korak 1
    │       ├── 2.jpg          # Slika za korak 2
    │       ├── 3.jpg          # Slika za korak 3
    │       ├── 4.jpg          # Slika za korak 4
    │       ├── 5.jpg          # Slika za korak 5
    │       └── 6.jpg          # Slika za korak 6
    └── sound/
        ├── female/            # 6 MP3 fajlova
        ├── male/              # 6 MP3 fajlova
        └── albfemale/         # 6 MP3 fajlova
```

## Kako Dodati Novi Sadržaj

### 1. Dodavanje Slika

Za svaki korak u `events.json`, dodajte odgovarajuću sliku:

```bash
# Primjer za opciju 1 (Otvaranje računa), korak 3
cp vasa-slika.jpg src/assets/multimedia/1/images/without-text/3.jpg
```

### 2. Dodavanje Audio Fajlova

Za svaki korak, dodajte 3 audio fajla (ženski glas, muški glas, albanski):

```bash
# Primjer za opciju 1, korak 3
cp zenski-glas.mp3 src/assets/multimedia/1/sound/female/3.mp3
cp muski-glas.mp3 src/assets/multimedia/1/sound/male/3.mp3
cp albanski-glas.mp3 src/assets/multimedia/1/sound/albfemale/3.mp3
```

## Sadržaj po Opcijama

### Opcija 1: Kako da otvorim račun (7 koraka)
1. Dobrodošli
2. Priprema dokumenata
3. Posjet banci
4. Razgovor sa službenikom
5. Potpisivanje ugovora
6. Dobijanje kartice
7. Aktivacija računa

### Opcija 2: Kako da platim sa računa (6 koraka)
1. Uvod u plaćanje
2. Plaćanje u banci
3. Plaćanje na bankomatu
4. Plaćanje preko interneta
5. Važne napomene
6. Čuvanje potvrde

### Opcija 3: Kako da napišem prigovor (6 koraka)
1. Vaša prava
2. Razgovor sa bankom
3. Pisanje prigovora
4. Prilaganje dokaza
5. Slanje prigovora
6. Rok za odgovor

### Opcija 4: Kako da provjerim stanje (6 koraka)
1. Važnost provjere
2. Provjera na bankomatu
3. Provjera u banci
4. Provjera preko telefona
5. Provjera preko interneta
6. Savjeti

## Napomene

- Sve slike treba da budu u JPG formatu
- Svi audio fajlovi treba da budu u MP3 formatu
- Imena fajlova moraju biti tačno kao što je navedeno (1.jpg, 2.jpg, itd.)
- Folderi su već kreirani i spremni za dodavanje fajlova
