import { makeStyles } from '@material-ui/core';
import { orange, green } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    avatarIncome: {
        color: 'fff',
        backgroundColor: green[500],
    },
    avatarExpense: {
        color: 'fff',
        backgroundColor: orange[800],
    },
    list: {
        maxHeight: '150px',
        overflow: 'auto',
    },
}));
