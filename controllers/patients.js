export class PatientsController {
  constructor ({ patientModel }) {
    this.patientModel = patientModel
  }

  getAll = async (req, res) => {
    const patients = await this.patientModel.getAll()
    res.json(patients)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const patient = await this.patientModel.getById({ id })
    res.json(patient)
  }
}
