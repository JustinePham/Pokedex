import { ReactNode, useEffect, useRef, useState } from 'react';
import './App.css';
import { PokemonSearch } from './pokemonSearchField';
import { PokemonContext, useApi } from './PokemonContext';
import Abilities from './PokemonAbilities';
import { Stats } from './PokemonStats';
import { Description } from './PokemonDescription';
import './componentStyles.scss';
import { PokemonSprites } from './PokemonSprites';
import EvolutionChain from './PokemonEvolutionChain';
import { Pokemon } from 'pokenode-ts';


interface BasicInfoComponentProps {
  children: ReactNode; // Type for anything React can render
}
function App() {
  const [pokemon, setPokemon] = useState({} as Pokemon);
  const pokemonAPI = useApi();

  const idRandomizer = () => Math.floor(Math.random() * 1026);
  const initial = useRef(idRandomizer());

  useEffect(() => {
    // only run this once when starting up
    if (initial.current) {
      pokemonAPI.getPokemonById(initial.current).then((result) => {
        setPokemon(result as Pokemon);
        console.log(result);
      });
    }
  }, []);

  // capture pokemon data from search
  const searchCallback = (data: Pokemon) => setPokemon(data);

  return (
    <PokemonContext.Provider value={pokemonAPI}>
      <h1>Pokédex</h1>
      <div className="card">
        <PokemonSearch emitData={searchCallback} />
        <OfficialArtwork url={pokemon.sprites} />
        <BasicInfoComponent>
          <Header name={pokemon.name} id={pokemon.id} types={pokemon.types} />
          <PokemonSprites sprites={pokemon.sprites} />
          <EvolutionChain species={pokemon.species} id={pokemon.id} />
          <Description species={pokemon.species} id={pokemon.id} />
          <Stats id={pokemon.id} pstats={pokemon.stats} />
          <Abilities id={pokemon.id} abilities={pokemon.abilities} />
          <PokemonMoves moves={pokemon.moves} />
        </BasicInfoComponent>
      </div>
    </PokemonContext.Provider>
  );
}

// other components to add
export function Header(props: { name: string, id: number, types: any[]}) {
  return (
    <div className="info-row">
      <h2 className=" pokemon-name">{props.name ? props.name.toUpperCase() : '---'}</h2>
      <h2 className=" pokemon-id">ID: #{props.id}</h2>
      <ElementTypes types={props.types} />
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
export function PokemonMoves(props: {moves: any[]}) {
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

export function BasicInfoComponent({ children }: BasicInfoComponentProps) {
  return <div className="basic-info">{children}</div>;
}

export function ElementTypes(props: {types: any[]}) {
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

export function OfficialArtwork(props: any) {
  if (!props?.url) {
    return <div></div>;
  }

  let url = props?.url?.other['official-artwork'].front_default;
  return (
    <div style={{ 
      backgroundImage: `url(${url})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '300px',
      backgroundSize: 'contain'
      }}>
      {/* <img src={url}/> */}
    </div>
  );
}

export default App;
