import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const artikelIndex = client.initIndex(process.env.ALGOLIA_INDEX);

const publicClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	'f6a57f4c12c6994ac0d1cd186f421621'
);
export const publicArtikelIndex = publicClient.initIndex('artikel');

export default artikelIndex;
