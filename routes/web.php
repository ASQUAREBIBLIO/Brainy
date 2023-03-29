<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\Admin\Family\FamilyController;
use App\Http\Controllers\Doctor\DoctorController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//user routes

// Route::view('/user/register', 'user.register')->name('user.register');
// Route::post('/user/create', [AdminController::class, 'createUser'])->name('user.create');

Route::prefix('user')->name('user.')->group(function(){

    Route::middleware(['guest:web','PreventBackHistory'])->group(function(){
        Route::view('/login', 'user.login')->name('login');
        Route::post('/login', [UserController::class, 'login'])->name('login');
    });

    Route::middleware(['auth:web','PreventBackHistory'])->group(function(){
        Route::view('/index', 'user.index')->name('index');
        Route::view('/index/family', 'user.family')->name('family');
        Route::view('/index/agenda', 'user.agenda')->name('agenda');
        Route::view('/index/repport', 'user.repport')->name('repport');
        Route::view('/index/calendar', 'user.calendar')->name('calendar');
        Route::view('/index/play', 'user.play')->name('play');
        Route::view('/index/play/magic-memory', 'user.magicMemory')->name('magicMemory');
        Route::view('/index/play/quiz', 'user.quiz')->name('quiz');
        Route::post('/logout', [UserController::class, 'logout'])->name('logout');
    });
});


//admin routes
Route::prefix('admin')->name('admin.')->group(function(){

    Route::middleware(['guest:admin','PreventBackHistory'])->group(function(){
        // Admin Login and Register
        Route::view('/login', 'admin.login')->name('login');
        Route::view('/register', 'admin.register')->name('register');
        Route::post('/create', [AdminController::class, 'create'])->name('create');
        Route::post('/login', [AdminController::class, 'login'])->name('login');
    });

    Route::middleware(['auth:admin','PreventBackHistory'])->group(function(){

        //user register
        Route::view('/index/patient/new', 'user.register')->name('user.register');
        Route::post('/index/patient/create', [AdminController::class, 'createUser'])->name('user.create');

        // Admin dashboard
        Route::view('/index', 'admin.index')->name('index');

        //Admin profile
        Route::view('/index/profile', 'admin.profile')->name('profile');

        // Family
        Route::view('/index/family', 'admin.family.index')->name('famIndex');
        Route::view('/index/family/create', 'admin.family.create')->name('famcreate');
        Route::view('/index/family/{id}/edit', 'admin.family.update')->name('famupdate');

        //  Calendar
        Route::view('/index/calendar', 'admin.calendar.index')->name('calIndex');
        Route::view('/index/calendar/create', 'admin.calendar.create')->name('calcreate');
        Route::view('/index/calendar/update', 'admin.calendar.update')->name('calupdate');

        // Agenda
        Route::view('/index/agenda', 'admin.agenda.index')->name('agIndex');

        // Reports
        Route::view('/index/report', 'admin.report.index')->name('report');

        //patient details
        Route::view('/index/patient', 'admin.patient')->name('patient');

        // Admin logout
        Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
    });
});



//doctor routes
Route::prefix('doctor')->name('doctor.')->group(function(){

    Route::middleware(['guest:doctor','PreventBackHistory'])->group(function(){
        Route::view('/login', 'doctor.login')->name('login');
        Route::view('/register', 'doctor.register')->name('register');
        Route::post('/create', [DoctorController::class, 'create'])->name('create');
        Route::post('/login', [DoctorController::class, 'login'])->name('login');
    });

    Route::middleware(['auth:doctor','PreventBackHistory'])->group(function(){
        Route::view('/index', 'doctor.index')->name('index');
        Route::view('/index/patients', 'doctor.patients.patients')->name('patients');
        Route::post('/logout', [DoctorController::class, 'logout'])->name('doctor.logout');
    });
});

