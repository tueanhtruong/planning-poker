import { Button, MantineProvider, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Calendar } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function TestPage() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [useRestrictedDate, setUseRestrictedDate] = useState(true);

  // Calculate minDate: either 1 month ago or null (no restriction)
  const minDate = useRestrictedDate
    ? dayjs().subtract(1, 'month').toDate()
    : null;

  const toggleMinDate = () => {
    setUseRestrictedDate(!useRestrictedDate);
  };

  return (
    <MantineProvider>
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <Stack gap="md">
          <h1>Mantine Calendar Test</h1>

          {/* <Text>
            Current minDate:{' '}
            {useRestrictedDate
              ? `1 month ago (${dayjs().subtract(1, 'month').format('MMMM DD, YYYY')})`
              : 'No restriction'}
          </Text> */}

          <Button onClick={toggleMinDate} variant="filled">
            {useRestrictedDate
              ? 'Remove Date Restriction'
              : 'Set minDate to 1 Month Ago'}
          </Button>

          <Calendar
            // value={value}
            // onDateChange={setValue}
            minDate={minDate?.toISOString()}
          />

          {/* {value && (
            <Text>Selected date: {dayjs(value).format('MMMM DD, YYYY')}</Text>
          )} */}
        </Stack>
      </div>
    </MantineProvider>
  );
}
