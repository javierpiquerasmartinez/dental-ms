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
    if (patient.length === 0) {
      return res.status(404).json({ err: 'Patient not found' })
    }
    res.json(patient)
  }

  create = async (req, res) => {
    const { firstName, familyName, address, phoneNumber, details } = req.body
    const patient = await this.patientModel.create({ firstName, familyName, address, phoneNumber, details })
    res.status(201).json(patient)
  }

  update = async (req, res) => {
    // TODO: Validate if patient exists
    // TODO: Validate patient data
    const { id } = req.params
    const [previousPatientData] = await this.patientModel.getById({ id })
    const newPatientData = { ...previousPatientData, ...req.body }
    await this.patientModel.update(newPatientData)
    res.status(200).send()
  }
}
