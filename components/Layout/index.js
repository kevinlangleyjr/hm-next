import Container from 'components/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Component } from 'react';
import styled from 'styled-components';

const LayoutStyles = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`;

const MainContainer = styled( Container )`
	flex: 1;
`;

/**
 * Layout Component.
 *
 * @param {object} props - Component properties.
 * @param {Array} props.children - Children components
 *
 * @returns {Component} Layout Component.
 */
const Layout = ( { children } ) => {

	useEffect( () => {
		/**
		 * @param {string} url URL of the new route.
		 */
		const handleRouteChange = url => {
			if ( process.browser && process.env.NEXT_PUBLIC_GA_TRACKING_ID ) {
				window.gtag( 'config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
					page_path: window.location.pathname,
				} );
			}
		};

		Router.events.on( 'routeChangeComplete', handleRouteChange );

		return () => {
			Router.events.off( 'routeChangeComplete', handleRouteChange );
		};
	}, [] );

	return (
		<LayoutStyles>
			<Header />
			<MainContainer>
				{ children }
			</MainContainer>
			<Footer />
		</LayoutStyles>
	);
};

Layout.propTypes = {
	children: PropTypes.array,
};

export default Layout;
