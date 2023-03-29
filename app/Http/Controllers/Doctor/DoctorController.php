<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{

    public function DoctorCount(){
        $count = DB::table('doctors')->count();
        return $count;
    }

    public function create(Request $request){
        //validate inputs
        $request->validate([
            'name' => 'required',
            'hospital' => 'required',
            'email' => 'required|email|unique:doctors,email',
            'password' => 'required|min:7|max:16',
            'cpassword' => 'required|min:7|max:16|same:password',
        ]);

        //create an instance of doctor
        $doctor = new Doctor();

        $doctor->name = $request->input('name');
        $doctor->hospital = $request->input('hospital');
        $doctor->email = $request->input('email');
        $doctor->password = Hash::make($request->input('password'));

        $doctor = $doctor->save();

        //define redirect
        if($doctor)
        {
            return redirect()->back()->with('success','You have been registered.');
        }
        else{
            return redirect()->back()->with('fail','Whoops! somthing went wrong. Try again.');
        }
    }

    public function login(Request $request){
        //validate inputs
        $request->validate([
            'email' => 'required|email|exists:doctors,email',
            'password' => 'required|min:7|max:16',
        ],[
            'email.exists' => 'No user registered with this email.',
        ]);

        //check auth
        $creds = $request->only('email','password');

        //check guard
        if(Auth::guard('doctor')->attempt($creds)){
            return redirect()->route('doctor.index');
        }else{
            return redirect()->route('doctor.login')->with('fail','Incorrect credentials.');
        }
    }

    public function logout(){
        Auth::guard('doctor')->logout();
        redirect('/');
    }
}
