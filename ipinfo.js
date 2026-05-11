// IP information lookup script - using the ip-api.com API
const url = "http://ip-api.com/json";

$httpClient.get(url, (error, response, data) => {
    if (error) {
        console.error('Request error:', error);
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

// Clean ISP information by removing unnecessary descriptive text
function cleanIspInfo(isp) {
    return isp
        // Remove special content
        .replace(/\(.*?\)|[-,.]/g, '')
        // Remove full words
        .replace(/\b(Hong Kong|Mass internet|Communications?|Company|Pty|LTD|information|international|Technolog(y|ies)|ESolutions?|Services Limited|Magix Services)\b/gi, '')
        // Simplify overly long words
        .replace(/(munications?)/gi, '')
        // Merge extra spaces
        .replace(/\s+/g, ' ')
        .trim();
}