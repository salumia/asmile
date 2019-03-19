<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Contact extends Model
{
    use RevisionableTrait;
    protected $fillable = ['name','role','email','phone','client_id','ref_id','type'];
}
