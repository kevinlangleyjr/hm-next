import Head from 'next/head';
import PropTypes from 'prop-types';
import { Parser as HtmlToReactParser } from 'html-to-react';

export const getStaticProps = async () => {
    const res = await fetch('https://humanmade.com/wp-json/wp/v2/pages/7800');
    let data = await res.json();

    return {
        props: {
            data,
        },
        revalidate: 60,
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

Home.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }),
    }),
};

export default Home;
