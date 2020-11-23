import Layout from 'components/Layout';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Component } from 'react';

import '../styles/globals.css';

/**
 * Single Page Component
 *
 * @param {object} props - Component properties.
 * @param {Component} props.Component - Child component.
 * @param {object} props.pageProps - Page props.
 * @returns {Component} Single page component.
 */
const HumanMadeNext = ( { Component, pageProps } ) => {
	return (
		<Layout>
			<Head>
				<meta content="initial-scale=1.0, width=device-width" name="viewport" />
			</Head>
			<Component { ...pageProps } />
		</Layout>
	);
};

HumanMadeNext.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object,
};

export default HumanMadeNext;
