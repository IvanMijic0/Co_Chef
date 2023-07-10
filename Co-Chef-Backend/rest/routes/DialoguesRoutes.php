<?php /** @noinspection ALL */

/** @noinspection ALL */

Flight::route("GET /getDefaultTextByActor/@actor", function ($actor) {
    $data = Flight::dialogue_routes()->getDefaultTextByActor($actor);

    if ($data) {
        Flight::json([
            "message" => "Default dialogues gotten succesfuly",
            "data" => $data
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get default dialogues"
        ]);
    }
});

Flight::route("GET /getSelectedTextByActor/@actor", function ($actor) {
    $data = Flight::dialogue_routes()->getSelectedTextByActor($actor);

    if ($data) {
        Flight::json([
            "message" => "Selected dialogues gotten succesfuly",
            "data" => $data
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get selected dialogues"
        ]);
    }
});
