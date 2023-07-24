import {FC} from 'react'
import {TokenInfo} from './TokenInfo'
import {WordToken} from '../core/_models'

type Props = {
  className: string
  tokens: WordToken[]
  loading: boolean
}

const Disambiguation: FC<Props> = ({className, tokens, loading}) => {
  return (
    <div className='row mx-0 mt-10'>

      {loading && (
        <div className='container m-auto text-center'>
          <span className='spinner-border align-middle text-gray-400' />
        </div>
      )}
      {tokens
        .filter((token) => !token.isStopWord)
        .map((token) => (
          <TokenInfo key={token.lemma} className={''} token={token} />
        ))}
    </div>
  )
}

export {Disambiguation}
