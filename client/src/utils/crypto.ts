import { RecordT } from "../types/Record";

// We could in theory add more sophisticated hashing algorithms
// But this is a simple implementation of a hash function using Web Crypto API
export class CryptoUtils {
  static async calculateHash(data: any): Promise<string> {
    if (!data) throw new Error("Data is required");

    // Convert the data to a string
    const message = JSON.stringify(data);

    // Convert string to Uint8Array
    const msgBuffer = new TextEncoder().encode(message);

    // Generate hash using SHA-256
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);

    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }

  static async verifyRecord(
    record: RecordT,
    previousRecord?: RecordT
  ): Promise<boolean> {
    if (!record) return false;

    // Verify the record's own hash
    const calculatedHash = await this.calculateHash({
      id: record.id,
      timestamp: record.timestamp,
      data: record.data,
      previousHash: record.previousHash,
    });

    if (calculatedHash !== record.hash) {
      return false;
    }

    // Verify link to previous record if it exists
    if (previousRecord && record.previousHash !== previousRecord.hash) {
      return false;
    }

    return true;
  }
}
