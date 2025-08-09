import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';
import { STATUS } from 'src/entities/Budget';
import { InvalidDomainParamError } from 'src/entities/domain.error';

class Client {
  @prop({ required: true, _id: false })
  public name!: string;

  @prop({ required: true, _id: false })
  public email!: string;

  @prop({ required: true, _id: false })
  public phone!: string;
}

export class BudgetItem {
  @prop({ required: true, _id: false })
  public name!: string;

  @prop({ _id: false })
  public description?: string;

  @prop({ required: true, _id: false })
  public quantity!: number;

  @prop({ required: true, _id: false })
  public unit_price!: number;

  @prop({ required: true, _id: false })
  public total_price!: number;
}

export class Service {
  @prop({ required: true })
  public type!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true, type: () => [BudgetItem], _id: false })
  public budgetItems!: BudgetItem[];

  @prop({ required: true, type: () => [String] })
  public materialsNeeded!: string[];

  @prop({ required: true })
  public urgency!: boolean;

  @prop()
  public specificRequirements?: string;

  @prop()
  public locationDetails?: string;

  @prop({ required: true, enum: ['LOW', 'MEDIUM', 'HIGH'] })
  public complexityLevel!: 'LOW' | 'MEDIUM' | 'HIGH';
}

export class Quote {
  @prop({ required: true })
  public price!: string;

  @prop({ required: true })
  public validUntil!: Date;

  @prop({ required: true })
  public estimatedDurationDays!: number;

  @prop({ required: true })
  public paymentTerms!: string;

  @prop({ required: true })
  public conditions!: string;
}

export class Budget {
  @prop({ required: true, unique: true })
  public id!: number;

  @prop({ required: true, _id: false, type: () => Client })
  public client!: Client;

  @prop({ required: true, enum: STATUS, default: STATUS.PENDING })
  public status!: STATUS;

  @prop({ required: true, _id: false, type: () => Service })
  public service!: Service;

  @prop({ required: true, _id: false, type: () => Quote })
  public quote!: Quote;

  @prop({ default: () => new Date() })
  public createdAt?: Date;

  @prop({ default: () => new Date() })
  public lastUpdate?: Date;

  public approve(): void {
    if (this.status !== STATUS.PENDING) {
      throw new InvalidDomainParamError('only pending budgets can be approved');
    }
    if (this.quote.validUntil < new Date()) {
      throw new InvalidDomainParamError('quote is expired');
    }
    this.status = STATUS.APPROVED;
    this.updateLastChange();
  }

  public reject(): void {
    if (this.status !== STATUS.PENDING) {
      throw new InvalidDomainParamError('only pending budgets can be rejected');
    }
    this.status = STATUS.REJECTED;
    this.updateLastChange();
  }

  private updateLastChange(): void {
    this.lastUpdate = new Date();
  }

  public getTotalServiceCost(): number {
    return this.service.budgetItems.reduce(
      (sum, item) => sum + item.total_price,
      0,
    );
  }
}

export const BudgetModel = getModelForClass(Budget);
