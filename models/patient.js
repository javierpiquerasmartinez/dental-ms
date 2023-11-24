import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'dentalms'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class PatientModel {
  static async getAll () {
    const [patients] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, first_name, family_name, address, phone_number, details FROM patient;'
    )
    return patients
  }

  static async getById ({ id }) {
    const [patient] = await connection.query(
        `SELECT BIN_TO_UUID(id) as id, first_name, family_name, address, phone_number, details 
        FROM patient WHERE BIN_TO_UUID(id) = ?`, [id]
    )
    return patient
  }
}
