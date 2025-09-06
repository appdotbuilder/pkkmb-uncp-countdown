import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, User, Settings, Archive, Play, Pause } from 'lucide-react';

interface CountdownSession {
    id: number;
    participant_name: string;
    duration_minutes: number;
    status: 'active' | 'completed' | 'overtime';
    started_at: string;
    overtime_seconds: number;
    [key: string]: unknown;
}

interface AppSettings {
    id: number;
    app_title: string;
    university_name: string;
    logo: string | null;
    [key: string]: unknown;
}

interface Props {
    activeSession?: CountdownSession;
    appSettings?: AppSettings;
    [key: string]: unknown;
}

export default function CountdownIndex({ activeSession, appSettings }: Props) {
    const [participantName, setParticipantName] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('5');
    const [timeLeft, setTimeLeft] = useState(0);
    const [overtime, setOvertime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isOvertime, setIsOvertime] = useState(false);

    const appTitle = appSettings?.app_title || 'PKKMB UNCP 2025';
    const universityName = appSettings?.university_name || 'Universitas Cokroaminoto Palopo';

    useEffect(() => {
        if (activeSession && activeSession.status === 'active') {
            const startTime = new Date(activeSession.started_at).getTime();
            const durationMs = activeSession.duration_minutes * 60 * 1000;
            
            setIsRunning(true);
            
            const updateTimer = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const remaining = durationMs - elapsed;
                
                if (remaining > 0) {
                    setTimeLeft(Math.ceil(remaining / 1000));
                    setIsOvertime(false);
                    setOvertime(0);
                } else {
                    setTimeLeft(0);
                    setIsOvertime(true);
                    setOvertime(Math.floor(-remaining / 1000));
                }
            };
            
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            
            return () => clearInterval(interval);
        } else {
            setIsRunning(false);
            setTimeLeft(0);
            setOvertime(0);
            setIsOvertime(false);
        }
    }, [activeSession]);

    const handleStart = () => {
        if (!participantName.trim() || !durationMinutes) return;
        
        router.post('/countdown', {
            participant_name: participantName.trim(),
            duration_minutes: parseInt(durationMinutes),
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStop = () => {
        if (!activeSession) return;
        
        router.patch(`/countdown/${activeSession.id}`, {
            status: isOvertime ? 'overtime' : 'completed',
            overtime_seconds: overtime,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
        
        setParticipantName('');
        setDurationMinutes('5');
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (isOvertime) return 'text-red-600';
        if (timeLeft <= 60) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
            {/* Header */}
            <div className="bg-yellow-500 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white text-yellow-500 p-2 rounded-full">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{appTitle}</h1>
                                <p className="text-yellow-100">{universityName}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-white text-yellow-500 border-white hover:bg-yellow-50"
                                onClick={() => router.get('/archive')}
                            >
                                <Archive className="w-4 h-4 mr-2" />
                                Arsip
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-white text-yellow-500 border-white hover:bg-yellow-50"
                                onClick={() => router.get('/app-settings')}
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Pengaturan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Timer Display */}
                    <div className="space-y-6">
                        <Card className="border-2 border-yellow-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-gray-800">
                                    {isRunning ? '⏱️ Timer Aktif' : '🕐 Timer Countdown'}
                                </CardTitle>
                                {activeSession && (
                                    <div className="flex items-center justify-center space-x-2">
                                        <User className="w-4 h-4 text-gray-600" />
                                        <span className="font-medium text-gray-700">{activeSession.participant_name}</span>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="text-center space-y-6">
                                {isRunning ? (
                                    <>
                                        <div className={`text-8xl font-mono font-bold ${getTimerColor()} transition-colors duration-300`}>
                                            {isOvertime ? formatTime(0) : formatTime(timeLeft)}
                                        </div>
                                        
                                        {isOvertime && (
                                            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                                                <div className="text-red-800 font-bold text-xl mb-2">
                                                    🚫 WAKTU HABIS!
                                                </div>
                                                <div className="text-red-700">
                                                    Kelebihan waktu: <span className="font-semibold">{formatTime(overtime)}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-center space-x-4">
                                            <Badge 
                                                variant={isOvertime ? "destructive" : timeLeft <= 60 ? "secondary" : "default"}
                                                className="text-lg px-4 py-2"
                                            >
                                                {isOvertime ? 'OVERTIME' : timeLeft <= 60 ? 'HAMPIR HABIS' : 'BERJALAN'}
                                            </Badge>
                                        </div>
                                        
                                        <Button 
                                            onClick={handleStop} 
                                            className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-3"
                                            size="lg"
                                        >
                                            <Pause className="w-5 h-5 mr-2" />
                                            Hentikan Timer
                                        </Button>
                                    </>
                                ) : (
                                    <div className="text-gray-500 py-12">
                                        <Clock className="w-24 h-24 mx-auto mb-4 opacity-30" />
                                        <p className="text-xl">Siap untuk memulai countdown!</p>
                                        <p className="text-sm mt-2">Isi formulir di sebelah untuk memulai</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Setup Form */}
                    <div className="space-y-6">
                        <Card className="border-2 border-green-200">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Settings className="w-5 h-5 text-green-600" />
                                    <span>Pengaturan Countdown</span>
                                </CardTitle>
                                <CardDescription>
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
                                        disabled={isRunning}
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
                                        disabled={isRunning}
                                        className="text-lg"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Rentang: 1-60 menit
                                    </p>
                                </div>
                                
                                <Separator />
                                
                                <Button 
                                    onClick={handleStart}
                                    disabled={!participantName.trim() || !durationMinutes || isRunning}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6"
                                    size="lg"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Mulai Countdown
                                </Button>
                                
                                {isRunning && (
                                    <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        💡 Timer sedang berjalan. Hentikan timer untuk memulai sesi baru.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="border border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg">🚀 Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => router.get('/archive')}
                                >
                                    <Archive className="w-4 h-4 mr-2" />
                                    Lihat Riwayat Sesi
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => router.get('/app-settings')}
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Pengaturan Aplikasi
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}