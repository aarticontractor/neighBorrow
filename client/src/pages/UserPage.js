import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function UserPage() {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Title" />
            </FormControl>
            <FormControl>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={'play_hard'}>Play Hard</MenuItem>
                    <MenuItem value={'work_hard'}>Work Hard</MenuItem>
                    <MenuItem value={'category_3'}>Category 3</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Price" />
            </FormControl>
            <Button variant="contained">Submit</Button>
        </Box>
    );
}
