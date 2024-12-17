import { CryptoUtils } from "../utils/crypto";
import { RecordT } from "../types/Record";

const API_URL = "http://localhost:8080";

export class RecordService {
  async createRecord(data: any): Promise<RecordT> {
    const response = await fetch(`${API_URL}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error("Failed to create record");
    }

    return response.json();
  }

  async getRecords(): Promise<RecordT[]> {
    const response = await fetch(`${API_URL}/records`);
    if (!response.ok) {
      throw new Error("Failed to fetch records");
    }
    return response.json();
  }

  async verifyChain(records: RecordT[]): Promise<boolean> {
    for (let i = 0; i < records.length; i++) {
      const previousRecord = i > 0 ? records[i - 1] : undefined;
      if (!(await CryptoUtils.verifyRecord(records[i], previousRecord))) {
        return false;
      }
    }
    return true;
  }
}
