import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Archive, Settings, Play, AlertTriangle } from 'lucide-react';

export default function Welcome() {
    const features = [
        {
            icon: <Clock className="w-8 h-8 text-yellow-600" />,
            title: "Timer Countdown Interaktif",
            description: "Timer besar dengan animasi visual menarik dan transisi halus untuk presentasi peserta"
        },
        {
            icon: <User className="w-8 h-8 text-green-600" />,
            title: "Manajemen Peserta",
            description: "Input nama peserta yang akan ditampilkan selama sesi countdown berlangsung"
        },
        {
            icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
            title: "Sistem Overtime",
            description: "Peringatan otomatis dan penghitungan waktu kelebihan ketika batas waktu terlampaui"
        },
        {
            icon: <Archive className="w-8 h-8 text-blue-600" />,
            title: "Arsip Sesi",
            description: "Menyimpan riwayat semua sesi dengan detail waktu, status, dan durasi overtime"
        }
    ];

    const mockStats = [
        { label: "Durasi Fleksibel", value: "1-60", unit: "menit" },
        { label: "Visual Menarik", value: "100%", unit: "responsif" },
        { label: "Tema UNCP", value: "🟡🟢", unit: "warna" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-green-500 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <div className="bg-white text-yellow-500 p-4 rounded-full shadow-lg">
                                    <Clock className="w-12 h-12" />
                                </div>
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight">
                                ⏰ Countdown PKKMB UNCP 2025
                            </h1>
                            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
                                Aplikasi timer countdown profesional untuk presentasi peserta PKKMB dengan fitur overtime dan sistem arsip yang lengkap
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                size="lg"
                                className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-4 text-lg"
                                onClick={() => router.get('/countdown')}
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Mulai Countdown Sekarang
                            </Button>
                            <Button 
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-yellow-600 font-semibold px-8 py-4 text-lg"
                                onClick={() => router.get('/archive')}
                            >
                                <Archive className="w-5 h-5 mr-2" />
                                Lihat Arsip Sesi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {mockStats.map((stat, index) => (
                            <Card key={index} className="text-center border-2 border-yellow-200">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600">
                                        <div className="font-medium">{stat.label}</div>
                                        <div className="text-sm text-gray-500">{stat.unit}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🚀 Fitur Unggulan
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dilengkapi dengan berbagai fitur canggih untuk mendukung kelancaran acara PKKMB
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-2 border-gray-100 hover:border-yellow-200 transition-colors">
                                <CardHeader className="text-center pb-2">
                                    <div className="flex justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <p className="text-sm text-gray-600 text-center">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            📋 Cara Penggunaan
                        </h2>
                        <p className="text-lg text-gray-600">
                            Mudah dan intuitif, hanya dalam 3 langkah sederhana
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center space-y-4">
                                <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Input Data Peserta</h3>
                                <p className="text-gray-600">
                                    Masukkan nama peserta dan atur durasi presentasi (1-60 menit)
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Mulai Countdown</h3>
                                <p className="text-gray-600">
                                    Timer akan berjalan dengan tampilan visual yang menarik dan responsif
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Pantau & Arsipkan</h3>
                                <p className="text-gray-600">
                                    Sesi otomatis tersimpan dalam arsip dengan detail waktu dan status
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            👀 Tampilan Aplikasi
                        </h2>
                        <p className="text-lg text-gray-600">
                            Interface modern dengan tema warna kuning dan hijau yang mencerminkan identitas UNCP
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-yellow-200">
                            {/* Mock Header */}
                            <div className="bg-yellow-500 text-white p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white text-yellow-500 p-2 rounded-full">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">PKKMB UNCP 2025</h3>
                                        <p className="text-yellow-100">Universitas Nusa Cendana Kupang</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mock Content */}
                            <div className="p-8">
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Mock Timer */}
                                    <div className="text-center">
                                        <div className="text-6xl font-mono font-bold text-green-600 mb-4">
                                            05:00
                                        </div>
                                        <Badge className="text-lg px-4 py-2 bg-green-100 text-green-800">
                                            BERJALAN
                                        </Badge>
                                        <div className="mt-4">
                                            <p className="text-gray-600">Peserta: John Doe</p>
                                        </div>
                                    </div>
                                    
                                    {/* Mock Form */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">👤 Nama Peserta</label>
                                            <div className="bg-gray-100 p-3 rounded border">
                                                John Doe
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">⏰ Durasi</label>
                                            <div className="bg-gray-100 p-3 rounded border">
                                                5 menit
                                            </div>
                                        </div>
                                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white" disabled>
                                            <Clock className="w-4 h-4 mr-2" />
                                            Timer Sedang Berjalan
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-green-500 to-yellow-500">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white">
                                🎯 Siap Memulai?
                            </h2>
                            <p className="text-xl text-green-100">
                                Gunakan aplikasi countdown PKKMB UNCP 2025 sekarang juga dan rasakan pengalaman timer yang berbeda!
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                size="lg"
                                className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 text-lg"
                                onClick={() => router.get('/countdown')}
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Mulai Sekarang
                            </Button>
                            <Button 
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 text-lg"
                                onClick={() => router.get('/app-settings')}
                            >
                                <Settings className="w-5 h-5 mr-2" />
                                Pengaturan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="space-y-2">
                        <p className="text-lg font-medium">🎓 PKKMB UNCP 2025</p>
                        <p className="text-gray-400">
                            Universitas Nusa Cendana Kupang - Sistem Countdown Presentasi
                        </p>
                        <p className="text-sm text-gray-500">
                            Dibuat dengan ❤️ untuk kesuksesan acara PKKMB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}