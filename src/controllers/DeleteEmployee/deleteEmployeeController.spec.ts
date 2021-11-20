import { MissingParamError } from '../errors/missing-param-error'
import { DeleteEmployeeController } from './deleteEmployeeController'
import { DeleteEmployeeUseCase } from '../../domain/usecases/deleteEmployee'

const makeDeleteEmployeeUseCaseStub = (): DeleteEmployeeUseCase => {
  class DeleteEmployeeUseCaseStub implements DeleteEmployeeUseCase {
    async execute(id: string): Promise<void> {}
  }
  return new DeleteEmployeeUseCaseStub()
}

interface SutType {
  sut: DeleteEmployeeController
  deleteEmployeeUseCase: DeleteEmployeeUseCase
}

const makeSut = (): SutType => {
  const deleteEmployeeUseCase = makeDeleteEmployeeUseCaseStub()
  const sut = new DeleteEmployeeController(deleteEmployeeUseCase)
  return {
    sut,
    deleteEmployeeUseCase,
  }
}

describe('DeleteEmployeeController', () => {
  it('Should return error 400 if property id not found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('id'))
  })

  it('Should call DeleteEmployeeUseCase with the correct values', async () => {
    const { sut, deleteEmployeeUseCase } = makeSut()
    const deleteSpy = jest.spyOn(deleteEmployeeUseCase, 'execute')
    const httpRequest = {
      body: {
        id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
      },
    }

    await sut.handle(httpRequest)
    expect(deleteSpy).toHaveBeenCalledWith(
      'da563c88-c47d-4f1d-a501-08d7b70e3e17'
    )
  })

  it('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'da563c88-c47d-4f1d-a501-08d7b70e3e17',
      },
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(201)
  })
})
