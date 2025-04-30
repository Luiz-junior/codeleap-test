
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostFormProps {
  onCreatePost: (title: string, content: string) => Promise<void>;
}

const CreatePostForm = ({ onCreatePost }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      try {
        setIsSubmitting(true);
        await onCreatePost(title, content);
        setTitle("");
        setContent("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Card className="mb-6 border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold">What's on your mind?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium block">
              Title
            </label>
            <Input
              id="title"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium block">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[120px]"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {isSubmitting ? "Creating..." : "CREATE"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
