import { Distance } from '../Models/Distance'

export interface GoogleDistanceMatrixProvider {
  calculateDistance(originZipCode: string, destinationZipCode: string): Promise<Distance>
}
