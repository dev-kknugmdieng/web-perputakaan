import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT = {
	sitename: 'Perpus Sikunang',
	domain: 'http://my-site.com/',
	description: 'Site description that contains some information about what is your site about',
	image: 'https://perpus-sikunang.cdn.prismic.io/perpus-sikunang/3b2d7a78-7844-47b9-bf04-de1821cf9d12_logo-orange.svg',
};

const SEOTags = (props: any) => {
	const router = useRouter();

	const data = { ...DEFAULT, ...props };
	const supertitle = data.title ? `${data.title} | ${data.sitename} ` : data.sitename;

	return (
		<Head>
			<title>{supertitle}</title>

			<meta name="robots" content="follow, index" />
			<meta name="description" content={data.description} />
			<meta property="og:url" content={router.asPath} />
			<link rel="canonical" href={router.asPath} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={supertitle} />
			<meta property="og:site_name" content={supertitle} />
			<meta property="og:description" content={data.description} />
			<meta property="og:image" name="image" content={data.image} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={supertitle} />
			<meta name="twitter:title" content={supertitle} />
			<meta name="twitter:description" content={data.description} />
			<meta name="twitter:image" content={data.image} />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			></meta>
		</Head>
	);
};

export default SEOTags;
