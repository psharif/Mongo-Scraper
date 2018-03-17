$(document).on("click", ".make-comment", function(event){
	event.preventDefault();
	const articleId = $(this).data("id");

	$("#save-new-comment").attr("data-id", articleId);
});

$("#save-new-comment").on("click", function(event){
	event.preventDefault();
	const articleId = $(this).data("id");

	$.ajax({
		method: "POST",
		url: "/articles/" + articleId,
		data: {
		  title: $('#new-comment-title-input').val().trim(),  
		  body: $('#new-comment-body-input').val().trim()
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


$(document).on("click", ".edit-comment", function(event){
	event.preventDefault();
	const commentId = $(this).data("id");
	const commentTitle=  $(this).data("title");
	const commentBody=  $(this).data("body");

	$("#edit-comment").attr("data-id", commentId);
	$("#current-comment-title-input").val(commentTitle);
	$("#current-comment-body-input").val(commentBody);
	$("#currentCommentModalLabel").text("Comment Titled: " + commentTitle);
});


$("#edit-comment").on("click", function(event){
	event.preventDefault();
	const commentId = $(this).data("id");

	$.ajax({
		method: "PUT",
		url: "/comments/" + commentId,
		data: {
		  title: $('#current-comment-title-input').val().trim(),  
		  body: $('#current-comment-body-input').val().trim()
		}
	})
    .then(function(data) {
      console.log(data);
      location.reload();
    });
});
