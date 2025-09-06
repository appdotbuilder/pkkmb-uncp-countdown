import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Clock, User, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface CountdownSession {
    id: number;
    participant_name: string;
    duration_minutes: number;
    status: 'completed' | 'overtime';
    overtime_seconds: number;
    started_at: string;
    ended_at: string;
    created_at: string;
    [key: string]: unknown;
}

interface PaginatedSessions {
    data: CountdownSession[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
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
    sessions: PaginatedSessions;
    appSettings?: AppSettings;
    [key: string]: unknown;
}

export default function CountdownArchive({ sessions, appSettings }: Props) {
    const universityName = appSettings?.university_name || 'Universitas Cokroaminoto Palopo';

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (session: CountdownSession) => {
        if (session.status === 'overtime') {
            return (
                <Badge variant="destructive" className="flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Overtime</span>
                </Badge>
            );
        }
        return (
            <Badge variant="default" className="flex items-center space-x-1 bg-green-500">
                <CheckCircle className="w-3 h-3" />
                <span>Selesai</span>
            </Badge>
        );
    };

    const getSessionStats = () => {
        const total = sessions.data.length;
        const completed = sessions.data.filter(s => s.status === 'completed').length;
        const overtime = sessions.data.filter(s => s.status === 'overtime').length;
        const averageOvertime = sessions.data
            .filter(s => s.status === 'overtime')
            .reduce((sum, s) => sum + s.overtime_seconds, 0) / (overtime || 1);

        return { total, completed, overtime, averageOvertime };
    };

    const stats = getSessionStats();

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
                                <h1 className="text-2xl font-bold">📋 Arsip Sesi Countdown</h1>
                                <p className="text-yellow-100">{universityName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Statistics Cards */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Sesi</p>
                                    <p className="text-2xl font-bold text-blue-600">{sessions.total}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Selesai Tepat Waktu</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-red-100 p-2 rounded-full">
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Overtime</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.overtime}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <Clock className="w-4 h-4 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Rata-rata Overtime</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {stats.overtime > 0 ? formatTime(Math.round(stats.averageOvertime)) : '00:00'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sessions Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <span>Riwayat Sesi Countdown</span>
                        </CardTitle>
                        <CardDescription>
                            Semua sesi countdown yang telah selesai
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {sessions.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada sesi</h3>
                                <p className="text-gray-500">Mulai sesi countdown pertama Anda!</p>
                                <Button
                                    className="mt-4"
                                    onClick={() => router.get('/countdown')}
                                >
                                    Mulai Countdown
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>Peserta</span>
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-center">Durasi</TableHead>
                                            <TableHead className="text-center">Status</TableHead>
                                            <TableHead className="text-center">Overtime</TableHead>
                                            <TableHead className="w-[180px]">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Waktu</span>
                                                </div>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sessions.data.map((session) => (
                                            <TableRow key={session.id}>
                                                <TableCell className="font-medium">
                                                    {session.participant_name}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {session.duration_minutes} menit
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {getStatusBadge(session)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {session.status === 'overtime' ? (
                                                        <span className="text-red-600 font-medium">
                                                            +{formatTime(session.overtime_seconds)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">
                                                    {formatDate(session.started_at)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {/* Pagination */}
                        {sessions.last_page > 1 && (
                            <div className="flex justify-center mt-6 space-x-2">
                                {Array.from({ length: sessions.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === sessions.current_page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => router.get(`/archive?page=${page}`)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}