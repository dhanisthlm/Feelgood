export const getSkypeCost = (state) => {
    if (!state.data || !state.data.skype || state.skype.active === false) {
        return 0;
    }

    const cost = 60 * state.data.skype.week;
    const duration = state.data.skypeDuration.factor;
    const sum = cost * duration;
    return exchange(sum, state) / state.paypalFactor;
};

export const getWorkshopCost = (cost, state) => {
    return exchange(cost, state) / state.paypalFactor;
};


/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const getEmailCost = (state) => {
    if (!state.data || !state.data.email || state.email.active === false) {
        return 0;
    }

    const sum = state.data.email.cost * state.data.email.week;
    return exchange(sum, state) / state.paypalFactor;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const getSum = (state) => {
    const data = state.data || state;
    const costSkype = data.skype ? getSkypeCost(state) : 0;
    const costEmail = data.email ? getEmailCost(state) : 0;
    return costSkype + costEmail;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const getPackageSum = (state) => {
    return Math.floor(getSum(state) - getPackageDiscount(state));
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 *
 */
export const getPackageDiscount = (state) => {
    if (!state.data) {
        return 0;
    }

    const costSkype = state.data.skype ? state.data.skype.cost * state.data.skypeDuration.factor : 0;
    let discountSkype = getSkypeCost(state) - (exchange(costSkype, state) / state.paypalFactor);
    let discountEmail = getEmailCost(state) - (exchange(state.emailDiscount, state) / state.paypalFactor);
    const discountPackage = (state.data.email && state.data.skype) ? (getEmailCost(state) + getSkypeCost(state)) * 0.05 : 0;

    if (discountEmail < 0) {
        discountEmail = 0;
    }

    if (discountSkype < 0) {
        discountSkype = 0;
    }

    return Math.floor(Math.round(discountPackage) + parseFloat(discountSkype) + parseFloat(discountEmail));
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const getVoucherDiscount = (state) => {
    const data = state.data || state;
    return data.promoDiscount > 0
        ? Math.round(getPackageSum(state) * 0.33)
        : 0;
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const getTotal = (state) => {
    return getVoucherDiscount(state) > 0 ? getPackageSum(state) - getVoucherDiscount(state) : getPackageSum(state);
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const exchange = (cost, state) => {
    return state.paypalFactor !== 1
        ? parseInt((cost / getSelectedCurrency(state)[0].rate).toFixed(0))
        : parseInt((cost).toFixed(0));
};

/**
 * This callback type is called `requestCallback
 * @callback requestCallback
 * @param {number} responseCode
 * @return {object}
 */
export const getSelectedCurrency = (state) => {
    return state.languages.filter((country) => {
        return country.currency === state.language;
    });
};