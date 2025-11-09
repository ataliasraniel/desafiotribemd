<?php

use App\Http\Controllers\IdeaController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    // GET    /api/ideias
    // POST   /api/ideias
    // GET    /api/ideias/{id}
    // PUT    /api/ideias/{id}
    // DELETE /api/ideias/{id}
    Route::get('/ideias', [IdeaController::class, 'index']);
    Route::get('/ideias/{id}', [IdeaController::class, 'getIdea']);
    Route::post('/ideias', [IdeaController::class, 'store']);
    Route::put('/ideias/{id}', [IdeaController::class, 'update']);
    Route::post('/ideias/{id}/votar', [IdeaController::class, 'vote']);
    Route::delete('/ideias/{id}', [IdeaController::class, 'destroy']);
});