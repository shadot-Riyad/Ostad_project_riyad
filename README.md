# Demo Web Shop Automation By Riyad

This is my project for the SQA 21 course (Ostad). It has two parts:

- UI automation of [Demo Web Shop](https://demowebshop.tricentis.com/) using Playwright and Page Object Model
- API automation of [JSONPlaceholder users](https://jsonplaceholder.typicode.com/users) using Postman and Newman



## What is automated

 # | Scenario | File 

| Q1 | Login with wrong email/password, check the error message and make sure the user is not logged in | `tests/q1-invalid-login.spec.js` |

| Q2 | Register a new user, login, open a category, add a product to the cart and check product + quantity in the cart | `tests/q2-register-add-to-cart.spec.js` |

| Q3 | Search a product, open it, increase quantity, add to cart, agree to terms, checkout, confirm the order and check the order details | `tests/q3-search-checkout-e2e.spec.js` |

| API | GET all users, save one user id, then PUT `/users/{id}` with new name, email and company name | `api-tests/Users_API.postman_collection.json` |


## Project structure

```
pages/        page classes (Base, LoginPage, RegisterPage, CategoryPage, ProductPage,
              CartPage, SearchPage, CheckoutPage, OrderPage)
tests/        Q1, Q2, Q3 spec files
utils/        test data (a new user is generated on every run, invalid Credentials, )
api-tests/    Postman collection
scripts/      run.js (cleans old results, runs tests, builds the Allure report)
```

## Before you start

You need these installed:

- Node.js 18 or newer
- Google Chrome (the Playwright config uses the installed Chrome) / Firefox (need to Change from Paackage)
- Java 8 or newer, with `JAVA_HOME` set (Allure needs it)

## Setup

```bash
git clone https://github.com/shadot-Riyad/Ostad_project_riyad.git
cd Ostad_project_riyad
npm install
npx playwright install chromium
```

## How to run

Run a single scenario:

```bash
npm run test:q1      # invalid login
npm run test:q2      # register + add to cart
npm run test:q3      # search to order (E2E)
npm run test:api(Ongoing)     # API tests with Newman
```

Run everything together:

```bash
npm run test:ui      # Q1 -> Q2 -> Q3, one after another
npm run test:all     # UI + API
npx playwright test --headed  # Run using Browser
```

Every command first deletes the old results, then runs the tests, then generates the Allure report. Workers is set to 1, so the UI tests run one by one in this order: Q1, Q2, Q3.

Q2 and Q3 both register a fresh user, so they don't depend on each other and can be run alone in any order.

## Reports

```bash
npm run report:open    # opens the Allure report in the browser
npm run report:html    # opens the Playwright HTML report
```

The API HTML report is saved at `reports/api/api-report.html` after `npm run test:api` or `npm run test:all`.

Screenshots from each scenario (registration, cart, order confirmation etc.) are attached in the Allure and HTML reports.

## Git workflow

I worked with one branch per question and merged each into `main` with a pull request:

- `q1-invalid-login`
- `q2-register-add-to-cart`
- `q3-e2e-checkout`
- 

## Notes

- The Demo Web Shop is a public test site, so sometimes it is slow. If a test times out, just run it again.
- Allure report will not open if Java is missing, in that case use `npm run report:html`.

## Author

-Shadot Riyad
