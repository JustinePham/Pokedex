import { memo, useEffect, useState } from 'react';
import { useApi } from './PokemonContext';
import { PokemonSprite } from './PokemonSprites';

const EvolutionChain = (props: {id: number, species: any})  => {
  const [chain, setChain] = useState([] as string[]);
  const api = useApi();

  const getEvolutionChain = (obj: any) => {
    let evolutionChain: string [] = [];
    let current = obj.chain;
    do {
      const speciesName: string = current.species.name;
      evolutionChain.push(speciesName); // string
      current = current.evolves_to[0];
    } while (current && current.hasOwnProperty('species'));
    setChain(evolutionChain);
    return evolutionChain;
  };

  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      if (props.species) {
        try {
          const fetchedSpecies = await api.getPokemonSpeciesById(
            props.id
          );
          return fetchedSpecies;
        } catch (error) {
          console.log(error);
          return {};
        }
      }
    };

    fetchPokemonSpecies().then((species:any) => {
      if (species) {
        fetch(species.evolution_chain.url)
          .then((result) => result.json())
          .then((evolution) => {
            console.log(evolution)
            return setChain(getEvolutionChain(evolution));
          });
      }
    });
  }, [props.id, props.species]);

  return (
    <div className="info-column-100 evolution-container">
      <h3>Evolution Chain</h3>

      {chain?.map((evolution) => (
        <PokemonSprite name={evolution} key={evolution + props.id} />
      )) || <div>no data</div>}
    </div>
  );
}
export default memo(EvolutionChain);
