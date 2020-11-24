import HTMLContent from 'components/HTMLContent';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Component } from 'react';

const { API_URL_ROOT } = process.env;

/**
 * Get static props for page.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const { slug } = context.params;
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/posts?slug=${slug}` );
	let data = await res.json();
	data = data[0];

	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};

/**
 * Get static paths for page.
 *
 * @returns {object} Path data.
 */
export const getStaticPaths = async () => {
	let page = 1;
	let paths = [];

	do {
		const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/posts/?per_page=100&page=${ page }` );
		const posts = await res.json();

		if ( posts?.data?.status === 400 ) {
			page = 0;
			break;
		}

		paths = [
			...paths,
			...posts.map( post => {
				const postDate = new Date( post.date );
				return {
					params: {
						year: postDate.getFullYear().toString(),
						month: `0${postDate.getMonth() + 1}`.slice( -2 ),
						day: `0${postDate.getDate()}`.slice( -2 ),
						slug: post.slug,
					},
				};
			} ),
		];

		page++;
	} while ( page > 0 );

	return {
		paths,
		fallback: false,
	};
};

/**
 * Single Blog Post Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Single Blog Post component.
 */
const SingleBlogPost = ( { data } ) => {
	return (
		<>
			<Head>
				<title>{ data.title.rendered }</title>
			</Head>

			<main>
				<h1>{ data.title.rendered }</h1>
				<div className="content">
					<HTMLContent content={ data.content.rendered } />
				</div>
			</main>
		</>
	);
};

SingleBlogPost.propTypes = {
	data: PropTypes.shape( {
		title: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		} ),
		content: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		} ),
	} ),
};

export default SingleBlogPost;
