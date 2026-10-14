import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/browser',timeout:90000,workers:1,
 use:{baseURL:'http://localhost:5173',viewport:{width:960,height:640},launchOptions:{executablePath:process.env.JUNKBOT_BROWSER||'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl']},screenshot:'only-on-failure'},
 webServer:{command:'npm run dev -- --port 5173',url:'http://localhost:5173',reuseExistingServer:true,timeout:30000},
});
