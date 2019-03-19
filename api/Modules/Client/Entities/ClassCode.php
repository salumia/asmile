<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ClassCode extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $fillable = ['state_id', 'class_code', 'class_code_description'];
    protected $dates = ['deleted_at'];
}
