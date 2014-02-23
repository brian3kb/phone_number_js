/**
 * Phone number validator/formatter (UK numbers).
 * Author: Brian Barnett, brian@3kb.co.uk, http://brianbar.net/ || http://3kb.co.uk/
 * Date: 21/02/14
 **/
(function (exports) {
    // Patterns from http://www.area-codes.org.uk/formatting.php#programmers
    var patterns = [
        '011# ### ####',
        '01#1 ### ####',
        '013873 #####',
        '015242 #####',
        '015394 #####',
        '015395 #####',
        '015396 #####',
        '016973 #####',
        '016974 #####',
        '016977 ####',
        '016977 #####',
        '017683 #####',
        '017684 #####',
        '017687 #####',
        '019467 #####',
        '01### #####',
        '01### ######',
        '02# #### ####',
        '03## ### ####',
        '05### ######',
        '0500 ######',
        '07### ######',
        '08## ### ###',
        '08## ### ####',
        '09## ### ####'
    ];

    //convert the pattern masks to array of regex.
    var getRegExPatterns = function () {
        var regExPatterns = [];
        patterns.forEach(function (pattern) {
            //split string into array
            var rxp = '^' + pattern.split(' ').map(function (piece) {
                //if all characters are # then return \d{count}
                if ( piece.split('').every(function (p) { return (p === '#'); }) ) {
                    return '\\d{' + piece.length + '}';
                }
                //else
                return piece.split('').map(function (char) {
                    if (char === '#') return '\\d';
                    return char;
                }).join('');
            }).join(' ') + '$';
            regExPatterns.push({ regex: new RegExp(rxp), mask: pattern });
        });
        return regExPatterns;
    };



    // return object with two methods and the regex patterns to match to.
        exports._patterns = getRegExPatterns();

        //returns true if the passed string matches a mask in the pattern array.
        exports.isValid = function (phoneNumberString) {
            return this._patterns.some(function (p) {
                return p.regex.test(phoneNumberString);
            });
        };

        //attempts to format the passed string into one of the above masks.
        //returns false if no match could be made.
        //custom separator can be used, defaults to a single space.
        exports.format = function (phoneNumberString, separator) {
            //get a new copy of array
            var patterns = this._patterns.map(function (i) {return i;});
            patterns.reverse();
            separator = separator === undefined ? ' ' : separator;
            //while there are regex in the array, check if the given number will fit in the mask.
            while (patterns.length !== 0) {
                var p = patterns.pop(),
                    pn = phoneNumberString.replace(/[()\[\]\-_A-Za-z ]/gi, '').split(''),
                    _mask = p.mask.split('');
                for (var i = 0; i < _mask.length; i++) {
                    if (_mask[i] === ' ') {
                        pn.splice(i, 0, ' ');
                    }
                }
                pn = pn.join('');
                if (p.regex.test(pn)) return pn.replace(/ /g, separator);
            }
            //returns false if we can't make it match a pattern
            return false;
        };

})(typeof exports === 'undefined'? this['phoneNumber']={} : exports);