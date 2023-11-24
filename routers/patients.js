import { Router } from 'express'

export const createPatientsRouter = ({ patientModel }) => {
  const patientsRouter = Router()
  // const patientsController = new PatientsController({ patientModel })

  return patientsRouter
}
