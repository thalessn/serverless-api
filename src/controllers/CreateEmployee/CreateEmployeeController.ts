import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
export class CreateEmployeeController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      }
    }
    if (!httpRequest.body.idade) {
      return {
        statusCode: 400,
        body: new MissingParamError('idade'),
      }
    }
    return {
      statusCode: 200,
    }
  }
}
