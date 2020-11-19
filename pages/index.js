import Head from 'next/head';
import { Parser as HtmlToReactParser } from 'html-to-react';

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = async () => {
    const res = await fetch('https://humanmade.com/wp-json/wp/v2/pages/7800');
    let data = await res.json();

    return {
        props: {
            data,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
    };
};

const Home = ({ data }) => {
    let htmlToReactParser = new HtmlToReactParser();
    const content = htmlToReactParser.parse(data.content.rendered);

    return (
        <>
            <Head>
                <title>{data.title.rendered}</title>
            </Head>

            <main>
                <div className="content">{content}</div>
            </main>
        </>
    );
};

export default Home;
