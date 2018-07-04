var table = ["cat", "dog", "bird"];

function createButtons() {

    $("#buttons-display").empty();

    for (var i = 0; i < table.length; i++) {

    var newButton =$("<button type='button' class='btn btn-primary'>");

    newButton.addClass("animal");
    newButton.attr("data-name", table[i]);
    newButton.text(table[i]);

    $("#buttons-display").append(newButton);
    }

    $("button").on("click", function() {
        var animalChoice = $(this).attr("data-name");
        console.log(animalChoice);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalChoice + "&api_key=584xMYcaEHJBCHMTKeLyxJ3iLrJHzmWF&limit=10&rating=g"
    
        $.ajax({
            url:queryURL,
            method: "GET"
        })
    
        .then(function(response) {
            var results = response.data;
            console.log(results);

            $("#animal-display").empty();

            for (var j = 0; j < results.length; j++) {

                var gifDiv = $("<div class='animalGif'>");
                var rating = results[j].rating;

                var ratingDisplay = $("<p>").text("rating: " + rating);

                var animalImage = $("<img>");
                animalImage.attr("src", results[j].images.fixed_height_still.url);
                animalImage.attr("data-still", results[j].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[j].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif")

                gifDiv.append(ratingDisplay);
                gifDiv.append(animalImage);

                $("#animal-display").prepend(gifDiv);

            }

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                
                })

        
        })
    })
}

$("#add-animal").on("click", function(event) {
event.preventDefault();
var animal = $("#animal-input").val().trim();
table.push(animal);

createButtons();

})

createButtons();
