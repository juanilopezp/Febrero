const Products = require ('../models/productModel')

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit']
            excludedFields.forEach(el => delete(queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //gte = mayor o igual (lesser than or equal)
        //lte = menor o igual (lesser than or equal)
        //lt = menor a (lesser than)
        //gt = mayor a (greater than)
        this.query.find(JSON.parse(queryStr))
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 3
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

const productControl = {
    getProduct: async(req, res) =>{
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query
            

            return this;

            res.json(products)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
            const {product_id, title, price, description, content, images, category} = req.body
            if(!images) return res.status(400).json({msg: "imagen no subida"})

            const product = await Products.findOne({product_id})
            if(product)
                return res.status(400).json({msg: "este producto ya existe"})


            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })


            await newProduct.save()
            res.json(newProduct)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "imagen no subida"})

            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productControl