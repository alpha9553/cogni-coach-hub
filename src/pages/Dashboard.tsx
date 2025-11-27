import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import BatchCard from "@/components/BatchCard";
import { mockBatches } from "@/lib/mockData";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("coachEmail");
    navigate("/");
  };

  const coachEmail = localStorage.getItem("coachEmail");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">CC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Coach Dashboard</h1>
              <p className="text-sm text-muted-foreground">{coachEmail}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Batches</h2>
          <p className="text-muted-foreground">
            Manage and monitor all your assigned training batches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBatches.map((batch, index) => (
            <BatchCard key={batch.id} batch={batch} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
