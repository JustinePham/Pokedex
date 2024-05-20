import { useState } from 'react';
import './App.css';
import { useApi } from './PokemonContext';

export function PokemonSearch(props: {emitData: (data: any) => void}) {
  const [value, setValue] = useState('');
  const api = useApi();
  const handleInput = () =>
    (async () => {
      const input = parseFloat(value);
      try {
        // check if number or is string
        const pokemonData =
          !isNaN(input) && isFinite(input)
            ? await api.getPokemonById(input)
            : await api.getPokemonByName(value.toLowerCase());
      //  console.log (pokemonData)
        props.emitData(pokemonData);
      } catch (error) {
        console.error(error);
      }
    })();

  return (
    <>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder="enter name or id"
      />
      <button className="search-btn" onClick={handleInput}>
        Search
      </button>
    </>
  );
}

export default PokemonSearch;
