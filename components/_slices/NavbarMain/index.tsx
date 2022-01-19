import React, { useState } from 'react';
import { Image, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';

interface Props {
	slice: SliceType;
}

const HamburgerIcon = ({ open }: { className?: string; open: boolean }): JSX.Element => (
	<div className="w-6 flex items-center justify-center relative">
		<span
			className={`${
				open ? 'translate-y-0 rotate-45' : '-translate-y-2'
			} transform transition w-full h-px bg-current absolute`}
		></span>

		<span
			className={` ${
				open ? 'opacity-0 translate-x-3' : 'opacity-100'
			} transform transition w-full h-px bg-current absolute`}
		></span>

		<span
			className={`${
				open ? 'translate-y-0 -rotate-45' : 'translate-y-2'
			} transform transition w-full h-px bg-current absolute`}
		></span>
	</div>
);

const NavbarMain = ({ slice }: Props): JSX.Element => {
	const links: {
		position: string;
		route: string;
		text: RichTextBlock[];
		type: string;
	}[] = slice.items;
	const { logo }: { logo: Image } = slice.primary;
	const LinkLeft = links.filter((data) => data.position === 'Left');
	const router = useRouter();
	const [OpenNav, setOpenNav] = useState(false);
	return (
		<nav className="md:p-6 p-3 bg-white">
			<div className="container flex-bc">
				<div className="flex items-center">
					{logo.url && <img src={logo.url} alt={logo.alt} />}
					<div className="ml-10 hidden md:flex gap-3">
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
					<div className="block md:hidden">
						<button onClick={() => setOpenNav((prev) => !prev)}>
							<HamburgerIcon open={OpenNav} />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarMain;
