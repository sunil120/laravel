@extends('layouts.app')
@section('title','Book');

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">{{$book->name}}</div>

                <div class="panel-body">
                        <div class="alert alert-success">
                            {{ $book->description }}
                        </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
