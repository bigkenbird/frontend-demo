const viteMetaEnv = import.meta.env;
export function getEnvironmentMode() {
    if (viteMetaEnv)
        return viteMetaEnv.MODE;
    return process.env.NODE_ENV;
}
export function isDevEnvironmentMode() {
    return getEnvironmentMode() === 'development';
}
export function isProdEnvironmentMode() {
    return getEnvironmentMode() === 'production';
}
export function getEnvironementBaseURL() {
    if (viteMetaEnv)
        return viteMetaEnv.BASE_URL;
    return process.env.BASE_URL;
}
export function getNodeEnv() {
    return process.env.NODE_ENV || 'production';
}