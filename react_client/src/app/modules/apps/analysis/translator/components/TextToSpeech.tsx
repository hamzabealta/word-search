import { startTransition, useState, useEffect, useCallback } from 'react';
import { KTSVG } from '../../../../../../_metronic/helpers';


type TextToSpeechProps = {
    text: string;
    language?: string;
    volume?: number;
    rate?: number;
    pitch?: number;
};

const utterance = new SpeechSynthesisUtterance();
type LanguageMapType = {
    [key: string]: string;
    auto: string;
    en: string;
    es: string;
    ary: string;
};

const languageMap: LanguageMapType = {
    "auto": "en-GB",
    "en": "en",
    "es": "es-ES",
    "ary": "ar",
}

const apple_names = ["samantha", "anna", "mónica", "satu", "amélie"]

function TextToSpeech({ text, language = 'en-US', volume = 1, rate = 1, pitch = 1 }: TextToSpeechProps) {
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const refreshVoice = useCallback(() => {
        const voices = window.speechSynthesis.getVoices();
        let voice = null;
        // Preferably a google male voice
        voice = voices.find(voice => voice.lang.startsWith(languageMap[language]?? language) && voice.name.toLowerCase().includes("google") && voice.name.toLowerCase().includes(" male"));

        // If there isn't a Google male voice, get a any Google voice.
        if (!voice) {
            voice = voices.find(voice => voice.lang.startsWith(languageMap[language] ?? language) && voice.name.toLowerCase().includes("google"));
        }

        // If there isn't any Google voice, then any voice starting with languageMap[language] or language.
        if (!voice) {
            voice = voices.find(voice => voice.lang.startsWith(languageMap[language] ?? language) && apple_names.includes(voice.name.toLowerCase()));
        }

        // If there isn't any Google voice, then any voice starting with languageMap[language] or language.
        if (!voice) {
            voice = voices.find(voice => voice.lang.startsWith(languageMap[language] ?? language));
        }

        // If none of these conditions are met, get any available voice.
        if (!voice) {
            voice = voices[0];
        }

        setVoice(voice);
    }, [language]);

    useEffect(() => {
        refreshVoice()

    }, [refreshVoice]);


    useEffect(() => {

        utterance.text = text;
        utterance.voice = voice;
        utterance.volume = volume;
        utterance.rate = rate;
        utterance.pitch = pitch;

        utterance.onstart = () => {
            startTransition(() => {
                setIsSpeaking(true);
            });
        };

        utterance.onend = () => {
            startTransition(() => {
                setIsSpeaking(false);
            });
        };

        utterance.onerror = (event) => {
            console.error('SpeechSynthesisUtterance encountered an error:', event.error);
        };
        if (voice) {
            refreshVoice()
        }
    }, [voice, text, volume, rate, pitch, refreshVoice]);

    const speak = () => {
        window.speechSynthesis.speak(utterance);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
    };
    return (
        <>
            <button
                type='button'
                className='btn btn-sm btn-icon '
                disabled={isSpeaking}
                onClick={isSpeaking ? stop : speak}
            >
                {isSpeaking ?
                    <span className='spinner-border h-15px w-15px align-middle text-gray-400' /> :
                    <KTSVG path='/media/icons/duotune/arrows/arr027.svg' className='svg-icon-1' />
                    // <KTSVG path='/media/icons/duotune/abstract/abs046.svg' className='svg-icon-1' />
                }
            </button>

        </>
    );
}

export default TextToSpeech;
