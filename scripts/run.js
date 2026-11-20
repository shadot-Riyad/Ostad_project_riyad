// Usage: node scripts/run.js q1|q2|q3|ui|api|all
// Prottekbar: old result muche -> test chalay -> Allure report banay
import { spawnSync } from 'child_process';
import fs from 'fs';

const mode = process.argv[2] || 'ui';

const specs = {
    q1: 'tests/q1-invalid-login.spec.js',
    q2: 'tests/q2-register-add-to-cart.spec.js',
    q3: 'tests/q3-search-checkout-e2e.spec.js',
};

const collection = 'api-tests/Users_API.postman_collection.json';

function run(cmd) {
    const r = spawnSync(cmd, { stdio: 'inherit', shell: true });
    return r.status === 0 ? 0 : 1;
}

// purono result clean
['allure-results', 'allure-report', 'playwright-report', 'test-results', 'reports'].forEach((d) => {
    fs.rmSync(d, { recursive: true, force: true });
});

let failed = 0;

if (mode !== 'api') {
    const file = specs[mode] || '';   // ui/all hole shob test
    failed += run(`npx playwright test ${file}`);
}

if (mode === 'api' || mode === 'all') {
    failed += run(`npx newman run ${collection} -r cli,htmlextra,allure --reporter-htmlextra-export reports/api/api-report.html --reporter-allure-export allure-results`);
}

// test fail korleo report toiri hobe
run('npx allure generate allure-results --clean -o allure-report');

console.log('\nAllure report ready -> npm run report:open');
process.exit(failed ? 1 : 0);
