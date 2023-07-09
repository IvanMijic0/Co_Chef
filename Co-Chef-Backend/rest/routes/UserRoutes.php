<?php /** @noinspection ALL */

use OpenApi\Annotations\OpenApi;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// TODO Finish this

/**
 * @OA\Post(
 *     path="/login",
 *     description="Login",
 *     tags={"login"},
 *     @OA\RequestBody(description="Login", required=true,
 *       @OA\MediaType(mediaType="application/json",
 *    			@OA\Schema(
 *             @OA\Property(property="email", type="string", example="demo@gmail.com",    description="Student email" ),
 *             @OA\Property(property="password", type="string", example="12345",    description="Password" ),
 *        )
 *     )),
 *     @OA\Response(
 *         response=200,
 *         description="Logged in successfuly"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error"
 *     )
 * )
 */
//Flight::route('POST /login', function () {
//    $login = Flight::request()->data->getData();
//    $user = Flight::userService()->get_user_by_email($login['email']);
//    if (count($user) > 0) {
//        $user = $user[0];
//    }
//    if (isset($user['id'])) {
//        if ($user['password'] == md5($login['password'])) {
//            unset($user['password']);
//            $user['is_admin'] = false;
//            $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');
//            Flight::json(['token' => $jwt]);
//        } else {
//            Flight::json(["message" => "Wrong password"], 404);
//        }
//    } else {
//        Flight::json(["message" => "User doesn't exist"], 404);
//    }
//});

