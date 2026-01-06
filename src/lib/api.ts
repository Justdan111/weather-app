import api from './axios';

export const fetchWeather = async (city: string) => {
    const response = await api.get(`/weather?city=${city}`);
    return response.data;
};