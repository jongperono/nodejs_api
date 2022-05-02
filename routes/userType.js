const express = require('express')
const router = express.Router()

const userType = require('../models/userType')

router.get('/', async (req, res) => {
    try {
        const usertype = await userType.find()
        res.json(usertype)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getUserType, (req, res) => {
    // res.send(res.usertype)
    res.send(res.usertype)
})


router.post('/', async (req, res) => {
    const usertype = new userType({
        id: req.body.id,
        name: req.body.name
    })
    try {
        const newUsertype = await usertype.save()
        res.status(201).send(newUsertype)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

router.delete('/:id', getUserType, async (req, res) => {
    try {
        await res.usertype.remove()
        res.json({ message: 'Deleted user type' })
    } catch (error) {
        return res.json({ message: error.message })
    }
})

router.patch('/:id', getUserType, async (req, res) => {
    if (req.body.id != null) {
        res.usertype.id = req.body.id
    }
    if (req.body.name != null) {
        res.usertype.name = req.body.name
    }
    try {
        const updatedUsertype = await res.usertype.save()
        res.json(updatedUsertype)
    } catch (error) {
        res.status(400).json({ message: 'Error' })
    }
})

async function getUserType(req, res, next) {
    let usertype
    try {
        usertype = await userType.findById(req.params.id)
        if (usertype == null) {
            return res.status(404).json({ message: 'Cannot find user type' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.usertype = usertype
    next()
}

module.exports = router