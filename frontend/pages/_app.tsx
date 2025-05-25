import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { Toaster } from "react-hot-toast"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CardGenius - Find Your Perfect Card</title>
        <meta name="description" content="Find the best credit card for your spending habits" />
        <meta name="google-site-verification" content="PXjrXBoV2W3fDJzl_QUsOKMeMhS6XwqoMUz8ZuAXPdk" />
        <meta name="google-site-verification" content="8Vwrg3incdrV8OSZ6pmxHfjsj5xtnNNxkNRDKHsnU5g" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </Layout>
    </>
  )
}

export default MyApp