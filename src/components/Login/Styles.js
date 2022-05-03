import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    paper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(8),
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextField-root':{
            margin: theme.spacing(1)
        }
    },
    avatar:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.light,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
        marginBottom: theme.spacing(2)
    }
}));