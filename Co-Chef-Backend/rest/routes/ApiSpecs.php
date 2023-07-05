<?php

/**
 * @OA\Info(title="Co-Chef", version="0.1", @OA\Contact(email="ivan.mijic@stu.ibu.edu.ba", name="Ivan Mijić"))
 * @OA\OpenApi(
 *     @OA\Server(url="http://localhost/Co_Chef/Co-Chef-Backend/rest", descritpion="Development Environment"),
 *     @OA\Server(url="https://shark-app-7dvmx.ondigitalocean.app/rest", descritpion="Production Environment")
 * ),
 * @OA\SecurityScheme(securityScheme="ApiKeyAuth", type="apiKey", in="header", name="Authorization")
 */