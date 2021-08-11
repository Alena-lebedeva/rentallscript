import fx from 'money';
import { locales } from '../config';

export function convert(base, rates, amount, from, to) {
    var toCurrency;
    fx.base = base;
    fx.rates = rates;
    if (to) {
        toCurrency = to
    } else {
        toCurrency = base
    }
    let value = fx.convert(amount, { from, to: toCurrency });
    return value;
}

export function showCurrencySymbol(currency, locale) {
    let defaultValue = 0;
    let convertCurrency = currency ? currency : 'USD';
    
    let symbol = defaultValue.toLocaleString(locales[0], { style: 'currency', currency: convertCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\d+([,.]\d+)?/g, "") || null;

    symbol = (symbol && symbol.toString().trim() == currency) ? '' : (symbol + ' ');

    return symbol;
}
