const express = require('express');
const Countriesjson = require('../countries.json');
const router = express.Router();
const BodyParser = require('body-parser');
router.use(BodyParser.json());
router.get('/', async (req, res) => {
	const countries = await Countriesjson.features.map((x) => x.properties.name);
	try {
		res.send(countries);
	} catch (err) {
		res.json(err);
	}
});
module.exports = router;
