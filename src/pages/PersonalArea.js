import React from 'react'
import jwt_decode from 'jwt-decode';

function PersonalArea() {
    console.log(jwt_decode(localStorage.getItem('token')))
  return (
    <div>PersonalArea</div>
  )
}

export default PersonalArea