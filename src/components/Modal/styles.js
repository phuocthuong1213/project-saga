const styles = theme => ({
    modal: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-65%)',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        padding: theme.spacing(2, 4, 4),
    },
    header: {
        //backgroundColor: theme.color.primary,
        color: theme.color.textColor,
        //padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        color: 'black',
        cursor: 'pointer',
        fontSize: 30
    },
    title: {
        color: 'black',
        fontWeight: 700,
        textTransform: 'capitalize'
    },
    content: {
        color: theme.spacing(2)
    }
});

export default styles;
