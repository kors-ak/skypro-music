import style from './filterItem.module.css'

type FilterItemProps = {
  label: string
  isOpen: boolean
  onClick?: () => void
  items: string[]
}

export default function FilterItem({
  label,
  isOpen,
  onClick,
  items,
}: FilterItemProps) {
  return (
    <div className={style.wrapper}>
      <button
        className={`${style.filter__button} ${isOpen ? style.active : ''}`}
        onClick={onClick}
      >
        {label}
      </button>

      {isOpen && (
        <div className={style.dropdown}>
          <ul className={style.list}>
            {items.map((item, index) => {
              return (
                <li key={index} className={style.item}>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
