
// har run e notun user lagbe, tai time diye unique email
function unique() {
    return Date.now() + '' + Math.floor(Math.random() * 1000);
}

export function generateUser() {
    const id = unique();
    return {
        firstName: 'Riyad',
        lastName: 'Tester',
        email: `riyad${id}@mailtest.com`,
        password: 'Test@12345'
    };
}

export const products = {
    category: 'Books',
    name: 'Computing and Internet',
    searchTerm: 'Computing'
};

// checkout er billing address
export const billingAddress = {
    country: 'United States',
    state: 'Alabama',
    city: 'Birmingham',
    address: '123 Test Street',
    zip: '35203',
    phone: '2055550123'
};
