<?php
namespace Modules\Notification\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;

use Modules\Notification\Entities\Notification;
use App\User;
use App\VendorUser;

class NotificationController extends Controller
{
	private $user;
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
		return new Response(Notification::all());
    }
	
	public function userNotifications($user,$role='user') {
		$this->user = $user;
		$userNotifications = Notification::where([['user_id','=',$this->user],['role','=',$role]])->orderBy('id', 'DESC')->get();
		foreach($userNotifications as $notify){
			$notify->getReferenceData;
			//echo "<pre>";print_r($notify);
			if($notify->role == 'vendor'  && $notify->user_id == $notify->getReferenceData->sender_id){
				if($notify->getReferenceData->receiver_role == 'user'){
					$notify->get_sender_data = User::find($notify->getReferenceData->receiver_id);
				} else {
					$notify->get_sender_data = VendorUser::find($notify->getReferenceData->receiver_id);
				}			
			}elseif($notify->user_id == $notify->getReferenceData->receiver_id){
				$notify->get_sender_data = VendorUser::find($notify->getReferenceData->sender_id);				
			}
			
		}
		return new Response($userNotifications);
	}

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
		$data = $request->post();
		$notification = Notification::create($data);
        return new Response([
            'message' => 'Notification created successfully',
            'Notifications' => $notification
        ]);
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show(Notification $notification)
    {
        return new Response($notification);
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Notification $notification, Request $request)
    {
        // Load new data
        $data = $request->post();
        // Update data
        $notification->update($data);

        return new Response([
            'message' => 'Notification updated successfully',
			'Notifications' => $notification
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy(Notification $notification)
    {
        // Delete the Page
        try {
			$notification->delete();
        }
        catch(\Exception $e) {
            $response = new Response([
                'message' => $e->getMessage(),
                'Notifications' => $notification
            ]);
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            return $response;
        }

        return new Response([
            'message' => 'Notification deleted successfully',
            'Notifications' => $notification
        ]);
    }
	
	public function disableNotification($user, Request $request) {
        $data = $request->post();
		$role = $data['role'];
		$ref_id = $data['ref_id'];
		if($data['page'] != 'review'){
			Notification::whereIn('type',array('accept','reject','open'))
					->where([['user_id', '=', $user],['ref_id', '=', $ref_id],['role', '=', $role]])->update(array('is_viewed' => 1));
		} else {
			Notification::whereIn('type',array('review','sent'))
					->where([['user_id', '=', $user],['ref_id', '=', $ref_id],['role', '=', $role]])->update(array('is_viewed' => 1));
		}

        return new Response([
            'message' => 'Notifications Disabled'
        ]);
    }
}
