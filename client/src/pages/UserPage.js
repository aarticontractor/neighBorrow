// import React from 'react';
// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Box from '@mui/material/Box';

// export default function UserPage() {
//     return (
//         <Box component="form" noValidate autoComplete="off">
//             <FormControl sx={{ width: '25ch' }}>
//                 <OutlinedInput placeholder="Title" />
//             </FormControl>
//             <FormControl>
//                 <TextField
//                     id="outlined-multiline-static"
//                     label="Description"
//                     multiline
//                     rows={4}
//                     defaultValue="Default Value"
//                 />
//             </FormControl>
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Category</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={category}
//                     label="Category"
//                     onChange={handleChange}
//                 >
//                     <MenuItem value={"play_hard"}>Play Hard</MenuItem>
//                     <MenuItem value={"work_hard"}>Work Hard</MenuItem>
//                     <MenuItem value={"category_3"}>Category 3</MenuItem>
//                 </Select>
//             </FormControl>
//             <FormControl sx={{ width: '25ch' }}>
//                 <OutlinedInput placeholder="Price" />
//             </FormControl>
//             <Button variant="contained">Submit</Button>
//         </Box>
//     );
// }