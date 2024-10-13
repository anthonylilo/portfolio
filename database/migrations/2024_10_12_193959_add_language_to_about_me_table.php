<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('about_me', function (Blueprint $table) {
            // Agregar la columna 'language' para almacenar el idioma
            $table->string('language')->after('profile');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('about_me', function (Blueprint $table) {
            // Eliminar la columna 'language' en caso de rollback
            $table->dropColumn('language');
        });
    }
};
