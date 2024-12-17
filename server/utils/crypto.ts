import crypto from "crypto";

// We could in theory add more sophisticated hashing algorithms
// But this is a simple implementation of a hash function

export class CryptoUtils {
  static calculateHash(data: any): string {
    if (!data) throw new Error("Data is required");

    return crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");
  }
}
