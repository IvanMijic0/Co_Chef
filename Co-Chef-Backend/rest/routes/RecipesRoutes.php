<?php /** @noinspection ALL */

Flight::route("GET /recipes", function () {
    $data = Flight::recipe_routes()->get_all();

    if ($data) {
        Flight::json([
            "message" => "Recipes gotten succesfuly",
            "data" => $data
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get recipes"
        ]);
    }
});

Flight::route("GET /recipeByName", function ($name) {
    $recipe = Flight::recipe_routes()->getRecipeByName($name);

    if ($recipe) {
        Flight::json([
            "message" => "Recipe gotten succesfuly",
            "data" => $recipe
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get recipe"
        ]);
    }
});
