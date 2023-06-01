import { GetStaticProps } from 'next'
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

export const getStaticProps: GetStaticProps = async () => {
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
    revalidate: 60 * 60 * 24, // 24hours
  }
}

// GetServerSideProps
// Ao recarregar a pagina o preço "$9.90" nao desaparece,
// pois a chamada com GetServerSideProps aconteceu no servidor Nodejs do Next e nao pelo lado do browser.

// GetStaticProps
// O Next cria um arquivo HTML estatico com o resultado da chamada a camada Nodejs do Next.
// Ele entao verifica se existe um html estatico e retorna para o usuario, sem precisar de nova chamada a API.
// Geralmente usado em páginas com conteúdos fixos, que sempre será igual para todo mundo.
