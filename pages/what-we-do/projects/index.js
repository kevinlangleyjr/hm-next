import he from 'he';
import Head from 'next/head';
import Link from 'next/link';
import { Component } from 'react';
import { getProjects } from 'utils/api';
import { convertToRelativeUrl } from 'utils/urls';

/**
 * Get static props for page.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async () => {
	const data = await getProjects();

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
				{ data.map( project => {
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

export default ProjectsArchive;
