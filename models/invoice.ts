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
  private _balance: BigNumberish = 0;
  private _paid = false;
  private _senderAddress = constants.AddressZero;
  private _receipientAddress = constants.AddressZero;

  constructor(
    amount: BigNumberish,
    isNativeToken: boolean,
    availableTokenTypes: string[],
    ref: string,
    receipientName: string,
    receipientEmail: string,
  ) {
    this.amount = amount;
    this.isNativeToken = isNativeToken;
    this.availableTokenTypes = availableTokenTypes;
    this.ref = ref;
    this.receipientName = receipientName;
    this.receipientEmail = receipientEmail;
    this.id = this.generateId();
  }

  get balance(): BigNumberish {
    return this._balance;
  }

  get paid(): boolean {
    return this._paid;
  }

  get senderAddress(): string {
    return this._senderAddress;
  }

  get receipientAddress(): string {
    return this._receipientAddress;
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
      fee: 0,
      paid: this.paid,
      receipientAddress: this.receipientAddress,
      senderAddress: this.senderAddress,
      tokenType: constants.AddressZero,
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
    );
    promise.id = await invoice.id;
    promise._balance = await invoice.balance;
    promise._paid = await invoice.paid;
    promise._senderAddress = await invoice.senderAddress;
    promise._receipientAddress = await invoice.receipientAddress;
    return promise;
  }
}