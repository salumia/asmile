<?php

namespace App\Http\Controllers;
use App\AdminUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller{
   
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(){
        return AdminUser::get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return 'create';
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        return AdminUser::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
       return  AdminUser::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        return 'edit';
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request,$id)
    {
        $input = $request->all();
        AdminUser::find($id)->update( $input );
        return  AdminUser::find($id);
    }

	public function changePassword(AdminUser $user, Request $request)
    {
        $data = $request->post();
		$user->password = Hash::make($data['new_password']);
		$user->save();
		return new Response([
			'message' => 'Password updated successfully',
			'user' => $user,
			'error' => false
		]);
    }
	
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}    
   
