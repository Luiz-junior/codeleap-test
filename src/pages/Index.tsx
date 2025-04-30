
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [nameInput, setNameInput] = useState("");
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUsername(nameInput);
      navigate("/main");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-primary rounded-t-lg">
          <CardTitle className="text-xl font-bold text-white">Welcome to CodeLeap network</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Please enter your name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full transition-all border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!nameInput.trim()}
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                ENTER
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
