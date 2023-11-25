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
  // TODO: Patient exists()

  static async getAll () {
    const [patients] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, first_name as firstName, family_name as familyName, address as address, phone_number as phoneNumber, details as details FROM patient;'
    )
    return patients
  }

  static async getById ({ id }) {
    try {
      const [patient] = await connection.query(
            `SELECT BIN_TO_UUID(id) as id, first_name as firstName, family_name as familyName, address as address, phone_number as phoneNumber, details as details 
            FROM patient WHERE BIN_TO_UUID(id) = ?`, [id]
      )
      return patient
    } catch (e) {
      console.error(e)
      return false
    }
  }

  // TODO: Error handling
  static async create ({ firstName, familyName, address, phoneNumber, details }) {
    try {
      const [[{ id }]] = await connection.query(`
            SELECT UUID() as id;
        `)
      await connection.query(`
        INSERT INTO patient (id, first_name, family_name, address, phone_number, details) VALUES
        (UUID_TO_BIN(?), ?, ?, ?, ?, ?);`, [id, firstName, familyName, address, phoneNumber, details])
      const [patient] = await connection.query(
        `SELECT BIN_TO_UUID(id) as id, first_name, family_name, address, phone_number, details 
        FROM patient WHERE BIN_TO_UUID(id) = ?`, [id])
      return patient
    } catch (e) {
      console.error(e)
      return false
    }
  }

  static async update ({ id, firstName, familyName, address, phoneNumber, details }) {
    try {
      await connection.query(`
          UPDATE patient 
          SET first_name = ?, family_name = ?, address = ?, phone_number = ?, details = ?
          WHERE BIN_TO_UUID(id) = ?`, [firstName, familyName, address, phoneNumber, details, id])
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  static async delete ({ id }) {
    try {
      await connection.query(`
            DELETE FROM patient 
            WHERE BIN_TO_UUID(id) = ?`, [id])
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}
