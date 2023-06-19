<?php

class Config
{
    public static function DB_HOST()
    {
        return Config::get_env("DB_HOST", "127.0.0.1");
    }

    public static function DB_USERNAME()
    {
        return Config::get_env("DB_USERNAME", "ivan");
    }

    public static function DB_PASSWORD()
    {
        return Config::get_env("DB_PASSWORD", "cookie");
    }

    public static function DB_SCHEMA()
    {
        return Config::get_env("DB_SCHEMA", "co_chef_db");
    }

    public static function DB_PORT()
    {
        return Config::get_env("DB_PORT", "3306");
    }

//    public static string $host = "127.0.0.1";
//    public static string $database = "co_chef_db";
//
//    public static string $username = "ivan";
//    public static string $password = "cookie";
//    public static string $port = "3306";

    public static function get_env($name, $default)
    {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
    }
}