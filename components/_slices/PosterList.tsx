import { ImageType, SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import React from 'react';

const PosterList = ({ slice }: { slice: SliceType }) => {
	return (
		<section className="my-5 poster-list w-full container">
			<div className="header w-full">{RichText.render(slice.primary.title)}</div>
			<div className="md:my-14 flex-cc">
				{slice.items.map((item: { image: ImageType }, index: number) => (
					<img
						className=" max-w-xl my-5 w-full"
						key={index}
						src={item.image.url}
						alt={item.image.alt}
					/>
				))}
			</div>
		</section>
	);
};

export default PosterList;
