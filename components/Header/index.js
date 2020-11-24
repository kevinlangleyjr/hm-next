import Container from 'components/Container';
import HeaderNav from 'components/HeaderNav';
import Logo from 'components/Logo';
import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
    @media screen and ( min-width: 55rem ) {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 90%;
    }

    @media screen and ( min-width: 80rem ) {
        justify-content: space-between;
        width: 100%;
    }
`;

/**
 * Header component.
 *
 * @returns {Component} Header component.
 */
const Header = () => {
	return (
		<Container>
			<HeaderStyles>
				<Link href="/">
					<a>
						<Logo />
					</a>
				</Link>
				<HeaderNav />
			</HeaderStyles>
		</Container>
	);
};

export default Header;
