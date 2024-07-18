<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use Illuminate\Http\Request;

class CiudadController extends Controller
{
    public function index()
    {
        $ciudades = Ciudad::with('pais')->get();
        return response()->json($ciudades);
    }

    public function store(Request $request)
    {
        $ciudad = Ciudad::create($request->all());
        return response()->json($ciudad, 201);
    }

    public function show($id)
    {
        $ciudad = Ciudad::with('pais')->find($id);
        if (is_null($ciudad)) {
            return response()->json(['message' => 'Ciudad no encontrada'], 404);
        }
        return response()->json($ciudad);
    }

    public function update(Request $request, $id)
    {
        $ciudad = Ciudad::find($id);
        if (is_null($ciudad)) {
            return response()->json(['message' => 'Ciudad no encontrada'], 404);
        }
        $ciudad->update($request->all());
        return response()->json($ciudad);
    }

    public function destroy($id)
    {
        $ciudad = Ciudad::find($id);
        if (is_null($ciudad)) {
            return response()->json(['message' => 'Ciudad no encontrada'], 404);
        }
        $ciudad->delete();
        return response()->json(['message' => 'Ciudad eliminada'], 204);
    }
}
