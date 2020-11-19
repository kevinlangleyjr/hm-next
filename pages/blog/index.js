import Link from 'next/link';
import { convertToRelativeUrl } from 'utils/urls';

export const getStaticProps = async () => {
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts`);
    const data = await res.json();

    return {
        props: {
            data,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
    }
}

const Blog = ( { data } ) => {
    return (
        <div>
            { data.map( post => (
                <div className="post" key={ post.id }>
                    <h3>
                        <Link href={ convertToRelativeUrl( post.link, '/blog' ) }>
                            <a>
                                { post.title.rendered }
                            </a>
                        </Link>
                    </h3>
                </div>
            ) ) }
        </div>
    )
}

export default Blog
