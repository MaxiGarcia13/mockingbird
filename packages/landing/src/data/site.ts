import packageJson from '../../../../package.json';

export const siteName = 'Mockingbird';
export const githubUrl = packageJson.homepage;
export const siteDescription = packageJson.description;
export const defaultTitle = `${siteName} — HTTP mocking for API debugging`;
export const pageUrl = 'https://mockiingbird.vercel.app';
export const imageUrl = new URL('/favicon.png', pageUrl).href;
