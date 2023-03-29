@extends('layouts.app')

@section('content')

    <div class="toogle right-top-header" onClick="myFunction()">

        <a class="btn border border-dark-500 bg-white p-0">
            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
            @endif

            <div class="right-top-panel">
                <div class="bell">
                    <i class="bi bi-bell-fill"></i>
                </div>
                <div class="profile-index">
                    <span>
                        {{ Auth::guard('admin')->user()->name }}
                    </span>
                    <span>
                        <i class="bi bi-text-right"></i>
                    </span>
                </div>
            </div>
        </a>

        <ul id="dropmenu" class="dropdown-content text-center col-12 p-3 bg-white border border-dark-500 mt-1">
            <li><a class="text-dark text-decoration-none" href="{{ route('admin.profile') }}">Profile</a></li>
            <li><a class="text-dark text-decoration-none" href="#">Notification</a></li>
            <li><a class="text-dark text-decoration-none" href="#">Settings</a></li>
            <li>
                <div class="btn col-12 bg-light border border-dark-500 m-1" >
                    <a class="text-dark text-decoration-none" href="{{ route('admin.logout') }}"
                        onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                        {{ __('LOG OUT') }}
                    </a>

                    <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </li>
        </ul>
    </div>

    <div>
        {{__('Update a calendar')}}
    </div>

    <!-- <div id="admin"></div>
    <script src="{{ mix('js/app.js') }}"></script> -->

@endsection
