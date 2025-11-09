<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Idea extends Model
{
    protected $fillable = ['title', 'description', 'votes', 'user_id'];

    protected $visible = ['id', 'user_id', 'title', 'description', 'votes', 'author_name', 'has_voted', 'created_at', 'updated_at'];

    protected $appends = ['author_name', 'has_voted'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAuthorNameAttribute()
    {
        return $this->user ? $this->user->name : null;
    }

    public function getHasVotedAttribute()
    {
        if (!auth()->check()) {
            return false;
        }

        return $this->likedBy()->where('user_id', auth()->id())->exists();
    }

    public function likedBy()
    {
        return $this->belongsToMany(User::class, 'idea_user_likes')->withTimestamps();
    }
}
