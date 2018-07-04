<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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

        // Waits for all requests to complete, even if some fail
        $results = Promise\settle($promises)->wait();

        // If all requests failed, make sure to send back a response indicating no results were found
        $promiseStates = array_map(function($promise) {
            return $promise['state'];
        }, $results);
        $rejectCount = 0;
        foreach ($promiseStates as $state) {
            if ($state === 'rejected') {
                $rejectCount++;
            }
        }
        if ($rejectCount >= 3) {
            return response()->json('No results found for search "'.$request->getContent().'"', Response::HTTP_NOT_FOUND);
        }

        $countryNameResponse = $results['countryName']['state'] === 'fulfilled' ? json_decode($results['countryName']['value']->getBody()->getContents(), true) : [];
        $countryFullNameResponse = $results['countryFullName']['state'] === 'fulfilled' ? json_decode($results['countryFullName']['value']->getBody()->getContents(), true) : [];
        $codeResponse = $results['code']['state'] === 'fulfilled' ? json_decode($results['code']['value']->getBody()->getContents(), true) : [];

        // Build out a hashmap of countries already added to this API response as they are added to the response.
        // Lookup time is much faster than using in_array.
        $countryList = [];

        $statistics = [
            'totalNumberOfCountries' => 0,
            'regions' => [],
            'subregions' => [],
        ];

        $countries = [];
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

            // Calculate number of occurences for region
            if (!isset($statistics['regions'][$country['region']])) {
                $statistics['regions'][$country['region']] = 0;
            } else {
                $statistics['regions'][$country['region']] += 1;
            }

            // Calculate number of occurences for subregion
            if (!isset($statistics['subregions'][$country['subregion']])) {
                $statistics['subregions'][$country['subregion']] = 0;
            } else {
                $statistics['subregions'][$country['subregion']] += 1;
            }
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

            // Calculate number of occurences for region
            if (!isset($statistics['regions'][$country['region']])) {
                $statistics['regions'][$country['region']] = 0;
            } else {
                $statistics['regions'][$country['region']] += 1;
            }

            // Calculate number of occurences for subregion
            if (!isset($statistics['subregions'][$country['subregion']])) {
                $statistics['subregions'][$country['subregion']] = 0;
            } else {
                $statistics['subregions'][$country['subregion']] += 1;
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

            // Calculate number of occurrences for region
            if (!isset($statistics['regions'][$codeResponse['region']])) {
                $statistics['regions'][$codeResponse['region']] = 0;
            } else {
                $statistics['regions'][$codeResponse['region']] += 1;
            }

            // Calculate number of occurrences for subregion
            if (!isset($statistics['subregions'][$codeResponse['subregion']])) {
                $statistics['subregions'][$codeResponse['subregion']] = 0;
            } else {
                $statistics['subregions'][$codeResponse['subregion']] += 1;
            }
        }

        // Sort countries alphabetically by full name
        // @TODO: Sort countries by population if name matches (not sure what they mean with "sorted by name and population"
        usort($countries, function($a, $b) {
            return strcmp($a['fullName'], $b['fullName']);
        });

        // Limit number of countries in response to 50
        $limitedCountries = array_slice($countries, 0, 50);
        $statistics['totalNumberOfCountries'] = count($limitedCountries);

        $responseData = [
            'countries' => $limitedCountries,
            'statistics' => $statistics,
        ];
        return response()->json($responseData);
    }
}
