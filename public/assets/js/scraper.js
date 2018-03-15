var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../../../models")

var scraperObject = {
	getArticles: function(){
	 // First, we grab the body of the html with axios
		axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page")
		.then(function(response) {
			// Then, we load that into cheerio and save it to $ for a shorthand selector
			var $ = cheerio.load(response.data);
			var articleObjects = [];

			$(".latest-panel .story-menu li").each(function(i, element) {
			  // Save an empty result object
				var url = $(element).find(".story-body").find(".story-link").attr("href").trim();
				var headline = $(element).find(".story-body").find(".headline").text().trim();
				var summary = $(element).find(".story-body").find(".summary").text().trim();

				if(url && headline && summary){
					var article = {url: url, headline: headline, summary: summary };
					console.log(article);
					// Create a new Article using the `result` object built from scraping
					// db.Article.create(article)
					// .then(function(dbArticle) {
					// 	// View the added result in the console
					// 	console.log(`The article that was created was ${dbArticle}`);
					// })
					// .catch(function(err) {
					// 	// If an error occurred, send it to the client
					// 	return res.json(err);
					// });
					var newDiv = $("<div>");
					//newDiv.addClass("shown");
					// newDiv.append("<div class='card'><div class='card-body'><h3>" 
					// 			+ headline + '</h3><p>' 
					// 			+ summary + "</p><br><a href='" + url + "'>" 
					// 			+ url + "</a></div></div>");
					$("#article-area").append(newDiv);
				}
			});

			// If we were able to successfully scrape and save an Article, send a message to the client
			console.log("Scrape Complete");
		});
	}
}
module.exports = scraperObject; 