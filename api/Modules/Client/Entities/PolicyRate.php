<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class PolicyRate extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $fillable = ['location_name', 'net_rate', 'policy_id', 'class_code_id', 'state_id'];
    protected $dates = ['deleted_at'];

    public function policy() {
        return $this->belongsTo(Policy::class);
    }

    public function state() {
        return $this->belongsTo(State::class);
    }

    public function class_code() {
        return $this->belongsTo(ClassCode::class);
    }
}
