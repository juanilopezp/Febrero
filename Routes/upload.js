const Router = require('express').Router()
const cloudinary = require('cloudinary')
const { json } = require('express')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')
//subimo fotos al Cloudinary


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//subir imagen, solo admin
Router.post('/upload', auth, authAdmin, (req, res) =>{
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'no se subieron archivos'})

        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "muy grande el archivo"})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'formato incorrecto'})
        }
            

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "Febrero"}, async(err, result) =>{
            if(err) throw err;
            removeTmp(file.tempFilePath)
            
            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

//Deletear imagen, solo admin
Router.post('/delete', auth, authAdmin, (req, res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id) res.status(400).json({msg: "sin imagenes seleccionadas"})

        cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
            if(err) throw err;

            res.json({msg: "imagen deleteada 8)"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})


const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = Router