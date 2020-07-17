import React, { Component } from 'react'
import Title from './Title'

class StarWars extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            swapiData: null,
            list: [],
        }
    }

    handleSubmit(e) {
        const { inputValue } = this.state
        e.preventDefault()
        const num = inputValue
        const url = `https://swapi.dev/api/people/${num}`

        const response = fetch(url)
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
        const { swapiData } = this.state
        if (swapiData === null) {
            // If there is no data return undefined
            return undefined
          }

        const { name, height, mass, hair_color, eye_color } = swapiData

        return (
            <div>
                <Title name={name} />
                <p>Height: {height}</p>
                <p>Mass: {mass}</p>
                <p>Hair Color: {hair_color}</p>
                <p>Eye Color: {eye_color}</p>
                <button
                    onClick={(e) =>
                        this.addCharacterToList(name)
                    }>Save</button>
            </div>
        )

    }

    render() {
        const { inputValue } = this.state
        const character = this.renderCharacter()
        const characterList = this.renderCharacterList()
        return (
            <div>
                <Title name="Star Wars" />
                <form
                    className="input-form"
                    onSubmit={
                        e => this.handleSubmit(e)
                    }>
                    <input
                        value={inputValue}
                        onChange={e =>
                            this.setState({ inputValue: e.target.value })}
                            placeholder="enter number: 1-9"
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