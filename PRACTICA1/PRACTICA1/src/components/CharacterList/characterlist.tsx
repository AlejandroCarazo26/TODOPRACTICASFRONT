
import { useEffect, useRef } from 'react';
import type { Character } from '../../types/character'
import { CharacterCard } from '../CharacterCard/charactercars';


export const CharacterList = ({personajes}: {personajes: Character[]}) => {

    const crawlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (crawlRef.current) {
      // Quita animación
      crawlRef.current.style.animation = "none";

      // Fuerza reflow para que el navegador reinicie
      void crawlRef.current.offsetHeight;

      // Vuelve a aplicar animación
      crawlRef.current.style.animation = "crawl 45s linear";
    }
  }, [personajes]);

  return (
    <div ref={crawlRef} className="crawl">
      {personajes.map((e) => (
        <CharacterCard key={e.name} character={e} />
      ))}
    </div>
  );
};