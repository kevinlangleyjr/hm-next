import HTMLContent from 'components/HTMLContent';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Component } from 'react';
import { getHumanBySlug } from 'utils/api';

const { API_URL_ROOT } = process.env;

/**
 * Get static props for human.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const { slug } = context.params;
	const data = await getHumanBySlug( slug );

	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};

/**
 * Get static paths for humans.
 *
 * @returns {object} Path data.
 */
export const getStaticPaths = async () => {
	const res = await fetch( `${ API_URL_ROOT }/wp-json/hmn/v1/humans` );
	const humans = await res.json();

	const paths = humans
		.filter( human => human.slug !== 'Noel' )
		.map( human => ( {
			params: {
				slug: human.slug,
			},
		} ) );

	return {
		paths,
		fallback: true,
	};
};

/**
 * Single Human Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Single human component.
 */
const SingleHuman = ( { data } ) => {
	const router = useRouter();

	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Human Made | { he.decode( DOMPurify.sanitize( data.display_name, { ALLOWED_TAGS: [] } ) ) }</title>
			</Head>
			<div>
				<h2>
					<HTMLContent
						content={ he.decode( DOMPurify.sanitize( data.display_name ) ) }
					/>
				</h2>
				<Image
					height="551"
					src={ data?.xprofile?.base_public?.fields?.website_photo?.value }
					width="735"
				/>
				<h3>
					<HTMLContent
						content={ he.decode( DOMPurify.sanitize( data?.xprofile?.base_public?.fields?.short_bio.value ) ) }
					/>
				</h3>
				<HTMLContent
					content={ he.decode( DOMPurify.sanitize( data?.xprofile?.base_public?.fields?.long_description.value ) ) }
				/>
			</div>
		</>
	);
};

export default SingleHuman;
