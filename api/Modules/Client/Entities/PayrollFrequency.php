<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class PayrollFrequency extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $table = 'payroll_frequency';
    protected $fillable = [];
    protected $dates = ['deleted_at'];
}
