"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, BookOpen, BarChart3, Calendar, Check, X, LogOut, User, ChevronDown, Filter, FileUp, FileText, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge } from "../../../components/ui/core";

// Mock Data
const COURSES = [
    { id: 1, name: "Advanced Algorithms", code: "CS-401", batches: ["Batch A (2022-26)", "Batch B (2022-26)"] },
    { id: 2, name: "Database Systems", code: "CS-403", batches: ["Batch A (2022-26)"] },
    { id: 3, name: "Distributed Systems", code: "CS-601", batches: ["M.Tech (2023-25)"] }
];

const STUDENTS = [
    { id: "S01", name: "Alex Johnson" },
    { id: "S02", name: "Maria Garcia" },
    { id: "S03", name: "James Smith" },
    { id: "S04", name: "Sarah Williams" },
    { id: "S05", name: "David Brown" }
];

const FACULTY_PROFILE = {
    name: "Dr. Robert Wilson",
    role: "Senior Professor",
    email: "robert.wilson@university.edu"
};

// Derived unique batches list
const ALL_BATCHES = Array.from(new Set(COURSES.flatMap(c => c.batches)));

// Mock Stats per batch
const BATCH_STATS = {
    "Batch A (2022-26)": { students: 62, attendance: "88%" },
    "Batch B (2022-26)": { students: 58, attendance: "85%" },
    "M.Tech (2023-25)": { students: 22, attendance: "92%" }
};

