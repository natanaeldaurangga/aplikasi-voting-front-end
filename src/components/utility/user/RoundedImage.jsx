import React from 'react'

const RoundedImage = ({ img, name, size }) => {

    const matchSize = {
        'xs': 'w-12 h-12',
        'sm': 'w-14 h-14',
        'md': 'w-16 h-16',
        'lg': 'w-20 h-20',
        'xl': 'w-24 h-24',
        '2xl': 'w-28 h-28'
    };

  return (
    <img src={img} alt={name} className={`${size ? (matchSize[size] ? matchSize[size] : matchSize['md']) : 'h-14 w-14'} rounded-full object-cover object-center`} />
  )
}

export default RoundedImage