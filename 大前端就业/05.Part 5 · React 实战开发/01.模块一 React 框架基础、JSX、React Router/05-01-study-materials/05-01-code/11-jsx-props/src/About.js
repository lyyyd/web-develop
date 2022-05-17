import React from 'react'
import PropTypes from 'prop-types'

function About(props) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.age}</p>
      {props.children}
    </div>
  )
}

About.defaultProps = {
  name: 'syy',
  age: 18
}

About.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
}
export default About

