
const STORAGE_KEYS = {
    USERS: 'erp_users',
    ACTIVITIES: 'erp_activities',
    SETTINGS: 'erp_settings'
};

export const adminService = {
    getStats: async () => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        return {
            students: users.filter(u => u.role === 'student').length + 2843,
            faculty: users.filter(u => u.role === 'faculty').length + 140,
            courses: 86,
            load: '12%'
        };
    },

    getUsers: async () => {
        const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        if (storedUsers.length === 0) {
            const initialUsers = [
                { id: 1, name: 'John Doe', email: 'john@yen.edu.in', role: 'student' },
                { id: 2, name: 'Prof. Sarah', email: 'sarah@yen.edu.in', role: 'faculty' }
            ];
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
            return initialUsers;
        }
        return storedUsers;
    },

    createUser: async (user) => {
        const users = await adminService.getUsers();
        const newUser = { ...user, id: Date.now() };
        const updatedUsers = [newUser, ...users];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

        // Log activity
        await adminService.logActivity({
            title: 'User Created',
            desc: `New ${newUser.role} profile registered: ${newUser.name}`,
            type: newUser.role === 'admin' ? 'red' : 'blue'
        });

        return newUser;
    },

    deleteUser: async (id) => {
        const users = await adminService.getUsers();
        const updated = users.filter(u => u.id !== id);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
        return updated;
    },

    getActivities: async () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
    },

    logActivity: async (activity) => {
        const activities = await adminService.getActivities();
        const newActivity = {
            id: Date.now(),
            time: 'Just now',
            ...activity
        };
        const updated = [newActivity, ...activities].slice(0, 10);
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
        return newActivity;
    }
};
