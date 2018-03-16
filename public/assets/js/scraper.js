const cheerio = require("cheerio");
const axios = require("axios");
var db = require("../../../models");

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
					const trimmedUrl = url.trim();
					const trimmedHeadline = headline.trim();
					const trimmedSummary = summary.trim();

					const article = {url: trimmedUrl, headline: trimmedHeadline, summary: trimmedSummary };
					return article;
				}

			}).get();

			 db.Article.find({})
		    .then(function(savedArticles) {
		    	const nonSavedNewArticles = newestArticles.map(article =>{
					if(!savedArticles.includes(article)){
						return article;
					}
					return null;
				});

		    	callback(nonSavedNewArticles);

		    })
		    .catch(function(err) {
		      console.log(err);
		    });

			//callback(newestArticles);
			console.log("Scrape Complete");
		});
	}
}

module.exports = scraperObject; 