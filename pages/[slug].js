import Head from 'next/head';
import PropTypes from 'prop-types';
import { Parser as HtmlToReactParser } from 'html-to-react';

export const getStaticProps = async (context) => {
    const { slug } = context.params;
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/pages?slug=${slug}`);
    let data = await res.json();
    data = data[0];

    return {
        props: {
            data,
        },
        revalidate: 60,
    };
};

export const getStaticPaths = async () => {
    const res = await fetch('https://humanmade.com/wp-json/wp/v2/pages?per_page=100');
    const pages = await res.json();

    const paths = pages
        .filter((page) => page.slug !== 'blog')
        .map((page) => ({
            params: { slug: page.slug },
        }));

    return { paths, fallback: false };
};

const Page = ({ data }) => {
    let htmlToReactParser = new HtmlToReactParser();
    const content = htmlToReactParser.parse(data.content.rendered);
    return (
        <>
            <Head>
                <title>{data.title.rendered}</title>
            </Head>

            <main>
                <h1>{data.title.rendered}</h1>
                <div className="content">{content}</div>
            </main>
        </>
    );
};

Page.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }),
    }),
};

export default Page;
