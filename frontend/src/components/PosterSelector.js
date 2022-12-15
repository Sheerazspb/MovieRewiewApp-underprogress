import React from 'react'

const commonPosterUiClasses = "flex justify-center items-center border border-dashed rounded aspect-video cursor-pointer dark:border-dark-subtle border-light-subtle"

function PosterSelector({name,selectedPoster,onChange,className,label,accept}) {
  return (
    <div>
      <input onChange={onChange} name={name} type="file" id={name} accept={accept} hidden />
      <label htmlFor={name}>
        {selectedPoster ? <img className={commonPosterUiClasses + ' object-cover ' + className} src={selectedPoster} alt="" /> : <PosterUI className={className} label={label} />}

      </label>
    </div>
  )
}


const PosterUI = ({className,label}) => {
  return <div className={commonPosterUiClasses + ' ' + className}>
    <span className='dark:text-dark-subtle text-light-subtle'>{label}</span>
  </div>
}

export default PosterSelector
