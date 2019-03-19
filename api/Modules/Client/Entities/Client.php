<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Client extends Model
{
    use SoftDeletes;
    use RevisionableTrait;

    protected $fillable = [
        'company_name',
		'other_names',
        'token_id',
        'contact',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'rc_fax',
        'email',
        'fein',
        'policy_number',
        'carrier',
        'insurance_agency',
        'agent',
        'effective_date',
        'payroll_company',
        'client_contact_sheet',
        'filename',
        'cc1',
        'cc2',
        'cc3',
        'associated_company',
        'is_active',
        'net_rate',
        'agent_phone',
        'notes',
        'rpm_admin_fee',
        'worklist',
        'payroll_rep',
        'payroll_frequency'
    ];
    protected $dates = ['deleted_at'];

    public function policies() {
        return $this->hasMany(Policy::class);
    }

    public function activePolicy() {
        $policy = Policy::where('client_id', $this->id)->where('status', 'active')->first();
        if($policy) {
            $policy->carrier;
            $policy->rates;
            foreach($policy->rates as $rate) {
                $rate->policy;
                $rate->state;
                $rate->class_code;
            }
        }
        return $policy;
    }

    public function payroll_company_data() {
        return $this->belongsTo(PayrollCompany::class, 'payroll_company');		
    }

    public function payroll_frequency() {
        return $this->hasOne(PayrollFrequency::class);
    }
	
	public function payroll_rep_data() {
        return $this->hasOne(Contact::class, 'id', 'payroll_rep');
    }	
	
	public function worklist_data() {
        return $this->hasOne(Worklist::class, 'id', 'worklist');
    }
}
