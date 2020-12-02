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
				<link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
				<link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
				<link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
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
