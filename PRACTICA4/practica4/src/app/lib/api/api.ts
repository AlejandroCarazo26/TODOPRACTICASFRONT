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
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// AUTH
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

// POSTS
export async function getPosts(page: number = 1) {
  const res = await fetch(`${BASE_URL}/posts?page=${page}`, {
    headers: buildHeaders(),
  });
  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    headers: buildHeaders(),
  });
  return res.json();
}

export async function createPost(content: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ content }),
  });
  return res.json();
}

export async function likePost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}/like`, {
    method: "POST",
    headers: buildHeaders(),
  });
  return res.json();
}

export async function retweetPost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}/retweet`, {
    method: "POST",
    headers: buildHeaders(),
  });
  return res.json();
}

// COMMENTS
export async function getComments(postId: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    headers: buildHeaders(),
  });
  return res.json();
}

export async function createComment(postId: string, content: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ content }),
  });
  return res.json();
}

// PROFILE
export async function getProfile(username: string) {
  const res = await fetch(`${BASE_URL}/users/${username}`, {
    headers: buildHeaders(),
  });
  return res.json();
}

export async function getUserPosts(username: string, page: number = 1) {
  const res = await fetch(`${BASE_URL}/users/${username}/posts?page=${page}`, {
    headers: buildHeaders(),
  });
  return res.json();
}

export async function followUser(username: string) {
  const res = await fetch(`${BASE_URL}/users/${username}/follow`, {
    method: "POST",
    headers: buildHeaders(),
  });
  return res.json();
}

export async function unfollowUser(username: string) {
  const res = await fetch(`${BASE_URL}/users/${username}/follow`, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  return res.json();
}