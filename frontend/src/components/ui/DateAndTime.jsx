import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

const DateAndTime = ({ slot, setSlot }) => {
  const handleDateTimeChange = (dateTime) => {
    setSlot({
      dateTime: dateTime ? dayjs(dateTime).toISOString() : null,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={slot.dateTime ? dayjs(slot.dateTime) : null}
        onChange={handleDateTimeChange}
      />
    </LocalizationProvider>
  );
};

export default DateAndTime;
