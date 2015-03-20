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
                success: function(res) {
                    var a = $.extend(that, res);
                    resolve(a);
                },
                error: function() {
                    //TODO: handle error message
                }
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
                success: function(res) {
                    var a = $.extend(that, res);
                    resolve(a);
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
                success: function(res) {
                    resolve(res);
                },
                error: function(res) {
                    reject(res);
                }
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
                success: function(res) {
                    resolve(res);
                },
                error: function(res) {
                    reject(res);
                }
            });
        });

        return promise;
    };

    module.exports = Resource;
    
})();
