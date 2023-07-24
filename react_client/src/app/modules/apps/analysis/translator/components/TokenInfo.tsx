import { FC } from 'react'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { WordToken } from '../core/_models'

type Props = {
    className: string
    token: WordToken
}

const TokenInfo: FC<Props> = ({ className, token }) => {
    const {form, pos, definitions, isLearning } = token

    if (!definitions || definitions.length === 0) {
        return null; // or some placeholder content
    }
    
    return (
        <div  className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 my-4">
            <div className={`card ${className}`}>
                <div className="card-header" style={{minHeight: 0}}>
                    <h3 className='card-title fs-4'>{form}</h3>
                    <div className='card-toolbar'>
                        <button type='button' className='btn btn-sm btn-icon '>
                            <KTSVG path={isLearning ? '/media/icons/duotune/general/gen056.svg' : '/media/icons/duotune/general/gen056-2.svg'} className='svg-icon-1' />
                        </button>
                    </div>
                </div>
                <div className="card-body d-flex align-items-center px-3">
                    <span className="text-gray-900 px-4 flex-grow-1 fs-6 w-100">
                        <b>{pos}</b> {definitions[0].gloss}
                    </span>
                </div>
                <div className="card-footer d-flex justify-content-between p-2">
                    <span className='button bg-outline-dark p-3 rounded-circle text-muted' >
                        {definitions[0].disambiguationScore}%
                    </span>
                    <a
                        href='/apps/analysis/translator'
                        className='btn btn-sm btn-secondary'
                    >
                        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                        See more
                    </a>
                </div>
            </div>
        </div>
    );
    
}

export { TokenInfo }
