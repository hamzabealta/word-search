import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import {useLang} from '../../../../../../_metronic/i18n/Algernoun18n'

type Props = {
  onLanguageChange: any
  onSwap: any
}

const LanguagePicker: React.FC<Props> = ({onLanguageChange, onSwap}) => {
  const intl = useIntl()
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
  const languages = [
    {value: 'auto', label: intl.formatMessage({id: 'TRANSLATE.DETECT'})},
    {value: 'en', label: 'English'},
    {value: 'es', label: 'Español'},
    {value: 'ary', label: 'Darija (الدارجة)'},
    {value: 'ar', label: 'العربية'},
    {value: 'ca', label: 'Català'},
    {value: 'fr', label: 'Français'},
    {value: 'de', label: 'Deutsch'},
    {value: 'ja', label: '日本語'},
    {value: 'zh', label: '中文'},
  ]

  const [sourceLanguage, setSourceLanguage] = useState(languages[0].value)
  const [targetLanguage, setTargetLanguage] = useState(isoMap[lang])

  const handleSourceLanguageChange = (e: any) => {
    setSourceLanguage(e.target.value)
    onLanguageChange(e.target.value, targetLanguage)
  }

  const handleTargetLanguageChange = (e: any) => {
    setTargetLanguage(e.target.value)
    onLanguageChange(sourceLanguage, e.target.value)
  }

  const handleSwapLanguages = () => {
    const temp =
      sourceLanguage !== 'auto'
        ? sourceLanguage
        : languages.filter(
            (language) => language.value !== targetLanguage && language.value !== 'auto'
          )[0].value
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
    onSwap(targetLanguage, temp)
  }

  return (
    <>
      <div className='flex-1' style={{flex: 1}}>
        <div className='language-picker w-100' style={{maxWidth: '170px', float: 'right'}}>
          <div className='languages d-flex align-items-center'>
            <select
              // ref={sourceRef}
              id='source-language'
              className='form-select form-select-solid'
              data-kt-select2='true'
              data-placeholder={intl.formatMessage({id: 'TRANSLATE.DETECT'})}
              data-allow-clear='true'
              value={sourceLanguage}
              onChange={handleSourceLanguageChange}
            >
              {languages.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        type='button'
        aria-label='Swap Language'
        className='rounded btn btn-sm btn-icon btn-color-gray600 btn-active-secondary d-flex align-items-center mx-5'
        onClick={handleSwapLanguages}
      >
        <i className='fas fa-exchange'></i>
      </button>
      <div className='flex-1' style={{flex: 1}}>
        <div className='language-picker w-100' style={{maxWidth: '170px', float: 'left'}}>
          <div className='languages d-flex align-items-center'>
            <select
              // ref={targetRef}
              id='target-language'
              className='form-select form-select-solid'
              data-kt-select2='true'
              data-allow-clear='true'
              value={targetLanguage}
              onChange={handleTargetLanguageChange}
            >
              {languages
                .filter((language) => language.value !== 'auto')
                .map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default LanguagePicker
