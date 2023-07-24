import { FC, useRef } from 'react'
import { KTSVG } from '../../../../../../_metronic/helpers';
import React from 'react';
import { useIntl } from 'react-intl';
import TextToSpeech from './TextToSpeech';
import { WordToken } from '../core/_models';

type Props = {
    className: string,
    inputRef: any,
    inputLanguage?: string,
    inputValue: string,
    tokens: WordToken[],
    setInputValue: (text: string) => void;
    clearInput: () => void,
    computeAction: (text: string) => void,
    computeSecondAction: (text: string) => void,
    computeThirdAction: (text: string, word: string) => void,

}

const Input: FC<Props> = (
    {
        className,
        inputRef,
        inputLanguage,
        inputValue,
        tokens,
        setInputValue,
        clearInput,
        computeAction,
        computeSecondAction,
        computeThirdAction
        // reproduceAudio,
    }) => {
    const intl = useIntl()

    // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const typingTimeoutRef = useRef<any>(null);

    const handleInputChange = (event: React.SyntheticEvent) => {
        const target = event.currentTarget as HTMLSpanElement;

        setInputValue((target.textContent ?? "").slice(0, 144));

        if (target.textContent === "") { clearInput() };

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            if (target.textContent) {
                computeAction(target.textContent);
            }
        }, 1000);
    };

    function getWord(s: string, pos: number): string {
        s = normalizeText(s);
        const n = s.substring(pos).match(/^[a-zA-Z0-9-_]+/);
        const p = s.substring(0, pos).match(/[a-zA-Z0-9-_]+$/);
        // if you really only want the word if you click at start or between
        // but not at the end instead use if (!n) return
        if (!n) return "";
        return (p?.[0] || "") + (n?.[0] || "");
    }

    function normalizeText(text: string): string {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function getSelectionText(): string {
        let text = "";
        if (window.getSelection) {
            const selection = window.getSelection();
            if (selection && selection.type === "Caret") {
                const input_text = selection.anchorNode?.textContent;
                if (input_text) {
                    text = getWord(input_text, selection.anchorOffset);
                }
            } else {
                text = selection?.toString() || "";
            }
        } else if (document.getSelection && document.getSelection()?.type !== "Control") {
            text = document.getSelection()?.toString() || "";
        }
        return text;
    }


    // const handleAudioClick = async () => {
    //     setIsAudioPlaying(true);
    //     await reproduceAudio();
    //     setIsAudioPlaying(false);
    // };

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Get the target element that was clicked
        const clickedElement = event.target as HTMLElement;

        // Check if the target element is the input element or one of the buttons
        const isInput = clickedElement === inputRef.current;
        const isButton = clickedElement.tagName === 'BUTTON' || clickedElement.parentElement?.tagName === 'BUTTON';

        // Set focus on input if the target element is not the input or a button
        if (!isInput && !isButton) {
            inputRef.current?.focus();
        }
    };


    const clearLocalInput = () => {
        setInputValue("");
        if (inputRef.current?.textContent) {
            inputRef.current.textContent = "";
        }
        clearInput();
    }

    return (
        <div
            className={`card ${className} h-100`}
            onClick={handleClick}
        >
            <div className="card-header align-items-center pt-3 pr-4 border-bottom-0" style={{ minHeight: '50px' }}>
                {inputValue !== "" && (
                    <>
                        <h3 className='card-title fw-bolder fs-3'>

                        </h3>

                        <div className='card-toolbar'>
                            <button
                                type='button'
                                className='btn btn-sm btn-icon '
                                onClick={clearLocalInput}
                            >
                                <KTSVG path='/media/icons/duotune/general/gen034.svg' className='svg-icon-1' />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="card-body d-flex align-items-center pt-0">
                <span
                    ref={inputRef}
                    className="text-gray-900 px-4 flex-grow-1 fs-2"
                    style={{ outline: 'none', maxWidth: '100%' }}
                    role="textbox"
                    contentEditable
                    onInput={handleInputChange}
                    onMouseUp={()=>{
                        let textSelected = getSelectionText();
                        if (textSelected !== "") {
                            computeThirdAction(inputValue, textSelected)
                        } 
                    }}
                ></span>
                <div className={!inputValue ? `position-absolute px-5 fs-2 text-gray-400` : `d-none`}>
                    {intl.formatMessage({ id: 'TRANSLATE.PLACEHOLDER' })}
                </div>
            </div>


            <div className="card-footer d-flex align-items-center justify-content-between border-top-0 pt-1 pb-4 m-0">
                {inputValue !== "" && (
                    <>
                        <div>
                            <TextToSpeech text={inputValue} language={inputLanguage} />
                            <button
                                type='button'
                                className='btn btn-sm btn-icon '
                                // onClick={() => { computeSecondAction(inputValue) }}
                                onClick={() => { computeThirdAction(inputValue, inputValue) }}
                            >
                                <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-1' />
                            </button>
                        </div>
                        <span className='text-gray-700'>{inputValue?.length}/144</span>
                    </>
                )}
            </div>

        </div>
    );
}

export { Input }
