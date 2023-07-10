<?php /** @noinspection ALL */

/** @noinspection ALL */

/**
 * @OA\Get(
 *     path="/dishByName/{name}",
 *     description="Get dish by name",
 *     tags={"dish"},
 *     @OA\Parameter(
 *         name="name",
 *         in="path",
 *         required=true,
 *         description="The dish name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Dish gotten successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Success message"),
 *             @OA\Property(property="data", type="object", description="Dish data")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Failed to get dish"
 *     )
 * )
 */
Flight::route("GET /dishByName/@name", function ($name) {
    $data = Flight::dish_routes()->dishByName($name);

    if ($data) {
        Flight::json([
            "message" => "Dish gotten succesfuly",
            "data" => $data
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get dish"
        ]);
    }
});


