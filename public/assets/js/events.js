$(document).on("click", ".article-save", function(event){
	event.preventDefault();
	const url = $(this).data("url");
	const headline = $(this).data("headline");
	const summary = $(this).data("summary");

	$.ajax({
		method: "POST",
		url: "/articles",
		data: {
		  url: $(this).data("url"),
		  headline: $(this).data("headline").trim(),
		  summary: $(this).data("summary")
		}
	})
    .then(function(data) {
      console.log(data);
    });
});


// $(document).on("click", ".delete-article", function(event){
// 	event.preventDefault();
// 	const url = $(this).data("url");
// 	const headline = $(this).data("headline");
// 	const summary = $(this).data("summary");

// 	$.ajax({
// 		method: "POST",
// 		url: "/articles",
// 		data: {
// 		  url: $(this).data("url"),
// 		  headline: $(this).data("headline").trim(),
// 		  summary: $(this).data("summary")
// 		}
// 	})
//     .then(function(data) {
//       console.log(data);
//     });
// });


$(document).on("click", ".make-note", function(event){
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
	const commentTitle = $('#comment-title-input').val().trim();
	const commentBody = $('#comment-message-input').val().trim();

	$.ajax({
		method: "POST",
		url: "/articles/" + articleId,
		data: {
		  title: commentTitle,  
		  body: commentBody
		}
	})
    .then(function(data) {
      console.log(data);
      // $('#comment-title-input').val("");
      // $('#comment-message-input').val("")
      location.reload();
    });
});
