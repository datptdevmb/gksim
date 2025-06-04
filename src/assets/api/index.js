

const BaseUrl = `https://bkasim.duckdns.org`
// const BaseUrl = `https://a873-2a09-bac5-d46e-25d7-00-3c5-1.ngrok-free.app`


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