<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Admin;

class Family extends Model
{
    use HasFactory;

    protected $table = 'families';

    protected $fillable = [
        'admin_id',
        'name',
        'image',
        'relation',
        'phone'
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'id');
    }
}
