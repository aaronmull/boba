export function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, '-')
}