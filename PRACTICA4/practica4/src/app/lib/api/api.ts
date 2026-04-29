const BASE_URL = "https://backend-p4-klvc.onrender.com/api";
const X_NOMBRE = "alejandrocarazo";

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function buildHeaders(auth: boolean = true): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-nombre": X_NOMBRE,
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

async function handleResponse(res: Response) {
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error(text);
    throw new Error("La API no devolvió JSON válido");
  }

  if (!res.ok) {
    throw new Error(data.error || "Error en la API");
  }

  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ username, email, password }),
  });

  return handleResponse(res);
}

export async function getPosts(page: number = 1) {
  const res = await fetch(`${BASE_URL}/home?page=${page}`, {
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function getPost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function createPost(contenido: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ contenido }),
  });
  return res.json();
}



export async function likePost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}/like`, {
    method: "POST",
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function retweetPost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}/retweet`, {
    method: "POST",
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function getComments(postId: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function createComment(postId: string, contenido: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ contenido }),
  });
  return handleResponse(res);
}


export async function getProfile(username: string) {
  const res = await fetch(`${BASE_URL}/users/${username}/profile`, {
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function getUserPosts(username: string, page: number = 1) {
  const res = await fetch(`${BASE_URL}/users/${username}/posts?page=${page}`, {
    headers: buildHeaders(),
  });

  return handleResponse(res);
}

export async function followUser(userId: string) {
  const res = await fetch(`${BASE_URL}/users/${userId}/follow`, {
    method: "POST",
    headers: buildHeaders(),
  });
  return handleResponse(res);
}


export async function getMe() {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: buildHeaders(),
  });
  return handleResponse(res);
}