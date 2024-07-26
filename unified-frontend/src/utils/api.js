import localforage from 'localforage';
import { parseRecommendations, parseContent } from './parser';

localforage.config({
    driver: localforage.LOCALSTORAGE,
    name: 'iTravelCache',
    version: 1.0,
    storeName: 'keyvaluepairs',
    description: 'some description'
});

const generateCacheKey = (type, destination, bodyContent) => {
    return `${type}:${destination.toUpperCase()}:${JSON.stringify(bodyContent)}`;
};

const fetchImageUrl = async (query, setImageLoading) => {
    setImageLoading(true);
    try {
        const response = await fetch('http://localhost:5000/get_image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.image_url || 'https://via.placeholder.com/150';
    } catch (error) {
        console.error('Error fetching image URL:', error);
        return 'https://via.placeholder.com/150';
    } finally {
        setImageLoading(false);
    }
};

const fetchContentFromBackend = async (destination, type, bodyContent, setLoading, setConversation, setRecommendations, setGuide) => {
    const cacheKey = generateCacheKey(type, destination, bodyContent);
    const cachedResponse = await localforage.getItem(cacheKey);

    if (cachedResponse) {
        if (type === 'recommendations') {
            setRecommendations(cachedResponse);
        } else if (type === 'guide') {
            setGuide(cachedResponse);
        }
        return;
    }

    setLoading(true);
    console.log(`Fetching ${type} for ${destination} with body:`, bodyContent);
    try {
        const response = await fetch(`http://localhost:8080/api/kimi/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyContent)
        });
        const data = await response.json();
        console.log(`Fetched ${type} data:`, data);

        if (type === 'recommendations') {
            const parsedRecommendations = await parseRecommendations(data.choices[0].message.content, fetchImageUrl);
            setRecommendations(parsedRecommendations);
            await localforage.setItem(cacheKey, parsedRecommendations);
        } else if (type === 'guide') {
            const parsedGuide = parseContent(data.choices[0].message.content);
            setGuide(parsedGuide);
            await localforage.setItem(cacheKey, parsedGuide);
        }

        setConversation(prevConversation => [
            ...prevConversation,
            ...bodyContent.messages,
            { role: 'assistant', content: data.choices[0].message.content }
        ]);

        setLoading(false);
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        setLoading(false);
    }
};

export { fetchImageUrl, fetchContentFromBackend };
