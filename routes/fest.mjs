import express from 'express';
import validation from '../utils/validation.mjs';
import mongodb from 'mongodb';

const { ObjectID } = mongodb;

const router = express.Router();

/*
  Get all Fests
*/
router.get('/', async (req, res) => {
	try {
		return res.send({
			data: await req.app.locals.fests.find().toArray()
		});
	} catch (err) {
		return res.status(500).send({
			error: [
				{
					field: null,
					message: err.message
				}
			]
		});
	}
});

/*
  Show One Fest With Social Networks
*/
router.get('/:id', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'id',
				type: 'string'
			}
		];

		if (
			validation(requiredProps, {
				id: req.params.id
			}).length
		) {
			return res.status(400).send({
				error: validation(requiredProps, {
					id: req.params.id
				})
			});
		}
		return res.send({
			data: await req.app.locals.fests
				.find({
					_id: ObjectID(req.params.id)
				})
				.toArray()
		});
	} catch (err) {
		return res.status(500).send({
			error: [
				{
					field: null,
					message: err.message
				}
			]
		});
	}
});

/*
  Create Fest With Social Networks
*/
router.post('/', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'name',
				type: 'string'
			},
			{
				name: 'description',
				type: 'string'
			},
			{
				name: 'startDate',
				type: 'string'
			},
			{
				name: 'endDate',
				type: 'string'
			},
			{
				name: 'scale',
				type: 'number'
			},
			{
				name: 'background',
				type: 'string'
			},
			{
				name: 'site',
				type: 'string'
			},
			{
				name: 'ticket',
				type: 'string'
			},
			{
				name: 'banner',
				type: 'string'
			},
			{
				name: 'artistIDs',
				type: 'string'
			},
			{
				name: 'socialNetworks',
				type: 'object'
			}
		];

		if (!req.body) {
			return res.status(400).send({
				error: [
					{
						field: null,
						message: 'can not find the body'
					}
				]
			});
		}

		const validationErrorArray = validation(requiredProps, req.body);
		if (validationErrorArray.length) {
			return res.status(400).send({
				error: validationErrorArray
			});
		}

		const socialNetworksRequiredProps = [
			{
				name: 'name',
				type: 'string'
			},
			{
				name: 'link',
				type: 'string'
			}
		];
		if (!Array.isArray(req.body.socialNetworks)) {
			validationErrorArray.push(
				`prop socialNetworks has incorrect type ${typeof req.body
					.socialNetworks}, but it should be Array`
			);
			return res.status(400).send({
				error: validationErrorArray
			});
		}
		const socialNetWorksErrorArray = [];
		req.body.socialNetworks.forEach(socialNetworkItem => {
			socialNetWorksErrorArray.push(
				validation(socialNetworksRequiredProps, socialNetworkItem)
			);
		});
		if (socialNetWorksErrorArray.filter(arr => Boolean(arr.length)).length) {
			validationErrorArray.push({
				socialNetworks: socialNetWorksErrorArray
			});
			return res.status(400).send({
				error: validationErrorArray
			});
		}

		const passedArtistIds = req.body.artistIDs.replace(' ', '').split(',');
		let artists = [];
		if (passedArtistIds.filter(item => Boolean(item)).length) {
			artists = await req.app.locals.artists
				.find({
					_id: {
						$in: passedArtistIds.map(item => ObjectID(item))
					}
				})
				.toArray();
		}

		const name = req.body.name;
		const description = req.body.description;
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const scale = req.body.scale;
		const background = req.body.background;
		const site = req.body.site;
		const ticket = req.body.ticket;
		const banner = req.body.banner;
		const socialNetworks = req.body.socialNetworks.map(item => ({
			_id: new ObjectID(),
			name: item.name,
			link: item.link
		}));
		const artistIDs = artists.length ? artists.map(fest => fest._id) : [];

		const artistsCollection = req.app.locals.artists;
		const festsCollection = req.app.locals.fests;

		const fest = {
			name,
			description,
			startDate,
			endDate,
			scale,
			background,
			site,
			ticket,
			banner,
			artistIDs,
			socialNetworks
		};
		const result = await festsCollection.insertOne(fest);
		const festID = result.ops[0]._id;
		await artistsCollection.updateMany(
			{
				_id: {
					$in: artistIDs
				}
			},
			[
				{
					$set: {
						festIDs: {
							$concatArrays: ['$festIDs', [festID]]
						}
					}
				}
			]
		);
		return res.send({
			data: result.ops[0]
		});
	} catch (err) {
		return res.status(500).send({
			error: [
				{
					field: null,
					message: err.message
				}
			]
		});
	}
});

