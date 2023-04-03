(()=>{"use strict";let e={async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1};const t=/[&<>"']/,n=new RegExp(t.source,"g"),s=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,r=new RegExp(s.source,"g"),i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},l=e=>i[e];function o(e,i){if(i){if(t.test(e))return e.replace(n,l)}else if(s.test(e))return e.replace(r,l);return e}const a=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function c(e){return e.replace(a,((e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const h=/(^|[^\[])\^/g;function p(e,t){e="string"==typeof e?e:e.source,t=t||"";const n={replace:(t,s)=>(s=(s=s.source||s).replace(h,"$1"),e=e.replace(t,s),n),getRegex:()=>new RegExp(e,t)};return n}const u=/[^\w:]/g,g=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function k(e,t,n){if(e){let e;try{e=decodeURIComponent(c(n)).replace(u,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!g.test(n)&&(n=function(e,t){f[" "+e]||(d.test(e)?f[" "+e]=e+"/":f[" "+e]=_(e,"/",!0));const n=-1===(e=f[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(x,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(m,"$1")+t:e+t}(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}const f={},d=/^[^:]+:\/*[^/]*$/,x=/^([^:]+:)[\s\S]*$/,m=/^([^:]+:\/*[^/]*)[\s\S]*$/,b={exec:function(){}};function w(e,t){const n=e.replace(/\|/g,((e,t,n)=>{let s=!1,r=t;for(;--r>=0&&"\\"===n[r];)s=!s;return s?"|":" |"})).split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function _(e,t,n){const s=e.length;if(0===s)return"";let r=0;for(;r<s;){const i=e.charAt(s-r-1);if(i!==t||n){if(i===t||!n)break;r++}else r++}return e.slice(0,s-r)}function $(e,t){if(t<1)return"";let n="";for(;t>1;)1&t&&(n+=e),t>>=1,e+=e;return n+e}function y(e,t,n,s){const r=t.href,i=t.title?o(t.title):null,l=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){s.state.inLink=!0;const e={type:"link",raw:n,href:r,title:i,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,e}return{type:"image",raw:n,href:r,title:i,text:o(l)}}class z{constructor(t){this.options=t||e}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:_(e,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],n=function(e,t){const n=e.match(/^(\s+)(?:```)/);if(null===n)return t;const s=n[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(null===t)return e;const[n]=t;return n.length>=s.length?e.slice(s.length):e})).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=_(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=t[0].replace(/^ *>[ \t]?/gm,""),n=this.lexer.state.top;this.lexer.state.top=!0;const s=this.lexer.blockTokens(e);return this.lexer.state.top=n,{type:"blockquote",raw:t[0],tokens:s,text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n,s,r,i,l,o,a,c,h,p,u,g,k=t[1].trim();const f=k.length>1,d={type:"list",raw:"",ordered:f,start:f?+k.slice(0,-1):"",loose:!1,items:[]};k=f?`\\d{1,9}\\${k.slice(-1)}`:`\\${k}`,this.options.pedantic&&(k=f?k:"[*+-]");const x=new RegExp(`^( {0,3}${k})((?:[\t ][^\\n]*)?(?:\\n|$))`);for(;e&&(g=!1,t=x.exec(e))&&!this.rules.block.hr.test(e);){if(n=t[0],e=e.substring(n.length),c=t[2].split("\n",1)[0].replace(/^\t+/,(e=>" ".repeat(3*e.length))),h=e.split("\n",1)[0],this.options.pedantic?(i=2,u=c.trimLeft()):(i=t[2].search(/[^ ]/),i=i>4?1:i,u=c.slice(i),i+=t[1].length),o=!1,!c&&/^ *$/.test(h)&&(n+=h+"\n",e=e.substring(h.length+1),g=!0),!g){const t=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),s=new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),r=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),l=new RegExp(`^ {0,${Math.min(3,i-1)}}#`);for(;e&&(p=e.split("\n",1)[0],h=p,this.options.pedantic&&(h=h.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!r.test(h))&&!l.test(h)&&!t.test(h)&&!s.test(e);){if(h.search(/[^ ]/)>=i||!h.trim())u+="\n"+h.slice(i);else{if(o)break;if(c.search(/[^ ]/)>=4)break;if(r.test(c))break;if(l.test(c))break;if(s.test(c))break;u+="\n"+h}o||h.trim()||(o=!0),n+=p+"\n",e=e.substring(p.length+1),c=h.slice(i)}}d.loose||(a?d.loose=!0:/\n *\n *$/.test(n)&&(a=!0)),this.options.gfm&&(s=/^\[[ xX]\] /.exec(u),s&&(r="[ ] "!==s[0],u=u.replace(/^\[[ xX]\] +/,""))),d.items.push({type:"list_item",raw:n,task:!!s,checked:r,loose:!1,text:u}),d.raw+=n}d.items[d.items.length-1].raw=n.trimRight(),d.items[d.items.length-1].text=u.trimRight(),d.raw=d.raw.trimRight();const m=d.items.length;for(l=0;l<m;l++)if(this.lexer.state.top=!1,d.items[l].tokens=this.lexer.blockTokens(d.items[l].text,[]),!d.loose){const e=d.items[l].tokens.filter((e=>"space"===e.type)),t=e.length>0&&e.some((e=>/\n.*\n/.test(e.raw)));d.loose=t}if(d.loose)for(l=0;l<m;l++)d.items[l].loose=!0;return d}}html(e){const t=this.rules.block.html.exec(e);if(t){const e={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]};if(this.options.sanitize){const n=this.options.sanitizer?this.options.sanitizer(t[0]):o(t[0]);e.type="paragraph",e.text=n,e.tokens=this.lexer.inline(n)}return e}}def(e){const t=this.rules.block.def.exec(e);if(t){const e=t[1].toLowerCase().replace(/\s+/g," "),n=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:n,title:s}}}table(e){const t=this.rules.block.table.exec(e);if(t){const e={type:"table",header:w(t[1]).map((e=>({text:e}))),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(e.header.length===e.align.length){e.raw=t[0];let n,s,r,i,l=e.align.length;for(n=0;n<l;n++)/^ *-+: *$/.test(e.align[n])?e.align[n]="right":/^ *:-+: *$/.test(e.align[n])?e.align[n]="center":/^ *:-+ *$/.test(e.align[n])?e.align[n]="left":e.align[n]=null;for(l=e.rows.length,n=0;n<l;n++)e.rows[n]=w(e.rows[n],e.header.length).map((e=>({text:e})));for(l=e.header.length,s=0;s<l;s++)e.header[s].tokens=this.lexer.inline(e.header[s].text);for(l=e.rows.length,s=0;s<l;s++)for(i=e.rows[s],r=0;r<i.length;r++)i[r].tokens=this.lexer.inline(i[r].text);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:o(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):o(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const t=_(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;const n=e.length;let s=0,r=0;for(;r<n;r++)if("\\"===e[r])r++;else if(e[r]===t[0])s++;else if(e[r]===t[1]&&(s--,s<0))return r;return-1}(t[2],"()");if(e>-1){const n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);e&&(n=e[1],s=e[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),/^</.test(n)&&(n=this.options.pedantic&&!/>$/.test(e)?n.slice(1):n.slice(1,-1)),y(t,{href:n?n.replace(this.rules.inline._escapes,"$1"):n,title:s?s.replace(this.rules.inline._escapes,"$1"):s},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=(n[2]||n[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e){const e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return y(n,e,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrong.lDelim.exec(e);if(!s)return;if(s[3]&&n.match(/[\p{L}\p{N}]/u))return;const r=s[1]||s[2]||"";if(!r||r&&(""===n||this.rules.inline.punctuation.exec(n))){const n=s[0].length-1;let r,i,l=n,o=0;const a="*"===s[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(a.lastIndex=0,t=t.slice(-1*e.length+n);null!=(s=a.exec(t));){if(r=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!r)continue;if(i=r.length,s[3]||s[4]){l+=i;continue}if((s[5]||s[6])&&n%3&&!((n+i)%3)){o+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+o);const t=e.slice(0,n+s.index+(s[0].length-r.length)+i);if(Math.min(n,i)%2){const e=t.slice(1,-1);return{type:"em",raw:t,text:e,tokens:this.lexer.inlineTokens(e)}}const a=t.slice(2,-2);return{type:"strong",raw:t,text:a,tokens:this.lexer.inlineTokens(a)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const n=/[^ ]/.test(e),s=/^ /.test(e)&&/ $/.test(e);return n&&s&&(e=e.substring(1,e.length-1)),e=o(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){const n=this.rules.inline.autolink.exec(e);if(n){let e,s;return"@"===n[2]?(e=o(this.options.mangle?t(n[1]):n[1]),s="mailto:"+e):(e=o(n[1]),s=e),{type:"link",raw:n[0],text:e,href:s,tokens:[{type:"text",raw:e,text:e}]}}}url(e,t){let n;if(n=this.rules.inline.url.exec(e)){let e,s;if("@"===n[2])e=o(this.options.mangle?t(n[0]):n[0]),s="mailto:"+e;else{let t;do{t=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0]}while(t!==n[0]);e=o(n[0]),s="www."===n[1]?"http://"+n[0]:n[0]}return{type:"link",raw:n[0],text:e,href:s,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e,t){const n=this.rules.inline.text.exec(e);if(n){let e;return e=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):o(n[0]):n[0]:o(this.options.smartypants?t(n[0]):n[0]),{type:"text",raw:n[0],text:e}}}}const S={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:b,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};S.def=p(S.def).replace("label",S._label).replace("title",S._title).getRegex(),S.bullet=/(?:[*+-]|\d{1,9}[.)])/,S.listItemStart=p(/^( *)(bull) */).replace("bull",S.bullet).getRegex(),S.list=p(S.list).replace(/bull/g,S.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+S.def.source+")").getRegex(),S._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",S._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,S.html=p(S.html,"i").replace("comment",S._comment).replace("tag",S._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),S.paragraph=p(S._paragraph).replace("hr",S.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",S._tag).getRegex(),S.blockquote=p(S.blockquote).replace("paragraph",S.paragraph).getRegex(),S.normal={...S},S.gfm={...S.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"},S.gfm.table=p(S.gfm.table).replace("hr",S.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",S._tag).getRegex(),S.gfm.paragraph=p(S._paragraph).replace("hr",S.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",S.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",S._tag).getRegex(),S.pedantic={...S.normal,html:p("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",S._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:b,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:p(S.normal._paragraph).replace("hr",S.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",S.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const R={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:b,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:b,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function T(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function A(e){let t,n,s="";const r=e.length;for(t=0;t<r;t++)n=e.charCodeAt(t),Math.random()>.5&&(n="x"+n.toString(16)),s+="&#"+n+";";return s}R._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",R.punctuation=p(R.punctuation).replace(/punctuation/g,R._punctuation).getRegex(),R.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,R.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,R._comment=p(S._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),R.emStrong.lDelim=p(R.emStrong.lDelim).replace(/punct/g,R._punctuation).getRegex(),R.emStrong.rDelimAst=p(R.emStrong.rDelimAst,"g").replace(/punct/g,R._punctuation).getRegex(),R.emStrong.rDelimUnd=p(R.emStrong.rDelimUnd,"g").replace(/punct/g,R._punctuation).getRegex(),R._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,R._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,R._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,R.autolink=p(R.autolink).replace("scheme",R._scheme).replace("email",R._email).getRegex(),R._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,R.tag=p(R.tag).replace("comment",R._comment).replace("attribute",R._attribute).getRegex(),R._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,R._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,R._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,R.link=p(R.link).replace("label",R._label).replace("href",R._href).replace("title",R._title).getRegex(),R.reflink=p(R.reflink).replace("label",R._label).replace("ref",S._label).getRegex(),R.nolink=p(R.nolink).replace("ref",S._label).getRegex(),R.reflinkSearch=p(R.reflinkSearch,"g").replace("reflink",R.reflink).replace("nolink",R.nolink).getRegex(),R.normal={...R},R.pedantic={...R.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:p(/^!?\[(label)\]\((.*?)\)/).replace("label",R._label).getRegex(),reflink:p(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",R._label).getRegex()},R.gfm={...R.normal,escape:p(R.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},R.gfm.url=p(R.gfm.url,"i").replace("email",R.gfm._extended_email).getRegex(),R.breaks={...R.gfm,br:p(R.br).replace("{2,}","*").getRegex(),text:p(R.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};class I{constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||e,this.options.tokenizer=this.options.tokenizer||new z,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:S.normal,inline:R.normal};this.options.pedantic?(n.block=S.pedantic,n.inline=R.pedantic):this.options.gfm&&(n.block=S.gfm,this.options.breaks?n.inline=R.breaks:n.inline=R.gfm),this.tokenizer.rules=n}static get rules(){return{block:S,inline:R}}static lex(e,t){return new I(t).lex(e)}static lexInline(e,t){return new I(t).inlineTokens(e)}lex(e){let t;for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){let n,s,r,i;for(e=this.options.pedantic?e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e.replace(/^( *)(\t+)/gm,((e,t,n)=>t+"    ".repeat(n.length)));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((s=>!!(n=s.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))))if(n=this.tokenizer.space(e))e=e.substring(n.raw.length),1===n.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(n);else if(n=this.tokenizer.code(e))e=e.substring(n.raw.length),s=t[t.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?t.push(n):(s.raw+="\n"+n.raw,s.text+="\n"+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(n=this.tokenizer.fences(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.heading(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.hr(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.blockquote(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.list(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.html(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.def(e))e=e.substring(n.raw.length),s=t[t.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title}):(s.raw+="\n"+n.raw,s.text+="\n"+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(n=this.tokenizer.table(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.lheading(e))e=e.substring(n.raw.length),t.push(n);else{if(r=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const n=e.slice(1);let s;this.options.extensions.startBlock.forEach((function(e){s=e.call({lexer:this},n),"number"==typeof s&&s>=0&&(t=Math.min(t,s))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r)))s=t[t.length-1],i&&"paragraph"===s.type?(s.raw+="\n"+n.raw,s.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),i=r.length!==e.length,e=e.substring(n.raw.length);else if(n=this.tokenizer.text(e))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===s.type?(s.raw+="\n"+n.raw,s.text+="\n"+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,s,r,i,l,o,a=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(i=this.tokenizer.rules.inline.reflinkSearch.exec(a));)e.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+$("a",i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(i=this.tokenizer.rules.inline.blockSkip.exec(a));)a=a.slice(0,i.index)+"["+$("a",i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(i=this.tokenizer.rules.inline.escapedEmSt.exec(a));)a=a.slice(0,i.index+i[0].length-2)+"++"+a.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;e;)if(l||(o=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((s=>!!(n=s.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))))if(n=this.tokenizer.escape(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.tag(e))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===n.type&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(n=this.tokenizer.link(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===n.type&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(n=this.tokenizer.emStrong(e,a,o))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.codespan(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.br(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.del(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.autolink(e,A))e=e.substring(n.raw.length),t.push(n);else if(this.state.inLink||!(n=this.tokenizer.url(e,A))){if(r=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const n=e.slice(1);let s;this.options.extensions.startInline.forEach((function(e){s=e.call({lexer:this},n),"number"==typeof s&&s>=0&&(t=Math.min(t,s))})),t<1/0&&t>=0&&(r=e.substring(0,t+1))}if(n=this.tokenizer.inlineText(r,T))e=e.substring(n.raw.length),"_"!==n.raw.slice(-1)&&(o=n.raw.slice(-1)),l=!0,s=t[t.length-1],s&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}else e=e.substring(n.raw.length),t.push(n);return t}}class E{constructor(t){this.options=t||e}code(e,t,n){const s=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,s);null!=t&&t!==e&&(n=!0,e=t)}return e=e.replace(/\n$/,"")+"\n",s?'<pre><code class="'+this.options.langPrefix+o(s)+'">'+(n?e:o(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:o(e,!0))+"</code></pre>\n"}blockquote(e){return`<blockquote>\n${e}</blockquote>\n`}html(e){return e}heading(e,t,n,s){return this.options.headerIds?`<h${t} id="${this.options.headerPrefix+s.slug(n)}">${e}</h${t}>\n`:`<h${t}>${e}</h${t}>\n`}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,n){const s=t?"ol":"ul";return"<"+s+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+s+">\n"}listitem(e){return`<li>${e}</li>\n`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>\n`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return`<tr>\n${e}</tr>\n`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>\n`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){if(null===(e=k(this.options.sanitize,this.options.baseUrl,e)))return n;let s='<a href="'+e+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>",s}image(e,t,n){if(null===(e=k(this.options.sanitize,this.options.baseUrl,e)))return n;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${t}"`),s+=this.options.xhtml?"/>":">",s}text(e){return e}}class v{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Z{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let n=e,s=0;if(this.seen.hasOwnProperty(n)){s=this.seen[e];do{s++,n=e+"-"+s}while(this.seen.hasOwnProperty(n))}return t||(this.seen[e]=s,this.seen[n]=0),n}slug(e,t={}){const n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)}}class q{constructor(t){this.options=t||e,this.options.renderer=this.options.renderer||new E,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new v,this.slugger=new Z}static parse(e,t){return new q(t).parse(e)}static parseInline(e,t){return new q(t).parseInline(e)}parse(e,t=!0){let n,s,r,i,l,o,a,h,p,u,g,k,f,d,x,m,b,w,_,$="";const y=e.length;for(n=0;n<y;n++)if(u=e[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[u.type]&&(_=this.options.extensions.renderers[u.type].call({parser:this},u),!1!==_||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type)))$+=_||"";else switch(u.type){case"space":continue;case"hr":$+=this.renderer.hr();continue;case"heading":$+=this.renderer.heading(this.parseInline(u.tokens),u.depth,c(this.parseInline(u.tokens,this.textRenderer)),this.slugger);continue;case"code":$+=this.renderer.code(u.text,u.lang,u.escaped);continue;case"table":for(h="",a="",i=u.header.length,s=0;s<i;s++)a+=this.renderer.tablecell(this.parseInline(u.header[s].tokens),{header:!0,align:u.align[s]});for(h+=this.renderer.tablerow(a),p="",i=u.rows.length,s=0;s<i;s++){for(o=u.rows[s],a="",l=o.length,r=0;r<l;r++)a+=this.renderer.tablecell(this.parseInline(o[r].tokens),{header:!1,align:u.align[r]});p+=this.renderer.tablerow(a)}$+=this.renderer.table(h,p);continue;case"blockquote":p=this.parse(u.tokens),$+=this.renderer.blockquote(p);continue;case"list":for(g=u.ordered,k=u.start,f=u.loose,i=u.items.length,p="",s=0;s<i;s++)x=u.items[s],m=x.checked,b=x.task,d="",x.task&&(w=this.renderer.checkbox(m),f?x.tokens.length>0&&"paragraph"===x.tokens[0].type?(x.tokens[0].text=w+" "+x.tokens[0].text,x.tokens[0].tokens&&x.tokens[0].tokens.length>0&&"text"===x.tokens[0].tokens[0].type&&(x.tokens[0].tokens[0].text=w+" "+x.tokens[0].tokens[0].text)):x.tokens.unshift({type:"text",text:w}):d+=w),d+=this.parse(x.tokens,f),p+=this.renderer.listitem(d,b,m);$+=this.renderer.list(p,g,k);continue;case"html":$+=this.renderer.html(u.text);continue;case"paragraph":$+=this.renderer.paragraph(this.parseInline(u.tokens));continue;case"text":for(p=u.tokens?this.parseInline(u.tokens):u.text;n+1<y&&"text"===e[n+1].type;)u=e[++n],p+="\n"+(u.tokens?this.parseInline(u.tokens):u.text);$+=t?this.renderer.paragraph(p):p;continue;default:{const e='Token with "'+u.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return $}parseInline(e,t){t=t||this.renderer;let n,s,r,i="";const l=e.length;for(n=0;n<l;n++)if(s=e[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(r=this.options.extensions.renderers[s.type].call({parser:this},s),!1!==r||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)))i+=r||"";else switch(s.type){case"escape":case"text":i+=t.text(s.text);break;case"html":i+=t.html(s.text);break;case"link":i+=t.link(s.href,s.title,this.parseInline(s.tokens,t));break;case"image":i+=t.image(s.href,s.title,s.text);break;case"strong":i+=t.strong(this.parseInline(s.tokens,t));break;case"em":i+=t.em(this.parseInline(s.tokens,t));break;case"codespan":i+=t.codespan(s.text);break;case"br":i+=t.br();break;case"del":i+=t.del(this.parseInline(s.tokens,t));break;default:{const e='Token with "'+s.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return i}}class L{constructor(t){this.options=t||e}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(e){return e}postprocess(e){return e}}function D(e,t){return(n,s,r)=>{"function"==typeof s&&(r=s,s=null);const i={...s},l=function(e,t,n){return s=>{if(s.message+="\nPlease report this to https://github.com/markedjs/marked.",e){const e="<p>An error occurred:</p><pre>"+o(s.message+"",!0)+"</pre>";return t?Promise.resolve(e):n?void n(null,e):e}if(t)return Promise.reject(s);if(!n)throw s;n(s)}}((s={...C.defaults,...i}).silent,s.async,r);if(null==n)return l(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof n)return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}(s),s.hooks&&(s.hooks.options=s),r){const i=s.highlight;let o;try{s.hooks&&(n=s.hooks.preprocess(n)),o=e(n,s)}catch(e){return l(e)}const a=function(e){let n;if(!e)try{s.walkTokens&&C.walkTokens(o,s.walkTokens),n=t(o,s),s.hooks&&(n=s.hooks.postprocess(n))}catch(t){e=t}return s.highlight=i,e?l(e):r(null,n)};if(!i||i.length<3)return a();if(delete s.highlight,!o.length)return a();let c=0;return C.walkTokens(o,(function(e){"code"===e.type&&(c++,setTimeout((()=>{i(e.text,e.lang,(function(t,n){if(t)return a(t);null!=n&&n!==e.text&&(e.text=n,e.escaped=!0),c--,0===c&&a()}))}),0))})),void(0===c&&a())}if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(n):n).then((t=>e(t,s))).then((e=>s.walkTokens?Promise.all(C.walkTokens(e,s.walkTokens)).then((()=>e)):e)).then((e=>t(e,s))).then((e=>s.hooks?s.hooks.postprocess(e):e)).catch(l);try{s.hooks&&(n=s.hooks.preprocess(n));const r=e(n,s);s.walkTokens&&C.walkTokens(r,s.walkTokens);let i=t(r,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(e){return l(e)}}}function C(e,t,n){return D(I.lex,q.parse)(e,t,n)}C.options=C.setOptions=function(t){var n;return C.defaults={...C.defaults,...t},n=C.defaults,e=n,C},C.getDefaults=function(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}},C.defaults=e,C.use=function(...e){const t=C.defaults.extensions||{renderers:{},childTokens:{}};e.forEach((e=>{const n={...e};if(n.async=C.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach((e=>{if(!e.name)throw new Error("extension name required");if(e.renderer){const n=t.renderers[e.name];t.renderers[e.name]=n?function(...t){let s=e.renderer.apply(this,t);return!1===s&&(s=n.apply(this,t)),s}:e.renderer}if(e.tokenizer){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");t[e.level]?t[e.level].unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}e.childTokens&&(t.childTokens[e.name]=e.childTokens)})),n.extensions=t),e.renderer){const t=C.defaults.renderer||new E;for(const n in e.renderer){const s=t[n];t[n]=(...r)=>{let i=e.renderer[n].apply(t,r);return!1===i&&(i=s.apply(t,r)),i}}n.renderer=t}if(e.tokenizer){const t=C.defaults.tokenizer||new z;for(const n in e.tokenizer){const s=t[n];t[n]=(...r)=>{let i=e.tokenizer[n].apply(t,r);return!1===i&&(i=s.apply(t,r)),i}}n.tokenizer=t}if(e.hooks){const t=C.defaults.hooks||new L;for(const n in e.hooks){const s=t[n];L.passThroughHooks.has(n)?t[n]=r=>{if(C.defaults.async)return Promise.resolve(e.hooks[n].call(t,r)).then((e=>s.call(t,e)));const i=e.hooks[n].call(t,r);return s.call(t,i)}:t[n]=(...r)=>{let i=e.hooks[n].apply(t,r);return!1===i&&(i=s.apply(t,r)),i}}n.hooks=t}if(e.walkTokens){const t=C.defaults.walkTokens;n.walkTokens=function(n){let s=[];return s.push(e.walkTokens.call(this,n)),t&&(s=s.concat(t.call(this,n))),s}}C.setOptions(n)}))},C.walkTokens=function(e,t){let n=[];for(const s of e)switch(n=n.concat(t.call(C,s)),s.type){case"table":for(const e of s.header)n=n.concat(C.walkTokens(e.tokens,t));for(const e of s.rows)for(const s of e)n=n.concat(C.walkTokens(s.tokens,t));break;case"list":n=n.concat(C.walkTokens(s.items,t));break;default:C.defaults.extensions&&C.defaults.extensions.childTokens&&C.defaults.extensions.childTokens[s.type]?C.defaults.extensions.childTokens[s.type].forEach((function(e){n=n.concat(C.walkTokens(s[e],t))})):s.tokens&&(n=n.concat(C.walkTokens(s.tokens,t)))}return n},C.parseInline=D(I.lexInline,q.parseInline),C.Parser=q,C.parser=q.parse,C.Renderer=E,C.TextRenderer=v,C.Lexer=I,C.lexer=I.lex,C.Tokenizer=z,C.Slugger=Z,C.Hooks=L,C.parse=C,C.options,C.setOptions,C.use,C.walkTokens,C.parseInline})();