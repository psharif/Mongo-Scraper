$(document).on("click", ".article-save", function(event){
	event.preventDefault();

	$.ajax({
		method: "POST",
		url: "/articles",
		data: {
		  url: $(this).data("url").trim(),
		  headline: $(this).data("headline").trim(),
		  summary: $(this).data("summary").trim()
		}
	})
    .then(function(data) {
      console.log(data);
    });
});


$(document).on("click", ".delete-article", function(event){
	event.preventDefault();
	const articleId = $(this).data("id");

	$.ajax({
		method: "DELETE",
		url: "/articles/" + articleId
	})
    .then(function(data) {
      console.log(data);
      location.reload();
    });
});