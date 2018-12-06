@extends('layouts.outer')

@section('content')
<div class="row">
     <div class="col-sm-6 hidden-xs">
        <div class="leftSideCntr">
            <h2 class="mg-t80 caption">Verification Solutions
                <span class="tagline">Driven By Technology, Speed and Customer Success </span>
            </h2>
        </div>
    </div>
    <div class="col-sm-6 col-xs-12">
        <div class="login-wrapper">
            <div class="loginCntr">
                <div class="loginBox">
                    {{ Form::open(array('id'=>'login_form', 'url'=>'login')) }}
                        <div class="form-group has-feedback">
                            <label>Username</label>
                            {{ Form::label('USER_LOGINNAME', 'Username') }}
                            {{ Form::text('USER_LOGINNAME',Input::old('USER_LOGINNAME'), }}
                            array(
                                'placeholder' => 'Email',
                                'class'=>'form-control',
                                'label'=>false,
                                'data-validation' => 'required',
                                'data-validation-error-msg' => "Please enter username.",
                                ))?>
                            <span class="glyphicon glyphicon glyphicon-user form-control-feedback" aria-hidden="true"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <label>Password</label>
                            <?=$this->Form->input('USER_PASSWORD', array(
                                'type'=>'password',
                                'placeholder' => 'Password',
                                'class'=>'form-control',
                                'label'=>false,
                                'data-validation' => 'required',
                                'data-validation-error-msg' => "Please enter password.",
                            ))?>
                            <span class=" glyphicon glyphicon-lock form-control-feedback" aria-hidden="true"></span>
                        </div>
                        <?=$this->Form->button('<span class=" glyphicon glyphicon-lock"></span> &nbsp;&nbsp;Login', array('class' => 'btn primary-btn btn-block text-uppercase')); ?>
                     <?= $this->Form->end() ?>
                    <!-- \ Login Form / -->
                </div>
            </div>
        </div>
    </div>
</div>


<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
