<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use App\Models\Ciudad;
use Illuminate\Http\Request;

class PaisController extends Controller
{
    public function index()
    {
        $paises = Pais::with('ciudades')->get();
        return response()->json($paises);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudades' => 'required|array',
            'ciudades.*.nombre' => 'required|string|max:255',
        ]);

        $pais = Pais::create(['nombre' => $validatedData['nombre']]);

        foreach ($validatedData['ciudades'] as $ciudadData) {
            $pais->ciudades()->create($ciudadData);
        }

        return response()->json($pais->load('ciudades'), 201);
    }

    public function show($id)
    {
        $pais = Pais::with('ciudades')->find($id);
        if (is_null($pais)) {
            return response()->json(['message' => 'País no encontrado'], 404);
        }
        return response()->json($pais);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudades' => 'required|array',
            'ciudades.*.nombre' => 'required|string|max:255',
        ]);

        $pais = Pais::find($id);
        if (is_null($pais)) {
            return response()->json(['message' => 'País no encontrado'], 404);
        }

        $pais->update(['nombre' => $validatedData['nombre']]);


        $pais->ciudades()->delete();


        foreach ($validatedData['ciudades'] as $ciudadData) {
            $pais->ciudades()->create($ciudadData);
        }

        return response()->json($pais->load('ciudades'));
    }


    public function destroy($id)
    {
        $pais = Pais::find($id);
        if (is_null($pais)) {
            return response()->json(['message' => 'País no encontrado'], 404);
        }
        $pais->delete();
        return response()->json(['message' => 'País eliminado'], 204);
    }
}
