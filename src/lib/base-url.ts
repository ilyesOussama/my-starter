/* import { env } from "@/env/server";
 */
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; /* 
  if (env.VERCEL_URL) return `https://${env.DOMAIN_URL}`; */
  return "http://localhost:3000";
};

export default getBaseUrl;
