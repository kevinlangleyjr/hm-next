import HTMLContent from 'components/HTMLContent';
import HumansGrid from 'components/HumansGrid';
import he from 'he';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Component } from 'react';
import { getHumans, getPageBySlug } from 'utils/api';

/**
 * Get static props for page.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const humans = await getHumans();
	const page = await getPageBySlug( 'who-we-are' );

	return {
		props: {
			data: {
				page,
				humans,
			},
		},
		revalidate: 60,
	};
};

/**
 * who We Are Page Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Single human component.
 */
const HumansPage = ( { data } ) => {
	const router = useRouter();

	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Human Made | { he.decode( DOMPurify.sanitize( data.page.title.rendered, { ALLOWED_TAGS: [] } ) ) }</title>
			</Head>

			<main>
				<h1>{ he.decode( DOMPurify.sanitize( data.page.title.rendered ) ) }</h1>
				<div className="content">
					<HTMLContent content={ DOMPurify.sanitize( data.page.content.rendered ) } />
					{ data?.humans && (
						<HumansGrid humans={ data.humans } />
					) }
				</div>
			</main>
		</>
	);
};

export default HumansPage;
