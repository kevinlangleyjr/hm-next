import Link from 'next/link';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { convertToRelativeUrl } from 'utils/urls';

/**
 * Get static props for page.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async () => {
	const res = await fetch( 'https://humanmade.com/wp-json/wp/v2/posts' );
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
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Blog component.
 */
const Blog = ( { data } ) => {
	return (
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
