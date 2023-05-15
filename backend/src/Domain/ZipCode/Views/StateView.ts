import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { State } from '../Models/State'

export class StateView extends ViewContract<State, StateResponse> {
  protected renderOne(entity: State) {
    return {
      uf: entity.getUf(),
      cities: entity.getCities()
    }
  }
}

interface StateResponse extends IViewResponse {
  uf: string
  cities: string[]
}
