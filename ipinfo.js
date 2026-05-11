// IP信息查询脚本 - 使用ip-api.com接口
const url = "http://ip-api.com/json";
$httpClient.get(url, (error, response, data) => {
    if (error) {
        console.error('请求错误：', error);
        return $done();
    }
    
    const jsonData = JSON.parse(data);
    const { country, countryCode, city, isp, query: ip } = jsonData;
    
// Generate flag emoji and location information
const emoji = getFlagEmoji(countryCode);
const location = (country === city) ? `${emoji} │ ${country}` : `${emoji} ${countryCode} │ ${city}`;
const cleanedIsp = cleanIspInfo(isp);

const body = {
    title: "Node Information",
    content: `IP Address: ${ip}\nISP: ${cleanedIsp}\nLocation: ${location}`,
    icon: "globe.asia.australia",
    'icon-color': '#3D90ED'
};

$done(body);
});

// Generate flag emoji based on country code
function getFlagEmoji(countryCode) {
    return String.fromCodePoint(
        ...countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt())
    );
}

// 清理ISP信息，去除多余的描述文字
function cleanIspInfo(isp) {
    return isp
        // 去除特殊内容
        .replace(/\(.*?\)|[-,.]/g, '')
        // 去除完整词汇
        .replace(/\b(Hong Kong|Mass internet|Communications?|Company|Pty|LTD|information|international|Technolog(y|ies)|ESolutions?|Services Limited|Magix Services)\b/gi, '')
        // 简化过长词汇
        .replace(/(munications?)/gi, '')
        // 合并多余空格
        .replace(/\s+/g, ' ')
        .trim();
}