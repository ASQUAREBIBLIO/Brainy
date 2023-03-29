<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Brainy</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <!-- Booststrap icons -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
        <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">

        <style>
            *{
                padding: 0;
                margin: 0;
                text-decoration: none;
                list-style: none;
                box-sizing: border-box;
            }
            a{
                text-decoration: none;
            }
            body {
                font-family: sans-serif;
                background-color: #fafafc;
            }
            .top-nav{
                position: sticky;
                top: 0;
                overflow: hidden;
                width: 100%;
                height: 60px;
                line-height: 60px;
                background-color: #fff;
                box-shadow: 0 0 5px #ccc;
                padding: 0 20px;
            }
            .top-nav a{
                float: left;
                margin-left: 10px;
                font-size: 16px;
                color: #111;
            }
            .top-nav a.active{
                background: none;
                font-weight: bold;
                font-size: 20px;
                color: #6963dd;
            }
            .top-nav a:hover{
                color: #6963dd;
            }
            .right-top-nav{
                float: right;
            }
            .form-controll{
                display: grid;
                margin: 40px 0;
                justify-content: center;
                text-align: center;
            }
            .form-controll .form-card{
                padding: 20px;
                background-color: #fff;
                border-radius: 7px;
                box-shadow: 0 0 5px #ccc;
            }
            .form-card-header{
                margin-bottom: 15px;
            }
            .form-card a{
                font-size: 14px;
                color: #6963dd;
                margin-right: 10px;
                text-decoration: underline;
            }
            .form-card form{
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .form-card form .row{
                display: flex;
                flex-direction: column;
                justify-self: center;
                margin-bottom: 15px;
                text-align: left;
            }
            .form-card form .row input{
                width: 430px;
                background-color: #fafafc;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 7px;
                margin: 0 10px;
            }
            .form-card form .block{
                display: flex;
                margin-bottom: 15px;
            }
            .form-card form button{
                border: none;
                border-radius: 3px;
                color: #fff;
                background-color: #6963dd;
                padding: 7px;
            }
            .error{
                text-align: center;
                color: red;
                font-size: 14px;
                margin-top: 5px;
            }
            .error.each{
                text-align: left;
            }
            .success-msg{
                background-color: rgb(195, 241, 195);
                color: green;
                padding: 7px;
                border-radius: 3px;
                font-size: 14px;
            }
            .success-msg.family{
                position: absolute;
                bottom: 20px;
                right: 20px;
            }
            .danger-msg{
                background-color: rgb(241, 195, 195);
                color: red;
                padding: 7px;
                font-size: 14px;
                border-radius: 3px;
            }
            .indicators span{
                text-align: center;
                font-size: 10px;
                color: #111;
            }
            @media (max-width: 615px){
                .form-controll {
                    display: block;
                    justify-content: center;
                    padding: 10px;
                }
                .form-card form .row{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                }
                .form-card form .row input{
                    width: 100%;
                    padding: 5px;
                }
            }
            .right-top-header{
                position: fixed;
                top: 20px;
                right: 42px;
            }
            .right-top-header .right-top-panel{
                display: inline-flex;
                height: 40px;
                line-height: 40px;
                border: 0;
                border-radius: 5px;
                background: none;
            }
            .right-top-header .right-top-panel div{
                padding: 0 5px;
            }
            .right-top-header .right-top-panel div span{
                color: #111;
            }
            .bell i{
                background-color: #fff;
                color: #111;
                border-radius: 100%;
                padding: 7px;
            }
            #check{
                display: none;
            }
            .check_btn{
                display: block;
                position: absolute;
                top: 20px;
                right: 30px;
                height: 40px;
                line-height: 40px;
            }
            .check_btn i{
                font-size: 16px;
                font-weight: bold;
            }
            .dropdown-content{
                position: fixed;
                top: 55px;
                right: -100%;
                border-radius: 3px;
                width: 220px;
                max-height: 200px;
                transition: right .2s ease-in;
            }
            #check:checked ~ .dropdown-content{
                right: 30px;
            }
            @media (max-width: 900px){
                .right-top-header{
                    right: 45px;
                }
                .right-top-header .right-top-panel div{
                    padding: 0 7px;
                }
            }

            .profile-section{
                padding: 0px;
            }
            .profile-section header{
                background-color: #fff;
                color: #111;
                padding: 0 10px;
                line-height: 60px;
                font-size: 22px;
                font-weight: bold;
            }
            .profile-section header a{
                color: #111;
            }
            .profile-section section{
                padding: 10px;
            }
            .cover{
                position: relative;
                display: flex;
                width: 100%;
                height: 120px;
                background: linear-gradient(0deg, #6963dd, #6863ee);
                border-radius: 5px;
            }
            .cover img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
            }
            .avatar img{
                position: absolute;
                display: inline-flex;
                justify-content: center;
                width: 80px;
                height: 80px;
                border: 3px solid #fafafc;
                border-radius: 100%;
                background-color: #6963dd;
                left: calc(50% - 40px);
                top: 22%;
            }
            .details{
                margin-top: 50px;
                justify-content: center;
                text-align: center;
            }
            .about-details{
                display: flex;
                justify-content: left;
                text-align: left;
                padding: 20px;
            }
            .actions_btn{
                display: flex;
                justify-content: center;
                border-bottom: 1px solid #ccc;
                padding-bottom: 20px;
            }
            .actions_btn a{
                margin: 3px;
                padding: 5px;
                background-color: #6963dd;
                color: #fff;
                border-radius: 3px;
            }


        </style>
    </head>
    <body>
        <div class="m-0 p-0">
            @yield('content')
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </body>
</html>
