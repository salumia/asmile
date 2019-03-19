<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Policy extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $fillable = ['client_id', 'carrier_id', 'policy_number', 'effective_date', 'end_date', 'reinstatement_date', 'status'];
    protected $dates = ['deleted_at'];

    public function carrier() {
        return $this->belongsTo(Carrier::class);
    }

    public function rates() {
        return $this->hasMany(PolicyRate::class);
    }
}
