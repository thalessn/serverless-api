import { CreateEmployeeController } from './CreateEmployeeController'
import { MissingParamError } from '../errors/missing-param-error'

describe('CreateEmployeeController', () => {
  it('Should return error 400 if property name not found', () => {
    const sut = new CreateEmployeeController()
    const httpRequest = {
      body: {
        idade: '30',
        cargo: 'chefia',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('Should return error 400 if property idade not found', () => {
    const sut = new CreateEmployeeController()
    const httpRequest = {
      body: {
        name: 'John',
        cargo: 'chefia',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('idade'))
  })
})
