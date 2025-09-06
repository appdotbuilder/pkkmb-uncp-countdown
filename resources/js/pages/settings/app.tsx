import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Settings, Save, Image, Type, Building } from 'lucide-react';

interface AppSettings {
    id: number;
    app_title: string;
    university_name: string;
    logo: string | null;
    [key: string]: unknown;
}

interface Props {
    settings: AppSettings;
    [key: string]: unknown;
}

export default function AppSettingsPage({ settings }: Props) {
    const [appTitle, setAppTitle] = useState(settings.app_title);
    const [universityName, setUniversityName] = useState(settings.university_name);
    const [logo, setLogo] = useState(settings.logo || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        
        router.patch('/app-settings', {
            app_title: appTitle,
            university_name: universityName,
            logo: logo || null,
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsSaving(false),
        });
    };

    const handleReset = () => {
        setAppTitle(settings.app_title);
        setUniversityName(settings.university_name);
        setLogo(settings.logo || '');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
            {/* Header */}
            <div className="bg-yellow-500 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white text-yellow-500 border-white hover:bg-yellow-50"
                                onClick={() => router.get('/countdown')}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">⚙️ Pengaturan Aplikasi</h1>
                                <p className="text-yellow-100">Kelola tampilan dan branding aplikasi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-2 border-yellow-200">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Settings className="w-5 h-5 text-yellow-600" />
                                <span>Pengaturan Branding</span>
                            </CardTitle>
                            <CardDescription>
                                Sesuaikan logo, judul aplikasi, dan nama universitas sesuai kebutuhan Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* App Title */}
                            <div className="space-y-2">
                                <Label htmlFor="app-title" className="flex items-center space-x-2">
                                    <Type className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">Judul Aplikasi</span>
                                </Label>
                                <Input
                                    id="app-title"
                                    type="text"
                                    placeholder="PKKMB UNCP 2025"
                                    value={appTitle}
                                    onChange={(e) => setAppTitle(e.target.value)}
                                    className="text-lg"
                                />
                                <p className="text-xs text-gray-500">
                                    Judul ini akan ditampilkan di bagian header aplikasi
                                </p>
                            </div>

                            <Separator />

                            {/* University Name */}
                            <div className="space-y-2">
                                <Label htmlFor="university-name" className="flex items-center space-x-2">
                                    <Building className="w-4 h-4 text-green-600" />
                                    <span className="font-medium">Nama Universitas</span>
                                </Label>
                                <Input
                                    id="university-name"
                                    type="text"
                                    placeholder="Universitas Cokroaminoto Palopo"
                                    value={universityName}
                                    onChange={(e) => setUniversityName(e.target.value)}
                                    className="text-lg"
                                />
                                <p className="text-xs text-gray-500">
                                    Nama universitas akan ditampilkan di bawah judul aplikasi
                                </p>
                            </div>

                            <Separator />

                            {/* Logo */}
                            <div className="space-y-2">
                                <Label htmlFor="logo" className="flex items-center space-x-2">
                                    <Image className="w-4 h-4 text-purple-600" />
                                    <span className="font-medium">Logo (Opsional)</span>
                                </Label>
                                <Input
                                    id="logo"
                                    type="text"
                                    placeholder="https://example.com/logo.png atau /images/logo.png"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                    className="text-lg"
                                />
                                <p className="text-xs text-gray-500">
                                    URL logo yang akan ditampilkan. Kosongkan jika tidak menggunakan logo khusus.
                                </p>
                            </div>

                            <Separator />

                            {/* Preview */}
                            <div className="space-y-2">
                                <Label className="font-medium">👀 Preview</Label>
                                <div className="bg-yellow-500 text-white p-4 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        {logo && (
                                            <div className="bg-white text-yellow-500 p-2 rounded-full">
                                                <Image className="w-6 h-6" />
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {appTitle || 'Judul Aplikasi'}
                                            </h2>
                                            <p className="text-yellow-100">
                                                {universityName || 'Universitas Cokroaminoto Palopo'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    disabled={isSaving}
                                    className="flex-1"
                                >
                                    Reset
                                </Button>
                            </div>

                            {/* Help Text */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-medium text-blue-800 mb-2">💡 Tips Penggunaan:</h3>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Gunakan judul yang singkat dan mudah diingat</li>
                                    <li>• Nama universitas akan ditampilkan di semua halaman</li>
                                    <li>• Logo opsional - aplikasi akan tetap berfungsi tanpa logo</li>
                                    <li>• Pengaturan ini akan langsung berlaku setelah disimpan</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}