import React from 'react';
import { SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType;
}

export const SearchIcon = ({ className = '' }) => (
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
			strokeWidth="5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M27.5596 28.3378L33.2386 34.0078"
			stroke="white"
			strokeWidth="5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const Header = ({ slice }: Props): JSX.Element => {
	return (
		<div className="container my-3">
			<div className="bg-gray-200 relative min-h-[490px] md:bg-pos-5 bg-rak-buku bg-cover bg-no-repeat md:grid md:grid-cols-2 p-10 md:p-20 rounded-3xl">
				<div className="md:col-span-1 h-full">
					<div className="md:relative flex flex-col justify-between h-full">
						<div>
							<h1 className="italic mb-5 font-bold text-4xl md:text-6xl text-black">
								Ayo baca buku
							</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
								bibendum, tortor iaculis ultricies dignissim, metus erat interdum
								mi, eu varius velit diam in lorem.
							</p>
						</div>
						<div className="flex absolute md:left-0 -bottom-8 md:-bottom-28 left-[calc(0%+50px)] w-4/5 md:w-full justify-center items-center px-5 py-2 bg-white shadow-lg rounded-xl">
							<input
								className="text-2xl w-full"
								placeholder="Masukan nama bukumu...."
								type="text"
							/>
							<button className="bg-orange p-2 rounded-md ml-3">
								<SearchIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
