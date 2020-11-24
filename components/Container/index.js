import styled from 'styled-components';

export default styled.div`
	max-width: 65.833333333rem;
	margin: 0 auto;
	width: calc( 100% - (0.833333333rem * 2) );

	@media screen and ( min-width: 55rem ) {
		width: calc( 100% - (0.833333333rem * 4) );
	}
`;
