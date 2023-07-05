<?php /** @noinspection ALL */

use OpenApi\Annotations\OpenApi;

/**
 * @OA\Post(
 *     path="/user",
 *     tags={"user"},
 *     summary="Create a new user",
 *     @OA\RequestBody(
 *         description="User data",
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(property="userName", type="string"),
 *                 @OA\Property(property="userEmail", type="string"),
 *                 @OA\Property(property="userPassword", type="string")
 *             )
 *         )
 *     ),
 *     @OA\Response(response=201, description="User added successfully"),
 *     @OA\Response(response=409, description="User already exists"),
 *     @OA\Response(response=500, description="Failed to add user")
 * )
 */
Flight::route("POST /user", function () {
    $data = Flight::request()->data->getData();

    // Check if the user already exists
    $userExists = Flight::user_service()->checkUserByUserNameEmailAndPassword($data["userName"], $data["userEmail"], $data["userPassword"]);

    if ($userExists) {
        Flight::halt(409);
        Flight::json([
            "message" => "User already exists"
        ]);
    } else {
        // Add the user
        $addedUser = $userService->add($data);

        if ($addedUser) {
            Flight::halt(201);
            Flight::json([
                "message" => "User added successfully",
                "data" => $addedUser
            ]);
        } else {
            Flight::halt(500);
            Flight::json([
                "message" => "Failed to add user"
            ]);
        }
    }
});

/**
 * @OA\Put(
 *     path="/user/{id}",
 *     tags={"user"},
 *     summary="Update a user",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         description="Updated user data",
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(property="userName", type="string"),
 *                 @OA\Property(property="userEmail", type="string"),
 *                 @OA\Property(property="userPassword", type="string")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string"),
 *             @OA\Property(property="data", type="object")
 *         )
 *     )
 * )
 */
Flight::route("PUT /user/@id", function ($id) {
    Flight::json([
        "message" => "User updated successfully",
        "data" => Flight::user_service()->update(Flight::request()->data->getData(), $id)
    ]);
});

/**
 * @OA\Get(
 *     path="/users",
 *     tags={"users"},
 *     security={{"ApiKeyAuth": {}}},
 *     summary="Get all users",
 *     @OA\Response(
 *         response=200,
 *         description="List of users",
 *         @OA\JsonContent(
 *             @OA\Property(property="users", type="array", @OA\Items(type="object"))
 *         )
 *     )
 * )
 */
Flight::route("GET /users", function () {
    $users = Flight::user_service()->get_all();
    Flight::json([
        "users" => $users
    ]);
});


Flight::route("GET /users/@id", function ($id) {
    Flight::json([
        "user" => Flight::user_service()->get_by_id($id)
    ]);
});


Flight::route("DELETE /user/@id", function ($id) {
    Flight::user_service()->delete($id);
    Flight::json([
        "message" => "User deleted successfully"
    ]);
});


Flight::route("/update/@first_name/@last_name/@id",
    function ($first_name, $last_name, $id) {
        Flight::user_service()->update($first_name, $last_name, $id);
    }
);


Flight::route("GET /checkUserByEmailAndPassword/@email/@password", function ($email, $password) {
    $authenticated = Flight::user_service()->checkUserByEmailAndPassword($email, $password);
    Flight::json($authenticated);
});


Flight::route("PUT /updateUserAvailability/@userEmail/@userPassword/@isAvailable", function ($userEmail, $userPassword, $isAvailable) {
    $isAvailable = intval($isAvailable);

    $result = Flight::user_service()->updateUserAvailability($userEmail, $userPassword, $isAvailable);

    if ($result !== false) {
        Flight::json(["message" => "User availability updated successfully"]);
    } else {
        Flight::halt(500, "Failed to update user availability");
    }
});


Flight::route("GET /checkUserAvailability/@userEmail/@userPassword", function ($userEmail, $userPassword) {
    $isAvailable = Flight::user_service()->isUserAvailable($userEmail, $userPassword);

    Flight::json(["isAvailable" => $isAvailable]);
});


