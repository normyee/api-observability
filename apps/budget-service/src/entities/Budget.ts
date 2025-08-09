import { InvalidDomainParamError } from './domain.error';

export enum STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class Client {
  private readonly name: string;
  private readonly email: string;
  private readonly phone: string;

  constructor(name: string, email: string, phone: string) {
    if (!Client.isValidPhone(phone)) {
      throw new InvalidDomainParamError('phone');
    }

    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  static isValidPhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }
}

type ComplexityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

class BudgetItem {
  name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  total_price: number;

  constructor(
    name: string,
    quantity: number,
    unit_price: number,
    description?: string,
  ) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.unit_price = unit_price;
    this.total_price = quantity * unit_price;
  }
}

export class Service {
  private readonly _type: string;
  private readonly _description: string;
  private readonly _budgetItems: BudgetItem[];
  private readonly _materialsNeeded: string[];
  private readonly _urgency: boolean;
  private readonly specificRequirements: string;
  private readonly location_details: string;
  private readonly complexityLevel: ComplexityLevel;

  constructor(
    type: string,
    description: string,
    budgetItems: BudgetItem[],
    materialsNeeded: string[],
    urgency: boolean,
    specificRequirements: string,
    locationDetails: string,
    complexityLevel: ComplexityLevel,
  ) {
    this._type = type;
    this._description = description;
    this._budgetItems = budgetItems;
    this._materialsNeeded = materialsNeeded;
    this._urgency = urgency;
    this.specificRequirements = specificRequirements;
    this.location_details = locationDetails;
    this.complexityLevel = complexityLevel;
  }

  getTotalCost(): number {
    return this._budgetItems.reduce((sum, item) => sum + item.total_price, 0);
  }

  getType(): string {
    return this._type;
  }

  getDescription(): string {
    return this._description;
  }

  isUrgent(): boolean {
    return this._urgency;
  }

  getBudgetItems(): BudgetItem[] {
    return this._budgetItems;
  }

  getMaterialsNeeded(): string[] {
    return this._materialsNeeded;
  }

  getSpecificRequirements(): string {
    return this.specificRequirements;
  }

  getLocationDetails(): string {
    return this.location_details;
  }

  getComplexityLevel(): ComplexityLevel {
    return this.complexityLevel;
  }
}

export class Quote {
  private readonly _price: string;
  private readonly _validUntil: Date;
  private readonly _estimatedDurationDays: number;
  private readonly _paymentTerms: string;
  private readonly _conditions: string;

  constructor(
    price: string,
    validUntil: Date,
    estimatedDurationDays: number,
    paymentTerms: string,
    conditions: string,
  ) {
    this._price = price;
    this._validUntil = validUntil;
    this._estimatedDurationDays = estimatedDurationDays;
    this._paymentTerms = paymentTerms;
    this._conditions = conditions;
  }

  getPrice(): string {
    return this._price;
  }

  getValidUntil(): Date {
    return this._validUntil;
  }

  getEstimatedDurationDays(): number {
    return this._estimatedDurationDays;
  }

  getPaymentTerms(): string {
    return this._paymentTerms;
  }

  getConditions(): string {
    return this._conditions;
  }

  isExpired(): boolean {
    return new Date() > this._validUntil;
  }
}

export class Budget {
  private readonly _id: number;
  private readonly _client: Client;
  private status: STATUS;
  private readonly service: Service;
  private readonly _quote: Quote;
  private readonly createdAt: Date;
  private lastUpdate: Date;

  constructor(id: number, client: Client, service: Service, quote: Quote) {
    this._id = id;
    this._client = client;
    this.service = service;
    this._quote = quote;
    this.status = STATUS.PENDING;
    this.createdAt = new Date();
    this.lastUpdate = new Date();
  }

  approve(): void {
    if (this.status !== STATUS.PENDING) {
      throw new InvalidDomainParamError('only pending budgets can be approved');
    }

    if (this._quote.isExpired()) {
      throw new InvalidDomainParamError('quote is expired');
    }

    this.status = STATUS.APPROVED;
    this.updateLastChange();
  }

  reject(): void {
    if (this.status !== STATUS.PENDING) {
      throw new InvalidDomainParamError('only pending budgets can be rejected');
    }

    this.status = STATUS.REJECTED;
    this.updateLastChange();
  }

  private updateLastChange(): void {
    this.lastUpdate = new Date();
  }

  getId(): number {
    return this._id;
  }

  getClient(): Client {
    return this._client;
  }

  getService(): Service {
    return this.service;
  }

  getQuote(): Quote {
    return this._quote;
  }

  getStatus(): STATUS {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getLastUpdate(): Date {
    return this.lastUpdate;
  }

  getTotalServiceCost(): number {
    return this.service.getTotalCost();
  }
}
