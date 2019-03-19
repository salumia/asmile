<?php

namespace Modules\Client\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Client\Entities\ClassCode;
use Illuminate\Support\Facades\DB;

class FLClassCodesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //DB::table('class_codes')->truncate();
        $codes = explode("\n", file_get_contents(module_path('Client') . '/Database/Seeders/FLClassCodes.txt') );
        foreach($codes as $code_data) {
            $code = substr($code_data, 0, 4);
            $description = substr($code_data, 5);
            ClassCode::create([
                'state_id' => 12, // FL
                'class_code' => $code,
                'class_code_description' => $description
            ]);
        }
    }
}
