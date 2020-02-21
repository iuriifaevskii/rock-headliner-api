import mongodb from 'mongodb';

const { ObjectID } = mongodb;

export default [
	{
		_id: ObjectID('5e4af194a9f9ff1d7c2f056c'),
		name: 'Atlas Weekend',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		startDate: '08/08/2020',
		endDate: '08/12/2020',
		scale: parseInt('7'),
		background: '#0000ff',
		site: 'https://atlasweekend.com',
		ticket: 'https://atlasweekend.com/tickets',
		banner:
			'https://mesta.com.ua/wp-content/uploads/2020/01/AtlasWeekend2020Artwork.jpg',
		artistIDs: [
			ObjectID('5e4af952a9f9ff1d7c2f0585'),
			ObjectID('5e4af95ba9f9ff1d7c2f0586'),
			ObjectID('5e4af964a9f9ff1d7c2f0587'),
			ObjectID('5e4af980a9f9ff1d7c2f058b')
		],
		socialNetworks: [
			{
				_id: ObjectID('5e4af194a9f9ff1d7c2f056a'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af194a9f9ff1d7c2f056b'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1a0a9f9ff1d7c2f056f'),
		name: 'Upark Festival',
		description: 'description',
		startDate: '08/21/2020',
		endDate: '08/23/2020',
		scale: parseInt('9'),
		background: '#ff0000',
		site: 'https://www.uparkfestival.com',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://allfest.ru/sites/default/files/styles/afisha_750/public/upark_2019.jpg?itok=sT9ZP0gC',
		artistIDs: [ObjectID('5e4af96ca9f9ff1d7c2f0588')],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1a0a9f9ff1d7c2f056d'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1a0a9f9ff1d7c2f056e'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1b1a9f9ff1d7c2f0572'),
		name: "Open'er Festival",
		description: 'description',
		startDate: '08/01/2020',
		endDate: '08/04/2020',
		scale: parseInt('10'),
		background: '#ffa500fa',
		site: 'https://opener.pl/en',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [
			ObjectID('5e4af95ba9f9ff1d7c2f0586'),
			ObjectID('5e4af964a9f9ff1d7c2f0587')
		],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1b1a9f9ff1d7c2f0570'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1b1a9f9ff1d7c2f0571'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1b9a9f9ff1d7c2f0575'),
		name: 'Mad Cool Festival',
		description: 'description',
		startDate: '08/08/2020',
		endDate: '08/11/2020',
		scale: parseInt('11'),
		background: '#ff590afa',
		site: 'https://madcoolfestival.es/en',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1b9a9f9ff1d7c2f0573'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1b9a9f9ff1d7c2f0574'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1c3a9f9ff1d7c2f0578'),
		name: 'Test Festival',
		description: 'description',
		startDate: '08/30/2020',
		endDate: '09/02/2020',
		scale: parseInt('8'),
		background: '#38a500fa',
		site: 'http://www.javascriptkit.com/',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1c3a9f9ff1d7c2f0576'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1c3a9f9ff1d7c2f0577'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1cba9f9ff1d7c2f057b'),
		name: 'Test Festival 2',
		description: 'description 2',
		startDate: '08/31/2020',
		endDate: '09/03/2020',
		scale: parseInt('8'),
		background: '#b100bdfa',
		site: 'http://www.javascriptkit.com/',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1cba9f9ff1d7c2f0579'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1cba9f9ff1d7c2f057a'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1d2a9f9ff1d7c2f057e'),
		name: 'Test Festival 3',
		description: 'description 3',
		startDate: '08/31/2020',
		endDate: '09/01/2020',
		scale: parseInt('8'),
		background: '#ff4e4efa',
		site: 'http://www.javascriptkit.com/',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1d2a9f9ff1d7c2f057c'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1d2a9f9ff1d7c2f057d'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1d9a9f9ff1d7c2f0581'),
		name: 'Test Festival 4',
		description: 'description 4',
		startDate: '09/01/2020',
		endDate: '09/20/2020',
		scale: parseInt('8'),
		background: '#026f00fa',
		site: 'http://www.javascriptkit.com/',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1d9a9f9ff1d7c2f057f'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1d9a9f9ff1d7c2f0580'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	},
	{
		_id: ObjectID('5e4af1e5a9f9ff1d7c2f0584'),
		name: 'Test Festival 5',
		description: 'description 5',
		startDate: '10/01/2020',
		endDate: '10/20/2020',
		scale: parseInt('7'),
		background: '#3000f0',
		site: 'http://www.javascriptkit.com/',
		ticket: 'http://www.javascriptkit.com/',
		banner:
			'https://www.billboard.com/files/styles/article_main_image/public/media/ultra-europe-photo-by-Julien-Duval-2017-billboard-1548.jpg',
		artistIDs: [ObjectID('5e4af980a9f9ff1d7c2f058b')],
		socialNetworks: [
			{
				_id: ObjectID('5e4af1e5a9f9ff1d7c2f0582'),
				name: 'Facebook',
				link: 'https://wwwFacebook'
			},
			{
				_id: ObjectID('5e4af1e5a9f9ff1d7c2f0583'),
				name: 'Instagram',
				link: 'https://wwwInstagram'
			}
		]
	}
];
