import { useEffect, useState } from 'react';
import { useApi } from './PokemonContext';
import { PokemonSprite } from './PokemonSprites';

export function EvolutionChain(props) {
  const [chain, setChain] = useState([]);
  const api = useApi();

  const getEvolutionChain = (obj) => {
    let evolutionChain = [];
    let current = obj.chain;
    do {
      const speciesName = current.species.name;
      evolutionChain.push(speciesName);
      current = current.evolves_to[0];
    } while (current && current.hasOwnProperty('species'));
    setChain(evolutionChain);
    return evolutionChain;
  };

  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      if (props.pokemon.species) {
        try {
          const fetchedSpecies = await api.getPokemonSpeciesById(
            props.pokemon.id
          );
          return fetchedSpecies;
        } catch (error) {
          console.log(error);
          return {};
        }
      }
    };

    fetchPokemonSpecies().then((species) => {
      if (species) {
        fetch(species.evolution_chain.url)
          .then((result) => result.json())
          .then((evolution) => {
            setChain(getEvolutionChain(evolution));
          });
      }
    });
  }, [props.pokemon]);

  return (
    <div className="info-column-100 evolution-container">
      <h3>Evolution Chain</h3>

      {chain?.map((evolution) => (
        <PokemonSprite name={evolution} key={evolution + props.pokemon.id} />
      )) || <div>no data</div>}
    </div>
  );
}
