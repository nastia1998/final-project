import React, { memo, useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { categoriesSelectors } from "../categories/categoriesSlice";
import { useSelector } from "react-redux";

const OperationExcerpt = ({ operation, onUpdateOperation }) => {
  const [isReadOnly, setReadOnly] = useState(true);
  const [operationDate, setOperationDate] = useState(operation.operation_date);
  const [operationSum, setOperationSum] = useState(operation.operation_sum);

  const onDateChange = (newDate) => {
    setOperationDate(newDate);
  };
  const onSumChange = (e) => {
    setOperationSum(e.target.value);
  };

  const onEditOperation = () => {
    setReadOnly(false);
  };

  const category = useSelector((state) => {
    console.log({ state });
    categoriesSelectors.selectById(state, operation.category_id);
  });
  console.log({ category });

  const convertedDate = moment(operationDate).format("DD/MM/YYYY HH:mm:ss");

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Box
        key={operation.id}
        sx={{ m: 2 }}
        display="flex"
        flexDirection="column"
      >
        {isReadOnly ? (
          <TextField
            value={convertedDate}
            InputProps={{ readOnly: isReadOnly }}
          />
        ) : (
          <DateTimePicker
            label="Oparation date/time"
            inputFormat="dd/MM/yyy hh:mm:ss"
            value={operationDate}
            onChange={onDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        )}

        <TextField
          value={operationSum}
          InputProps={{ readOnly: isReadOnly }}
          onChange={onSumChange}
        />
        <TextField value={category} />
        {isReadOnly ? (
          <IconButton onClick={(e) => onEditOperation(e)}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() =>
              onUpdateOperation(
                operation.id,
                operation.category_id,
                moment(operationDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                operationSum
              )
            }
          >
            <CheckIcon />
          </IconButton>
        )}
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
};

export default memo(OperationExcerpt);
