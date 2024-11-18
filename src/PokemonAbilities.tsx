import { memo, useEffect, useState } from 'react';
import { useApi } from './PokemonContext';
import { PokemonAbility, Ability } from 'pokenode-ts';

 const Abilities = (props: {id: number, abilities: PokemonAbility[]}) => {
  //console.log(props)
  const api = useApi();
  const [abilities, setAbilities] = useState([] as Ability[]);

  const fetchAbilities = async () => {
    try {
       
      const promises = props.abilities.map((item) =>
        api.getAbilityByName(item.ability.name)
      );
      let results = await Promise.all(promises);

      // removes duplicates
      return results.reduce((accumulator: Ability[], current) => {
        if (!accumulator.includes(current)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetAbilities = async () => {
      if (props.abilities && props.abilities.length) {
        const fetchedAbilities = await fetchAbilities();
        setAbilities(fetchedAbilities);
      }
    };
    fetchAndSetAbilities();
  }, [props.abilities]);

  const processAbility = (effectEntries: any[]) => {
    let b = effectEntries.filter((entry) => entry.language.name === 'en');
    return b[0];
  };
  return (
    <div className="abilities-container">
      <h4>Abilities</h4>
      {abilities.map((ability) => {
        return (
          <div className="ability-row" key={ability.name + props.id}>
            <h4>{ability.name}</h4>
            <p>
              {processAbility(ability.effect_entries)?.short_effect || ' --- '}
            </p>
          </div>
        );
      })}
    </div>
  );
}
export default memo(Abilities);
