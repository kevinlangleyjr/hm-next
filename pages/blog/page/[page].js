import Link from 'next/link';
import { convertToRelativeUrl } from 'utils/urls';

export const getStaticProps = async context => {
    const { page } = context.params;
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts?page=${page}`);
    const data = await res.json();

    return {
        props: {
            data,
            page,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
    }
}


// This function gets called at build time
export const getStaticPaths = async () => {
    let page = 1;
    let paths = [];

    do {
        // Call an external API endpoint to get posts
        const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts/?page=${page}`);
        const posts = await res.json();

        if ( posts?.data?.status === 400 ) {
            page = 0;
            break;
        }

        paths = [ ...paths, ...[ {
            params: {
                page: `${ page }`,
            },
        } ] ];

        page++;
    } while ( page > 0 );

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

const PaginatedBlog = ( { data, page } ) => {
    return (
        <div>
            { data.map( post => (
                <div className="post" key={post.id}>
                    <h3>
                        <Link href={convertToRelativeUrl(post.link, '/blog')}>
                            <a>
                                {post.title.rendered}
                            </a>
                        </Link>
                    </h3>
                </div>
            ))}
            <footer>
                <Link href={`/blog/page/${ parseInt( page ) - 1}`}>
                    <a>
                        Previous Page
                    </a>
                </Link>
                <Link href={`/blog/page/${ parseInt( page ) + 1 }` }>
                    <a>
                        Next Page
                    </a>
                </Link>
            </footer>
        </div>
    )
}

export default PaginatedBlog
