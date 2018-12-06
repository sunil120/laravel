<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests;
use Auth;
use Session;
use App\Department;
use App\User;

class UserController extends Controller
{
    
    public function __construct() {
        $this->middleware('auth')->except(['login']);
    }
    
    public function add(Request $request) {
        
        if(!empty($request->input())) {
            $user = new User();
            $user->first_name =  $request->first_name;
            $user->last_name =  $request->last_name;
            $user->gender =  $request->gender;
            $user->email =  $request->email;
            $user->password =  bcrypt($request->password);
            
            dd($user); die;
        }
        $department = Department::where(['status'=>1])->pluck('name','id')->toArray();
        return view('User.add',['departments'=>$department]);
    }

    public function login(Request $request) {
        
        if(!empty($request->input())) {
            $validator =  Validator::make($request->input(), [
                'USER_LOGINNAME' => 'required|string|max:50',
                'USER_PASSWORD' => 'required|string|max:50',
            ]);
            $validator->setAttributeNames(['USER_LOGINNAME'=>'Username','USER_PASSWORD'=>'Password']);
            if ($validator->fails()) {
                return Redirect::to('login')->withErrors($validator);
            } else {
                $userdata = ['email'=>$request->input('USER_LOGINNAME'),'password'=>$request->input('USER_PASSWORD')];
                if (Auth::attempt($userdata)) {
                    return Redirect::to('dashboard');
                } else {
                    Session::flash('alert-danger', 'Your username or password is incorrect.');
                    //Session::flash('alert-warning', 'warning');
                    //Session::flash('alert-success', 'success');
                    //Session::flash('alert-info', 'info');
                    return Redirect::to('login');
                }
            }
        } 
        return view('User.login');
    }
    
    public function logout() {
        Auth::logout();
        return Redirect::to('login');
    }
}
