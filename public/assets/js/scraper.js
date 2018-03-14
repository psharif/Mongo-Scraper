var cheerio = require("cheerio");
var axios = require("axios");

var scraperObject = {
	getArticles: function(){
		//var articleObjects = [];
	 // First, we grab the body of the html with request
		axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page")
		.then(function(response) {
			// Then, we load that into cheerio and save it to $ for a shorthand selector
			var $ = cheerio.load(response.data);
			var articleObjects = [];

			// Now, we grab every h2 within an article tag, and do the following:
			$(".latest-panel .story-menu li").each(function(i, element) {
			  // Save an empty result object
			 
			  //console.log("stuff");
			  var url = $(element).find(".story-body").find(".story-link").attr("href").trim();
			  var headline = $(element).find(".story-body").find(".headline").text().trim();
			  var summary = $(element).find(".story-body").find(".summary").text().trim();
			  console.log("URL:")
			  console.log(url);
			  console.log("Headline:");
			  console.log(headline);
			  console.log("Summary:");
			  console.log(summary);
			  console.log();

			  articleObjects.push({"url": url, "headline": headline, "summary": summary });



			  // Add the text and href of every link, and save them as properties of the result object
			  // result.title = $(this)
			  //   .children("a")
			  //   .text();
			  // result.link = $(this)
			  //   .children("a")
			  //   .attr("href");


			  // Create a new Article using the `result` object built from scraping
			  // db.Article.create(result)
			  //   .then(function(dbArticle) {
			  //     // View the added result in the console
			  //     console.log(dbArticle);
			  //   })
			  //   .catch(function(err) {
			  //     // If an error occurred, send it to the client
			  //     return res.json(err);
			  //   });
			});

			// If we were able to successfully scrape and save an Article, send a message to the client
			console.log("Scrape Complete");
			return articleObjects;
		});
	}
}
module.exports = scraperObject; 