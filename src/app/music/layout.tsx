import Bar from '@/components/Bar/Bar'
import CategoriesLoading from '@/components/loading/CategoriesLoading/CategoriesLoading'
import TracksLoading from '@/components/loading/TracksLoading/TracksLoading'
import Nav from '@/components/Nav/Nav'
import Search from '@/components/Search/Search'
import Sidebar from '@/components/Sidebar/Sidebar'
import UserBlock from '@/components/UserBlock/UserBlock'
import { ReactNode, Suspense } from 'react'
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
            <Suspense fallback={<TracksLoading />}>{children}</Suspense>
          </div>

          <div className={style.main__sidebar}>
            <UserBlock />
            <Suspense fallback={<CategoriesLoading />}>
              <Sidebar />
            </Suspense>
          </div>
        </main>

        <Bar />
      </div>
    </div>
  )
}
