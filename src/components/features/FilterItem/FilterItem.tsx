import cn from 'classnames'
import style from './filterItem.module.css'

type FilterItemProps = {
  label: string
  isOpen: boolean
  onClick?: () => void
  items: string[]
  selectedItems: string[] | string
  onSelectFilter: (name: string) => void
}

export default function FilterItem({
  label,
  isOpen,
  onClick,
  items,
  selectedItems,
  onSelectFilter,
}: FilterItemProps) {
  const addTab = Array.isArray(selectedItems)
    ? selectedItems.length > 0
    : selectedItems !== 'По умолчанию'

  return (
    <div className={style.wrapper}>
      <button
        className={`${style.filter__button} ${isOpen ? style.active : ''}`}
        onClick={onClick}
      >
        {label}

        {addTab && (
          <div className={style.tab}>
            {Array.isArray(selectedItems) ? selectedItems.length : 1}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className={style.dropdown}>
            <ul className={style.list}>
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={cn(style.item, {
                      [style.itemSelected]: Array.isArray(selectedItems)
                        ? selectedItems.includes(item)
                        : selectedItems === item,
                    })}
                    onClick={() => onSelectFilter(item)}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={style.overflow} onClick={onClick}></div>
        </>
      )}
    </div>
  )
}
