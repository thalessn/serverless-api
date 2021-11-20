import { EmployeeModel } from '../../domain/employee'
import { GetEmployeeRepository } from '../protocols/getEEmployeeRepository'
import { DbGetEmployeeUseCase } from './dbGetEmployee'

const makeGetEmployeeRepositoryStub = (): GetEmployeeRepository => {
  class GetEmployeeRepositoryStub implements GetEmployeeRepository {
    async get(id: string): Promise<EmployeeModel> {
      const employee = {
        id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
        nome: 'Thales',
        idade: '28',
        cargo: 'Desenvolvedor',
      }
      return employee
    }
  }
  return new GetEmployeeRepositoryStub()
}

interface SutTypes {
  sut: DbGetEmployeeUseCase
  getEmployeeRepositoryStub: GetEmployeeRepository
}

const makeSut = (): SutTypes => {
  const getEmployeeRepositoryStub = makeGetEmployeeRepositoryStub()
  const sut = new DbGetEmployeeUseCase(getEmployeeRepositoryStub)
  return {
    sut,
    getEmployeeRepositoryStub,
  }
}

describe('DbGetEmployeeUseCase', () => {
  it('Should call the Repository with correct values', async () => {
    const { sut, getEmployeeRepositoryStub } = makeSut()
    const getRepositorySpy = jest.spyOn(getEmployeeRepositoryStub, 'get')
    const id = 'da563c88-c47d-4f1d-a501-08d7b70e3e17'
    const employee = await sut.execute(id)
    expect(getRepositorySpy).toHaveBeenCalledWith(id)
  })

  it('Should return an Employee on sucess', async () => {
    const { sut } = makeSut()
    const id = 'da563c88-c47d-4f1d-a501-08d7b70e3e17'
    const employee = await sut.execute(id)
    expect(employee).toEqual({
      id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
      nome: 'Thales',
      idade: '28',
      cargo: 'Desenvolvedor',
    })
  })
})
