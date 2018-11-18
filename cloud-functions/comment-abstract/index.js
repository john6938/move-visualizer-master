const admin = require('firebase-admin');

const COLLECTION_NAME = 'abstract-comments';

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

/**
 * Responds to any HTTP request.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */
exports.commentAbstract = async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const { password, abstract, comment } = req.query;
	if (!password || password !== process.env.PASSWORD)
	{ return res.status(401).json({ error: 'Wrong password' }); }
	if (!abstract || !comment)
	{ return res.status(400).json({ error: 'Required fields are missing' });}

	const collection = db.collection(COLLECTION_NAME);
	try {
		const newData = {
			abstract,
			comment,
			time: new Date(),
		};
		await collection.add(newData);
		res.status(200).json(newData);
	} catch (error) {
		res.status(500).json({ error });
	}
};
