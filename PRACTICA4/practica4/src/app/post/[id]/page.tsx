"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createComment, getComments, getPost, likePost, retweetPost } from "@/app/lib/api/api";

interface Author {
  username: string;
}

interface Post {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
  retweets: number;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
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
    const [postData, commentsData] = await Promise.all([
      getPost(id),
      getComments(id),
    ]);
    setPost(postData.post || postData);
    setComments(commentsData.comments || commentsData.data || []);
    setLoading(false);
  }

  async function handleLike() {
    if (!post) return;
    await likePost(post.id);
    fetchAll();
  }

  async function handleRetweet() {
    if (!post) return;
    await retweetPost(post.id);
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
      {/* Post principal */}
      <div style={cardStyle}>
        <Link
          href={`/profile/${post.author?.username}`}
          style={{ fontWeight: 700, color: "#0f1419", textDecoration: "none" }}
        >
          @{post.author?.username}
        </Link>
        <p style={{ fontSize: 12, color: "#536471", marginBottom: 12 }}>
          {new Date(post.createdAt).toLocaleString("es-ES")}
        </p>
        <p style={{ fontSize: 18, marginBottom: 16 }}>{post.content}</p>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={handleLike} style={actionButtonStyle}>
            ❤️ {post.likes}
          </button>
          <button onClick={handleRetweet} style={actionButtonStyle}>
            🔁 {post.retweets}
          </button>
        </div>
      </div>

      {/* Formulario comentario */}
      <div style={cardStyle}>
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
              style={tweetButtonStyle}
            >
              {sending ? "Enviando..." : "Comentar"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <p style={{ textAlign: "center", color: "#536471", padding: 16 }}>
          Sin comentarios aún
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} style={cardStyle}>
            <Link
              href={`/profile/${comment.author?.username}`}
              style={{ fontWeight: 700, color: "#0f1419", textDecoration: "none" }}
            >
              @{comment.author?.username}
            </Link>
            <p style={{ fontSize: 12, color: "#536471", marginBottom: 8 }}>
              {new Date(comment.createdAt).toLocaleString("es-ES")}
            </p>
            <p style={{ fontSize: 15 }}>{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e1e8ed",
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
};

const tweetButtonStyle: React.CSSProperties = {
  background: "#1d9bf0",
  color: "#fff",
  border: "none",
  borderRadius: 24,
  padding: "8px 20px",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};

const actionButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  color: "#536471",
  padding: "4px 8px",
  borderRadius: 8,
};