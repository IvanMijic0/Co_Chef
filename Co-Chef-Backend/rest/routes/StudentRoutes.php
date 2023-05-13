<?php /** @noinspection ALL */

Flight::route("/", function (){
    echo "Hello from / route";
});

Flight::route("POST /student", function (){
    Flight::json
    (
        array(
            "message" => "Student added successfully",
            "data" => Flight::student_service()->add(Flight::request()->data->getData())
        )
    );
});

Flight::route("PUT /student/@id", function ($id){
    Flight::json
    (
        [
            "message" => "Student updated successfully",
            "data" => Flight::student_service()->update(Flight::request()->data->getData(), $id)
        ]
    );
});

Flight::route("GET /students", function () {
    Flight::json
    (
        Flight::student_service()->get_all()
    );
});

Flight::route("GET /student_by_id", function (){
    Flight::json
    (
        Flight::student_service()->get_by_id(Flight::request()->query["id"])
    );
});

Flight::route("GET /students/@id", function ($id) {
    Flight::json
    (
        Flight::student_service()->get_by_id($id)
    );
});

Flight::route("DELETE /students/@id", function ($id){
    Flight::student_service()->delete($id);
    Flight::json
    (
        ["message" => "Student deleted successfully"]
    );
});

Flight::route("/update/@first_name/@last_name/@id",
    function ($first_name, $last_name, $id){
    Flight::student_service()->update($first_name, $last_name, $id);
});

