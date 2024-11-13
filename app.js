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