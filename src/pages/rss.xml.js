import rss from "@astrojs/rss";
import { SITE_NAME, SITE_TAGLINE } from "../lib/site";
import { getRssItems } from "../lib/content";

export async function GET(context) {
	// Published articles only — scheduled and draft posts never appear here.
	return rss({
		title: `${SITE_NAME} blog`,
		description: SITE_TAGLINE,
		site: context.site,
		items: await getRssItems(),
	});
}
