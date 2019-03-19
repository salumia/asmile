<?php

namespace Modules\Client\Console;

use Illuminate\Console\Command;
use Modules\Client\Entities\Client;
use Modules\Client\Entities\Policy;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class MigratePolicies extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'rpm:migratepolicies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate policies from old table data';

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
        $clients = Client::all()
            ->where('is_active', '=', 1)
            ->where('policy_number', '<>', '');
        foreach($clients as $client) {
            $this->info('Client #' . $client->id . ', Policy #' . $client->policy_number);

            // Determine policy status
            $status = 'inactive';
            $effective = strtotime($client->effective_date);
            $end = strtotime($client->effective_date . "+1 year");
            while($end <= time())
                $end += 525600; // Keep advancing 1 year until  in the future

            Policy::create([
                'client_id' => $client->id,
                'carrier_id' => $client->carrier ? $client->carrier : 0,
                'policy_number' => $client->policy_number,
                'effective_date' => date('Y-m-d', $effective),
                'end_date' => date('Y-m-d', $end),
                'status' => 'active'
            ]);
        }
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
        ];
    }
}
