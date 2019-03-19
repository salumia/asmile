<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leaves', function (Blueprint $table) {
            $table->increments('id');
			$table->string('leave_type',50);
			$table->string('reason',255);
			$table->date('from_date')->nullable();
			$table->string('from_day_type',20);
            $table->date('to_date')->nullable();
			$table->string('to_day_type',20);	
			$table->string('status',20);			
			$table->integer('user_id');
			$table->integer('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('leaves');
    }
}
