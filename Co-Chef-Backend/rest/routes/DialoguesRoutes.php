<?php /** @noinspection ALL */

/** @noinspection ALL */

/**
 * @OA\Get(
 *     path="/getDefaultTextByActor/{actor}",
 *     description="Get default dialogues by actor",
 *     tags={"dialogues"},
 *     @OA\Parameter(
 *         name="actor",
 *         in="path",
 *         required=true,
 *         description="The actor name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Default dialogues gotten successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Success message"),
 *             @OA\Property(property="data", type="array", @OA\Items(type="string"), description="Default dialogues")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Failed to get default dialogues"
 *     )
 * )
 */
Flight::route("GET /getDefaultTextByActor/@actor", function ($actor) {
    $data = Flight::dialogue_routes()->getDefaultTextByActor($actor);

    if ($data) {
        Flight::json([
            "message" => "Default dialogues gotten successfully",
            "data" => $data
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get default dialogues"
        ]);
    }
});

/**
 * @OA\Get(
 *     path="/getSelectedTextByActor/{actor}",
 *     description="Get selected dialogues by actor",
 *     tags={"dialogues"},
 *     @OA\Parameter(
 *         name="actor",
 *         in="path",
 *         required=true,
 *         description="The actor name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Selected dialogues gotten successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Success message"),
 *             @OA\Property(property="data", type="array", @OA\Items(type="string"), description="Selected dialogues")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Failed to get selected dialogues"
 *     )
 * )
 */
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
