import React, { FunctionComponent, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface Props {
    text: string;
    width: string;
}

const useStyles = makeStyles({
    content: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
    },
});

const TextWithTooltip: FunctionComponent<Props> = ({ text, width }) => {
    const classes = useStyles();

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
                className={classes.content}
                style={{
                    width,
                }}
            >
                {text}
            </span>
        </Tooltip>
    );
};

export default TextWithTooltip;
