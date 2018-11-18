import { BUCKET_NAME, ABSTRACTS_FOLDER_NAME } from '../config/googleCloud';

export interface FilePath {
	name: string;
	downloadUrl: string;
}

export interface AbstractPaths {
	[category: string]: FilePath[];
}

const getAllFilePaths = async (): Promise<FilePath[]> => {
	const response = await fetch(
		`https://www.googleapis.com/storage/v1/b/${BUCKET_NAME}/o`,
	);
	const data = await response.json();
	const filePaths: FilePath[] = data.items.map((item: any) => ({
		name: item.name,
		downloadUrl: item.mediaLink,
	}));
	return filePaths;
};

export const getAllAbstractPaths = async (): Promise<AbstractPaths> => {
	const abstracts: AbstractPaths = {};
	const filePaths = await getAllFilePaths();
	filePaths
		.filter(path => path.name.startsWith(`${ABSTRACTS_FOLDER_NAME}/`))
		.forEach(path => {
			path.name = path.name.substring(`${ABSTRACTS_FOLDER_NAME}/`.length);
			const separatorIdx = path.name.indexOf('/');
			const category = path.name.substring(0, separatorIdx);
			const fileName = path.name.substring(separatorIdx + 1);

			const newPath = {
				...path,
				name: fileName,
			};
			if (abstracts[category] === undefined) abstracts[category] = [newPath];
			else abstracts[category].push(newPath);
		});
	return abstracts;
};
