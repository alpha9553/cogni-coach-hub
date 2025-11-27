import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBatches } from "@/lib/mockData";
import ProgressChart from "@/components/ProgressChart";
import AttendanceSection from "@/components/AttendanceSection";

const BatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const batch = mockBatches.find((b) => b.id === id);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
    }
  }, [navigate]);

  if (!batch) {
    return <div>Batch not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{batch.name}</h1>
            <p className="text-muted-foreground">{batch.description}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Metadata Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Trainer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{batch.trainer}</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Behavioral Trainer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{batch.behavioralTrainer}</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{batch.mentor}</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{batch.startDate}</p>
              <p className="text-xs text-muted-foreground">to</p>
              <p className="text-sm font-medium">{batch.endDate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Schedule Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressChart data={batch.scheduleStatus} />
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                <span className="text-sm font-medium">On Schedule</span>
                <span className="text-2xl font-bold text-success">
                  {batch.scheduleStatus.onSchedule}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                <span className="text-sm font-medium">Behind Schedule</span>
                <span className="text-2xl font-bold text-warning">
                  {batch.scheduleStatus.behind}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-info/10 rounded-lg">
                <span className="text-sm font-medium">Advanced</span>
                <span className="text-2xl font-bold text-info">
                  {batch.scheduleStatus.advanced}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Total Trainees</span>
                  <span className="text-2xl font-bold">{batch.totalTrainees}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Section */}
        <AttendanceSection batchId={batch.id} />
      </main>
    </div>
  );
};

export default BatchDetail;
