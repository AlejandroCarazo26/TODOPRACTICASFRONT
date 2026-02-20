import type { Character } from "../../types/character";
import "./charactercard.css";


export const CharacterCard = ({character} : {character: Character}) => {
    return(
    <div className="card">
      <h2 className="name">{character.name}</h2>
      <p>Género: {character.gender}</p>
      <p>Año de nacimiento: {character.birth_year}</p>
    </div>
    )
}


