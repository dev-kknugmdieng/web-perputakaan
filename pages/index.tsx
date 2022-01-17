import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import { LayoutContentType, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';

const SearchIcon = ({ className = '' }) => (
	<svg
		className={className}
		width="36"
		height="37"
		viewBox="0 0 36 37"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<ellipse
			cx="17.485"
			cy="17.4998"
			rx="14.485"
			ry="14.4998"
			stroke="white"
			stroke-width="5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M27.5596 28.3378L33.2386 34.0078"
			stroke="white"
			stroke-width="5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const Index = ({ layout_content }: StaticProps): JSX.Element => {
	const router = useRouter();
	return (
		<DynamicLayout content={layout_content} title={'Perpus Sikunang'} key={router.asPath}>
			<div className="container my-3">
				<div className="bg-gray-200 min-h-[490px] bg-pos-5 bg-rak-buku bg-cover bg-no-repeat grid grid-cols-2 px-20 py-20 rounded-3xl">
					<div className="col-span-1 h-full">
						<div className="relative flex flex-col justify-between h-full">
							<div>
								<h1 className="italic mb-5 font-bold text-6xl text-black">
									Ayo baca buku
								</h1>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
									bibendum, tortor iaculis ultricies dignissim, metus erat
									interdum mi, eu varius velit diam in lorem.
								</p>
							</div>
							<div className="flex absolute -bottom-28 w-full justify-center items-center px-5 py-2 bg-white shadow-lg rounded-xl">
								<input
									className="text-2xl w-full"
									placeholder="Masukan nama bukumu...."
									type="text"
								/>
								<button className="bg-orange p-2 rounded-md">
									<SearchIcon />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DynamicLayout>
	);
};
export interface StaticProps {
	layout_content: LayoutContentType;
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const layout_content = await queryLayout('main-layout');

	return {
		props: { layout_content },
	};
};

export default Index;
