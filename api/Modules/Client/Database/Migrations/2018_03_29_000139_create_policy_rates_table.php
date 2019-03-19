<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePolicyRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('policy_rates', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('policy_id');
            $table->integer('state_id');
            $table->string('location_name');
            $table->integer('class_code_id');
            $table->decimal('net_rate');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('policy_rates');
    }
}
