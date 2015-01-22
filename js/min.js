function findValue(e){return parseFloat(document.getElementById(e).value)}function replaceValue(e,t){var n,r;n=t.toFixed(2).toString().split(".");n[0]=n[0].replace(/(\d)/g,function(e,t,n,r){return n>0&&(r.length-n)%3==0?","+t:t});r=n.join(".");if(t<0){r="-"+r}document.getElementById(e).innerHTML=r}function calculaMonto(e,t,n){var r=0;if(t==0){r=n*e}else{var i=t/100/12,s=Math.pow(i+1,e),o=n/(i*s/(s-1));r=Math.round(o*100)/100}return r}function calcularDeuda(e,t){var n,r,i,s,o,u;n=findValue("tasaInteres");r=findValue("periodo");i=r*12;s=e/12;o=calculaMonto(i,n,s);replaceValue("totalDeuda",o);u=t-o;replaceValue("totalEnganche",u)}function calcularTIR(e,t){var n=e/t;replaceValue("tiempoRecuperacion",n)}function calcularIngresos(e,t){var n,r,i,s;n=findValue("rentaMensual");r=findValue("mantenimiento");i=n*t;replaceValue("rentaMensualTotal",i);s=(i-r)*12;replaceValue("utilidadAnual",s);calcularTIR(e,s);return s}function calcularCostos(){var e,t,n,r,i,s,o,u,a,f,l,c;e=findValue("costoMetroTerreno");t=findValue("metrosTerreno");n=e*t;replaceValue("totalTerreno",n);r=findValue("costoMetroConstruccion");i=findValue("metrosConstruccion");s=findValue("numDepartamentos");o=s*i*r;replaceValue("totalConstruccion",o);u=findValue("costoMobiliario");a=findValue("otrosCostos");f=u*s+a;replaceValue("totalVarios",f);l=n+o+f;replaceValue("totalCosto",l);c=calcularIngresos(l,s);calcularDeuda(c,l)}var inputs,i;inputs=document.getElementsByTagName("input");for(i=0;i<inputs.length;i++){inputs[i].addEventListener("change",calcularCostos)}calcularCostos()
