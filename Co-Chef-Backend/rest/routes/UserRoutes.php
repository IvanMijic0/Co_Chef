<?php /** @noinspection ALL */

Flight::route("/", function (){
    echo "Hello from / route";
});

Flight::route("POST /user", function () {
    $data = Flight::request()->data->getData();
    $userService = Flight::user_service();

    // Check if the user already exists
    $userExists = $userService->checkUserByEmailAndPassword($data['userEmail'], $data['userPassword']);

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


Flight::route("PUT /user/@id", function ($id){
    Flight::json
    (
        [
            "message" => "User updated successfully",
            "data" => Flight::user_service()->update(Flight::request()->data->getData(), $id)
        ]
    );
});

Flight::route("GET /users", function () {
    Flight::json
    (
        Flight::user_service()->get_all()
    );
});

Flight::route("GET /user_by_id", function (){
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

Flight::route("DELETE /user/@id", function ($id){
    Flight::user_service()->delete($id);
    Flight::json
    (
        ["message" => "User deleted successfully"]
    );
});

Flight::route("/update/@first_name/@last_name/@id",
    function ($first_name, $last_name, $id){
    Flight::user_service()->update($first_name, $last_name, $id);
});

Flight::route("GET /checkUserByEmailAndPassword/@email/@password",
    function ($email, $password) {
        $authenticated = Flight::user_service()->checkUserByEmailAndPassword($email, $password);
        Flight::json($authenticated);
    }
);
