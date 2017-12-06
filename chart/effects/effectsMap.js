import * as effects from './index';

export const effectsMap = new Map();
effectsMap.set('area', effects.AreaEffect);
effectsMap.set('datapoints', effects.DataPointEffect);
effectsMap.set('mousetracking', effects.MouseTrackingEffect);
effectsMap.set('symbol', effects.SymbolEffect);
