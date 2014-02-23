##UK Phone Number Format and Validation

Formats and validates UK phone numbers to a format in the array of patterns, patterns can be easily customised for other countries in the format: ``0161 ### ####`` the ``#`` character representing any other number.


###Usage

####Format

To format a number string, use the format() method, this accepts the number to format (string) and an optional separator (string) to use instead of a single space (NB: using a custom separator will stop the number from validating with the isValid() method).

     phoneNumber.format('02076460088');
     //-> '020 7646 0088'
     
     phoneNumber.format('02076460088', ' - ');
     //-> '020 - 7646 - 0088'

####isValid

The isValid() method, will check the passed string matches one of the masks (including the space separators) and return true or false.

     phoneNumber.isValid('020 7646 0088');
     //-> true
     
     phoneNumber.isValid('02076 46 00 88');
     //-> false


###Install

The JavaScript file will work in both the Browser (ES5+) and Node.

####Browser
    <script src="phoneNumber.js"></script>

####Node
     var phoneNumber = require('phoneNumber');
     
###Testing

Tested with Mocha and the should assertion library via WebStorms fantastic Mocha integration :)

###Sources

UK phone patterns taken from http://www.area-codes.org.uk/formatting.php#programmers