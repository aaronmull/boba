export function deslugify(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}