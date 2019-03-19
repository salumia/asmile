<?php

namespace Modules\Admin\Http\Controllers;
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
        $data = $request->post();
		$data['password'] = Hash::make($data['password']);
        $user = AdminUser::create($data);

        return new Response([
            'message' => 'Admin created successfully',
            'user' => $user
        ]);
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
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($user, Request $request)
    {
		$user = AdminUser::find($user);
        // Load new data
        $data = $request->post();
        // Massage data
        unset($data['api_token_expires']);
        // Update data
        $user->update($data);

        return new Response([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
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
   
