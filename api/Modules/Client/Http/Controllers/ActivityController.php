<?php

namespace Modules\Client\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Client\Entities\Activity;


class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {		
		// Load params
        $client_id = $_GET['client_id'];
        $filter = $_GET['filter'];

        $activity = Activity::where('client_id', $client_id);
		if(!empty($filter)){
			$filters = explode(',',$filter);
			$activity = $activity->whereIn('type',$filters)
                ->orderBy('id', 'desc')->get();
		} else {
            $activity = $activity->orderBy('id', 'desc')->get();
        }

		foreach($activity as $item) {
		    $item->user;
        }
		return new Response($activity);
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
		$data = $request->post();
        $activity = Activity::create($data);

        return new Response([
            'message' => 'Activity created successfully',
            'activity' => $activity
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
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
