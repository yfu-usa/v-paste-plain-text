
function isTrue( value ) {
  return  value === undefined || value === 'true' || value === true
}

function replace( text, from, to ) {
  return text.replaceAll(String.fromCharCode(from), to)
}

function stringToBinary(str) {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    hex += charCode.toString(16).padStart(2, '0') + ' ';
  }
  return hex;}


export default {
  name: 'paste-plain-text',

  mounted(el, { value }, node) {
    el.$pasteNofw = true
    el.$pasteQuote = true

    if (value)                           {
      el.$pasteNofw = isTrue(value.nofw)
      el.$pasteQuote = isTrue(value.quote)
    }
    const handler = e => {
      e.preventDefault()
      console.log('paste', el, el.$pasteArg)
      const clipboardData = e.clipboardData || window.clipboardData
      let text = clipboardData.getData('text/plain')
      console.log('paste', text)
      const binary = stringToBinary(text)
      if (el.$pasteNofw) {
        text = text.replace(/[\uff01-\uff5e]/g, function(ch) {
          return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
        });
        console.log('paste:nofw', text)
      }
      if (el.$pasteQuote) {
//Quotes: Replace smart double quotes with straight double quotes.
//Unicode version for use with Unicode regex engines.
        text = text.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');

//Quotes: Replace smart single quotes and apostrophes with straight single quotes.
//Unicode version for use with Unicode regex engines.
        text = text.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");

        console.log('paste:quote', text)
      }
      console.log('paste', text)
      console.log('paste', stringToBinary(text))
      if ( el.tagName === 'TEXTAREA' || el.tagName === 'INPUT' ) {
        el.value = text
        el.dispatchEvent(new CustomEvent('input'));
      } else {
        const el2 = el.querySelector('textarea , input')
        if (el2) {
          el2.value = text
          el2.dispatchEvent(new CustomEvent('input'));
        }
      }

    }
    el.addEventListener('paste', handler)
    el.$destroyReload = () => el.removeEventListener('click', handler)
  },

  beforeUnmount(el) {
     el.$destroyReload()
  },

    updated(el, { arg }) {
        el.$pasteArg = arg
    },
}
