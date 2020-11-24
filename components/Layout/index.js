import Footer from 'components/Footer';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	max-width: 65.833333333rem;
	margin: 0 auto;
	width: calc( 100% - (0.833333333rem * 2) );

	@media screen and ( min-width: 55rem ) {
		width: calc( 100% - (0.833333333rem * 4) );
	}
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
	return (
		<Container>
			<Header />
			{ children }
			<Footer />
		</Container>
	);
};

Layout.propTypes = {
	children: PropTypes.array,
};

export default Layout;
