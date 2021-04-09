import React, {useRef } from 'react';
import { TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import useAllCoinsData from "./../../api/AllCoinsData";

const SearchBox = ({ setSearch }) => {
    const useStyles = makeStyles(theme => ({
        border: {
            "& .MuiOutlinedInput-notchedOutline,\
            &:hover .MuiOutlinedInput-notchedOutline,\
            &.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: '2px',
                borderColor: '#0096C7'
            },
        },
        dropDownText: {
            color: '#778DA9'
        },
        dropdownArrow: {
            "& .MuiIconButton-root": {
                color: '#778DA9',
            }
        },
        input: {
            "& .MuiInputBase-input": {
                color: '#778DA9'
            }
        },
        logo: {
            width: '20px',
            marginRight: '10px'
        },
        inputLabel: {
            color: '#778DA9'
        }
    }));
    const classes = useStyles();

    const mountRef = useRef(true);
    const { coins } = useAllCoinsData(mountRef);

    let defaultProps = {
        options: coins,
        getOptionLabel: (option) => option.name
    }

    return (
        <>
            <Autocomplete
                className={`${classes.dropdownArrow} ${classes.border}  ${classes.input}`}
                {...defaultProps}
                id="auto-select"
                autoSelect
                onChange={(e, v) => setSearch(v)}
                renderOption={option => {
                    return (
                        <div className={classes.dropDownText}>
                            <img src={option.image} className={classes.logo} alt="coin" />
                            {option.name}
                        </div>
                    );
                }}
                renderInput={(params) =>
                    <TextField className={classes.searchLabel}  {...params} label="Search" margin="normal" variant="outlined"
                        InputLabelProps={{
                            className: classes.inputLabel
                        }}
                    />}
            />
        </>
    )
}

export default SearchBox
