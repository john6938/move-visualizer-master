import * as React from 'react';

interface Props {
	children: string | Error;
}

export default ({ children }: Props) => {
	if (children instanceof Error) children = children.message;
	return (
		<div style={{ textAlign: 'center', color: 'red', margin: '8px 0' }}>
			{children}
		</div>
	);
};
