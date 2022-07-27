import React, { useEffect, useState } from 'react'
import styles from './CreateActivityForm.module.css'
import axios from 'axios'
import { getAllCoutries } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function CreateActivityForm() {

    const [activityData, setActivityData] = useState({
        countryId: "",
        name: "",
        difficulty: "3",
        duration: "",
        season: "Summer"
    })

    const [errors, setErrors] = useState({
        nameError: false,
        durationError: false,
        countryError: false
    })

    const [suggestions, setSuggestions] = useState([{}])
    const [inputCountry, setInputCountry] = useState("")
    const [enableSuggestion, setEnableSuggestion] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        checkForErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activityData, inputCountry])

    useEffect(()=>{
        if(inputCountry.length){
            axios.get(`http://localhost:3001/countries?onlyName=${inputCountry}`)
            .then(response => {
                if(response.data.length){
                    setSuggestions(response.data)
                }
                else setSuggestions([])
            })
        }else{
            setInputCountry("")
            setSuggestions([])
        }

        if(suggestions.includes(inputCountry)) setEnableSuggestion(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputCountry])

    const handleInputCountry = (e) => {
        setInputCountry(e.target.innerText)
        setActivityData({
            ...activityData,
            countryId: e.target.id
        })
        setSuggestions([])
        setEnableSuggestion(false)
    }

    const onDifficultyChanged = (e) =>{
        setActivityData({
            ...activityData,
            difficulty: e.target.value
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
        setInputCountry(e.target.value)  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!errors.nameError && !errors.durationError && !errors.countryError){
            axios.post("http://localhost:3001/activities", {...activityData,id: activityData.countryId})
                .then(response => {
                    alert(response.data.msg)
                    setActivityData({
                        countryId: "",
                        name: "",
                        difficulty: "3",
                        duration: "",
                        season: "Summer"
                    })
                    setInputCountry("")
                    setSuggestions([])
                    dispatch(getAllCoutries())
                })
                .catch(error => console.log(error))
        }
        else{
            alert("Faltan campos!")
        }
    }

    const checkForErrors = () =>{
        let newErrors = {...errors}
        if(!activityData.name.length){
            newErrors.nameError = true
        }else{
            newErrors.nameError = false
        }

        if(!inputCountry.length){
            newErrors.countryError = true
        }else{
            newErrors.countryError = false
        }

        if(activityData.duration < 1){
            newErrors.durationError = true
        }else{
            newErrors.durationError = false
        }

        setErrors(newErrors)
    }


  return (
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
                />
            </div>
        <div className={styles.category}>
            <label htmlFor="difficulty">Difficulty:</label>
            <div className={styles.radioInputs}>
                <label htmlFor="1"> 1 
                    <input type="radio" id="1" value="1" name="difficulty"
                    onChange={onDifficultyChanged} checked={activityData.difficulty === "1"}/>
                </label>
                <label htmlFor="2"> 2
                    <input type="radio" id="2" value="2" name="difficulty"
                    onChange={onDifficultyChanged} checked={activityData.difficulty === "2"}/>
                </label>
                <label htmlFor="3"> 3 
                    <input type="radio" id="3" value="3" name="difficulty"
                    onChange={onDifficultyChanged} checked={activityData.difficulty === "3"}/>
                </label>
                <label htmlFor="4"> 4 
                    <input type="radio" id="4" value="4" name="difficulty"
                    onChange={onDifficultyChanged} checked={activityData.difficulty === "4"}/>
                </label>
                <label htmlFor="5"> 5 
                    <input type="radio" id="5" value="5" name="difficulty"
                    onChange={onDifficultyChanged} checked={activityData.difficulty === "5"}/>
                </label>

            </div>
        </div>
        <div className={styles.category}>
            <label htmlFor="duration">Duration:</label>
            <input 
                className={errors.durationError ? styles.notOk : styles.ok}
                type="number" 
                value={activityData.duration} 
                onChange={handleChange}
                name="duration" 
                placeholder='duration in days...'
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

        <div className={styles.countriesSearch}>
            <label htmlFor="countriesSelected">Select country</label>
            <input 
                className={errors.countryError ? styles.notOk : styles.ok}
                onChange={handleCountryChange} 
                onFocus={()=>setEnableSuggestion(true)}
                value={inputCountry} 
                type="text"
                name="countrySelection" 
                id="countrySelection" 
                autoComplete='off'
            />
            <div className={styles.suggestionList}>
            {
                enableSuggestion && suggestions.map( (item, index) => (
                    <div 
                        key={index}
                        id={item.id}
                        className={styles.countryOption}
                        onClick= {handleInputCountry}
                    > {item.name} </div>
                ))
            }
            </div>
        </div>
        <div className="countriesSelected"></div>

        <button type="submit">Create!</button>
    </form>
  )
}
