export class PatientsController {
  constructor ({ patientModel }) {
    this.patientModel = patientModel
  }

  getAll = async (req, res) => {
    const patients = await this.patientModel.getAll()
    res.json(patients)
  }
}
