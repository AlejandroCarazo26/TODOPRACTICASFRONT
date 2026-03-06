"use client";


import { useEffect, useState } from "react";
import { Country } from "./types/pais";
import { getAllCountries } from "./api/todospaises";
import "./page.css";
import CountryByName from "./components/country";


const Home = () => {

  const [inputText, setInputText] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() =>{

    setLoading(true);
    setError(null);

    getAllCountries()
      .then((res) => {
        setCountries(res.data);
     })
     .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
     })
     .finally(() => {
        setLoading(false);
     })

  }, []);


  return (
    <div className="cocktails-container">
      <div className="search-section"> 
        <h1> Bienvenido al buscador de Paises </h1>

        <input className="searchinput"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key=== "Enter"){
            setSearch(inputText);
          }
        }}> 
        </input>


        <button 
          className="searchButton"
          onClick={() => setSearch(inputText)}
        > Search </button>
      </div>

        {loading && <h1> Loading... </h1>}
        {error && <h2> {error} </h2>}

        <div className="results-container">
          {search && countries
            .filter((x) =>
              x.name.common.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 20)
            .map((e) => (
              <CountryByName country={e} key={e.name.common}/>
            ))}
        </div>

    </div>

  );

};

export default Home;