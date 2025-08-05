import mongoose from 'mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';

export class CreateBudgetUseCase {}

// PASSOS
// 1 - criar a classe testada. no caso 'CreateBudgetUseCase'
// 2 - criar mock/spy das suas dependências para simular o retorno controlado
// 3 - a implementação do repository será pelo mock/spy

let mongodbContainer: StartedMongoDBContainer;

beforeAll(async () => {
  mongodbContainer = await new MongoDBContainer('mongo:6.0.1').start();
  const uri = mongodbContainer.getConnectionString();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongodbContainer.stop();
});

describe('Budget use cases', () => {
  it('should create a budget', async () => {
    const sut = new CreateBudgetUseCase();

    expect();
  });
});
