import { OpenAPIV3 } from "openapi-types";
import { jsonSchemaToZod, parseSchema } from "json-schema-to-zod";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import * as fs from 'node:fs/promises'

export const componentSchemasParser = async (
  schema: OpenAPIV3.Document
) => {
    const derefedSchema = await $RefParser.dereference(<any> schema) as OpenAPIV3.Document
    const schemas = derefedSchema.components?.schemas
    let zodFileContents: [string, any][] = []
    Object.entries(schemas || {}).forEach(([name, componentSchema]) => {
        zodFileContents.push([`zod-${name}.js`, jsonSchemaToZod(<any> componentSchema)])
    })
    return zodFileContents
};
