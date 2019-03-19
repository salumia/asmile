<?php

namespace Modules\SC\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

use Bnb\GoogleCloudPrint\Facades\GoogleCloudPrint;

class TestPrint extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'sc:testprint';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test G Cloud Print';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $printerId = '45b1fed4-2abf-ad58-80a8-07e8db1ae079';
        $args = $this->arguments();
        $filename = $args['file'];

        GoogleCloudPrint::asPdf()
            ->file('storage/' . $filename)
            ->printer($printerId)
            ->send();

        $this->info('Printed ' . $filename . ' to ' . $printerId);
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['file', InputArgument::REQUIRED, 'Filename (in /storage)'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [

        ];
    }
}
