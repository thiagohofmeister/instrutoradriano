import { IItemListModel } from '../../Shared/Models/Interfaces/IItemListModel'
import { Tax } from './Models/Tax'

export class TaxService {
  public async list(): Promise<IItemListModel<Tax>> {
    const taxes = [
      new Tax(0, 5000, 0),
      new Tax(5001, 7000, 5),
      new Tax(7001, 10000, 10),
      new Tax(10001, 13000, 15),
      new Tax(13001, 16000, 20),
      new Tax(16001, 50000, 25)
    ]

    return {
      items: taxes,
      total: taxes.length
    }
  }
}
