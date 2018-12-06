@extends('layouts.default')

@section('content')
{{ Form::open(array('id'=>'add_csis_rule_frm', 'url'=>'user/add','enctype'=>'multipart/form-data','novalidate')) }}
<!--<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12">
            <div class="duplicateManagerCntr add-csis-rules-cntr">                
                <div class="manageHeader">-->
                    <h4>Add User</h4>
                </div>
                <div class="rulesCntr">
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="course-parent-wrapper">
                                <div class="course-child-block">
                                    <div class="row">
                                        <div class="form-group col-sm-6">
                                            <label>First Name<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                <?php echo Form::text('first_name', null, [
                                                    'class' => 'form-control', 
                                                    'empty'=>'Select',
                                                    'data-validation'=>'required', 
                                                    'hiddenField'=>false,
                                                    'placeholder'=>'First Name'
                                                ]
                                                ); ?>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-6">
                                            <label>Last Name<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                <?php echo Form::text('last_name', null, [
                                                    'class' => 'form-control', 
                                                    'empty'=>'Select',
                                                    'data-validation'=>'required', 
                                                    'hiddenField'=>false,
                                                    'placeholder'=>'Last Name'
                                                ]); ?>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="form-group col-sm-6">
                                            <label>Email<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                <?php echo Form::text('email', null, [
                                                    'class' => 'form-control', 
                                                    'empty'=>'Select',
                                                    'data-validation'=>'required', 
                                                    'hiddenField'=>false,
                                                    'placeholder'=>'Email Address'
                                                ]
                                                ); ?>
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-6">
                                            <label>Password<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                <?php 
                                                echo Form::password('password', [
                                                    'type'=>'password',
                                                    'class' => 'form-control', 
                                                    'empty'=>'Select',
                                                    'data-validation'=>'required', 
                                                    'hiddenField'=>false,
                                                    'placeholder'=>'Password'
                                                ]); 
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="form-group col-sm-6">
                                            <label>Gender<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                <?php echo Form::radio('gender', 'male'); ?> Male
                                                <?php echo Form::radio('gender', 'female'); ?> Female
                                                <?php echo Form::radio('gender', 'transgender'); ?> Transgender
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-6">
                                            <label>Department<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                @foreach($departments as $key => $value)
                                                    {{ Form::checkbox('department[]',$key) }} {{ $value }}
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="form-group col-sm-6">
                                            <label>Status<span class="asterix">*</span></label>
                                            <div class="custom-selection-block" id="process_id_section">
                                                <?php echo Form::select('status', ['0'=>'Inactive','1'=>'Active'],'1',['class'=>'form-control']); ?> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="text-center">
                                <button type="submit" class="btn primary-btn text-capitalize latoregular supervisor-button">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>    
           </div>
        </div>
    </div>    
</div>
{{ @Form::close() }}
@endsection
