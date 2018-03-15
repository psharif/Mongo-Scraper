var cheerio = require("cheerio");
var axios = require("axios");
//var db = require("../../../models");

var scraperObject = {
	getArticles: function(callback){
		 // First, we grab the body of the html with axios
		axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page")
		.then((response)=> {
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

			callback(newestArticles);
			console.log("Scrape Complete");
		});
	}
}

module.exports = scraperObject; 