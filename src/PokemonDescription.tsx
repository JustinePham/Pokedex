import { useEffect, useState } from 'react';
import { useApi } from './PokemonContext';
import { PokemonSpecies } from 'pokenode-ts';
import './componentStyles.scss';

export function Description(props: { species: any, id: number}) {
  const [species, setSpecies] = useState({} as PokemonSpecies);
  const api = useApi();
  useEffect(() => {
    const fetchPokemonSpecies = async () => {
      if (props.species) {
        try {
          const fetchedSpecies = await api.getPokemonSpeciesById(
            props.id
          );
          setSpecies(fetchedSpecies);
          return fetchPokemonSpecies;
        } catch (error) {
          console.log(error);
          return {};
        }
      }
    };
    fetchPokemonSpecies();
  }, [props.species, props.id]);

  const getDescription = (obj: PokemonSpecies) => {
    if (!obj.flavor_text_entries) return null;
    const englishDescriptions = obj.flavor_text_entries.filter(
      (entry) => entry.language.name === 'en'
    );
    return englishDescriptions[0].flavor_text;
  };
  return (
    <div className="info-column-100">
      <h3>Description</h3>
      {getDescription(species) || ' --- '}
    </div>
  );
}
