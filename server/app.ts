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

const app = express();
app.use(cors());
app.use(express.json());

let records: RecordT[] = [];

// This is the endpoint that will be used to add a new record
app.post("/records", (req, res) => {
  const { data } = req.body;
  const previousRecord = records[records.length - 1];

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

  records.push(record);
  res.json(record);
});

// This is the endpoint that will be used to get all of the records
app.get("/records", (req, res) => {
  res.json(records);
});

// This is the endpoint that will be used to revert to a specific record
app.post("/records/revert/:id", (req, res) => {
  const { id } = req.params;
  records = records.filter((record) => record.id !== id);
  res.json(records);
});

// This endpoint will simulate tampering by modifying data without updating the hash
app.patch("/records/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const recordIndex = records.findIndex((record) => record.id === id);
  if (recordIndex === -1) {
    return res.status(404).json({ error: "Record not found" });
  }

  records[recordIndex] = {
    ...records[recordIndex],
    data: data,
  };

  res.json(records[recordIndex]);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
