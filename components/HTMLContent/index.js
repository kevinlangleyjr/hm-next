import React from 'react';
import Image from 'next/image';
import HtmlToReact, { Parser as HtmlToReactParser } from 'html-to-react';
import utils from 'html-to-react/lib/utils';

const htmlToReactParser = new HtmlToReactParser();

// Get the default processing definitions.
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

// Custom processing instructions for our content.
const processingInstructions = [
    {
        // Convert all relative links into Link components for react-router.
        shouldProcessNode: (node) => {
            const src = node?.attribs?.src;
            const width = node?.attribs?.width;
            const height = node?.attribs?.height;

            return node.name === 'img' && src != null && width != null && height != null;
        },
        processNode: (node, children, index) => {
            node.name = Image;
            node.attribs.layout = 'intrinsic';

            return utils.createElement(node, index, node.data, children);
        },
    },
    {
        // Anything else
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
    },
];

const HTMLContent = ({ content }) => {
    // Check content length before even parsing it and return empty string if it is empty.
    const reactComponents = content.length
        ? htmlToReactParser.parseWithInstructions(content, () => true, processingInstructions)
        : '';

    if (Array.isArray(reactComponents)) {
        return reactComponents.filter((component) => typeof component === 'object');
    }

    return reactComponents;
};

export default HTMLContent;
