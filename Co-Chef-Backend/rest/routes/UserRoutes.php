<?php /** @noinspection ALL */

Flight::route("/", function (){
    echo "Hello from / route";
});

Flight::route("POST /user", function (){
    Flight::json
    (
        array(
            "message" => "User added successfully",
            "data" => Flight::user_service()->add(Flight::request()->data->getData())
        )
    );
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

