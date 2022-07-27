const express = require("express")
const router = express.Router()
const axios = require('axios');
const {Country, Activity} = require('../db')
const { Op } = require('sequelize')

router.get("/", async (req,res)=>{
    try {
        // query name devuelve todo
        if(req.query.name){
            const response = await Country.findAll({
                where:{
                    name: {
                        [Op.iLike]: `%${req.query.name}%`
                    }
                },
                include:[{
                    model:Activity,
                    through:{
                        where:{
                            countryId: req.params.idPais
                        }
                    }
                }]
            })
            res.status(200).json(response)
        }
        // query devulve solo name,id
        else if(req.query.onlyName){
            const response = await Country.findAll({
                where:{
                    name: {
                        [Op.iLike]: `%${req.query.onlyName}%`
                    }
                },
                attributes: ['name','id']
                
            })
            res.status(200).json(response)
        }
        // main
        else{
            const dbResponse = await Country.findAll({include:Activity})
    
        if(!dbResponse.length){
            await axios.get("https://restcountries.com/v3/all")
                .then(response => response.data.forEach( async el => {
                    const newCountry = {
                        id: el.cca3,
                        name: el.name.common,
                        flagImg: el.flags[1],
                        continent: el.continents[0],
                        subRegion: el.subregion,
                        area: el.area,
                        population: el.population
                    }
                    if(el.capital){
                        newCountry.capital = el.capital[0]
                    }else{
                        newCountry.capital = "not found"
                    }
                    if(el.subregion){
                        newCountry.subRegion = el.subregion
                    }else{
                        newCountry.subRegion = "not found"
                    }

                    await Country.create(newCountry)

                }))   
                console.log("del internet");
                res.redirect("/countries")
        } 
        else{
            console.log("info de mi base de datos");
            res.status(200).json(dbResponse)
        }
        }
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
})

router.get("/:idPais", async (req,res)=>{
    try {
        const response = await Country.findAll({
            where:{
                id: req.params.idPais
            },
            include:[{
                model:Activity,
                through:{
                    where:{
                        countryId: req.params.idPais
                    }
                }
            }]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.msg})
    }
})



module.exports = router