import bookIndex from '@core/algolia';
import client, { ImageType, BookDoc, SliceType } from '@core/prismic/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { RichTextBlock } from 'prismic-reactjs';

export interface algoliaObject {
	objectID: string;
	uid: string;
	type: string;
	first_publication_date: string;
	last_publication_date: string;
	lang: string;
	title: string;
	cover: ImageType;
	desc: RichTextBlock[];
	author: RichTextBlock[];
	rating: number;
	status: string;
	genre: string[];
}

export const formatDoc = (doc: BookDoc): algoliaObject => {
	function FormtedGenre(
		genres: {
			content: RichTextBlock[];
		}[]
	) {
		const genreList: string[] = [];
		genres.forEach((genre) => {
			genre.content.forEach((item) => {
				genreList.push(item.text);
			});
		});
		return genreList;
	}

	return {
		objectID: doc.id,
		uid: doc.uid,
		type: doc.type,
		first_publication_date: doc.first_publication_date,
		last_publication_date: doc.last_publication_date,
		lang: doc.lang,
		title: doc.data.html_title,
		cover: doc.data.cover,
		desc: doc.data.desc,
		author: doc.data.author,
		rating: doc.data.rating,
		status: doc.data.status,
		genre: FormtedGenre(doc.data.genre),
	};
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	if (method !== 'POST') {
		return res.json({ status: 'success' });
	}

	const data: {
		type: string;
		masterRef: string;
		documents: string[];
	} = req.body;

	try {
		const ids = data?.documents ? data.documents : [];
		const promises = [];
		const algoliaObjects = [];
		if (!ids) {
			throw new Error('Id is required');
		}

		ids.forEach((id) => {
			promises.push(client.getByID(id));
		});

		return Promise.all(promises)
			.then((result) => {
				result.forEach((doc: BookDoc) => {
					if (doc.type === 'book') {
						algoliaObjects.push(formatDoc(doc));
					}
				});

				return bookIndex.saveObjects(algoliaObjects);
			})
			.then(() => {
				return res.status(200).json({ status: 'index success' });
			});
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err });
	}
}
