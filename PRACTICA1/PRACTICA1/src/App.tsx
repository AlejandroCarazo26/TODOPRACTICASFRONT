import { useEffect, useState } from "react";
import "./App.css";
import { CharacterList } from "./components/CharacterList/characterlist";
import { Loader } from "./components/loader/loader";
import { Error } from "./components/error/error";
import { api } from "./api/api";
import type { Character } from "./types/character";

const App = () => {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
  api.get("https://swapi.dev/api/people/")
    .then((e) => {
      setCharacters(e.data.results);
      setNextPage(e.data.next);
    })
    .catch((e) => {
      setError(`Error cargando los datos: ${e.message}`);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);


  const loadMore = () => {
    if (!nextPage) return;

    setLoading(true);

    api.get(nextPage)
      .then((e) => {
        setCharacters(prev => [...prev, ...e.data.results]);
        setNextPage(e.data.next);
      })
      .catch((e) => {
        setError(`Error cargando más personajes: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };





  return (
    <div className="mainContainer">

      {loading && <Loader/>}

      {error && <Error error={error}/>}

      
      {nextPage && (
        <button className="loadMoreButton" onClick={loadMore}>
          Siguiente Página
        </button>
      )}

      <CharacterList personajes={characters} />


    </div>

  );
};

export default App;
