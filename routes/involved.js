const express = require('express');
const router = express.Router();
const Countries = require('../countries.json');
const Involved = require('../models/Involved');
const BodyParser = require('body-parser');
router.use(BodyParser.json());
router.get('/:tech', async (req, res) => {
	const invovled = await Involved.find({ Technology: req.params.tech });
	try {
		var GeoJson = makeGeoFile(invovled, req.params.tech);

		res.send(GeoJson);
	} catch (err) {
		res.json(err);
	}
});
router.get('/:tech/:country', async (req, res) => {
	const invovled = await Involved.find({ Technology: req.params.tech, uniq_name: req.params.country });
	try {
		var Chartform = makeChartFile(invovled, req.params.tech, req.params.country);
		res.send(Chartform);
	} catch (err) {
		res.json(err);
	}
});
module.exports = router;

makeChartFile = (res, tech, country) => {
	var newdata = res;
	var { maxValue1, minValue1, maxValue2, minValue2 } = getMinMaxChart(res);
	newdata.map((year) => {
		if (isNaN(year.Counter / year.TotalUsers) == true) {
			year.kpi1 = 0;
		} else if (year.Counter + year.TotalUsers <= 20) {
			year.kpi1 = 0;
		} else year.kpi1 = year.Counter / year.TotalUsers;

		if (isNaN(year.CountAnswer / year.CountQuestion) == true) {
			year.kpi2 = 0;
		} else if (year.CountQuestion + year.CountAnswer <= 10) {
			year.kpi2 = 0;
		} else year.kpi2 = year.CountAnswer / year.CountQuestion;
		//(isNaN(year.Counter / year.TotalUsers) == true) ? (year.kpi1 = 0) : (year.kpi1 = year.Counter / year.TotalUsers);
		//isNaN(year.CountQuestion / year.CountAnswer) == true
		//	? (year.kpi2 = 0)
		//	: (year.kpi2 = year.CountQuestion / year.CountAnswer);
	});
	var pointsKPI1 = newdata.map((point) => [ point.UsageYear, (point.kpi1 * 100).toFixed(2) ]);
	var pointsKPI2 = newdata.map((point) => [ point.UsageYear, (point.kpi2 * 100).toFixed(2) ]);
	var data22 = {
		name: tech + '-' + country,
		data1: pointsKPI1,
		data2: pointsKPI2,
		allData: newdata
	};
	return data22;
};

var makeGeoFile = (res, tech) => {
	var FeatureCollections = [];
	this.c = JSON.parse(JSON.stringify(Countries));

	for (var year = 2008; year <= 2020; year++) {
		this.c.features.map((feature) => {
			res.map((item) => {
				if (item.UsageYear == year && feature.properties.name.toLowerCase() == item.uniq_name) {
					feature.properties.counter = item.Counter;
					feature.properties.totalusers = item.TotalUsers;
					feature.properties.question = item.CountQuestion;
					feature.properties.answer = item.CountAnswer;
					feature.properties.year = year;
					feature.properties.technology = tech;
				}
			});
		});
		var { maxValue, minValue, maxValue2, minValue2 } = getMinMaxGeo(this.c);
		this.c.features.map((feature) => {
			feature.properties.color1 = (feature.properties.counter - minValue) / (maxValue - minValue); //normalize for specific tech
			feature.properties.color2 = (feature.properties.color2 - minValue2) / (maxValue2 - minValue2); //normalize for specific tech out of total users
		});

		FeatureCollections.push(JSON.parse(JSON.stringify(this.c)));
	}
	return FeatureCollections;
};

getMinMaxGeo = (countries) => {
	//getting the the min max value for normalization

	var array = [];
	var array2 = [];

	countries.features.map((item) => {
		array.push(item.properties.counter);
		array2.push(
			isNaN(item.properties.counter / item.properties.totalusers) == true
				? 0
				: item.properties.counter / item.properties.totalusers
		);
		item.properties.color2 =
			isNaN(item.properties.counter / item.properties.totalusers) == true
				? 0
				: item.properties.counter / item.properties.totalusers;
	});

	return {
		maxValue: Math.max.apply(Math, array),
		minValue: Math.min.apply(Math, array),
		maxValue2: Math.max.apply(Math, array2),
		minValue2: Math.min.apply(Math, array2)
	};
};

getMinMaxChart = (data) => {
	var array1 = [];
	var array2 = [];
	data.map((year) => {
		array1.push(isNaN(year.Counter / year.TotalUsers) == true ? 0 : year.Counter / year.TotalUsers);
		array2.push(isNaN(year.CountQuestion / year.CountAnswer) == true ? 0 : year.CountQuestion / year.CountAnswer);
	});
	return {
		maxValue1: Math.max.apply(Math, array1),
		minValue1: Math.min.apply(Math, array1),
		maxValue2: Math.max.apply(Math, array2),
		minValue2: Math.min.apply(Math, array2)
	};
};
