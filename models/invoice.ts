import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';
import { utils, constants, BigNumber } from 'ethers';

export interface NonPromisifiedInvoiceStruct extends InvoiceStruct {
  id: string;
  amount: string;
  fee: string;
  paidAmount: string;
  refundedAmount: string;
  balance: string;
  paid: boolean;
  deposited: boolean;
  isNativeToken: boolean;
  tokenType: string;
  availableTokenTypes: string[];
  ref: string;
  receipientAddress: string;
  senderAddress: string;
  receipientName: string;
  receipientEmail: string;
  exist: boolean;
  instant: boolean;
  releaseLockTimeout: string;
  createdDate: string;
  releaseLockDate: string;
  depositDate: string;
  confirmDate: string;
  refundDate: string;
  refunded: boolean;
}

export class Invoice {
  id: string;
  amount: BigNumber;
  isNativeToken: boolean;
  availableTokenTypes: string[];
  ref: string;
  receipientName: string;
  receipientEmail: string;
  releaseLockTimeout: BigNumber = BigNumber.from(0);
  instant: boolean;

  private _releaseLockDate: BigNumber = BigNumber.from(0);
  private _balance: BigNumber = BigNumber.from(0);
  private _paid = false;
  private _deposited = false;
  private _senderAddress = constants.AddressZero;
  private _receipientAddress = constants.AddressZero;
  private _fee: BigNumber = BigNumber.from(0);
  private _createdDate: Date = new Date();
  private _depositDate?: Date;
  private _confirmDate?: Date;
  private _refundDate?: Date;
  private _refunded = false;
  private _paidAmount: BigNumber = BigNumber.from(0);
  private _refundedAmount: BigNumber = BigNumber.from(0);

