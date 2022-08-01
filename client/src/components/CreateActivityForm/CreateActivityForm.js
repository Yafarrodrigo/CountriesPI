import React, { useEffect, useState } from 'react'
import styles from './CreateActivityForm.module.css'
import axios from 'axios'
import skullIcon from '../CountryDetails/skull.png'
import { getAllCoutries } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function CreateActivityForm() {

    const [activityData, setActivityData] = useState({
        name: "",
        difficulty: 3,
        duration: 1,
        season: "Summer",
        countries: []
    })

    const [errors, setErrors] = useState({
        nameError: false,
        durationError: false,
        countryError: false
    })

    const [suggestions, setSuggestions] = useState([{}])
    const [inputCountry, setInputCountry] = useState({
        name: "",
        id: "",
        img: ""
    })
    const [enableSuggestion, setEnableSuggestion] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCoutries())
    },[dispatch])

    useEffect(()=>{
        checkForErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activityData, inputCountry])

    useEffect(()=>{
        if(inputCountry.name.length){
            axios.get(`http://localhost:3001/countries?onlyName=${inputCountry.name}`)
            .then(response => {
                if(response.data.length){
                    setSuggestions(response.data)
                }
                else setSuggestions([])
            })
        }else{
            setInputCountry({name:"", id: "", img:""})
            setSuggestions([])
        }

        if(suggestions.includes(inputCountry)) setEnableSuggestion(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputCountry.name])

    const handleInputCountry = (e) => {
        suggestions.forEach(sugg => {
            if(sugg.name.toLowerCase() === e.target.innerText.toLowerCase()){
                setInputCountry({name :e.target.innerText, id: e.target.id})
                setSuggestions([])
                setEnableSuggestion(false)
            }
        })
    }

    const onSeasonChanged = (e) =>{
        setActivityData({
            ...activityData,
            season: e.target.value
        })
    }

    const handleChange = (e) => {
        setActivityData({
            ...activityData,
            [e.target.name]: e.target.value
        })
    }

    const handleCountryChange = (e) => {
        setInputCountry({...inputCountry, name: e.target.value}) 
        suggestions.forEach(sugg => {
            if(sugg.name.toLowerCase() === e.target.value.toLowerCase()){
                setEnableSuggestion(false)
            }
            else{
                setEnableSuggestion(true)
            }})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!errors.nameError && !errors.durationError && !errors.countryError){
            axios.post("http://localhost:3001/activities", {
                ...activityData,
                 difficulty: activityData.difficulty.toString()
                })
                .then(({data}) => {
                    alert(`Activities created, failed: ${data.couldntCreate}`)
                    setActivityData({
                        name: "",
                        difficulty: 3,
                        duration: 1,
                        season: "Summer",
                        countries: []
                    })
                    setInputCountry({name: "", id: "", img: ""})
                    setSuggestions([])
                    dispatch(getAllCoutries())
                })
                .catch(error => console.log(error))
        }
        else{
            alert("Form incomplete!")
        }
    }

    const checkForErrors = () =>{
        let newErrors = {...errors}
        if(!activityData.name.length){
            newErrors.nameError = true
        }else{
            newErrors.nameError = false
        }

        if(!activityData.countries.length){
            newErrors.countryError = true
        }else{
            newErrors.countryError = false
        }

        if(activityData.duration < 1 || activityData.duration > 72){
            newErrors.durationError = true
        }else{
            newErrors.durationError = false
        }

        setErrors(newErrors)
    }

    const handleAddCountry = (e) => {
        e.preventDefault()
        suggestions.forEach( sugg => {
            
            if(sugg.name === inputCountry.name){
                if(!activityData.countries.find( country => country.id === sugg.id)){
                    const upperName = sugg.name.charAt(0).toUpperCase() + sugg.name.slice(1);
                    setActivityData({
                        ...activityData,
                        countries: [...activityData.countries, {name: upperName, id:sugg.id, img: sugg.flagImg}]
                    })
                    setInputCountry({name: "", id: "", img: ""})
                }
            }
        })  
    }

    const handleRemoveCountry = (e) => {
        e.preventDefault()
        const deleteCountryId = e.target.id.split("-")[1]
        setActivityData({
            ...activityData,
            countries: activityData.countries.filter( country => country.id !== deleteCountryId)
        })
    }

    const increaseDifficulty = (e) => {
        e.preventDefault()
        if(activityData.difficulty < 5){
            setActivityData({
                ...activityData,
                difficulty: activityData.difficulty + 1
            })
        }
    }

    const decreaseDifficulty = (e) => {
        e.preventDefault()
        if(activityData.difficulty > 1){
            setActivityData({
                ...activityData,
                difficulty: activityData.difficulty - 1
            })
        }
    }

    const handlePreset = (e) => {
        e.preventDefault()
        const preset = {...activityData}
        switch(e.target.id){
            case "presetFood":
                preset.name = "Search for food"
                preset.difficulty = 2
                preset.duration = 4
                preset.season = "Spring"
                break

            case "presetSurvivors":
                preset.name = "Search for other survivors"
                preset.difficulty = 3
                preset.duration = 8
                preset.season = "Summer"
                break

            case "presetShelter":
                preset.name = "Build a shelter"
                preset.difficulty = 4
                preset.duration = 12
                preset.season = "Autumn"
                break

            case "presetSecure":
                preset.name = "Kill zombies, secure the area"
                preset.difficulty = 5
                preset.duration = 4
                preset.season = "Winter"
                break
            
            default:
                return
        }
        setActivityData(preset)
    }

  return (
    <>
        <div className={styles.presets}>
            <h3>Presets:</h3>
            <button id="presetFood" onClick={handlePreset}>Search for food</button>
            <button id="presetSurvivors" onClick={handlePreset}>Search for survivors</button>
            <button id="presetShelter" onClick={handlePreset}>Build a shelter</button>
            <button id="presetSecure" onClick={handlePreset}>Secure area</button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Activity Creator</h1>
            <div className={styles.category}>
                <label htmlFor="name">Name:</label>
                <input 
                    className={errors.nameError ? styles.notOk : styles.ok}
                    type="text" 
                    name="name" 
                    value={activityData.name} 
                    onChange={handleChange}
                    placeholder='name of the activity...'
                    autoFocus
                />
            </div>
        <div className={styles.category}>
        <label htmlFor="difficulty">Difficulty:</label>
            <div id={styles.difficultyCategory}>
                <button onClick={decreaseDifficulty}>-</button>
                {[...Array(activityData.difficulty)].map((x, index) =>
                  <img src={skullIcon} key={index} alt="skullIcon" />
                )}
                <button onClick={increaseDifficulty}>+</button>
            </div>
        </div>
        <div className={styles.category}>
            <label htmlFor="duration">Duration (hours) :</label>
            <input
                id={styles.durationInput}
                className={errors.durationError ? styles.notOk : styles.ok}
                type="number"
                min={1}
                max={72}
                value={activityData.duration} 
                onChange={handleChange}
                name="duration" 
            />
        </div>
        <div className={styles.category}>
            <label htmlFor="season">Season:</label>
            <div className={styles.radioInputs}>
                <label htmlFor="Summer"> Summer 
                    <input type="radio" id="Summer" value="Summer" name="season"
                    onChange={onSeasonChanged} checked={activityData.season === "Summer"}
                    />
                </label>
                <label htmlFor="Summer"> Autumn
                    <input type="radio" id="Autumn" value="Autumn" name="season"
                    onChange={onSeasonChanged} checked={activityData.season === "Autumn"}
                    />
                </label>
                <label htmlFor="Summer"> Winter
                    <input type="radio" id="Winter" value="Winter" name="season"
                    onChange={onSeasonChanged} checked={activityData.season === "Winter"}
                    />
                </label>
                <label htmlFor="Summer"> Spring
                    <input type="radio" id="Spring" value="Spring" name="season"
                    onChange={onSeasonChanged} checked={activityData.season === "Spring"}
                    />
                </label>
            </div>
        </div>

        <div className={styles.category}>
            <label htmlFor="countriesSelected">Select country</label>
            <div className={styles.countriesSearch}>
                <div className={styles.countryInputContainer}>
                    <input 
                        className={errors.countryError ? styles.notOk : styles.ok}
                        onChange={handleCountryChange} 
                        onFocus={()=>setEnableSuggestion(true)}
                        value={inputCountry.name} 
                        type="text"
                        name="countrySelection" 
                        id="countrySelection" 
                        autoComplete='off'
                    />
                    <button className={styles.addButton} onClick={handleAddCountry}> add </button>
                </div>
                <div className={styles.suggestionList}>
                    
                {
                    enableSuggestion && suggestions.map( (item, index) => (
                        <div 
                            key={index}
                            id={item.id}
                            className={styles.countryOption}
                            onClick= {handleInputCountry}
                        > 
                        <img src={item.flagImg} alt={`${item.name} flag`} />
                        <span>{item.name} </span>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className={styles.countriesSelected}>
                {activityData.countries.map( (country,index) => (
                    <div className={styles.addedCountriesContainer} key={index}>
                        <div style={{display: "flex", width:"80%"}}>
                            <img className={styles.flagImg} src={country.img} alt={`${country.name} flag`} />
                            <h4 id={country.id}>{country.name}</h4>
                        </div>
                        <button id={`remove-${country.id}`} onClick={handleRemoveCountry} className={styles.countryRemoveButton}>remove</button>
                    </div >
                ))}
            </div>
        </div>

        <button className={styles.submitButton} type="submit">Create!</button>
    </form>
    </>
  )
}
