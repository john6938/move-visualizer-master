import * as React from 'react';
import MOVE_COLORS from '../../config/moveColors';
import { parseXmlAbstract } from '../../utils';

interface Props {
	xmlText: string;
	showAnnotation: boolean;
}

const AbstractText = ({ xmlText, showAnnotation }: Props) => {
	const segments = parseXmlAbstract(xmlText);
	return (
		<div>
			{segments.map(({ content, move, moveType }, idx) => (
				<React.Fragment key={idx}>
					{showAnnotation && (
						<span style={{ backgroundColor: MOVE_COLORS[move] }}>
							{move.toUpperCase()}
							{moveType && ' ' + moveType.toLowerCase()}
						</span>
					)}{' '}
					{content}
				</React.Fragment>
			))}
		</div>
	);
};

export default AbstractText;
