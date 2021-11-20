import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { makeCreateEmployeeController } from './factories/controllers/createEmployeeFactory'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body ? JSON.parse(event.body) : ''
    const controller = makeCreateEmployeeController()
    const response = await controller.handle({ body: body })
    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body),
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      body: err.message,
    }
  }
}
