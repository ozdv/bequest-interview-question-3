# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached.

## Questions

### **1. How does the client ensure that their data has not been tampered with?**

There are multiple ways to ensure that data has not been tampered with.

It is worth noting that the data should be stored in an encrypted database. Such that even if the data could be accessed, it would make it more difficulty to tamper with. However, this is not a perfect solution, as the data could still be tampered with if the database is breached, or if the encryption key is compromised. As such the data ought to be stored in such a way that makes it secure from both internal and external threats.

One of more exciting ways is to use a blockchain to store the data. This way, the data is immutable, and tampering with the data would be extremely difficult. This is through storing the data along with a hash of the previous data, (along with a timestamp, or unique identifier, and other sorts of metadata) we can ensure that the data has not been tampered with. This way the client can be sure that the data has not been tampered with and can even verify the integrity of the data by checking the blockchain. This is a very secure way to store data, but it is also very slow and expensive. (Though the future of blockchain technology is promising, and the time will come when this is the norm!)

Another way is to use a hash function to hash the data and store the hash in the database. This way, if the data is tampered with, the hash will change and the client can detect the tampering. This is a more traditional approach and is still very secure. The pro of this approach is that unlike blockchain, this data can be evaluated as tampered or not tampered with relatively quickly.

You can also add in a digital signature to the data, which is a hash of the data and a private key. This way, the client can be sure that the data has not been tampered with, and the server can be sure that the data has not been tampered with. And as the data grows, you could use a merkle tree to store the data, which would allow for efficient verification of larger data sets.

### **2. If the data has been tampered with, how can the client recover the lost data?**

So what's so awesome about blockchain and hash functions is that they are deterministic. Meaning that if (or when!) data is tampered with, the hash will have been changed, but the data is still stored in the database, and the data can be recovered to its original state prior to any sort of funny business.

By using a hash function, we shall ensure that the data has not been tampered with. And when it is, we will recover the data to its original state.

## To run the apps

`npm run start` in both the frontend and backend
