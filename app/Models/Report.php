<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'reports';
    protected $fillable = [
        'id',
        'name',
        'usagedata',
        'address',
        'phone',
        'email',
        'amount'
    ];
}