Flight::route('PUT /saveGameOpponent/@userEmail/@userPassword/@gameOpponent', function ($userEmail, $userPassword, $gameOpponent) {
    $result = Flight::user_service()->saveGameOpponent($userEmail, $userPassword, $gameOpponent);

    if ($result) {
        Flight::json(['message' => 'Game opponent saved successfully']);
    } else {
        Flight::halt(500, 'Failed to save game opponent');
    }
});


Flight::route("PUT /updateUserWillPlay/@userEmail/@userPassword/@isWillPlay", function ($userEmail, $userPassword, $isWillPlay) {
    $result = Flight::user_service()->updateUserWillPlay($userEmail, $userPassword, $isWillPlay);

    if ($result !== false) {
        Flight::json(["message" => "User willPlay updated successfully"]);
    } else {
        Flight::halt(500, "Failed to update user willPlay");
    }
});


Flight::route("GET /checkUserWillPlay/@userEmail/@userPassword", function ($userEmail, $userPassword) {
    $willPlay = Flight::user_service()->isWillPlay($userEmail, $userPassword);

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
    $gameOpponent = Flight::user_service()->getGameOpponentByUsername($username);

    Flight::json(["gameOpponent" => $gameOpponent]);
});


Flight::route("PUT /updateGameOpponent/@userEmail/@gameOpponent", function ($userEmail, $gameOpponent) {
    $success = Flight::user_service()->updateGameOpponent($userEmail, $gameOpponent);

    if ($success) {
        Flight::json(["message" => "Game opponent updated"]);
    } else {
        Flight::json(["error" => "Failed to update game opponent"], 400);
    }
});


Flight::route("GET /getUserNameByEmailAndPassword/@email/@password", function ($email, $password) {
    $userName = Flight::user_service()->getUserNameByEmailAndPassword($email, $password);

    if ($userName) {
        Flight::json(["userName" => $userName]);
    } else {
        Flight::json(["error" => "User not found or invalid credentials"], 404);
    }
});


Flight::route("PUT /updateGameId/@userName/@gameId", function ($userName, $gameId) {
    $success = Flight::user_service()->updateGameId($userName, $gameId);

    if ($success) {
        Flight::json(["message" => "Game ID updated"]);
    } else {
        Flight::json(["error" => "Failed to update game ID"], 400);
    }
});


Flight::route("PUT /updateTasksCompleted/@userName/@tasksCompleted", function ($userName, $tasksCompleted) {
    $success = Flight::user_service()->updateTasksCompleted($userName, $tasksCompleted);

    if ($success) {
        Flight::json(["message" => "Taks completed updated"]);
    } else {
        Flight::json(["error" => "Failed to update taskCompleted"], 400);
    }
});


Flight::route("PUT /updateUserIsRejected/@userName/@isRejected", function ($userName, $isRejected) {
    $success = Flight::user_service()->updateUserIsRejected($userName, $isRejected);

    if ($success) {
        Flight::json(["message" => "User isRejected updated"]);
    } else {
        Flight::json(["error" => "Failed to update user isRejected"], 400);
    }
});


Flight::route("GET /isRejected/@userName", function ($userName) {
    $isRejected = Flight::user_service()->isRejected($userName);

    Flight::json(["isRejected" => $isRejected]);
});


Flight::route("GET /isWaitingToPlay/@userName", function ($userName) {
    $isWaitingToPlay = Flight::user_service()->isWaitingToPlay($userName);

    Flight::json(["isWaitingToPlay" => $isWaitingToPlay]);
});


Flight::route("PUT /resetGameOpponent/@userEmail", function ($userEmail) {
    $success = Flight::user_service()->resetGameOpponent($userEmail);

    if ($success) {
        Flight::json(["message" => "Game opponent reset"]);
    } else {
        Flight::json(["error" => "Failed to reset game opponent"], 400);
    }
});


Flight::route("PUT /resetRecipe/@userEmail", function ($userEmail) {
    $success = Flight::user_service()->resetRecipe($userEmail);

    if ($success) {
        Flight::json(["message" => "Recipe reset"]);
    } else {
        Flight::json(["error" => "Failed to reset recipe"], 400);
    }
});

