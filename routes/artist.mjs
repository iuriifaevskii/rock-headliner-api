import express from 'express';
import validation from '../utils/validation.mjs';
import mongodb from 'mongodb';

const { ObjectID } = mongodb;

const router = express.Router();

/*
  Get all Artists
*/
router.get('/', async (req, res) => {
	try {
		return res.send({
			data: await req.app.locals.artists.find().toArray()
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
  Artists Except For Headliners For One Fest
*/
router.get('/except-for-headliners/:festID', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'festID',
				type: 'string'
			}
		];

		if (
			validation(requiredProps, {
				festID: req.params.festID
			}).length
		) {
			return res.status(400).send({
				error: validation(requiredProps, {
					festID: req.params.festID
				})
			});
		}
		return res.send({
			data: await req.app.locals.artists
				.find({
					festIDs: ObjectID(req.params.festID),
					isHeadliner: false
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
  Headliners For One Fest
*/
router.get('/headliners/:festID', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'festID',
				type: 'string'
			}
		];

		if (
			validation(requiredProps, {
				festID: req.params.festID
			}).length
		) {
			return res.status(400).send({
				error: validation(requiredProps, {
					festID: req.params.festID
				})
			});
		}
		return res.send({
			data: await req.app.locals.artists
				.find({
					festIDs: ObjectID(req.params.festID),
					isHeadliner: true
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
  All Artists For One Fest
*/
router.get('/:festID', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'festID',
				type: 'string'
			}
		];

		if (
			validation(requiredProps, {
				festID: req.params.festID
			}).length
		) {
			return res.status(400).send({
				error: validation(requiredProps, {
					festID: req.params.festID
				})
			});
		}
		return res.send({
			data: await req.app.locals.artists
				.find({
					festIDs: ObjectID(req.params.festID)
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
  Create Artist For Selected Fests
*/
router.post('/', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'name',
				type: 'string'
			},
			{
				name: 'photo',
				type: 'string'
			},
			{
				name: 'isHeadliner',
				type: 'boolean'
			},
			{
				name: 'youtube',
				type: 'string'
			},
			{
				name: 'festIDs',
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

		if (validation(requiredProps, req.body).length) {
			return res.status(400).send({
				error: validation(requiredProps, req.body)
			});
		}

		const passedFestIds = req.body.festIDs.replace(' ', '').split(',');
		let fests = [];
		if (passedFestIds.filter(item => Boolean(item)).length) {
			fests = await req.app.locals.fests
				.find({
					_id: {
						$in: passedFestIds.map(item => ObjectID(item))
					}
				})
				.toArray();
		}
		const name = req.body.name;
		const photo = req.body.photo;
		const isHeadliner = req.body.isHeadliner;
		const youtube = req.body.youtube;
		const festIDs = fests.length ? fests.map(fest => fest._id) : [];

		const artistsCollection = req.app.locals.artists;
		const festsCollection = req.app.locals.fests;

		const artist = {
			name,
			photo,
			isHeadliner,
			youtube,
			festIDs
		};
		const result = await artistsCollection.insertOne(artist);
		const artistID = result.ops[0]._id;
		await festsCollection.updateMany(
			{
				_id: {
					$in: festIDs
				}
			},
			[
				{
					$set: {
						artistIDs: {
							$concatArrays: ['$artistIDs', [artistID]]
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
  Update Artist With Selected Fests And All Refs For Fests
*/
router.put('/:id', async (req, res) => {
	try {
		const requiredProps = [
			{
				name: 'name',
				type: 'string'
			},
			{
				name: 'photo',
				type: 'string'
			},
			{
				name: 'isHeadliner',
				type: 'boolean'
			},
			{
				name: 'youtube',
				type: 'string'
			},
			{
				name: 'festIDs',
				type: 'string'
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

		if (
			validation(requiredProps, {
				id: req.params.id,
				...req.body
			}).length
		) {
			return res.status(400).send({
				error: validation(requiredProps, {
					id: req.params.id,
					...req.body
				})
			});
		}

		const passedFestIds = req.body.festIDs.replace(' ', '').split(',');
		let fests = [];
		if (passedFestIds.filter(item => Boolean(item)).length) {
			fests = await req.app.locals.fests
				.find({
					_id: {
						$in: passedFestIds.map(item => ObjectID(item))
					}
				})
				.toArray();
		}

		const artistID = ObjectID(req.params.id);
		const name = req.body.name;
		const photo = req.body.photo;
		const isHeadliner = req.body.isHeadliner;
		const youtube = req.body.youtube;
		const festIDs = fests.length ? fests.map(fest => fest._id) : [];

		const artistsCollection = req.app.locals.artists;
		const festsCollection = req.app.locals.fests;

		const artist = {
			name,
			photo,
			isHeadliner,
			youtube,
			festIDs
		};
		const updatedArtist = await artistsCollection.findOneAndUpdate(
			{
				_id: ObjectID(artistID)
			},
			[
				{
					$set: {
						...artist
					}
				}
			]
		);
		if (updatedArtist.value) {
			await festsCollection.updateMany(
				{
					artistIDs: artistID
				},
				{
					$pull: {
						artistIDs: artistID
					}
				}
			);
			await festsCollection.updateMany(
				{
					_id: {
						$in: festIDs
					}
				},
				[
					{
						$set: {
							artistIDs: {
								$concatArrays: ['$artistIDs', [artistID]]
							}
						}
					}
				]
			);
		}
		return res.send({
			data: updatedArtist.value
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
  Delete Artist And All Refs For Fests
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

		const deletedArtist = await req.app.locals.artists.deleteOne({
			_id: ObjectID(req.params.id)
		});
		await req.app.locals.fests.updateMany(
			{
				artistIDs: ObjectID(req.params.id)
			},
			{
				$pull: {
					artistIDs: ObjectID(req.params.id)
				}
			}
		);
		return res.send({
			data: deletedArtist.deletedCount ? 'removed' : 'did not removed'
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
