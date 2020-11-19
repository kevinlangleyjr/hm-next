import Link from 'next/link';
import PropTypes from 'prop-types';
import { convertToRelativeUrl } from 'utils/urls';

export const getStaticProps = async () => {
    const res = await fetch(`https://humanmade.com/wp-json/wp/v2/posts`);
    const data = await res.json();

    return {
        props: {
            data,
        },
        revalidate: 60,
    };
};

const Blog = ({ data }) => {
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
                <Link href="/blog/page/2">
                    <a>Next Page</a>
                </Link>
            </footer>
        </div>
    );
};

Blog.propTypes = {
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
};

export default Blog;
