import { CarProps } from '@/types'
import { createClient } from 'pexels'

export async function fetchCars() {
  const headers = {
    'X-RapidAPI-Key': '0fd236bef3msh1e28990fef4fbd5p14a45ajsnb7cfd53c55c9',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  }
  const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', { headers: headers })

  const result = await response.json()

  return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50 // Base rental price per day in dollars
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}

// Funkcia na generovanie URL obrázka auta
export const generateCarImageUrl = async (car: CarProps, angle?: string) => {
  const client = createClient('EL490gVCOJwBdChgAFMhztcTNoH9tGVSss6DbgxaSlrszQIjKcE4DxSi')
  

  const { make, model } = car
  const query = make

  try {
    const result = await client.photos.search({ query, per_page: 1 })
    // Skontrolujeme, či je result typu PhotosWithTotalResults
    if ('photos' in result) {
      if (result.photos.length > 0) {
        const url = result.photos[0].src.large
        return url
      } else {
        throw new Error('Pre dané auto sa nenašli žiadne obrázky')
      }
    } else {
      // Spracovanie chybovej odpovede
      console.error(result)
      throw new Error('Nepodarilo sa stiahnuť obrázky auta')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Nepodarilo sa vygenerovať URL obrázka auta')
  }
}
