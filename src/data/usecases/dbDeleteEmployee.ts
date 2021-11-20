import { DeleteEmployeeUseCase } from '../../domain/usecases/deleteEmployee'
import { DeleteEmployeeRepository } from '../protocols/deleteEmployeeRepository'

export class DbDeleteEmployeeUseCase implements DeleteEmployeeUseCase {
  private readonly deleteEmployeeRepository: DeleteEmployeeRepository

  constructor(deleteEmployeeRepository: DeleteEmployeeRepository) {
    this.deleteEmployeeRepository = deleteEmployeeRepository
  }

  async execute(id: string): Promise<void> {
    try {
      await this.deleteEmployeeRepository.delete(id)
    } catch (error: any) {
      throw new Error('Error on delete employee')
    }
  }
}