export default function FacultyDashboard() {
    const [selectedBatch, setSelectedBatch] = useState(ALL_BATCHES[0]);
    const [notification, setNotification] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceHistory, setAttendanceHistory] = useState({});
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Resource Upload State
    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceType, setResourceType] = useState("PDF");

    // Derived State: Filter courses based on selected batch
    const filteredCourses = useMemo(() => {
        return COURSES.filter(course => course.batches.includes(selectedBatch));
    }, [selectedBatch]);

    // State for selected course (must be one of the filtered courses)
    // We default to the first filtered course whenever batch changes
    const [selectedCourseId, setSelectedCourseId] = useState(filteredCourses[0]?.id);

    // Update selected course if the current selection is no longer valid for the new batch
    useMemo(() => {
        if (!filteredCourses.find(c => c.id === selectedCourseId)) {
            setSelectedCourseId(filteredCourses[0]?.id);
        }
    }, [filteredCourses, selectedCourseId]);

    const activeCourse = filteredCourses.find(c => c.id === selectedCourseId) || filteredCourses[0];
    const currentStats = BATCH_STATS[selectedBatch] || { students: 0, attendance: "0%" };

    const toggleAttendance = (studentId, status) => {
        if (!activeCourse) return;
        setAttendanceHistory(prev => {
            const courseRecord = prev[activeCourse.id] || {};
            const batchRecord = courseRecord[selectedBatch] || {};
            const dateRecord = batchRecord[selectedDate] || {};

            const newStatus = dateRecord[studentId] === status ? null : status;

            return {
                ...prev,
                [activeCourse.id]: {
                    ...courseRecord,
                    [selectedBatch]: {
                        ...batchRecord,
                        [selectedDate]: {
                            ...dateRecord,
                            [studentId]: newStatus
                        }
                    }
                }
            };
        });
    };

    const currentAttendance = attendanceHistory[activeCourse?.id]?.[selectedBatch]?.[selectedDate] || {};

    const handleSubmit = (type, details = "") => {
        setNotification(`${type} submitted for ${selectedBatch} successfully! ${details}`);
        setTimeout(() => setNotification(null), 3000);
        if (type === "Resource") {
            setResourceTitle("");
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
            {/* Toast Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className="fixed top-6 left-1/2 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white shadow-lg"
                    >
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">{notification}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto max-w-6xl space-y-8">
                {/* Header with Global Batch Selector */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-slate-200 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Faculty Dashboard
                        </h1>
                        <p className="text-slate-500">Manage courses, attendance, and grades</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                        {/* Global Batch Selector */}
                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <Filter className="h-5 w-5 text-slate-500 ml-2" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Batch</span>
                                <select
                                    value={selectedBatch}
                                    onChange={(e) => setSelectedBatch(e.target.value)}
                                    className="bg-transparent border-none text-sm font-bold text-slate-900 focus:ring-0 p-0 cursor-pointer outline-none"
                                >
                                    {ALL_BATCHES.map(batch => (
                                        <option key={batch} value={batch}>{batch}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 focus:outline-none"
                            >
                                <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                                    RW
                                </div>
                                <div className="text-left hidden md:block">
                                    <div className="text-sm font-medium text-slate-900">{FACULTY_PROFILE.name}</div>
                                    <div className="text-xs text-slate-500">{FACULTY_PROFILE.role}</div>
                                </div>
                                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.1 }}
                                        className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-slate-100"
                                    >
                                        <div className="py-1">
                                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                                <p className="text-sm font-medium text-slate-900">{FACULTY_PROFILE.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{FACULTY_PROFILE.email}</p>
                                            </div>
                                            <div className="p-1">
                                                <button className="flex w-full items-center px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                                                    <User className="h-4 w-4 mr-3 text-slate-400" />
                                                    My Profile
                                                </button>
                                                <button
                                                    onClick={() => window.location.href = '/login'}
                                                    className="flex w-full items-center px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4 mr-3" />
                                                    Log out
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Dynamic Stats Row based on Selected Batch */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Students in Batch</p>
                                <h3 className="text-2xl font-bold text-slate-900">{currentStats.students}</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Active Courses</p>
                                <h3 className="text-2xl font-bold text-slate-900">{filteredCourses.length}</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Avg. Attendance</p>
                                <h3 className="text-2xl font-bold text-slate-900">{currentStats.attendance}</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Sessions/Week</p>
                                <h3 className="text-2xl font-bold text-slate-900">{filteredCourses.length * 3}</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-3">

                    {/* Section 1: Filtered Courses List */}
                    <div className="md:col-span-1">
                        <Card className="h-full rounded-lg border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold text-slate-800">Courses for {selectedBatch.split(' ')[0]}</CardTitle>
                                <Badge variant="secondary" className="text-xs font-normal">
                                    {filteredCourses.length} courses
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-0">
                                {filteredCourses.length > 0 ? (
                                    <ul className="divide-y divide-slate-100">
                                        {filteredCourses.map((course) => (
                                            <li
                                                key={course.id}
                                                onClick={() => setSelectedCourseId(course.id)}
                                                className={`px-6 py-4 cursor-pointer transition-colors ${activeCourse?.id === course.id ? "bg-slate-50 border-l-4 border-slate-900" : "hover:bg-slate-50/50 border-l-4 border-transparent"
                                                    }`}
                                            >
                                                <div className="font-medium text-slate-900">{course.name}</div>
                                                <div className="text-sm text-slate-500 mt-1">{course.code}</div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-6 text-center text-slate-500 text-sm">
                                        No courses assigned for this batch.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side: Action Forms */}
                    <div className="md:col-span-2 space-y-8">

                        {activeCourse && (
                            <>
                                {/* Section 2: Attendance Submission Form */}
                                <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                    <CardHeader className="pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-semibold text-slate-800">Attendance: {activeCourse.name}</CardTitle>
                                            <p className="text-sm text-slate-500 mt-1 font-normal">Recording for {selectedBatch}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">

                                        {/* Date Selector */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-full md:w-1/2 space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Session Date:</label>
                                                <Input
                                                    type="date"
                                                    className="w-full border-slate-200 focus:ring-slate-900"
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Student List */}
                                        <div className="border rounded-md border-slate-200 overflow-hidden">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                                                    <tr>
                                                        <th className="px-4 py-3 font-medium">Student Name</th>
                                                        <th className="px-4 py-3 font-medium text-center w-32">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {STUDENTS.map(student => (
                                                        <tr key={student.id} className="hover:bg-slate-50/50">
                                                            <td className="px-4 py-3">
                                                                <div className="font-medium text-slate-900">{student.name}</div>
                                                                <div className="text-xs text-slate-500">{student.id}</div>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() => toggleAttendance(student.id, 'present')}
                                                                        className={`p-1.5 rounded-full border transition-all ${currentAttendance[student.id] === 'present'
                                                                            ? 'bg-emerald-100 border-emerald-500 text-emerald-700 outline outline-2 outline-emerald-500/20'
                                                                            : 'border-slate-200 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600'
                                                                            }`}
                                                                        title="Present"
                                                                    >
                                                                        <Check className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => toggleAttendance(student.id, 'absent')}
                                                                        className={`p-1.5 rounded-full border transition-all ${currentAttendance[student.id] === 'absent'
                                                                            ? 'bg-red-100 border-red-500 text-red-700 outline outline-2 outline-red-500/20'
                                                                            : 'border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600'
                                                                            }`}
                                                                        title="Absent"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="flex justify-end pt-2">
                                            <Button
                                                className="bg-slate-900 text-white hover:bg-slate-800"
                                                onClick={() => handleSubmit("Attendance")}
                                            >
                                                Save Register
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Section 3: Share Resources Form */}
                                <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                    <CardHeader className="pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
                                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                            <FileUp className="h-5 w-5 text-slate-500" />
                                            Share Resources
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Course Date</label>
                                                <Input
                                                    type="date"
                                                    className="border-slate-200 focus:ring-slate-900"
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-700">Resource Type</label>
                                                <Select
                                                    value={resourceType}
                                                    onChange={(e) => setResourceType(e.target.value)}
                                                    className="border-slate-200 focus:ring-slate-900"
                                                >
                                                    <option value="PDF">PDF Document</option>
                                                    <option value="PPT">Presentation (PPT)</option>
                                                    <option value="DOC">Word Document</option>
                                                    <option value="LINK">External Link</option>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700">Title / Topic Description</label>
                                            <Input
                                                placeholder="e.g. Lecture Slide Week 5 - Graph Theory"
                                                className="border-slate-200 focus:ring-slate-900"
                                                value={resourceTitle}
                                                onChange={(e) => setResourceTitle(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700">Upload File</label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <FileUp className="w-8 h-8 mb-3 text-slate-400" />
                                                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-slate-500">PDF, PPT, DOC up to 10MB</p>
                                                    </div>
                                                    <Input type="file" className="hidden" />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-2">
                                            <Button
                                                className="bg-emerald-600 text-white hover:bg-emerald-700 border-transparent"
                                                onClick={() => handleSubmit("Resource", `for ${selectedDate}`)}
                                                disabled={!resourceTitle}
                                            >
                                                Upload Resource
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Section 4: Grade Upload Form */}
                                <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                    <CardHeader className="pb-2 border-b border-slate-100">
                                        <CardTitle className="text-lg font-semibold text-slate-800">Grade Upload</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            {/* Course and Batch fields are now context-aware and read-only visually */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-700">Course</label>
                                                    <div className="text-sm font-semibold text-slate-900 border border-slate-200 rounded-md px-3 py-2 bg-slate-50">
                                                        {activeCourse.name}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-700">Batch</label>
                                                    <div className="text-sm font-semibold text-slate-900 border border-slate-200 rounded-md px-3 py-2 bg-slate-50">
                                                        {selectedBatch}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Select Student</label>
                                                <Select className="border-slate-200 focus:ring-slate-900">
                                                    {STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Enter Grade</label>
                                                <Input type="text" placeholder="e.g. A, 92, Pass" className="border-slate-200 focus:ring-slate-900" />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                                className="bg-slate-900 text-white hover:bg-slate-800"
                                                onClick={() => handleSubmit("Grade")}
                                            >
                                                Submit Grade
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
