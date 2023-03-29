<?php

namespace App\Http\Controllers\Admin\Family;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Models\Family;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FamilyController extends Controller
{

    public function index(Request $req){
        $user = Admin::find(1);
        $members = Family::whereBelongsTo($user)->get();

        return $members;
    }

    public function create(){
        $admins = Admin::all();
        return $admins;
    }

    public function FamilyCount(){
        $count = DB::table('families')->count();
        return $count;
    }

    public function store(Request $req){

        $req->validate([
            'name' => 'required|string|max:30',
            'image' => 'required',
            'relation' => 'required|string',
            'phone' => 'required|string',
        ]);

        $admin = Admin::find(1);


        // new family instance (object) called member
        $member = new Family();

        //insert into the DB
        $member->name = $req->input('name');
        //upload images in laravel
        if($req->hasFile('image')){
            $file = $req->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time(). '.' . $extension;
            $file->move('images', $filename);

            $member->image = $filename;
        }
        $member->relation = $req->input('relation');
        $member->phone = $req->input('phone');

        //$member->save();
        $admin->families()->save($member);

        return redirect()->back()->with('success','New family member added successfully.');

    }


    public function update(Request $req){

        $member = Family::findOrfail($req->id);

        $member->name = $req->input('name');

        // upload images in laravel
        if($req->hasFile('image')){
            $file = $req->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time(). '.' . $extension;
            $file->move('uploads/Family/', $filename);
            $member->image = $filename;
        }
        $member->relation = $req->input('relation');
        $member->phone = $req->input('phone');

        $member->save();
    }


    public function show($id){
        $member = Family::find($id);

        return response()->json($member);
    }


    public function destroy($id){
        $member = Family::destroy($id);

        return $member;
    }

}
