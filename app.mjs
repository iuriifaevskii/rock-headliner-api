import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debugLib from 'debug';
import http from 'http';
import mongodb from 'mongodb';

import './config.mjs';

import indexRouter from './routes/index.mjs';
import artistRouter from './routes/artist.mjs';
import festRouter from './routes/fest.mjs';

const debug = debugLib('rock-headliner-api:server');
const { MongoClient } = mongodb;

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const port = normalizePort(process.env.PORT || '5000');

if (process.env.NODE_ENV !== 'production') {
	app.use(logger('dev'));
}

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/api/artist', artistRouter);
app.use('/api/fest', festRouter);

app.set('port', port);
const server = http.createServer(app);

(async () => {
	try {
		const client = await MongoClient.connect(process.env.MONGO_CLIENT_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		app.locals.fests = client.db('rock-headliner-db').collection('fests');
		app.locals.artists = client.db('rock-headliner-db').collection('artists');
	} catch (e) {
		console.log('can not connect to the db:', e);
		client.close();
		process.exit(1);
	}

	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
})();

function normalizePort(val) {
	const port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
		default:
			throw error;
	}
}

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
