<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IdeaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ideas = Idea::with('user')->latest()->get();
        if ($ideas->isEmpty()) {
            return response()->json(['message' => 'Nenhuma idéia encontrada.'], 404);
        }
        return response()->json($ideas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([

            "title" => "required|string|max:255",
            "description" => "nullable|string|max:1000",

        ]);

        $idea = Idea::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        $idea->load('user');

        return response()->json([
            'message' => 'Idéia criada com sucesso!',
            'idea' => $idea
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Idea $idea)
    {
        //

    }

    public function getIdea($id)
    {
        $idea = Idea::find($id);
        if (!$idea->exists()) {
            return response()->json(['message' => 'Ideia não encontrada.'], 404);
        }
        return response()->json($idea);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Idea $idea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update($id, Request $request)
    {
        $request->validate([

            "title" => "sometimes|required|string|max:255",
            "description" => "sometimes|nullable|string",

        ]);

        $idea = Idea::find($id);
        if (!$idea) {
            return response()->json(['message' => 'Idéia não encontrada.'], 404);
        }

        if ($idea->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'Não autorizado.',
                'message' => 'Você não tem permissão para modificar esta ideia.'
            ], 403);
        }

        $idea->update($request->all());
        return response()->json([
            'message' => 'Idéia atualizada com sucesso!',
            'idea' => $idea
        ]);
    }

    public function vote($id)
    {
        $idea = Idea::findOrFail($id);
        $user = Auth::user();

        if ($idea->likedBy()->where('user_id', $user->id)->exists()) {
            $idea->likedBy()->detach($user->id);
            $idea->votes = $idea->likedBy()->count();
            $idea->save();
            return response()->json([
                'message' => 'Like removido',
                'idea' => $idea
            ]);
        }

        $idea->likedBy()->attach($user->id);
        $idea->votes = $idea->likedBy()->count();
        $idea->save();

        return response()->json([
            'message' => 'Like adicionado',
            'idea' => $idea
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $idea = Idea::find($id);

        if (!$idea) {
            return response()->json(['message' => 'Idéia não encontrada.'], 404);
        }

        if ($idea->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'Não autorizado.',
                'message' => 'Você não tem permissão para deletar esta ideia.'
            ], 403);
        }

        $idea->likedBy()->detach();

        $idea->delete();
        return response()->json(['message' => 'Idéia deletada com sucesso!']);
    }
}
