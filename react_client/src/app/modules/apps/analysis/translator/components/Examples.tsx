import { FC } from 'react'
import { PairDoc } from '../core/_models'
import { Translation } from './Translation'

type Props = {
  className: string
  documents: PairDoc[]
  loading: boolean
}

const Examples: FC<Props> = ({ className, documents, loading }) => {
  return (

    <div className='row mx-0 m-10 card p-0 bg-secondary'>

      {loading && (
        <div className='container m-auto text-center'>
          <span className='spinner-border align-middle text-gray-400' />
        </div>
      )}
      {documents
        .map((pair) => (
          <div key={pair.source_doc.id + pair.target_doc.id} className='row my-3 px-5 py-0 mx-auto'>
            <div className='col-xl-6 col-md-6 col-lg-6'>
              <Translation className='card-xl-stretch mb-0 pt-6' text={pair.source_doc?.text} />
            </div>
            <div className='col-xl-6 col-md-6 col-lg-6'>
              <Translation className='card-xl-stretch mb-0 pt-6' text={pair.target_doc?.text} />
            </div>
          </div>
        ))}
    </div>
  )
}

export { Examples }
