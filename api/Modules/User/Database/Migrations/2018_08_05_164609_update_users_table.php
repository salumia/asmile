<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
			$table->string('phone',15)->after('email');
			$table->string('alt_phone',15)->after('phone');
			$table->string('correspondence_address',255)->after('alt_phone');			
			$table->string('permanent_address',255)->after('correspondence_address');
			$table->string('father_name',255)->after('permanent_address');
			$table->string('mother_name',255)->after('father_name');			
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('', function (Blueprint $table) {
			$table->dropColumn('phone');
			$table->dropColumn('alt_phone');
			$table->dropColumn('correspondence_address');
			$table->dropColumn('permanent_address');
			$table->dropColumn('father_name');
			$table->dropColumn('mother_name');
        });
    }
}
