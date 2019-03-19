<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class PayrollCompany extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $fillable = [];
    protected $dates = ['deleted_at'];
}
