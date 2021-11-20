import { CreateEmployeeRepository } from '../../data/protocols/createEmployeeRepository'
import { EmployeeModel } from '../../domain/employee'
import { CreateEmployeeModel } from '../../domain/usecases/createEmployee'
import { dynamoClient } from './dynamoClient'
import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class DynamoRepository implements CreateEmployeeRepository {
  async add(employeeData: CreateEmployeeModel): Promise<EmployeeModel> {
    const employee = {
      id: uuidv4(),
      ...employeeData,
    }

    const params: PutItemCommandInput = {
      TableName: 'employee',
      Item: marshall(employee),
    }

    const result = await dynamoClient.send(new PutItemCommand(params))
    if (result && result.$metadata.httpStatusCode === 200) {
      return employee
    }

    throw new Error('It was not possible to connect to the bank')
  }
}
