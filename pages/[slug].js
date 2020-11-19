import Head from 'next/head'
import HtmlToReact, { Parser as HtmlToReactParser } from 'html-to-react';

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = async context => {
    const { slug } = context.params;
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/pages?slug=${ slug }`);
    let data = await res.json();
    data = data[0];

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


// This function gets called at build time
export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch( 'https://humanmade.com/wp-json/wp/v2/pages?per_page=100')
  const pages = await res.json()

  // Get the paths we want to pre-render based on pages
  const paths = pages
    .filter( page => page.slug !== 'blog' )
    .map( page => ( {
        params: { slug: page.slug },
    } ) );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

const Page = ( { data } ) => {
  let htmlToReactParser = new HtmlToReactParser();
  const content = htmlToReactParser.parse( data.content.rendered );
  return (
      <>
        <Head>
            <title>{ data.title.rendered }</title>
        </Head>

        <main>
            <h1>
                {data.title.rendered}
            </h1>
            <div className="content">
                { content }
            </div>
        </main>
    </>
  )
}

export default Page;
