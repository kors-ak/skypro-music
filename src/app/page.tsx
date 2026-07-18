import Bar from '@/components/Bar/Bar';
import Centerblock from '@/components/Centerblock/Centerblock';
import Image from 'next/image';
import Link from 'next/link';
import './page.css';
import style from './page.module.css';

export default function Home() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <nav className={'main__nav'}>
            <div className={'nav__logo'}>
              <Image
                width={250}
                height={170}
                className={'logo__image'}
                src="/img/logo.png"
                alt={'logo'}
              />
            </div>
            <div className={'nav__burger'}>
              <span className={'burger__line'}></span>
              <span className={'burger__line'}></span>
              <span className={'burger__line'}></span>
            </div>
            <div className={'nav__menu'}>
              <ul className={'menu__list'}>
                <li className={'menu__item'}>
                  <Link href="#" className={'menu__link'}>
                    Главное
                  </Link>
                </li>
                <li className={'menu__item'}>
                  <Link href="#" className={'menu__link'}>
                    Мой плейлист
                  </Link>
                </li>
                <li className={'menu__item'}>
                  <Link href="../signin.html" className={'menu__link'}>
                    Войти
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Centerblock />

          <div className={'main__sidebar'}>
            <div className={'sidebar__personal'}>
              <p className={'sidebar__personalName'}>Sergey.Ivanov</p>
              <div className={'sidebar__icon'}>
                <svg>
                  <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className={'sidebar__block'}>
              <div className={'sidebar__list'}>
                <div className={'sidebar__item'}>
                  <Link className={'sidebar__link'} href="#">
                    <Image
                      className={'sidebar__img'}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </Link>
                </div>
                <div className={'sidebar__item'}>
                  <Link className={'sidebar__link'} href="#">
                    <Image
                      className={'sidebar__img'}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </Link>
                </div>
                <div className={'sidebar__item'}>
                  <Link className={'sidebar__link'} href="#">
                    <Image
                      className={'sidebar__img'}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Bar />
      </div>
    </div>
  );
}
