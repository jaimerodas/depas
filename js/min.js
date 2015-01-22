function findValue(e){return parseFloat(document.getElementById(e).value)}function replaceValue(e,t){document.getElementById(e).innerHTML=finance.format(t,{precision:2})}function calcularDeuda(e,t){var n,r,i,s,o,u;n=findValue("tasaInteres");r=findValue("periodo");i=r*12;s=e/12;o=finance.calculateAmount(i,n,s);replaceValue("totalDeuda",o);u=t-o;replaceValue("totalEnganche",u)}function calcularTIR(e,t){var n=e/t;replaceValue("tiempoRecuperacion",n)}function calcularIngresos(e,t){var n,r,i,s;n=findValue("rentaMensual");r=findValue("mantenimiento");i=n*t;replaceValue("rentaMensualTotal",i);s=(i-r)*12;replaceValue("utilidadAnual",s);calcularTIR(e,s);return s}function calcularCostos(){var e,t,n,r,i,s,o,u,a,f,l,c;e=findValue("costoMetroTerreno");t=findValue("metrosTerreno");n=e*t;replaceValue("totalTerreno",n);r=findValue("costoMetroConstruccion");i=findValue("metrosConstruccion");s=findValue("numDepartamentos");o=s*i*r;replaceValue("totalConstruccion",o);u=findValue("costoMobiliario");a=findValue("otrosCostos");f=u*s+a;replaceValue("totalVarios",f);l=n+o+f;replaceValue("totalCosto",l);c=calcularIngresos(l,s);calcularDeuda(c,l)}(function(e){var t={};t.version="0.1";t.settings={format:"number",formats:{USD:{before:"$",after:"",precision:2,decimal:".",thousand:",",group:3,negative:"-"},GBP:{before:"£",after:"",precision:2,decimal:".",thousand:",",group:3,negative:"-"},EUR:{before:"€",after:"",precision:2,decimal:".",thousand:",",group:3,negative:"-"},percent:{before:"",after:"%",precision:0,decimal:".",thousand:",",group:3,negative:"-"},number:{before:"",after:"",precision:null,decimal:".",thousand:",",group:3,negative:"-"},defaults:{before:"",after:"",precision:0,decimal:".",thousand:",",group:3,negative:"-"}}};t.defaults=function(e,t){var n;e=e||{};t=t||{};for(n in t){if(t.hasOwnProperty(n)){if(e[n]==null)e[n]=t[n]}}return e};t.addFormat=function(e,t){this.settings.formats[e]=this.defaults(t,this.settings.formats.defaults);return true};t.removeFormat=function(e){delete this.settings.formats[e];return true};t.format=function(e,t,n){e=parseFloat(e);if(t===undefined)t=this.settings.formats[this.settings.format];else if(typeof t=="string")t=this.settings.formats[t];else t=t;t=this.defaults(t,this.settings.formats.defaults);if(n!==undefined)t=this.defaults(n,t);if(t.precision!=null)e=e.toFixed(t.precision);var r=e<0,i=Math.abs(e).toString().split("."),s=i[0].length;i[0]=i[0].replace(/(\d)/g,function(e,n,r,i){return r>0&&(s-r)%t.group==0?t.thousand+n:n});e=i.join(t.decimal);if(r&&t.negative){e=t.negative[0]+e;if(t.negative.length>1)e+=t.negative[1]}return t.before+e+t.after};t.calculateAccruedInterest=function(e,t,n){var r=n/1200;return e*Math.pow(1+r,t)-e};t.calculateAmount=function(e,t,n){var r=0;if(t==0){r=n*e}else{var i=t/100/12,s=Math.pow(i+1,e),o=n/(i*s/(s-1));r=Math.round(o*100)/100}return r};t.calculateMonths=function(e,t,n){var r=0;if(t==0){r=Math.ceil(e/n)}else{r=Math.round(-1/12*Math.log(1-e/n*(t/100/12))/Math.log(1+t/100/12)*12)}return r};t.calculateInterest=function(e,t,n){var r=0;var i=0,s=100;while(i<s-1e-4){var o=(i+s)/2,u=o/1200,a=e*(u/(1-Math.pow(1+u,t*-1)));if(a>n){s=o}else{i=o}}return o.toFixed(2)};t.calculatePayment=function(e,t,n){var r=0;if(n==0){r=e/t}else{var i=n/100/12,s=Math.pow(i+1,t),o=e*(i*s/(s-1));r=Math.round(o*100)/100}return r};t.calculateEarlyPayoff=function(e,t,n,r,i,s){var o=e,u=0,a=e,f=0;var l;var c=t/1200;var h=n;for(months=1;months<n;months++){if(months>n-r){l=i}else{l=0}var p=c*o;u+=p;o-=s-p;if(a>0){var d=c*a;f+=d;a-=s-d+l;if(a<=0){a=0;h=months}}}var v=n-h;var m=parseInt(v/12,10);months=v%12;return{saving:u-f,years:m,months:months}};t.calculateAmortization=function(e,t,n,r){var i=this.calculatePayment(e,t,n),s=e,o=0,u=0,a=[],f=null,l=null,c=r!==undefined&&r.constructor===Date?new Date(r):new Date;for(var h=0;h<t;h++){f=s*n/1200;u+=f;l=i-f;s-=l;a.push({principle:s,interest:u,payment:i,paymentToPrinciple:l,paymentToInterest:f,date:new Date(c.getTime())});c.setMonth(c.getMonth()+1)}return a};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=t}exports.finance=t}else if(typeof define==="function"&&define.amd){define([],function(){return t})}else{e.finance=t}})(this);var inputs,i;inputs=document.getElementsByTagName("input");for(i=0;i<inputs.length;i++){inputs[i].addEventListener("change",calcularCostos)}calcularCostos()
