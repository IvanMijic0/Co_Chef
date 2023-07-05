<?php /** @noinspection ALL */

use OpenApi\Annotations as OA;


Flight::route("POST /user", function () {
    $data = Flight::request()->data->getData();

    // Check if the user already exists
    $userExists = Flight::user_service()->checkUserByUserNameEmailAndPassword($data["userName"], $data["userEmail"], $data["userPassword"]);

    if ($userExists) {
        Flight::halt(409); // Set response code to indicate conflict (e.g., 409 Conflict)
        Flight::json([
            "message" => "User already exists"
        ]);
    } else {
        // Add the user
        $addedUser = $userService->add($data);

        if ($addedUser) {
            Flight::halt(201); // Set response code to indicate success (e.g., 201 Created)
            Flight::json([
                "message" => "User added successfully",
                "data" => $addedUser
            ]);
        } else {
            Flight::halt(500); // Set response code to indicate an error occurred (e.g., 500 Internal Server Error)
            Flight::json([
                "message" => "Failed to add user"
            ]);
        }
    }
});

Flight::route("PUT /user/@id", function ($id) {
    Flight::json
    (
        [
            "message" => "User updated successfully",
            "data" => Flight::user_service()->update(Flight::request()->data->getData(), $id)
        ]
    );
});

/**
 * @OA\Get(path="/users", tags={"users"}, security={{"ApiKeyAuth": {}}},
 *     summary ="Return all users from the API. ",
 *     @OA\Response( response=200, description="List of users.")
 * )
 */

Flight::route("GET /users", function () {
    $users = Flight::user_service()->get_all();
    Flight::json([
        "users" => $users
    ]);
});

Flight::route("GET /user_by_id", function () {
    Flight::json
    (
        Flight::user_service()->get_by_id(Flight::request()->query["id"])
    );
});

Flight::route("GET /users/@id", function ($id) {
    Flight::json
    (
        Flight::user_service()->get_by_id($id)
    );
});

Flight::route("DELETE /user/@id", function ($id) {
    Flight::user_service()->delete($id);
    Flight::json
    (
        ["message" => "User deleted successfully"]
    );
});

Flight::route("/update/@first_name/@last_name/@id",
    function ($first_name, $last_name, $id) {
        Flight::user_service()->update($first_name, $last_name, $id);
    });

Flight::route("GET /checkUserByEmailAndPassword/@email/@password",
    function ($email, $password) {
        $authenticated = Flight::user_service()->checkUserByEmailAndPassword($email, $password);
        Flight::json($authenticated);
    }
);

Flight::route("PUT /updateUserAvailability/@userEmail/@userPassword/@isAvailable", function ($userEmail, $userPassword, $isAvailable) {
    $isAvailable = intval($isAvailable);

    // Update user availability
    $result = Flight::user_service()->updateUserAvailability($userEmail, $userPassword, $isAvailable);

    if ($result !== false) {

        Flight::json(["message" => "User availability updated successfully"]);
    } else {
        Flight::halt(500, "Failed to update user availability");
    }
});


Flight::route("GET /checkUserAvailability/@userEmail/@userPassword", function ($userEmail, $userPassword) {
    // Check user availability
    $isAvailable = Flight::user_service()->isUserAvailable($userEmail, $userPassword);

    // Return the availability status
    Flight::json(["isAvailable" => $isAvailable]);
});

Flight::route('PUT /saveGameOpponent/@userEmail/@userPassword/@gameOpponent',
    function ($userEmail, $userPassword, $gameOpponent) {
        // Save the game opponent for the user
        $result = Flight::user_service()->saveGameOpponent($userEmail, $userPassword, $gameOpponent);

        if ($result) {
            // Return success response
            Flight::json(['message' => 'Game opponent saved successfully']);
        } else {
            // Return error response if failed to save game opponent
            Flight::halt(500, 'Failed to save game opponent');
        }
    });

