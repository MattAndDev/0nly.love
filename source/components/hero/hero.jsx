import { h } from 'preact'
import { wrap, center } from './hero.css'

export const Hero = ({
  children,
  ...rest
}) => (
  <div className={wrap} {...rest}>
    <div className={center}>
      {children}
    </div>
  </div>
)
