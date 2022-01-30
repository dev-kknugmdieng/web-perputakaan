import { SliceType } from '@core/prismic/client';
import parse from 'html-react-parser';
import { RichText } from 'prismic-reactjs';
import React from 'react';

const EmbededList = ({ slice }: { slice: SliceType }) => {
	console.log(slice);

	return (
		<section className="my-5 embed container">
			<div className="header w-full">{RichText.render(slice.primary.title)}</div>
			<div className="w-full flex-cc flex-col">
				{slice.items.map((item, index) => (
					<div key={index} className="my-5">
						{parse(RichText.asText(item.body1))}
					</div>
				))}
			</div>
		</section>
	);
};

export default EmbededList;
