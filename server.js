const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const InvolvedRoute = require('./routes/involved');
const TechnologyRoute = require('./routes/technology');
const FlagRoute = require('./routes/flag');
const CountriesRoute = require('./routes/countries');

require('dotenv/config');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb+srv://omri:1234@cluster0-jihpp.mongodb.net/DB?retryWrites=true&w=majority',
	{ useNewUrlParser: true },
	() => {}
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function callback() {
	console.log('connected to db');
});

app.use('/involved', InvolvedRoute);
app.use('/technology', TechnologyRoute);
app.use('/flags', FlagRoute);
app.use('/countries', CountriesRoute);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server start on port ' + port));
