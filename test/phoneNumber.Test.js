var phoneNumber = require('../src/phoneNumber');

describe('Phone Number', function () {

    describe('patterns array', function () {
        it('should have length greater than zero', function () {
            phoneNumber.should.have.property('_patterns').and.should.not.be.empty;
        });
        it('should contain an array of objects with a regex property on each', function () {
            phoneNumber._patterns.should.matchEach(function (it) {
                return it.regex.should.have.property('test');
            });
        });
    });

    describe('isValid()', function () {
        it('should return false if the number string is not a valid match', function () {
            (phoneNumber.isValid('01234567890')).should.be.false;
            (phoneNumber.isValid('016162612345')).should.be.false;
        });
        it('should return true if the number string has a valid match', function () {
            (phoneNumber.isValid('020 7646 0088')).should.be.true;
            (phoneNumber.isValid('0870 601 0100')).should.be.true;
        });
        it('should return false if the number string is not already of a valid format', function () {
            (phoneNumber.isValid('020 76460088')).should.be.false;
            (phoneNumber.isValid('0870-601-0100')).should.be.false;
        });
    });

    describe('format()', function () {
        it('should return a string that conforms to the mask the number matches to', function () {
            (phoneNumber.format('08448002400')).should.equal('0844 800 2400');
            (phoneNumber.format('02076460088')).should.equal('020 7646 0088');
            (phoneNumber.format('08706010100')).should.equal('0870 601 0100');
        });
        it('should strip out unwanted brackets and existing hyphens from input number', function () {
            (phoneNumber.format('0844-80-02-400')).should.equal('0844 800 2400');
            (phoneNumber.format('(0)20 76 46 00 88')).should.equal('020 7646 0088');
        });
        it('should output a string using a custom number block separator', function () {
            (phoneNumber.format('08448002400', '-')).should.equal('0844-800-2400');
            (phoneNumber.format('02076460088', ' - ')).should.equal('020 - 7646 - 0088');
        });
    });
});