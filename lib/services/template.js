// Copyright 2014, Renasar Technologies Inc.
/* jshint node: true, newcap: false */
'use strict';

var di = require('di'),
    util = require('util'),
    ejs = require('ejs');

module.exports = templateServiceFactory;

di.annotate(templateServiceFactory, new di.Provide('Services.Template'));
di.annotate(templateServiceFactory,
    new di.Inject(
        'FileLoader',
        'Services.Configuration'
    )
);

/**
 * templateServiceFactory provides the template-service singleton object.
 * @private
 * @param  {FileLoader} FileLoader A FileLoader class for extension.
 * @param  {configuration} configuration      An instance of the configuration configuration object.
 * @return {TemplateService}            An instance of the TemplateService.
 */
function templateServiceFactory(FileLoader, configuration) {
    /**
     * TemplateService is a singleton object which provides key/value store
     * access to template files loaded from disk via FileLoader.
     * @constructor
     * @extends {FileLoader}
     */
    function TemplateService () {
        FileLoader.call(this);

        this.load(
            configuration.get('baseDirectory') + "/extensions/**/templates/**/*"
        ).done();
    }

    util.inherits(TemplateService, FileLoader);

    TemplateService.prototype.render = function render (template, options) {
        return this.get(template).then(function (contents) {
            return ejs.render(contents, options);
        });
    };

    return new TemplateService();
}