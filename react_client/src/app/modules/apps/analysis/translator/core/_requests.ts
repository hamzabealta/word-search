import axios, {AxiosResponse} from 'axios'
import qs from 'qs'
import {Response} from '../../../../../../_metronic/helpers'
import {TranslationInput, TranslationOutput, DisambiguationInput, WordToken, SearchInput, PairDoc} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const TRANSLATION_URL = `${API_URL}/translate`
const ANALYSIS_URL = `${API_URL}/analysis`
const SEARCH_URL = `${API_URL}/search`

const getTranslation = (input: TranslationInput): Promise<TranslationOutput | undefined> => {
  const data = qs.stringify(input)

  return axios
    .post(`${TRANSLATION_URL}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response: AxiosResponse<Response<TranslationOutput>>) => response.data)
    .then((response: Response<TranslationOutput>) => response.data)
}

const getDisambiguation = (input: DisambiguationInput): Promise<WordToken[] | undefined> => {
  const data = qs.stringify(input)

  return axios
    .post(`${ANALYSIS_URL}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response: AxiosResponse<Response<WordToken[]>>) => response.data)
    .then((response: Response<WordToken[]>) => response.data)
}

const getSearchTranslations = (input: SearchInput): Promise<PairDoc[] | undefined> => {
  const data = qs.stringify(input)

  return axios
    .post(`${SEARCH_URL}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response: AxiosResponse<Response<PairDoc[]>>) => response.data)
    .then((response: Response<PairDoc[]>) => response.data)
}

export {getTranslation, getDisambiguation, getSearchTranslations}
