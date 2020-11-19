import Link from 'next/link';
import PropTypes from 'prop-types';
import { convertToRelativeUrl } from 'utils/urls';

export const getStaticProps = async (context) => {
    const { page } = context.params;
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts?page=${page}`);
    const data = await res.json();

    return {
        props: {
            data,
            page,
        },
        revalidate: 60,
    };
};

export const getStaticPaths = async () => {
    let page = 1;
    let paths = [];

    do {
        const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts/?page=${page}`);
        const posts = await res.json();

        if (posts?.data?.status === 400) {
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
    } while (page > 0);

    return { paths, fallback: false };
};

const PaginatedBlog = ({ data, page }) => {
    return (
        <div>
            {data.map((post) => (
                <div className="post" key={post.id}>
                    <h3>
                        <Link href={convertToRelativeUrl(post.link, '/blog')}>
                            <a>{post.title.rendered}</a>
                        </Link>
                    </h3>
                </div>
            ))}
            <footer>
                <Link href={`/blog/page/${parseInt(page) - 1}`}>
                    <a>Previous Page</a>
                </Link>
                <Link href={`/blog/page/${parseInt(page) + 1}`}>
                    <a>Next Page</a>
                </Link>
            </footer>
        </div>
    );
};

PaginatedBlog.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            link: PropTypes.string,
            title: PropTypes.shape({
                rendered: PropTypes.string.isRequired,
            }),
            content: PropTypes.shape({
                rendered: PropTypes.string.isRequired,
            }),
        })
    ),
    page: PropTypes.string.isRequired,
};

export default PaginatedBlog;
