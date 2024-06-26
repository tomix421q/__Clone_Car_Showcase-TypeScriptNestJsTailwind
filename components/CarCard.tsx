'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { CarProps } from '@/types'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import CarDetails from './CarDetails'

interface CarCardProps {
  car: CarProps
}
const CarCard = ({ car }: CarCardProps) => {
  const {
    city_mpg,
    carClass,
    combination_mpg,
    cylinders,
    displacement,
    drive,
    fuel_type,
    highway_mpg,
    make,
    model,
    transmission,
    year,
  } = car

  const [isOpen, setIsOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string[]>(['./car-logo.svg'])

  const carRent = calculateCarRent(city_mpg, year)

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url: any = await generateCarImageUrl(car)
        setImageUrl(url)
      } catch (error) {
        console.error(error)
        // Môžete zobraziť predvolený obrázok alebo chybové hlásenie
      }
    }
    fetchImageUrl()
  }, [car])

  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>
          {make} | {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] font-semibold'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={imageUrl[0]} alt='car model' fill priority className='object-cover' />
      </div>

      {/* DOWN BAR */}
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2 '>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' className='object-contain' />
            <p className='text-[14px] '>{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
          </div>
        </div>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2 '>
            <Image src='/tire.svg' width={20} height={20} alt='tire' className='object-contain' />
            <p className='text-[14px] '>{drive.toUpperCase()}</p>
          </div>
        </div>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2 '>
            <Image src='/gas.svg' width={20} height={21} alt='gas' className='w-auto h-auto' />
            <p className='text-[14px] '>{combination_mpg} MPG</p>
          </div>
        </div>

        {/* DOWN BUTTON */}
        <div className='car-card__btn-container'>
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
        {/*  */}

        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
      </div>

      {/*  */}
    </div>
  )
}
export default CarCard
