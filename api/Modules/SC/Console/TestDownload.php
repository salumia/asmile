<?php

namespace Modules\SC\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Sheets;
use Google_Service_Sheets_Request;
use Google_Service_Sheets_BatchUpdateSpreadsheetRequest;
use Illuminate\Support\Facades\Storage;
use Bnb\GoogleCloudPrint\Facades\GoogleCloudPrint;

class TestDownload extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'sc:testdownload';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test doc download';

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
        $fileId = '11w69AhUW3okCbKn5p9-NWzZtVYjfAc29oiD7ahxndRY';
        $printerId = '45b1fed4-2abf-ad58-80a8-07e8db1ae079';

        $client = $this->getClient();
        $driveService = new Google_Service_Drive($client);
        $sheetService = new Google_Service_Sheets($client);

        $response = $driveService->files->get($fileId);
        $file = $response->getBody();
        var_dump($file);

        exit;
        // Download PDF
        $response = $driveService->files->export($fileId, 'application/pdf', [
            'alt' => 'media'
        ]);
        $content = $response->getBody()->getContents();
        Storage::put("invoices/$fileId.pdf", $content);

        GoogleCloudPrint::asPdf()
            ->file(storage_path("app/invoices/$fileId.pdf"))
            ->printer($printerId)
            ->send();

        $this->info('Printed ' . storage_path("invoices/$fileId.pdf") . ' to ' . $printerId);
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
        return [];
    }

    private function getClient()
    {
        $client = new Google_Client();
        $client->setApplicationName('RPM Application');
        $client->setScopes([
            Google_Service_Drive::DRIVE,
            Google_Service_Drive::DRIVE_APPDATA,
            Google_Service_Drive::DRIVE_METADATA,
            Google_Service_Drive::DRIVE_FILE
        ]);
        $client->setAuthConfig(config_path('client_secret.json'));
        $client->setAccessType('offline');

        // Load previously authorized credentials from a file.
        $credentialsPath = config_path('credentials.json');
        if (file_exists($credentialsPath)) {
            $accessToken = json_decode(file_get_contents($credentialsPath), true);
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);

            // Store the credentials to disk.
            if (!file_exists(dirname($credentialsPath))) {
                mkdir(dirname($credentialsPath), 0700, true);
            }
            file_put_contents($credentialsPath, json_encode($accessToken));
            printf("Credentials saved to %s\n", $credentialsPath);
        }
        $client->setAccessToken($accessToken);

        // Refresh the token if it's expired.
        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
        }
        return $client;
    }
}
