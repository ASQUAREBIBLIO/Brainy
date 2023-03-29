<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $table = 'calendars';

    protected $fillable = [
        'admin_id',
        'title',
        'date',
        'time',
        'description'
    ];

    public function admins()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'id');
    }
}
