"use client"


import { useRouter } from "next/navigation";
import { Country } from "../types/pais";
import "./country.css"


export const CountryByName = (params: {country?: Country}) => {
    const paramsCountry= params.country;
    const router = useRouter();

    return(
    <div>
        {paramsCountry &&
        <div className="country-card">
            <img 
                className="country-flag" 
                src={paramsCountry.flags.png}>
            </img>
            <div>
               <h1 className="country-name">
                {paramsCountry.name.common.toUpperCase()}
                </h1>

                <p className="country-population"> 
                Poblacion: {paramsCountry.population}
                </p>

               <button
                    className="country-button"
                    onClick={() =>
                        router.push(`/country/${paramsCountry.name.official}`)
                    }
                    >
                    Ver más
               </button>
            </div>
        </div>
        }

    </div>

    );
}

export default CountryByName;