import { ChangeEvent, MouseEventHandler } from 'react'
import style from './progressBar.module.css'

type progressBarProp = {
  max: number
  value: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  readOnly: boolean
  onMouseDown: MouseEventHandler<HTMLInputElement>
  onMouseUp: MouseEventHandler<HTMLInputElement>
}

export default function ProgressBar({
  max,
  value,
  onChange,
  readOnly,
  onMouseDown,
  onMouseUp,
}: progressBarProp) {
  return (
    <input
      className={style.styledProgressInput}
      type="range"
      min="0"
      max={max}
      value={value}
      step="0.01"
      onChange={onChange}
      readOnly={readOnly}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  )
}
