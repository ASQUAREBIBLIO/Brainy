<?php

namespace App\Http\Controllers\Admin\Calendar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Calendar;
use Illuminate\Support\Facades\DB;
use App\Models\Admin;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index(){
        $cal = Calendar::orderby('date', 'asc')->get();
        return $cal;
    }

    public function getTodayEvent(){
        // $todayEvent = Calendar::current()->select('title','time')->get();
        $todayEvent = Calendar::whereDate('date', '=', Carbon::today())->get();

        return $todayEvent;
    }

    // public function deleteOldEvent(){
    //     $oldEvent = Calendar::whereRaw('DATEDIFF(NOW(), created_at) > 30')->delete();
    //     dd($oldEvent);
    // }

    public function store(Request $req){

        $req->validate([
            'title' => 'required|max:30',
            'date' => 'required|date',
            'time' => 'required',
            'description' => 'max:255',
        ]);

        $admin = Admin::find(1);

        $cal = new Calendar();

        $cal->title = $req->input('title');
        $cal->date = $req->input('date');
        $cal->time = $req->input('time');
        $cal->description = $req->input('description');

        $admin->calendars()->save($cal);
        //$cal->save();
        return redirect('admin/index/calendar/create');
    }


    public function update(Request $req){

        $cal = Calendar::findOrfail($req->id);

        $req->validate([
            'name' => 'required|max:30',
            'date' => 'required|date',
            'time' => 'required',
            'description' => 'max:255',
        ]);


        $cal->title = $req->input('title');
        $cal->date = $req->input('date');
        $cal->time = $req->input('time');
        $cal->description = $req->input('description');

        $cal->save();
        return redirect('admin/index/calendar');
    }


    public function show($id){
        $cal = Calendar::find($id);

        return response()->json($cal);
    }


    public function destroy($id){
        $cal = Calendar::destroy($id);

        return $cal;
    }

}
