import React, { createContext, useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import ScreenDimensionsContext, {
    ScreenDimensions
} from './ScreenDimensionsContext';

interface ScreenDimensionsProviderProps {
    children: React.ReactNode;
}

export const ScreenDimensionsProvider: React.FC<
    ScreenDimensionsProviderProps
> = ({ children }) => {
    const [screenDimensions, setScreenDimensions] =
        useState<ScreenDimensions | null>(null);

    useEffect(() => {
        const onChange = ({
            window,
            screen
        }: {
            window: ScaledSize;
            screen: ScaledSize;
        }) => {
            setScreenDimensions({
                screenWidth: window.width,
                screenHeight: window.height
            });
        };

        Dimensions.addEventListener('change', onChange);

        return () => {
            (Dimensions as any).removeEventListener('change', onChange);
        };
    }, []);

    return (
        <ScreenDimensionsContext.Provider value={{ screenDimensions }}>
            {children}
        </ScreenDimensionsContext.Provider>
    );
};
