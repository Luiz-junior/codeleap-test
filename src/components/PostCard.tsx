
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { Post } from "@/types/Post";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, title: string, content: string) => Promise<void>;
}

const PostCard = ({ post, isOwner, onDelete, onEdit }: PostCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  return (
    <>
      <Card className="mb-6 border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="bg-primary p-6 flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold text-white">{post.title}</h2>
          {isOwner && (
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-white hover:bg-primary/90 hover:scale-110 transition-transform"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditModalOpen(true)}
                className="text-white hover:bg-primary/90 hover:scale-110 transition-transform"
              >
                <Edit className="h-5 w-5" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <span className="font-medium hover:text-primary transition-colors">@{post.username}</span>
            <span>{timeAgo}</span>
          </div>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => onDelete(post.id)}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={(title, content) => onEdit(post.id, title, content)}
        initialTitle={post.title}
        initialContent={post.content}
      />
    </>
  );
};

export default PostCard;
