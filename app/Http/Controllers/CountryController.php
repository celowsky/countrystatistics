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
        // Makes search string url-safe via plain Percent-Encoding instead of application/x-www-form-urlencoded
        // See, https://stackoverflow.com/questions/4744888/how-to-properly-url-encode-a-string-in-php
        $searchString = rawurlencode($request->getContent());

        $promises = [
            'countryName' => $client->requestAsync('GET', self::BASE_URL.'/name/'.$searchString),
            'countryFullName' => $client->requestAsync('GET', self::BASE_URL.'/name/'.$searchString, [
                'query' => ['fullName' => true],
            ]),
            'code' => $client->requestAsync('GET', self::BASE_URL.'/alpha/'.$searchString),
        ];

        // Waits for all requests to complete and throws a ConnectException if any requests fail.
        $results = Promise\unwrap($promises);

        // @TODO: Make sure to handle case where nothing is returned
        $countryNameResponse = json_decode($results['countryName']->getBody()->getContents(), true);
        $countryFullNameResponse = json_decode($results['countryFullName']->getBody()->getContents(), true);
        $codeResponse = json_decode($results['code']->getBody()->getContents(), true);

        // Build out a hashmap of countries already added to this API response as they are added to the response.
        // Lookup time is much faster than using in_array.
        $countries = [];
        $countryList = [];
        foreach ($countryNameResponse as $country) {
            $countryList[$country['name']] = true;
            $countries[] = [
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
        }

        // Add results from country full name query
        foreach ($countryFullNameResponse as $country) {
            if (!isset($countryList[$country['name']])) {
                $countryList[$country['name']] = true;
                $countries[] = [
                    'fullName' => $country['name'],
                    'alphaCode2' => $country['alpha2Code'],
                    'alphaCode3' => $country['alpha3Code'],
                    'flagImage' => $country['flag'],
                    'region' => $country['region'],
                    'subregion' => $country['subregion'],
                    'population' => $country['population'],
                    'languages' => array_map(function ($language) {
                        return $language['name'];
                    }, $country['languages']),
                ];
            }
        }

        // Add results from country code query
        if ($codeResponse != null) {
            if (!isset($countryList[$codeResponse['name']])) {
                $countryList[$codeResponse['name']] = true;
                $countries[] =
                    [
                        'fullName' => $codeResponse['name'],
                        'alphaCode2' => $codeResponse['alpha2Code'],
                        'alphaCode3' => $codeResponse['alpha3Code'],
                        'flagImage' => $codeResponse['flag'],
                        'region' => $codeResponse['region'],
                        'subregion' => $codeResponse['subregion'],
                        'population' => $codeResponse['population'],
                        'languages' => array_map(function ($language) {
                            return $language['name'];
                        }, $codeResponse['languages']),
                    ];
            }
        }
        usort($countries, function($a, $b) {
            return strcmp($a['fullName'], $b['fullName']);
        });

        // @TODO: Limit response size to 50
        return response()->json($countries);
    }
}