Flight::route("PUT /updateUserWillPlay/@userEmail/@userPassword/@isAvailable", function ($userEmail, $userPassword, $isWillPlay) {
    // Update user availability
    $result = Flight::user_service()->updateUserWillPlay($userEmail, $userPassword, $isWillPlay);

    if ($result !== false) {
        Flight::json(["message" => "User willPlay updated successfully"]);
    } else {
        Flight::halt(500, "Failed to update user willPlay");
    }
});

Flight::route("GET /checkUserWillPlay/@userEmail/@userPassword", function ($userEmail, $userPassword) {
    // Check user availability
    $willPlay = Flight::user_service()->isWillPlay($userEmail, $userPassword);

    // Return the availability status
    Flight::json(["willPlay" => $willPlay]);
});

Flight::route("GET /getGameIdByUsername/@userName", function ($userName) {
    $gameId = Flight::user_service()->getGameIdByUsername($userName);

    if ($gameId) {
        Flight::json(["gameId" => $gameId]);
    } else {
        Flight::json(["error" => "gameId not found"], 404);
    }
});

Flight::route("GET /getUserByGameOpponent/@gameOpponent", function ($gameOpponent) {
    $userName = Flight::user_service()->getUserNameByGameOpponent($gameOpponent);

    if ($userName) {
        Flight::json(["userName" => $userName]);
    } else {
        Flight::json(["error" => "User not found"], 404);
    }
});

Flight::route("GET /getRecipeByUserName/@userName", function ($userName) {
    $recipe = Flight::user_service()->getRecipeByUserName($userName);

    if ($recipe) {
        Flight::json(["recipe" => $recipe]);
    } else {
        Flight::json(["error" => "Recipe not found"], 404);
    }
});

Flight::route("GET /getGameOpponentByUser/@username", function ($username) {
    // Get the game opponent for the given username
    $gameOpponent = Flight::user_service()->getGameOpponentByUsername($username);

    // Return the game opponent
    Flight::json(["gameOpponent" => $gameOpponent]);
});

Flight::route("PUT /updateGameOpponent/@userEmail/@gameOpponent", function ($userEmail, $gameOpponent) {
    // Update the game opponent for the user with the given username
    $success = Flight::user_service()->updateGameOpponent($userEmail, $gameOpponent);

    if ($success) {
        // Game opponent updated successfully
        Flight::json(["message" => "Game opponent updated"]);
    } else {
        // Failed to update game opponent
        Flight::json(["error" => "Failed to update game opponent"], 400);
    }
});


Flight::route("GET /getUserNameByEmailAndPassword/@email/@password", function ($email, $password) {
    // Get the userName for the given email and password
    $userName = Flight::user_service()->getUserNameByEmailAndPassword($email, $password);

    if ($userName) {
        // User found, return the userName
        Flight::json(["userName" => $userName]);
    } else {
        // User not found or invalid credentials
        Flight::json(["error" => "User not found or invalid credentials"], 404);
    }
});

Flight::route("PUT /updateGameId/@userName/@gameId", function ($userName, $gameId) {
    // Update the gameId for the user with the given email
    $success = Flight::user_service()->updateGameId($userName, $gameId);

    if ($success) {
        // Game ID updated successfully
        Flight::json(["message" => "Game ID updated"]);
    } else {
        // Failed to update game ID
        Flight::json(["error" => "Failed to update game ID"], 400);
    }
});

Flight::route("PUT /updateTasksCompleted/@userName/@tasksCompleted", function ($userName, $tasksCompleted) {
    // Update the gameId for the user with the given email
    $success = Flight::user_service()->updateTasksCompleted($userName, $tasksCompleted);

    if ($success) {
        // Game ID updated successfully
        Flight::json(["message" => "Taks completed updated"]);
    } else {
        // Failed to update game ID
        Flight::json(["error" => "Failed to update taskCompleted"], 400);
    }
});

