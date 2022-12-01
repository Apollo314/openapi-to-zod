## Usage
    npx openapi-to-zod -i 'url-to-schema' -o './src/zod-objects-folder'

would create zod objects for the components in the openapi schema given in the url to the folder `./src/zod-objects-folder`

this cli uses [json-schema-to-zod](https://www.npmjs.com/package/json-schema-to-zod) to create the zod objects.