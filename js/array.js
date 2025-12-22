"use strict";

Object.defineProperties(Array.prototype,
    {
        deepSearch: {
            value: function deepSearch(string) {
                return this.find(obj => this.__deepContains__(obj, string));
            }
        },
        __deepContains__: {
            value: function __deepContains__(value, search) {
                if (value == null) return false;

                if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                    return String(value).includes(search);
                }

                if (Array.isArray(value)) {
                    return value.some(v => __deepContains__(v, search));
                }

                if (typeof value === "object") {
                    return Object.values(value).some(v => __deepContains__(v, search));
                }

                return false;
            },
            writable: false,
            enumerable: false,
            configurable: false
        }
    }
);