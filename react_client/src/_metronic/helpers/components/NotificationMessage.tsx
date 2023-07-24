import { FC, useEffect } from 'react';

type Props = {
    id: number;
    message: string;
    type: string;
    onClose: (id: number) => void;
};

const NotificationMessage: FC<Props> = ({ id, message, type, onClose }) => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose(id);
        }, 4000); // 4 seconds

        return () => clearTimeout(timeoutId);
    }, [id, onClose]);

    return (
        <div
            className={`card mb-2 ${type === 'success'
                ? 'border-success'
                : type === 'error'
                    ? 'border-danger'
                    : 'border-secondary'
                }`}
            style={{
                borderLeft: '1rem solid',
            }}
        >
            <div className="p-4 border-bottom-0">
                <div className="card-title d-flex flex-column my-auto">
                    <span className="fs-5 text-gray-700">{message}</span>
                </div>
            </div>
        </div>
    );
};

export { NotificationMessage };
