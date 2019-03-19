<?php

namespace Modules\Client\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Client\Database\Seeders\SeedStatesTableSeeder;

class ClientDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //$this->call(SeedStatesTableSeeder::class);
        $this->call(FLClassCodesTableSeeder::class);
    }
}
