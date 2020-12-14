import HTMLContent from 'components/HTMLContent';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Component } from 'react';
import { convertToRelativeUrl } from 'utils/urls';

const { API_URL_ROOT } = process.env;

/**
 * @param id
 */
const getProjects = async id => {
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/hm_projects?hm_industries=${ id }` );
	return await res.json();
};

/**
 * Get static props for page.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const { slug } = context.params;
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/hm_industries?slug=${ slug }` );
	let data = await res.json();
	data = data[0];

	data.projects = await getProjects( data.id );

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
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/hm_industries?per_page=100` );
	const industries = await res.json();

	const paths = industries
		.map( industry => ( {
			params: { slug: industry.slug },
		} ) );

	return {
		paths,
		fallback: true,
	};
};

/**
 * Single Industry Taxonomy Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Single Industry Taxonomy component.
 */
const SingleIndustry = ( { data } ) => {
	const router = useRouter();

	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Human Made | { he.decode( DOMPurify.sanitize( data.name, { ALLOWED_TAGS: [] } ) ) }</title>
			</Head>
			<div>
				<h2>
					<HTMLContent
						content={ he.decode( DOMPurify.sanitize( data.name ) ) }
					/>
				</h2>
				{ data?.projects?.map( project => {
					return (
						<div key={ project.id } className="project">
							<h3>
								<Link href={ convertToRelativeUrl( project.link ) }>
									<a>{ he.decode( project.title.rendered ) }</a>
								</Link>
							</h3>
						</div>
					);
				} ) }
			</div>
		</>
	);
};

export default SingleIndustry;
