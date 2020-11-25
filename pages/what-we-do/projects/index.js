import Head from 'next/head';
import Link from 'next/link';
import { Component } from 'react';
import { convertToRelativeUrl } from 'utils/urls';

const { API_URL_ROOT } = process.env;

/**
 * Get static props for page.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async () => {
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/hm_projects?per_page=100` );
	const data = await res.json();

	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};

/**
 * Projects Archive Component
 *
 * @param {object} props - Component properties.
 * @param {Array} props.data - Array of project objects.
 *
 * @returns {Component} ProjectsArchive component.
 */
const ProjectsArchive = ( { data } ) => {
	return (
		<>
			<Head>
				<title>Human Made | Projects</title>
			</Head>
			<div>
				{ data.map( project => (
					<div key={ project.id } className="project">
						<h3>
							<Link href={ convertToRelativeUrl( project.link ) }>
								<a>{ project.title.rendered }</a>
							</Link>
						</h3>
					</div>
				) ) }
			</div>
		</>
	);
};

export default ProjectsArchive;
