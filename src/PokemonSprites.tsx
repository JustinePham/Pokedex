import { useEffect, useState } from 'react';
import { useApi } from './PokemonContext';
import './componentStyles.scss';

export function PokemonSprite(props: { name: string }) {
  const [sprites, setSprites] = useState([]);
  const api = useApi();
  useEffect(() => {
    const fetchSprites = async () => {
      try {
        const result = await api.getPokemonByName(props.name);
        setSprites(result.sprites);
        return result.sprites;
      } catch (error) {
        console.log(error);
        return {};
      }
    };
    fetchSprites();
  }, [props.name]);
  return (
    <img key={props.name} title={props.name} src={sprites.front_default} />
  );
}

export function PokemonSprites(props: { sprites: any}) {
  const hasFemaleSprites =
    props.sprites?.front_female || props.sprites?.back_female;

  return (
    <div className="sprites-container">
      <div className="sprite-row default">
        {hasFemaleSprites ? (
          <span className="material-symbols-outlined sprite-icon">male</span>
        ) : (
          <h4>default</h4>
        )}
        <img src={props.sprites?.front_default} />
        <img src={props.sprites?.back_default} />
      </div>
      {hasFemaleSprites ? (
        <div className="sprite-row female">
          <span className="material-symbols-outlined sprite-icon">female</span>
          <img src={props.sprites?.front_female} />
          <img src={props.sprites?.back_female} />
        </div>
      ) : (
        <></>
      )}
      <div className="sprite-row shiny">
        <span className="material-symbols-outlined sprite-icon">star</span>
        <img src={props.sprites?.front_shiny} />
        <img src={props.sprites?.back_shiny} />
      </div>
    </div>
  );
}
