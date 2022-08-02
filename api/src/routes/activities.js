const { Country, Activity } = require('../db')
const express = require("express")
const router = express.Router()

router.post("/", async (req,res)=>{
    
    try {
        const {name, difficulty, duration, season, countries} = req.body
        let notCreated = 0
        let created = 0

        if(!name || !difficulty || !duration || !season || !countries){
            return res.status(404).json({msg: "incomplete form"})
        }

        for(let country of countries){
            const activityExists = await Activity.findOne({
                where: { name: name},
                include: [{
                    model:Country,
                    where:{
                        id: country.id
                    }
                }]
            })

            if(!activityExists){
                
                const selectedCountry = await Country.findOne({where: {id: country.id}})
                const newActivity = await Activity.create({name,difficulty,duration,season})
                
                await newActivity.addCountry(selectedCountry)
                created++

            }else{
                notCreated++
            }
        }
        return res.status(200).json({created, notCreated})
    }
    catch (error) {
        return res.status(404).json({msg: error.msg})
    }
})


module.exports = router