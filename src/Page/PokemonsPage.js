import React, {Component} from 'react'
// import FetchJS from './Fetch.js'
// import {getAllPokemons} from './Function/Fetch.js'
import Pokemons from './../Component/ListofPokemon'
import Pagination from '@material-ui/lab/Pagination'
import Slider from '@material-ui/core/Slider';
import ls from 'local-storage'

class PokemonsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPage:0,
            pageLimit:16,
            isPaginationDisabled:true,
            isSliderDisabled:true,
            query:[],
            pokemons:[],
            
        }
    }

    getAllPokemons(limit, offset) {
        const gqlQuery = `
            query pokemons($limit: Int, $offset: Int) {
                pokemons(limit: $limit, offset: $offset) {
                    count
                    next
                    previous
                    status
                    message
                    results {
                        id
                        name
                        image
                    }
                }
            }
        `;
    
        const gqlVariables = {
            limit: limit,
            offset: offset,
        }
    
        fetch('https://graphql-pokeapi.vercel.app/api/graphql', {
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: gqlQuery,
                variables: gqlVariables,
            }),
            method: 'POST',
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            this.setState({
                query:res.data.pokemons,
                totalPage: (Math.ceil(res.data.pokemons.count/limit)),
                isPaginationDisabled: false,
                isSliderDisabled: false,
            })
            this.initPokemons();
        })
    
    }

    initPokemons() {
        let pokemons = this.state.query.results

        let temp = []
        pokemons.map((row,index) => {
            const [id, image, name, own] = ["id","image","name", "own"]
            let temp_pokemon = {}
            temp_pokemon[id] = row.id
            temp_pokemon[image] = row.image
            temp_pokemon[name] = row.name
            temp_pokemon[own] = ls.get(row.name+'_own')
            temp.push(temp_pokemon)
        })

        this.setState({
            pokemons:temp
        })
    }

    handleCatch = () => {
        this.initPokemons()
    }

    handlePaginationChange = (e,v) => {
        this.setState({currentPage: v, isPaginationDisabled: true});
        this.getAllPokemons(this.state.pageLimit,(this.state.pageLimit*(v-1)))
    }

    handleSliderChange = (e,v) => {
        this.setState({pageLimit: v, isSliderDisabled: true, currentPage: 1});
        this.getAllPokemons(v,(0))
    }

    componentDidMount() {
        this.getAllPokemons(this.state.pageLimit,0)
    }

    render (){
        return(
            <div className="row gap-y">
                <div className="col-md-4 offset-md-8 mt-3">
                    <span>Pokemon Show Limit Per Page</span>
                    <Slider
                        defaultValue={this.state.pageLimit ?? 8}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={8}
                        marks
                        min={8}
                        max={80}
                        disabled={this.state.isSliderDisabled ?? true}
                        onChangeCommitted={this.handleSliderChange}
                    />
                </div>
                <div className="col-md-12">
                    <Pokemons pokemonsData={this.state.pokemons} handleCatch={this.handleCatch}/>
                </div>
                <div className="col-md-4 offset-md-4">
                    <Pagination count={this.state.totalPage} page={this.state.currentPage} onChange={this.handlePaginationChange} disabled={this.state.isPaginationDisabled}/>
                </div>
            </div>
        )
    }
}

export default PokemonsPage