import React from 'react';
import { BookDoc, SliceType } from '@core/prismic/client';
import BookItem from '@components/_shared/BookItem';

interface Props {
	slice: SliceType;
}

const BookList = ({ slice }: Props): JSX.Element => {
	const Books: BookDoc[] = slice.items;
	return (
		<section className="my-20 w-full">
			<div className="container flex flex-col items-center justify-center md:flex-row flex-wrap md:justify-start gap-10 md:gap-24">
				{Books.map((book, index) => (
					<BookItem key={index} book={book} />
				))}
			</div>
		</section>
	);
};

export default BookList;
