<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ config('title','Bridge2.0') }}</title>
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ asset('css/jquery-ui.css') }}" rel="stylesheet">
        <link href="{{ asset('css/ui.theme.css') }}" rel="stylesheet">
        <link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet">
        <link href="{{ asset('css/lato-font.css') }}" rel="stylesheet">
        <link href="{{ asset('css/master.css') }}" rel="stylesheet">
        <link href="{{ asset('css/lato-font.css') }}" rel="stylesheet">
        <link href="{{ asset('css/jquery.contextMenu.css') }}" rel="stylesheet">
        <link href="{{ asset('css/developer.css') }}" rel="stylesheet">
        <link href="{{ asset('css/crop/jquery.Jcrop.css') }}" rel="stylesheet">
        <link href="{{ asset('css/supervisor.css') }}" rel="stylesheet">
        <link href="{{ asset('css/configuration.css') }}" rel="stylesheet">
    </head>
    <body>
        <!--  / wrapper \ -->
        <section id="wrapper">
            <!--  / main container \ -->
            <section id="mainCntr">
                <!--  / header container \ -->
                <header id="headerCntr">
                    <!--  / menu box \ -->
                    <nav class="menuBox navbar navbar-fixed-top">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <a href="dashboard" class="navbar-brand"><img src="{{ asset('img/Logo-AuthBridge.png') }}"  alt="Authbridge"></a>
                            </div>
                            <div class="navbar-collapse collapse" id="navbar">
                                <p class="custom-navbar-heading navbar-left hidden-xs"></p>
                                <ul class="nav navbar-nav navbar-right">
                                    <li class="user-profile">
                                        <a href="#" class=" bold dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="{{ asset('img/user-icon.png') }}" alt="user-icon"> <label>Welcome <?php // trim($loggedInUser['USER_FIRST_NAME']) ?><span class="caret"></span></label></a>
                                        <ul class="dropdown-menu">
                                            <li><?php 
                                            echo link_to('logout', $title = 'Sign Out', $attributes = array(), $secure = null); ?>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <!--  \ menu box / -->
                </header>
                <!--  \ header container / -->
                <!--  / content container \ -->
                <section id="contentCntr" class="">
                    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
                      @if(Session::has('alert-' . $msg))
                      <div class="alert alert-{{ $msg }} flash_fade" onclick="this.classList.add('hidden')">{{ Session::get('alert-' . $msg) }}</div>
                      @endif
                    @endforeach

                    @yield('content')
                </section>
                
            </section>
            <!--  \ main container / -->
        </section>
        <!-- \ wrapper / -->
        <!-- Script Tags -->
        <script src="{{ asset('js/jquery.min.js') }}"></script>
        <script src="{{ asset('js/jquery-ui/jquery-ui.js') }}"></script>
        <script src="{{ asset('js/jquery-ui/jquery-migrate-3.0.0.js') }}"></script>
        <script src="{{ asset('js/jquery-ui/jquery.ui.datepicker.js') }}"></script>
        <script src="{{ asset('js/jquery-ui/jquery-ui-timepicker-addon.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('js/select2.min.js') }}"></script>
        <script src="{{ asset('js/jquery.mCustomScrollbar.concat.min.js') }}"></script>
        <script src="{{ asset('js/jquery.form-validator.min.js') }}"></script>
        <script src="{{ asset('js/jquery.imgareaselect.js') }}"></script>
        <script src="{{ asset('js/jquery.imgareaselect.js') }}"></script>
        <script src="{{ asset('js/keyevents.js') }}"></script>
        <script src="{{ asset('js/master.js') }}"></script>
    </body>
</html>
<script>
$.validate();
</script>