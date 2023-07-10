<?php

use OpenApi\Analysis;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../vendor/autoload.php";
require "dao/UsersDao.php";
require "dao/ChatsDao.php";
require "services/UserService.php";
require "services/ChatServices.php";

// Allow requests from a specific origin
header("Access-Control-Allow-Origin: https://lionfish-app-zkpvm.ondigitalocean.app");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow specific headers (if needed)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Allow credentials (if needed)
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Set additional headers for preflight requests
    header("Access-Control-Max-Age: 86400");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    exit;
}

// middleware method for login
Flight::route('/*', function () {
    //perform JWT decode
    $path = Flight::request()->url;
    if (
        $path == '/login' ||
        $path == '/user' ||
        $path == '/docs.js' ||
        $path = '/checkUserByEmailAndPassword'
    ) {
        return TRUE; // exclude login route from middleware
    }

    $headers = getallheaders();
    if ($headers['Authorization'] == null) {
        Flight::json(["message" => "Authorization is missing"], 403);
        return FALSE;
    } else {
        try {
            $decoded = (array)JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
            Flight::set('user', $decoded);
            return TRUE;
        } catch (Exception) {
            Flight::json([
                "path" => $path,
                "message" => "Authorization token is not valid"
            ], 403);
            return FALSE;
        }
    }
});

/* REST API documentation endpoint */
Flight::route("GET /docs.json", function () {
    $openapi = \OpenApi\Generator::scan(
        [__DIR__ . "/routes"],
        [
            'analysis' => new Analysis(),
            'analysisOptions' => ['ignoreNotExists' => false,]
        ]
    );
    header("Content-Type: application/json");
    echo $openapi->toJson();
});

Flight::register("user_service", UserService::class);
Flight::register("chat_service", ChatServices::class);
Flight::register("recipe_service", RecipeDao::class);
Flight::register("dialogue_service", RecipeDao::class);
Flight::register("dish_service", RecipeDao::class);

require_once "routes/UserRoutes.php";
require_once "routes/ChatsRoutes.php";
require_once "routes/RecipesRoutes.php";
require_once "routes/DialoguesRoutes.php";
require_once "routes/DishesRoutes.php";

Flight::before("error", function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
});

Flight::before("json", function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
});

Flight::start();
