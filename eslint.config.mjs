import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
	files: ["**/*.{js,mjs,cjs,jsx}"], 
	plugins: { js }, 
	extends: ["js/recommended"], 
	languageOptions: { globals: globals.browser },
	overrides: [
		files: [
			"testSetUp.js",
			"setupAfterEnv.js",
			"listingForm.test.js"
		],
		rules: {
                "no-undef": "off"
            }
	]
  },
  pluginReact.configs.flat.recommended,
]);
