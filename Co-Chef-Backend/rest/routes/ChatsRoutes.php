<?php /** @noinspection ALL */

Flight::route("POST /initializeChats", function () {
    $data = Flight::request()->data->getData();

    // Add the user
    $addedChats = Flight::chat_service()->add($data);

    if ($addedChats) {
        Flight::json([
            "message" => "Chats added successfully",
            "data" => $addedChats
        ]);
    } else {
        Flight::json([
            "message" => "Failed to add chats"
        ]);
    }
});

Flight::route("PUT /updateChatTextByUserName/@userName/@chatText", function ($userName, $chatText) {
    // Update the gameId for the user with the given email
    $success = Flight::chat_service()->updateChatTextByUserName($userName, $chatText);

    if ($success) {
        // Game ID updated successfully
        Flight::json(["message" => "Chat text updated"]);
    } else {
        // Failed to update game ID
        Flight::json(["error" => "Failed to update chat text"], 400);
    }
});

Flight::route("GET /checkUsersHaveSameChatGameId/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same gameId
    $haveSameGameId = Flight::chat_service()->checkUsersHaveSameChatGameId($userName1, $userName2);

    if ($haveSameGameId) {
        Flight::json(["Same id" => $haveSameGameId]);
    } else {
        Flight::json(["Same id" => $haveSameGameId]);
    }
});

Flight::route("DELETE /deleteUsersWithSameNonZeroGameId/@userName", function ($userName) {
    // Delete the users with the same non-zero gameId
    $success = Flight::chat_service()->deleteUsersWithSameGameId($userName);

    if ($success) {
        // Users deleted successfully
        Flight::json(["message" => "Users chat deleted successfully"]);
    } else {
        // Failed to delete users
        Flight::json(["error" => "Failed to delete users chat"], 500);
    }
});

Flight::route("GET /getChatTextByUsername/@userName", function ($userName) {
    $chatText = Flight::chat_service()->getChatTextByUsername($userName);

    if ($chatText) {
        Flight::json(["chatText" => $chatText]);
    } else if ($chatText === "") {
        Flight::json(["chatText" => ""]);
    } else {
        Flight::json(["error" => "chatText not found"], 404);
    }
});

Flight::before("json", function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
});

Flight::before('error', function () {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
});