import { Router } from 'express'
import { PatientsController } from '../controllers/patients.js'

export const createPatientsRouter = ({ patientModel }) => {
  const patientsRouter = Router()
  const patientsController = new PatientsController({ patientModel })

  patientsRouter.get('/', patientsController.getAll)
  // patientsRouter.get('/:id', patientsController.getById )

  // patientsRouter.post('/', patientsController.create)

  // patientsRouter.patch('/:id', patientsController.update)

  // patientsRouter.delete('/:id', patientsController.delete)

  return patientsRouter
}
