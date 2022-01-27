import DynamicLayout from '@components/_layouts/DynamicLayout';
import {
	BookType,
	LayoutContentType,
	queryBookByUID,
	queryLayout,
	queryAllBooks,
} from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import { RichText } from 'prismic-reactjs';
import React from 'react';

const CustomPage = ({ content, layout_content }: StaticProps): JSX.Element => {
	return (
		<DynamicLayout content={layout_content} title={content.html_title}>
			<div className="container my-24 md:my-0 flex-col md:flex-row flex gap-10">
				<div className="flex-shrink-0">
					<img
						className="w-full md:w-[418px] md:h-[591px] object-cover overflow-hidden rounded-2xl"
						src={content.cover.url}
						alt={content.cover.alt}
					/>
				</div>
				<div>
					<h1 className="font-bold mb-5 text-2xl md:text-6xl text-black">
						{content.html_title}
					</h1>
					<div className="flex flex-col md:flex-row gap-7">
						<div>
							<h4 className="font-bold mb-2">Penulis</h4>
							<p>{RichText.asText(content.author)}</p>
						</div>
						<div>
							<h4 className="font-bold mb-2">Rating</h4>
							<div className="flex gap-1">
								{Array(content.rating)
									.fill(0)
									.map((_, index) => (
										<svg
											key={index}
											width="21"
											height="20"
											viewBox="0 0 21 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M15.9189 11.82C15.6599 12.071 15.5409 12.434 15.5999 12.79L16.4889 17.71C16.5639 18.127 16.3879 18.549 16.0389 18.79C15.6969 19.04 15.2419 19.07 14.8689 18.87L10.4399 16.56C10.2859 16.478 10.1149 16.434 9.93988 16.429H9.66888C9.57488 16.443 9.48288 16.473 9.39888 16.519L4.96888 18.84C4.74988 18.95 4.50188 18.989 4.25888 18.95C3.66688 18.838 3.27188 18.274 3.36888 17.679L4.25888 12.759C4.31788 12.4 4.19888 12.035 3.93988 11.78L0.328876 8.28C0.0268758 7.987 -0.0781242 7.547 0.0598758 7.15C0.193876 6.754 0.535876 6.465 0.948876 6.4L5.91888 5.679C6.29688 5.64 6.62888 5.41 6.79888 5.07L8.98888 0.58C9.04088 0.48 9.10788 0.388 9.18888 0.31L9.27888 0.24C9.32588 0.188 9.37988 0.145 9.43988 0.11L9.54888 0.07L9.71888 0H10.1399C10.5159 0.039 10.8469 0.264 11.0199 0.6L13.2389 5.07C13.3989 5.397 13.7099 5.624 14.0689 5.679L19.0389 6.4C19.4589 6.46 19.8099 6.75 19.9489 7.15C20.0799 7.551 19.9669 7.991 19.6589 8.28L15.9189 11.82Z"
												fill="#FFD600"
											/>
										</svg>
									))}
							</div>
						</div>
						<div>
							<h4 className="font-bold mb-2">Genre</h4>
							<div>
								{content.genre.map((genre, index) => (
									<span key={index}>
										{index > 0 && ', '}
										{RichText.asText(genre.content)}
									</span>
								))}
							</div>
						</div>
						<div>
							<h4 className="font-bold mb-2">Status</h4>
							<p className="capitalize">{content.status}</p>
						</div>
					</div>
					<div className="mt-6">
						<h4 className="font-bold mb-2">Deskripsi</h4>
						<div className="paragraph-content">{RichText.render(content.desc)}</div>
					</div>
				</div>
			</div>
		</DynamicLayout>
	);
};

export interface StaticProps {
	content: BookType;
	layout_content: LayoutContentType;
}

export const getStaticProps = async (context): Promise<GetStaticPropsResult<StaticProps>> => {
	const { slug } = context.params;
	const content = await queryBookByUID(slug);
	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { layout_content, content },
	};
};

interface StaticPaths {
	paths: { params: { slug: string | string[] } }[];
	fallback: false;
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const docs = await queryAllBooks();

	const paths = docs.map((doc) => {
		const slug = doc.uid;
		return { params: { slug } };
	});

	return {
		paths: paths,
		fallback: false,
	};
};

export default CustomPage;
