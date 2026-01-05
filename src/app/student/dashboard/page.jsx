"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BookOpen, Clock, Award, LogOut, User, ChevronDown, X, FileText, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "../../../components/ui/core";

// Mock Data
const MOCK_DATA = {
    profile: {
        name: "Alex Johnson",
        id: "STU-2024-042",
        dept: "Computer Science",
        email: "alex.johnson@student.university.edu"
    },
    courses: [
        { id: 1, name: "Advanced Algorithms", faculty: "Dr. Sarah Lee", code: "CS-401" },
        { id: 2, name: "Database Systems", faculty: "Prof. Michael Chen", code: "CS-403" },
        { id: 3, name: "Web Engineering", faculty: "Ms. Emily Davis", code: "CS-405" },
        { id: 4, name: "Artificial Intelligence", faculty: "Dr. James Wilson", code: "CS-408" }
    ],
    attendance: [
        { course: "Advanced Algorithms", percentage: 92 },
        { course: "Database Systems", percentage: 85 },
        { course: "Web Engineering", percentage: 78 },
        { course: "Artificial Intelligence", percentage: 95 }
    ],
    grades: [
        { course: "Data Structures", grade: "A" },
        { course: "Operating Systems", grade: "A-" },
        { course: "Computer Networks", grade: "B+" },
        { course: "Software Architecture", grade: "A" }
    ]
};

