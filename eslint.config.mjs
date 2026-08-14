import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    globalIgnores([".next/**", "dist/**", "build/**", "out/**"]),
]);

export default eslintConfig;
