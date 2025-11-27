import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingDown, TrendingUp } from "lucide-react";

interface Batch {
  id: string;
  name: string;
  description: string;
  totalTrainees: number;
  scheduleStatus: {
    onSchedule: number;
    behind: number;
    advanced: number;
  };
}

interface BatchCardProps {
  batch: Batch;
  index: number;
}

const BatchCard = ({ batch, index }: BatchCardProps) => {
  const navigate = useNavigate();
  
  const onSchedulePercent = (batch.scheduleStatus.onSchedule / batch.totalTrainees) * 100;
  const behindPercent = (batch.scheduleStatus.behind / batch.totalTrainees) * 100;

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => navigate(`/batch/${batch.id}`)}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{batch.name}</span>
          <Users className="w-5 h-5 text-muted-foreground" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">{batch.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Trainees</span>
          <span className="text-2xl font-bold">{batch.totalTrainees}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-success">
              <TrendingUp className="w-4 h-4" />
              On Schedule
            </span>
            <span className="font-semibold">{onSchedulePercent.toFixed(0)}%</span>
          </div>
          <Progress value={onSchedulePercent} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-warning">
              <TrendingDown className="w-4 h-4" />
              Behind Schedule
            </span>
            <span className="font-semibold">{behindPercent.toFixed(0)}%</span>
          </div>
          <Progress value={behindPercent} className="h-2" />
        </div>

        <div className="pt-2 border-t grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="text-muted-foreground">On Track</p>
            <p className="text-lg font-bold text-success">{batch.scheduleStatus.onSchedule}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Behind</p>
            <p className="text-lg font-bold text-warning">{batch.scheduleStatus.behind}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Advanced</p>
            <p className="text-lg font-bold text-info">{batch.scheduleStatus.advanced}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchCard;