Flight::route("PUT /updateUserIsRejected/@userName/@isRejected", function ($userName, $isRejected) {
    // Update the isRejected column for the user with the given email and password
    $success = Flight::user_service()->updateUserIsRejected($userName, $isRejected);

    if ($success) {
        // User isRejected column updated successfully
        Flight::json(["message" => "User isRejected updated"]);
    } else {
        // Failed to update user isRejected column
        Flight::json(["error" => "Failed to update user isRejected"], 400);
    }
});

Flight::route("GET /isRejected/@userName", function ($userName) {
    // Check if the user is rejected
    $isRejected = Flight::user_service()->isRejected($userName);

    // Return the result
    Flight::json(["isRejected" => $isRejected]);
});

Flight::route("GET /isWaitingToPlay/@userName", function ($userName) {
    // Check if the user is rejected
    $isWaitingToPlay = Flight::user_service()->isWaitingToPlay($userName);

    // Return the result
    Flight::json(["isWaitingToPlay" => $isWaitingToPlay]);
});

Flight::route("PUT /resetGameOpponent/@userEmail", function ($userEmail) {
    // Reset the game opponent for the user with the given email and password
    $success = Flight::user_service()->resetGameOpponent($userEmail);

    if ($success) {
        // Game opponent reset successfully
        Flight::json(["message" => "Game opponent reset"]);
    } else {
        // Failed to reset game opponent
        Flight::json(["error" => "Failed to reset game opponent"], 400);
    }
});

Flight::route("PUT /resetRecipe/@userEmail", function ($userEmail) {
    // Reset the game opponent for the user with the given email and password
    $success = Flight::user_service()->resetRecipe($userEmail);

    if ($success) {
        // Game opponent reset successfully
        Flight::json(["message" => "Recipe reset"]);
    } else {
        // Failed to reset game opponent
        Flight::json(["error" => "Failed to reset recipe"], 400);
    }
});

Flight::route("GET /checkUsersHaveSameGameId/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same gameId
    $haveSameGameId = Flight::user_service()->checkUsersHaveSameGameId($userName1, $userName2);

    if ($haveSameGameId) {
        Flight::json(["Same id" => $haveSameGameId]);
    } else {
        Flight::json(["Same id" => $haveSameGameId]);
    }
});

Flight::route("GET /checkUsersHaveSameTaskCompleted/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same gameId
    $haveSametasksCompleted = Flight::user_service()->checkUsersHaveSameTaskCompleted($userName1, $userName2);

    if ($haveSametasksCompleted) {
        Flight::json(["Same tasksCompleted" => $haveSametasksCompleted]);
    } else {
        Flight::json(["Same tasksCompleted" => $haveSametasksCompleted]);
    }
});

Flight::route("PUT /updateWaitingToPlay/@userName/@isRejected", function ($userName, $isWaitingToPlay) {
    // Update the isRejected column for the user with the given email and password
    $success = Flight::user_service()->updateWaitingToPlay($userName, $isWaitingToPlay);

    if ($success) {
        // User isRejected column updated successfully
        Flight::json(["message" => "User isWaitingToPlay updated"]);
    } else {
        // Failed to update user isRejected column
        Flight::json(["error" => "Failed to update user isWaitingToPlay"], 400);
    }
});

Flight::route("PUT /updateRecipe/@userName/@recipe", function ($userName, $recipe) {
    // Update the isRejected column for the user with the given email and password
    $success = Flight::user_service()->updateRecipe($userName, $recipe);

    if ($success) {
        // User isRejected column updated successfully
        Flight::json(["message" => "User recipe updated"]);
    } else {
        // Failed to update user isRejected column
        Flight::json(["error" => "Failed to update user recipe"], 400);
    }
});

Flight::route("GET /checkUsersHaveWaitingToPlay/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same gameId
    $haveSameGameId = Flight::user_service()->checkUsersHaveWaitingToPlay($userName1, $userName2);

    if ($haveSameGameId) {
        Flight::json(["waitingToPlay" => $haveSameGameId]);
    } else {
        Flight::json(["waitingToPlay" => $haveSameGameId]);
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
