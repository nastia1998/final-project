import React, { memo, useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";

const OperationExcerpt = ({ operation }) => {
  const [isReadOnly, setReadOnly] = useState(true);
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   const [operationDate, setOperationDate] = useState(
  //     operation.operation_date.toLocaleDateString(undefined, options)
  //   );
  const [operationDate, setOperationDate] = useState(operation.operation_date);
  const [operationSum, setOperationSum] = useState(operation.operation_sum);

  const onDateChange = (e) => {
    setOperationDate(e.target.value);
  };
  const onSumChange = (e) => {
    setOperationSum(e.target.value);
  };

  const onEditOperation = () => {
    setReadOnly(false);
  };

  const convertedDate = moment(operationDate).format("DD/MM/YYYY HH:mm:ss");

  return (
    <Box key={operation.id} sx={{ m: 2 }} display="flex" flexDirection="column">
      <TextField
        value={convertedDate}
        InputProps={{ readOnly: isReadOnly }}
        onChange={onDateChange}
      />
      <TextField
        value={operationSum}
        InputProps={{ readOnly: isReadOnly }}
        onChange={onSumChange}
      />
      {isReadOnly ? (
        <IconButton onClick={(e) => onEditOperation(e)}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton>
          <CheckIcon />
        </IconButton>
      )}

      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default memo(OperationExcerpt);
