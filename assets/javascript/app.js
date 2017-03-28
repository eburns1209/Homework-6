//runs upon page loacding
$(function (){
	populateButtons(searchArray, "#buttonsArea");
})

var searchArray = ["Dog", "Cat", "Bird"];
function populateButtons(){
	$("#buttonsArea").empty();
	for(var i = 0; i < searchArray.length; i++){
		var a = $('<button>');
		a.addClass("animal");
		a.attr('data-type', searchArray[i]);
		a.text(searchArray[i]);
		$("#buttonsArea").append(a);
	}
}

// This function handles events where the add movie button is clicked
      $("#add-animal").on("click", function(event) {
        
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#search-input").val().trim();

        // The movie from the textbox is then added to our array
        searchArray.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        populateButtons();
      });



$(".animal").on("click", function(){
	var type = $(this).data('type');
	var queryURL = "http://api.giphy.com/v1/stickers/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url:  queryURL, 
		method:"GET"})

	.done(function(response){
		console.log(response);

		for(var i =0; i<response.data.length;i++){
			var searchDiv = $('<div class="search-item">');

			var rating = response.data[i].rating;
			var p = $('<p>').text("Rating: " + rating);

			var img = response.data[i].images.url;

			var animated=response.data[i].images.fixed_height_small_url;
			var still = response.data[i].images.fixed_height_small_still_url;

			var img = $('<img>').text("Image: " );

			img.attr('src', still);
			img.attr('data-still', still);
			img.attr('data-animated', animated);
			img.attr('data-state', 'still');
			img.addClass('searchImage');
			searchDiv.append(p);
			searchDiv.append(img);
			$('#searches').append(searchDiv);
		}
	})
})

$(document).on("click",'.searchImage', function(){
	var state = $(this).attr('data-state');
		if (state === 'still'){
			$(this).attr('src', $(this).data('animated'));
			$(this).attr('data-state', 'animated');
		}else{
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
})

$('#addSearch').on("click", function(){
	var newSearch = $('input').eq(0).val();
	searchArray.push(newSearch);
	populateButtons(searchArray, "searchButton", "#buttonArea");
	return false;//prevents submit button from reload
})