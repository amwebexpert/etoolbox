import { getErrorMessage, isBlank, isNullish } from "@lichens-innovation/ts-common";
import beautify from "js-beautify";
import JSON5 from "json5";
import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";

import { type ConversionContext, SYNTAX_HIGHLIGHTER_LANGUAGE_MAP } from "./json-converter.types";

interface QuicktypeJsonArgs {
  targetLanguage: string;
  typeName: string;
  jsonString: string;
}

const quicktypeJSON = async ({ targetLanguage, typeName, jsonString }: QuicktypeJsonArgs) => {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage as Parameters<typeof jsonInputForTargetLanguage>[0]);
  await jsonInput.addSource({ name: typeName, samples: [jsonString] });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage as Parameters<typeof quicktype>[0]["lang"],
    rendererOptions: {
      "just-types": "true",
      "acronym-style": "original",
      lombok: "false",
    },
  });
};

const isValid = (data: ConversionContext): boolean => {
  const { source, sourceType, rootClassName, targetLanguage } = data;

  if (isBlank(source)) return false;
  if (isBlank(sourceType)) return false;
  if (isBlank(rootClassName)) return false;
  if (isBlank(targetLanguage)) return false;

  return true;
};

const objToSource = (o: unknown): string => {
  if (isNullish(o)) {
    return "null";
  }

  if (typeof o !== "object") {
    if (typeof o === "string") {
      return `'${o}'`;
    }
    return String(o);
  }

  const isArray = Array.isArray(o);
  const entries = isArray ? (o as unknown[]) : Object.entries(o);
  let str = "";

  if (isArray) {
    for (const item of entries) {
      str += objToSource(item) + ",";
    }
    return "[" + str.slice(0, -1) + "]";
  } else {
    for (const [key, value] of entries as [string, unknown][]) {
      const formattedKey = key.includes(" ") ? `'${key}'` : key;
      str += `${formattedKey}: ${objToSource(value)},`;
    }
    return "{" + str.slice(0, -1) + "}";
  }
};

const transformJSON = async (data: ConversionContext): Promise<string> => {
  const { targetLanguage, source, rootClassName } = data;

  if (targetLanguage === "javascript") {
    let parsedSource: unknown;
    try {
      parsedSource = JSON.parse(data.source);
    } catch (e: unknown) {
      throw new Error(`Invalid JSON: ${getErrorMessage(e)}`, { cause: e });
    }
    const jsCode = objToSource(parsedSource);
    return beautify(jsCode, { indent_size: 2, space_in_empty_paren: true });
  }

  try {
    const { lines } = await quicktypeJSON({
      targetLanguage,
      typeName: rootClassName,
      jsonString: source,
    });

    return lines.join("\n");
  } catch (e: unknown) {
    throw new Error(`Conversion failed: ${getErrorMessage(e)}`, { cause: e });
  }
};

const transformJsObject = async (data: ConversionContext): Promise<string> => {
  try {
    // Parse the JS object literal without executing it as code (JSON5 is a strict superset of habit-hooks-disable non-essential-comment
    // JSON supporting unquoted keys, single quotes, trailing commas, etc. — no eval/new Function). habit-hooks-disable non-essential-comment
    const result: unknown = JSON5.parse(data.source);
    const jsonData = JSON.stringify(result, null, 4);
    const newData: ConversionContext = { ...data, sourceType: "json", source: jsonData };

    return transform(newData);
  } catch (e: unknown) {
    throw new Error(`JavaScript parsing failed: ${getErrorMessage(e)}`, { cause: e });
  }
};

export const transform = async (data: ConversionContext): Promise<string> => {
  if (!isValid(data)) {
    return "";
  }

  const { sourceType, targetLanguage, source } = data;
  if (sourceType === targetLanguage) {
    return data.source;
  }

  switch (sourceType) {
    case "json":
      return transformJSON(data);
    case "jsObject":
      return transformJsObject(data);
    default:
      return source;
  }
};

export const getSyntaxHighlighterLanguage = (targetLanguage: string): string => {
  return SYNTAX_HIGHLIGHTER_LANGUAGE_MAP[targetLanguage] ?? "plaintext";
};
