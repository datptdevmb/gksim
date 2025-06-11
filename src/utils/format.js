

export function formatTitle(pathname) {
    return pathname
        .replace(/^\//, "")             
        .replace(/-/g, " ")              
        .replace(/\b\w/g, (c) => c.toUpperCase()); 
}
