<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Carrier extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $table = 'carrier';
    protected $fillable = [];
    protected $dates = ['deleted_at'];
}
