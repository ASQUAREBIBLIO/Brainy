<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{

    public function index(){

        $admin = Admin::all();
        return $admin;
    }


    public function create(Request $request)
    {
        //validate inputs
        $request->validate([
            'name' => 'required|',
            'phone' => 'required',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|min:7|max:16',
            'cpassword' => 'required|min:7|max:16|same:password',
        ]);

        //create new instance of admin
        $admin = new Admin();
        //insert into database, admins table
        $admin->name = $request->input('name');
        $admin->phone = $request->input('phone');
        $admin->email = $request->input('email');
        $admin->password = Hash::make($request->input('password'));

        $admin = $admin->save();

        if($admin)
        {
            return redirect()->route('admin.login')->with('success','You\'ve registered successfully.');
        }else{
            return redirect()->back()->with('fail','Whooops! Somthing went wrong. Try again.');
        }
    }

    public function createUser(Request $request)
    {
        //validate inputs
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:7|max:16',
            'cpassword' => 'required|min:7|max:16|same:password',
        ]);

        $admin = Admin::find(1);
        //create new instance of user
        $user = new User();
        //insert into database, users table
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));

        $admin->users()->save($user);

        return redirect()->route('admin.patient')->with('success','The patient is added successfully.');

    }


    public function getAuthAdmin(){

    $admin = auth('admin')->user()->id;

    print_r($admin);
    }

    public function login(Request $request)
    {
        //validate inputs
        $request->validate([
            'email' => 'required|email|exists:admins,email',
            'password' => 'required|min:7|max:16',
        ],[
            'email.exists' => 'This email is not registered.'
        ]);

        $creds = $request->only('email','password');
        if(Auth::guard('admin')->attempt($creds)){
            return redirect()->route('admin.index')->with('status','Welcome to Brainy');
        }else{
            return redirect()->route('admin.login')->with('fail','Incorrect credentials.');
        }
    }

    public function logout(){
        Auth::guard('admin')->logout();
        redirect('/');
    }


}
