import express from "express";
import cors from "cors";
import { CryptoUtils } from "./utils/crypto";

type RecordT = {
  id: string;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
};

type RecordHistoryT = {
  originalRecords: RecordT[];
  currentRecords: RecordT[];
};

const app = express();
app.use(cors());
app.use(express.json());

let chainHistory: RecordHistoryT = {
  originalRecords: [],
  currentRecords: [],
};

// This is the endpoint that will be used to add a new record
app.post("/records", (req, res) => {
  const { data } = req.body;
  const previousRecord =
    chainHistory.currentRecords[chainHistory.currentRecords.length - 1];

  const record = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    data,
    previousHash: previousRecord ? previousRecord.hash : "0",
    hash: "",
  };

  record.hash = CryptoUtils.calculateHash({
    id: record.id,
    timestamp: record.timestamp,
    data: record.data,
    previousHash: record.previousHash,
  });

  chainHistory.originalRecords.push({ ...record });
  chainHistory.currentRecords.push(record);
  res.json(record);
});

// This is the endpoint that will be used to get all of the records
app.get("/records", (req, res) => {
  res.json(chainHistory.currentRecords);
});

// This is the endpoint that will be used to revert to a specific record
app.post("/records/revert/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the record to revert to
  const revertIndex = chainHistory.originalRecords.findIndex(
    (record) => record.id === id
  );

  if (revertIndex === -1) {
    return res.status(404).json({ error: "Record not found" });
  }

  // Restore the chain up to and including the specified record
  chainHistory.currentRecords = chainHistory.originalRecords
    .slice(0, revertIndex + 1)
    .map((record) => ({ ...record }));

  res.json(chainHistory.currentRecords);
});

// This endpoint will simulate tampering by modifying data without updating the hash
app.patch("/records/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const recordIndex = chainHistory.currentRecords.findIndex(
    (record) => record.id === id
  );
  if (recordIndex === -1) {
    return res.status(404).json({ error: "Record not found" });
  }

  // Modify the data without recalculating the hash
  chainHistory.currentRecords[recordIndex] = {
    ...chainHistory.currentRecords[recordIndex],
    data: data,
  };

  res.json(chainHistory.currentRecords[recordIndex]);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
