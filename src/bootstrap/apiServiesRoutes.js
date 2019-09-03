module.exports = {
    // BASE_URL: 'http://192.168.1.100/filter/api',
    // BASE_URL: 'http://mfpq8.com/back-end/api',
    BASE_URL: 'http://mfbq8.com/back-end/api',

    REGISTER: '/user/register',
    LOGIN: '/user/login',
    REGISTER_GOOGLE: '/user/auth/login/callback',
    RESEND_VERFICATION_MAIL: '/user/reverify-user',
    RESET_PASSWORD: '/user/auth/reset-password',
    UPDATE_PASSWORD: '/user/auth/update-password',
    UPDATE_INFO: '/user/update-info',

    HOME_ADS: '/utilities/get-home-data',
    HOME_ADDRESSES: '/utilities/store-address',
    HOME_CATEGORIES: '/categories',
    HOME_BRANCHES: '/branch/all-without-paginate',
    SITE_SEARCH: '/products/filter-all-products',

    FIND_STORES: '/branch/all',
    FIND_CATEGORIES: '/branch/all-category',

    FIND_PRODUCT: '/products/product-detailed',
    FIND_STORE_PRODUCTS: '/store/get-store-detailed-category',
    FIND_STORE_INFO: '/branch/find',
    FIND_STORE_RATINGS: '/rate/get-branch-rate',
    CREATE_STORE_RATINGS: '/rate/create-branch-rate',
    CREATE_SALE: '/sale/create',
    GET_USER_SALES: '/sale/user',

    CHECK_COUPON: '/coupon/find',
    GET_OFFERS_COUPONS: '/branch/all-offers',
    CHECK_FOR_PROMOTION: '/offers/check-offers',

    SYNC_CART: '/shopping-cart-db/sync',
    GET_ALL_CART: '/shopping-cart-db',

    CREATE_CLIENT_ADDRESS: '/client/update-address',
    DELETE_CLIENT_ADDRESS: '/client/delete-address',
    GET_CLIENT_ADDRESS: '/client/get-address',
    GET_COUNTRIES_CITIES: '/utilities/get-government',

    CREATE_VENDOR: '/vendor-register/create',
    CREATE_CONTACT_US: '/contact-us/create',
    CREATE_SUBSCRIBE: '/subscribe/create',
};
