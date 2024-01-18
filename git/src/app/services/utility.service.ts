import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { sort } from "fast-sort";
declare var jQuery: any;

@Injectable({
	providedIn: "root"
})
export class UtilityService {
	messageSource = new BehaviorSubject("default message");
	currentMessage = this.messageSource.asObservable();
	CustomValidators = {
		email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		phoneNumber: /^[0]?[6789]\d{9}$/,
		pincode: /^[1-9][0-9]{5}$/,
		panNumber: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
		password: /^(?![\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w])([^\s]){8,}$/,
		tinNumber: /^\d{9,16}$/,
		onlyChars: /^[a-zA-Z ]*$/,
		euinNo: /^([a-zA-Z]){1}(\d){6}$/,
		userName: /^([a-zA-Z0-9]){4,}$/,
		integer: /^\d+$/,
		positiveInteger: /^\d+$/,
		decimal: /^[-+]?[0-9]+\.[0-9]+$/,
		onlyNumber: /^\d+$/,
		validCharacters: /^[A-Za-z0-9 ]+$/, // Regex for Valid Characters i.e. Alphabets, Numbers and Space.
		iframeUrl: "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$"
	};

	/**
	 * A Javascript object to encode and/or decode html characters using HTML or Numeric entities that handles double or partial encoding
	 * Author: R Reid
	 * source: http://www.strictly-software.com/htmlencode
	 * Licences: GPL, The MIT License (MIT)
	 * Copyright: (c) 2011 Robert Reid - Strictly-Software.com
	 */
	public Encoder: any = {
		// When encoding do we convert characters into html or numerical entities
		EncodeType: "entity", // entity OR numerical

		isEmpty: function (val) {
			if (val) {
				return val === null || val.length == 0 || /^\s+$/.test(val);
			} else {
				return true;
			}
		},

		// arrays for conversion from HTML Entities to Numerical values
		arr1: [
			"&nbsp;",
			"&iexcl;",
			"&cent;",
			"&pound;",
			"&curren;",
			"&yen;",
			"&brvbar;",
			"&sect;",
			"&uml;",
			"&copy;",
			"&ordf;",
			"&laquo;",
			"&not;",
			"&shy;",
			"&reg;",
			"&macr;",
			"&deg;",
			"&plusmn;",
			"&sup2;",
			"&sup3;",
			"&acute;",
			"&micro;",
			"&para;",
			"&middot;",
			"&cedil;",
			"&sup1;",
			"&ordm;",
			"&raquo;",
			"&frac14;",
			"&frac12;",
			"&frac34;",
			"&iquest;",
			"&Agrave;",
			"&Aacute;",
			"&Acirc;",
			"&Atilde;",
			"&Auml;",
			"&Aring;",
			"&AElig;",
			"&Ccedil;",
			"&Egrave;",
			"&Eacute;",
			"&Ecirc;",
			"&Euml;",
			"&Igrave;",
			"&Iacute;",
			"&Icirc;",
			"&Iuml;",
			"&ETH;",
			"&Ntilde;",
			"&Ograve;",
			"&Oacute;",
			"&Ocirc;",
			"&Otilde;",
			"&Ouml;",
			"&times;",
			"&Oslash;",
			"&Ugrave;",
			"&Uacute;",
			"&Ucirc;",
			"&Uuml;",
			"&Yacute;",
			"&THORN;",
			"&szlig;",
			"&agrave;",
			"&aacute;",
			"&acirc;",
			"&atilde;",
			"&auml;",
			"&aring;",
			"&aelig;",
			"&ccedil;",
			"&egrave;",
			"&eacute;",
			"&ecirc;",
			"&euml;",
			"&igrave;",
			"&iacute;",
			"&icirc;",
			"&iuml;",
			"&eth;",
			"&ntilde;",
			"&ograve;",
			"&oacute;",
			"&ocirc;",
			"&otilde;",
			"&ouml;",
			"&divide;",
			"&oslash;",
			"&ugrave;",
			"&uacute;",
			"&ucirc;",
			"&uuml;",
			"&yacute;",
			"&thorn;",
			"&yuml;",
			"&quot;",
			"&amp;",
			"&lt;",
			"&gt;",
			"&OElig;",
			"&oelig;",
			"&Scaron;",
			"&scaron;",
			"&Yuml;",
			"&circ;",
			"&tilde;",
			"&ensp;",
			"&emsp;",
			"&thinsp;",
			"&zwnj;",
			"&zwj;",
			"&lrm;",
			"&rlm;",
			"&ndash;",
			"&mdash;",
			"&lsquo;",
			"&rsquo;",
			"&sbquo;",
			"&ldquo;",
			"&rdquo;",
			"&bdquo;",
			"&dagger;",
			"&Dagger;",
			"&permil;",
			"&lsaquo;",
			"&rsaquo;",
			"&euro;",
			"&fnof;",
			"&Alpha;",
			"&Beta;",
			"&Gamma;",
			"&Delta;",
			"&Epsilon;",
			"&Zeta;",
			"&Eta;",
			"&Theta;",
			"&Iota;",
			"&Kappa;",
			"&Lambda;",
			"&Mu;",
			"&Nu;",
			"&Xi;",
			"&Omicron;",
			"&Pi;",
			"&Rho;",
			"&Sigma;",
			"&Tau;",
			"&Upsilon;",
			"&Phi;",
			"&Chi;",
			"&Psi;",
			"&Omega;",
			"&alpha;",
			"&beta;",
			"&gamma;",
			"&delta;",
			"&epsilon;",
			"&zeta;",
			"&eta;",
			"&theta;",
			"&iota;",
			"&kappa;",
			"&lambda;",
			"&mu;",
			"&nu;",
			"&xi;",
			"&omicron;",
			"&pi;",
			"&rho;",
			"&sigmaf;",
			"&sigma;",
			"&tau;",
			"&upsilon;",
			"&phi;",
			"&chi;",
			"&psi;",
			"&omega;",
			"&thetasym;",
			"&upsih;",
			"&piv;",
			"&bull;",
			"&hellip;",
			"&prime;",
			"&Prime;",
			"&oline;",
			"&frasl;",
			"&weierp;",
			"&image;",
			"&real;",
			"&trade;",
			"&alefsym;",
			"&larr;",
			"&uarr;",
			"&rarr;",
			"&darr;",
			"&harr;",
			"&crarr;",
			"&lArr;",
			"&uArr;",
			"&rArr;",
			"&dArr;",
			"&hArr;",
			"&forall;",
			"&part;",
			"&exist;",
			"&empty;",
			"&nabla;",
			"&isin;",
			"&notin;",
			"&ni;",
			"&prod;",
			"&sum;",
			"&minus;",
			"&lowast;",
			"&radic;",
			"&prop;",
			"&infin;",
			"&ang;",
			"&and;",
			"&or;",
			"&cap;",
			"&cup;",
			"&int;",
			"&there4;",
			"&sim;",
			"&cong;",
			"&asymp;",
			"&ne;",
			"&equiv;",
			"&le;",
			"&ge;",
			"&sub;",
			"&sup;",
			"&nsub;",
			"&sube;",
			"&supe;",
			"&oplus;",
			"&otimes;",
			"&perp;",
			"&sdot;",
			"&lceil;",
			"&rceil;",
			"&lfloor;",
			"&rfloor;",
			"&lang;",
			"&rang;",
			"&loz;",
			"&spades;",
			"&clubs;",
			"&hearts;",
			"&diams;"
		],
		arr2: [
			"&#160;",
			"&#161;",
			"&#162;",
			"&#163;",
			"&#164;",
			"&#165;",
			"&#166;",
			"&#167;",
			"&#168;",
			"&#169;",
			"&#170;",
			"&#171;",
			"&#172;",
			"&#173;",
			"&#174;",
			"&#175;",
			"&#176;",
			"&#177;",
			"&#178;",
			"&#179;",
			"&#180;",
			"&#181;",
			"&#182;",
			"&#183;",
			"&#184;",
			"&#185;",
			"&#186;",
			"&#187;",
			"&#188;",
			"&#189;",
			"&#190;",
			"&#191;",
			"&#192;",
			"&#193;",
			"&#194;",
			"&#195;",
			"&#196;",
			"&#197;",
			"&#198;",
			"&#199;",
			"&#200;",
			"&#201;",
			"&#202;",
			"&#203;",
			"&#204;",
			"&#205;",
			"&#206;",
			"&#207;",
			"&#208;",
			"&#209;",
			"&#210;",
			"&#211;",
			"&#212;",
			"&#213;",
			"&#214;",
			"&#215;",
			"&#216;",
			"&#217;",
			"&#218;",
			"&#219;",
			"&#220;",
			"&#221;",
			"&#222;",
			"&#223;",
			"&#224;",
			"&#225;",
			"&#226;",
			"&#227;",
			"&#228;",
			"&#229;",
			"&#230;",
			"&#231;",
			"&#232;",
			"&#233;",
			"&#234;",
			"&#235;",
			"&#236;",
			"&#237;",
			"&#238;",
			"&#239;",
			"&#240;",
			"&#241;",
			"&#242;",
			"&#243;",
			"&#244;",
			"&#245;",
			"&#246;",
			"&#247;",
			"&#248;",
			"&#249;",
			"&#250;",
			"&#251;",
			"&#252;",
			"&#253;",
			"&#254;",
			"&#255;",
			"&#34;",
			"&#38;",
			"&#60;",
			"&#62;",
			"&#338;",
			"&#339;",
			"&#352;",
			"&#353;",
			"&#376;",
			"&#710;",
			"&#732;",
			"&#8194;",
			"&#8195;",
			"&#8201;",
			"&#8204;",
			"&#8205;",
			"&#8206;",
			"&#8207;",
			"&#8211;",
			"&#8212;",
			"&#8216;",
			"&#8217;",
			"&#8218;",
			"&#8220;",
			"&#8221;",
			"&#8222;",
			"&#8224;",
			"&#8225;",
			"&#8240;",
			"&#8249;",
			"&#8250;",
			"&#8364;",
			"&#402;",
			"&#913;",
			"&#914;",
			"&#915;",
			"&#916;",
			"&#917;",
			"&#918;",
			"&#919;",
			"&#920;",
			"&#921;",
			"&#922;",
			"&#923;",
			"&#924;",
			"&#925;",
			"&#926;",
			"&#927;",
			"&#928;",
			"&#929;",
			"&#931;",
			"&#932;",
			"&#933;",
			"&#934;",
			"&#935;",
			"&#936;",
			"&#937;",
			"&#945;",
			"&#946;",
			"&#947;",
			"&#948;",
			"&#949;",
			"&#950;",
			"&#951;",
			"&#952;",
			"&#953;",
			"&#954;",
			"&#955;",
			"&#956;",
			"&#957;",
			"&#958;",
			"&#959;",
			"&#960;",
			"&#961;",
			"&#962;",
			"&#963;",
			"&#964;",
			"&#965;",
			"&#966;",
			"&#967;",
			"&#968;",
			"&#969;",
			"&#977;",
			"&#978;",
			"&#982;",
			"&#8226;",
			"&#8230;",
			"&#8242;",
			"&#8243;",
			"&#8254;",
			"&#8260;",
			"&#8472;",
			"&#8465;",
			"&#8476;",
			"&#8482;",
			"&#8501;",
			"&#8592;",
			"&#8593;",
			"&#8594;",
			"&#8595;",
			"&#8596;",
			"&#8629;",
			"&#8656;",
			"&#8657;",
			"&#8658;",
			"&#8659;",
			"&#8660;",
			"&#8704;",
			"&#8706;",
			"&#8707;",
			"&#8709;",
			"&#8711;",
			"&#8712;",
			"&#8713;",
			"&#8715;",
			"&#8719;",
			"&#8721;",
			"&#8722;",
			"&#8727;",
			"&#8730;",
			"&#8733;",
			"&#8734;",
			"&#8736;",
			"&#8743;",
			"&#8744;",
			"&#8745;",
			"&#8746;",
			"&#8747;",
			"&#8756;",
			"&#8764;",
			"&#8773;",
			"&#8776;",
			"&#8800;",
			"&#8801;",
			"&#8804;",
			"&#8805;",
			"&#8834;",
			"&#8835;",
			"&#8836;",
			"&#8838;",
			"&#8839;",
			"&#8853;",
			"&#8855;",
			"&#8869;",
			"&#8901;",
			"&#8968;",
			"&#8969;",
			"&#8970;",
			"&#8971;",
			"&#9001;",
			"&#9002;",
			"&#9674;",
			"&#9824;",
			"&#9827;",
			"&#9829;",
			"&#9830;"
		],

		// Convert HTML entities into numerical entities
		HTML2Numerical: function (s) {
			return this.swapArrayVals(s, this.arr1, this.arr2);
		},

		// Convert Numerical entities into HTML entities
		NumericalToHTML: function (s) {
			return this.swapArrayVals(s, this.arr2, this.arr1);
		},

		// Numerically encodes all unicode characters
		numEncode: function (s) {
			if (this.isEmpty(s)) {
				return "";
			}

			const a = [],
				l = s.length;

			for (let i = 0; i < l; i++) {
				const c = s.charAt(i);
				if (c < " " || c > "~") {
					a.push("&#");
					a.push(c.charCodeAt()); // numeric value of code point
					a.push(";");
				} else {
					a.push(c);
				}
			}

			return a.join("");
		},

		// HTML Decode numerical and HTML entities back to original values
		htmlDecode: function (s) {
			let c,
				m,
				d = s;

			if (this.isEmpty(d)) {
				return "";
			}

			// convert HTML entites back to numerical entites first
			d = this.HTML2Numerical(d);

			// look for numerical entities &#34;
			const arr = d.match(/&#[0-9]{1,5};/g);

			// if no matches found in string then skip
			if (arr != null) {
				for (let x = 0; x < arr.length; x++) {
					m = arr[x];
					c = m.substring(2, m.length - 1); // get numeric part which is refernce to unicode character
					// if its a valid number we can decode
					if (c >= -32768 && c <= 65535) {
						// decode every single match within string
						d = d.replace(m, String.fromCharCode(c));
					} else {
						d = d.replace(m, ""); // invalid so replace with nada
					}
				}
			}

			return d;
		},

		// encode an input string into either numerical or HTML entities
		htmlEncode: function (s, dbl) {
			if (this.isEmpty(s)) {
				return "";
			}

			// do we allow double encoding? E.g will &amp; be turned into &amp;amp;
			dbl = dbl || false; // default to prevent double encoding

			// if allowing double encoding we do ampersands first
			if (dbl) {
				if (this.EncodeType == "numerical") {
					s = s.replace(/&/g, "&#38;");
				} else {
					s = s.replace(/&/g, "&amp;");
				}
			}

			// convert the xss chars to numerical entities ' " < >
			s = this.XSSEncode(s, false);

			if (this.EncodeType == "numerical" || !dbl) {
				// Now call function that will convert any HTML entities to numerical codes
				s = this.HTML2Numerical(s);
			}

			// Now encode all chars above 127 e.g unicode
			s = this.numEncode(s);

			// now we know anything that needs to be encoded has been converted to numerical entities we
			// can encode any ampersands & that are not part of encoded entities
			// to handle the fact that I need to do a negative check and handle multiple ampersands &&&
			// I am going to use a placeholder

			// if we don't want double encoded entities we ignore the & in existing entities
			if (!dbl) {
				s = s.replace(/&#/g, "##AMPHASH##");

				if (this.EncodeType == "numerical") {
					s = s.replace(/&/g, "&#38;");
				} else {
					s = s.replace(/&/g, "&amp;");
				}

				s = s.replace(/##AMPHASH##/g, "&#");
			}

			// replace any malformed entities
			s = s.replace(/&#\d*([^\d;]|$)/g, "$1");

			if (!dbl) {
				// safety check to correct any double encoded &amp;
				s = this.correctEncoding(s);
			}

			// now do we need to convert our numerical encoded string into entities
			if (this.EncodeType == "entity") {
				s = this.NumericalToHTML(s);
			}

			return s;
		},

		// Encodes the basic 4 characters used to malform HTML in XSS hacks
		XSSEncode: function (s, en) {
			if (!this.isEmpty(s)) {
				en = en || true;
				// do we convert to numerical or html entity?
				if (en) {
					s = s.replace(/\'/g, "&#39;"); // no HTML equivalent as &apos is not cross browser supported
					s = s.replace(/\"/g, "&quot;");
					s = s.replace(/</g, "&lt;");
					s = s.replace(/>/g, "&gt;");
				} else {
					s = s.replace(/\'/g, "&#39;"); // no HTML equivalent as &apos is not cross browser supported
					s = s.replace(/\"/g, "&#34;");
					s = s.replace(/</g, "&#60;");
					s = s.replace(/>/g, "&#62;");
				}
				return s;
			} else {
				return "";
			}
		},

		// returns true if a string contains html or numerical encoded entities
		hasEncoded: function (s) {
			if (/&#[0-9]{1,5};/g.test(s)) {
				return true;
			} else if (/&[A-Z]{2,6};/gi.test(s)) {
				return true;
			} else {
				return false;
			}
		},

		// will remove any unicode characters
		stripUnicode: function (s) {
			return s.replace(/[^\x20-\x7E]/g, "");
		},

		// corrects any double encoded &amp; entities e.g &amp;amp;
		correctEncoding: function (s) {
			return s.replace(/(&amp;)(amp;)+/, "$1");
		},

		// Function to loop through an array swaping each item with the value from another array e.g swap HTML entities with Numericals
		swapArrayVals: function (s, arr1, arr2) {
			if (this.isEmpty(s)) {
				return "";
			}
			let re;
			if (arr1 && arr2) {
				// ShowDebug("in swapArrayVals arr1.length = " + arr1.length + " arr2.length = " + arr2.length)
				// array lengths must match
				if (arr1.length == arr2.length) {
					for (let x = 0, i = arr1.length; x < i; x++) {
						re = new RegExp(arr1[x], "g");
						s = s.replace(re, arr2[x]); // swap arr1 item with matching item from arr2
					}
				}
			}
			return s;
		},

		inArray: function (item, arr) {
			for (let i = 0, x = arr.length; i < x; i++) {
				if (arr[i] === item) {
					return i;
				}
			}
			return -1;
		}
	};
	constructor(private http: HttpClient) {}

	changeMessage(message: string) {
		this.messageSource.next(message);
	}

	updateModule(data, _entity: any) {
		switch (_entity) {
			case "taxonomy":
				this.changeMessage("TAXONOMY-UPDATE");
				break;
			case "sku":
				this.changeMessage("SKU-UPDATE");
				this.changeMessage("PRODUCT-SEARCH-UPDATE");
				break;
			case "attribute":
				this.changeMessage("SCHEMA-ATTRIBUTE-UPDATE");
				break;
			case "profam":
			case "product family":
				this.changeMessage("PROFAM-UPDATE");
				this.changeMessage("PRODUCT-SEARCH-UPDATE");
				break;
		}
	}

	getCustomValidators() {
		return this.CustomValidators;
	}

	isPositiveInteger(data) {
		if (data && !isNaN(Number(data))) {
			return this.CustomValidators.positiveInteger.test(data);
		} else {
			return false;
		}
	}

	isInteger(data) {
		if (data && !isNaN(Number(data))) {
			return Number.isInteger(Number(data));
		} else {
			return false;
		}
	}

	isDecimal(data) {
		if (data && !isNaN(Number(data))) {
			if (Number.isInteger(Number(data))) {
				return true;
			} else {
				return this.CustomValidators.decimal.test(data);
			}
		} else {
			return false;
		}
	}

	isString(data) {
		if (data) {
			return isNaN(Number(data));
		} else {
			return false;
		}
	}

	ifSpecialCharacters(data) {
		if (data) {
			return !this.CustomValidators.validCharacters.test(data);
		} else {
			return false;
		}
	}

	isNotEmpty(data) {
		return Object.keys(data).length !== 0;
	}

	encodeEntitiies(enitity) {
		return (enitity != null && enitity != "") ? enitity.replace(/[!@#$%^&*(){}\[\]\|\\]/g, "&lt;").replace(/[!@#$%^&*(){}\[\]\|\\]/g, "&gt;") : enitity;
	}

	decodeEntitiies(enitity) {
		return (enitity != null && enitity != "") ? enitity.replace(/&lt;/g, "<").replace(/&gt;/g, ">") : enitity;
	}

	encodeHTMLTagBrackets(enitity){
		return (enitity != null && enitity != '') ? (enitity.replace(/</g, '&lt;').replace(/>/g, '&gt;')) : enitity;
	}

	decodeHTMLTagBrackets(enitity){
		return (enitity != null && enitity != '') ? (enitity.replace(/&lt;/g, '<').replace(/&gt;/g, '>')) : enitity;
	}

	hasDuplicates(arr) {
		return new Set(arr).size !== arr.length;
	}

	joinWithComma(data: any, key: any) {
		data.map(function (elem) {
			return elem[key];
		}).join(",");
	}

	wrapWithBrackets(wordOrSentence:string, bracket: string = "parentheses"){
		let brackets = ["(", ")"];
		switch(bracket){
			case "parentheses ":
				brackets = ["(", ")"];
				break;
			case "square":
				brackets = ["[", "]"];
				break;
			case "curly":
				brackets = ["{", "}"];
				break;
			case "angle":
				brackets = ["<", ">"];
				break;
		}
		return `${brackets[0]}${wordOrSentence}${brackets[1]}`;
	}

	scrollToBottom(_parentId: any) {
		const objDiv = document.getElementById(_parentId);
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	focusOn(_elementId: any) {
		jQuery("#" + _elementId).focus();
	}

	isValidIframeUrl(_urlString: string) {
		const regexQuery = this.CustomValidators.iframeUrl;
		const url = new RegExp(regexQuery, "i");
		return url.test(_urlString);
	}

	replaceUnderscoresWithSpaces(str: string) {
		return typeof str !== "undefined" && str.length ? str.replace(/_/g, " ") : "";
	}

	camelize(str) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, "");
	}

	range(start, end, step = 1) {
		const output = [];
		if (typeof end === "undefined") {
			end = start;
			start = 0;
		}
		for (let i = start; i < end; i += step) {
			output.push(i);
		}
		return output;
	}

	public flattenApiResponse(_response: any) {
		const $t = this;
		let manipulatedDataEntry: any = {};
		manipulatedDataEntry = {};
		Object.keys(_response).forEach((val: any, valkey: any) => {
			if (jQuery.isPlainObject(_response[val])) {
				if (Object.keys(_response[val]).length) {
					Object.keys(_response[val]).forEach((v: any, vk: any) => {
						manipulatedDataEntry[v] = _response[val][v];
					});
				} else {
					manipulatedDataEntry[val] = _response[val];
				}
			} else {
				manipulatedDataEntry[val] = _response[val];
			}
		});
		return manipulatedDataEntry;
	}

	public convertHTML(str) {
		return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
	}

	isNumber(_value: any) {
		return /^\d+$/.test(_value);
	}

	convertExcelColumn(_value: any) {
		const _toR1C1 = !this.isNumber(_value);
		let answer: any = _toR1C1 ? 0 : "";
		if (_toR1C1) {
			for (let p = 0; p < _value.length; p++) {
				answer = _value[p].charCodeAt() - 64 + answer * 26;
			}
		} else {
			let r;
			while (_value > 0) {
				r = (_value - 1) % 26;
				_value = Math.floor((_value - 1) / 26);
				answer = String.fromCharCode(65 + r) + answer;
			}
		}
		return answer;
	}

	fastSort(arr: any, field: any, isReverse?: boolean) {
		return !isReverse ? sort(arr).asc((a) => a[field]) : sort(arr).desc((a) => a[field]);
	}
}
