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
    // Sort records by timestamp to ensure proper order
    const sortedRecords = [...records].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    for (let i = 0; i < sortedRecords.length; i++) {
      const previousRecord = i > 0 ? sortedRecords[i - 1] : undefined;
      if (!(await CryptoUtils.verifyRecord(sortedRecords[i], previousRecord))) {
        return false;
      }
    }
    return true;
  }

  async revertToRecord(targetRecordId: string): Promise<RecordT[]> {
    const response = await fetch(
      `${API_URL}/records/revert/${targetRecordId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to revert chain");
    }

    return response.json();
  }
}
