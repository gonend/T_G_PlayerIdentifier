import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export interface ScreenDimensions {
    screenWidth: number;
    screenHeight: number;
}

export interface ScreenDimensionsContextType {
    screenDimensions: ScreenDimensions | null;
}

export const ScreenDimensionsContext =
    createContext<ScreenDimensionsContextType>({
        screenDimensions: null
    });

export const useScreenDimensions = (): ScreenDimensions => {
    const { screenDimensions } = useContext(ScreenDimensionsContext);

    if (!screenDimensions) {
        throw new Error('Screen dimensions not available in context');
    }

    return screenDimensions;
};

export default ScreenDimensionsContext;
