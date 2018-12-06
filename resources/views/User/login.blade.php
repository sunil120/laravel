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
                          @if(Session::has('alert-danger'))
                          <div class="alert alert-danger flash_fade" onclick="this.classList.add('hidden')">{{ Session::get('alert-danger') }}</div>
                          @endif
                        <div class="form-group has-feedback">
                            {{ Form::label('USER_LOGINNAME', 'Username') }}
                            {{ Form::text('USER_LOGINNAME',null, 
                            array(
                                'placeholder' => 'Email',
                                'class'=>'form-control',
                                'data-validation' => 'required',
                                'data-validation-error-msg' => "Please enter username.",
                                ))
                            }}
                            <span class="glyphicon glyphicon glyphicon-user form-control-feedback" aria-hidden="true"></span>
                            @if ($errors->has('USER_LOGINNAME'))
                                <span class="help-block form-error error-color">{{ $errors->first('USER_LOGINNAME') }}.</span>
                            @endif
                        </div>
                        <div class="form-group has-feedback">
                            <?php 
                            echo Form::label('USER_PASSWORD', 'Password');
                            echo Form::password('USER_PASSWORD',array(
                                'type'=>'password',
                                'placeholder' => 'Password',
                                'class'=>'form-control',
                                'data-validation' => 'required',
                                'data-validation-error-msg' => "Please enter password.",
                            )); ?>
                            <span class=" glyphicon glyphicon-lock form-control-feedback" aria-hidden="true"></span>
                            @if ($errors->has('USER_LOGINNAME'))
                                <span class="help-block form-error error-color">{{ $errors->first('USER_PASSWORD') }}.</span>
                            @endif
                        </div>
                        <?php echo Form::button('<span class=" glyphicon glyphicon-lock"></span> &nbsp;&nbsp;Login', array('class' => 'btn primary-btn btn-block text-uppercase','type'=>'submit')); ?>
                    {{ Form::close() }}
                    <!-- \ Login Form / -->
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
