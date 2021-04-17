import HTMLContent from 'components/HTMLContent';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { getPages, getPageBySlug } from 'utils/api';

/**
 * Get static props for page.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const { slug } = context.params;
	const data = await getPageBySlug( slug );

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
	const pages = await getPages();

	const paths = pages
		.filter( page => page.slug !== 'blog' )
		.map( page => ( {
			params: { slug: page.slug },
		} ) );

	return {
		paths,
		fallback: true,
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
	const router = useRouter();

	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Human Made | { he.decode( DOMPurify.sanitize( data.title.rendered, { ALLOWED_TAGS: [] } ) ) }</title>
			</Head>

			<main>
				<h1>{ he.decode( DOMPurify.sanitize( data.title.rendered ) ) }</h1>
				<div className="content">
					<HTMLContent content={ DOMPurify.sanitize( data.content.rendered ) } />
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
