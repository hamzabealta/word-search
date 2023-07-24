import {
    FC,
    createContext,
    useContext,
    useCallback,
} from 'react'
import { getTranslation } from './_requests'
import { TranslationInput, TranslationOutput } from './_models';
import { WithChildren } from '../../../../../../_metronic/helpers';


type TranslationProviderValue = {
    getTranslation: (input: TranslationInput) => Promise<TranslationOutput | undefined>;
};

const TranslationContext = createContext<TranslationProviderValue | undefined>(undefined);

const useTranslation = (): TranslationProviderValue => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};

const TranslationProvider: FC<WithChildren> = ({ children }) => {
    const getTranslationCallback = useCallback(getTranslation, []);

    const value: TranslationProviderValue = {
        getTranslation: getTranslationCallback,
    };

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export { TranslationProvider, useTranslation };