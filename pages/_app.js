import PropTypes from 'prop-types';

import Layout from 'components/Layout';

import '../styles/globals.css';

const HumanMadeNext = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

HumanMadeNext.propTypes = {
    Component: PropTypes.object,
    pageProps: PropTypes.object,
};

export default HumanMadeNext;
