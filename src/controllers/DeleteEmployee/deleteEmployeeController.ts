import { DeleteEmployeeUseCase } from '../../domain/usecases/deleteEmployee'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class DeleteEmployeeController implements Controller {
  private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase
  constructor(deleteEmployeeUseCase: DeleteEmployeeUseCase) {
    this.deleteEmployeeUseCase = deleteEmployeeUseCase
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body['id']) {
        return badRequest(new MissingParamError('id'))
      }

      const { id } = httpRequest.body
      await this.deleteEmployeeUseCase.execute(id)

      return {
        statusCode: 201,
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: 'Server Error',
      }
    }
  }
}
