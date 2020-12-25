var await = require('await');
const db = require('../config/db.config.js');
const Product = db.Product;
const File = db.Files;
/**
 * Save a Product object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    let product = req.body;
    try{
        // Save to MySQL database
        Product.create(product).then(result => {    
            result['createdAt'] = result.createdAt;
            result['updatedAt'] = result.updatedAt;
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Product with id = " + result.id,
                Products: [result],
                error: ""
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            Products: [],
            error: error.message
        });
    }
}

/**
 * Retrieve Product information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.retrieveAllProducts = (req, res) => {
    // find all Product information from 
    try{
        Product.findAll()
        .then(ProductInfos => {
            res.status(200).json({
                message: "Get all Products' Infos Successfully!",
                Products: ProductInfos,
                error: ""
            });
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            Products: [],
            error: error
        });
    }
}

/**
 * Updating a Product
 * @param {*} req 
 * @param {*} res 
 */
exports.updateById = async (req, res) => {
    try{
        let productId = req.params.id;
        let product = await Product.findByPk(productId);
    
        if(!product){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Product with id = " + productId,
                Products: [],
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = req.body;
            let result = await Product.update(updatedObject, {returning: true, where: {id: productId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Product with id = " + req.params.id,
                    error: "Can NOT Updated",
                    Products: []
                });
            }

            res.status(200).json({
                message: "Update successfully a Product with id = " + productId,
                Products: [updatedObject],
                error: ""           
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Product with id = " + req.params.id,
            error: error.message,
            products: []
        });
    }
}

/**
 *  Delete a Product by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteById = async (req, res) => {
    try{
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if(!product){
            res.status(404).json({
                message: "Does Not exist a Product with id = " + productId,
                error: "404",
                products: []
            });
        } else {
            await File.destroy({where: {productId: productId}});
            await product.destroy();
            res.status(200).json({
                message: "Delete Successfully a Product with id = " + productId,
                products: [product],
                error: ""
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Product with id = " + req.params.prodId,
            error: error.message,
            products: []
        });
    }
}

/**
 *  Delete a Product by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.retreiveById = async (req, res) => {
    try{
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if(!product){
            res.status(404).json({
                message: "Does Not exist a Product with id = " + productId,
                error: "404",
                products: []
            });
        } else {
            res.status(200).json({
                message: "Get Product Successfully  with id = " + productId,
                product: product,
                error: ""
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT Retrieve a Product with id = " + req.params.prodId,
            error: error.message,
            products: []
        });
    }
}

exports.getRelatedProductsByMaterial = (req, res) => {
	Product.findAll({where: {material: req.params.material}}).then(products => {
        res.status(200).json({
            message: "Get all Related Products' Infos Successfully!",
            Products: products,
            error: ""
        });
	}).catch(err => {
		console.log(err);
		res.status(500).json({ msg: 'Error', detail: err });
	});
}