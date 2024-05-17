import { createContext, useContext } from 'react';
import { PokemonClient } from 'pokenode-ts';

// API context
const pokemonApiClient = new PokemonClient();
export const PokemonContext = createContext(pokemonApiClient);

export const useApi = () => useContext(PokemonContext);
