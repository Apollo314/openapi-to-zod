import { OpenAPIV3 } from "openapi-types";
import { jsonSchemaToZod } from "json-schema-to-zod";
import $RefParser from "@apidevtools/json-schema-ref-parser";

export const componentSchemasParser = async (
  schema: OpenAPIV3.Document,
  fileExt = "js"
) => {
  const derefedSchema = (await $RefParser.dereference(
    schema as $RefParser.JSONSchema
  )) as OpenAPIV3.Document;
  const schemas = derefedSchema.components?.schemas;
  const zodFileContents: [string, string][] = [];
  Object.entries(schemas || {}).forEach(([name, componentSchema]) => {
    zodFileContents.push([
      `zod-${name}.${fileExt}`,
      jsonSchemaToZod(componentSchema),
    ]);
  });
  return zodFileContents;
};
