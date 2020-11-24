import HtmlToReact, { Parser as HtmlToReactParser } from 'html-to-react';
import utils from 'html-to-react/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const htmlToReactParser = new HtmlToReactParser();

// Get the default processing definitions.
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions( React );

// Custom processing instructions for our content.
const processingInstructions = [
	{

		shouldProcessNode: node => {
			const src = node?.attribs?.src;
			const width = node?.attribs?.width;
			const height = node?.attribs?.height;

			return node.name === 'img' && src != null && width != null && height != null;
		},
		processNode: ( node, children, index ) => {
			node.name = Image;
			node.attribs.layout = 'intrinsic';

			return utils.createElement( node, index, node.data, children );
		},
	},
	{
		shouldProcessNode: node => {
			const href = node?.attribs?.href;

			return node.name === 'a' && href && ( href.includes( 'https://humanmade.com' ) || href.startsWith( '/' ) );
		},
		processNode: ( node, children, index ) => {
			node.name = Link;
			node.attribs.href = node.attribs.href.replace( 'https://humanmade.com', '' );

			const wrappedChildren = (
				<a>
					{ children }
				</a>
			);

			return utils.createElement( node, index, node.data, wrappedChildren );
		},
	},
	{
		// Anything else
		shouldProcessNode: () => true,
		processNode: processNodeDefinitions.processDefaultNode,
	},
];

/**
 * HTML Content Component.
 *
 * @param {object} props - Component properties.
 * @param {object} props.content - Data for the page.
 *
 * @returns {Component} HTML Content Component.
 */
const HTMLContent = ( { content } ) => {
	// Check content length before even parsing it and return empty string if it is empty.
	const reactComponents = content.length
		? htmlToReactParser.parseWithInstructions( content, () => true, processingInstructions )
		: '';

	if ( Array.isArray( reactComponents ) ) {
		return reactComponents.filter( component => typeof component === 'object' );
	}

	return reactComponents;
};

HTMLContent.propTypes = {
	content: PropTypes.string.isRequired,
};

export default HTMLContent;
