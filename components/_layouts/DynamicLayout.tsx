import React from 'react';
import useClearance from '@core/hooks/useClearance';
import { useLayout } from '@core/contexts/app';
import AlertHandler from '@components/_shared/AlertHandler';
import SEOTags from '@components/_shared/SEOTags';
import { LayoutContentType } from '@core/prismic/client';
import RenderSlice from '@components/_slices/_renderslice';

interface Props {
	children: React.ReactNode;
	content: LayoutContentType;
	title?: string;
}

const DynamicLayout = ({ children, content, title }: Props): JSX.Element => {
	const [minHeight, upperRef, lowerRef] = useClearance();
	const { AlertValue } = useLayout();

	const childrenPosition = content.body.findIndex((slice) => slice.slice_type === 'children');

	return (
		<>
			<SEOTags title={title} />

			<header ref={upperRef}>
				{content.body.slice(0, childrenPosition).map((slice, i) => (
					<RenderSlice slice={slice} key={i} />
				))}
			</header>

			<main style={{ minHeight }} className="flex-sc col">
				{children}
			</main>

			<footer ref={lowerRef}>
				{content.body.slice(childrenPosition + 1).map((slice, i) => (
					<RenderSlice slice={slice} key={i} />
				))}
			</footer>

			{AlertValue && <AlertHandler key={Date.now()} />}
		</>
	);
};

export default DynamicLayout;
