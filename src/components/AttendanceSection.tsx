import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface AttendanceSectionProps {
  batchId: string;
  totalTrainees: number;
}

// Mock trainee data - in real app, this would come from database
const generateTrainees = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `trainee-${i + 1}`,
    name: `Trainee ${i + 1}`,
  }));
};

const AttendanceSection = ({ batchId, totalTrainees }: AttendanceSectionProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [trainees] = useState(generateTrainees(totalTrainees));
  const [absentIds, setAbsentIds] = useState<Set<string>>(new Set());

  const handleToggleAbsent = (traineeId: string) => {
    setAbsentIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(traineeId)) {
        newSet.delete(traineeId);
      } else {
        newSet.add(traineeId);
      }
      return newSet;
    });
  };

  const handleSaveAttendance = () => {
    const presentCount = totalTrainees - absentIds.size;
    const absentCount = absentIds.size;
    
    // Mock save - replace with actual API call later
    toast.success(`Attendance saved! Present: ${presentCount}, Absent: ${absentCount}`);
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Daily Attendance Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label>Mark Absent Trainees (Others will be marked present)</Label>
            <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {trainees.map((trainee) => (
                  <div key={trainee.id} className="flex items-center justify-between space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={trainee.id}
                        checked={absentIds.has(trainee.id)}
                        onCheckedChange={() => handleToggleAbsent(trainee.id)}
                      />
                      <label
                        htmlFor={trainee.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {trainee.name}
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/batch/${batchId}/student/${trainee.id}`)}
                      className="gap-1 h-7 text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Present: {totalTrainees - absentIds.size} | Absent: {absentIds.size}
            </p>
          </div>

          <Button onClick={handleSaveAttendance} className="gap-2">
            <Save className="w-4 h-4" />
            Save Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSection;
