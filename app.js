import fs from 'fs';
import fetch from 'node-fetch';
import 'dotenv/config';

const OPENAI_API_KEY = process.env.API_KEY;

function readArticleFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

async function processArticleWithAI(articleContent) {
	const prompt = `Zapisz artykuł w formacie HTML z odpowiednimi tagami, ale nie dołączaj tagów <html>, <head> ani <body>. Kod HTML powinien zawierać tylko zawartość, którą można bezpośrednio wstawić między <body> i </body>. Popraw błędy w tekście. Miejsca na grafiki oznacz tagiem <img src="image_placeholder.jpg" alt="[podaj prompt dla obrazu]"> i dodaj podpisy pod grafikami w <figcaption>.`;

	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: 'You are a helpful assistant.' },
					{ role: 'user', content: `${prompt}\n\nArtykuł:\n${articleContent}` },
				],
				max_tokens: 1500,
				temperature: 0.5,
			}),
		});

		const data = await response.json();

		if (data.choices && data.choices.length > 0) {
			return data.choices[0].message.content;
		} else {
			console.error('Odpowiedź API nie zawiera oczekiwanego formatu:', data);
			return null;
		}
	} catch (error) {
		console.error('Błąd podczas przetwarzania artykułu:', error);
	}
}

function saveHTMLFile(content, filePath) {
	fs.writeFile(filePath, content, (err) => {
		if (err) console.error('Błąd przy zapisywaniu pliku:', err);
		else console.log(`Plik zapisany jako ${filePath}`);
	});
}

async function main() {
	const articlePath = './article.txt'; // Ścieżka do pliku z artykułem
	const outputPath = './artykul.html'; // Ścieżka do pliku wyjściowego

	try {
		const articleContent = await readArticleFile(articlePath);
		const htmlContent = await processArticleWithAI(articleContent);

		if (htmlContent) {
			saveHTMLFile(htmlContent, outputPath);
		} else {
			console.log('Nie udało się wygenerować kodu HTML.');
		}
	} catch (error) {
		console.error('Błąd w aplikacji:', error);
	}
}

main();