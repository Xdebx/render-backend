//** code ni sir */
const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)

    }).catch(err => console.log(err));
}
module.exports = connectDatabase
//** code ni gab */
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB connected with HOST: ${mongoose.connection.host}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = connectDB;