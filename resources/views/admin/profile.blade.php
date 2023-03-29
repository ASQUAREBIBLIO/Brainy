@extends('layouts.app')

@section('content')

    <div class="profile-section">
        <header>
            <a href="{{ url()->previous() }}"><i class="las la-arrow-left"></i></a>
            <span>{{__('Profile')}}</span>
        </header>

        <section>
            <div class="info">
                <div>
                    <div class="cover">
                        <img src="http://127.0.0.1:8000/19366.jpg" />
                    </div>
                    <div class="avatar">
                        <img src="http://127.0.0.1:8000/images/user_avatar.png" />
                    </div>
                </div>
                <div class="details">
                    <div>
                        <h5>{{ Auth::guard('admin')->user()->name }}</h5>
                        <div class="actions_btn">
                            <a href="{{route('admin.famcreate')}}">{{__('family members +')}}</a>
                            <a href="{{route('admin.calcreate')}}">{{__('calendars +')}}</a>
                            <a href="">{{__('Edit')}}</a>
                        </div>
                    </div>
                    <div class="about-details">
                        <div>
                            <h5>{{__('More details')}}</h5>
                            <div>
                                <li>{{ Auth::guard('admin')->user()->email }}</li>
                                <li>{{ Auth::guard('admin')->user()->phone }}</li>
                            </div>
                            <br><br>
                            <h5>{{__('Patients')}}</h5>
                            <div>
                                <li>{{ __('Ahmed Ach-chatibi') }}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

@endsection
