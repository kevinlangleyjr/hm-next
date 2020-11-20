import Head from 'next/head';
import PropTypes from 'prop-types';
import HTMLContent from 'components/HTMLContent';

export const getStaticProps = async (context) => {
    const { slug } = context.params;
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts?slug=${slug}`);
    let data = await res.json();
    data = data[0];

    return {
        props: {
            data,
        },
        revalidate: 60,
    };
};

export const getStaticPaths = async () => {
    let page = 1;
    let paths = [];

    do {
        const res = await fetch(
            `https://humanmade.com/wp-json/wp/v2/posts/?per_page=100&page=${page}`
        );
        const posts = await res.json();

        if (posts?.data?.status === 400) {
            page = 0;
            break;
        }

        paths = [
            ...paths,
            ...posts.map((post) => {
                const postDate = new Date(post.date);
                return {
                    params: {
                        year: postDate.getFullYear().toString(),
                        month: `0${postDate.getMonth() + 1}`.slice(-2),
                        day: `0${postDate.getDate()}`.slice(-2),
                        slug: post.slug,
                    },
                };
            }),
        ];

        page++;
    } while (page > 0);

    return { paths, fallback: false };
};

const Blog = ({ data }) => {
    return (
        <>
            <Head>
                <title>{data.title.rendered}</title>
            </Head>

            <main>
                <h1>{data.title.rendered}</h1>
                <div className="content">
                    <HTMLContent content={content} />
                </div>
            </main>
        </>
    );
};

Blog.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
            rendered: PropTypes.string.isRequired,
        }),
    }),
};

export default Blog;
