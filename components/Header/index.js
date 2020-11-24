import HeaderNav from 'components/HeaderNav';
import Logo from 'components/Logo';
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
		<HeaderStyles>
			<Logo  />
			<HeaderNav />
		</HeaderStyles>
	);
};

export default Header;
