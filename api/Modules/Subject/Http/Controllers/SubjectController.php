<?php

namespace Modules\Subject\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Subject\Entities\Subject;
use Modules\Subject\Entities\StudentSubjects;

class SubjectController extends Controller
{
	private $user;
	private $query;
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
	
	public function getStudentSubjects($id){
		
		$data = StudentSubjects::where('student_id','=',$id)->get();
		foreach($data as $item){
			$item->getSubjectData;
		}

		return new Response($data);
	}
		
	public function subjectSuggestionList($id,$query) {
		$this->user = $id;
		$this->query = $query;
		
		$users = Subject::select('name as label', 'id as value')
				->whereNotIn('id',function($query){
					   $query->select('subject_id')->from('student_subjects')->where('student_id',$this->user);
					})
				->where([['name',"like",'%'.$this->query.'%']])
				->get();
		return new Response($users);
    }
	
	public function assignSubject(Request $request) {
		$data = $request->post();
		$data = StudentSubjects::create($data);

        return new Response([
            'message' => 'Subject assigned successfully',
            'data' => $data
        ]);
    }
	
	public function deleteSubject( $StudentSubject)
    {
		 // Delete the Page
		try {
			$StudentSubject = StudentSubjects::find($StudentSubject);
			$StudentSubject->delete();
		}
		catch(\Exception $e) {
			$response = new Response([
				'message' => $e->getMessage(),
				'data' => $StudentSubject
			]);
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}

		return new Response([
			'message' => 'Subject removed successfully',
			'data' => $StudentSubject
		]);      
    }
}
