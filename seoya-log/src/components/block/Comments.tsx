"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/initFirebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface Comment {
  id: string;
  text: string;
  nickname: string;
  createdAt: Timestamp;
}

function Comments({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(commentsData);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && nickname.trim()) {
      await addDoc(collection(db, "posts", postId, "comments"), {
        text: comment,
        nickname: nickname,
        createdAt: new Date(),
      });
      setComment("");
      setNickname("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-8">
      <Separator className="my-8" />
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">댓글</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className="w-full"
          />
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="w-full min-h-[100px] resize-none border-gray-200"
          />
          <div className="flex justify-end">
            <Button type="submit" variant="outline" className="px-6">
              댓글 추가
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6 mt-8">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-4 items-start group">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarFallback className="bg-gray-100 text-gray-600">
                {c.nickname.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground">
                {c.nickname}-
                {c.createdAt instanceof Date
                  ? c.createdAt.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : new Date(c.createdAt.seconds * 1000).toLocaleDateString(
                      "ko-KR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
              </p>
              <p className="text-sm leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
