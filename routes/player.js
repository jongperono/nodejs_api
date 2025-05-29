const express = require('express')
const router = express.Router()

const players = require('../models/player')

router.get('/', async (req, res) => {
    try {
        const player = await players.find()
        res.json(player)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getPlayer, (req, res) => {
    // res.send(res.usertype)
    res.send(res.player)
})


// router.post('/', async (req, res) => {
//     const usertype = new userType({
//         id: req.body.id,
//         name: req.body.name
//     })
//     try {
//         const newUsertype = await usertype.save()
//         res.status(201).send(newUsertype)
//     } catch (error) {
//         res.status(400).send({ message: error.message })
//     }
// })

router.delete('/:id', getPlayer, async (req, res) => {
    try {
        await res.player.remove()
        res.json({ message: 'Deleted player' })
    } catch (error) {
        return res.json({ message: error.message })
    }
})

// router.patch('/:id', getUserType, async (req, res) => {
//     if (req.body.id != null) {
//         res.usertype.id = req.body.id
//     }
//     if (req.body.name != null) {
//         res.usertype.name = req.body.name
//     }
//     try {
//         const updatedUsertype = await res.usertype.save()
//         res.json(updatedUsertype)
//     } catch (error) {
//         res.status(400).json({ message: 'Error' })
//     }
// })

async function getPlayer(req, res, next) {
    let player
    try {
        player = await players.findById(req.params.id)
        if (player == null) {
            return res.status(404).json({ message: 'Cannot find player id' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.player = player
    next()
}

module.exports = router