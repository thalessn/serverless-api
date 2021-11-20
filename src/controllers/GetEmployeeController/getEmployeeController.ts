import { GetEmployeeUseCase } from '../../domain/usecases/getEmployee'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class GetEmployeeController implements Controller {
  private readonly getEmployeeUseCase: GetEmployeeUseCase
  constructor(getEmployeeUseCase: GetEmployeeUseCase) {
    this.getEmployeeUseCase = getEmployeeUseCase
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params['id']) {
        return badRequest(new MissingParamError('id'))
      }

      const { id } = httpRequest.params
      const employee = await this.getEmployeeUseCase.execute(id)
      return {
        statusCode: 201,
        body: employee,
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: error.message,
      }
    }
  }
}
