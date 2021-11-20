import { EmployeeModel } from '../../domain/employee'
import { UpdateEmployeeModel } from '../../domain/usecases/updateEmployee'
import { DbUpdateEmployeeUseCase } from './dbUpdateEmployee'
import { UpdateEmployeeRepository } from '../protocols/updateEmployeeRepository'

const makeUpdateEmployeeRepositoryStub = (): UpdateEmployeeRepository => {
  class UpdateEmployeeRepository implements UpdateEmployeeRepository {
    async update(employeeData: UpdateEmployeeModel): Promise<EmployeeModel> {
      const updatedModel = {
        ...employeeData,
      }
      return updatedModel
    }
  }
  return new UpdateEmployeeRepository()
}

interface SutTypes {
  sut: DbUpdateEmployeeUseCase
  updateEmployeeRepositoryStub: UpdateEmployeeRepository
}

const makeSut = (): SutTypes => {
  const updateEmployeeRepositoryStub = makeUpdateEmployeeRepositoryStub()
  const sut = new DbUpdateEmployeeUseCase(updateEmployeeRepositoryStub)
  return {
    sut,
    updateEmployeeRepositoryStub,
  }
}

describe('DbUpdateEmployeeUseCase', () => {
  it('Should call UpdateEmployeeRepository with correct values', async () => {
    const { sut, updateEmployeeRepositoryStub } = makeSut()
    const updateRepositoryStubSpy = jest.spyOn(
      updateEmployeeRepositoryStub,
      'update'
    )
    const employee = {
      id: '1234',
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    }
    const updatedEmployee = await sut.execute(employee)
    expect(updateRepositoryStubSpy).toHaveBeenCalledWith({
      id: '1234',
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    })
  })

  it('Should throw if UpdateEmployeeRepository throws', async () => {
    const { sut, updateEmployeeRepositoryStub } = makeSut()
    jest
      .spyOn(updateEmployeeRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const employeeData = {
      id: '1234',
      nome: 'John',
      idade: '30',
      cargo: 'Chefia',
    }
    const promise = sut.execute(employeeData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return an Employee on sucess', async () => {
    const { sut } = makeSut()
    const employeeData = {
      id: '1234',
      nome: 'Thales',
      idade: '28',
      cargo: 'Desenvolvedor',
    }
    const employee = await sut.execute(employeeData)
    expect(employee).toEqual({
      id: '1234',
      nome: 'Thales',
      idade: '28',
      cargo: 'Desenvolvedor',
    })
  })
})
