import artikelIndex from '@core/algolia';
import client, { ImageType, NewsDoc, SliceType } from '@core/prismic/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { RichTextBlock } from 'prismic-reactjs';

export interface algoliaObject {
	objectID: string;
	uid: string;
	type: string;
	first_publication_date: string;
	last_publication_date: string;
	lang: string;
	data: {
		thumbnail: ImageType;
		ringkasan: RichTextBlock[];
		author: string;
		html_title: string;
		layout: {
			uid: string;
		};
		created_at: string;
		body: SliceType[];
	};
}

export const formatDoc = (doc: NewsDoc): algoliaObject => {
	return {
		objectID: doc.id,
		uid: doc.uid,
		type: doc.type,
		first_publication_date: doc.first_publication_date,
		last_publication_date: doc.last_publication_date,
		lang: doc.lang,
		data: {
			thumbnail: doc.data.thumbnail,
			ringkasan: doc.data.ringkasan,
			author: doc.data.author,
			html_title: doc.data.html_title,
			layout: {
				uid: doc.data.layout.uid,
			},
			created_at: doc.data.created_at,
			body: doc.data.body,
		},
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
				result.forEach((doc: NewsDoc) => {
					if (doc.type === 'news') {
						algoliaObjects.push(formatDoc(doc));
					}
				});
				return artikelIndex.saveObjects(algoliaObjects);
			})
			.then(() => {
				return res.status(200).json({ status: 'index success' });
			});
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err });
	}
}
