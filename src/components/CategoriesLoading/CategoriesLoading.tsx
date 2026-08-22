import style from './categoriesLoading.module.css'

const quantity = 3

export default function CategoriesLoading() {
  return (
    <div className={style.sidebar__block}>
      <div className={style.sidebar__list}>
        {Array.from({ length: quantity }).map((_, index) => (
          <div className={style.sidebar__item} key={index} />
        ))}
      </div>
    </div>
  )
}
