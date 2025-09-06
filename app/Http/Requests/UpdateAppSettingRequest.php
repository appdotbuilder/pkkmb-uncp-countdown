<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppSettingRequest extends FormRequest
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
            'logo' => 'nullable|string|max:500',
            'app_title' => 'required|string|max:255',
            'university_name' => 'required|string|max:255',
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
            'app_title.required' => 'Judul aplikasi wajib diisi.',
            'app_title.string' => 'Judul aplikasi harus berupa teks.',
            'app_title.max' => 'Judul aplikasi maksimal 255 karakter.',
            'university_name.required' => 'Nama universitas wajib diisi.',
            'university_name.string' => 'Nama universitas harus berupa teks.',
            'university_name.max' => 'Nama universitas maksimal 255 karakter.',
            'logo.string' => 'Logo harus berupa teks.',
            'logo.max' => 'Path logo maksimal 500 karakter.',
        ];
    }
}