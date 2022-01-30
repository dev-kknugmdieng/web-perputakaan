import React from 'react';
import { GetStaticPropsResult } from 'next';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import RenderSlice from '@components/_slices/_renderslice';
import {
	ContentType,
	LayoutContentType,
	queryAllPages,
	queryLayout,
	queryPageByRoute,
} from '@core/prismic/client';

const CustomPage = ({ content, layout_content }: StaticProps): JSX.Element => {
	return (
		<DynamicLayout content={layout_content} title={content.html_title}>
			{content.body.map((slice, i) => (
				<RenderSlice slice={slice} key={i} />
			))}
		</DynamicLayout>
	);
};

export interface StaticProps {
	content?: ContentType;
	layout_content: LayoutContentType;
}

export const getStaticProps = async (context): Promise<GetStaticPropsResult<StaticProps>> => {
	const { customs } = context.params;
	const route = '/' + customs.join('/');

	const content = await queryPageByRoute(route);
	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { content, layout_content },
	};
};

interface StaticPaths {
	paths: { params: { customs: string | string[] } }[];
	fallback: false;
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const docs = await queryAllPages();

	const paths = docs
		.filter((doc) => doc.data.route !== '/')
		.map((doc) => {
			const customs = doc.data.route.split('/').filter((item) => item);
			return { params: { customs } };
		});

	return {
		paths: paths,
		fallback: false,
	};
};

export default CustomPage;
