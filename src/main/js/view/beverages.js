define([
    'backbone',
    'rivets-cfg',

    'text!../template/beverages.html'
], function (Backbone, rivets, template) {
    'use strict';

    rivets.formatters.teaIcon = function (value) {
        return value ? 'bev-icon-' + value : value;
    };

    rivets.formatters.theineLevel100 = function (value) {
        switch (value) {
            case 'none':
                return 0;
            case 'low':
                return 25;
            case 'medium':
                return 50;
            case 'high':
                return 75;
            case 'coffee':
            case 'unknown':
            default:
                return 100;
        }
    };

    rivets.formatters.minMax = function (value, separator) {
        if (value) {
            if (value.min) {
                return value.max && value.min !== value.max
                    ? value.min + (separator ? separator : '-') + value.max
                    : value.min;
            } else if (value.max) {
                return value.max;
            }
        }
        return '';
    };

    rivets.formatters.showMinMax = function (value) {
        return value.min || value.max;
    };

    return Backbone.View.extend({

        beverages: null,

        initialize: function (options) {
            this.beverages = options.beverages;
            if (this.beverages) {
                this.beverages.on('sync', this.render, this);
            }
        },

        render: function () {
            rivets.bind(this.$el.html(template), {
                beverages: this.beverages
            });
            return this;
        }
    });
});