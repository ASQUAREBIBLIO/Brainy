<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function index(){
        $patients = User::all();
        return $patients;
    }

    public function usersCount(){
        $count = DB::table('users')->count();
        return $count;
    }

    public function getPatient(){
        $admin = Admin::find(1);
        $patient = $admin->users;
        return $patient;
    }

    public function destroy($id){
        $patient = User::destroy($id);

        return $patient;
    }

    public function login(Request $request)
    {
        //validate inputs
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:7|max:16',
        ],[
            'email.exists' => 'This email is not registered.'
        ]);

        $creds = $request->only('email','password');
        if(Auth::guard('web')->attempt($creds)){
            return redirect()->route('user.index');
        }else{
            return redirect()->route('user.login')->with('fail','Incorrect credentials.');
        }
    }

    public function logout(){
        Auth::guard('web')->logout();
        redirect('/');
    }
}
