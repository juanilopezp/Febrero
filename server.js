require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require ('path')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//RUTAAASSS
app.use('/user', require('./Routes/userRoutes'))
app.use('/api', require('./Routes/categoryRoutes'))
app.use('/api', require('./Routes/upload'))
app.use('/api', require('./Routes/productRoutes'))
app.use('/api', require('./Routes/paymentRoutes'))

//CONECTARSE A MONGODB CHEEEEEE
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('conectado cheeeeee')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('servidor cumming en el puerto', PORT)
})