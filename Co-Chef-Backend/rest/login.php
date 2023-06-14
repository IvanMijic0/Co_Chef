<?php
require_once "./services/UserService.php";

session_start(); // Start the session

// Get the user email and password from the request
$userEmail = $_GET['userEmail'];
$userPassword = $_GET['userPassword'];

// Perform authentication and check if the user credentials are valid
// You can use database queries or any other authentication mechanism here
$isValidUser = UserService::class::checkUserByEmailAndPassword($userEmail, $userPassword); // Implement your own logic

if ($isValidUser) {
    // Store the user's email in the session for future reference
    $_SESSION['userEmail'] = $userEmail;

    // Send a success response
    echo json_encode(true);
} else {
    // Send an error response
    echo json_encode(false);
}

