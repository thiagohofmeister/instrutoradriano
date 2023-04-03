import { BaseController } from '../../../Shared/Controllers/BaseController'
import { RouteContract } from './RouteContract'

export abstract class AuthRouteContract<T extends BaseController> extends RouteContract<T> {}
