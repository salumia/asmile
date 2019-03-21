<?php

namespace Modules\Subject\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Subject\Entities\Subject;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
		return new Response(Subject::all());
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
		$data = $request->post();
        $subject = Subject::create($data);

        return new Response([
            'message' => 'Subject created successfully',
            'subjects' => $subject
        ]);
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show(Subject $subject)
    {
        return new Response($subject);
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Subject $subject, Request $request)
    {
        // Load new data
        $data = $request->post();
        // Update data
        $subject->update($data);

        return new Response([
            'message' => 'Subject updated successfully',
			'subjects' => $subject
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy(Subject $subject)
    {
		 // Delete the Page
		try {
			$subject->delete();
		}
		catch(\Exception $e) {
			$response = new Response([
				'message' => $e->getMessage(),
				'subjects' => $subject
			]);
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}

		return new Response([
			'message' => 'Subject deleted successfully',
			'subjects' => $subject
		]);      
    }
	
	public function disableSubject(Subject $subject) {
        // Disable Subject
        $subject->status = 0;
        $subject->save();

        return new Response([
            'message' => 'Subject Disabled',
            'Subject' => $subject
        ]);
    }
	
    public function enableSubject(Subject $subject) {
        // Disable Subject
        $subject->status = 1;
        $subject->save();

        return new Response([
            'message' => 'Subject Enabled',
            'subject' => $subject
        ]);
    }
	
	public function getSubjectArray(Request $request)
    {
       return new Response(Subject::select('id as value', 'name as label')->get());
    }
}
