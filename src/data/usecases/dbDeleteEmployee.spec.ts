import { DeleteEmployeeUseCase } from '../../domain/usecases/deleteEmployee'
import { DeleteEmployeeRepository } from '../protocols/deleteEmployeeRepository'
import { DbDeleteEmployeeUseCase } from './dbDeleteEmployee'

const makeDeleteEmployeeRepositoryStub = (): DeleteEmployeeRepository => {
  class DbDeleteEmployeeRepositoryStub implements DeleteEmployeeRepository {
    async delete(id: string): Promise<void> {}
  }
  return new DbDeleteEmployeeRepositoryStub()
}

interface SutTypes {
  sut: DeleteEmployeeUseCase
  deleteEmployeeRepositoryStub: DeleteEmployeeRepository
}

const makeSut = (): SutTypes => {
  const deleteEmployeeRepositoryStub = makeDeleteEmployeeRepositoryStub()
  const sut = new DbDeleteEmployeeUseCase(deleteEmployeeRepositoryStub)
  return {
    sut,
    deleteEmployeeRepositoryStub,
  }
}

describe('DbDeleteEmployeeUseCase', () => {
  it('Should call Repository with correct values', () => {
    const { sut, deleteEmployeeRepositoryStub } = makeSut()
    const id = '7895464899'
    const repositorySpy = jest.spyOn(deleteEmployeeRepositoryStub, 'delete')
    sut.execute(id)
    expect(repositorySpy).toHaveBeenCalledWith(id)
  })

  it('Should throw if CreateEmployeeRepository throws', async () => {
    const { sut, deleteEmployeeRepositoryStub } = makeSut()
    jest
      .spyOn(deleteEmployeeRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const id = '7898797979'
    const promise = sut.execute(id)
    await expect(promise).rejects.toThrow()
  })
})
