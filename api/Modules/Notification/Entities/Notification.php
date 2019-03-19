<?php

namespace Modules\Notification\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Contract\Entities\Contract;

use App\User;
use App\VendorUser;

class Notification extends Model
{
    protected $fillable = [
		'module',
		'type',
		'user_id',
		'role',
		'ref_id',
		'is_viewed'
	];	
	
	public function getReferenceData() {
        return $this->belongsTo(Contract::class,'ref_id');
    }
}