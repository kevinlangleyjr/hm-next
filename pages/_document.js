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
		const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

		return (
			<Html lang="en">
				<Head>
					{ this.props.styleTags }
					{ NEXT_PUBLIC_GA_TRACKING_ID && (
						<>
							<script
								async
								src={ `https://www.googletagmanager.com/gtag/js?id=${ NEXT_PUBLIC_GA_TRACKING_ID }` }
							/>
							<script
								dangerouslySetInnerHTML={ {
									__html: `
										window.dataLayer = window.dataLayer || [];
										function gtag(){
											dataLayer.push( arguments );
										}
										gtag( 'js', new Date() );
										gtag( 'config', '${ NEXT_PUBLIC_GA_TRACKING_ID }', {
											page_path: window.location.pathname,
										} );
							`,
								} }
							/>
						</>
					) }
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
