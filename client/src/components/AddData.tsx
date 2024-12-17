import * as React from "react";
import { RecordService } from "../services/RecordService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const recordService = new RecordService();

export function AddData({ loadRecords }: { loadRecords: () => Promise<void> }) {
  const [newData, setNewData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(newData);
    if (!newData.trim()) return;

    try {
      setIsLoading(true);
      await recordService.createRecord({ content: newData });
      setNewData("");
      await loadRecords();
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating record:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 flex-col border rounded-xl p-4 shadow-sm border-border w-full"
    >
      <h3 className="text-lg font-bold mb-3">Add Data Records</h3>

      <Input
        type="text"
        placeholder="Enter data"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
      />

      <Button variant="default" type="submit" disabled={isLoading || !newData}>
        {isLoading ? "Adding..." : "Add Record"}
      </Button>
    </form>
  );
}
