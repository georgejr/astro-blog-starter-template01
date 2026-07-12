import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getRssItems } from "../lib/content";

export async function GET(context) {
	// Published articles only — scheduled and draft posts never appear here.
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: await getRssItems(),
	});
}
