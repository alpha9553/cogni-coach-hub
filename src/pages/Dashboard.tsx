import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import BatchCard from "@/components/BatchCard";
import ExcelUpload from "@/components/ExcelUpload";
import { useBatches, Batch } from "@/context/BatchContext";
import cognizantLogo from "@/assets/cognizant-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { batches, setBatches } = useBatches();

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

  const handleDataParsed = (newBatches: Batch[]) => {
    setBatches(newBatches);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={cognizantLogo} alt="Cognizant" className="h-8" />
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

        <ExcelUpload onDataParsed={handleDataParsed} />

        {/* Ongoing Training Batches */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Ongoing Training</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.filter(b => b.status !== "graduated").map((batch, index) => (
              <BatchCard key={batch.id} batch={batch} index={index} />
            ))}
          </div>
          {batches.filter(b => b.status !== "graduated").length === 0 && (
            <p className="text-muted-foreground">No ongoing training batches</p>
          )}
        </div>

        {/* Graduated Batches */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">Graduated Batches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.filter(b => b.status === "graduated").map((batch, index) => (
              <BatchCard key={batch.id} batch={batch} index={index} />
            ))}
          </div>
          {batches.filter(b => b.status === "graduated").length === 0 && (
            <p className="text-muted-foreground">No graduated batches yet</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
