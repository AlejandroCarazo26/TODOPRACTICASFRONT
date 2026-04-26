"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createComment, getComments, getPost, likePost, retweetPost } from "@/app/lib/api/api";
import "./page.css";

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

interface Comment {
  _id: string;
  contenido: string;
  autor: Author;
  fecha: string;
}

export default function PostPage() {
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [id]);

  async function fetchAll() {
  setLoading(true);
  const postData = await getPost(id);
  const post = postData.post || postData;
  setPost(post);
  setComments(post.comentarios || []);
  setLoading(false);
}

  async function handleLike() {
    if (!post) return;
    await likePost(post._id);
    fetchAll();
  }

  async function handleRetweet() {
    if (!post) return;
    await retweetPost(post._id);
    fetchAll();
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSending(true);
    await createComment(id, newComment);
    setNewComment("");
    await fetchAll();
    setSending(false);
  }

  if (loading) {
    return <p style={{ textAlign: "center", padding: 32, color: "#536471" }}>Cargando...</p>;
  }

  if (!post) {
    return <p style={{ textAlign: "center", padding: 32 }}>Post no encontrado</p>;
  }

  return (
    <div>
      <div className="card">
        <Link
          href={`/profile/${post.autor?._id}`}
          style={{ fontWeight: 700, color: "#0f1419", textDecoration: "none" }}
        >
          @{post.autor?.username}
        </Link>
        <p style={{ fontSize: 12, color: "#536471", marginBottom: 12 }}>
          {new Date(post.createdAt).toLocaleString("es-ES")}
        </p>
        <p style={{ fontSize: 18, marginBottom: 16 }}>{post.contenido}</p>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={handleLike} className="actionButton">
            ❤️ {post.likes.length}
          </button>
          <button onClick={handleRetweet} className="actionButton">
            🔁 {post.retweets.length}
          </button>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            maxLength={280}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 15,
              resize: "none",
              minHeight: 60,
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button
              type="submit"
              disabled={sending || !newComment.trim()}
              className="commentButton"
            >
              {sending ? "Enviando..." : "Comentar"}
            </button>
          </div>
        </form>
      </div>

      {comments.length === 0 ? (
        <p style={{ textAlign: "center", color: "#536471", padding: 16 }}>
          Sin comentarios aún
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="card">
            <Link
              href={`/profile/${comment.autor?._id}`}
              style={{ fontWeight: 700, color: "#0f1419", textDecoration: "none" }}
            >
              @{comment.autor?.username}
            </Link>
            <p style={{ fontSize: 12, color: "#536471", marginBottom: 8 }}>
              {new Date(comment.fecha).toLocaleString("es-ES")}
            </p>
            <p style={{ fontSize: 15 }}>{comment.contenido}</p>
          </div>
        ))
      )}
    </div>
  );
}