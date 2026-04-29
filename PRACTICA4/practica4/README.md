# Práctica 4 - Clon funcional de Twitter

## Tecnologías utilizadas:

Para comenzar he creado el proyecto utilizando Next.js con React y TypeScript usando el comando:

npx create-next-app@latest practica4

No se han instalado librerías adicionales. Todas las llamadas a la API se realizan con fetch nativo del navegador.

## API utilizada:

https://backend-p4-klvc.onrender.com/api

Todos los endpoints requieren el header `x-nombre: alejandrocarazo` para poder ser evaluados. Salvo los endpoints de login y registro, todos requieren también el header `Authorization: Bearer <token>`.

Endpoints principales:
- GET /api/home — Timeline global paginado
- POST /api/posts — Crear un nuevo post
- GET /api/posts/{id} — Obtener un post con sus comentarios
- POST /api/posts/{id}/like — Dar o quitar like
- POST /api/posts/{id}/retweet — Retweetear un post
- POST /api/posts/{id}/comment — Comentar en un post
- GET /api/users/me — Obtener mi perfil
- GET /api/users/{id}/profile — Ver perfil de otro usuario con sus posts
- POST /api/users/{id}/follow — Seguir o dejar de seguir (toggle)
- POST /api/auth/register — Crear una nueva cuenta
- POST /api/auth/login — Iniciar sesión

## Estructura del proyecto:

El proyecto está organizado dentro de la carpeta src con la siguiente estructura:
src/
    app/
        components/
            Header.tsx
            Header.css
        lib/
            api/
                api.ts
        login/
            page.tsx
        post/
            [id]/
                page.tsx
                page.css
        profile/
            [username]/
                page.tsx
                page.css
        globals.css
        layout.tsx
        page.tsx
        page.css
    proxy.ts

## Desglose del contenido:


### src/app/lib/api/api.ts

Centraliza todas las llamadas a la API. Contiene dos funciones internas:

`getToken`: lee el token JWT de las cookies del navegador.

`buildHeaders`: construye las cabeceras necesarias para cada petición, incluyendo siempre `x-nombre` y opcionalmente `Authorization: Bearer <token>` según si el endpoint requiere autenticación.

`handleResponse`: procesa la respuesta de la API, parsea el JSON y lanza errores si la respuesta no es correcta.

El resto son funciones exportadas que corresponden a cada endpoint de la API: login, register, getPosts, getPost, createPost, likePost, retweetPost, createComment, getProfile, followUser y getMe.

### src/proxy.ts

Middleware de Next.js que protege las rutas de la aplicación. Comprueba si existe una cookie `token` en cada petición entrante. Si no hay token y la ruta no es `/login`, redirige al login. Si hay token y se intenta acceder al login, redirige a la home.

### src/app/layout.tsx

Layout raíz de la aplicación. Renderiza el componente `Header` en todas las páginas y envuelve el contenido en un `<main>`.

### src/app/components/Header.tsx

Componente cliente que actúa como cabecera común de la aplicación. Usa `usePathname` para saber en qué página se encuentra el usuario y mostrar los botones correspondientes. Cuando hay sesión activa muestra los botones de Home, Volver (solo si no estás en la home), el link al perfil propio y el botón de cerrar sesión. En la página de login no muestra ninguno de estos botones. Al cerrar sesión elimina la cookie del token y redirige al login.

### src/app/page.tsx

Página principal o home. Muestra el timeline global de posts con paginación. Permite publicar nuevos posts desde un formulario. Cada post muestra el autor, la fecha, el contenido y los botones de like y retweet. Al pulsar sobre el contenido del post navega al detalle. Al pulsar sobre el autor navega a su perfil.

### src/app/login/page.tsx

Página de login y registro. Contiene dos formularios que se alternan con un botón. El formulario de login pide email y contraseña. El de registro pide username, email y contraseña. Al completar correctamente cualquiera de los dos guarda el token JWT en una cookie y redirige a la home mediante `window.location.href` para forzar una recarga completa.

### src/app/post/[id]/page.tsx

Página de detalle de un post. Muestra el contenido completo del post, su autor, fecha, likes y retweets. Los comentarios se obtienen directamente del campo `comentarios` que devuelve el endpoint del post. Permite añadir nuevos comentarios mediante un formulario.

### src/app/profile/[username]/page.tsx

Página de perfil de usuario. Recibe el `_id` del usuario como parámetro de la URL. Llama al endpoint `/api/users/{id}/profile` que devuelve en una sola respuesta los datos del usuario y sus posts. Muestra el username, la bio, el número de seguidos y seguidores y un botón para seguir o dejar de seguir. Para saber si el usuario logueado ya sigue al perfil visitado compara el `_id` del usuario logueado (obtenido con `getMe`) con el array `seguidores` del perfil.

## Navegación y rutas dinámicas

La navegación usa el App Router de Next.js con rutas dinámicas. La ruta `/post/[id]` recibe el `_id` del post. La ruta `/profile/[username]` recibe el `_id` del usuario (no el username), ya que la API requiere el id para el endpoint de perfil.

## Resolución de datos anidados de la API

La API devuelve los campos en español y con estructura de MongoDB. Los campos principales son `contenido` en vez de `content`, `autor` en vez de `author`, y `_id` en vez de `id`. Los likes y retweets son arrays de objetos, por lo que para obtener el número se usa `.length`. Los comentarios vienen dentro del propio post en el campo `comentarios`, por lo que no hay un endpoint separado para obtenerlos. El perfil del usuario devuelve en una sola llamada tanto los datos del usuario como sus posts, por lo que tampoco se necesita un endpoint separado para los posts del perfil.

## Ejecución del código

1. git clone https://github.com/AlejandroCarazo26/TODOPRACTICASFRONT.git
2. Una vez clonado: cd TODOPRACTICASFRONT
3. code .
4. Desde la terminal de VS: cd PRACTICA3
5. cd practica3
6. Instalar dependencias: npm install
7. Ejecutar el servidor de desarrollo: npm run dev

Una vez ejecutado, la aplicación se podrá abrir en: http://localhost:3000