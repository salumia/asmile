<?php

namespace Modules\Client\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Client\Entities\Policy;

class PolicyController extends Controller
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
        return new Response(Policy::all());
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
        $policy = Policy::create($data);

        return new Response([
            'message' => 'Policy created successfully',
            'policy' => $policy
        ]);
    }

    /**
     *  *** RETRIEVE ***
     * Show the specified resource.
     *
     * @param  Policy $policy
     * @return Response
     */
    public function show(Policy $policy)
    {
        $policy->carrier;
        $policy->rates;
        foreach($policy->rates as $rate) {
            $rate->state;
            $rate->class_code;
        }
        return new Response($policy);
    }

    /**
     *  *** UPDATE ***
     * Update the specified resource in storage.
     *
     * @param  Policy $policy
     * @param  Request $request
     * @return Response
     */
    public function update(Policy $policy, Request $request)
    {
        // Load new data
        $data = $request->post();

        // Massage data

        // Update data
        $policy->update($data);

        return new Response([
            'message' => 'Policy updated successfully',
            'policy' => $policy
        ]);
    }

    /**
     *  *** DELETE ***
     * Remove the specified resource from storage.
     *
     * @param  Policy $policy
     * @return Response
     */
    public function destroy(Policy $policy)
    {
        // Delete the policy
        try {
            $policy->delete();
        }
        catch(\Exception $e) {
            $response = new Response([
                'message' => $e->getMessage(),
                'policy' => $policy
            ]);
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $response;
        }

        return new Response([
            'message' => 'Policy deleted successfully',
            'policy' => $policy
        ]);
    }
    //</editor-fold>
}
