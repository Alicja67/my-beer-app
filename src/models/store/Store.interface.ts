import { BeerInterface } from '@/models/beer/Beer.interface'
/**
* @name BeersStateInterface
* @description
* Interface for the Beers state
*/
export interface BeersStateInterface {
loading: boolean
beers: BeerInterface[]
}