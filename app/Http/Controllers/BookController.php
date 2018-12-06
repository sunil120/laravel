<?php

namespace App\Http\Controllers;

use App\Book;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Middleware\CheckYear;
use Illuminate\Support\Facades\Redis;
use App\Http\Controllers\Cache;

class BookController extends Controller
{
    /**

    * Constructor.

    *

    * @return void

    */
   public function __construct() {
       $this->middleware(CheckYear::class);
   }

      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $books = Book::all()->toArray();
        $users = DB::select('select * from users where id = ?', [1]);
        Redis::set('name', 'Taylor');
        $values = Redis::lrange('names', 5, 10);
        echo "<pre>"; print_r($item = Cache::get('key')); die;
        echo "<pre>"; print_r(Redis::get('names')); die;
        $id = 1;
        $user = Redis::get('users:id:'.$id);
        print_r($user); die;
        echo "<pre>"; print_r($users); die;
        pr($users); die;
        return view('home');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //echo $this->CheckYear->handle(2015);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $books = new Books();
        $books->name = $request->name;
        $books->category = $request->category;
        $books->category = $request->category;
        if($books->save()){
            return true;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        $users = DB::select('select * from users where active = ?', [1]);
        pr($users); die;
        return view('Book.book',['book' => $book]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        //
    }
}
