(function() {
    'use strict';

    var Resource = function(spec) {
        var that = this;

        Object.keys(spec || []).forEach(function(key) {
            that[key] = spec[key];
        });
    };

    Resource.prototype.create = function(data) {
        var that = this;
        var url = that.resourceUrl;
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                data: data,
                success: function(response) {
                    var resource = $.extend({}, that, response);
                    resolve(resource);
                },
                error: reject
            });
        });

        return promise;
    };

    Resource.prototype.get = function(id) {
        var that = this;
        var url = that.resourceUrl + (id ? id : '');
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                dataType: 'json',
                type: 'get',
                url: url,
                success: function(response) {
                    var resource;

                    if (typeof response === 'object' && response.length) {
                        resource = response.map(function(resourceObject) {
                            return $.extend({}, that, resourceObject);
                        });
                    } else {
                        resource = $.extend(that, response);
                    }

                    resolve(resource);
                },
                error: reject
            });
        });

        return promise;
    };

    Resource.prototype.save = function() {
        var that = this;
        var payload = {};
        var url = that.resourceUrl + that.id;
        payload[that.name] = {};

        Object.keys(that).forEach(function(key) {
            payload[that.name][key] = that[key];
        });

        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'put',
                data: payload,
                success: resolve,
                error: reject
            });
        });

        return promise;
    };

    Resource.prototype.delete = function(id) {
        var that = this;
        var url = that.resourceUrl + id;

        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'delete',
                success: resolve,
                error: reject
            });
        });

        return promise;
    };

    module.exports = Resource;

})();
