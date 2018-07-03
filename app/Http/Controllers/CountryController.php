<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
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
        $response = [
            [
                'name' => 'Afghanistan',
                'alpha2Code' => 'AF',
                'alpha3Code' => 'AFG',
            ],
        ];


        $response = $client->request('GET', self::BASE_URL.'/name/'.$searchString);
        // @TODO: Make sure to handle case where nothing is returned
        $responseBody = json_decode($response->getBody()->getContents(), true);
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
        }, $responseBody);
        usort($countries, function($a, $b) {
            return strcmp($a['fullName'], $b['fullName']);
        });
        return response()->json($countries);
    }
}