  constructor(
    amount: BigNumber,
    isNativeToken: boolean,
    availableTokenTypes: string[],
    ref: string | undefined,
    receipientName: string | undefined,
    receipientEmail?: string,
    releaseLockTimeout: BigNumber = BigNumber.from(1000 * 60 * 60 * 24 * 7 * 2),
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

  get balance(): BigNumber {
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

  get releaseLockDate(): BigNumber {
    return this._releaseLockDate;
  }

  get fee(): BigNumber {
    return this._fee;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  get depositDate(): Date | undefined {
    return this._depositDate;
  }

  get confirmDate(): Date | undefined {
    return this._confirmDate;
  }

  get refundDate(): Date | undefined {
    return this._refundDate;
  }

  get refunded(): boolean {
    return this._refunded;
  }

  get paidAmount(): BigNumber {
    return this._paidAmount;
  }

  get refundedAmount(): BigNumber {
    return this._refundedAmount;
  }

  private generateId(): string {
    const id = utils.id(JSON.stringify(this) + new Date().valueOf().toString());
    return id.substring(id.length - 8).toLocaleUpperCase();
  }

  serialize(): InvoiceStruct {
    return {
      id: this.id,
      amount: this.amount,
      availableTokenTypes: this.availableTokenTypes,
      isNativeToken: this.isNativeToken,
      ref: this.ref,
      receipientName: this.receipientName,
      receipientEmail: this.receipientEmail,
      balance: this.balance,
      createdDate: constants.Zero,
      paidAmount: this.paidAmount,
      refundedAmount: this.refundedAmount,
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
      refunded: this.refunded,
    };
  }

  static async deserialize(invoice: InvoiceStruct): Promise<Invoice> {
    const promise = new Invoice(
      BigNumber.from(await invoice.amount),
      await invoice.isNativeToken,
      await Promise.all(invoice.availableTokenTypes),
      await invoice.ref,
      await invoice.receipientName,
      await invoice.receipientEmail,
      BigNumber.from(await invoice.releaseLockTimeout),
    );
    promise.id = await invoice.id;
    promise._balance = BigNumber.from(await invoice.balance);
    promise._paid = await invoice.paid;
    promise._senderAddress = await invoice.senderAddress;
    promise._receipientAddress = await invoice.receipientAddress;
    promise._releaseLockDate = BigNumber.from(await invoice.releaseLockDate);
    promise._fee = BigNumber.from(await invoice.fee);
    promise._paidAmount = BigNumber.from(await invoice.paidAmount);
    promise._refundedAmount = BigNumber.from(await invoice.refundedAmount);
    promise._deposited = await invoice.deposited;
    promise.instant = await invoice.instant;
    promise._createdDate = new Date(
      BigNumber.from(await invoice.createdDate).toNumber() * 1000,
    );
    const depositDate = await invoice.depositDate;
    promise._depositDate =
      depositDate != constants.Zero
        ? new Date(BigNumber.from(depositDate).toNumber() * 1000)
        : undefined;
    const confirmDate = await invoice.confirmDate;
    promise._confirmDate =
      confirmDate != constants.Zero
        ? new Date(BigNumber.from(confirmDate).toNumber() * 1000)
        : undefined;
    const refundDate = await invoice.refundDate;
    promise._refundDate = refundDate
      ? new Date(BigNumber.from(refundDate).toNumber() * 1000)
      : undefined;
    promise.instant = await invoice.instant;
    promise._refunded = await invoice.refunded;
    return promise;
  }

  toJson(): NonPromisifiedInvoiceStruct {
    return {
      id: this.id,
      amount: this.amount.toHexString(),
      availableTokenTypes: this.availableTokenTypes,
      isNativeToken: this.isNativeToken,
      ref: this.ref,
      receipientName: this.receipientName,
      receipientEmail: this.receipientEmail,
      balance: this.balance.toHexString(),
      createdDate: constants.Zero.toHexString(),
      exist: true,
      fee: this.fee.toHexString(),
      paid: this.paid,
      receipientAddress: this.receipientAddress,
      senderAddress: this.senderAddress,
      tokenType: constants.AddressZero,
      releaseLockTimeout: this.releaseLockTimeout.toHexString(),
      releaseLockDate: this.releaseLockDate.toHexString(),
      deposited: this._deposited,
      confirmDate: constants.Zero.toHexString(),
      depositDate: constants.Zero.toHexString(),
      refundDate: constants.Zero.toHexString(),
      instant: this.instant,
      refunded: this.refunded,
      paidAmount: this.paidAmount.toHexString(),
      refundedAmount: this.refundedAmount.toHexString(),
    };
  }

  static fromJson(invoice: NonPromisifiedInvoiceStruct) {
    const promise = new Invoice(
      BigNumber.from(invoice.amount),
      invoice.isNativeToken,
      invoice.availableTokenTypes,
      invoice.ref,
      invoice.receipientName,
      invoice.receipientEmail,
      BigNumber.from(invoice.releaseLockTimeout),
    );
    promise.id = invoice.id;
    promise._balance = BigNumber.from(invoice.balance);
    promise._paidAmount = BigNumber.from(invoice.paidAmount);
    promise._refundedAmount = BigNumber.from(invoice.refundedAmount);
    promise._paid = invoice.paid;
    promise._senderAddress = invoice.senderAddress;
    promise._receipientAddress = invoice.receipientAddress;
    promise._releaseLockDate = BigNumber.from(invoice.releaseLockDate);
    promise._fee = BigNumber.from(invoice.fee);
    promise._deposited = invoice.deposited;
    promise.instant = invoice.instant;
    promise._createdDate = new Date(
      BigNumber.from(invoice.createdDate).toNumber() * 1000,
    );
    promise._depositDate = new Date(
      BigNumber.from(invoice.depositDate).toNumber() * 1000,
    );
    promise._confirmDate = new Date(
      BigNumber.from(invoice.confirmDate).toNumber() * 1000,
    );
    promise._refundDate = new Date(
      BigNumber.from(invoice.refundDate).toNumber() * 1000,
    );
    promise.instant = invoice.instant;
    promise._refunded = invoice.refunded;
    return promise;
  }
}
