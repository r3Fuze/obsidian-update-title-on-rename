import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";
import { defineConfig } from "eslint/config";

export default defineConfig({
	files: ["src/**/*.ts"],
	extends: [
		eslint.configs.recommended,
		...tseslint.configs.recommended,
		...obsidianmd.configs.recommended,
	],
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
	rules: {
		"obsidianmd/ui/sentence-case": "off",
	},
});
