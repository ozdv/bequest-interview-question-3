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
    console.log("isValid", isValid);
    setIsChainValid(isValid);
  };

  return (
    <div className="bg-background h-screen">
      <Header />
      <div className="flex flex-col p-4 gap-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <DataStatus isChainValid={isChainValid} />
          <AddData loadRecords={loadRecords} />
        </div>
        <DataTable records={records} />
      </div>
    </div>
  );
}
