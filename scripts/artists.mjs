import mongodb from 'mongodb';

const { ObjectID } = mongodb;

export default [
	{
		_id: ObjectID('5e4af952a9f9ff1d7c2f0585'),
		name: 'Asap Rocky',
		photo: 'https://www.gstatic.com/tv/thumb/persons/673344/673344_v9_bb.jpg',
		isHeadliner: true,
		youtube: 'https://www.youtube.com/watch?v=Kbj2Zss-5GY',
		festIDs: [ObjectID('5e4af194a9f9ff1d7c2f056c')]
	},
	{
		_id: ObjectID('5e4af95ba9f9ff1d7c2f0586'),
		name: '21 Pilots',
		photo:
			'https://atlasweekend.com/storage/uploads/poster/G8KFlQR2YiU1S9EbVGdIR2qwVftUY0CvnbByjZOQ.png',
		isHeadliner: true,
		youtube: 'https://www.youtube.com/watch?v=gGdGFtwCNBE&list=RDgGdGFtwCNBE',
		festIDs: [
			ObjectID('5e4af194a9f9ff1d7c2f056c'),
			ObjectID('5e4af1b1a9f9ff1d7c2f0572')
		]
	},
	{
		_id: ObjectID('5e4af964a9f9ff1d7c2f0587'),
		name: 'Placebo',
		photo:
			'https://md-eksperiment.org/eksperiment-assets/images/events/5479be0f-62b9-4ae7-8471-1ae2d80147b1.jpeg',
		isHeadliner: true,
		youtube: 'https://www.youtube.com/watch?v=gGdGFtwCNBE&list=RDgGdGFtwCNBE',
		festIDs: [
			ObjectID('5e4af194a9f9ff1d7c2f056c'),
			ObjectID('5e4af1b1a9f9ff1d7c2f0572')
		]
	},
	{
		_id: ObjectID('5e4af96ca9f9ff1d7c2f0588'),
		name: 'Sum 41',
		photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/No_foto.svg',
		isHeadliner: true,
		youtube: 'https://www.youtube.com/watch?v=gGdGFtwCNBE&list=RDgGdGFtwCNBE',
		festIDs: [ObjectID('5e4af1a0a9f9ff1d7c2f056f')]
	},
	{
		_id: ObjectID('5e4af973a9f9ff1d7c2f0589'),
		name: 'Test Artist 2',
		photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/No_foto.svg',
		isHeadliner: false,
		youtube: 'https://www.youtube.com/watch?v=gGdGFtwCNBE&list=RDgGdGFtwCNBE',
		festIDs: []
	},
	{
		_id: ObjectID('5e4af979a9f9ff1d7c2f058a'),
		name: 'Test Artist',
		photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/No_foto.svg',
		isHeadliner: false,
		youtube: 'https://www.youtube.com/watch?v=gGdGFtwCNBE&list=RDgGdGFtwCNBE',
		festIDs: []
	},
	{
		_id: ObjectID('5e4af980a9f9ff1d7c2f058b'),
		name: 'Test Artist 3',
		photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/No_foto.svg',
		isHeadliner: false,
		youtube: 'https://www.youtube.com/watch?v=gGdGFtwCNBE&list=RDgGdGFtwCNBE',
		festIDs: [
			ObjectID('5e4af1e5a9f9ff1d7c2f0584'),
			ObjectID('5e4af194a9f9ff1d7c2f056c')
		]
	}
];
