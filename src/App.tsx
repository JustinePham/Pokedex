import { useEffect, useRef, useState } from 'react';
import './App.css';
import { PokemonSearch } from './pokemonSearchField';
import { PokemonContext, useApi } from './PokemonContext';
import { Abilities } from './PokemonAbilities';
import { Stats } from './PokemonStats';
import { Description } from './PokemonDescription';
import './componentStyles.scss';
import { PokemonSprites } from './PokemonSprites';
import { EvolutionChain } from './PokemonEvolutionChain';

function App() {
  const [pokemon, setPokemon] = useState({});
  const pokemonAPI = useApi();

  const idRandomizer = () => Math.floor(Math.random() * 1026);
  const initial = useRef(idRandomizer());

  useEffect(() => {
    // only run this once when starting up
    if (initial.current) {
      pokemonAPI.getPokemonById(initial.current).then((result) => {
        setPokemon(result);
        console.log(result);
      });
    }
  }, []);

  // capture pokemon data from search
  const searchCallback = (data) => {
    setPokemon(data);
    console.log(data);
  };

  return (
    <PokemonContext.Provider value={pokemonAPI}>
      <h1>Pokédex</h1>
      <div className="card">
        <PokemonSearch emitData={searchCallback} />
        <OfficialArtwork url={pokemon.sprites?.other['official-artwork']} />
        <BasicInfoComponent>
          <Header pokemon={pokemon} />
          <PokemonSprites sprites={pokemon.sprites} />
          <EvolutionChain pokemon={pokemon} />
          <Description pokemon={pokemon} />
          <Stats id={pokemon.id} pstats={pokemon.stats} />
          <Abilities id={pokemon.id} abilities={pokemon.abilities} />
          <PokemonMoves moves={pokemon.moves} />
        </BasicInfoComponent>
      </div>
    </PokemonContext.Provider>
  );
}

// other components to add
export function Header(props) {
  const pokemon = props.pokemon;
  return (
    <div className="info-row">
      <h2 className=" pokemon-name">{pokemon?.species?.name.toUpperCase()}</h2>
      <h2 className=" pokemon-id">ID: #{pokemon.id}</h2>
      <ElementTypes types={props.pokemon.types} />
    </div>
  );
}

export function Information() {
  return (
    <>
      <label>Height: </label>
      <label>Weight: </label>
    </>
  );
}
export function PokemonMoves(props) {
  //console.log(props.moves);
  return (
    <div className="moves-container">
      <h3>Moves</h3>
      {props?.moves?.map((move) => {
        return <div key={move.move.name} className="move-item">{move.move.name}</div>;
      })}
    </div>
  );
}

export function BasicInfoComponent({ children }) {
  return <div className="basic-info">{children}</div>;
}

export function ElementTypes(props) {
  return (
    <div className="element-row right">
      {props.types?.map((type) => {
        return (
          <span className={type.type.name} key={type.type.name}>
            {type.type.name}
          </span>
        );
      })}
    </div>
  );
}

export function OfficialArtwork(props) {
  if (!props.url) {
    return <div></div>;
  }
  return (
    <div>
      <img src={props.url.front_default} />
    </div>
  );
}

export default App;
