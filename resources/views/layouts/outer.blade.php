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
    </head>
    <body class="loginPageCntr">
        <!-- / wrapper \ -->
        <section id="wrapper">
            <!-- / main container \ -->
            <section id="mainCntr">
                <!-- / header container \ -->
                <header id="headerCntr">
                    <!--  / menu box \ -->
                    <nav class="menuBox navbar navbar-fixed-top">
                        <div class="container">
                            <div class="navbar-header">
                                <a href="#" class="navbar-brand">
                                    <img src="{{ asset('img/Logo-AuthBridge.png') }}" alt="Authbridge">
                                </a>
                            </div>
                        </div>
                    </nav>
                    <!--  \ menu box / -->
                </header>
                <!-- \ header container / -->
                <!-- / content container \ -->
                <section id="contentCntr" class="loginContentCntr">
                    <article class="loginPageBox">
                        <div class="container">
                            @yield('content')
                        </div>
                    </article>
                </section>
                <!--  \ content container / -->
            </section>
            <!-- \ main container / -->
        </section>
        <!-- \ wrapper / -->
        <!-- Script Tags -->
        <script src="{{ asset('js/jquery.min.js') }}"></script>
        <script src="{{ asset('js/jquery.min.js') }}"></script>
        <script src="{{ asset('js/jquery.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('js/jquery-ui.min.js') }}"></script>
        <script src="{{ asset('js/jquery.form-validator.min.js') }}"></script>
    </body>
</html>
<script>
$.validate();
</script>