// ---------------------------------------------------------------------------------------------------------------------

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

    $data["userPassword"] = password_hash($data["userPassword"], PASSWORD_DEFAULT);

    // Check if the user already exists
    $userExists = Flight::user_service()->checkUserByUserNameEmailAndPassword($data["userName"], $data["userEmail"], $data["userPassword"]);

    if ($userExists) {
        Flight::halt(409);
        Flight::json([
            "message" => "User already exists"
        ]);
    } else {
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

/**
 * @OA\Get(
 *     path="/users/{id}",
 *     tags={"users"},
 *     summary="Get user by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User found",
 *         @OA\JsonContent(
 *             @OA\Property(property="user", type="object")
 *         )
 *     )
 * )
 */
Flight::route("GET /users/@id", function ($id) {
    Flight::json([
        "user" => Flight::user_service()->get_by_id($id)
    ]);
});

/**
 * @OA\Delete(
 *     path="/user/{id}",
 *     tags={"user"},
 *     summary="Delete user",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="User deleted successfully")
 * )
 */
Flight::route("DELETE /user/@id", function ($id) {
    Flight::user_service()->delete($id);
    Flight::json([
        "message" => "User deleted successfully"
    ]);
});

/**
 * @OA\Route(
 *     path="/update/{first_name}/{last_name}/{id}",
 *     method="PUT",
 *     tags={"user"},
 *     summary="Update user",
 *     @OA\Parameter(
 *         name="first_name",
 *         in="path",
 *         required=true,
 *         description="First name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="last_name",
 *         in="path",
 *         required=true,
 *         description="Last name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer")
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
Flight::route("/update/@first_name/@last_name/@id",
    function ($first_name, $last_name, $id) {
        Flight::user_service()->update($first_name, $last_name, $id);
    }
);

/**
 * @OA\Get(
 *     path="/checkUserByEmailAndPassword/{email}/{password}",
 *     tags={"user"},
 *     summary="Check user by email and password",
 *     @OA\Parameter(
 *         name="email",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="password",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User authenticated",
 *         @OA\JsonContent(type="boolean")
 *     )
 * )
 */
Flight::route("GET /checkUserByEmailAndPassword/@email/@password", function ($email, $password) {
    $authenticated = Flight::user_service()->checkUserByEmailAndPassword($email, $password);
    Flight::json($authenticated);
});

/**
 * @OA\Put(
 *     path="/updateUserAvailability/{userEmail}/{userPassword}/{isAvailable}",
 *     tags={"user"},
 *     summary="Update user availability",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userPassword",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="isAvailable",
 *         in="path",
 *         required=true,
 *         description="User availability (0 or 1)",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User availability updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateUserAvailability/@userEmail/@userPassword/@isAvailable", function ($userEmail, $userPassword, $isAvailable) {
    $isAvailable = intval($isAvailable);

    $result = Flight::user_service()->updateUserAvailability($userEmail, $userPassword, $isAvailable);

    if ($result !== false) {
        Flight::json(["message" => "User availability updated successfully"]);
    } else {
        Flight::halt(500, "Failed to update user availability");
    }
});

/**
 * @OA\Get(
 *     path="/checkUserAvailability/{userEmail}/{userPassword}",
 *     tags={"user"},
 *     summary="Check user availability",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userPassword",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User availability status",
 *         @OA\JsonContent(
 *             @OA\Property(property="isAvailable", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /checkUserAvailability/@userEmail/@userPassword", function ($userEmail, $userPassword) {
    $isAvailable = Flight::user_service()->isUserAvailable($userEmail, $userPassword);

    Flight::json(["isAvailable" => $isAvailable]);
});

/**
 * @OA\Put(
 *     path="/saveGameOpponent/{userEmail}/{userPassword}/{gameOpponent}",
 *     tags={"user"},
 *     summary="Save game opponent for user",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userPassword",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="gameOpponent",
 *         in="path",
 *         required=true,
 *         description="Game opponent",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Game opponent saved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     )
 * )
 */
Flight::route('PUT /saveGameOpponent/@userEmail/@userPassword/@gameOpponent', function ($userEmail, $userPassword, $gameOpponent) {
    $result = Flight::user_service()->saveGameOpponent($userEmail, $userPassword, $gameOpponent);

    if ($result) {
        Flight::json(['message' => 'Game opponent saved successfully']);
    } else {
        Flight::halt(500, 'Failed to save game opponent');
    }
});

/**
 * @OA\Put(
 *     path="/updateUserWillPlay/{userEmail}/{userPassword}/{isWillPlay}",
 *     tags={"user"},
 *     summary="Update user willPlay status",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userPassword",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="isWillPlay",
 *         in="path",
 *         required=true,
 *         description="User willPlay status (0 or 1)",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User willPlay updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateUserWillPlay/@userEmail/@userPassword/@isWillPlay", function ($userEmail, $userPassword, $isWillPlay) {
    $result = Flight::user_service()->updateUserWillPlay($userEmail, $userPassword, $isWillPlay);

    if ($result !== false) {
        Flight::json(["message" => "User willPlay updated successfully"]);
    } else {
        Flight::halt(500, "Failed to update user willPlay");
    }
});

/**
 * @OA\Get(
 *     path="/checkUserWillPlay/{userEmail}/{userPassword}",
 *     tags={"user"},
 *     summary="Check user's willPlay status",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="userPassword",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the user's willPlay status",
 *         @OA\JsonContent(
 *             @OA\Property(property="willPlay", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /checkUserWillPlay/@userEmail/@userPassword", function ($userEmail, $userPassword) {
    $willPlay = Flight::user_service()->isWillPlay($userEmail, $userPassword);

    Flight::json(["willPlay" => $willPlay]);
});

/**
 * @OA\Get(
 *     path="/getGameIdByUsername/{userName}",
 *     tags={"user"},
 *     summary="Get game ID by username",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="Username",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the game ID",
 *         @OA\JsonContent(
 *             @OA\Property(property="gameId", type="integer")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Game ID not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("GET /getGameIdByUsername/@userName", function ($userName) {
    $gameId = Flight::user_service()->getGameIdByUsername($userName);

    if ($gameId) {
        Flight::json(["gameId" => $gameId]);
    } else {
        Flight::json(["error" => "gameId not found"], 404);
    }
});

/**
 * @OA\Get(
 *     path="/getUserByGameOpponent/{gameOpponent}",
 *     tags={"user"},
 *     summary="Get user by game opponent",
 *     @OA\Parameter(
 *         name="gameOpponent",
 *         in="path",
 *         required=true,
 *         description="Game opponent",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the user name",
 *         @OA\JsonContent(
 *             @OA\Property(property="userName", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="User not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("GET /getUserByGameOpponent/@gameOpponent", function ($gameOpponent) {
    $userName = Flight::user_service()->getUserNameByGameOpponent($gameOpponent);

    if ($userName) {
        Flight::json(["userName" => $userName]);
    } else {
        Flight::json(["error" => "User not found"], 404);
    }
});

/**
 * @OA\Get(
 *     path="/getRecipeByUserName/{userName}",
 *     tags={"user"},
 *     summary="Get recipe by user name",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the user's recipe",
 *         @OA\JsonContent(
 *             @OA\Property(property="recipe", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Recipe not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("GET /getRecipeByUserName/@userName", function ($userName) {
    $recipe = Flight::user_service()->getRecipeByUserName($userName);

    if ($recipe) {
        Flight::json(["recipe" => $recipe]);
    } else {
        Flight::json(["error" => "Recipe not found"], 404);
    }
});

/**
 * @OA\Get(
 *     path="/getGameOpponentByUser/{username}",
 *     tags={"user"},
 *     summary="Get game opponent by username",
 *     @OA\Parameter(
 *         name="username",
 *         in="path",
 *         required=true,
 *         description="Username",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the game opponent",
 *         @OA\JsonContent(
 *             @OA\Property(property="gameOpponent", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="User not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("GET /getGameOpponentByUser/@username", function ($username) {
    $gameOpponent = Flight::user_service()->getGameOpponentByUsername($username);

    Flight::json(["gameOpponent" => $gameOpponent]);
});

/**
 * @OA\Put(
 *     path="/updateGameOpponent/{userEmail}/{gameOpponent}",
 *     tags={"user"},
 *     summary="Update game opponent",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="gameOpponent",
 *         in="path",
 *         required=true,
 *         description="Game opponent",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Game opponent updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update game opponent",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateGameOpponent/@userEmail/@gameOpponent", function ($userEmail, $gameOpponent) {
    $success = Flight::user_service()->updateGameOpponent($userEmail, $gameOpponent);

    if ($success) {
        Flight::json(["message" => "Game opponent updated"]);
    } else {
        Flight::json(["error" => "Failed to update game opponent"], 400);
    }
});

/**
 * @OA\Get(
 *     path="/getUserNameByEmailAndPassword/{email}/{password}",
 *     tags={"user"},
 *     summary="Get user name by email and password",
 *     @OA\Parameter(
 *         name="email",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="password",
 *         in="path",
 *         required=true,
 *         description="User password",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the user name",
 *         @OA\JsonContent(
 *             @OA\Property(property="userName", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="User not found or invalid credentials",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("GET /getUserNameByEmailAndPassword/@email/@password", function ($email, $password) {
    $userName = Flight::user_service()->getUserNameByEmailAndPassword($email, $password);

    if ($userName) {
        Flight::json(["userName" => $userName]);
    } else {
        Flight::json(["error" => "User not found or invalid credentials"], 404);
    }
});

/**
 * @OA\Put(
 *     path="/updateGameId/{userName}/{gameId}",
 *     tags={"user"},
 *     summary="Update game ID",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="gameId",
 *         in="path",
 *         required=true,
 *         description="Game ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Game ID updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update game ID",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateGameId/@userName/@gameId", function ($userName, $gameId) {
    $success = Flight::user_service()->updateGameId($userName, $gameId);

    if ($success) {
        Flight::json(["message" => "Game ID updated"]);
    } else {
        Flight::json(["error" => "Failed to update game ID"], 400);
    }
});

/**
 * @OA\Put(
 *     path="/updateTasksCompleted/{userName}/{tasksCompleted}",
 *     tags={"user"},
 *     summary="Update tasks completed",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="tasksCompleted",
 *         in="path",
 *         required=true,
 *         description="Tasks completed",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Tasks completed updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update tasks completed",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateTasksCompleted/@userName/@tasksCompleted", function ($userName, $tasksCompleted) {
    $success = Flight::user_service()->updateTasksCompleted($userName, $tasksCompleted);

    if ($success) {
        Flight::json(["message" => "Taks completed updated"]);
    } else {
        Flight::json(["error" => "Failed to update taskCompleted"], 400);
    }
});

/**
 * @OA\Put(
 *     path="/updateUserIsRejected/{userName}/{isRejected}",
 *     tags={"user"},
 *     summary="Update user isRejected",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="isRejected",
 *         in="path",
 *         required=true,
 *         description="Is rejected flag (0 or 1)",
 *         @OA\Schema(type="integer", enum={0, 1})
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User isRejected updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update user isRejected",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateUserIsRejected/@userName/@isRejected", function ($userName, $isRejected) {
    $success = Flight::user_service()->updateUserIsRejected($userName, $isRejected);

    if ($success) {
        Flight::json(["message" => "User isRejected updated"]);
    } else {
        Flight::json(["error" => "Failed to update user isRejected"], 400);
    }
});

/**
 * @OA\Get(
 *     path="/isRejected/{userName}",
 *     tags={"user"},
 *     summary="Check if user is rejected",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="IsRejected status",
 *         @OA\JsonContent(
 *             @OA\Property(property="isRejected", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /isRejected/@userName", function ($userName) {
    $isRejected = Flight::user_service()->isRejected($userName);

    Flight::json(["isRejected" => $isRejected]);
});

/**
 * @OA\Get(
 *     path="/isWaitingToPlay/{userName}",
 *     tags={"user"},
 *     summary="Check if user is waiting to play",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="IsWaitingToPlay status",
 *         @OA\JsonContent(
 *             @OA\Property(property="isWaitingToPlay", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /isWaitingToPlay/@userName", function ($userName) {
    $isWaitingToPlay = Flight::user_service()->isWaitingToPlay($userName);

    Flight::json(["isWaitingToPlay" => $isWaitingToPlay]);
});

/**
 * @OA\Put(
 *     path="/resetGameOpponent/{userEmail}",
 *     tags={"user"},
 *     summary="Reset game opponent",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Game opponent reset",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to reset game opponent",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /resetGameOpponent/@userEmail", function ($userEmail) {
    $success = Flight::user_service()->resetGameOpponent($userEmail);

    if ($success) {
        Flight::json(["message" => "Game opponent reset"]);
    } else {
        Flight::json(["error" => "Failed to reset game opponent"], 400);
    }
});

/**
 * @OA\Put(
 *     path="/resetRecipe/{userEmail}",
 *     tags={"user"},
 *     summary="Reset user's recipe",
 *     @OA\Parameter(
 *         name="userEmail",
 *         in="path",
 *         required=true,
 *         description="User email",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Recipe reset",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to reset recipe",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
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
