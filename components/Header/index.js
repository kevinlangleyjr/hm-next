import HeaderNav from 'components/HeaderNav';
import Logo from 'components/Logo';
import { Component } from 'react';

/**
 * Header component.
 *
 * @returns {Component} Header component.
 */
const Header = () => {
	return (
		<header>
			<Logo />
			<HeaderNav />
		</header>
	);
};

export default Header;
