import ls from 'local-storage';
import './ListofPokemon.css';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Own</th>
                <th>Act</th>
            </tr>
        </thead>
    )
}

const catchPokemon = (row, props) => {
    ls.set(row.name, (ls.get(row.name) !=undefined ? (ls.get(row.name)+1): 1));
    props.handleCatch()
}

const releasePokemon = (row, props) => {
    ls.set(row.name, 0);
    props.handleCatch();
}

const zeroPad = (num, places) => { //https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

const PokemonsList = (props) => {

    const rows = props.pokemonsData.map((row, index) => {
        let id = zeroPad(row.id,3);
        return (
            <div className="col-6 col-md-3" key={index}>
                <div className="card">
                    <div className="image-frame">
                        <img className="card-img-top pokemon-image-first" src={row.image}
                            // onMouseEnter={e => {
                            //     let id = zeroPad(row.id,3);
                            //     e.currentTarget.src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+id+'.png'
                            // }}
                            // onMouseLeave={e => e.currentTarget.src=row.image}
                            ></img>
                        <img className="card-img-top pokemon-image-second" src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+id+'.png'}></img>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-capitalize">{row.name}</h5>
                        <p className="card-text">{row.own || 0}</p>
                    </div>
                </div>
            </div>
            // <tr key={index}>
            //     <td><img className="img-fluid" srcSet={row.image}></img></td>
            //     <td>{row.name}</td>
            //     <td>{row.own || 0}</td>
            //     <td>
            //         <button className="btn btn-primary" onClick={() => catchPokemon(row, props)}>Catch</button>
            //         <button className="btn btn-primary mt-1 mt-md-0 ml-0 ml-md-1" onClick={() => releasePokemon(row,props)}>Release</button>
            //         {/* <button className="btn btn-primary mt-1" onClick={()=>ls.clear()}>Clear</button> */}
            //     </td>
            // </tr>
        )
    })

    return (
        rows
    )
}

const Pokemons = (props) => {
    const {pokemonsData, handleCatch} = props

    return (
        <div className="row gap-y mt-3">
            <PokemonsList pokemonsData={pokemonsData} handleCatch={handleCatch}/>
        </div>
        // <table className="table">
        //     <TableHeader/>
        //     {
        //         pokemonsData &&
        //         <TableBody pokemonsData={pokemonsData} handleCatch={handleCatch}/>
        //     }
        // </table>
    )
}

export default Pokemons