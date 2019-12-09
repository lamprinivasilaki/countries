import React, { FunctionComponent, useState } from 'react';
import { Tooltip } from '@material-ui/core';

interface Props {
    text: string;
    width: string;
}

const TextWithTooltip: FunctionComponent<Props> = ({ text, width }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const node = (el: HTMLElement) => {
        if (!el) {
            return;
        }
        setShowTooltip(el.scrollWidth > el.clientWidth);
    };

    return (
        <Tooltip
            title={text}
            placement="top"
            disableHoverListener={!showTooltip}
        >
            <span
                ref={node}
                style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width,
                    display: 'block',
                }}
            >
                {text}
            </span>
        </Tooltip>
    );
};

export default TextWithTooltip;
