import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Settings, Play, ArrowLeft, Clock } from 'lucide-react';

interface AppSettings {
    id: number;
    app_title: string;
    university_name: string;
    logo: string | null;
    [key: string]: unknown;
}

interface Props {
    appSettings?: AppSettings;
    [key: string]: unknown;
}

export default function CountdownSetup({ appSettings }: Props) {
    const [participantName, setParticipantName] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('5');

    const universityName = appSettings?.university_name || 'Universitas Cokroaminoto Palopo';

    const handleStart = () => {
        if (!participantName.trim() || !durationMinutes) return;
        
        router.post('/countdown', {
            participant_name: participantName.trim(),
            duration_minutes: parseInt(durationMinutes),
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                router.get('/countdown');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
            {/* Header */}
            <div className="bg-yellow-500 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white text-yellow-500 p-2 rounded-full">
                                <Settings className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Pengaturan Countdown</h1>
                                <p className="text-yellow-100">{universityName}</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white text-yellow-500 border-white hover:bg-yellow-50"
                            onClick={() => router.get('/countdown')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <Card className="border-2 border-green-200 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-center">
                                <Settings className="w-5 h-5 text-green-600" />
                                <span>Pengaturan Countdown</span>
                            </CardTitle>
                            <CardDescription className="text-center">
                                Atur nama peserta dan durasi waktu presentasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="participant" className="text-sm font-medium">
                                    👤 Nama Peserta
                                </Label>
                                <Input
                                    id="participant"
                                    type="text"
                                    placeholder="Masukkan nama peserta..."
                                    value={participantName}
                                    onChange={(e) => setParticipantName(e.target.value)}
                                    className="text-lg"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="duration" className="text-sm font-medium">
                                    ⏰ Durasi (dalam menit)
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    min="1"
                                    max="60"
                                    placeholder="5"
                                    value={durationMinutes}
                                    onChange={(e) => setDurationMinutes(e.target.value)}
                                    className="text-lg"
                                />
                                <p className="text-xs text-gray-500">
                                    Rentang: 1-60 menit
                                </p>
                            </div>
                            
                            <Separator />
                            
                            <Button 
                                onClick={handleStart}
                                disabled={!participantName.trim() || !durationMinutes}
                                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6"
                                size="lg"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Mulai Countdown
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Info */}
                    <Card className="mt-6 border border-blue-200 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="text-center text-blue-800">
                                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                <p className="text-sm font-medium">Setelah memulai countdown, Anda akan diarahkan ke halaman timer yang menampilkan waktu berjalan secara real-time.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}