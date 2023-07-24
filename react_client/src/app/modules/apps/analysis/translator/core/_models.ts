import {ID, Response} from '../../../../../../_metronic/helpers'

export type TranslationInput = {
  sourceLanguage?: string
  targetLanguage: string
  text: string
}

export type TranslationOutput = {
  source_language_code?: string
  target_language_code?: string
  translation?: string
}

export type SearchInput = {
  sourceLanguage?: string
  targetLanguage: string
  text: string
  word: string
  size: number
}

export type PairDoc = {
  source_doc: {
    id: number
    language_code: string
    text: string
  }
  target_doc: {
    id: number
    language_code: string
    text: string
  }
  score: number
}

export type SearchOutput = Document[]

export type DisambiguationInput = {
  sourceLanguage: string
  targetLanguage: string
  text: string
}

export type Audio = {
  language?: string
  audio_url?: string
}

export type Definition = {
  senseId: string
  languageCode: string
  disambiguationScore: number
  gloss: string
}

export type WordToken = {
  lemma: string
  form: string
  isLearning: boolean
  isStopWord: boolean
  pos: string
  tense: string
  definitions: Definition[]
}

export type DisambiguationResponse = Response<Array<WordToken>>
