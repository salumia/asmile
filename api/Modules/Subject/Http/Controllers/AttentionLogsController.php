<?php

namespace Modules\Subject\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Subject\Entities\AttentionLog;

class AttentionLogsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
		return new Response(AttentionLog::all());
    } 
	
	public function getSubjectSessions($id,$subject)
    {
		$logs = AttentionLog::select('subject_id', 'page_url','data','created_at')
				->where([['student_id','=',$id],['subject_id','=',$subject]])
				->orderBy('id', 'DESC')
				->get();
		return new Response($logs);
    }
	
	/**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
		$data = $request->post();
        $attention = AttentionLog::create($data);

        return new Response([
            'message' => 'Student attention saved successfully',
            'data' => $attention
        ]);
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show(AttentionLog $attention)
    {
        return new Response($attention);
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(AttentionLog $attention, Request $request)
    {
        // Load new data
        $data = $request->post();
        // Update data
        $attention->update($data);

        return new Response([
            'message' => 'AttentionLog updated successfully',
			'data' => $attention
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy(AttentionLog $attention)
    {
		 // Delete the Page
		try {
			$attention->delete();
		}
		catch(\Exception $e) {
			$response = new Response([
				'message' => $e->getMessage(),
				'attention' => $attention
			]);
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}

		return new Response([
			'message' => 'attention deleted successfully',
			'attention' => $attention
		]);      
    }
}