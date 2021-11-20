import { MissingParamError } from '../errors/missing-param-error'
import { DeleteEmployeeController } from './deleteEmployeeController'

describe('DeleteEmployeeController', () => {
  it('Should return error 400 if property id not found', async () => {
    const sut = new DeleteEmployeeController()
    const httpRequest = {
      body: {},
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('id'))
  })
})
