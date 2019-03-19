<?php

namespace Modules\Client\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Client\Entities\Contact;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {		
		$client_id = $_GET['client_id'];
		return new Response(Contact::where('client_id',$client_id)->get());
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create(Request $request)
    {
       
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
		$data = $request->post();
        $contact = Contact::create($data);

        return new Response([
            'message' => 'Contact created successfully',
            'contact' => $contact
        ]);
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('client::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit(Request $request)
    {
        return view('client::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Contact $contact, Request $request)
    {
		// Load new data
        $data = $request->post();

        // Update data
		$contact->update($data);

        return new Response([
            'message' => 'Contact updated successfully',
			'contact'=>$contact
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy(Contact $contact)
    {
        // Delete the contact
        try {
            $contact->delete();
        }
        catch(\Exception $e) {
            $response = new Response([
                'message' => $e->getMessage(),
                'contact' => $contact
            ]);
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $response;
        }

        return new Response([
            'message' => 'Contact deleted successfully',
            'contact' => $contact
        ]);
    }
	
	/**
     * Store a multiple resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function saveContacts(Request $request)
    {
		$data = $request->post();
		foreach($data as $key=>$row){
			$row['created_at'] = $row['updated_at'] = date('Y-m-d H:i:s');
			$data[$key] = $row;
		}		
		Contact::insert($data);
        return new Response([
            'message' => 'Contacts added successfully',
        ]);
    }
	
	/**
     * Check Email Already Exist in DB
     * @param  Request $request
     * @return Response
     */
    public function checkIfEmailExist(Request $request)
    {
		$data = $request->post();
		return new Response(Contact::where([['email','=',$data['email']],['id','!=',$data['id']],['type','=',$data['type']]])->count());
    }
}
