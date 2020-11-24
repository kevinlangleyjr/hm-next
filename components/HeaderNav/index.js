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

            &::first-child {
                margin-left: 0;
            }
        }
    }
`;

/**
 * Header Nav Component
 *
 * @returns {Component} Header Nav Component.
 */
const HeaderNav = () => {
	return (
		<Nav>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/what-we-do">
						<a>What we do</a>
					</Link>
				</li>
				<li>
					<Link href="/who-we-are">
						<a>Who we are</a>
					</Link>
				</li>
				<li>
					<Link href="/blog">
						<a>Blog</a>
					</Link>
				</li>
				<li>
					<Link href="/resources">
						<a>Resources</a>
					</Link>
				</li>
				<li>
					<Link href="/get-in-touch">
						<a>Get in touch</a>
					</Link>
				</li>
			</ul>
		</Nav>
	);
};

export default HeaderNav;
