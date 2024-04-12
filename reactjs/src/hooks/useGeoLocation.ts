import { useState, useEffect } from 'react';

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface LocationState {
    loaded: boolean;
    coordinates?: Coordinates;
    error?: {
        code: number;
        message: string;
    };
}
interface Position {
    coords: {
        latitude: number;
        longitude: number;
    };
}

const useGeolocation = (): LocationState => {
    const [location, setLocation] = useState<LocationState>({
        loaded: false,
    });

    const onSuccess = (position: Position) => {
        setLocation({
            loaded: true,
            coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            },
        });
    };

    const onError = (error: GeolocationPositionError) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!navigator || !navigator.geolocation) {
            setLocation({
                loaded: true,
                error: {
                    code: 0,
                    message: 'Geolocation is not supported',
                },
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeolocation;
