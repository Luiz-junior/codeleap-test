
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (title: string, content: string) => Promise<void>;
  initialTitle: string;
  initialContent: string;
}

const EditModal = ({
  isOpen,
  onClose,
  onEdit,
  initialTitle,
  initialContent,
}: EditModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      try {
        setIsSubmitting(true);
        await onEdit(title, content);
        onClose();
      } catch (error) {
        console.error("Failed to edit post", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[660px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Edit item
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-6">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium block">
                Title
              </label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-content" className="text-sm font-medium block">
                Content
              </label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
