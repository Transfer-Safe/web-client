import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';
import { BigNumberish, utils, constants } from 'ethers';

export class Invoice {
  id: string;
  amount: BigNumberish;
  isNativeToken: boolean;
  availableTokenTypes: string[];
  ref: string;
  receipientName: string;
  receipientEmail: string;
  releaseLockTimeout: BigNumberish = 0;

  private _releaseLockDate: BigNumberish = 0;
  private _balance: BigNumberish = 0;
  private _paid = false;
  private _deposited = false;
  private _senderAddress = constants.AddressZero;
  private _receipientAddress = constants.AddressZero;
  private _fee: BigNumberish = 0;

  constructor(
    amount: BigNumberish,
    isNativeToken: boolean,
    availableTokenTypes: string[],
    ref: string | undefined,
    receipientName: string | undefined,
    receipientEmail?: string,
    releaseLockTimeout: BigNumberish = 1000 * 60 * 60 * 24 * 7,
  ) {
    this.amount = amount;
    this.isNativeToken = isNativeToken;
    this.availableTokenTypes = availableTokenTypes;
    this.ref = ref || '';
    this.receipientName = receipientName || '';
    this.receipientEmail = receipientEmail || '';
    this.releaseLockTimeout = releaseLockTimeout;
    this.id = this.generateId();
  }

  get balance(): BigNumberish {
    return this._balance;
  }

  get paid(): boolean {
    return this._paid;
  }

  get deposited(): boolean {
    return this._deposited;
  }

  get senderAddress(): string {
    return this._senderAddress;
  }

  get receipientAddress(): string {
    return this._receipientAddress;
  }

  get releaseLockDate(): BigNumberish {
    return this._releaseLockDate;
  }

  get fee(): BigNumberish {
    return this._fee;
  }

  private generateId(): string {
    return utils.id(JSON.stringify(this) + new Date().valueOf().toString());
  }

  serialize(): InvoiceStruct {
    return {
      id: this.id,
      amount: utils.parseEther(this.amount.toString()).toHexString(),
      availableTokenTypes: this.availableTokenTypes,
      isNativeToken: this.isNativeToken,
      ref: this.ref,
      receipientName: this.receipientName,
      receipientEmail: this.receipientEmail,
      balance: this.balance,
      created: new Date().valueOf(),
      exist: true,
      fee: this.fee,
      paid: this.paid,
      receipientAddress: this.receipientAddress,
      senderAddress: this.senderAddress,
      tokenType: constants.AddressZero,
      releaseLockTimeout: this.releaseLockTimeout,
      releaseLockDate: this.releaseLockDate,
      deposited: this._deposited,
    };
  }

  static async deserialize(invoice: InvoiceStruct): Promise<Invoice> {
    const promise = new Invoice(
      await invoice.amount,
      await invoice.isNativeToken,
      await Promise.all(invoice.availableTokenTypes),
      await invoice.ref,
      await invoice.receipientName,
      await invoice.receipientEmail,
      await invoice.releaseLockTimeout,
    );
    promise.id = await invoice.id;
    promise._balance = await invoice.balance;
    promise._paid = await invoice.paid;
    promise._senderAddress = await invoice.senderAddress;
    promise._receipientAddress = await invoice.receipientAddress;
    promise._releaseLockDate = await invoice.releaseLockDate;
    promise._fee = await invoice.fee;
    promise._deposited = await invoice.deposited;
    return promise;
  }
}
