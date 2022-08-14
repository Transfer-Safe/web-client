import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';
import { BigNumberish, utils, constants, BigNumber } from 'ethers';

export class Invoice {
  id: string;
  amount: BigNumberish;
  isNativeToken: boolean;
  availableTokenTypes: string[];
  ref: string;
  receipientName: string;
  receipientEmail: string;
  releaseLockTimeout: BigNumberish = 0;
  instant: boolean;

  private _releaseLockDate: BigNumberish = 0;
  private _balance: BigNumberish = 0;
  private _paid = false;
  private _deposited = false;
  private _senderAddress = constants.AddressZero;
  private _receipientAddress = constants.AddressZero;
  private _fee: BigNumberish = 0;
  private _created: Date = new Date();
  private _depositDate: Date = new Date();
  private _confirmDate: Date = new Date();
  private _refundDate: Date = new Date();

  constructor(
    amount: BigNumberish,
    isNativeToken: boolean,
    availableTokenTypes: string[],
    ref: string | undefined,
    receipientName: string | undefined,
    receipientEmail?: string,
    releaseLockTimeout: BigNumberish = 1000 * 60 * 60 * 24 * 7,
    instant = false,
  ) {
    this.amount = amount;
    this.isNativeToken = isNativeToken;
    this.availableTokenTypes = availableTokenTypes;
    this.ref = ref || '';
    this.receipientName = receipientName || '';
    this.receipientEmail = receipientEmail || '';
    this.releaseLockTimeout = releaseLockTimeout;
    this.id = this.generateId();
    this.instant = instant;
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

  get created(): Date {
    return this._created;
  }

  get depositDate(): Date {
    return this._depositDate;
  }

  get confirmDate(): Date {
    return this._confirmDate;
  }

  get refundDate(): Date {
    return this._refundDate;
  }

  private generateId(): string {
    const id = utils.id(JSON.stringify(this) + new Date().valueOf().toString());
    return id.substring(id.length - 8).toLocaleUpperCase();
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
      created: constants.Zero,
      exist: true,
      fee: this.fee,
      paid: this.paid,
      receipientAddress: this.receipientAddress,
      senderAddress: this.senderAddress,
      tokenType: constants.AddressZero,
      releaseLockTimeout: this.releaseLockTimeout,
      releaseLockDate: this.releaseLockDate,
      deposited: this._deposited,
      confirmDate: constants.Zero,
      depositDate: constants.Zero,
      refundDate: constants.Zero,
      instant: this.instant,
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
    promise.instant = await invoice.instant;
    promise._created = new Date(
      BigNumber.from(await invoice.created).toNumber() * 1000,
    );
    promise._depositDate = new Date(
      BigNumber.from(await invoice.depositDate).toNumber() * 1000,
    );
    promise._confirmDate = new Date(
      BigNumber.from(await invoice.confirmDate).toNumber() * 1000,
    );
    promise._refundDate = new Date(
      BigNumber.from(await invoice.refundDate).toNumber() * 1000,
    );
    promise.instant = await invoice.instant;
    return promise;
  }
}
