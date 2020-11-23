import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

/**
 * Custom Document.
 */
export default class HMDocument extends Document {
	static async getInitialProps( ctx ) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			/**
			 * Render page.
			 *
			 * @returns {void}
			 */
			ctx.renderPage = () =>
				originalRenderPage( {
					enhanceApp: App => props => sheet.collectStyles( <App { ...props } /> ),
				} );
			const initialProps = await Document.getInitialProps( ctx );
			return {
				...initialProps,
				styles: (
					<>
						{ initialProps.styles }
						{ sheet.getStyleElement() }
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
	render() {
		return (
			<Html>
				<Head>{ this.props.styleTags }</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
