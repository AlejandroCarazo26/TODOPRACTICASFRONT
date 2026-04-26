"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./page.css";
import { followUser, getProfile, getMe, likePost, retweetPost } from "@/app/lib/api/api";

interface User {
  _id: string;
  username: string;
  bio: string;
  seguidores: unknown[];
  seguidos: unknown[];
}

interface Author {
  _id: string;
  username: string;
}

interface Post {
  _id: string;
  contenido: string;
  autor: Author;
  createdAt: string;
  likes: unknown[];
  retweets: unknown[];
}

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {
  getMe().then((data) => {
    const me = data.user || data;
    setMyId(me._id);
  }).catch(() => {});
  fetchProfile();
}, [username]);

  async function fetchProfile() {
    setLoading(true);
    const data = await getProfile(username);
    setUser(data.user || null);
    setPosts(data.posts || []);
    setLoading(false);
  }

  async function handleFollow() {
    if (!user) return;
    await followUser(user._id);
    fetchProfile();
  }

  async function handleLike(id: string) {
    await likePost(id);
    fetchProfile();
  }

  async function handleRetweet(id: string) {
    await retweetPost(id);
    fetchProfile();
  }

  if (loading) {
    return <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Cargando...</p>;
  }

  if (!user) {
    return <p style={{ textAlign: "center", padding: 32 }}>Usuario no encontrado</p>;
  }


  const isFollowing = user.seguidores.some((s: any) => s === myId || s._id === myId);


  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>@{user.username}</h2>
            {user.bio && (
              <p style={{ fontSize: 15, color: "#536471", marginTop: 4 }}>{user.bio}</p>
            )}
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <span style={{ fontSize: 14 }}>
                <strong>{user.seguidos.length}</strong>{" "}
                <span style={{ color: "#536471" }}>Siguiendo</span>
              </span>
              <span style={{ fontSize: 14 }}>
                <strong>{user.seguidores.length}</strong>{" "}
                <span style={{ color: "#536471" }}>Seguidores</span>
              </span>
            </div>
          </div>
          <button
              onClick={handleFollow}
              style={{
                background: isFollowing ? "#fff" : "#0f1419",
                color: isFollowing ? "#0f1419" : "#fff",
                border: "1px solid #0f1419",
                borderRadius: 24,
                padding: "8px 20px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {isFollowing ? "Dejar de seguir" : "Seguir"}
            </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Sin posts aún</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card">
            <p style={{ fontSize: 12, color: "#536471", marginBottom: 8 }}>
              {new Date(post.createdAt).toLocaleString("es-ES")}
            </p>
            <Link href={`/post/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <p style={{ fontSize: 15, marginBottom: 12, cursor: "pointer" }}>{post.contenido}</p>
            </Link>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => handleLike(post._id)} className="actionButton">
                ❤️ {post.likes.length}
              </button>
              <button onClick={() => handleRetweet(post._id)} className="actionButton">
                🔁 {post.retweets.length}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}