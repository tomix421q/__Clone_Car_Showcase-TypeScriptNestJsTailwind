import { CarProps, FilterProps } from '@/types'
import { createClient } from 'pexels'

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters
  const headers = {
    'X-RapidAPI-Key': '0fd236bef3msh1e28990fef4fbd5p14a45ajsnb7cfd53c55c9',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  }
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  )

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
export const generateCarImageUrl = async (car: CarProps, angle?: string[]) => {
  const client = createClient('EL490gVCOJwBdChgAFMhztcTNoH9tGVSss6DbgxaSlrszQIjKcE4DxSi')

  const { make, model, year } = car
  const query = `"" + ${make} + ${model} + ${year}`

  try {
    const result = await client.photos.search({ query, per_page: 4 })
    // Skontrolujeme, či je result typu PhotosWithTotalResults
    if ('photos' in result) {
      if (result.photos.length > 0) {
        const pictures: string[] = []
        const url1 = result.photos[0].src.large
        const url2 = result.photos[1].src.large
        const url3 = result.photos[2].src.large
        const url4 = result.photos[3].src.large
        pictures.push(url1, url2, url3, url4)
        return pictures
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

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname
}
