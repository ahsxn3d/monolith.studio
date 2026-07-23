import { ESLint } from "eslint";

async function run() {
  // 1. Create an instance.
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: {
      extends: ["next/core-web-vitals"]
    }
  });

  // 2. Lint files.
  const results = await eslint.lintFiles(["src/**/*.tsx", "src/**/*.ts"]);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 4. Output it.
  console.log(resultText);
}

run().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
