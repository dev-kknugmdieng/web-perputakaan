import * as Prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';
import { RichTextBlock } from 'prismic-reactjs';

const apiEndpoint = Prismic.getEndpoint(process.env.PRISMIC_API);
const accessToken = process.env.NEXT_PUBLIC_PRISMIC_TOKEN || '';

const client = Prismic.createClient(apiEndpoint, { accessToken });

export const queryByRoute = (route: string): Promise<ContentType> => {
	return client
		.getSingle('pages', {
			predicates: [Prismic.Predicates.at('my.pages.route', route)],
		})
		.then((res) => res.data)
		.catch(() => null);
};

export const queryBookByUID = (uid: string): Promise<BookType> => {
	return client
		.getByUID('book', uid)
		.then((res) => res.data)
		.catch(() => null);
};

export const queryAllBooks = (uid: string): Promise<BookDoc[]> => {
	return client
		.getAllByType('book', {
			orderings: {
				field: 'document.created_at',
				direction: 'desc',
			},
		})
		.catch(() => null);
};

export const injectBooks = (data: ContentType): Promise<ContentType> => {
	const promises = [];
	const sliceList = ['book_list'];
	data.body.forEach((slice, index) => {
		if (sliceList.includes(slice.slice_type)) {
			promises.push(
				client.getAllByType('book').then((res) => ({
					result: res,
					index: index,
				}))
			);
		}
	});

	return Promise.all(promises).then((res) => {
		res.forEach((resdoc: { result: BookDoc[]; index: number }) => {
			data.body[resdoc.index].items = resdoc.result;
		});

		return data;
	});
};

export const queryPageByRoute = (route: string): Promise<ContentType> => {
	return client
		.getSingle('pages', {
			predicates: [Prismic.predicate.at('my.pages.route', route)],
		})
		.then((res: PageDoc) => res.data)
		.then((res: ContentType) => injectBooks(res))
		.catch(() => null);
};
export const queryAllPages = async (): Promise<PageDoc[]> => {
	return client.getAllByType('pages', {
		orderings: {
			field: 'document.created_at',
			direction: 'desc',
		},
	});
};

export const queryLayout = (uid: string): Promise<LayoutContentType> => {
	return client
		.getByUID('layouts', uid)
		.then((res) => res.data)
		.catch(() => null);
};

export default client;

declare type DataInterface = Record<
	string,
	prismicT.AnyRegularField | prismicT.GroupField | prismicT.SliceZone
>;

export interface PageDoc extends prismicT.PrismicDocument {
	data: ContentType;
}
export interface SliceType {
	items: any[];
	primary: any;
	slice_label?: any;
	slice_type: string;
}

export interface ImageType {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string | null;
	copyright: string | null;
	url: string;
}
export interface ContentType extends DataInterface {
	html_title: string;
	route: string;
	body: SliceType[];
	layout: { uid: string };
}
export interface BookType extends DataInterface {
	html_title: string;
	layout: { uid: string };
	cover: ImageType;
	desc: RichTextBlock[];
	status: 'tersedia' | 'dipinjam';
	genre: {
		content: RichTextBlock[];
	}[];
	rating: number;
}

export interface BookDoc extends prismicT.PrismicDocument {
	data: BookType;
}

export interface LayoutContentType {
	body: SliceType[];
}
