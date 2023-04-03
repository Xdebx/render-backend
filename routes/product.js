//** code ni sir */
// const express = require('express');
// const router = express.Router();
// const {getProducts,newProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController');
// // router.route('/products').get(getProducts);
// router.get('/products',getProducts);
// router.post('/product/new',newProduct);
// router.get('/product/:id',getSingleProduct);
// router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);
// module.exports = router;

//** code ni sir with auth*/
const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const {getProducts,newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, getAdminProducts, deleteReview} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.get('/products',getProducts);
// router.post('/product/new',newProduct);
router.get('/product/:id',getSingleProduct);
// router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

// OLD CODE WITHOUT FRONTEND
// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct);

// OLD CODE WITH FRONTEND
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10),newProduct);

router.put('/review',isAuthenticatedUser, createProductReview);
router.get('/reviews',isAuthenticatedUser, getProductReviews)
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);


router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10),updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// NEW CODE FOR UPDATE
// router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10), updateProduct)

router.route('/reviews').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview)





///WITH AUTH---------------------------------------------

// router.get('/products', isAuthenticatedUser,  getProducts);


//** Fetch All Products */
// router.get('/products',  isAuthenticatedUser,  authorizeRoles('admin'), getProducts)
// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct);

// router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;