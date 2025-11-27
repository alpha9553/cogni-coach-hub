import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Save } from "lucide-react";
import { toast } from "sonner";

interface AttendanceSectionProps {
  batchId: string;
}

const AttendanceSection = ({ batchId }: AttendanceSectionProps) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [present, setPresent] = useState("");
  const [absent, setAbsent] = useState("");

  const handleSaveAttendance = () => {
    if (!present || !absent) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Mock save - replace with actual API call later
    toast.success("Attendance saved successfully!");
    setPresent("");
    setAbsent("");
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="present">Present</Label>
            <Input
              id="present"
              type="number"
              placeholder="Number of trainees present"
              value={present}
              onChange={(e) => setPresent(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="absent">Absent</Label>
            <Input
              id="absent"
              type="number"
              placeholder="Number of trainees absent"
              value={absent}
              onChange={(e) => setAbsent(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleSaveAttendance} className="mt-4 gap-2">
          <Save className="w-4 h-4" />
          Save Attendance
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttendanceSection;
