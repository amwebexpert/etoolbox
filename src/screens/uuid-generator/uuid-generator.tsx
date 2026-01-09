import { IdcardOutlined } from "@ant-design/icons";
import { isNotBlank, isNullish } from "@lichens-innovation/ts-common";
import { Col, Flex, Form, InputNumber, Row, Select } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { UuidGeneratorResult } from "./uuid-generator-result";
import { UuidGeneratorToolbar } from "./uuid-generator-toolbar";
import { useUuidGeneratorStore } from "./uuid-generator.store";
import {
  generateUuids,
  getQuantityValidationMessage,
  isValidQuantity,
  MAX_QUANTITY,
  MIN_QUANTITY,
  UUID_VERSION_OPTIONS,
} from "./uuid-generator.utils";

export const UuidGenerator = () => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { version, quantity, generated, setVersion, setQuantity, setGenerated, clearAll } = useUuidGeneratorStore();

  const handleQuantityChange = (value: number | null) => {
    if (!isNullish(value)) {
      setQuantity(value);
    }
  };

  const handleGenerate = () => {
    if (!isValidQuantity(quantity)) {
      return;
    }

    const result = generateUuids({ version, quantity });
    setGenerated(result);
  };

  const quantityError = getQuantityValidationMessage(quantity);
  const hasResult = isNotBlank(generated);

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<IdcardOutlined />}
          title="UUID Generator"
          description="Generate universally unique identifiers (UUIDs) in various RFC 4122 versions"
        />

        <Form layout="vertical" className={styles.form}>
          <Row gutter={[16, 0]}>
            <Col xs={12} sm={8} md={6}>
              <Form.Item label="Version" help="RFC 4122 version" className={styles.formItem}>
                <Select
                  value={version}
                  onChange={setVersion}
                  options={UUID_VERSION_OPTIONS.map((opt) => ({
                    value: opt.value,
                    label: `${opt.label} - ${opt.description}`,
                  }))}
                  className={styles.select}
                  autoFocus={isDesktop}
                />
              </Form.Item>
            </Col>

            <Col xs={12} sm={8} md={6}>
              <Form.Item
                label="Quantity"
                help={quantityError ?? "Number of UUIDs to generate"}
                validateStatus={quantityError ? "error" : undefined}
                className={styles.formItem}
              >
                <InputNumber
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={MIN_QUANTITY}
                  max={MAX_QUANTITY}
                  className={styles.inputNumber}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <UuidGeneratorToolbar hasResult={hasResult} onGenerate={handleGenerate} onClear={clearAll} />

        <UuidGeneratorResult result={generated} />
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
  select: {
    width: "100%",
  },
  inputNumber: {
    width: "100%",
  },
}));
