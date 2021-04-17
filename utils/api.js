
const { API_URL_ROOT } = process.env;

/**
 * Get page by slug.
 *
 * @param {string} slug Page slug.
 *
 * @returns {object} Static props for page.
 */
export const getPageBySlug = async slug => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/pages?slug=${slug}` );
	let data = await res.json();

	return data[0] ?? {};
};

/**
 * Get all pages.
 *
 * @returns {Array} Array of page data.
 */
export const getPages = async () => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/pages?per_page=100` );

	return await res.json();
};

/**
 * Get all humans.
 *
 * @returns {Array} Array of humans.
 */
export const getHumans = async () => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/hmn/v1/humans` );

	return await res.json();
};

/**
 * Get human by slug.
 *
 * @param {string} slug Human slug.
 *
 * @returns {object} Static props for human.
 */
export const getHumanBySlug = async slug => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/hmn/v1/humans?slug=${slug}` );
	let data = await res.json();

	return data[0] ?? {};
};

/**
 * Get posts for page
 *
 * @param {number} page Page number
 *
 * @returns {Array} Array of posts.
 */
export const getPosts = async page => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/posts/?page=${page}` );

	return await res.json();
};

/**
 * Get post by slug.
 *
 * @param {string} slug Post slug.
 *
 * @returns {object} Post data.
 */
export const getPostBySlug = async slug => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/posts?slug=${slug}` );

	const data = await res.json();

	return data[0] ?? {};
};

/**
 * Get all projects.
 *
 * @returns {Array} Array of projects.
 */
export const getProjects = async () => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/hm_projects?per_page=100` );
	return await res.json();
};

/**
 * Get all projects.
 *
 * @param {string} slug Project slug.
 *
 * @returns {Array} Array of projects.
 */
export const getProjectBySlug = async slug => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/hm_projects?slug=${slug}` );
	const data = await res.json();

	return data[0] ?? {};
};

/**
 * Get projects by industry ID
 *
 * @param {number} industry Industry Id
 *
 * @returns {Array} Array of projects
 */
export const getProjectsByIndustry = async industry => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/hm_projects?hm_industries=${industry}` );
	return await res.json();
};

/**
 * Get industries
 *
 * @returns {Array} Array of industries
 */
export const getIndustries = async () => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/hm_industries?per_page=100` );

	return await res.json();
};

/**
 * Get industry by slug.
 *
 * @param {string} slug Industry slug
 *
 * @returns {object} Industry data.
 */
export const getIndustryBySlug = async slug => {
	const res = await fetch( `${API_URL_ROOT}/wp-json/wp/v2/hm_industries?slug=${slug}` );
	let data = await res.json();

	return data[0] ?? {};
};
