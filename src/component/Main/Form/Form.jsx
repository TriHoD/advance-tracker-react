import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';

import { ExpenseTrackerContext } from '../../../context/context'
import formatDate from '../../../utils/formatDate';
import { incomeCategories, expenseCategories }  from '../../../constants/categories';
import useStyles from './style';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const intitState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),

}
const Form = () => {

    const classes = useStyles();
    const { createTransaction } = useContext(ExpenseTrackerContext);
    const [formData, setFormData] = useState(intitState);
    const [ open, setOpen ] = useState(false);
    const { segment } = useSpeechContext();  

    const addTransaction = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return ;
        
        const transaction = { ...formData, id: uuidv4(), amount: Number(formData.amount), }
        setOpen(true);
        createTransaction(transaction)
        setFormData(intitState);
    }

    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(intitState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        if(incomeCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category });
                        } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            })

            if (segment.isFinal && formData.amount && formData.type && formData.category && formData.date) {
                addTransaction();
            }

        }
    },[segment])

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map((w) => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((selectedCategory) => (
                            <MenuItem key={selectedCategory.type} value={selectedCategory.type}>
                                {selectedCategory.type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" value={formData.amount} label="Amount" fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" value={formData.date} label="Date" fullWidth onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" onClick={addTransaction} fullWidth>Create</Button>
        </Grid>
    );
};

export default Form;
