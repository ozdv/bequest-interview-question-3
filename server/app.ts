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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
