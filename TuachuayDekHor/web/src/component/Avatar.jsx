import React from 'react'
import "./Avatar.scoped.css"
import Profile_img from '../../src/Assets/person-circle-outline.svg'

function Avatar(props) {
  if (props.src) {
    return (<div className='avatar-wrap'>
      <img class="img_User" src={props.src} />
    </div>)
  }
  return (
    <div className='avatar-wrap'>
      <img src={Profile_img} alt="" />
    </div>
  )
}

export default Avatar;