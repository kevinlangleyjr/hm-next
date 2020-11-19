import Head from 'next/head'
import styles from '../styles/Home.module.css'

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = async () => {
    const res = await fetch( 'https://humanmade.com/wp-json/wp/v2/pages/7800' );
    let data = await res.json();

    return {
        props: {
            data,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
    }
}

const Home = ( { data } ) => {
  return (
    <>
      <Head>
        <title>{data.title.rendered}</title>
      </Head>

      <main>
        <h1>
          {data.title.rendered}
        </h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
      </main>
    </>
  );
}

export default Home;
