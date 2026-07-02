
import { Link } from "react-router-dom";
import {useGetAllTasks} from "../hooks/useTask.ts";
import {Navbar} from "../components/Navbar.tsx";

export const Dashboard = () => {

    const {data: tasksData, isLoading: tasksLoading} = useGetAllTasks();

    const stats = [
        { label: "Total Tasks", value: "12", icon: "📋", color: "bg-blue-500" },
        { label: "Completed", value: "8", icon: "✅", color: "bg-green-500" },
        { label: "In Progress", value: "3", icon: "⏳", color: "bg-yellow-500" },
        { label: "Pending", value: "1", icon: "🕒", color: "bg-red-500" },
    ];

    const tasks = [
        { id: 1, title: "Design Dashboard UI", priority: "High", status: "In Progress", dueDate: "2026-07-01" },
        { id: 2, title: "Integrate Auth API", priority: "Medium", status: "Completed", dueDate: "2026-06-28" },
        { id: 3, title: "Fix Sidebar Responsiveness", priority: "Low", status: "Pending", dueDate: "2026-07-05" },
        { id: 4, title: "Setup Project Structure", priority: "High", status: "Completed", dueDate: "2026-06-25" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:flex">
                <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">TaskFlow</span>
                </div>
                <nav className="flex-1 space-y-1 px-3 py-4">
                    <Link to="/dashboard" className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
                        <span className="mr-3">📊</span>
                        Dashboard
                    </Link>
                    <Link to="/tasks" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white">
                        <span className="mr-3">📝</span>
                        My Tasks
                    </Link>
                    <Link to="/projects" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white">
                        <span className="mr-3">📂</span>
                        Projects
                    </Link>
                    <Link to="/calendar" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white">
                        <span className="mr-3">📅</span>
                        Calendar
                    </Link>
                </nav>
                <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                    <Link to="/settings" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white">
                        <span className="mr-3">⚙️</span>
                        Settings
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <Navbar />
                {/* Dashboard View */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, here's what's happening today.</p>
                        </div>
                        <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            + New Task
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                                <div className="flex items-center">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-xl text-white`}>
                                        {stat.icon}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Tasks Table */}
                    <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Tasks</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Task</th>
                                        <th className="px-6 py-3 font-medium">Priority</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Due Date</th>
                                        <th className="px-6 py-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {tasksData?.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">{task.title}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                    task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                    task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                                }`}>
                                                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                        task.status === 'Completed' ? 'bg-green-600' :
                                                        task.status === 'In Progress' ? 'bg-blue-600' :
                                                        'bg-gray-400'
                                                    }`}></span>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-600 dark:text-gray-400">{task.dueDate}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <button className="font-medium text-black hover:underline dark:text-white">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                View all tasks →
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
