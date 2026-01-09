import { CalendarOutlined, CodeOutlined } from "@ant-design/icons";
import { Col, DatePicker, Flex, Form, Input, Row, Select, Switch } from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { DateConverterResult } from "./results/date-converter-result";
import { DateConverterToolbar } from "./date-converter-toolbar";
import { EPOCH_UNIT_OPTIONS } from "./date-converter.constants";
import { useDateConverterStore } from "./date-converter.store";
import {
  dateToEpoch,
  exportAllFormats,
  getCurrentEpoch,
  getEndOfDay,
  getStartOfDay,
  getStartOfMonth,
  getStartOfWeek,
  getStartOfYear,
  isValidEpochInput,
  parseEpochToDate,
} from "./date-converter.utils";

export const DateConverter = () => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const { epochValue, epochUnit, showCodeExamples, setEpochValue, setEpochUnit, setShowCodeExamples, reset } =
    useDateConverterStore();

  // Parse the epoch value to a Date object
  const parsedDate = parseEpochToDate({ epochValue, epochUnit });

  // Get the epoch value as a number for formatting functions
  const epochNumber = parsedDate
    ? epochUnit === "seconds"
      ? Math.floor(parsedDate.getTime() / 1000)
      : parsedDate.getTime()
    : 0;

  const isValidInput = isValidEpochInput(epochValue);
  const hasDate = parsedDate !== null;

  const handleEpochChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpochValue(e.target.value);
  };

  const handleDatePickerChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const epoch = dateToEpoch({ date: date.toDate(), epochUnit });
      setEpochValue(epoch);
    }
  };

  const handleSetNow = () => {
    setEpochValue(getCurrentEpoch(epochUnit));
  };

  const handleSetStartOfDay = () => {
    setEpochValue(getStartOfDay(epochUnit));
  };

  const handleSetEndOfDay = () => {
    setEpochValue(getEndOfDay(epochUnit));
  };

  const handleSetStartOfWeek = () => {
    setEpochValue(getStartOfWeek(epochUnit));
  };

  const handleSetStartOfMonth = () => {
    setEpochValue(getStartOfMonth(epochUnit));
  };

  const handleSetStartOfYear = () => {
    setEpochValue(getStartOfYear(epochUnit));
  };

  const handleCopyAll = () => {
    if (!parsedDate) return;
    const allFormats = exportAllFormats({ date: parsedDate, epochValue: epochNumber });
    copyTextToClipboard({ text: allFormats, successMessage: "All formats copied!" });
  };

  const handleClear = () => {
    reset();
  };

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<CalendarOutlined />}
          title="Date & Epoch Converter"
          description="Convert between epoch timestamps and human-readable dates. Supports milliseconds and seconds."
        />

        <Form layout="vertical" className={styles.form}>
          <Row gutter={[16, 0]} align="bottom">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Epoch Value"
                className={styles.formItem}
                validateStatus={!isValidInput ? "error" : undefined}
                help={!isValidInput ? "Must be a valid number" : undefined}
              >
                <Input
                  placeholder="Enter epoch timestamp"
                  value={epochValue}
                  onChange={handleEpochChange}
                  autoFocus={isDesktop}
                  spellCheck={false}
                  className={styles.epochInput}
                />
              </Form.Item>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <Form.Item label="Unit" className={styles.formItem}>
                <Select
                  value={epochUnit}
                  onChange={setEpochUnit}
                  options={EPOCH_UNIT_OPTIONS}
                  className={styles.select}
                />
              </Form.Item>
            </Col>

            <Col xs={12} sm={6} md={6} lg={5}>
              <Form.Item label="Pick Date" className={styles.formItem}>
                <DatePicker
                  showTime
                  value={parsedDate ? dayjs(parsedDate) : null}
                  onChange={handleDatePickerChange}
                  className={styles.datePicker}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={6} lg={4}>
              <Form.Item label="Options" className={styles.formItem}>
                <div className={styles.optionsRow}>
                  <Switch checked={showCodeExamples} onChange={setShowCodeExamples} size="small" />
                  <span className={styles.switchLabel}>
                    <CodeOutlined /> Code examples
                  </span>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <DateConverterToolbar
          hasDate={hasDate}
          onSetNow={handleSetNow}
          onSetStartOfDay={handleSetStartOfDay}
          onSetEndOfDay={handleSetEndOfDay}
          onSetStartOfWeek={handleSetStartOfWeek}
          onSetStartOfMonth={handleSetStartOfMonth}
          onSetStartOfYear={handleSetStartOfYear}
          onCopyAll={handleCopyAll}
          onClear={handleClear}
        />

        <DateConverterResult date={parsedDate} epochValue={epochNumber} showCodeExamples={showCodeExamples} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 16,
  },
  epochInput: {
    fontFamily: "monospace",
  },
  select: {
    width: "100%",
  },
  datePicker: {
    width: "100%",
  },
  optionsRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 32,
  },
  switchLabel: {
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
}));
