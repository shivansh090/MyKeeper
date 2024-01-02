import React from 'react'
import { useLocation } from 'react-router-dom'

 const Getpath = ({setpath}) => {
    setpath(useLocation().pathname);
  return null
}
export default Getpath;