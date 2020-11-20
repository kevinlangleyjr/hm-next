import HTMLContent from 'components/HTMLContent';
import Head from 'next/head';
import PropTypes from 'prop-types';

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
    return (
        <>
            <Head>
                <title>{data.title.rendered}</title>
            </Head>

            <main>
                <div className="content">
                    <HTMLContent content={data.content.rendered} />
                </div>
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
