import PropTypes from 'prop-types';
import Head from 'next/head';

import Layout from 'components/Layout';

import '../styles/globals.css';

const HumanMadeNext = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
};

HumanMadeNext.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object,
};

export default HumanMadeNext;
