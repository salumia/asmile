<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Modules\Client\Console\MigratePolicies;
use Modules\SC\Console\GenAngModel;
use Modules\SC\Console\TestPrint;
use Modules\SC\Console\TestDownload;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->commands([
            GenAngModel::class,
            MigratePolicies::class,
            TestPrint::class,
            TestDownload::class
        ]);
    }
}
