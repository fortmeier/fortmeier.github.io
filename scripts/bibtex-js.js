//
// Author: Rahul Potharaju
// Website: http://rahul-potharaju.com
// For an example, checkout my website
//
// This Bibtex-JS plugin is heavily inspired from the one that Henrik Muehe authored 
// here: https://code.google.com/p/bibtex-js/ I have contacted the original author to
// see if he is still maintaining the code base but did not hear back from him (yet).
// Therefore, I went ahead and re-wrote the plugin to be more extensible. 

// Following is a list of differences from the original version:
// - Re-written to be a formal jQuery plugin 
// - You can now render multiple bibtex strings: 
//      $("#block1").BibtexJS();
//      $("#block2").BibtexJS();
// - Clean way to define the reference rendering template
// - Contains default renderers so that if you want to just "get done with it" like me, 
//   including this script in your site requires one line of javascript :)
// - Provides customization (e.g., you can include your name to highlight along with
//   the formatting function)
// - Detailed documentation on how to "hack" this plugin

//The MIT License (MIT)
//
//Copyright (c) <year> <copyright holders>
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.

// Original Author: Henrik Muehe
// Issues:
//  no comment handling within strings
//  no string concatenation
//  no variable values yet

// Grammar implemented here:
//  bibtex -> (string | preamble | comment | entry)*;
//  string -> '@STRING' '{' key_equals_value '}';
//  preamble -> '@PREAMBLE' '{' value '}';
//  comment -> '@COMMENT' '{' value '}';
//  entry -> '@' key '{' key ',' key_value_list '}';
//  key_value_list -> key_equals_value (',' key_equals_value)*;
//  key_equals_value -> key '=' value;
//  value -> value_quotes | value_braces | key;
//  value_quotes -> '"' .*? '"'; // not quite
//  value_braces -> '{' .*? '"'; // not quite

