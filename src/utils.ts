import MOVES from './config/moves';

interface AbstractSegment {
	content: string;
	move: string;
	moveType?: string;
}

const findMove = (features: string[]): string => {
	for (const move in MOVES) {
		if (features.includes(move)) return move;
	}
	return 'uncertain';
};

const findMoveType = (features: string[], move: string): string | undefined => {
	for (const moveType of MOVES[move]) {
		if (features.includes(moveType)) return moveType;
	}
	return undefined;
};

export const parseXmlAbstract = (text: string): AbstractSegment[] => {
	const parser = new DOMParser();
	const document = parser.parseFromString(text, 'text/xml');
	const segmentNodes = Array.from(document.querySelectorAll('segment'));

	const segments: AbstractSegment[] = segmentNodes.map(node => {
		const features = node.attributes.getNamedItem('features')!.value.split(';');
		const move = findMove(features);
		const moveType = findMoveType(features, move);
		return {
			content: node.textContent as string,
			move,
			moveType,
		};
	});
	return segments;
};
