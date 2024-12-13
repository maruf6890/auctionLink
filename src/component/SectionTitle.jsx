import React from 'react'

export default function SectionTitle({title,subtitle}) {
  return (
    <div className='section-title'>
        <h2 className=''>{title}</h2>
        <p>{subtitle}</p>
    </div>
  )
}
