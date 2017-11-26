export const i18nValidation = function () {
    return {
        language: {
            any: {
                empty: '!!Tekstno polje ne sme biti prazno',
            },
            string: {
                regex: {
                    base: '!!Netačan format telefona',
                    phone: '!!Netačan format telefona',
                },
                email: '!!Netačan format e-pošte',
            },
        }
    };
};