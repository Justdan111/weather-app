import api from './axios';

interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    icon: string;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await api.get(`/weather?city=${city}`);
    const data = response.data;
    
    // Transform OpenWeatherMap API response to WeatherData format
    return {
        city: data.name,
        country: data.sys?.country || '',
        temperature: data.main?.temp || 0,
        condition: data.weather?.[0]?.description || 'Unknown',
        humidity: data.main?.humidity || 0,
        windSpeed: data.wind?.speed || 0,
        feelsLike: data.main?.feels_like || 0,
        icon: data.weather?.[0]?.icon || '',
    };
};