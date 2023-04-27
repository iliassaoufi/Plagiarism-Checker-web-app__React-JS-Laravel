<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        // 'webhook/*',
        "http://192.168.100.17/plagiat-project/laravel/public/*",
        "http://localhost/plagiat-project/laravel/public/*",
    ];
}