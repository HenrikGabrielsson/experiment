var changeGalleryView = function(e)
{
	if($(e.srcElement).hasClass("grid-view-image") === gridViewActive)
	{
		return;
	}

	gridViewActive = $(e.srcElement).hasClass("grid-view-image");

	if(gridViewActive)
	{
		$(".grid-view-image").addClass("selected-view");
		$(".full-view-image").removeClass("selected-view");

		$("#gallery").append($(".gallery-image"));
		$(".gallery-row").remove();

		var row = document.createElement("div");
		row.setAttribute("class", "row gallery-row");

		$(".gallery-image").each(function(i, element)
		{
			//create new row every 3rd image.
			if(i % 3 === 0)
			{
				row = document.createElement("div");
				row.setAttribute("class", "row gallery-row");
			}

			$("#gallery").append($(row));
			$(row).append(this);
			$(this).removeClass("col-md-12");
			$(this).addClass("col-md-4");
		});

	}
	//full width images
	else
	{
		$(".full-view-image").addClass("selected-view");
		$(".grid-view-image").removeClass("selected-view");

		$("#gallery").append($(".gallery-image"));
		$(".gallery-row").remove();

		$(".gallery-image").each(function(i, element)
		{
			var row = document.createElement("div");
			row.setAttribute("class", "row gallery-row");

			$("#gallery").append($(row));
			$(row).append(this);
			$(this).removeClass("col-md-4");
			$(this).addClass("col-md-12");
		});


	}
}
var gridViewActive = true;

var gridViewLink = document.getElementsByClassName("grid-view-link")[0];
var fullViewLink = document.getElementsByClassName("full-view-link")[0];

gridViewLink.addEventListener("click", changeGalleryView);
fullViewLink.addEventListener("click", changeGalleryView);

window.addEventListener("load", function(){console.log(Date.now());}, false);