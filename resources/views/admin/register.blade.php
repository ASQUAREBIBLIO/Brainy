@extends('layouts.app')

@section('content')
    <div class="top-nav">
        <a class="active" href="{{ url('/') }}">
            {{__('BRAINY')}}
        </a>

        <div class="right-top-nav" id="navbarSupportedContent">

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ms-auto">
                <!-- Authentication Links -->
                <!-- @guest
                    @if (Route::has('user.login'))
                        <li>
                            <a href="{{ route('user.login') }}">{{ __('LOG IN') }}</a>
                        </li>
                    @endif

                    @if (Route::has('user.register'))
                        <li>
                            <a class="nav-link" href="{{ route('user.register') }}">{{ __('SIGN UP') }}</a>
                        </li>
                    @endif
                @endguest -->
            </ul>
        </div>
    </div>
    <div class="form-controll">
        <div class="form-card">
            <div class="form-card-header">
                <h4>{{__('SIGN UP')}}</h4>
                <p>{{ __('Already signed up?') }} <a href="{{ route('admin.login')}}">Log in</a> </p>
            </div>

            <!-- @if ($errors->any())
                <div class="credentials">
                    <div class="error">
                        {{ __('Whoops! Something went wrong.') }}
                    </div>

                    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif -->



            <form method="POST" action="{{ route('admin.create') }}">
                @csrf

                <!-- Name -->
                <div class="row">
                    <label for="name">{{__('Name')}}</label>

                    <input id="name" type="text" name="name" placeholder="Full name..." value="{{old('name')}}"/>

                    <span class="error each">
                        @error('name') {{$message}} @enderror
                    </span>
                </div>

                <div class="row">
                    <label for="phone">{{__('Phone')}}</label>

                    <input id="phone" type="text" name="phone" placeholder="+212 6********" value="{{old('phone')}}"/>

                    <span class="error each">
                        @error('phone') {{$message}} @enderror
                    </span>
                </div>

                <!-- Email Address -->
                <div class="row">
                    <label for="email">{{__('Email')}}</label>

                    <input id="email" type="email" name="email" placeholder="xyz@example.com" value="{{old('email')}}"/>

                    <span class="error each">
                        @error('email') {{$message}} @enderror
                    </span>
                </div>

                <!-- Password -->
                <div class="row">
                    <label for="password">{{__('Password')}}</label>

                    <input id="password"
                            type="password"
                            name="password"
                            placeholder="*******" />
                    <span class="error each">
                        @error('password') {{$message}} @enderror
                    </span>
                </div>

                <!-- Confirm Password -->
                <div class="row">
                    <label for="cpassword">{{__('Confirm Password')}}</label>

                    <input id="cpassword"
                                    type="password"
                                    name="cpassword"
                                    placeholder="*******" />
                    <span class="error each">
                        @error('cpassword') {{$message}} @enderror
                    </span>
                </div>

                <!-- Choose Role
                <div class="row">
                    <label for="role_id">{{__('Register as: ')}}</label>
                    <select name="role_id">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div> -->


                <div class="row mb-0">
                    <div>
                        <button type="submit" class="btn btn-primary">
                            {{ __('SUBMIT') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
