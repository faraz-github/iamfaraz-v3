import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

const DateAndTime = ({ slot, setSlot }) => {
  const handleDateTimeChange = (dateTime) => {
    setSlot({
      dateTime: dateTime ? dayjs(dateTime).toISOString() : null,
    });
  };

  // Function to disable weekends (Sunday Only)
  const shouldDisableDate = (date) => {
    const day = dayjs(date).day(); // 0 = Sunday, 6 = Saturday
    return day === 0; // Disable Sunday (0)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={slot.dateTime ? dayjs(slot.dateTime) : null}
        onChange={handleDateTimeChange}
        minDateTime={dayjs()} // Prevent past date selection
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
};

export default DateAndTime;
