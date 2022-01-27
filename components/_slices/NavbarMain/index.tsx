import React, { useState } from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';
import useResize from '@core/hooks/useResize';

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

const NavbarDesktop = ({ slice }: Props): JSX.Element => {
	const links: {
		position: string;
		route: string;
		text: RichTextBlock[];
		type: string;
	}[] = slice.items;
	const { logo }: { logo: ImageType } = slice.primary;
	const LinkLeft = links.filter((data) => data.position === 'Left');
	const router = useRouter();
	const [OpenNav, setOpenNav] = useState(false);
	return (
		<nav className="md:p-6 p-3 bg-white">
			<div className="container flex-bc">
				<div className="flex items-center">
					<Link href="/">{logo.url && <img src={logo.url} alt={logo.alt} />}</Link>
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

const NavbarMain = ({ slice }: Props): JSX.Element => {
	const screen = useResize();
	if (screen.md) return <NavbarDesktop slice={slice} />;

	return <MobileNav slice={slice} />;
};

const MobileNav = ({ slice }: Props): JSX.Element => {
	const primary = slice.primary;
	const { logo }: { logo: ImageType } = primary;
	const links: {
		position: string;
		route: string;
		text: RichTextBlock[];
		type: string;
	}[] = slice.items;
	const [open, setOpen] = useState(false);
	// Todo Add popup links
	return (
		<div className="fixed z-50 w-full bg-white border-b shadow-lg">
			<div className="flex w-full  py-4 px-5 items-center justify-between">
				<div>
					{logo && (
						<Link className="" href="/">
							<img className=" max-h-10" src={logo.url} alt={logo.alt} />
						</Link>
					)}
				</div>

				<div>
					<button
						className=" bg-white rounded-md hover:bg-slate-100 px-2 py-4"
						onClick={() => setOpen((prev) => !prev)}
					>
						<HamburgerIcon className="relative" open={open} />
					</button>
				</div>
			</div>
			<div
				className={` ${
					open ? 'translate-x-0' : 'translate-x-full'
				} w-screen overflow-hidden h-screen transition-all bg-white flex flex-col absolute top-18 p-5 left-0`}
			>
				{links
					.filter((link) => link.position === 'Left')
					.map((link, index) => (
						<Link
							onClick={() => setOpen(false)}
							className="border-b py-5"
							key={index}
							href={link.route}
						>
							{RichText.asText(link.text)}
						</Link>
					))}
			</div>
		</div>
	);
};

export default NavbarMain;
