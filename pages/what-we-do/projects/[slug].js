import HTMLContent from 'components/HTMLContent';
import Head from 'next/head';
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
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/hm_projects?slug=${ slug }` );
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
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/hm_projects?per_page=100` );
	const projects = await res.json();

	const paths = projects
		.map( project => ( {
			params: { slug: project.slug },
		} ) );

	return {
		paths,
		fallback: false,
	};
};

/**
 * Single Project Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Single project component.
 */
const SingleProject = ( { data } ) => {
	return (
		<>
			<Head>
				<title>Human Made | { data.title.rendered }</title>
			</Head>
			<div>
				<h2>
					<HTMLContent
						content={ data.title.rendered }
					/>
				</h2>
				<HTMLContent
					content={ data.page_builder.rendered }
				/>
			</div>
		</>
	);
};

export default SingleProject;
