<?php /** @noinspection ALL */

/**
 * @OA\Post(
 *     path="/initializeChats",
 *     tags={"chat"},
 *     summary="Initialize chats",
 *     @OA\Response(
 *         response=200,
 *         description="Chats added successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string"),
 *             @OA\Property(property="data", type="array", @OA\Items())
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to add chats",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     )
 * )
 */
Flight::route("POST /initializeChats", function () {
    $data = Flight::request()->data->getData();
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

/**
 * @OA\Put(
 *     path="/updateChatTextByUserName/{userName}/{chatText}",
 *     tags={"chat"},
 *     summary="Update chat text by user name",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="chatText",
 *         in="path",
 *         required=true,
 *         description="Chat text",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Chat text updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to update chat text",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("PUT /updateChatTextByUserName/@userName/@chatText", function ($userName, $chatText) {
    $success = Flight::chat_service()->updateChatTextByUserName($userName, $chatText);

    if ($success) {
        Flight::json(["message" => "Chat text updated"]);
    } else {
        Flight::json(["error" => "Failed to update chat text"], 400);
    }
});

/**
 * @OA\Get(
 *     path="/checkUsersHaveSameChatGameId/{userName1}/{userName2}",
 *     tags={"chat"},
 *     summary="Check if users have the same chat game ID",
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
 *         description="Same chat game ID",
 *         @OA\JsonContent(
 *             @OA\Property(property="Same id", type="boolean")
 *         )
 *     )
 * )
 */
Flight::route("GET /checkUsersHaveSameChatGameId/@userName1/@userName2", function ($userName1, $userName2) {
    $haveSameGameId = Flight::chat_service()->checkUsersHaveSameChatGameId($userName1, $userName2);

    if ($haveSameGameId) {
        Flight::json(["Same id" => $haveSameGameId]);
    } else {
        Flight::json(["Same id" => $haveSameGameId]);
    }
});

/**
 * @OA\Delete(
 *     path="/deleteUsersWithSameNonZeroGameId/{userName}",
 *     tags={"chat"},
 *     summary="Delete users with the same non-zero game ID",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Users chat deleted successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Failed to delete users chat",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
Flight::route("DELETE /deleteUsersWithSameNonZeroGameId/@userName", function ($userName) {
    $success = Flight::chat_service()->deleteUsersWithSameGameId($userName);

    if ($success) {
        Flight::json(["message" => "Users chat deleted successfully"]);
    } else {
        Flight::json(["error" => "Failed to delete users chat"], 500);
    }
});

/**
 * @OA\Get(
 *     path="/getChatTextByUsername/{userName}",
 *     tags={"chat"},
 *     summary="Get chat text by user name",
 *     @OA\Parameter(
 *         name="userName",
 *         in="path",
 *         required=true,
 *         description="User name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Chat text",
 *         @OA\JsonContent(
 *             @OA\Property(property="chatText", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Chat text not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
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