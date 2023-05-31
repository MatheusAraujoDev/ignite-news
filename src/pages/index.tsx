import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: number | null
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
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
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  // Ao recarregar a pagina o preço "$9.90" nao desaparece,
  // pois a chamada com GetServerSideProps aconteceu no servidor Nodejs do Next e nao pelo lado do browser.

  const price = await stripe.prices.retrieve('price_1NB2jrGaXlKgpbeuw2CAiuqH')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price.unit_amount) / 100),
  }

  return {
    props: {
      product,
    },
  }
}
