import React, { useState, SyntheticEvent, FunctionComponent } from 'react';
import clsx from 'clsx';
import { Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green, red, blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/styles';

interface PropsType {
    className?: string;
    message: string;
    variant: keyof typeof variantIcon;
}
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles = makeStyles(() => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: red[900]
    },
    info: {
        backgroundColor: blue[700]
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 12
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const Alert: FunctionComponent<PropsType> = ({
    className,
    message,
    variant
}) => {
    const classes = useStyles();
    const Icon = variantIcon[variant];
    const [open, setOpen] = useState(true);

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={open}
        >
            <SnackbarContent
                className={clsx(classes[variant], className)}
                message={
                    <span className={classes.message}>
                        <Icon
                            className={clsx(classes.icon, classes.iconVariant)}
                        />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
};

export default Alert;
