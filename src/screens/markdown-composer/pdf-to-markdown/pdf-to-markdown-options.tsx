import { Checkbox, InputNumber, Space, Typography } from "antd";

import type { PdfToMarkdownOptions } from "./pdf-to-markdown.types";

interface PdfToMarkdownOptionsFieldsProps {
  options: PdfToMarkdownOptions;
  onChange: (options: PdfToMarkdownOptions) => void;
}

export const PdfToMarkdownOptionsFields = ({ options, onChange }: PdfToMarkdownOptionsFieldsProps) => (
  <Space size="middle" wrap>
    <Space size="small">
      <Typography.Text>Pages</Typography.Text>
      <InputNumber
        aria-label="From page"
        min={1}
        precision={0}
        placeholder="first"
        value={options.firstPage}
        onChange={(firstPage) => onChange({ ...options, firstPage })}
      />
      <Typography.Text type="secondary">to</Typography.Text>
      <InputNumber
        aria-label="To page"
        min={options.firstPage ?? 1}
        precision={0}
        placeholder="last"
        value={options.lastPage}
        onChange={(lastPage) => onChange({ ...options, lastPage })}
      />
    </Space>
    <Checkbox
      checked={options.keepHeaders}
      onChange={(event) => onChange({ ...options, keepHeaders: event.target.checked })}
    >
      Keep headers, footers &amp; page numbers
    </Checkbox>
  </Space>
);
