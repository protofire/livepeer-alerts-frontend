import React from 'react'

function Card({ ...props }) {
  const { classes, className, children, ...rest } = props
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  )
}

export default Card
