import express, { json } from 'express'
import { corsMiddleware } from '../middlewares/cors.js'
import 'dotenv/config'
import { createPatientsRouter } from '../routers/patients.js'

export const createApp = ({ patientModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  const PORT = process.env.port ?? 3000

  app.use('/patients', createPatientsRouter({ patientModel }))

  app.listen(PORT, () => {
    console.info(`Server listening on port http://localhost:${PORT}`)
  })
}
