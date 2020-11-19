import Layout from 'components/Layout';

import '../styles/globals.css';

const HumanMadeNext = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default HumanMadeNext;
