import mongoose from 'mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { BudgetDto } from './dtos/budget.dto';
import { BudgetModel } from './database/Budget.model';

export class CreateBudgetUseCase {
  async execute(budgetDto: BudgetDto) {
    const budget = await BudgetModel.create(budgetDto);

    return budget;
  }
}

// PASSOS
// 1 - criar a classe testada. no caso 'CreateBudgetUseCase'
// 2 - criar mock/spy das suas dependências para simular o retorno controlado
// 3 - a implementação do repository será pelo mock/spy

let mongodbContainer: StartedMongoDBContainer;

beforeAll(async () => {
  mongodbContainer = await new MongoDBContainer('mongo:6.0.1').start();
  const uri = mongodbContainer.getConnectionString();
  await mongoose.connect(uri, {
    directConnection: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongodbContainer.stop();
});

describe('Budget use cases', () => {
  it('should create a budget', async () => {
    const mockData: BudgetDto = {
      id: 123,
      client: {
        name: 'joão da silva',
        email: 'joao.silva@email.com',
        phone: '11987654321',
      },
      status: undefined,
      service: {
        type: 'instalação elétrica',
        description: 'serviço completo de instalação elétrica residencial',
        budgetItems: [
          {
            name: 'fios elétricos',
            description: 'fios para rede elétrica',
            quantity: 50,
            unit_price: 3.5,
          },
          {
            name: 'interruptores',
            quantity: 10,
            unit_price: 12.0,
          },
        ],
        materialsNeeded: ['fios', 'interruptores', 'caixa de passagem'],
        urgency: false,
        specificRequirements: 'usar material isolante reforçado',
        locationDetails: 'rua das flores, 123',
        complexityLevel: 'MEDIUM',
      },
      quote: {
        price: '2500.00',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        estimatedDurationDays: 5,
        paymentTerms: '50% na assinatura, 50% na entrega',
        conditions: 'garantia de 1 ano',
      },
      createdAt: new Date(),
      lastUpdate: new Date(),
    };

    const sut = new CreateBudgetUseCase();

    const teste = await sut.execute(mockData);

    console.log(teste);

    expect(teste).toBeDefined();
  });
});
