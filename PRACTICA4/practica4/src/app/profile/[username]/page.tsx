"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import styles from "./page.module.css";
import { followUser, getProfile, getUserPosts, likePost, retweetPost, unfollowUser } from "@/app/lib/api/api";

interface User {
  username: string;
  bio: string;
  followers: number;
  following: number;
  isFollowing: boolean;
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  retweets: number;
}

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  useEffect(() => {
    fetchPosts(page);
  }, [page, username]);

  async function fetchProfile() {
    const data = await getProfile(username);
    const userData = data.user || data;
    setUser(userData);
    setFollowing(userData.isFollowing || false);
  }

  async function fetchPosts(p: number) {
    setLoading(true);
    const data = await getUserPosts(username, p);
    setPosts(data.posts || data.data || []);
    setTotalPages(data.totalPages || data.pages || 1);
    setLoading(false);
  }

  async function handleFollow() {
    if (following) {
      await unfollowUser(username);
      setFollowing(false);
    } else {
      await followUser(username);
      setFollowing(true);
    }
    fetchProfile();
  }

  async function handleLike(id: string) {
    await likePost(id);
    fetchPosts(page);
  }

  async function handleRetweet(id: string) {
    await retweetPost(id);
    fetchPosts(page);
  }

  if (!user) {
    return <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Cargando...</p>;
  }

  return (
    <div>
      {/* Perfil */}
      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>@{user.username}</h2>
            {user.bio && (
              <p style={{ fontSize: 15, color: "#536471", marginTop: 4 }}>{user.bio}</p>
            )}
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <span style={{ fontSize: 14 }}>
                <strong>{user.following}</strong>{" "}
                <span style={{ color: "#536471" }}>Siguiendo</span>
              </span>
              <span style={{ fontSize: 14 }}>
                <strong>{user.followers}</strong>{" "}
                <span style={{ color: "#536471" }}>Seguidores</span>
              </span>
            </div>
          </div>
          <button
            onClick={handleFollow}
            style={{
              background: following ? "#fff" : "#0f1419",
              color: following ? "#0f1419" : "#fff",
              border: "1px solid #0f1419",
              borderRadius: 24,
              padding: "8px 20px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {following ? "Dejar de seguir" : "Seguir"}
          </button>
        </div>
      </div>

      {/* Posts del usuario */}
      {loading ? (
        <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Cargando...</p>
      ) : posts.length === 0 ? (
        <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Sin posts aún</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className={styles.card}>
            <p style={{ fontSize: 12, color: "#536471", marginBottom: 8 }}>
              {new Date(post.createdAt).toLocaleString("es-ES")}
            </p>
            <Link href={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <p style={{ fontSize: 15, marginBottom: 12, cursor: "pointer" }}>{post.content}</p>
            </Link>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => handleLike(post.id)} className={styles.actionButton}>
                ❤️ {post.likes}
              </button>
              <button onClick={() => handleRetweet(post.id)} className={styles.actionButton}>
                🔁 {post.retweets}
              </button>
            </div>
          </div>
        ))
      )}

      {/* Paginación */}
      {!loading && totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={styles.pageButton}
          >
            ← Anterior
          </button>
          <span style={{ lineHeight: "36px", fontSize: 14, color: "#536471" }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={styles.pageButton}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}