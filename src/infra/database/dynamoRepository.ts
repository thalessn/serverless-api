import { CreateEmployeeRepository } from '../../data/protocols/createEmployeeRepository'
import { EmployeeModel } from '../../domain/employee'
import { CreateEmployeeModel } from '../../domain/usecases/createEmployee'
import { dynamoClient } from './dynamoClient'
import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import { DeleteEmployeeRepository } from '../../data/protocols/deleteEmployeeRepository'

const TableName = 'employee'

export class DynamoRepository
  implements CreateEmployeeRepository, DeleteEmployeeRepository
{
  async add(employeeData: CreateEmployeeModel): Promise<EmployeeModel> {
    const employee = {
      id: uuidv4(),
      ...employeeData,
    }

    const params: PutItemCommandInput = {
      TableName,
      Item: marshall(employee),
    }

    const result = await dynamoClient.send(new PutItemCommand(params))
    if (result && result.$metadata.httpStatusCode === 200) {
      return employee
    }

    throw new Error('It was not possible to connect to the bank')
  }

  async delete(id: string): Promise<void> {
    const params: DeleteItemCommandInput = {
      TableName,
      Key: marshall({
        id,
      }),
    }

    const result = await dynamoClient.send(new DeleteItemCommand(params))
    if (result && result.$metadata.httpStatusCode !== 200)
      throw new Error('It was not possible to connect to the bank')
  }
}
