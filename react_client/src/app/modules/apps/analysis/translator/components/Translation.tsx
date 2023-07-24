import { FC } from 'react'
import { useNotifications } from '../../../../../../_metronic/layout/core'
import { useClipboard } from '../../../../../../_metronic/helpers'
import { useIntl } from 'react-intl'


type Props = {
    className: string
    text: string
}

const Translation: FC<Props> = (
    {
        className,
        text
    }) => {

    const { showNotification} = useNotifications();
    const { copyToClipboard } = useClipboard();
    const intl = useIntl()

    return (
        <div
            className={`card ${className} cursor-pointer`}
            onClick={() => {
                if (text !== ''){
                    copyToClipboard(text)
                    showNotification("success",intl.formatMessage({ id: "TRASNLATE.COPY" }))
                }
            }}
        >

            <div className="card-body d-flex align-items-center pt-xl-0 pt-md-0 pt-lg-0">
                <span
                    className="text-gray-900 px-4 flex-grow-1 fs-2 w-100"
                >
                    {text}
                </span>
            </div>

        </div>
    );
}

export { Translation }