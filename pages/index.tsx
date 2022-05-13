import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Auth from './loginform'
import { useRef, useEffect } from 'react'


const useUnload = (fn : any) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    // return () => {
    //   window.removeEventListener('beforeunload', onUnload);
    // };
  }, [cb]);
};

const Home: NextPage = () => {
  useUnload((e : any) => {
    e.preventDefault();
      alert('ikay boss')
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Bitmama Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Auth />
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
