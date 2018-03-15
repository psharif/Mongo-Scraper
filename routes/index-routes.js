var router = require('express').Router();
var scraper2 = require("../public/assets/js/scraper2.js");
const cheerio = require("cheerio");
const axios = require("axios");
var db = require("../models");

router.get('/', function(req, res){

	axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page")
	.then(function(response) {
		// Then, we load that into cheerio and save it to $ for a shorthand selector
		const $ = cheerio.load(response.data);

		const newestArticles = $('.latest-panel .story-menu li').map(function(i, el) {

			const url = $(el).find(".story-body").find(".story-link").attr("href");
			const headline = $(el).find(".story-body").find(".headline").text();
			const summary = $(el).find(".story-body").find(".summary").text();

			if(url && headline && summary){
				url.trim();
				headline.trim();
				summary.trim();
				const article = {url: url, headline: headline, summary: summary };
				return article;
			}

		}).get();

		res.render("index", {article: newestArticles});
		console.log("Scrape Complete");
	});

});

module.exports = router;