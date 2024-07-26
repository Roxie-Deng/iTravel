const parseRecommendations = async (text, fetchImageUrl) => {
    const recommendations = [];
    const lines = text.split('\n');
    let currentPOI = null;

    for (const line of lines) {
        const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\:\s(.+)/);
        if (match) {
            if (currentPOI) {
                recommendations.push(currentPOI);
            }
            const placeName = match[1];
            currentPOI = {
                name: placeName,
                description: match[2],
                imageUrl: await fetchImageUrl(placeName)
            };
        } else if (currentPOI) {
            currentPOI.description += ' ' + line;
        }
    }

    if (currentPOI) {
        recommendations.push(currentPOI);
    }

    return recommendations;
};

const parseContent = (responseBody) => {
    const dayRegex = /-\s\*\*Day\s(\d+):\s(.*?)\*\*\n(.*?)(?=\n- \*\*Day|\n\n- \*\*Day|\n\*\*Day|$)/gs;
    const activityRegex = /-\s(Morning|Late Morning|Afternoon|Evening):\s(.*?)\n/gs;

    let guide = [];

    let dayMatch;
    while ((dayMatch = dayRegex.exec(responseBody))) {
        let dayNumber = dayMatch[1];
        let dayTheme = dayMatch[2];
        let activities = dayMatch[3];

        let dayActivities = [];
        let activityMatch;
        while ((activityMatch = activityRegex.exec(activities))) {
            let time = activityMatch[1];
            let description = activityMatch[2].trim();

            dayActivities.push({
                time,
                description
            });
        }

        guide.push({
            day: `Day ${dayNumber}: ${dayTheme}`,
            activities: dayActivities
        });
    }

    return guide;
};

export { parseRecommendations, parseContent };
