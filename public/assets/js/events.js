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


$(document).on("click", ".make-comment", function(event){
	event.preventDefault();
	const articleId = $(this).data("id");

	$.ajax({
		method: "GET",
		url: "/articles/" + articleId
	})
    .then(function(data) {
      console.log(data);
    });

	$("#save-comment").attr("data-id", articleId);
});

$("#save-comment").on("click", function(event){
	event.preventDefault();
	const articleId = $(this).data("id");

	$.ajax({
		method: "POST",
		url: "/articles/" + articleId,
		data: {
		  title: $('#comment-title-input').val().trim(),  
		  body: $('#comment-message-input').val().trim()
		}
	})
    .then(function(data) {
      console.log(data);
      location.reload();
    });
});


$(document).on("click", ".delete-comment", function(event){
	event.preventDefault();
	const commentId = $(this).data("id");

	$.ajax({
		method: "DELETE",
		url: "/comments/" + commentId
	})
    .then(function(data) {
      console.log(data);
      location.reload();
    });
});

