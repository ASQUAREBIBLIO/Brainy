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
                @guest
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
                @endguest
            </ul>
        </div>
    </div>
    <div class="form-controll">
        <div class="form-card">
            <div class="form-card-header">
                <h4>{{ __('LOG IN FORM') }}</h4>
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

            @if(Session::get('fail'))
                <span class="danger-msg">
                    {{ Session::get('fail') }}
                </span>
            @endif

            <form method="POST" action="{{ route('user.login') }}">
                @csrf

                <div class="row">
                    <label for="email">{{ __('Email') }}</label>

                    <div>
                        <input id="email" type="email" name="email" placeholder="xyz@example.com" value="{{ old('email') }}" />
                    </div>
                    <span class="error each">
                        @error('email') {{$message}} @enderror
                    </span>
                </div>

                <div class="row">
                    <label for="password">{{ __('Password') }}</label>

                    <div>
                        <input id="password" type="password"name="password" placeholder="*******" />
                    </div>
                    <span class="error each">
                        @error('password') {{$message}} @enderror
                    </span>
                </div>

                <!-- <div class="block">
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                            <label class="form-check-label" for="remember">
                                {{ __('Remember Me') }}
                            </label>
                        </div>
                    </div>
                </div> -->

                <div class="row mb-0">
                    <div>
                        <button type="submit" class="btn btn-primary">
                            {{ __('LOG IN') }}
                        </button>

                        @if (Route::has('password.request'))
                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
