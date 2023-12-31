const fs = require('fs')
const ShoesModel = require('../model/_shoes')


class ShoesController {
    async GetShoesId(req, res) {
        try{
            const Shoes = await ShoesModel.findById(req.params.id)
            
            res.status(200).setHeader('Content-Type', 'application/json').json(Shoes)
        } catch(err) {
            console.log(err)
            res.status(404).json({message: `Error: ${err}`})
        }
    }


    async GetAllShoes(req, res) {
        try{
            const Shoes = await ShoesModel.find(req.body)
    
            res.status(200).setHeader('Content-Type', 'application/json').json(Shoes)
        } catch(err) {
            console.log(err)
            res.status(502).json({message: `Error: ${err}`})
        }
    }

    async AddShoes(req, res) {
        try{
            const path = __dirname.replace('src/controller', '')
    
            if(req.files && Object.keys(req.files).length == 4)
            {
                const newShoes = new ShoesModel({
                    name: req.body.name,                
                    product: req.body.product,
                    price: req.body.price,
                    size: req.body.size,
                    vendorcode: req.body.vendorcode,
                    color: req.body.color,
                    isSoon: req.body.isSoon,
            
                    front_photo: {
                        filename: req.files.FrontPhoto[0].filename,
                        originalname: req.files.FrontPhoto[0].originalname,
                        path: req.files.FrontPhoto[0].path,
                        data: fs.readFileSync(path + req.files.FrontPhoto[0].path).toString('base64')
                    },
                    back_photo: {
                        filename: req.files.BackPhoto[0].filename,
                        originalname: req.files.BackPhoto[0].originalname,
                        path: req.files.BackPhoto[0].path,
                        data: fs.readFileSync(path + req.files.BackPhoto[0].path).toString('base64')
                    },
                    top_photo: {
                        filename: req.files.TopPhoto[0].filename,
                        originalname: req.files.TopPhoto[0].originalname,
                        path: req.files.TopPhoto[0].path,
                        data: fs.readFileSync(path + req.files.TopPhoto[0].path).toString('base64')
                    },
                    aspect_photo: {
                        filename: req.files.AspectPhoto[0].filename,
                        originalname: req.files.AspectPhoto[0].originalname,
                        path: req.files.AspectPhoto[0].path,
                        data: fs.readFileSync(path + req.files.AspectPhoto[0].path).toString('base64')
                    }
                })
    
                newShoes.save().then(() => {
                    res.status(201).setHeader('Content-Type', 'application/json').json(newShoes)
                }).catch((err) => {
                    console.log(err)
                    res.status(502).json({message: `Error: ${err}`})
                })
            } else {
                req.files[0] ? fs.unlink(path + req.files[0].path, (err) => console.log(err)) : console.log('0 - the file is not deleted')
                req.files[1] ? fs.unlink(path + req.files[1].path, (err) => console.log(err)) : console.log('1 - the file is not deleted')
                req.files[2] ? fs.unlink(path + req.files[2].path, (err) => console.log(err)) : console.log('2 - the file is not deleted')
                req.files[3] ? fs.unlink(path + req.files[3].path, (err) => console.log(err)) : console.log('3 - the file is not deleted')
    
                res.status(404).setHeader('Content-Type', 'application/json').json(req.files)
            }
        } catch(err) {
            console.log(err)
            res.status(400).json({message: `Error: ${err}`})
        }
    }


    async DeleteShoes(req, res) {
        try{
            const Shoes = await ShoesModel.findByIdAndDelete(req.params.id)
    
            res.status(200)
            if(Shoes)
            {
                const path = __dirname.replace('src/controller', '')
    
                fs.unlink(path + Shoes.front_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                fs.unlink(path + Shoes.back_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                fs.unlink(path + Shoes.top_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                fs.unlink(path + Shoes.aspect_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
    
                res.setHeader('Content-Type', 'application/json').json(Shoes)
            } else {
                res.json('message: "there is no information"')
            }
        } catch(err) {
            console.log(err)
            res.status(404).json({message: `Error: ${err}`})
        }
    }

    async UpdateShoes(req, res) {
        try{ 
            if(req.params.updatePhoto == 'true') {
                if(req.files && Object.keys(req.files).length == 4)
                {
                    const oldShoes = await ShoesModel.findById(req.params.id)
                    const path = __dirname.replace('src/controller', '')
    
                    fs.unlink(path + oldShoes.front_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                    fs.unlink(path + oldShoes.back_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                    fs.unlink(path + oldShoes.top_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
                    fs.unlink(path + oldShoes.aspect_photo.path, (err) => { if(err){ console.log(err) } else{ console.log('good deleted')}})
        
    
                    req.body.front_photo = {
                        filename: req.files.FrontPhoto[0].filename,
                        originalname: req.files.FrontPhoto[0].originalname,
                        path: req.files.FrontPhoto[0].path,
                        data: fs.readFileSync(path + req.files.FrontPhoto[0].path).toString('base64')
                    }
                    req.body.back_photo = {
                        filename: req.files.BackPhoto[0].filename,
                        originalname: req.files.BackPhoto[0].originalname,
                        path: req.files.BackPhoto[0].path,
                        data: fs.readFileSync(path + req.files.BackPhoto[0].path).toString('base64')
                    }
                    req.body.top_photo = {
                        filename: req.files.TopPhoto[0].filename,
                        originalname: req.files.TopPhoto[0].originalname,
                        path: req.files.TopPhoto[0].path,
                        data: fs.readFileSync(path + req.files.TopPhoto[0].path).toString('base64')
                    }
                    req.body.aspect_photo = {
                        filename: req.files.AspectPhoto[0].filename,
                        originalname: req.files.AspectPhoto[0].originalname,
                        path: req.files.AspectPhoto[0].path,
                        data: fs.readFileSync(path + req.files.AspectPhoto[0].path).toString('base64')
                    }
    
                    const shoes = await ShoesModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
                    res.status(200).json({shoes})
                } else {
                    res.status(400).send('error')
                }
            } else {
                const shoesId = req.params.id
                const shoes = await ShoesModel.findByIdAndUpdate({_id: shoesId}, req.body, {new: true})
                res.status(200).json({shoes})
            }
        } catch(err) {
            console.log(err)
            res.status(404)
        }
    }
}

module.exports = ShoesController