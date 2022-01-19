import React from 'react';
import { Image, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';

interface Props {
	slice: SliceType;
}

const NavbarMain = ({ slice }: Props): JSX.Element => {
	const links: {
		position: string;
		route: string;
		text: RichTextBlock[];
		type: string;
	}[] = slice.items;
	const { logo }: { logo: Image } = slice.primary;
	const LinkLeft = links.filter((data) => data.position === 'Left');
	const LinkRight = links.filter((data) => data.position === 'Right');
	const router = useRouter();

	return (
		<nav className="py-6 bg-white px-16">
			<div className="container flex-bc">
				<div className="flex items-center">
					{logo.url && <img src={logo.url} alt={logo.alt} />}
					<div className="ml-10 flex gap-3">
						{LinkLeft.map((link, index) => (
							<Link
								className={`${
									router.asPath === link.route
										? 'before:w-1 before:h-1 before:rounded-full before:bg-orange before:absolute before:left-1/2 before:-bottom-1 font-bold'
										: ''
								} relative text-orange-light hover:underline `}
								key={index}
								href={link.route}
							>
								{RichText.asText(link.text)}
							</Link>
						))}
					</div>
				</div>
				<div>
					<div className="flex gap-3">
						{LinkRight.map((link, index) => (
							<Link
								className={`${
									link.type === 'Button link'
										? 'bg-orange text-white hover:bg-white hover:text-orange'
										: 'text-orange bg-white hover:bg-orange hover:text-white'
								} px-6 py-2 rounded-xl border-orange border font-bold transition-all hover:rounded-md`}
								key={index}
								href={link.route}
							>
								{RichText.asText(link.text)}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarMain;
