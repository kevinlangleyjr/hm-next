import Head from 'next/head'

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = async context => {
    const { slug } = context.params;
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts?slug=${slug}`);
    let data = await res.json();
    data = data[0];

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

// This function gets called at build time
export const getStaticPaths = async () => {
    let page = 1;
    let paths = [];

    do {
        // Call an external API endpoint to get posts
        const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts/?per_page=100&page=${page}`);
        const posts = await res.json();

        if ( posts?.data?.status === 400 ) {
            page = 0;
            break;
        }

        paths = [ ...paths, ...posts.map( post => {
            const postDate = new Date( post.date );
            return {
                params: {
                    year: postDate.getFullYear().toString(),
                    month: ( `0${ postDate.getMonth() + 1 }` ).slice( -2 ),
                    day: ( `0${ postDate.getDate() }` ).slice( -2 ),
                    slug: post.slug,
                },
            };
        } ) ];

        page++;
    } while ( page > 0 );

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

const Blog = ({ data }) => {
    return (
        <>
            <Head>
                <title>{data.title.rendered}</title>
            </Head>

            <main>
                <h1>
                    {data.title.rendered}
                </h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
            </main>
        </>
    )
}

export default Blog;
