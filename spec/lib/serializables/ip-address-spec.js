// Copyright 2014, Renasar Technologies Inc.
/* jshint node:true */

'use strict';

describe('IpAddress', function () {
    var IpAddress, Serializable, Validatable;

    helper.before();

    before(function () {
        IpAddress = helper.injector.get('IpAddress');
        Serializable = helper.injector.get('Serializable');
        Validatable = helper.injector.get('Validatable');
    });

    before(function () {
        this.subject = new IpAddress({ value: '10.1.1.1' });
    });

    helper.after();

    describe('constructor', function () {
        it('should be Serializable', function () {
            this.subject.should.be.an.instanceof(Serializable);
        });

        it('should be Validatable', function () {
            this.subject.should.be.an.instanceof(Validatable);
        });

        it('should assign value to value', function () {
            this.subject.value.should.equal('10.1.1.1');
        });
    });

    describe('validation', function () {
        describe('resolved', function () {
            it('should resolve if valid', function () {
                return this.subject.validate().should.be.resolved;
            });
        });

        describe('rejected', function () {
            it('should reject if value is not present', function () {
                return new IpAddress().validate().should.be.rejected;
            });

            it('should reject if value is not a mac address', function () {
                return new IpAddress({ value: 'invalid' }).validate().should.be.rejected;
            });
        });
    });
});