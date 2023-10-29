const express = require('express')
const Router = express.Router()
const multer = require('multer')


const shoesValidations = require('../validations/shoes')
const { GetShoes, AddShoes, DeleteShoes, UpdateShoes } = require('../controller/ShoesController')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage })




Router.use(express.json());

// Router.get('/shoes/getlist')

Router.post('/api/shoes/add', upload.array('PhotoShoes', 4), AddShoes)

// Router.delete('/shoes/delete')

// Router.put('/shoes/update')







module.exports = Router