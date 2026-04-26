"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./page.css";
import { createPost, getPosts, likePost, retweetPost } from "./lib/api/api";

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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  async function fetchPosts(p: number) {
    try {
      setLoading(true);
      const data = await getPosts(p);
      setPosts(data.posts || []);
      setTotalPages(data.totalPaginas || 1);
    } catch (error) {
      console.error("Error cargando posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosting(true);
    await createPost(newPost);
    setNewPost("");
    await fetchPosts(1);
    setPage(1);
    setPosting(false);
  }

  async function handleLike(id: string) {
    await likePost(id);
    fetchPosts(page);
  }

  async function handleRetweet(id: string) {
    await retweetPost(id);
    fetchPosts(page);
  }

  return (
    <div>
      
      <div className="card">
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="¿Qué está pasando? máx.280"
            maxLength={280}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              resize: "none",
              minHeight: 80,
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button
              type="submit"
              disabled={posting || !newPost.trim()}
              className="tweetButton"
            >
              {posting ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Cargando...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card">
            <Link
              href={`/profile/${post.autor?._id}`}
              style={{ fontWeight: 700, color: "#0f1419", textDecoration: "none" }}
            >
              @{post.autor?.username}
            </Link>
            <p style={{ fontSize: 12, color: "#536471", marginBottom: 8 }}>
              {new Date(post.createdAt).toLocaleString("es-ES")}
            </p>
            <Link href={`/post/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <p style={{ fontSize: 15, marginBottom: 12, cursor: "pointer" }}>
                {post.contenido}
              </p>
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

      {!loading && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="pageButton"
          >
            Anterior
          </button>
          <span style={{ lineHeight: "36px", fontSize: 14, color: "#536471" }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="pageButton"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}