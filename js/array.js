"use strict";

Object.defineProperties(Array.prototype,
    {
        deepSearch: {
            value: function deepSearch(string) {
                return this.filter(obj => `${obj.name.first} ${obj.name.last}`.toLowerCase().includes(string.toLowerCase()));
            }
        }
    }
);