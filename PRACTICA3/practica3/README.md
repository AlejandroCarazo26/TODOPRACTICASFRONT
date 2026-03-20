// Práctica 3 - Plataforma de Gestión de Productos

// Tecnologías utilizadas

Para comenzar he creado el proyecto utilizando Next.js con React y TypeScript
usando el comando:

npx create-next-app@latest practica3

Una vez creado el proyecto he instalado axios mediante:

npm install axios

// API utilizada

https://dummyjson.com/products

Esta API permite obtener información sobre productos como: nombre, imagen,
categoría, precio, descripción, marca, valoración, stock, dimensiones, peso, etc.

- Endpoint listado: `https://dummyjson.com/products`
- Endpoint detalle: `https://dummyjson.com/products/{id}`

---

// Estructura del proyecto

El proyecto está organizado en diferentes carpetas para separar responsabilidades:

- api: configuración de axios y llamadas a la API
- components: componentes visuales reutilizables
- types: definición de tipos TypeScript, en este caso, el tipo Product
- product/[id]: página dinámica para el detalle de cada producto
- page.tsx: página principal con el buscador y el grid de productos
- css: estilos de los distintos componentes para cada archivo tsx


// Desglose del contenido de carpetas

// api/api.ts

Aquí he creado una instancia de axios con:

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000
});

Esto permite reutilizar la base de la API sin tener que escribir
toda la URL en cada petición y tiene un tiempo de espera de respuesta de 5 segundos.


// api/products.ts

Contiene dos funciones:

`getAllProducts`: obtiene el listado completo de productos usando el endpoint `/products`.
  Devuelve un objeto con la lista dentro de la clave `products`, junto con metadatos
  de paginación como `total`, `skip` y `limit`.

`getProductById`: obtiene la información completa de un producto concreto usando el endpoint
`/products/{id}`. El id se recibe desde la ruta dinámica del router.



// types/product.ts

Aquí he definido el tipo `Product` en TypeScript con todos los campos que devuelve la API:
título, descripción, categoría, precio, stock, marca, valoración, imágenes,
dimensiones, peso, moneda, reseñas, etc.

Además se define el tipo auxiliar `ProductsResponse` que representa la forma del JSON
que devuelve el endpoint `/products`:

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

Esto permite trabajar con los datos de la API de forma segura y evitar errores
al acceder a propiedades.



// Arquitectura de componentes

// SectionContainer (components/SectionContainer.tsx)

Componente contenedor (wrapper) que recibe `children` de tipo `ReactNode`.
Define una estructura visual común (fondo, bordes redondeados, sombra y padding)
y renderiza dentro el contenido que se le pase.

Este componente es el núcleo de la arquitectura pedida en el enunciado y es reutilizado
tanto en las tarjetas de producto como en la página de detalle.


// SearchBar (components/SearchBar.tsx)

Componente independiente que contiene el input de búsqueda.
Recibe por props el setter del estado del padre (`setSearchQuery`) y el valor actual
(`searchQuery`), siguiendo el patrón de elevación de estado (State Lifting).

Al escribir en el input, se modifica directamente el estado del padre, provocando
que la lista de productos se filtre en tiempo real sin necesidad de pulsar ningún botón.


// ResultsCounter (components/ResultsCounter.tsx)

Componente independiente que muestra el número de productos que coinciden
con el filtro actual. Recibe por props el total de resultados y el término
de búsqueda activo:

Si hay búsqueda activa: muestra `X resultado(s) para "término"`
Si no hay búsqueda: muestra `X productos en total`


// ProductGrid (components/ProductGrid.tsx)

Componente contenedor que recibe `children` de tipo `ReactNode` y los renderiza
dentro de un `SectionContainer` con layout de grid CSS.

Se encarga de mostrar la colección de tarjetas de producto en una cuadrícula
adaptable usando `auto-fill` y `minmax`.


// ProductCard (components/ProductCard.tsx)

Componente que muestra una tarjeta con la información resumida de cada producto:

Imagen (thumbnail)
Categoría como badge
Título
Precio formateado con símbolo de moneda (ej: 19.99€)
Botón "Ver detalles" que redirige a `/product/[id]`

Utiliza `SectionContainer` como base visual y `useRouter` de Next.js para la navegación.


// Página principal (src/app/page.tsx)

En la página principal se encuentra el buscador y el catálogo de productos.
Se utilizan varios estados con useState:

`searchQuery`: texto usado para filtrar productos en tiempo real
`products`: lista completa de productos obtenida de la API
`loading`: estado de carga
`error`: posibles errores de la API

`useEffect` se ejecuta una sola vez al montar el componente y realiza la petición
para obtener todos los productos. Una vez obtenidos se guardan en el estado `products`.

El filtrado funciona así:

products.filter((p) =>
  p.title.toLowerCase().includes(searchQuery.toLowerCase())
)

Además se limita el resultado a 20 productos para evitar renderizar
demasiados elementos a la vez con `.slice(0, 20)`.

El estado `searchQuery` reside en este componente (padre) y se pasa como prop
a `SearchBar`, que lo modifica directamente al escribir. Esto es el patrón de
elevación de estado (State Lifting) requerido por el enunciado.


// Navegación y rutas dinámicas

La navegación se ha implementado usando rutas dinámicas de Next.js.
La carpeta `/product/[id]` (en `src/app/product/[id]`) permite generar
páginas dinámicas para cada producto.

Cuando se accede a una URL como, por ejemplo: `/product/1`
Next.js pasa el parámetro `id` mediante:

const { id } = useParams();

Ese valor se utiliza para llamar a la API con la función de `api/products.ts`:

getProductById(String(id))


// Página de detalle del producto (src/app/product/[id]/page.tsx)

En esta página se muestran datos más completos del producto:

Galería de imágenes con navegación
Título y marca
Descripción completa
Categoría como badge
Precio
Stock (con aviso si quedan pocas unidades)
Valoración con estrellas
Peso y dimensiones
Botón para volver al catálogo usando `router.back()`

// Galería de imágenes

La galería permite cambiar de imagen de dos formas:

Botones laterales: flechas a izquierda y derecha que navegan entre imágenes
  con lógica circular (al llegar al final vuelve al principio y viceversa).

Movimiento del ratón: al pasar el cursor por encima de la imagen, ésta cambia
  automáticamente según la posición horizontal del ratón. El ancho de la imagen se
  divide en tantas zonas como imágenes haya, y se muestra la correspondiente a
  la zona donde se encuentra el cursor.

Ambas formas comparten el mismo estado `currentImage`, por lo que son completamente
compatibles entre sí.


// Ejecución del código

Para ejecutar el proyecto:

1. git clone https://github.com/AlejandroCarazo26/TODOPRACTICASFRONT.git
2. Una vez clonado: cd TODOPRACTICASFRONT
3. code .
4. Desde la terminal de VS: cd PRACTICA3
5. cd practica3
6. Instalar dependencias: npm install
7. Ejecutar el servidor de desarrollo: npm run dev

Una vez ejecutado, la aplicación se podrá abrir en: http://localhost:3000