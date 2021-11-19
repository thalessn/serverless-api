import {
  CreateEmployeeModel,
  CreateEmployeeUseCase,
} from '../../domain/usecases/createEmployee'
import { DbCreateEmployeeUseCase } from './dbCreateEmployee'
import { CreateEmployeeRepository } from '../protocols/createEmployeeRepository'
import { EmployeeModel } from '../../domain/employee'

const makeCreateEmployeeRepository = (): CreateEmployeeRepository => {
  class CreateEmployeeRepositoryStub implements CreateEmployeeRepository {
    async add(employee: CreateEmployeeModel): Promise<EmployeeModel> {
      return {
        id: 'id',
        nome: 'John',
        idade: '30',
        cargo: 'Chefia',
      }
    }
  }
  return new CreateEmployeeRepositoryStub()
}

interface SutTypes {
  sut: CreateEmployeeUseCase
  createEmployeeRepositoryStub: CreateEmployeeRepository
}

const makeSut = (): SutTypes => {
  const createEmployeeRepositoryStub = makeCreateEmployeeRepository()
  const sut = new DbCreateEmployeeUseCase(createEmployeeRepositoryStub)
  return {
    sut,
    createEmployeeRepositoryStub,
  }
}

describe('DbCreateEmployee UseCase', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, createEmployeeRepositoryStub } = makeSut()
    const createRepositoryStubSpy = jest.spyOn(
      createEmployeeRepositoryStub,
      'add'
    )
    const employee = {
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    }
    await sut.execute(employee)
    expect(createRepositoryStubSpy).toHaveBeenCalledWith({
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    })
  })
})
