import React, { Component } from 'react'
import Title from './Title'
import './StarWars.css'

class StarWars extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            swapiData: null,
            list: [],
            hwData: null,
        }
    }

    handleSubmit(e) {
        const { inputValue } = this.state
        e.preventDefault()
        const num = inputValue
        const url = `https://swapi.dev/api/people/${num}`
        const hwURL = `https://swapi.dev/api/planets/${num}/`

        const response = fetch(url)
        const hwResponse = fetch(hwURL)
        console.log(response)

        response.then(res => {
            console.log(res)
            if (res.ok) {
                return res.json()
            }
        }).then((json) => {
            this.setState({ swapiData: json })
        }).catch((err) => {
            this.setState({ swapiData: null })
            console.log('Fetching Error!')
            console.log(err.message)
        })

        hwResponse.then(res => {
            console.log(res)
            if (res.ok) {
                return res.json()
            }
        }).then((json) => {
            this.setState({ hwData: json })
        }).catch((err) => {
            this.setState({ hwData: null })
            console.log('Fetching Error!')
            console.log(err.message)
        })
    }

    addCharacterToList(value) {
        this.setState({
            list: [...this.state.list, value]
        })
    }

    renderCharacterList() {
        const { list } = this.state
        const characters = list.map((item) => {
            return <div>{item}</div>
        })
        console.log(list)
        return characters
    }

    renderCharacter() {
        const { swapiData, hwData } = this.state
        if (swapiData === null) {
            // If there is no data return undefined
            return undefined
          }

        const { name, height, mass, hair_color, eye_color } = swapiData

        return (
            <div className="character-details">
                <Title name={name} />
                <p>Height: {height}</p>
                <p>Mass: {mass}</p>
                <p>Hair Color: {hair_color}</p>
                <p>Eye Color: {eye_color}</p>
                <p>Homeworld: {hwData.name}</p>
                <button
                    onClick={(e) =>
                        this.addCharacterToList(name)
                    }>Save</button>
            </div>
        )

    }

    render() {
        const { inputValue} = this.state
        const character = this.renderCharacter()
        const characterList = this.renderCharacterList()

        return (
            <div>
                <form
                    className="input-form"
                    onSubmit={
                        e => this.handleSubmit(e)
                    }>
                    <input
                        value={inputValue}
                        onChange={e =>
                            this.setState({ inputValue: e.target.value })}
                            placeholder="enter integer number"
                        />
                    <button>Submit</button>
                </form>
                {character}
                Your Saved List:
                {characterList}
            </div>
        )
    }
}

export default StarWars