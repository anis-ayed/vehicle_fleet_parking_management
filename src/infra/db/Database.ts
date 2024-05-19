import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Provides access to the MongoDB database.
 */
export class Database {
  private db!: Db;
  private client!: MongoClient;

  /**
   * Initializes the DatabaseProvider and connects to the database.
   * @throws Will throw an error if the connection to the database fails.
   */
  constructor() {
    const uri: string | undefined = process.env.URI;
    if (!uri) {
      throw new Error('Database URI is not defined in environment variables.');
    }

    this.client = new MongoClient(uri, {});

    this.client
      .connect()
      .then(() => {
        this.db = this.client.db('VehicleParkManagementTest');
      })
      .catch(error => {
        throw new Error(`Failed to connect to the database: ${error.message}`);
      });
  }

  /**
   * Returns the database instance.
   * @returns {Db} The MongoDB database instance.
   */
  getDatabase(): Db {
    if (!this.db) {
      throw new Error('Database connection has not been established yet.');
    }
    return this.db;
  }

  public disconnect(): void {
    this.client.close();
  }
}
