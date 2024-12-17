import * as React from "react";
import { RecordService } from "./services/RecordService";
import { RecordT } from "./types/Record";

const recordService = new RecordService();

export default function App() {
  const [records, setRecords] = React.useState<RecordT[]>([]);
  const [newData, setNewData] = React.useState("");
  const [isChainValid, setIsChainValid] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const fetchedRecords = await recordService.getRecords();
    setRecords(fetchedRecords);
    const isValid = await recordService.verifyChain(fetchedRecords);
    setIsChainValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div style={{ padding: "20px" }}>
      <h1>Tamper-Proof Records</h1>

      <div style={{ marginBottom: "20px" }}>
        <h3>Chain Status: {isChainValid ? "✅ Valid" : "❌ Tampered"}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter data"
        />
        <button type="submit">Add Record</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {records.map((record) => (
          <div
            key={record.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <div>ID: {record.id}</div>
            <div>Data: {JSON.stringify(record.data)}</div>
            <div>Timestamp: {new Date(record.timestamp).toLocaleString()}</div>
            <div>Previous Hash: {record.previousHash}</div>
            <div>Hash: {record.hash}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
