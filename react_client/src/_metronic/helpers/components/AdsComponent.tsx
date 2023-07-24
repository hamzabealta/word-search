import React, { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

const AdsComponent = ({ dataAdSlot }: { dataAdSlot: string }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2328638757184164"
            data-ad-slot={dataAdSlot}
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    );
};

export default AdsComponent;
