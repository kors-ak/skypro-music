import Bar from '@/components/Bar/Bar'
import Nav from '@/components/Nav/Nav'
import Search from '@/components/Search/Search'
import Sidebar from '@/components/Sidebar/Sidebar'
import { ReactNode } from 'react'
import style from './layout.module.css'

type MusicLayoutProps = {
  children: ReactNode
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <Nav />

          <div className={style.centerblock}>
            <Search />
            {children}
          </div>

          <Sidebar />
        </main>

        <Bar />
      </div>
    </div>
  )
}
