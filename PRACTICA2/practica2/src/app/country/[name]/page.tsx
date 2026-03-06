"use client"


import { getCountryByName } from "@/app/api/pais";
import { Country } from "@/app/types/pais";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./countryDetail.css";

const CountryConcreto = () => {
    const router = useRouter();
    const {name} = useParams();

    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [miErrorcillo, setError] = useState<string>("");

    useEffect(() => {

    getCountryByName(String(name))
        .then((res) => {  

            if(res.data.length > 0){
                setCountry(res.data[0]);
                setError("");
            } else {
                setError("No se encontró el país");
            }

        })
        .catch((e) => {
            setError(`Error cargando los datos: ${e.message ? e.message : e}`);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [name]); 

    

    return (
        <div className="country-detail-container">
            {loading && <h1>Loading...</h1>}
            {miErrorcillo && <h2>{miErrorcillo}</h2>}

            {country && (
                <div className="country-detail-card">
                    
                    <img 
                        className="country-detail-flag"
                        src={country.flags.png}>
                    </img>

                    <h1 className="country-detail-title">
                        {country.name.official ?country.name.official : country.name.common}
                    </h1>

                    <p className="country-detail-info"> CAPITAL: {country.capital}</p>
                    <p className="country-detail-info"> SUBREGION: {country.subregion}</p>
                    <p className="country-detail-info"> Languages: {Object.values(country.languages).join(", ")}</p>
                    <p className="country-detail-info"> Currencies: {Object.values(country.currencies).map(p=>p.name)}</p>
                    <button className="country-back-button" onClick={() => router.back()}> Página Principal </button>
                
                </div>
            )}
        </div>
    );
};

export default CountryConcreto;