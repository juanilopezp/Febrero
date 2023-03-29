const Category = require ('../models/categoryModel')
const Products = require('../models/productModel')
const categoryControl = {
    getCategories: async (req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {

            {/*const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Esta categoria ya existe"})

            const newCategory = new Category({name})

        await newCategory.save()*/}
            res.json('Check admin success')
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({msg: "por favor elimine todos los productos relacionados"})


            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "categoria deleteada"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})
            res.json({msg: "categoria deleteada"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryControl