const router = require('express').Router()
const PastEvent = require('../model/PastEvent')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')

router.post('/', upload.single('image'), (async(req, res)=> {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        //create instance of user
        let user = new PastEvent({
            name: req.body.name,
            title: req.body.title,
            desc: req.body.desc,
            date: req.body.date,
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        })

        //save user
        await user.save()
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}))
router.get('/', async(req, res)=> {
    try {
        let user = await PastEvent.find()
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }
})

router.get('/:id', async(req, res)=> {
    const {id} = req.params;
    try {
      const post = await PastEvent.findById(id);
      res.status(200).json(post)
    } catch (error) {
      res.status(404).json({message: error.message})
    }
})

router.delete("/:id", async(req, res)=> {
    try {
        let user = await PastEvent.findById(req.params.id)

        //delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id)

        //delete user from db
        await user.remove()
        res.json()
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }
})

router.put('/:id ', upload.single('image'), (async(req, res)=> {
    try {
        let user = await PastEvent.findById(req.params.id)
        await cloudinary.uploader.destroy(user.cloudinary_id)
        const result = await cloudinary.uploader.upload(req.file.path)

        const data = {
            name: req.body.name || user.name,
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id
        }

        user = await PastEvent.findByIdAndUpdate(req.params.id, data, {new: true})
        res.json(user)

    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }
}))

module.exports = router