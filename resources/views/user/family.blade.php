@extends('layouts.app')

@section('content')

    <div class="right-top-header text-black">

        <a class="p-0">
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
                        {{ Auth::guard('web')->user()->name }}
                    </span>
                </div>
            </div>
        </a>
    </div>

    <div>
        <input type="checkbox" id="check">
        <label for="check" class="check_btn">
            <i class="bi bi-text-right"></i>
        </label>
        <ul id="dropmenu" class="dropdown-content text-center col-12 p-3 bg-white border border-dark-500 mt-1">
            <li><a class="text-dark text-decoration-none" href="#">Profile</a></li>
            <li><a class="text-dark text-decoration-none" href="#">Notification</a></li>
            <li>
                <div class="btn col-12 bg-light border border-dark-500 m-1" >
                    <a class="text-dark text-decoration-none" href="{{ route('user.logout') }}"
                        onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                        {{ __('LOG OUT') }}
                    </a>

                    <form id="logout-form" action="{{ route('user.logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </li>
        </ul>
    </div>

    <div id="family"></div>
    <script src="{{ mix('js/app.js') }}"></script>

@endsection
