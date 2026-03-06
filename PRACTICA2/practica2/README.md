// Para empezar he creado el proyecto utilizando Next.js con React y TypeScript
// usando el comando npx create-next-app@latest "nombredelarchivo"

// Una vez creado el proyecto he instalado axios mediante:

npm install axios

// API utilizada: https://restcountries.com/v3.1
// aunque para la visualización del contenido de la api de manera manual se ha de eliminar el "v3.1" así:  https://restcountries.com/



// Esta API permite obtener información sobre países como: nombre, bandera, población, capital, idiomas, monedas, etc.
// ESTRUCTURA DEL PROYECTO

// El proyecto está organizado en diferentes carpetas para separar responsabilidades:
// api: configuración de axios y llamadas a la API
// components: componentes visuales reutilizables
// types: definición de tipos TypeScript, en este caso, el tipo Country
// country/[name]: página dinámica para el detalle de cada país
// page.tsx: página principal con el buscador
// css: estilos de los distintos componentes para archivo tsx

//DESGLOSE DEL CONTENIDO DE CARPETAS:
// api/api.ts:

// Aquí he creado una instancia de axios con:

// export const api = axios.create({
//   baseURL: "https://restcountries.com/v3.1"
//   timeout: 5000
// });
// Esto permite reutilizar la base de la API sin tener que escribir
// toda la URL en cada petición y tiene un tiempo de espera de respuesta de 5 segundos.



// api/todospaises.ts:

// Esta función obtiene todos los países necesarios para el buscador.
// Se utiliza el endpoint:

// ´/all?fields=name,flags,population´
// Según decía el enunciado, de esta forma solo se descargan los campos necesarios para mostrar las tarjetas del buscador.




// api/pais.ts:

// Esta función obtiene la información completa de un país concreto.
// Utiliza el endpoint:

// ´/name/{name}´
// El nombre se recibe desde la ruta dinámica del router.




// types/pais.ts:

// Aquí simplemente he definido el tipo Country en TypeScript.

// Esto permite trabajar con los datos de la API de forma segura para evitar errores al acceder a propiedades.




// PAGE PRINCIPAL (src/app/page.tsx)

// En la página principal se encuentra el buscador de países.
// Se utilizan varios estados con useState:

// inputText: texto introducido en el buscador
// search: texto usado para filtrar países
// countries: lista completa de países
// loading: estado de carga
// error: posibles errores de la API

// useEffect se ejecuta una sola vez al montar el componente y realiza la petición para obtener todos los países.

// Una vez obtenidos los países se guardan en el estado "countries".
// El buscador funciona filtrando los países con:

// countries.filter(x =>
//   x.name.common.toLowerCase().includes(search.toLowerCase())
// )
// Además se limita el resultado a 20 países para evitar
// renderizar demasiados elementos a la vez con .slice(0, 20).
// Cada país se muestra usando el componente CountryByName.



// COMPONENTE CountryByName (src/app/components/country.tsx)

// Este componente muestra una tarjeta con:
// Bandera del país
// Nombre común
// Población
// Botón "Ver más"

// Cuando se pulsa el botón "Ver más" se navega a la página de detalle usando el router de Next.js:

// router.push(`/country/${paramsCountry.name.official}`)
// Esto redirige a la ruta dinámica correspondiente.




// NAVEGACIÓN Y RUTAS DINÁMICAS

// La navegación se ha implementado usando rutas dinámicas de Next.js.
// La carpeta:

// /country/[name] (que está en src/app/country/[name]) permite generar páginas dinámicas para cada país.

// Cuando se accede a una URL como, por ejemplo: /country/Kingdom of Spain
// Next.js pasa el parámetro "name" mediante:
// const {name} = useParams();
// Ese valor se utiliza para llamar a la API con la función de api.ts así:

// getCountryByName(String(name))
// y obtener la información completa del país.




// PÁGINA DE DETALLE DEL PAÍS

// En esta página se muestran datos más completos del país:
// bandera
// nombre oficial
// capital
// subregión
// idiomas
// monedas

// También incluye un botón que permite volver
// a la página principal utilizando: router.back()




// DATOS ANIDADOS DE LA API

// Uno de los principales problemas fue acceder a datos anidados dentro del objeto que devuelve la API.

// Por ejemplo, que los idiomas se tienen que devolver como un objeto:

// languages: {
//   spa: "Spanish",
//   cat: "Catalan"
// }

// y paraa mostrarlos se utiliza: Object.values(country.languages).join(", ")
// Y con las monedas ocurría paracido:

// currencies: {
//   EUR: {
//     name: "Euro",
//     symbol: "€"
//   }
// }
// Para obtener el nombre de las monedas se utiliza: Object.values(country.currencies).map(p => p.name)

// de esta manera se recorrían las propiedades del objeto y se mostraban los valores correctamente.


// Otro problema que hubo aparte es que no se conseguía mostrar información al pulsar el botón "Ver más"
// y saltaba un error 404

// Este fue un error tonto porque no me estaba dando cuenta que estaba declarando una variable {id} = useParams();
// en vez de {name} = useParams() que es lo que se esperaba todo el rato.
// Esto ocurrió por hacer un mal uso de códigos pasados que ya tenía y no caer en la cuenta.

// Al principio pensé que el problema estaría en el css pero me di cuenta que si fuese así, 
// lo que ocurriría es que no graficiaría nada, pero no un Error 404

// Luego como último intento hasta antes de darme cuenta del fallo estuve fijándome en la llamada que salía por terminal
// porque tal vez no entendía llamadas como /United%20Kingdom o no entendía el nombre oficial o común.



// EJECUCIÓN DEL CÓDIGO

// Para ejecutar el proyecto:

// 1. git clone https://github.com/AlejandroCarazo26/TODOPRACTICASFRONT.git
// 2. Una vez clonado: cd TODOPRACTICASFRONT 
// 3. code . 
// 4. Desde la terminal de VS: cd PRACTICA2
// 3. cd practica2
// 4. Instalar dependencias: npm install
// 5. Ejecutar el servidor de desarrollo: npm run dev

// Una vez ejecutado, la aplicación se podrá abrir en: http://localhost:3000
