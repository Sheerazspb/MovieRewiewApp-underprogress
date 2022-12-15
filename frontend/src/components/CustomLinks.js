import React from 'react'
import {Link} from 'react-router-dom';

function CustomLinks({to,children}) {
  return (
    <Link className='dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary transation' to={to}>{children}</Link>
  )
}

export default CustomLinks
