const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

// Data post
router.post('/data', async(req, res) => {
    const {metric, date, athlete, time} = req.body

    const dataInfo = {date: date, athlete: athlete, time:time}

    console.log(metric + " | " + date + " | " + athlete + " | " + time)

    if(metric === 'tenfly') {
        const newData = new schemas.TenFly(dataInfo)
        const saveData = await newData.save()
        if(saveData) {
            res.send('Time saved. Ready for next time entry.')
        }
        else {
            res.send('Failed to save time.')
        }
    }

    if(metric === 'tenstart') {
        const newData = new schemas.TenStart(dataInfo)
        const saveData = await newData.save()
        if(saveData) {
            res.send('Time saved. Ready for next time entry.')
        }
        else {
            res.send('Failed to save time.')
        }
    }

    res.end()

})

//Data gets
router.get('/data/tenfly', async (req, res) => {
    
    const tenflyData = await schemas.TenFly.find({}).exec()
    if (tenflyData) {
        res.json(tenflyData)
    }
    else {
        console.error(error)
        res.status(500).send('Error fetching tenfly data')
    }

})
router.get('/data/tenstart', async (req, res) => {

    const tenstartData = await schemas.TenStart.find({}).exec()
    if (tenstartData) {
        res.json(tenstartData)
    }
    else {
        console.error(error)
        res.status(500).send('Error fetching tenfly data')
    }

})

// Athlete get/post
router.get('/athletes', async (req, res) => {
    
    try {
        const athleteData = await schemas.Athlete.find({}).sort({ name: 1 }).exec()
        res.json(athleteData) // res.send(JSON.stringify(athleteData))
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Error fetching athletes')
    }

})

router.post('/new-athletes', async(req, res) => {
    const {name, gender, sport} = req.body

    const athleteData = {name: name, gender: gender, sport: sport}
    const newAthlete = new schemas.Athlete(athleteData)
    const saveAthlete = await newAthlete.save()
    if(saveAthlete) {
        res.send('Athlete saved. Ready for next athlete.')
    }
    else{
        res.send('Failed to save athlete.')
    }
    
    res.end()
})

// Sport get
// May need to update this to allow Justin to add sports if this list is found to be not good enough.
router.get('/sports', async(req, res) => {
    const sports = [
        {"sport": "Baseball"},
        {"sport": "Basketball"},
        {"sport": "Field Hockey"},
        {"sport": "Football"},
        {"sport": "Golf"},
        {"sport": "Gymnastics"},
        {"sport": "Ice Hockey"},
        {"sport": "Lacrosse"},
        {"sport": "Soccer"},
        {"sport": "Softball"},
        {"sport": "Swimming"},
        {"sport": "Tennis"},
        {"sport": "Track and Field"},
        {"sport": "Volleyball"},
        {"sport": "Wrestling"},
    ]

    res.send(sports)
})


module.exports = router