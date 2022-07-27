const { response } = require("express")
const { Country, Activity } = require('../db')
const express = require("express")
const router = express.Router()

router.post("/", async (req,res)=>{
    
    try {
        const {id, name, difficulty, duration, season} = req.body
        const activityExists = await Activity.findOne({
            where: { name: name},
            include: [{
                model:Country,
                where:{
                    id: id
                }
            }]
        })
        
        if(!activityExists){

            const selectedCountry = await Country.findOne({where: {id: id}})
            const newActivity = await Activity.create({name,difficulty,duration,season})

            await newActivity.addCountry(selectedCountry)
            
            res.status(200).json({msg:"Actividad agregada!"})

        }else{
            res.status(200).json({msg: "La actividad ya existe en ese pais!"})
        }

    } catch (error) {
        res.status(404).json({msg: error.msg})
    }
})


module.exports = router