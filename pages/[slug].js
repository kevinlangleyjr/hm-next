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
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/pages?slug=${slug}` );
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
	const res = await fetch( `${API_URL_ROOT }/wp-json/wp/v2/pages?per_page=100` );
	const pages = await res.json();

	const paths = pages
		.filter( page => page.slug !== 'blog' )
		.map( page => ( {
			params: { slug: page.slug },
		} ) );

	return {
		paths,
		fallback: false,
	};
};

/**
 * Single Page Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Single page component.
 */
const Page = ( { data } ) => {
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

Page.propTypes = {
	data: PropTypes.shape( {
		title: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		} ),
		content: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		} ),
	} ),
};

export default Page;
