const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payments = require('../models/paymentModel')


const userControl ={
    register: async (req, res) =>{
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "Este mail ya existe"})
            if(password.length < 6) return res.status(400).json({msg:"Su contraseña debe tener un minimo de 6(seis) caracteres"})

            //Encriptacion de contraseña
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            //Guardar data en MongoDB

            await newUser.save()

            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000
            })

            res.json({accesstoken})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"usuario no existe"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg:"contraseña incorrecta"})

            //si se loguea, crear token de acceso y refrescar token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // equivalente a siete dias
            })

            res.json({accesstoken})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "deslogueado"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshtoken:(req,res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg: "loguate o registrate"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "loguate o registrate"})
            const accesstoken =createAccessToken({id: user.id})
            res.json({accesstoken})   
        })
        res.json({rf_token})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }    
    },
    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.users.id).select('-password')
            if(!user)return res.status(400).json({msg: "usuario inexistente"})

            res.json(req.user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addCart: async (req, res)=>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "Usuario no existe"})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json ({msg:"Añadido a carrito"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res)=>{
        try {
            const history = await Payments.find({user_id: req.user.id})
            
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    }
}


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env["ACCESS_TOKEN_SECRET"], {expiresIn:'11m'})
}

const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env["REFRESH_TOKEN_SECRET"], {expiresIn:'7d'})
}
module.exports = userControl