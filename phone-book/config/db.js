const mongoose = require("mongoose");
const config = require("config");
const dataBase = config.get("mongoURI");
// console.log(dataBase);
const connectDB = async () => {
	mongoose
		.connect(dataBase)
		.then(() => console.log("DataBase is connected succesfully!"))
		.catch((err) => {
			console.error(err.message);
			process.exit(1);
		});
};

module.exports = connectDB;