// Detailed Mock Data for selected course
const COURSE_DETAILS = {
    1: {
        syllabus: [
            "Graph Algorithms (BFS, DFS, Shortest Paths)",
            "Dynamic Programming & Memoization",
            "Network Flow & Max Flow Min Cut",
            "NP-Completeness & Reductions"
        ],
        attendanceHistory: [
            { date: "2026-01-05", status: "Present" },
            { date: "2026-01-03", status: "Present" },
            { date: "2025-12-28", status: "Absent" },
            { date: "2025-12-24", status: "Present" },
        ],
        resources: [
            { date: "2026-01-05", title: "Lecture Slides: Network Flow", type: "PPT", size: "2.4 MB" },
            { date: "2026-01-03", title: "Week 4 Practice Problems", type: "PDF", size: "1.1 MB" },
            { date: "2025-12-24", title: "Graph Theory Basics Note", type: "DOC", size: "850 KB" }
        ],
        nextClass: "Monday, 10:00 AM (Room 304)"
    },
    2: {
        syllabus: [
            "Relational Model & SQL",
            "Normalization (1NF, 2NF, 3NF, BCNF)",
            "Transaction Management & ACID",
            "NoSQL Databases (MongoDB, Cassandra)"
        ],
        attendanceHistory: [
            { date: "2026-01-04", status: "Present" },
            { date: "2026-01-02", status: "Present" },
        ],
        resources: [
            { date: "2026-01-04", title: "SQL Cheat Sheet Reference", type: "PDF", size: "500 KB" },
            { date: "2026-01-02", title: "Normalization Case Studies", type: "PDF", size: "3.2 MB" }
        ],
        nextClass: "Tuesday, 2:00 PM (Lab 2)"
    }
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function StudentDashboard() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const activeCourseDetails = selectedCourse ? (COURSE_DETAILS[selectedCourse.id] || { syllabus: [], attendanceHistory: [], resources: [], nextClass: "TBA" }) : null;

    return (
        <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mx-auto max-w-6xl space-y-8"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Student Dashboard
                        </h1>
                        <p className="text-slate-500 mt-1">Academic Overview</p>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 focus:outline-none"
                        >
                            <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                                AJ
                            </div>
                            <div className="text-left hidden md:block">
                                <div className="text-sm font-medium text-slate-900">{MOCK_DATA.profile.name}</div>
                                <div className="text-xs text-slate-500">{MOCK_DATA.profile.id}</div>
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
                                            <p className="text-sm font-medium text-slate-900">{MOCK_DATA.profile.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{MOCK_DATA.profile.email}</p>
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

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Avg. Attendance</p>
                                <h3 className="text-2xl font-bold text-slate-900">87.5%</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Courses Enrolled</p>
                                <h3 className="text-2xl font-bold text-slate-900">6</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Credits Earned</p>
                                <h3 className="text-2xl font-bold text-slate-900">18</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Upcoming Exams</p>
                                <h3 className="text-2xl font-bold text-slate-900">2</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 md:grid-cols-12">

                    {/* Left Column: Profile & Attendance */}
                    <div className="md:col-span-4 space-y-8">
                        {/* 1. Profile Card */}
                        <motion.div variants={item}>
                            <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                <CardHeader className="pb-2 border-b border-slate-100">
                                    <CardTitle className="text-lg font-semibold text-slate-800">Student Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Name</p>
                                        <p className="text-lg font-medium text-slate-900">{MOCK_DATA.profile.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Department</p>
                                        <p className="text-base text-slate-900">{MOCK_DATA.profile.dept}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Roll Number</p>
                                        <p className="text-base font-mono text-slate-900">{MOCK_DATA.profile.id}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 3. Attendance Section */}
                        <motion.div variants={item}>
                            <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                <CardHeader className="pb-2 border-b border-slate-100">
                                    <CardTitle className="text-lg font-semibold text-slate-800">Attendance</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-5">
                                    {MOCK_DATA.attendance.map((att) => (
                                        <div key={att.course}>
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="font-medium text-slate-700">{att.course}</span>
                                                <span className="font-bold text-slate-900">{att.percentage}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-slate-800 rounded-full"
                                                    style={{ width: `${att.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column: Courses & Grades */}
                    <div className="md:col-span-8 space-y-8">

                        {/* 2. Courses Table - MAKE CLICKABLE */}
                        <motion.div variants={item}>
                            <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                <CardHeader className="pb-2 border-b border-slate-100">
                                    <CardTitle className="text-lg font-semibold text-slate-800">Enrolled Courses</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                                <tr>
                                                    <th className="px-6 py-3 font-semibold">Course Name</th>
                                                    <th className="px-6 py-3 font-semibold">Faculty Name</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {MOCK_DATA.courses.map((course) => (
                                                    <tr
                                                        key={course.id}
                                                        onClick={() => setSelectedCourse(course)}
                                                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                                                    >
                                                        <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                                            {course.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-600">{course.faculty}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 4. Grades Table */}
                        <motion.div variants={item}>
                            <Card className="rounded-lg border border-slate-200 shadow-sm bg-white">
                                <CardHeader className="pb-2 border-b border-slate-100">
                                    <CardTitle className="text-lg font-semibold text-slate-800">Academic Grades</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                                <tr>
                                                    <th className="px-6 py-3 font-semibold">Course Name</th>
                                                    <th className="px-6 py-3 font-semibold text-right">Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {MOCK_DATA.grades.map((grade, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-4 font-medium text-slate-900">{grade.course}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                                                {grade.grade}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                    </div>
                </div>

                {/* Course Detail Modal */}
                <AnimatePresence>
                    {selectedCourse && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{selectedCourse.name}</h2>
                                        <p className="text-slate-500">{selectedCourse.code} • {selectedCourse.faculty}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCourse(null)}
                                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-6 space-y-8">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                            <p className="text-sm font-medium text-slate-500">Upcoming Class</p>
                                            <p className="text-lg font-semibold text-slate-900 mt-1">{activeCourseDetails?.nextClass}</p>
                                        </div>
                                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                            <p className="text-sm font-medium text-emerald-600">Attendance Status</p>
                                            <p className="text-lg font-semibold text-emerald-900 mt-1">
                                                {MOCK_DATA.attendance.find(a => a.course === selectedCourse.name)?.percentage}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Syllabus */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-slate-400" />
                                            Course Syllabus
                                        </h3>
                                        {activeCourseDetails?.syllabus.length > 0 ? (
                                            <ul className="space-y-2">
                                                {activeCourseDetails?.syllabus.map((topic, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-slate-500 italic text-sm">Syllabus details not available.</p>
                                        )}
                                    </div>

                                    {/* Resources - NOW DATE BASED */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-slate-400" />
                                            Class Resources
                                        </h3>
                                        <div className="space-y-3">
                                            {activeCourseDetails?.resources.length > 0 ? (
                                                activeCourseDetails?.resources.map((res, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer group">
                                                        {/* Date Block */}
                                                        <div className="flex-shrink-0 w-12 text-center bg-slate-100 rounded-md py-1 border border-slate-200 group-hover:bg-white group-hover:border-slate-300 transition-colors">
                                                            <div className="text-[10px] uppercase font-bold text-slate-500">{res.date.split('-')[1]}/{res.date.split('-')[2]}</div>
                                                            <div className="text-xs font-bold text-slate-800">{res.date.split('-')[0]}</div>
                                                        </div>

                                                        <div className="flex-grow min-w-0">
                                                            <div className="font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">{res.title}</div>
                                                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                                                <Badge variant="secondary" className="px-1.5 py-0 h-5 text-[10px] bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 border-none">{res.type}</Badge>
                                                                <span>• {res.size}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-slate-500 italic text-sm">No resources uploaded yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Attendance History */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-slate-400" />
                                            Recent Attendance
                                        </h3>
                                        {activeCourseDetails?.attendanceHistory.length > 0 ? (
                                            <div className="bg-white border rounded-lg overflow-hidden">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="bg-slate-50 border-b text-slate-500">
                                                        <tr>
                                                            <th className="px-4 py-2 font-medium">Date</th>
                                                            <th className="px-4 py-2 font-medium">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y">
                                                        {activeCourseDetails?.attendanceHistory.map((record, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-2 text-slate-900">{record.date}</td>
                                                                <td className="px-4 py-2">
                                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                                        {record.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p className="text-slate-500 italic text-sm">No recent records.</p>
                                        )}
                                    </div>

                                </div>
                                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
                                    <Button onClick={() => setSelectedCourse(null)} variant="secondary">Close Details</Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
}