/*
  Update Fest with Social Networks And All Refs For Artists
*/
router.put('/:id', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'name',
				type: 'string'
			},
			{
				name: 'description',
				type: 'string'
			},
			{
				name: 'startDate',
				type: 'string'
			},
			{
				name: 'endDate',
				type: 'string'
			},
			{
				name: 'scale',
				type: 'number'
			},
			{
				name: 'background',
				type: 'string'
			},
			{
				name: 'site',
				type: 'string'
			},
			{
				name: 'ticket',
				type: 'string'
			},
			{
				name: 'banner',
				type: 'string'
			},
			{
				name: 'artistIDs',
				type: 'string'
			},
			{
				name: 'socialNetworks',
				type: 'object'
			},
			{
				name: 'id',
				type: 'string'
			}
		];

		if (!req.body) {
			return res.status(400).send({
				error: [
					{
						field: null,
						message: 'can not find the body'
					}
				]
			});
		}

		const validationErrorArray = validation(requiredProps, {
			id: req.params.id,
			...req.body
		});
		if (validationErrorArray.length) {
			return res.status(400).send({
				error: validationErrorArray
			});
		}

		const socialNetworksRequiredProps = [
			{
				name: 'name',
				type: 'string'
			},
			{
				name: 'link',
				type: 'string'
			}
		];
		if (!Array.isArray(req.body.socialNetworks)) {
			validationErrorArray.push(
				`prop socialNetworks has incorrect type ${typeof req.body
					.socialNetworks}, but it should be Array`
			);
			return res.status(400).send({
				error: validationErrorArray
			});
		}
		const socialNetWorksErrorArray = [];
		req.body.socialNetworks.forEach(socialNetworkItem => {
			socialNetWorksErrorArray.push(
				validation(socialNetworksRequiredProps, socialNetworkItem)
			);
		});
		if (socialNetWorksErrorArray.filter(arr => Boolean(arr.length)).length) {
			validationErrorArray.push({
				socialNetworks: socialNetWorksErrorArray
			});
			return res.status(400).send({
				error: validationErrorArray
			});
		}

		const passedArtistIds = req.body.artistIDs.replace(' ', '').split(',');
		let artists = [];
		if (passedArtistIds.filter(item => Boolean(item)).length) {
			artists = await req.app.locals.artists
				.find({
					_id: {
						$in: passedArtistIds.map(item => ObjectID(item))
					}
				})
				.toArray();
		}

		const festID = ObjectID(req.params.id);
		const name = req.body.name;
		const description = req.body.description;
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const scale = req.body.scale;
		const background = req.body.background;
		const site = req.body.site;
		const ticket = req.body.ticket;
		const banner = req.body.banner;
		const socialNetworks = req.body.socialNetworks.map(item => ({
			_id: new ObjectID(),
			name: item.name,
			link: item.link
		}));
		const artistIDs = artists.length ? artists.map(fest => fest._id) : [];

		const artistsCollection = req.app.locals.artists;
		const festsCollection = req.app.locals.fests;

		const fest = {
			name,
			description,
			startDate,
			endDate,
			scale,
			background,
			site,
			ticket,
			banner,
			artistIDs,
			socialNetworks
		};

		const updatedFest = await festsCollection.findOneAndUpdate(
			{
				_id: ObjectID(festID)
			},
			[
				{
					$set: {
						...fest
					}
				}
			]
		);
		if (updatedFest.value) {
			await artistsCollection.updateMany(
				{
					festIDs: festID
				},
				{
					$pull: {
						festIDs: festID
					}
				}
			);
			await artistsCollection.updateMany(
				{
					_id: {
						$in: artistIDs
					}
				},
				[
					{
						$set: {
							festIDs: {
								$concatArrays: ['$festIDs', [festID]]
							}
						}
					}
				]
			);
		}
		return res.send({
			data: updatedFest.value
		});
	} catch (err) {
		return res.status(500).send({
			error: [
				{
					field: null,
					message: err.message
				}
			]
		});
	}
});

/*
  Delete Fest with Social Networks And All Refs For Artists
*/
router.delete('/:id', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'id',
				type: 'string'
			}
		];

		if (
			validation(requiredProps, {
				id: req.params.id
			}).length
		) {
			return res.status(400).send({
				error: validation(requiredProps, {
					id: req.params.id
				})
			});
		}

		const deletedFest = await req.app.locals.fests.deleteOne({
			_id: ObjectID(req.params.id)
		});
		await req.app.locals.artists.updateMany(
			{
				festIDs: ObjectID(req.params.id)
			},
			{
				$pull: {
					festIDs: ObjectID(req.params.id)
				}
			}
		);
		return res.send({
			data: deletedFest.deletedCount ? 'removed' : 'did not removed'
		});
	} catch (err) {
		return res.status(500).send({
			error: [
				{
					field: null,
					message: err.message
				}
			]
		});
	}
});

export default router;
