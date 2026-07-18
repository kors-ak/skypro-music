import Bar from '@/components/Bar/Bar';
import Centerblock from '@/components/Centerblock/Centerblock';
import Nav from '@/components/Nav/Nav';
import Sidebar from '@/components/Sidebar/Sidebar';
import style from './page.module.css';

export default function Home() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>

        <Bar />
      </div>
    </div>
  );
}
