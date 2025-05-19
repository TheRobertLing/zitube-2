<?php

namespace App\Http\Controllers;

use App\Models\Dictionary;
use Illuminate\Http\Request;

class DictionaryController extends Controller
{
    public function get(Request $request)
    {
        $query = strtolower(trim($request->input("query")));

        if (!$query) {
            return response()->json([]);
        }

        // $parsed = parseSearch($query);
        // $column = $parsed['column'];
        // $term = $parsed['term'];

        // $allowed = ['pinyin', 'simplified', 'traditional'];
        // if (!in_array($column, $allowed)) {
        //     return response()->json(['error' => 'Invalid search prefix.'], 400);
        // }

        $results = Dictionary::where('simplified', $query)
            ->orWhere('traditional', $query)
            ->get(['traditional', 'simplified', 'pinyin', 'definitions', 'source']);

        return response()->json($results);
    }

}

