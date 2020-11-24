import Container from 'components/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PropTypes from 'prop-types';
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
