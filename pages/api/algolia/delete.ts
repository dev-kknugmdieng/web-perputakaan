import artikelIndex from '@core/algolia';
import { NextApiRequest, NextApiResponse } from 'next';

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
		if (!ids) {
			throw new Error('Id is required');
		}

		return artikelIndex.deleteObjects(ids).then(() => {
			return res.status(200).json({ status: 'delete success' });
		});
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err });
	}
}
