import path from 'path';
import fs from 'fs';
import React from 'react';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import dotenv from 'dotenv';
import App from '../src/App';
dotenv.config();

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req: Request, res: Response) => {
	const app = ReactDOMServer.renderToString(<App />);

	const indexFile = path.resolve('./build/index.html');
	fs.readFile(indexFile, 'utf8', (err, data) => {
		if (err) {
			console.log(err);
			return res.status(500).send('Error');
		}

		return res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${app}</div>`,
			),
		);
	});
});

app.use(express.static('./build'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
