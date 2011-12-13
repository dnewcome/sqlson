/**
 * Convert array to comma separated list
 */
function cslist( arr ) {
	return arr.join(',');
}

// crockford's typeOf
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
} 

exports.typeOf = typeOf;
exports.cslist = cslist;
