<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('table/{number?}','TableController@create')->where('number','[0-9]+');
Route::resource('book', 'BookController');
Route::match(['get', 'post'],'login', array('as' => 'login','uses' => 'UserController@login'));
Route::match(['get', 'post'],'user/add', array('uses' => 'UserController@add'));
Route::get('dashboard', array('uses' => 'DashboardController@index'));
Route::get('logout', array('uses' => 'UserController@logout'));