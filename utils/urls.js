/**
 * Convert absolute to relative URL.
 *
 * @param {string} url - URL to convert
 * @param {string} prefix - Prefix for the URL.
 *
 * @returns {string} - Converted string.
 */
export const convertToRelativeUrl = ( url, prefix = '' ) =>
	`${prefix}${url.replace( process.env.API_URL_ROOT, '' )}`;
