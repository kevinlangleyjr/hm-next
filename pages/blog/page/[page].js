import he from 'he';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { convertToRelativeUrl } from 'utils/urls';

const { API_URL_ROOT } = process.env;

/**
 * Get static props for page.
 *
 * @param {object} context Context for the request.
 *
 * @returns {object} Static props for page.
 */
export const getStaticProps = async context => {
	const { page } = context.params;
	const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/posts?page=${ page }` );
	const data = await res.json();

	return {
		props: {
			data,
			page,
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
	let page = 1;
	let paths = [];

	do {
		const res = await fetch( `${ API_URL_ROOT }/wp-json/wp/v2/posts/?page=${ page }` );
		const posts = await res.json();

		if ( posts?.data?.status === 400 ) {
			page = 0;
			break;
		}

		paths = [
			...paths,
			...[
				{
					params: {
						page: `${page}`,
					},
				},
			],
		];

		page++;
	} while ( page > 0 );

	return {
		paths,
		fallback: true,
	};
};

/**
 * Paginated blog Component
 *
 * @param {object} props - Component properties.
 * @param {object} props.data - Data for the page.
 * @param {number} props.page - Page number.
 *
 * @returns {Component} Paginated blog component.
 */
const PaginatedBlog = ( { data, page } ) => {
	const router = useRouter();

	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Human Made | Blog | Page { page }</title>
			</Head>
			<div>
				{ data.map( post => (
					<div key={ post.id } className="post">
						<h3>
							<Link href={ convertToRelativeUrl( post.link, '/blog' ) }>
								<a>{ he.decode( DOMPurify.sanitize( post.title.rendered ) ) }</a>
							</Link>
						</h3>
					</div>
				) ) }
				<footer>
					<Link href={ `/blog/page/${parseInt( page ) - 1}` }>
						<a>Previous Page</a>
					</Link>
					<Link href={ `/blog/page/${parseInt( page ) + 1}` }>
						<a>Next Page</a>
					</Link>
				</footer>
			</div>
		</>
	);
};

PaginatedBlog.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.number.isRequired,
			link: PropTypes.string,
			title: PropTypes.shape( {
				rendered: PropTypes.string.isRequired,
			} ),
			content: PropTypes.shape( {
				rendered: PropTypes.string.isRequired,
			} ),
		} )
	),
	page: PropTypes.string.isRequired,
};

export default PaginatedBlog;