/**
 * @OA\Get(
 *     path="/checkUsersHaveSameGameId/{userName1}/{userName2}",
 *     tags={"user"},
 *     summary="Check if users have the same game ID",
 *     @OA\Parameter(
 *         name="userName1",
 *         in="path",
 *         required=true,
 *         description="User name 1",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userName2",
 *         in="path",
 *         required=true,
 *         description="User name 2",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Same ID status",
 *         @OA\JsonContent(
 *             @OA\Property(property="Same id", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /checkUsersHaveSameGameId/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same gameId
    $haveSameGameId = Flight::user_service()->checkUsersHaveSameGameId($userName1, $userName2);

    if ($haveSameGameId) {
        Flight::json(["Same id" => $haveSameGameId]);
    } else {
        Flight::json(["Same id" => $haveSameGameId]);
    }
});

/**
 * @OA\Get(
 *     path="/checkUsersHaveSameTaskCompleted/{userName1}/{userName2}",
 *     tags={"user"},
 *     summary="Check if users have the same task completed",
 *     @OA\Parameter(
 *         name="userName1",
 *         in="path",
 *         required=true,
 *         description="User name 1",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userName2",
 *         in="path",
 *         required=true,
 *         description="User name 2",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Same task completed status",
 *         @OA\JsonContent(
 *             @OA\Property(property="Same tasksCompleted", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /checkUsersHaveSameTaskCompleted/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same gameId
    $haveSametasksCompleted = Flight::user_service()->checkUsersHaveSameTaskCompleted($userName1, $userName2);

    if ($haveSametasksCompleted) {
        Flight::json(["Same tasksCompleted" => $haveSametasksCompleted]);
    } else {
        Flight::json(["Same tasksCompleted" => $haveSametasksCompleted]);
    }
});

/**
 * @OA\Put(
 *     path="/updateWaitingToPlay/{userName}/{isWaitingToPlay}",
 *     tags={"user"},
 *     summary="Update user's waiting to play status",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="isWaitingToPlay",
 *         in="path",
 *         required=true,
 *         description="Is waiting to play",
 *         @OA\Schema(type="boolean")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User waiting to play status updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update user waiting to play status",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateWaitingToPlay/@userName/@isWaitingToPlay", function ($userName, $isWaitingToPlay) {
    // Update the isWaitingToPlay column for the user with the given userName
    $success = Flight::user_service()->updateWaitingToPlay($userName, $isWaitingToPlay);

    if ($success) {
        // User isWaitingToPlay column updated successfully
        Flight::json(["message" => "User isWaitingToPlay updated"]);
    } else {
        // Failed to update user isWaitingToPlay column
        Flight::json(["error" => "Failed to update user isWaitingToPlay"], 400);
    }
});

/**
 * @OA\Put(
 *     path="/updateRecipe/{userName}/{recipe}",
 *     tags={"user"},
 *     summary="Update user's recipe",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="recipe",
 *         in="path",
 *         required=true,
 *         description="Recipe",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User recipe updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update user recipe",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateRecipe/@userName/@recipe", function ($userName, $recipe) {
    $success = Flight::user_service()->updateRecipe($userName, $recipe);

    if ($success) {
        Flight::json(["message" => "User recipe updated"]);
    } else {
        Flight::json(["error" => "Failed to update user recipe"], 400);
    }
});

/**
 * @OA\Get(
 *     path="/checkUsersHaveWaitingToPlay/{userName1}/{userName2}",
 *     tags={"user"},
 *     summary="Check if users have waiting to play status",
 *     @OA\Parameter(
 *         name="userName1",
 *         in="path",
 *         required=true,
 *         description="User name 1",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userName2",
 *         in="path",
 *         required=true,
 *         description="User name 2",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Waiting to play status",
 *         @OA\JsonContent(
 *             @OA\Property(property="waitingToPlay", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /checkUsersHaveWaitingToPlay/@userName1/@userName2", function ($userName1, $userName2) {
    // Check if the users with the given usernames have the same waitingToPlay status
    $haveSameWaitingToPlay = Flight::user_service()->checkUsersHaveWaitingToPlay($userName1, $userName2);

    if ($haveSameWaitingToPlay) {
        Flight::json(["haveSameWaitingToPlay" => $haveSameWaitingToPlay]);
    } else {
        Flight::json(["haveSameWaitingToPlay" => $haveSameWaitingToPlay]);
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
