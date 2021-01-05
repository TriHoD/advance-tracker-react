import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { ExpenseTrackerContext } from '../../../context/context'
import formatDate from '../../../utils/formatDate';
import { incomeCategories, expenseCategories }  from '../../../constants/categories';
import useStyles from './style';

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

    const addTransaction = () => {
        const transaction = { ...formData, id: uuidv4(), amount: Number(formData.amount), }
        createTransaction(transaction)
        setFormData(intitState);
    }

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>...</Typography>
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
