import { Database } from 'sqlite3'

export default class SqlDatabase {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename)
  }

  async getOne<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    const rows = await this.getAll(sql, params);
    return rows[0];
  }

  async getAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(sql)
      stmt.all(...params, (err: Error | undefined, rows: any[]) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}
