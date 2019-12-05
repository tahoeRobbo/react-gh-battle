import React from 'react'

function useHover () {
  const [hovering, setHovering] = React.useState(false)

  const onMouseOver = () => setHovering(true)
  const onMouseOut = () => setHovering(false)

  const attrs = {
    onMouseOver,
    onMouseOut
  }

  return [hovering, attrs]
}

export default useHover
