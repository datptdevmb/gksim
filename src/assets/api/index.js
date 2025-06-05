

const BaseUrl = `https://bkasim.duckdns.org`



const apiUrl = {
    getFeatured: `${BaseUrl}/blogs/featured`,
    getUsers: `${BaseUrl}/users`,
    getUserInf: `${BaseUrl}/users/:id`,
    getCategories: `${BaseUrl}/categories`,
    getNewsByCategory: `${BaseUrl}/blogs`,
    regisZl: `${BaseUrl}/auth/register-zalo`,
    loginZalo: `${BaseUrl}/auth/login-zalo`,
    getBlogById: `${BaseUrl}/blogs/{id}`,

}

export default apiUrl;