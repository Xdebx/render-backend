//* code ni sir */
// const Product = require('../models/product')
// //create new product

// exports.newProduct = async(req,res,next) => {

// 	// console.log(req.body);

// 	const product = await Product.create(req.body);
  
//     console.log(product)
//     console.log('from async')
// 	res.status(201).json({
// 		success:true,
// 		product 
// 	})
// }

// exports.getProducts = async (req,res,next) => {

// 	const products = await Product.find();

// 	res.status(200).json({

// 		success: true,

// 		count: products.length,

// 		products

// 	})

// }

// exports.getSingleProduct = async(req,res,next) => {

//     const product = await Product.findById(req.params.id);

//     if(!product) {

//             return res.status(404).json({
//                 success: false,
//                 message: 'Product not found'
//             })

//     }

//     res.status(200).json({
//         success: true,
//         product

//     })

// }
// exports.updateProduct = async(req,res,next) => {

// 	let product = await Product.findById(req.params.id);
// 	if(!product) {

// 	 		return res.status(404).json({

// 	 			success: false,

// 	 			message: 'Product not found'
// 	 		})

// 	 }

// 	 product = await Product.findByIdAndUpdate(req.params.id,req.body,{

// 	 	new: true,
// 	 	runValidators:true,
// 	 	useFindandModify:false

// 	 })

//      console.log(product)

// 	 return res.status(200).json({

// 	 	success:true,
// 	 	product

// 	 })

// }

// exports.deleteProduct = async(req,res,next) => {

// 	const product = await Product.findById(req.params.id);

// 	if(!product) {

// 	 		return res.status(404).json({

// 	 			success: false,

// 	 			message: 'Product not found'

// 	 		})

// 	 }

// 	 await product.remove();

// 	 res.status(200).json({

// 	 	success: true,

// 	 	message: 'Product deleted'

// 	 })

// }

//* new lesson */

const Product = require("../models/product");
const mongoose = require("mongoose");
const APIFeatures = require('../utils/apiFeatures')
const ErrorHandler = require('../utils/errorHandler')
const cloudinary = require('cloudinary');

//get all products
//** luma */
// const getProducts = async (req, res, next) => {
//   const products = await Product.find().sort({ createdAt: -1 });
//   return res.json({ success: true, count: products.length, products });
// };


//** bago */
// const getProducts = async (req, res, next) => {

// 	const resPerPage = 4;
// 	const productsCount = await Product.countDocuments();

// 	// console.log(productsCount,req.query,Product.find())
// 	// console.log(Product.find())

// 	const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()

// 	// const products = await Product.find();

// 	apiFeatures.pagination(resPerPage);

// 	const products = await apiFeatures.query;

// 	// console.log(products)

//   setTimeout(() =>{
// 		res.status(200).json({
// 		success: true,
// 		// count: products.length,
// 		productsCount,
// 		products
// 		}) 	
// 	 },2000);
// 	// res.status(200).json({

// 	// 	success: true,

// 	// 	count: products.length,

// 	// 	productsCount,

// 	// 	products

// 	// })

// };

const getProducts = async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter();

  // let products = await apiFeatures.query;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
};

//get single product
const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid ID" });

  const product = await Product.findById(id);

  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });

  return res.json({ success: true, product });
};

// 1st OLD CODE
//create new product

/** 
  const newProduct = async (req, res, next) => {
  const requiredFields = [
    "name",
    "price",
    "description",
    "ratings",
    "images",
    "category",
    "seller",
    "stock",
    "numOfReviews",
    "reviews",
  ];
  const emptyFields = requiredFields.filter((field) => !req.body[field]);

  if (emptyFields.length)
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });

  try {
    const product = await Product.create(req.body);
    return res.json({ success: true, product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
*/

// OLD CODE
//create new product
/**  const newProduct = async (req, res, next) => {
	// console.log(req.body);
	const product = await Product.create(req.body);
	console.log(product)
	console.log('from async')
	res.status(201).json({
		success: true,
		product
	})
}
*/

// NEW CODE 
// create new product with frontend

const newProduct = async (req, res, next) => {
  let images = []

  if (typeof req.body.images === 'string') {
      images.push(req.body.images)
  } else {
      images = req.body.images
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'products'
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url

      })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
  })
}

// OLD CODE WITHOUT FRONTEND
// update a product
/** 
  const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid ID" });

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });

  return res.json({ success: true, product });
};
*/ 

// NEW CODE 
// create Update with frontend
const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
      return next(new ErrorHandler('Product not found', 404));
  }

  let images = []

  if (typeof req.body.images === 'string') {
      images.push(req.body.images)
  } else {
      images = req.body.images
  }

  if (images !== undefined) {

      // Deleting images associated with the product

      for (let i = 0; i < product.images.length; i++) {
          const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
      }

      let imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: 'products'
          });

          imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url
          })
      }
      req.body.images = imagesLinks
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  });

  res.status(200).json({
      success: true,
      product
  })
}

//delete a product
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid ID" });

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  res.status(200).json({ success: true, message: "Product deleted" });
};

const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,

    name: req.user.name,

    rating: Number(rating),

    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;

        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);

    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

const getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,

    reviews: product.reviews,
  });
};

// Get all products (Admin) =>  /api/v1/admin/products

const getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,

    products,
  });
};


const deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(req);

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;

  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

  await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numOfReviews
  }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })

  res.status(200).json({
      success: true
  })
}


module.exports = {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getAdminProducts,
  newProduct,
  deleteReview,
};
