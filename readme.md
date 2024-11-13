# AI Article Formatter

Aplikacja napisana w JavaScript wykorzystująca OpenAI API do formatowania artykułów. Pobiera tekst z pliku, przetwarza go z pomocą modelu GPT, generując HTML bez nagłówków `<html>`, `<head>` ani `<body>`. Używa znaczników HTML do strukturyzacji treści i dodaje oznaczenia do grafik.

## Funkcje aplikacji

1. **Odczyt artykułu**: Aplikacja odczytuje plik tekstowy `article.txt`, zawierający artykuł, który ma być sformatowany.
2. **Przetwarzanie artykułu z użyciem AI**: Treść artykułu jest przesyłana do OpenAI, aby wygenerować HTML z odpowiednimi tagami strukturalnymi.
3. **Zapis HTML**: Wygenerowany kod HTML zapisywany jest w pliku `artykul.html`.

## Wymagania

- Node.js
- Konto w OpenAI oraz klucz API

## Instrukcja uruchomienia

### 1. Klonowanie repozytorium

Sklonuj repozytorium do swojego lokalnego środowiska.

```bash
git clone https://github.com/wszczepanskii/zadanie_rekrutacyjne
cd zadanie_rekrutacyjne
```

### 2. Instalacja zależności

```bash
npm init
npm install dot-env node-fetch
```

### 3. Utwórz plik .env

Utwórz plik .env w głównym katalogu projektu i dodaj swój klucz API OpenAI:

```bash
API_KEY=your_openai_api_key
```

### 4. Przygotuj plik z artykułem

Upewnij się, że plik z artykułem (article.txt) znajduje się w tym samym katalogu co skrypt. Ten plik powinien zawierać tekst artykułu do przetworzenia.

### 5. Uruchom aplikację

```bash
node app.js
```