; (function ($, window, document, undefined) {

    // Create the defaults once

    var defaultTemplate = "";
    defaultTemplate += "        <div class=\"bibtex_template\">";
    defaultTemplate += "            <div class=\"if author\" style=\"font-weight: bold; font-size: medium; padding-top: 30px;\">";
    defaultTemplate += "                <span class=\"if year\"><strong><span class=\"conference\" style=\"color: #000;\"><\/span>  <span class=\"year\" style=\"color: #000;\"><\/span><\/strong>, <\/span><span class=\"title\"><\/span>";
    defaultTemplate += "                <span class=\"if url\" style=\"margin-left: 20px\">";
    defaultTemplate += "                    <a class=\"url\" style=\"color:black; font-size:10px\">(view online)<\/a>";
    defaultTemplate += "                <\/span>";
    defaultTemplate += "            <\/div>";
    defaultTemplate += "            <div style=\"margin-left: 10px; margin-bottom:5px;\">";
    defaultTemplate += "                <span class=\"author\"><\/span>, <span class=\"publisher\"><\/span>, <span class=\"booktitle\" style=\"font-weight: bold; font-size:small;\"><\/span>";
    defaultTemplate += "            <\/div>";
    defaultTemplate += "            <div class=\"if booktitle\" style=\"font-size: small; font-weight: bold; margin-left: 10px; margin-bottom:5px;\">";
    defaultTemplate += "            <\/div>";
    defaultTemplate += "        <\/div>";

    var defaultBibtex = "";
    defaultBibtex += "@inproceedings{potharaju2013juggling,";
    defaultBibtex += "  title={Juggling the Jigsaw: Towards Automated Problem Inference from Network Trouble Tickets},";
    defaultBibtex += "  author={Potharaju, Rahul and Jain, Navendu and Nita-Rotaru, Cristina},";
    defaultBibtex += "  booktitle={Proceedings of the 10th USENIX conference on Networked Systems Design and Implementation},";
    defaultBibtex += "  conference={{USENIX NSDI}},";
    defaultBibtex += "  year={2013}";
    defaultBibtex += "}";

    var defaultAuthorHighlightHTML = function (author) {
        return "<span style='font-weight: bolder; color: #000'>" + author + "</span>"
    }

    var BibtexJS = "BibtexJS",
        defaults = {
            TemplateString: defaultTemplate,
            BibtexString: defaultBibtex,
            AuthorToHighlight: "No one to highlight initially",
            AuthorHighlightHTML: defaultAuthorHighlightHTML
        };

    function Plugin(element, options) {
        this.element = element;

        this.entries = {};
        this.input = "";
        this.pos = 0;
        this.currentEntry = "";
        this.currentKey = "";
        this.template = "";

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = BibtexJS;

        this.init();
    }

    Plugin.prototype = {

        init: function () {

            this.template = $(this.options.TemplateString).attr('class');

            if (!$(this.template).length)
                $("body").append(this.options.TemplateString);

            $("." + this.template).hide();

            var RegexAuthor = new RegExp(this.options.AuthorToHighlight, "g")
            this.options.BibtexString = this.options.BibtexString.replace(RegexAuthor, this.options.AuthorHighlightHTML(this.options.AuthorToHighlight));

            var RegexUmlU = new RegExp("\\\\\"{u}", "g")
            this.options.BibtexString = this.options.BibtexString.replace(RegexUmlU, "ü");
            var RegexUmlA = new RegExp("\\\\\"{a}", "g")
            this.options.BibtexString = this.options.BibtexString.replace(RegexUmlA, "ä");
            var RegexUmlO = new RegExp("\\\\\"{o}", "g")
            this.options.BibtexString = this.options.BibtexString.replace(RegexUmlO, "ö");

            this.DisplayBibtex(this.options.BibtexString, $(this.element));
        },

        pos: 0,
        input: "",

        template: "",

        entries: {},
        strings: {
            JAN: "January",
            FEB: "February",
            MAR: "March",
            APR: "April",
            MAY: "May",
            JUN: "June",
            JUL: "July",
            AUG: "August",
            SEP: "September",
            OCT: "October",
            NOV: "November",
            DEC: "December"
        },
        currentKey: "",
        currentEntry: "",

        getEntries: function () {
            return this.entries;
        },

        isWhitespace: function (s) {
            return (s == ' ' || s == '\r' || s == '\t' || s == '\n');
        },

        match: function (s) {
            this.skipWhitespace();
            if (this.input.substring(this.pos, this.pos + s.length) == s) {
                this.pos += s.length;
            } else {
                throw "Token mismatch, expected " + s + ", found " + this.input.substring(this.pos);
            }
            this.skipWhitespace();
        },

        tryMatch: function (s) {
            this.skipWhitespace();
            if (this.input.substring(this.pos, this.pos + s.length) == s) {
                return true;
            } else {
                return false;
            }
            this.skipWhitespace();
        },

        skipWhitespace: function () {
            while (this.isWhitespace(this.input[this.pos])) {
                this.pos++;
            }
            if (this.input[this.pos] == "%") {
                while (this.input[this.pos] != "\n") {
                    this.pos++;
                }
                this.skipWhitespace();
            }
        },

        toFirstEntry: function () {
            while (this.input[this.pos] != "@" ) {
                this.pos++;
            }
        },


        value_braces: function () {
            var bracecount = 0;
            this.match("{");
            var start = this.pos;
            while (true) {
                if (this.input[this.pos] == '}' && this.input[this.pos - 1] != '\\') {
                    if (bracecount > 0) {
                        bracecount--;
                    } else {
                        var end = this.pos;
                        this.match("}");
                        return this.input.substring(start, end);
                    }
                } else if (this.input[this.pos] == '{') {
                    bracecount++;
                } else if (this.pos == this.input.length - 1) {
                    throw "Unterminated value";
                }
                this.pos++;
            }
        },

        value_quotes: function () {
            this.match('"');
            var start = this.pos;
            while (true) {
                if (this.input[this.pos] == '"' && this.input[this.pos - 1] != '\\') {
                    var end = this.pos;
                    this.match('"');
                    return this.input.substring(start, end);
                } else if (this.pos == this.input.length - 1) {
                    throw "Unterminated value:" + this.input.substring(start);
                }
                this.pos++;
            }
        },

        single_value: function () {
            var start = this.pos;
            if (this.tryMatch("{")) {
                return this.value_braces();
            } else if (this.tryMatch('"')) {
                return this.value_quotes();
            } else {
                var k = this.key();
                if (this.strings[k.toUpperCase()]) {
                    return this.strings[k];
                } else if (k.match("^[0-9]+$")) {
                    return k;
                } else {
                    throw "Value expected:" + this.input.substring(start);
                }
            }
        },

        value: function () {
            var values = [];
            values.push(this.single_value());
            while (this.tryMatch("#")) {
                this.match("#");
                values.push(this.single_value());
            }
            return values.join("");
        },

        key: function () {
            var start = this.pos;
            while (true) {
                if (this.pos == this.input.length) {
                    throw "Runaway key";
                }

                if (this.input[this.pos].match("[a-zA-Z0-9_:\\./-]")) {
                    this.pos++
                } else {
                    return this.input.substring(start, this.pos).toUpperCase();
                }
            }
        },

        key_equals_value: function () {
            var key = this.key();
            if (this.tryMatch("=")) {
                this.match("=");
                var val = this.value();
                return [key, val];
            } else {
                throw "... = value expected, equals sign missing:" + this.input.substring(this.pos);
            }
        },

        key_value_list: function () {
            var kv = this.key_equals_value();
            this.entries[this.currentEntry][kv[0]] = kv[1];
            while (this.tryMatch(",")) {
                this.match(",");
                // fixes problems with commas at the end of a list
                if (this.tryMatch("}")) {
                    break;
                }
                kv = this.key_equals_value();
                this.entries[this.currentEntry][kv[0]] = kv[1];
            }
        },

        entry_body: function () {
            this.currentEntry = this.key();
            this.entries[this.currentEntry] = new Object();
            this.match(",");
            this.key_value_list();
        },

        directive: function () {
            this.match("@");
            return "@" + this.key();
        },

        string: function () {
            var kv = this.key_equals_value();
            this.strings[kv[0].toUpperCase()] = kv[1];
        },

        preamble: function () {
            this.value();
        },

        comment: function () {
            this.value(); // this is wrong
        },

        entry: function () {
            this.entry_body();
        },

        sorting: function(a,b) {
            return parseInt(b["YEAR"]) - parseInt(a["YEAR"]);
        },

        bibtex: function () {
            this.toFirstEntry();
            while (this.tryMatch("@")) {
                var d = this.directive().toUpperCase();
                this.match("{");
                if (d == "@STRING") {
                    this.string();
                } else if (d == "@PREAMBLE") {
                    this.preamble();
                } else if (d == "@COMMENT") {
                    this.comment();
                } else {
                    this.entry();
                    this.entries[this.currentEntry]["ENTRYTYPE"] = d.slice(1);
                }
                this.match("}");
            }
        },

        fixValue: function (value) {
            value = value.replace(/\\glqq\s?/g, "&bdquo;");
            value = value.replace(/\\grqq\s?/g, '&rdquo;');
            value = value.replace(/\\ /g, '&nbsp;');
            value = value.replace(/\\url/g, '');
            value = value.replace(/---/g, '&mdash;');
            value = value.replace(/{\\"a}/g, '&auml;');
            value = value.replace(/\{\\"o\}/g, '&ouml;');
            value = value.replace(/{\\"u}/g, '&uuml;');
            value = value.replace(/{\\"A}/g, '&Auml;');
            value = value.replace(/{\\"O}/g, '&Ouml;');
            value = value.replace(/{\\"U}/g, '&Uuml;');
            value = value.replace(/\\ss/g, '&szlig;');
            value = value.replace(/\{(.*?)\}/g, '$1');
            return value;
        },

        parseAuthors: function(value) {
            value = value.replace(/, (.)[^ <>]*/g, ", $1. ");
            value = value.replace(/ and /g, ", ");
            return value;
        },

        DisplayBibtex: function (input, output) {
            // parse bibtex input
            this.input = input;
            this.bibtex();

            // save old entries to remove them later
            var old = output.find("*");

            // iterate over bibTeX entries
            var entriesObj = this.getEntries();

            var entriesArray = new Array();
            for (var entryKey in entriesObj) {
                entriesObj[entryKey]["KEY"] = entryKey;
                entriesObj[entryKey]["AUTHOR"] = this.parseAuthors( entriesObj[entryKey]["AUTHOR"] );
                entriesArray.push( entriesObj[entryKey] );
            }

            entriesArray.sort( this.sorting );

            for (var i = 0; i < entriesArray.length; i++) {
                entry = entriesArray[i];

                // find template
                var tplclass = entry["ENTRYTYPE"];
                var tpl = $("." + tplclass).clone().removeClass(tplclass);
                
                // find all keys in the entry
                var keys = [];
                for (var key in entry) {
                    keys.push(key.toUpperCase());
                }

                // find all ifs and check them
                var removed = false;
                do {
                    // find next if
                    var conds = tpl.find(".if");
                    if (conds.size() == 0) {
                        break;
                    }

                    // check if
                    var cond = conds.first();
                    cond.removeClass("if");
                    var ifTrue = true;
                    var classList = cond.attr('class').split(' ');
                    $.each(classList, function (index, cls) {
                        if (keys.indexOf(cls.toUpperCase()) < 0) {
                            ifTrue = false;
                        }
                        cond.removeClass(cls);
                    });

                    // remove false ifs
                    if (!ifTrue) {
                        cond.remove();
                    }
                } while (true);

                // fill in remaining fields 
                for (var index in keys) {
                    var key = keys[index];
                    var value = entry[key] || "";
                    tpl.find("span:not(a)." + key.toLowerCase()).html(this.fixValue(value));
                    tpl.find("a." + key.toLowerCase()).attr('href', this.fixValue(value));
                }

                output.append(tpl);
                tpl.show();
            }

            // remove old entries
            old.remove();
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[BibtexJS] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + BibtexJS)) {
                k = $.data(this, "plugin_" + BibtexJS, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);