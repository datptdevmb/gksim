

const BASE_URL = `https://bkasim.duckdns.org`



const API_URL = {
    getFeatured: `${BASE_URL}/blogs/featured`,
    getUsers: `${BASE_URL}/users`,
    getUserInf: `${BASE_URL}/users/:id`,
    getCategories: `${BASE_URL}/categories`,
    getBlogByCate: `${BASE_URL}/blogs`,
    regisZl: `${BASE_URL}/auth/register-zalo`,
    loginZalo: `${BASE_URL}/auth/login-zalo`,
    getBlogById: `${BASE_URL}/blogs/{id}`,
}

export default API_URL;