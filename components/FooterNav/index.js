import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    font-size: .888888889rem;
    line-height: 1.333rem;
    border-bottom: 0;
    padding-bottom: 0;
    padding-top: 0;
    border-bottom: 1px solid darken( #f7f7f7, 10% );
    position: relative;

    @media screen and ( min-width: 55rem ) {
        border-bottom: 0;
        padding-bottom: 0;
        padding-top: 0;
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            display: inline-block;
            list-style-type: none;
            margin-left: 20px;

            &:first-child {
                margin-left: 0;
            }
        }
    }
`;

/**
 * FooterNav Component.
 *
 * @returns {Component} FooterNav Component.
 */
const FooterNav = () => {
	return (
		<Nav aria-label="Footer navigation">
			<ul>
				<li><Link href="/sitemap"><a>Sitemap</a></Link></li>

				<li><Link href="/accessibility-statement"><a>Accessibility Statement</a></Link></li>

				<li><Link href="/get-in-touch"><a>Get in touch</a></Link></li>

				<li><Link href="/privacy"><a>Privacy Notice</a></Link></li>
			</ul>
		</Nav>
	);
};

export default FooterNav;
