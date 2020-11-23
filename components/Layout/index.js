import Footer from 'components/Footer';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import { Component } from 'react';

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
		<>
			<Header />
			{ children }
			<Footer />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.array,
};

export default Layout;
