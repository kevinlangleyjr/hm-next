import HTMLContent from 'components/HTMLContent';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Component } from 'react';

/**
 * Get static props for page.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async () => {
	const res = await fetch( 'https://humanmade.com/wp-json/wp/v2/pages/7800' );
	let data = await res.json();

	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};

/**
 * Home page
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 *
 * @returns {Component} Home page component.
 */
const Home = ( { data } ) => {
	return (
		<>
			<Head>
				<title>Human Made | { data.title.rendered }</title>
			</Head>

			<main>
				<div className="content">
					<HTMLContent content={ data.content.rendered } />
				</div>
			</main>
		</>
	);
};

Home.propTypes = {
	data: PropTypes.shape( {
		title: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		} ),
		content: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		} ),
	} ),
};

export default Home;
