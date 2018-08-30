
const { create } = require('apisauce');

const api = create({
    baseURL: 'http://localhost:3000/api',
});

export default {
    api,
    getHome: () => api.get('/'),
    getTests: () => api.get('test'),
    createTest: (name) => api.post('test', { name }),
    removeTest: (id) => api.delete(`test/${id}`),
    loadUser: async () => {
        const token = localStorage.getItem('token');
        if (token) {
            api.setHeader('Authorization', `Bearer ${token}`);
            const res = await api.get('/user');
            const data = res.data;
            if (data.msg === 'success') {
                return data.user;
            }
        }
    },
    login: (name, password) => api.post('/user/token', { name, password }),
    signup: (name, password) => api.post('/user', { name, password }),
};