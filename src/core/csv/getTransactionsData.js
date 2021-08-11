import { TransactionHistory, Reservation, CurrencyRates } from '../../data/models';
import sequelize from '../../data/sequelize';
import { convert } from '../../helpers/currencyConvertion';
export async function completedTransactions(userId, bases, toCurrency) {
    let dataItems = [];
    let ratesDatas, currencyRates;
    let convertedTotal = 0, total = 0;
    var rates, ratesData = {};
    const dataCurrencyRates = await CurrencyRates.findAll({
        attributes: ['currencyCode', 'rate', 'isBase'],
        raw: true
    });

    let base = dataCurrencyRates.find(o => o.isBase === 1);

    if (dataCurrencyRates && dataCurrencyRates.length > 0) {
        dataCurrencyRates.map((item) => {
            ratesData[item.currencyCode] = item.rate;
        })
    }

    rates = JSON.stringify(ratesData);
    ratesDatas = {
        base: base.currencyCode,
        rates
    };

    if (ratesDatas.rates != null) {
        currencyRates = JSON.parse(ratesDatas.rates);
    }

    const data = await TransactionHistory.findAll({
        attributes: ['amount', 'currency', 'createdAt', 'reservationId', 'payoutEmail'],
        where: {
            userId
        },
        raw: true
    });

    if (data && data.length > 0) {
        await Promise.all(data.map(async (item, index) => {
            let dataItem = {};
            total = Number(item.amount);
            convertedTotal = await convert(bases, currencyRates, total, item.currency, toCurrency);

            dataItem = {
                'Date': item.createdAt,
                'Type': 'Payout',
                'ReservationId': item.reservationId,
                'PayoutEmail': item.payoutEmail,
                'Amount': convertedTotal,
                'Currency': toCurrency
            };
            dataItems.push(dataItem);
        }));
    }
    return dataItems;
}

export async function futureTransactions(hostId, bases, toCurrency) {
    let dataItems = [];
    let convertedTotal = 0, total = 0;
    let ratesDatas, currencyRates;

    var rates, ratesData = {};
    const dataCurrencyRates = await CurrencyRates.findAll({
        attributes: ['currencyCode', 'rate', 'isBase'],
        raw: true
    });
    let base = dataCurrencyRates.find(o => o.isBase === 1);

    if (dataCurrencyRates && dataCurrencyRates.length > 0) {
        dataCurrencyRates.map((item) => {
            ratesData[item.currencyCode] = item.rate;
        })
    }
    rates = JSON.stringify(ratesData);
    ratesDatas = {
        base: base.currencyCode,
        rates
    };

    if (ratesDatas.rates != null) {
        currencyRates = JSON.parse(ratesDatas.rates);
    }

    const data = await Reservation.findAll({
        attributes: ['id', 'total', 'hostServiceFee', 'currency', 'checkOut'],
        where: {
            hostId,
            paymentState: 'completed',
            $or: [
                {
                    reservationState: 'approved'
                },
                {
                    reservationState: 'completed'
                },
                {
                    reservationState: 'cancelled'
                }
            ],
            id: {
                $notIn: [
                    sequelize.literal("SELECT reservationId FROM TransactionHistory")
                ]
            }
        },
        raw: true
    });
    if (data && data.length > 0) {
        await Promise.all(data.map(async (item, index) => {
            let dataItem = {};
            total = Number(item.total - item.hostServiceFee);
            convertedTotal = await convert(bases, currencyRates, total, item.currency, toCurrency);
            dataItem = {
                'Estimated Date': item.checkOut,
                'Type': 'Reservation',
                'ReservationId': item.id,
                'Estimated Amount': convertedTotal,
                'Currency': toCurrency
            };

            dataItems.push(dataItem);
        }));
    }

    return dataItems;
}

export async function grossEarnings(hostId, bases, toCurrency) {
    let dataItems = [];
    let ratesDatas, currencyRates;
    let convertedTotal = 0, total = 0;
    var rates, ratesData = {};
    const dataCurrencyRates = await CurrencyRates.findAll({
        attributes: ['currencyCode', 'rate', 'isBase'],
        raw: true
    });
    let base = dataCurrencyRates.find(o => o.isBase === 1);

    if (dataCurrencyRates) {
        dataCurrencyRates.map((item) => {
            ratesData[item.currencyCode] = item.rate;
        })
    }
    rates = JSON.stringify(ratesData);
    ratesDatas = {
        base: base.currencyCode,
        rates
    };

    if (ratesDatas.rates != null) {
        currencyRates = JSON.parse(ratesDatas.rates);
    }

    const data = await Reservation.findAll({
        attributes: ['total', 'currency', 'id'],
        where: {
            hostId,
            paymentState: 'completed',
            $or: [
                {
                    reservationState: 'completed'
                },
                {
                    reservationState: 'cancelled'
                }
            ]

        },
        include: [
            {
                model: TransactionHistory,
                attributes: ['createdAt'],
                as: 'transactionHistory',
                required: true,
                where: {
                    userId: hostId
                }
            }
        ],
        raw: true
    });

    if (data && data.length > 0) {
        await Promise.all(data.map(async (item, index) => {
            let dataItem = {};
            total = Number(item.total);
            convertedTotal = await convert(bases, currencyRates, total, item.currency, toCurrency);
            dataItem = {
                'Date': item['transactionHistory.createdAt'] ? item['transactionHistory.createdAt'] : 'Pending',
                'Type': 'Gross Earnings',
                'ReservationId': item.id,
                'Amount with Host Service Fee': convertedTotal,
                'Currency': toCurrency
            };
            dataItems.push(dataItem);
        }));
    }
    return dataItems;
}