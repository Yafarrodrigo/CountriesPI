const express = require("express")
const router = express.Router()
const axios = require('axios');
const { response } = require("express");

const internalDB = []

router.get("/", async (req,res)=>{
    if(req.query.name){
        res.status(200).send(`/countries?name=${req.query.name}`)
    }
    else{
        if(!internalDB.length){
            await axios.get("https://restcountries.com/v3/all")
                .then(response => response.data.forEach(el => {
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
                        newCountry.capital = "none"
                    }
                    internalDB.push(newCountry)
                }))   
                console.log("del internet");
                res.status(200).json(internalDB)
        }
        else{
            console.log("info de mi base de datos");
            res.status(200).json(internalDB)
        }
    }
    
    /* res.status(404).json({msg: "Error", arr: internalDB}) */
})

router.get("/:idPais", (req,res)=>{
    res.status(200).send(`/countries/${req.params.idPais}`)
})



module.exports = router