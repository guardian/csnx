import { helloWorld } from '@csnx/hello-world';
import styled from '@emotion/styled';

const StyledApp = styled.div`
	// Your style here
`;

export function App() {
	return (
		<StyledApp>
			<p>{helloWorld()}</p>
		</StyledApp>
	);
}
