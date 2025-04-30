
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import CreatePostForm from "@/components/CreatePostForm";
import PostCard from "@/components/PostCard";
import { useToast } from "@/components/ui/use-toast";
import { Post } from "@/types/Post";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const API_URL = "https://dev.codeleap.co.uk/careers/";

const MainScreen = () => {
  const { username } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    fetchPosts();
  }, [username, navigate]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data.results);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (title: string, content: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          title,
          content,
        }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      toast({
        title: "Success!",
        description: "Your post has been created.",
      });

      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      toast({
        title: "Success!",
        description: "Post has been deleted.",
      });

      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleEditPost = async (id: number, title: string, content: string) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) throw new Error("Failed to edit post");

      toast({
        title: "Success!",
        description: "Post has been updated.",
      });

      fetchPosts();
    } catch (error) {
      console.error("Error editing post:", error);
      toast({
        title: "Error",
        description: "Failed to edit post. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.created_datetime).getTime();
    const dateB = new Date(b.created_datetime).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen">
      <header className="bg-primary p-6">
        <h1 className="text-white text-2xl font-bold">CodeLeap Network</h1>
      </header>
      
      <main className="max-w-[800px] mx-auto p-6">
        <CreatePostForm onCreatePost={handleCreatePost} />
        
        {!isLoading && posts.length > 0 && (
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={toggleSortOrder} 
              className="flex items-center gap-2 transition-all duration-200 hover:bg-gray-100"
            >
              {sortOrder === "newest" ? (
                <>
                  <span>Newest first</span>
                  <ArrowDown className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Oldest first</span>
                  <ArrowUp className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : sortedPosts.length === 0 ? (
          <div className="text-center py-8">No posts yet. Be the first to post!</div>
        ) : (
          <div className="space-y-6">
            {sortedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isOwner={post.username === username}
                onDelete={handleDeletePost}
                onEdit={handleEditPost}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainScreen;
