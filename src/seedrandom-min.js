(function(p,n,j,t,q,u,v){function x(b){var c,d,a=this,f=b.length,e=0,i=a.c=a.d=a.f=0;a.a=[];a.e=[];for(f||(b=[f++]);e<j;)a.a[e]=e++;for(e=0;e<j;e++){c=a.a[e];i=g(i+c+b[e%f]);d=a.a[i];a.a[e]=d;a.a[i]=c}a.b=function(y){var h=a.a,k=g(a.c+1),l=h[k],m=g(a.d+l),o=h[m];h[k]=o;h[m]=l;for(var r=h[g(l+o)];--y;){k=g(k+1);l=h[k];m=g(m+l);o=h[m];h[k]=o;h[m]=l;r=r*j+h[g(l+o)]}a.c=k;a.d=m;return r};a.b(j)}function w(b,c,d,a){d=[];if(c&&typeof b=="object")for(a in b)if(a.indexOf("S")<5)try{d.push(w(b[a],c-1))}catch(f){}return d.length?d:""+b}function s(b,c,d,a){b+="";for(a=d=0;a<b.length;a++)c[g(a)]=g((d^=c[g(a)]*19)+b.charCodeAt(a));b="";for(a in c)b+=String.fromCharCode(c[a]);return b}function g(b){return b&j-1}n.seedrandom=function(b,c){var d=[],a;b=s(w(c?[b,p]:arguments.length?b:[(new Date).getTime(),p,window],3),d);a=new x(d);s(a.a,p);n.random=function(){for(var f=a.b(t),e=v,i=0;f<q;){f=(f+i)*j;e*=j;i=a.b(1)}for(;f>=u;){f/=2;e/=2;i>>>=1}return(f+i)/e};return b};v=n.pow(j,t);q=n.pow(2,q);u=q*2;s(n.random(),p)})([],Math,1024,5,52);