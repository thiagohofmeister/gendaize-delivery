import { randomUUID } from 'crypto'

import { ResponseModel } from '../../../Shared/Models/ResponseModel'
import { DocumentTypeEnum } from '../Enums/DocumentTypeEnum'

export class Organization implements ResponseModel {
  constructor(
    private name: string,
    private documentType: DocumentTypeEnum,
    private documentNumber: string,
    private documentName: string,
    private email: string,
    private phone: string,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getPhone(): string {
    return this.phone
  }

  public getEmail(): string {
    return this.email
  }

  public getDocumentName(): string {
    return this.documentName
  }

  public getDocumentNumber(): string {
    return this.documentNumber
  }

  public getDocumentType(): DocumentTypeEnum {
    return this.documentType
  }

  public getName(): string {
    return this.name
  }

  public getId(): string {
    return this.id
  }

  toView() {
    return {
      id: this.getId(),
      name: this.getName(),
      document: {
        type: this.getDocumentType(),
        number: this.getDocumentNumber(),
        name: this.getDocumentName()
      },
      email: this.getEmail(),
      phone: this.getPhone()
    }
  }
}