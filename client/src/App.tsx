import * as React from "react";
import { RecordService } from "./services/RecordService";
import { RecordT } from "./types/Record";
import { AddData } from "./components/AddData";
import { Header } from "./components/Header";
import { DataTable } from "./components/DataTable";
import { DataStatus } from "./components/DataStatus";

const recordService = new RecordService();

export default function App() {
  const [records, setRecords] = React.useState<RecordT[]>([]);
  const [isChainValid, setIsChainValid] = React.useState(true);

  React.useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const fetchedRecords = await recordService.getRecords();
    setRecords(fetchedRecords);
    const isValid = await recordService.verifyChain(fetchedRecords);
    setIsChainValid(isValid);
  };

  const handleRevertToRecord = async (targetRecordId: string) => {
    try {
      const revertedRecords = await recordService.revertToRecord(
        targetRecordId
      );
      setRecords(revertedRecords);
      const isValid = await recordService.verifyChain(revertedRecords);
      setIsChainValid(isValid);
    } catch (error) {
      console.error("Failed to tamper with record:", error);
    }
  };

  const handleSimulateTampering = async (recordId: string) => {
    try {
      await recordService.tamperWithRecord(recordId, {
        message: "This data has been tampered with!",
        originalTimestamp: new Date().toISOString(),
      });
      await loadRecords();
    } catch (error) {
      console.error("Failed to tamper with record:", error);
    }
  };

  return (
    <div className="bg-background h-screen">
      <Header />
      <div className="flex flex-col p-4 gap-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <DataStatus
            isChainValid={isChainValid}
            currentData={records.sort((a, b) => b.timestamp - a.timestamp)[0]}
          />
          <AddData loadRecords={loadRecords} />
        </div>
        <DataTable
          records={records}
          handleRevertToRecord={handleRevertToRecord}
          handleSimulateTampering={handleSimulateTampering}
        />
      </div>
    </div>
  );
}
