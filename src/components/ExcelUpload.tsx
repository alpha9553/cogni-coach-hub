import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, CheckCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

interface ExcelUploadProps {
  onDataParsed: (batches: any[]) => void;
}

const ExcelUpload = ({ onDataParsed }: ExcelUploadProps) => {
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Parse the Excel data into batch format
        const parsedBatches = parseBatchData(jsonData);
        onDataParsed(parsedBatches);

        toast({
          title: "Upload Successful",
          description: `${parsedBatches.length} batches loaded from ${file.name}`,
        });
        setIsUploading(false);
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "Failed to parse Excel file. Please check the format.",
          variant: "destructive",
        });
        setIsUploading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const parseBatchData = (data: any[]): any[] => {
    // This is a simplified parser. Adjust based on actual Excel structure
    const batches: any[] = [];
    const batchMap = new Map();

    data.forEach((row: any) => {
      const batchId = row["Batch ID"] || row["BatchID"] || row["batch_id"];
      if (!batchId) return;

      if (!batchMap.has(batchId)) {
        batchMap.set(batchId, {
          id: batchId,
          name: row["Batch Name"] || row["BatchName"] || `Batch ${batchId}`,
          description: row["Description"] || row["Course"] || "",
          totalTrainees: 0,
          trainer: row["Trainer"] || "N/A",
          behavioralTrainer: row["Behavioral Trainer"] || row["BH Trainer"] || "N/A",
          mentor: row["Mentor"] || "N/A",
          startDate: row["Start Date"] || row["StartDate"] || "",
          endDate: row["End Date"] || row["EndDate"] || "",
          status: row["Status"]?.toLowerCase() || "active",
          scheduleStatus: {
            onSchedule: 0,
            behind: 0,
            advanced: 0,
          },
          milestones: {
            qualifier: { 
              completed: row["Qualifier Completed"] === "Yes" || false, 
              date: row["Qualifier Date"] || "" 
            },
            interim: { 
              completed: row["Interim Completed"] === "Yes" || false, 
              date: row["Interim Date"] || "" 
            },
            final: { 
              completed: row["Final Completed"] === "Yes" || false, 
              date: row["Final Date"] || "" 
            },
          },
          roomDetails: {
            building: row["Building"] || "SDB1",
            floor: parseInt(row["Floor"]) || 1,
            odcNumber: row["ODC Number"] || row["Room"] || "",
          },
          stakeholders: {
            trainer: {
              name: row["Trainer"] || "N/A",
              hours: parseInt(row["Trainer Hours"]) || 100,
              hourlyRate: parseInt(row["Trainer Rate"]) || 500,
            },
            behavioralTrainer: {
              name: row["Behavioral Trainer"] || row["BH Trainer"] || "N/A",
              hours: parseInt(row["BH Trainer Hours"]) || 80,
              hourlyRate: parseInt(row["BH Trainer Rate"]) || 450,
            },
            mentor: {
              name: row["Mentor"] || "N/A",
              hours: parseInt(row["Mentor Hours"]) || 100,
              hourlyRate: parseInt(row["Mentor Rate"]) || 600,
            },
          },
          qualifierScores: {
            average: parseInt(row["Qualifier Avg"]) || 0,
            highest: parseInt(row["Qualifier High"]) || 0,
            lowest: parseInt(row["Qualifier Low"]) || 0,
            passRate: parseInt(row["Qualifier Pass Rate"]) || 0,
          },
        });
      }

      const batch = batchMap.get(batchId);
      batch.totalTrainees++;

      const scheduleStatus = row["Schedule Status"] || row["ScheduleStatus"] || "";
      if (scheduleStatus.toLowerCase().includes("behind")) {
        batch.scheduleStatus.behind++;
      } else if (scheduleStatus.toLowerCase().includes("advanced")) {
        batch.scheduleStatus.advanced++;
      } else {
        batch.scheduleStatus.onSchedule++;
      }
    });

    batches.push(...batchMap.values());
    return batches;
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          Upload Batch Data
        </CardTitle>
        <CardDescription>
          Upload your Excel file to automatically update all batch dashboards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="relative overflow-hidden"
            disabled={isUploading}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : "Choose Excel File"}
          </Button>
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>{fileName}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelUpload;
