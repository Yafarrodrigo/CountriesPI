const { response } = require("express")
const { Country, Activity } = require('../db')
const express = require("express")
const router = express.Router()

router.post("/", async (req,res)=>{
    const {id, name, difficulty, duration, season} = req.body

    const activityExists = await Activity.findOne({
        where: { name: name}
    })

    if(!activityExists){

        const selectedCountry = await Country.findOne({where: {id: id}})
        const newActivity = await Activity.create({name,difficulty,duration,season})

        await newActivity.addCountry(selectedCountry)

    }

    res.status(200).json({msg:"TODO OK"})
})


module.exports = router