// README - PRACTICA 1 REACT + SWAPI

// Para empezar he creado el proyecto con Vite + React + TypeScript
// usando el comando:
// npm create vite@latest
// seleccionando React y TypeScript como lenguaje principal.

// Una vez creado el proyecto he instalado axios mediante:
// npm install axios
// para poder hacer las peticiones HTTP a la API de Star Wars.

// He creado un archivo .env donde he añadido:
// VITE_API_URL = https://swapi.dev/api/
// para poder reutilizar la base de la URL sin tener que escribirla siempre.





// El proyecto está dividido en carpetas para separar responsabilidades:

// - api: configuración de axios
// - component: todos los componentes visuales
// - types: definición de tipos en TypeScript
// - App.tsx: lógica principal
// - index.css: estilos globales
// - App.css: estilos de la escena 3D


// api/api.ts:

  // Aquí he creado una instancia de axios con:

  // export const api = axios.create({
  //     baseURL: import.meta.env.VITE_API_URL
  // });

  // Esto me permite hacer peticiones como:
  // api.get("people/")
  // o directamente usar la URL completa si lo necesito.



// types/character.ts:

  // En esta carpeta he definido el tipo Character.

  // export type Character = { ... }

  // Esto me permite tipar correctamente los datos que devuelve la API
  // y trabajar con TypeScript sin errores.

  // Uno de los problemas que tuve fue entender cómo acceder a las propiedades
  // del personaje, pero al verlo como un "struct" de C++ lo entendí mejor.


// App.tsx:


// En App uso useState para manejar:

  // - characters: lista de personajes
  // - loading: estado de carga
  // - error: posibles errores
  // - nextPage: URL de la siguiente página

  // useEffect se ejecuta una sola vez al montar el componente
  // y hace la primera petición a la API.

  // Cuando la petición termina:
  // - guarda los personajes
  // - guarda la siguiente URL
  // - desactiva el loading

  // La función loadMore se encarga de la paginación.
  // Si existe nextPage:
  // - activa loading
  // - hace una nueva petición
  // - acumula los personajes anteriores con los nuevos
  //   usando: setCharacters(prev => [...prev, ...e.data.results])
  // - actualiza la siguiente página
  // - desactiva loading

  // Uno de los mayores problemas fue entender cómo funcionaba la paginación,
  // ya que al principio intenté tratar nextPage como un número,
  // pero la API devuelve directamente la URL siguiente.

  // También tuve algunos errores con imports y nombres de archivos,
  // que solucioné revisando cuidadosamente rutas y nombres.



// components/CharacterList:


  // Este componente recibe un array de personajes como prop.

  // Usa map para recorrer cada personaje y renderizar un CharacterCard.

  // Además utiliza useRef y useEffect para reiniciar la animación
  // cuando cambian los personajes.

  // crawlRef.current.style.animation = "none";
  // void crawlRef.current.offsetHeight;
  // crawlRef.current.style.animation = "crawl 45s linear";

  // Esto fuerza al navegador a recalcular el layout
  // y reiniciar la animación.


// components/CharacterCard:

  // Este componente recibe un personaje individual y muestra:

  // - Nombre
  // - Género
  // - Año de nacimiento

  // Utiliza clases CSS como .card y .name para aplicar estilos.



// components/Loader:

  // Muestra el texto "LOADING..." cuando loading es true.



// components/Error:

  // Muestra el mensaje de error si la petición falla.



// index.css:


// Aquí he hecho un reset básico con:

  // * {
  //   box-sizing: border-box;
  //   margin: 0;
  //   padding: 0;
  // }

  // También he configurado html, body y #root para ocupar
  // el 100% de la pantalla y tener fondo negro.

  // He bloqueado el scroll global con overflow: hidden;
  // porque el scroll lo controlo manualmente en el contenedor .crawl.



// App.css (ESCENA 3D)

  // Aquí he creado la escena 3D utilizando:

  // perspective: 500px;
  // transform: rotateX(25deg);

  // Esto da el efecto de inclinación tipo Star Wars.

  // El contenedor .crawl tiene overflow-y: auto;
  // lo que permite scroll manual únicamente del texto,
  // no de la página completa.

  // También he añadido un degradado superior con ::after
  // para simular cómo el texto desaparece en la oscuridad,
  // como en la intro de las películas.

  // El botón "Siguiente Página" está en position: fixed
  // para que permanezca visible y no tenga efecto 3D.



// DIFICULTADES ENCONTRADAS:

  // - Problemas con la paginación y el tipo de nextPage.
  // - Errores de TypeScript con tipos y props.
  // - Confusión entre scroll global y scroll interno.
  // - Problemas con el reinicio de animación CSS.
  // - Ajustes de CSS para evitar scroll horizontal.
  // - Entender cómo funciona perspective y transform-origin.

  // Especialmente complicado fue entender que:
  // - El scroll debía estar dentro de .crawl
  // - Y no en el body.
  // - Y que la animación CSS no se reinicia sola
  //   al cambiar el contenido.



// EJECUCIÓN DEL PROYECTO:

  // Para ejecutar el proyecto:

  // 1. git clone https://github.com/AlejandroCarazo26/TODOPRACTICASFRONT.git
  // 2. cd PRACTICA1
  // 3. cd PRACTICA1 (de nuevo)
  // 4. npm install
  // 5. npm run dev

  // Esto abrirá el servidor local.
  // En consola se puede pulsar "o" para abrir en el navegador.
  // Si algo falla se puede reiniciar con "r".

