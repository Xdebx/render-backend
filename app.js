//code ni sir
// const express = require('express');
// const app = express();
// app.use(express.json());
// const products = require('./routes/product');
// app.use('/api/v1',products);
// module.exports = app


// //** new lessson */
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors');
const order = require('./routes/order');
const app = express();

// OLD CODE
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// NEW CODE
app.use(express.json({ limit: '100mb' }));
app.use(cors({
    origin: "https://pascua-shop.onrender.com", 
    credentials: true}));
app.use(cookieParser());
app.use(express.urlencoded({limit: "100mb", extended: true }));



//  new code for register & update
//  comment this shit if ur route is like this router.put('/me/update', isAuthenticatedUser, upload.single("avatar"), updateProfile)
//  app.use(fileUpload());

const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1',auth);
app.use('/api/v1',products);
app.use('/api/v1', order);
app.use(errorMiddleware);

module.exports = app