
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
