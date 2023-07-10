<?php /** @noinspection ALL */

/**
 * @OA\Get(
 *     path="/recipes",
 *     description="Get all recipes",
 *     tags={"recipes"},
 *     @OA\Response(
 *         response=200,
 *         description="Recipes gotten successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Success message"),
 *             @OA\Property(property="data", type="array", @OA\Items(type="object"), description="Recipes data")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Failed to get recipes"
 *     )
 * )
 */
Flight::route("GET /recipes", function () {
    $data = Flight::recipe_routes()->get_all();

    if ($data) {
        Flight::json([
            "message" => "Recipes gotten successfully",
            "data" => $data
        ]);
    } else {
        Flight::json([
            "message" => "Failed to get recipes"
        ]);
    }
});

/**
 * @OA\Get(
 *     path="/recipeByName/{name}",
 *     description="Get recipe by name",
 *     tags={"recipes"},
 *     @OA\Parameter(
 *         name="name",
 *         in="path",
 *         required=true,
 *         description="The recipe name",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Recipe gotten successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Success message"),
 *             @OA\Property(property="data", type="object", description="Recipe data")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Failed to get recipe"
 *     )
 * )
 */
Flight::route("GET /recipeByName/@name", function ($name) {
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
