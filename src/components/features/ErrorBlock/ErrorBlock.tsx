import Image from 'next/image'
import style from './errorBlock.module.css'

type ErrorBlockProps = {
  error: {
    title: string
    subtitle: string
  }
  callback: () => Promise<void>
}

export default function ErrorBlock({ error, callback }: ErrorBlockProps) {
  return (
    <div className={style.error}>
      <Image
        src="/img/emoji_sad.png"
        alt="грустный смайлик"
        width={120}
        height={120}
      />
      <h2 className={style.error__title}>{error.title}</h2>
      <p className={style.error__subtitle}>{error.subtitle}</p>
      <button className={style.error__button} onClick={() => void callback()}>
        Повторить
      </button>
    </div>
  )
}
