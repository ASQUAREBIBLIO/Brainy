<?php

use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\Admin\Calendar\CalendarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Family\FamilyController;
use App\Http\Controllers\Doctor\DoctorController;
use App\Http\Controllers\User\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin Family
Route::controller(AdminController::class)->group(function() {
    Route::get('admin/index', 'index');
});


// Admin Family
Route::controller(FamilyController::class)->group(function() {
    Route::get('admin/index/family', 'index');
    Route::get('admin/index/family/count', 'FamilyCount');
    Route::post('admin/index/family/create', 'store');
    Route::get('admin/index/family/create', 'create');
    Route::put('admin/index/family/{id}/edit', 'update');
    Route::get('admin/index/family/{id}', 'show');
    Route::delete('admin/index/family/{id}', 'destroy');
});


// Admin Calendar
Route::controller(CalendarController::class)->group(function() {
    Route::get('admin/index/calendar/d', 'getTodayEvent');
    Route::get('admin/index/calendar', 'index');
    Route::post('admin/index/calendar/create', 'store');
    Route::put('admin/index/calendar/{id}', 'update');
    Route::get('admin/index/calendar/{id}', 'show');
    Route::delete('admin/index/calendar/{id}', 'destroy');
});


//patients
Route::controller(UserController::class)->group(function() {
    Route::get('admin/index/patients/count', 'usersCount');
    Route::get('doctor/index/patients', 'index');
    Route::delete('admin/index/patient/{id}', 'destroy');
    Route::get('admin/index/patient', 'getPatient');
});

//doctors
Route::controller(DoctorController::class)->group(function() {
    Route::get('admin/index/doctor/count', 'DoctorCount');
});
