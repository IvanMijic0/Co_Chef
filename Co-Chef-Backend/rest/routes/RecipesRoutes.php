<?php /** @noinspection ALL */

Flight::route("GET /recipes", function () {
    Flight::json(Flight::recipe_routes()->get_all());
});

