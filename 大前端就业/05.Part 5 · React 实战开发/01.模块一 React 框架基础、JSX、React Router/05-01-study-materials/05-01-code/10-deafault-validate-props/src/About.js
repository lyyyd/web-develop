import React from 'react'
import PropTypes from 'prop-types'

function About({ name, age }) {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
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

