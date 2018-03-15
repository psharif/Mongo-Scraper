const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../../../models")

const scraperObject = {
	getArticles: function(callback){
	 // First, we grab the body of the html with axios
	 const articleObjects = [];
		axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page")
		.then(function(response) {
			// Then, we load that into cheerio and save it to $ for a shorthand selector
			const $ = cheerio.load(response.data);

			const stuff = $('.latest-panel .story-menu li').map(function(i, el) {
  				//this === el 
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

  				//return $(this).text();
			}).get().join(" ");

			console.log(`This is the stuff being returned ${stuff}`);
			return stuff;

			// $(".latest-panel .story-menu li").each(function(i, element) {
			//   // Save an empty result object
			// 	const url = $(element).find(".story-body").find(".story-link").attr("href").trim();
			// 	const headline = $(element).find(".story-body").find(".headline").text().trim();
			// 	const summary = $(element).find(".story-body").find(".summary").text().trim();

			// 	if(url && headline && summary){
			// 		const article = {url: url, headline: headline, summary: summary };
			// 		articleObjects.push(article);
			// 		//console.log(`These are some of the articleObjects: ${articleObjects}`);
			// 		// Create a new Article using the `result` object built from scraping
			// 		// db.Article.create(article)
			// 		// .then(function(dbArticle) {
			// 		// 	// View the added result in the console
			// 		// 	console.log(`The article that was created was ${dbArticle}`);
			// 		// })
			// 		// .catch(function(err) {
			// 		// 	// If an error occurred, send it to the client
			// 		// 	return res.json(err);
			// 		// });
			// 		const newDiv = $("<div>");
			// 		//newDiv.addClass("shown");
			// 		// newDiv.append("<div class='card'><div class='card-body'><h3>" 
			// 		// 			+ headline + '</h3><p>' 
			// 		// 			+ summary + "</p><br><a href='" + url + "'>" 
			// 		// 			+ url + "</a></div></div>");
			// 		$("#article-area").append(newDiv);
			// 	}
			// });
			//console.log(`These are some of the article Objects ${articleObjects}`);
			// If we were able to successfully scrape and save an Article, send a message to the client
			console.log("Scrape Complete");
		});
		//console.log(articleObjects);
	}
}
module.exports = scraperObject; 