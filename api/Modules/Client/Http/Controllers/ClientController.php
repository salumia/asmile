<?php

namespace Modules\Client\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;

use Modules\Client\Entities\Client;
use Modules\Client\Entities\State;
use Modules\Client\Entities\PayrollCompany;
use Modules\Client\Entities\Contact;
use Modules\Client\Entities\Worklist;

class ClientController extends Controller
{
    //<editor-fold desc="CRUD Operations">
    /**
     *  *** LIST ***
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // Load params
        $q = $_GET['q'];
        $filter = $_GET['filter'];

        // Default (return all)
        if(!$q && !$filter)
            return new Response(Client::all());

        // Setup query
        if($q) {
            $client = Client::where(function ($query) use ($q) {
                $query->where('company_name', 'LIKE', "%{$q}%")
                    ->orWhere('contact', 'LIKE', "%{$q}%")
                    ->orWhere('address', 'LIKE', "%{$q}%")
                    ->orWhere('city', 'LIKE', "%{$q}%")
                    ->orWhere('state', 'LIKE', "%{$q}%")
                    ->orWhere('zip', 'LIKE', "%{$q}%")
                    ->orWhere('phone', 'LIKE', "%{$q}%")
                    ->orWhere('email', 'LIKE', "%{$q}%")
                    ->orWhere('policy_number', 'LIKE', "%{$q}%");
            });

            // Setup filters
            switch($filter) {
                case 'active':
                    $client = $client->where('is_active', 1);
                    break;

                case 'inactive':
                    $client = $client->where('is_active', 0);
                    break;

                case 'new':
                    $date = Carbon::today()->subDays(30);
                    $client = $client->where('created_at', '>=', date($date));
            }
        } else {
            // Setup filters
            switch($filter) {
                case 'active':
                    $client = Client::where('is_active', 1);
                    break;

                case 'inactive':
                    $client = Client::where('is_active', 0);
                    break;

                case 'new':
                    $date = Carbon::today()->subDays(30);
                    $client = Client::where('created_at', '>=', date($date));
                    break;

                default:
                    $client = new Client();
            }
        }

        // Return filtered results
        $clients = $client->get();
        foreach($clients as $the_client) {
            $the_client->activePolicy = $the_client->activePolicy();
            $the_client->payroll_company_data;
        }
        return new Response($clients);
    }

    /**
     *  *** CREATE ***
     * Store a newly created resource in storage.
     *
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $data = $request->post();
        $client = Client::create($data);

        return new Response([
            'message' => 'Client created successfully',
            'client' => $client
        ]);
    }

    /**
     *  *** RETRIEVE ***
     * Show the specified resource.
     *
     * @param  Client $client
     * @return Response
     */
    public function show(Client $client)
    {
        $client->policies;
		$client->payroll_rep_data;
        $client->payroll_company_data;
        $client->worklist_data;
        $client->activePolicy = $client->activePolicy();
        return new Response($client);
    }

    /**
     *  *** UPDATE ***
     * Update the specified resource in storage.
     *
     * @param  Client $client
     * @param  Request $request
     * @return Response
     */
    public function update(Client $client, Request $request)
    {
        // Load new data
        $data = $request->post();
        // Update data
        $client->update($data);

        return new Response([
            'message' => 'Client updated successfully',
			'client' => $client
        ]);
    }

    /**
     *  *** DELETE ***
     * Remove the specified resource from storage.
     *
     * @param  Client $client
     * @return Response
     */
    public function destroy(Client $client)
    {
        // Delete the client
        try {
            $client->delete();
        }
        catch(\Exception $e) {
            $response = new Response([
                'message' => $e->getMessage(),
                'client' => $client
            ]);
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $response;
        }

        return new Response([
            'message' => 'Client updated successfully',
            'client' => $client
        ]);
    }
    //</editor-fold>

    //<editor-fold desc="Utility Operations">
    /**
     * Retrieve stats for dashboard page
     *
     * @return Response
     */
    public function getClientStats() {
        $date = Carbon::today()->subDays(30);
        $newClients = Client::where('created_at', '>=', date($date))->count();
        $activeClients = Client::where('is_active', 1)->count();
        $inactiveClients = Client::where('is_active', 0)->count();

        return new Response([
            'new' => $newClients,
            'active' => $activeClients,
            'inactive' => $inactiveClients
        ]);
    }
    //</editor-fold>

	/**
     * Retrieve states
     *
     * @return Response
     */
    public function getStates() {
        return new Response(State::select('code as value', 'name as label')->get());
    }

	/**
     * Retrieve payroll companies
     *
     * @return Response
     */
    public function getPayrollCompanies() {
        return new Response(PayrollCompany::select('id as value', 'payroll_company_name as label')->get());
    }

	/**
     * Retrieve payroll contacts
     *
     * @return Response
     */
    public function getContacts() {
		$id = $_GET['id'];
        return new Response(Contact::select('id as value', 'name as label')->where('client_id',$id)->get());
    }

	/**
     * Retrieve worklist
     *
     * @return Response
     */
    public function getWorkList() {
        return new Response(Worklist::select('id as value', 'name as label')->get());
    }
	
	public function verifyOrderId() {
        return new Response([
            'data' => $_GET,
            'orderId' => 1
        ]);
		//return '';
    }
}
