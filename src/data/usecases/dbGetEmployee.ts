import { EmployeeModel } from '../../domain/employee'
import { GetEmployeeUseCase } from '../../domain/usecases/getEmployee'
import { GetEmployeeRepository } from '../protocols/getEEmployeeRepository'

export class DbGetEmployeeUseCase implements GetEmployeeUseCase {
  private readonly getEmployeeRepository
  constructor(getEmployeeRepository: GetEmployeeRepository) {
    this.getEmployeeRepository = getEmployeeRepository
  }

  async execute(id: string): Promise<EmployeeModel> {
    const employee = this.getEmployeeRepository.get(id)
    return employee
  }
}
