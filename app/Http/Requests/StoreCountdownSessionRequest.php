<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCountdownSessionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'participant_name' => 'required|string|max:255',
            'duration_minutes' => 'required|integer|min:1|max:60',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'participant_name.required' => 'Nama peserta wajib diisi.',
            'participant_name.string' => 'Nama peserta harus berupa teks.',
            'participant_name.max' => 'Nama peserta maksimal 255 karakter.',
            'duration_minutes.required' => 'Durasi waktu wajib diisi.',
            'duration_minutes.integer' => 'Durasi waktu harus berupa angka.',
            'duration_minutes.min' => 'Durasi waktu minimal 1 menit.',
            'duration_minutes.max' => 'Durasi waktu maksimal 60 menit.',
        ];
    }
}