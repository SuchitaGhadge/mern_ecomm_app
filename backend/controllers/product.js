const Product = require('../models/product');
const formidable = require('formidable'); 
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error : "Product not found"
            })
        }
        
        req.product = product;
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: 'Problem with image'
            })
        }

        const {name, description, price, category, stock} = fields;
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
            ){
                return res.status(400).json({
                    error : "Please provide all fields"
                })
        }

        let product = new Product(fields);
        // handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size is too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.type;
        }

        // save to DB
        product.save((err, product) => {
            if(err){
                // console.log("err", err)
                return res.status(400).json({
                    error: "Saving file in DB failed"
                });
            }

            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

// delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;
    console.log("product", product);
    product.remove((err, deletedProduct) => {
        console.log("deletedProduct", deletedProduct);
        if(err){
            return res.status(400).json({
                error: "Failed to delete product"
            })
        }

        res.json({
            message: "Deletion was a success",
            deletedProduct
        })
    })
}

// update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: 'Problem with image'
            })
        }

        // updation code
        let product = req.product;
        product = _.extend(product, fields);

        // handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size is too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.type;
        }

        // save to DB
        product.save((err, product) => {
            if(err){
                // console.log("err", err)
                return res.status(400).json({
                    error: "Updation of product failed"
                });
            }

            res.json(product)
        })
    })
}

// product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            res.status(400).json({
                error: "No product found"
            })
        }

        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error : "No category found"
            })
        }

        res.json(category);
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order?.products?.map(product => {
        return {
            updateOne : {
                filter : {_id : product._id},
                update : {$inc : {stock: -product.count, sold: +product.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }

        next();
    })
}
