import Beverage from '../../src/js/model/beverage/beverage';
import Order from '../../src/js/model/order/order';
import OrderSummary from '../../src/js/model/order/order-summary';

const beverage1 = new Beverage({
        id: 'someblackid',
        name: 'Some black',
        brand: 'Green & black',
        basis: 'tea-black'
    }),
    beverage2 = new Beverage({
        id: 'somerooibosid',
        name: 'Some Rooibos',
        brand: 'Green & black',
        basis: 'tea-rooibos'
    });

/* eslint-disable no-magic-numbers */
describe('An order', () => {
    it('has the same ID as the beverage passed as an argument', () => {
        const order = new Order({beverage: beverage1});

        expect(order.get('id')).toBe(beverage1.get('id'));
    });

    it('is created with a default quantity of 1', () => {
        const order = new Order({beverage: beverage1});

        expect(order.get('quantity')).toBe(1);
    });

    it('can be created with a quantity ohter than 1', () => {
        const order = new Order({
            beverage: beverage1,
            quantity: 42
        });

        expect(order.get('quantity')).toBe(42);
    });
});

describe('An order summary', () => {
    const orders = new OrderSummary();

    it('is created empty', () => {
        expect(orders.get('orders').length).toBe(0);
        expect(orders.get('total')).toBe(0);
    });

    it('can be added a first order', () => {
        orders.order(beverage1);

        expect(orders.get('orders').length).toBe(1);
        expect(orders.get('total')).toBe(1);
        expect(orders.get('orders').get(beverage1.get('id')).get('quantity')).toBe(1);
    });

    it('can update an order\'s quantity', () => {
        orders.order(beverage1);

        expect(orders.get('orders').length).toBe(1);
        expect(orders.get('total')).toBe(2);
        expect(orders.get('orders').get(beverage1.get('id')).get('quantity')).toBe(2);
    });

    it('can be added an order for another beverage', () => {
        orders.order(beverage2, 3);

        expect(orders.get('orders').length).toBe(2);
        expect(orders.get('total')).toBe(5);
        expect(orders.get('orders').get(beverage1.get('id')).get('quantity')).toBe(2);
        expect(orders.get('orders').get(beverage2.get('id')).get('quantity')).toBe(3);
    });

    it('can be added an order for an existing beverage with a defined quantity', () => {
        orders.order(beverage1, 2);

        expect(orders.get('orders').length).toBe(2);
        expect(orders.get('total')).toBe(7);
        expect(orders.get('orders').get(beverage1.get('id')).get('quantity')).toBe(4);
        expect(orders.get('orders').get(beverage2.get('id')).get('quantity')).toBe(3);
    });

    it('is empty after calling "clear", which has also triggered the "update" event', () => {
        let triggered = false;
        orders.on('update', () => {
            triggered = true;
        });

        orders.clear();

        expect(orders.get('orders').length).toBe(0);
        expect(orders.get('total')).toBe(0);
        expect(triggered).toBe(true);
    });
});
