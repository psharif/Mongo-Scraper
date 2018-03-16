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


