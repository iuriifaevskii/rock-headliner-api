import mongodb from 'mongodb';

import { mongoClientURL } from '../config.mjs';

import artists from './artists.mjs';
import fests from './fests.mjs';

const { MongoClient } = mongodb;

(async () => {
	try {
		const client = await MongoClient.connect(process.env.MONGO_CLIENT_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const db = client.db('rock-headliner-db');
		const collections = await db.listCollections().toArray();
		const collectionNames = collections.map(item => item.name);
		const requiredCollections = [
			{ name: 'fests', data: fests },
			{ name: 'artists', data: artists }
		];
		requiredCollections.forEach(async reqCollection => {
			if (collectionNames.some(col => col === reqCollection.name)) {
				await db.collection(reqCollection.name).drop();
			} else {
				await db.createCollection(reqCollection.name);
			}
			await db.collection(reqCollection.name).insertMany(reqCollection.data);
		});
		console.log('collections created and inserted successfully!');
		process.exit(1);
	} catch (e) {
		console.log('can not connect to the db:', e);
		client.close();
		process.exit(1);
	}
})();
