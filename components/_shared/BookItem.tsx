import { BookDoc, ImageType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import Link from './Link';

const StarIcon = () => (
	<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M15.9189 11.82C15.6599 12.071 15.5409 12.434 15.5999 12.79L16.4889 17.71C16.5639 18.127 16.3879 18.549 16.0389 18.79C15.6969 19.04 15.2419 19.07 14.8689 18.87L10.4399 16.56C10.2859 16.478 10.1149 16.434 9.93988 16.429H9.66888C9.57488 16.443 9.48288 16.473 9.39888 16.519L4.96888 18.84C4.74988 18.95 4.50188 18.989 4.25888 18.95C3.66688 18.838 3.27188 18.274 3.36888 17.679L4.25888 12.759C4.31788 12.4 4.19888 12.035 3.93988 11.78L0.328876 8.28C0.0268758 7.987 -0.0781242 7.547 0.0598758 7.15C0.193876 6.754 0.535876 6.465 0.948876 6.4L5.91888 5.679C6.29688 5.64 6.62888 5.41 6.79888 5.07L8.98888 0.58C9.04088 0.48 9.10788 0.388 9.18888 0.31L9.27888 0.24C9.32588 0.188 9.37988 0.145 9.43988 0.11L9.54888 0.07L9.71888 0H10.1399C10.5159 0.039 10.8469 0.264 11.0199 0.6L13.2389 5.07C13.3989 5.397 13.7099 5.624 14.0689 5.679L19.0389 6.4C19.4589 6.46 19.8099 6.75 19.9489 7.15C20.0799 7.551 19.9669 7.991 19.6589 8.28L15.9189 11.82Z"
			fill="#FFD600"
		/>
	</svg>
);

interface Props {
	book: BookDoc;
}

const BookItem = ({ book }: Props) => {
	const data = book.data;
	return (
		<div className="md:w-60 group w-full">
			<Link href={`/buku/${book.uid}`}>
				<div className="relative group-hover:rounded rounded-xl overflow-hidden">
					<div className="absolute z-20 left-0 top-0 w-full h-full max-h-60 bg-black transition-colors bg-opacity-0 group-hover:bg-opacity-10"></div>
					<img
						className="h-full max-h-60 w-full md:w-60 relative z-10  object-cover overflow-hidden transition-all"
						src={data.cover.url}
						alt={data.cover.alt}
					/>
				</div>
			</Link>
			<div className="w-full flex my-3 gap-2">
				{Array(data.rating)
					.fill(1)
					.map((x, i) => (
						<StarIcon key={i} />
					))}
			</div>
			<div>
				<h4 className="my-4 font-bold text-lg italic">
					<Link href={`/buku/${book.uid}`}>{data.html_title}</Link>
				</h4>
				<div>
					{data.genre.map((genre, index) => (
						<span key={index} className="bg-[#CCB05C80] text-[#CCB05C] px-2 py-1">
							{RichText.asText(genre.content)}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default BookItem;
