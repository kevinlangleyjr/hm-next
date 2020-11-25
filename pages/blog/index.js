import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { convertToRelativeUrl } from 'utils/urls';

const { API_URL_ROOT } = process.env;

/**
 * Get static props for page.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async () => {
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/posts` );
	const data = await res.json();

	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};

/**
 * Blog Component
 *
 * @param {object} props - Component properties.
 * @param {Array} props.data - Array of blog post objects.
 *
 * @returns {Component} Blog component.
 */
const Blog = ( { data } ) => {
	return (
		<>
			<Head>
				<title>Human Made | Blog</title>
			</Head>
			<div>
				{ data.map( post => (
					<div key={ post.id } className="post">
						<h3>
							<Link href={ convertToRelativeUrl( post.link, '/blog' ) }>
								<a>{ post.title.rendered }</a>
							</Link>
						</h3>
					</div>
				) ) }
				<footer>
					<Link href="/blog/page/2">
						<a>Next Page</a>
					</Link>
				</footer>
			</div>
		</>
	);
};

Blog.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.number.isRequired,
			link: PropTypes.string,
			title: PropTypes.shape( {
				rendered: PropTypes.string.isRequired,
			} ),
			content: PropTypes.shape( {
				rendered: PropTypes.string.isRequired,
			} ),
		} )
	),
};

export default Blog;
