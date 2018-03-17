# Mongo-Scraper

### A web scraper that stores articles into a mongodb. Articles can also store comments.

## Go To
* Visit : __https://fathomless-everglades-35410.herokuapp.com/__ To see Heroku Deployed app.
* Visit : __https://github.com/psharif/Mongo-Scraper__ to see GitHub Repo

## Notes About Running burger (if running locally skip if going to website)
* Enter npm i or npm install to install the necessary node packages for the app.
* __'express'__ was used for Routing, __'body-parser'__ was used for parsing and sending data through routes
  __'mongoose'__ was used for database actions, and models. __cheerio__ was used for web scraping. 
  __'axios'__ was used to make server side api requests. __'express-handlebars'__ was used for view templating. 
* The Defualt Port written in the app is 3000. Connect using localhost: 3000, or change configuration on server.js. But the deployed app uses Heroku's environment Port on Heroku deployed version.

## Clicking On Save will save

![buger devour gif](/README_GIFS/SavedArticle.gif)

This will save an article (want to make it so it doesn't show in scraped articles page. Will work on fixing.)
Go to __Saved Articles__ To see the articles saved to the database. You can also delete them if you would like. 

## Creating or editin comments. 

![burger create gif](/README_GIFS/comment.gif)

* You can click New Comment To add a new comment for a saved article. 
* Or edit on a made comment to change the comments. 
* Or click delete on a saved comment to delete one of the comments. 
