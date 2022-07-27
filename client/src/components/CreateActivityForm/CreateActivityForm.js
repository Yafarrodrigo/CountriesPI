import React, { useEffect, useState } from 'react'
import styles from './CreateActivityForm.module.css'
import axios from 'axios'
import { getAllCoutries } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function CreateActivityForm() {

    const [activityData, setActivityData] = useState({
        name: "",
        difficulty: "3",
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
            axios.post("http://localhost:3001/activities", activityData)
                .then(({data}) => {
                    alert(`Activities created, failed: ${data.couldntCreate}`)
                    setActivityData({
                        name: "",
                        difficulty: "3",
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

        if(activityData.duration < 1){
            newErrors.durationError = true
        }else{
            newErrors.durationError = false
        }

        setErrors(newErrors)
    }

    const handleAddCountry = (e) => {
        e.preventDefault()
        suggestions.forEach( sugg => {
            if(sugg.id === inputCountry.id){
                if(!activityData.countries.find( country => country.id === sugg.id)){
                    const upperName = sugg.name.charAt(0).toUpperCase() + sugg.name.slice(1);
                    setActivityData({
                        ...activityData,
                        countries: [...activityData.countries, {name: upperName, id:sugg.id, img: sugg.flagImg}]
                    })
                }
            }
        })  
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
                id={styles.durationInput}
                className={errors.durationError ? styles.notOk : styles.ok}
                type="number"
                min={1}
                max={31}
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
                        {item.name} 
                        </div>
                    ))
                }
                </div>
            </div>
            <div className="countriesSelected">
                {activityData.countries.map( (country,index) => (
                    <div className={styles.addedCountriesContainer} key={index}>
                        <img className={styles.flagImg} src={country.img} alt={`${country.name} flag`} />
                        <h4 id={country.id}>{country.name}</h4>
                    </div >
                ))}
            </div>
        </div>

        <button className={styles.submitButton} type="submit">Create!</button>
    </form>
  )
}
