import CustomPage, { StaticProps } from './[...customs]';
import { queryLayout, queryPageByRoute } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const content = await queryPageByRoute('/');
	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { layout_content, content },
	};
};

export default CustomPage;
