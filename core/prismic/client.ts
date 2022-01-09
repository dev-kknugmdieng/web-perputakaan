import * as Prismic from "@prismicio/client";

const apiEndpoint = Prismic.getEndpoint(process.env.PRISMIC_API);
const accessToken = process.env.NEXT_PUBLIC_PRISMIC_TOKEN || "";

const client = Prismic.createClient(apiEndpoint, { accessToken });

export const queryByRoute = (route: string): Promise<ContentType> => {
  return client
    .get({
      predicates: [Prismic.Predicates.at("my.pages.route", route)],
    })
    .then((res) => res.results[0].data)
    .catch(() => null);
};

export const queryLayout = (uid: string): Promise<LayoutContentType> => {
  return client
    .getByUID("layouts", uid)
    .then((res) => res.data)
    .catch(() => null);
};

export default client;

export interface SliceType {
  items: any[];
  primary: any;
  slice_label?: any;
  slice_type: string;
}

export interface ContentType {
  html_title: string;
  route: string;
  body: SliceType[];
  layout: { uid: string };
}

export interface LayoutContentType {
  body: SliceType[];
}
