const { where } = require('sequelize');
const Models = require('../models');
const myController = Models.products;

const addProduct = async(req, res) => {
    try{
        const data = req.body;
        await myController.create(data);
        res.send("Product added successfully");
    } catch(err){
        console.error("Error adding data:", err);
        res.status(500).send("An error occured while adding product");
    }
};

const getAllProducts = async (req,res) => {
    try{
        const products = await myController.findAll();
        res.json(products);
    } catch(err){
        console.error("Error Fetching Products:", err);
        res.status(500).send("An error occured while fetching products");
    }
}


module.exports = {
    addProduct,
    getAllProducts
};
