import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const HumansContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    margin: 0 0 2rem;
`;

const Human = styled.div`
    width: calc( 25% - 0.75rem );
    height: 154px;
    position: relative;
`;

/**
 * @param {object} props - Component properties.
 * @param {object[]} props.humans - Humans data.
 *
 * @returns {Component} Humans Grid Component.
 */
const HumansGrid = ( { humans } ) => (
	<HumansContainer>
		{ humans.map( human => (
			<Human key={ human.slug }>
				<Link href={ `/who-we-are/${human.slug}` }>
					<a>
						<p>{ human.display_name }</p>
						<Image layout="fill" objectFit="cover" src={ human.xprofile.base_public.fields.website_photo.value } />
					</a>
				</Link>
			</Human>
		) ) }
	</HumansContainer>
);

HumansGrid.propTypes = {
	humans: PropTypes.array.isRequired,
};

export default HumansGrid;
