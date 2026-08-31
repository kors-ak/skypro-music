import Bar from '@/components/features/Bar/Bar'
import Nav from '@/components/features/Nav/Nav'
import Search from '@/components/features/Search/Search'
import Sidebar from '@/components/features/Sidebar/Sidebar'
import UserBlock from '@/components/features/UserBlock/UserBlock'
import CategoriesLoading from '@/components/loading/CategoriesLoading/CategoriesLoading'
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
            {children}
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
