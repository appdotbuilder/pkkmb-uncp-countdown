import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Settings, Archive, Pause, Plus } from 'lucide-react';

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

    const handleStop = () => {
        if (!activeSession) return;
        
        router.patch(`/countdown/${activeSession.id}`, {
            status: isOvertime ? 'overtime' : 'completed',
            overtime_seconds: overtime,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
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

    const getProgressPercentage = () => {
        if (!activeSession || isOvertime) return 0;
        const totalSeconds = activeSession.duration_minutes * 60;
        return (timeLeft / totalSeconds) * 100;
    };

    const getProgressColor = () => {
        const progress = getProgressPercentage();
        if (progress > 50) return 'bg-green-500';
        if (progress > 20) return 'bg-yellow-500';
        return 'bg-red-500';
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
                <div className="max-w-4xl mx-auto">
                    {/* Timer Display */}
                    <Card className="border-2 border-yellow-200 shadow-lg mb-6">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl text-gray-800">
                                {isRunning ? '⏱️ Timer Aktif' : '🕐 Timer Countdown'}
                            </CardTitle>
                            {activeSession && (
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium text-gray-700 text-xl">{activeSession.participant_name}</span>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="text-center space-y-8">
                            {isRunning ? (
                                <>
                                    {/* Main Timer Display */}
                                    <div className={`text-8xl font-mono font-bold transition-all duration-300 ${getTimerColor()}`}>
                                        {isOvertime ? formatTime(0) : formatTime(timeLeft)}
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    {!isOvertime && activeSession && (
                                        <div className="w-full max-w-2xl mx-auto">
                                            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
                                                    style={{ width: `${getProgressPercentage()}%` }}
                                                />
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                Sisa waktu: {Math.round(getProgressPercentage())}%
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Overtime Warning */}
                                    {isOvertime && (
                                        <div className="bg-red-100 border border-red-300 rounded-lg p-6 max-w-md mx-auto">
                                            <div className="text-red-800 font-bold text-2xl mb-3">
                                                🚫 WAKTU HABIS!
                                            </div>
                                            <div className="text-red-700 text-lg">
                                                Kelebihan waktu: <span className="font-semibold">{formatTime(overtime)}</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Status Badge */}
                                    <div className="flex justify-center space-x-4">
                                        <Badge 
                                            variant={isOvertime ? "destructive" : timeLeft <= 60 ? "secondary" : "default"}
                                            className="text-xl px-6 py-3"
                                        >
                                            {isOvertime ? 'OVERTIME' : timeLeft <= 60 ? 'HAMPIR HABIS' : 'BERJALAN'}
                                        </Badge>
                                    </div>
                                    
                                    {/* Stop Button */}
                                    <Button 
                                        onClick={handleStop} 
                                        className="bg-red-500 hover:bg-red-600 text-white text-xl px-10 py-4"
                                        size="lg"
                                    >
                                        <Pause className="w-6 h-6 mr-3" />
                                        Hentikan Timer
                                    </Button>
                                </>
                            ) : (
                                /* No Active Session */
                                <>
                                    <div className="text-gray-500 py-16">
                                        <Clock className="w-32 h-32 mx-auto mb-6 opacity-30" />
                                        <p className="text-2xl font-medium mb-2">Tidak ada countdown aktif</p>
                                        <p className="text-lg">Mulai sesi baru untuk memulai timer</p>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => router.get('/countdown/setup')}
                                        className="bg-green-500 hover:bg-green-600 text-white text-xl px-10 py-4"
                                        size="lg"
                                    >
                                        <Plus className="w-6 h-6 mr-3" />
                                        Mulai Countdown Baru
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    {!isRunning && (
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card className="border border-green-200 hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <Button 
                                        variant="outline" 
                                        className="w-full justify-start text-green-700 border-green-300 hover:bg-green-50"
                                        onClick={() => router.get('/countdown/setup')}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Sesi Baru
                                    </Button>
                                </CardContent>
                            </Card>
                            
                            <Card className="border border-blue-200 hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <Button 
                                        variant="outline" 
                                        className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-50"
                                        onClick={() => router.get('/archive')}
                                    >
                                        <Archive className="w-4 h-4 mr-2" />
                                        Lihat Arsip
                                    </Button>
                                </CardContent>
                            </Card>
                            
                            <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <Button 
                                        variant="outline" 
                                        className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
                                        onClick={() => router.get('/app-settings')}
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Pengaturan
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}