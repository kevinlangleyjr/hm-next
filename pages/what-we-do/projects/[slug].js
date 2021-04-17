import HTMLContent from 'components/HTMLContent';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Component } from 'react';
import { getProjectBySlug, getProjects } from 'utils/api';

/**
 * Get static props for page.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const { slug } = context.params;
	const data = await getProjectBySlug( slug );

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
	const projects = await getProjects();

	const paths = projects
		.map( project => ( {
			params: { slug: project.slug },
		} ) );

	return {
		paths,
		fallback: true,
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
	const router = useRouter();

	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Human Made | { he.decode( DOMPurify.sanitize( data.title.rendered, { ALLOWED_TAGS: [] } ) ) }</title>
			</Head>
			<div>
				<h2>
					<HTMLContent
						content={ he.decode( DOMPurify.sanitize( data.title.rendered ) ) }
					/>
				</h2>
				<HTMLContent
					content={ DOMPurify.sanitize( data.page_builder.rendered ) }
				/>
			</div>
		</>
	);
};

export default SingleProject;
