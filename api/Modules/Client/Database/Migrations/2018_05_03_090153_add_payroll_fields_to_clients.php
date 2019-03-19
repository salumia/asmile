<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPayrollFieldsToClients extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->integer('payroll_rep')->after('worklist');
            $table->string('payroll_frequency',50)->after('payroll_rep');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->removeColumn('payroll_rep');
            $table->removeColumn('payroll_frequency');
        });
    }
}
