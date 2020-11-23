import Link from 'next/link';
import { Component } from 'react';

/**
 * Header Nav Component
 *
 * @returns {Component} Header Nav Component.
 */
const HeaderNav = () => {
	return (
		<nav>
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
		</nav>
	);
};

export default HeaderNav;
