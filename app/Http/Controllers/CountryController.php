<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    const BASE_URL = '/rest/v2';
    /**
     * @var Client
     */
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://restcountries.eu/rest/v2',
        ]);
    }

    public function index()
    {
        return view('welcome');
    }

    public function searchForCountry(Request $request)
    {
        $client = $this->client;
        $searchString = $request->getContent();

        $promises = [
            'countryName' => $client->requestAsync('GET', self::BASE_URL.'/name/'.$searchString),
            'code' => $client->requestAsync('GET', self::BASE_URL.'/alpha/'.$searchString),
        ];

        // Waits for all requests to complete and throws a ConnectException if any requests fail.
        $results = Promise\unwrap($promises);

        // @TODO: Make sure to handle case where nothing is returned
        $countryNameResponse = json_decode($results['countryName']->getBody()->getContents(), true);
        $codeResponse = json_decode($results['code']->getBody()->getContents(), true);
        $countries = array_map(function($country) {
            return [
                'fullName' => $country['name'],
                'alphaCode2' => $country['alpha2Code'],
                'alphaCode3' => $country['alpha3Code'],
                'flagImage' => $country['flag'],
                'region' => $country['region'],
                'subregion' => $country['subregion'],
                'population' => $country['population'],
                'languages' => array_map(function($language) {
                    return $language['name'];
                }, $country['languages']),
            ];
        }, $countryNameResponse);

        // Add results from country code query
        if ($codeResponse != null) {
            $countries[] =
                [
                    'fullName' => $codeResponse['name'],
                    'alphaCode2' => $codeResponse['alpha2Code'],
                    'alphaCode3' => $codeResponse['alpha3Code'],
                    'flagImage' => $codeResponse['flag'],
                    'region' => $codeResponse['region'],
                    'subregion' => $codeResponse['subregion'],
                    'population' => $codeResponse['population'],
                    'languages' => array_map(function($language) {
                        return $language['name'];
                    }, $codeResponse['languages']),
                ];
        }
        usort($countries, function($a, $b) {
            return strcmp($a['fullName'], $b['fullName']);
        });
        return response()->json($countries);
    }
}
