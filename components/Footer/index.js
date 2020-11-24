import Container from 'components/Container';
import FooterNav from 'components/FooterNav';
import { Component } from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
    background-color: #D24632;
`;

/**
 * Footer Component.
 *
 * @returns {Component} Footer Component.
 */
const Footer = () => {
	return (
		<FooterStyles>
			<Container>
				<p>&copy; 2010&ndash; { new Date().getFullYear() } Human Made Limited</p>
				<FooterNav />
			</Container>
		</FooterStyles>
	);
};

export default Footer;
