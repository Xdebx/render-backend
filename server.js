const app = require('./app');
const connectDatabase = require('./config/database')
const path = require('path')
// const dotenv = require('dotenv');
//dotenv.config({path: 'backend/config/config.env'})

require('dotenv').config({ path: './config/.env' });
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDatabase();

console.log(process.env.DATABASE)

app.listen(process.env.PORT, () => {

	console.log(`server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`);

});