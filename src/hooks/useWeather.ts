import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api";

export const useWeather = (city: string) => {
    return useQuery({
        queryKey: ["weather", city],
        queryFn: () => fetchWeather(city),
        enabled: !!city,
    });
}