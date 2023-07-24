import { FC, useRef, useState } from 'react'
import LanguagePicker from './LanguagePicker'
import { Input } from './Input'
import { Translation } from './Translation'
import { Disambiguation } from './Disambiguation'
import { DisambiguationInput, PairDoc, SearchInput, TranslationInput, WordToken } from '../core/_models'
import { useNotifications } from '../../../../../../_metronic/layout/core'
import { getTranslation, getDisambiguation, getSearchTranslations } from '../core/_requests'
import AdsComponent from '../../../../../../_metronic/helpers/components/AdsComponent'
import { Examples } from './Examples'
import { useLang } from '../../../../../../_metronic/i18n/Algernoun18n'

type Props = {
  className: string
}

const TranslationView: FC<Props> = ({ className }) => {
  const lang = useLang()
  const isoMap = {
    de: 'de',
    en: 'en',
    es: 'es',
    ca: 'ca',
    'ar-MA': 'ary',
    fr: 'fr',
    ja: 'ja',
    zh: 'zh',
  }
  const [sourceLanguageValue, setSourceLanguageValue] = useState('auto')
  const [targetLanguageValue, setTargetLanguageValue] = useState(isoMap[lang])
  const [translationValue, setTranslationValue] = useState('')
  const [disambiguationTokens, setDisambiguationTokens] = useState<WordToken[]>([])
  const [exampleDocuments, setExampleDocuments] = useState<PairDoc[]>([])
  const [disambiguationLoading, setDisambiguationLoading] = useState(false)
  const [examplesLoading, setExamplesLoading] = useState(false)

  const { showNotification } = useNotifications()
  const [inputValue, setInputValue] = useState('')

  const inputRef = useRef<HTMLSpanElement>(null)

  const swapLanguage = (sourceLanguage: string, targetLanguage: string) => {
    //move translaition text to otigin text and run translationAction
    if (translationValue) {
      if (inputRef.current?.textContent) {
        inputRef.current.textContent = translationValue
        setInputValue(translationValue)
      }
    }
    changeLanguage(sourceLanguage, targetLanguage)
  }
  const changeLanguage = (sourceLanguage: string, targetLanguage: string) => {
    setSourceLanguageValue(sourceLanguage)
    setTargetLanguageValue(targetLanguage)

    if (inputRef.current?.textContent) {
      translationAction(inputRef.current.textContent, sourceLanguage, targetLanguage)
    }
  }

  const searchAction = (text: string, word: string, sourceLanguage?: string, targetLanguage?: string) => {
    if (text !== '' && word !== '') {
      setExamplesLoading(true)
      let search_state: SearchInput = {
        sourceLanguage: sourceLanguage ?? sourceLanguageValue,
        targetLanguage: targetLanguage ?? targetLanguageValue,
        text: text,
        word: word,
        size: 10
      }

      getSearchTranslations(search_state)
        .then((documents) => {
          setExampleDocuments(documents ?? [])

        })
        .catch((error) => {
          showNotification('error', error.toString())
        })
        .finally(() => {
          setExamplesLoading(false)
        })
    }
  }

  const translationAction = (text: string, sourceLanguage?: string, targetLanguage?: string) => {
    if (text !== '') {
      let translation_state: TranslationInput = {
        sourceLanguage: sourceLanguage ?? sourceLanguageValue,
        targetLanguage: targetLanguage ?? targetLanguageValue,
        text: text,
      }

      getTranslation(translation_state)
        .then((translation) => {
          setTranslationValue(translation?.translation ?? '...')
          if (sourceLanguageValue === 'auto') {
            setSourceLanguageValue(translation?.source_language_code ?? 'auto')
          }
        })
        .catch((error) => {
          showNotification('error', error.toString())
        })
        .finally(() => {
          // set loading false
        })
    }
  }
  // set loading true
  const computeDisambiguation = (text: string) => {
    if (text !== '') {
      setDisambiguationLoading(true)
      let disambiguation_state: DisambiguationInput = {
        sourceLanguage: sourceLanguageValue,
        targetLanguage: targetLanguageValue,
        text: text,
      }

      getDisambiguation(disambiguation_state)
        .then((analysis) => {
          setDisambiguationTokens(analysis ?? [])
        })
        .catch((error) => {
          showNotification('error', error.toString())
        })
        .finally(() => {
          setDisambiguationLoading(false)
        })
    }
  }

  const clearInput = () => {
    setTranslationValue('')
    setDisambiguationTokens([])
    setExampleDocuments([])
  }

  return (
    <div className='row'>
      <div className='d-flex justify-content-center align-items-center p-3'>
        <LanguagePicker onLanguageChange={changeLanguage} onSwap={swapLanguage} />
      </div>
      <div className='text-center'>
        <div
          className='alert alert-gray text-center p-5 text-secondary m-auto'
          role='alert'
          style={{ width: 'fit-content' }}
        >
          Seletect a word or text to search for examples!
        </div>
      </div>
      <div className='row gy-5 g-xl-10 mb-5 mb-xl-0 m-auto p-0'>
        <div className='col-xl-6 col-md-6 col-lg-6'>
          <Input
            className='card-xl-stretch mb-xl-10'
            inputRef={inputRef}
            inputLanguage={sourceLanguageValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            tokens={disambiguationTokens}
            clearInput={clearInput}
            computeAction={translationAction}
            computeSecondAction={computeDisambiguation}
            computeThirdAction={searchAction}
          // reproduceAudio={reproduceAudio}
          />
        </div>
        <div className='col-xl-6 col-md-6 col-lg-6'>
          <Translation className='card-xl-stretch mb-xl-10 h-100' text={translationValue} />
        </div>
      </div>

      <Disambiguation
        className={''}
        tokens={disambiguationTokens}
        loading={disambiguationLoading}
      />

      <Examples
        className={''}
        documents={exampleDocuments}
        loading={examplesLoading}
      />

      <AdsComponent dataAdSlot={'9530879548'} />

    </div>
  )
}

export { TranslationView }
