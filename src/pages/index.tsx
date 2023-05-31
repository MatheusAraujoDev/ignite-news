import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Ignews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>React</span> World.
          </h1>
          <p>
            Get acces to all the publications
            <br />
            <span>$ 9.90 </span>
            month
            {/* <span>
              for{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(price.unit_amount) / 100)}{' '}
              month
            </span> */}
          </p>

          {/* <SubscribeButton priceId={product.priceId} /> */}
        </section>
        <Image
          src="/images/avatar.svg"
          width={340}
          height={340}
          alt="Girl coding"
        />
      </main>
    </>
  )
}
