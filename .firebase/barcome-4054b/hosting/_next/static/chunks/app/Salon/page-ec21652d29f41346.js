(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[202],{1077:function(e,a,n){Promise.resolve().then(n.bind(n,1480))},1480:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return L}});var s=n(7437),t=n(2265);n(1988);var r=n(7939),c=n(9679),o=n.n(c),i=n(1279),l=n(2759),d=n(7188),m=n(6677),u=n(4086);let x=(0,u.ad)(m.Z);var h=()=>{let{setMesas:e,mesas:a,setRecargarMesas:n}=(0,t.useContext)(r.Z),[c,m]=(0,t.useState)(!1),[h,_]=(0,t.useState)(""),[j,p]=(0,t.useState)(""),[b,v]=(0,t.useState)(!1),f=async e=>{e.preventDefault();let s=new Date().toLocaleTimeString(),t=new Date().toLocaleDateString(),r=a.find(e=>e.numeroMesa===h);if(r){v(!0),_(""),p("");return}try{await (0,u.ET)((0,u.hJ)(x,"mesas"),{numeroMesa:h,nombreMozo:j,contenido:[],fechaDeCreacion:t,horaDeCreacion:s}),console.log("Mesa creado con \xe9xito"),n(!0),m(!1),_(""),p("")}catch(e){console.log(e)}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:o()["salon-nav-container"],children:(0,s.jsxs)("div",{className:o()["salon-nav-btn"],onClick:()=>{m(!0)},children:[(0,s.jsx)(i.G,{className:o()["salon-btn-icon"],icon:l.r8p}),(0,s.jsx)("h1",{children:"a\xf1adir mesa"})]})}),c&&(0,s.jsx)("div",{className:o()["mesa-form-container"],children:(0,s.jsxs)("div",{className:o()["mesa-form"],children:[(0,s.jsx)("div",{className:o()["close-btn-container"],children:(0,s.jsx)(i.G,{className:o()["close-btn"],onClick:()=>{m(!1)},icon:d.QQm})}),(0,s.jsx)("h2",{children:"Nueva Mesa"}),(0,s.jsxs)("form",{onSubmit:f,children:[(0,s.jsxs)("div",{className:o()["form-field"],children:[(0,s.jsx)("label",{htmlFor:"mesaNumber",children:"N\xfamero de mesa:"}),(0,s.jsx)("input",{id:"mesaNumber",name:"mesaNumber",type:"text",value:h,onChange:e=>_(e.target.value),required:!0})]}),(0,s.jsxs)("div",{className:o()["form-field"],children:[(0,s.jsx)("label",{htmlFor:"mozo",children:"Mozo:"}),(0,s.jsx)("input",{id:"mozo",name:"mozo",type:"text",value:j,onChange:e=>p(e.target.value),required:!0})]}),(0,s.jsx)("div",{className:o()["mesa-form-btn-container"],children:(0,s.jsx)("button",{children:"Aceptar"})}),b&&(0,s.jsx)("h4",{className:o()["mesa-existente"],children:"Esa mesa ya existe"})]})]})})]})},_=n(1631),j=n(9930),p=n(990),b=n.n(p);let v=(0,u.ad)(m.Z);var f=e=>{let{datosMesa:a}=e,{mesas:n,setMesas:c,setMesaSeleccionada:o,setRecargarMesas:i}=(0,t.useContext)(r.Z),{data:l,setRecargar:d}=(0,t.useContext)(j.ZP),[m,x]=(0,t.useState)(""),[h,p]=(0,t.useState)(!1),f=(e,a)=>{x(a),p(!0)},N=async e=>{let s=n.find(e=>e.numeroMesa===a.numeroMesa);if(s){let n=s.contenido.find(a=>a.id===e.id);if(n){let n={...s,contenido:s.contenido.map(a=>a.id===e.id?{...a,cantidad:a.cantidad+1}:a)};try{let e=(0,u.JU)(v,"mesas",a.id);await (0,u.pl)(e,n),console.log("Mesa actualizada con \xe9xito en la base de datos"),o(n),i(!0),d(!0),console.log("recarga mesas desde Carta")}catch(e){console.error("Error al actualizar la mesa en la base de datos",e)}}else{e.cantidad=1,s.contenido.push(e);try{let e=(0,u.JU)(v,"mesas",a.id);await (0,u.pl)(e,s),console.log("Mesa actualizada con \xe9xito en la base de datos"),o({...s}),i(!0),d(!0),console.log("recarga mesas desde Carta")}catch(e){console.error("Error al actualizar la mesa en la base de datos",e)}}}};return(0,s.jsxs)("div",{className:b()["carta-wrapper"],children:[(0,s.jsxs)("div",{className:b()["carta-container"],children:[(0,s.jsx)("article",{className:"".concat(b()["carta-btn"]," ").concat("Pizzas"===m?b().selected:""),onClick:e=>f(e,"Pizzas"),style:{cursor:"pointer"},children:(0,s.jsx)("h3",{children:"Pizzas"})}),(0,s.jsx)("article",{className:"".concat(b()["carta-btn"]," ").concat("Empanadas"===m?b().selected:""),onClick:e=>f(e,"Empanadas"),style:{cursor:"pointer"},children:(0,s.jsx)("h3",{children:"Empanadas"})}),(0,s.jsx)("article",{className:"".concat(b()["carta-btn"]," ").concat("Sandwiches"===m?b().selected:""),onClick:e=>f(e,"Sandwiches"),style:{cursor:"pointer"},children:(0,s.jsx)("h3",{children:"Sandwiches"})}),(0,s.jsx)("article",{className:"".concat(b()["carta-btn"]," ").concat("Papas"===m?b().selected:""),onClick:e=>f(e,"Papas"),style:{cursor:"pointer"},children:(0,s.jsx)("h3",{children:"Papas"})}),(0,s.jsx)("article",{className:"".concat(b()["carta-btn"]," ").concat("Postres"===m?b().selected:""),onClick:e=>f(e,"Postres"),style:{cursor:"pointer"},children:(0,s.jsx)("h3",{children:"Postres"})}),(0,s.jsx)("article",{className:"".concat(b()["carta-btn"]," ").concat("Bebidas"===m?b().selected:""),onClick:e=>f(e,"Bebidas"),style:{cursor:"pointer"},children:(0,s.jsx)("h3",{children:"Bebidas"})})]}),h&&(0,s.jsx)("div",{className:b()["single-item-container"],children:l.filter(e=>e.categoria===m).map((e,a)=>(0,s.jsx)(_.Z,{data:e,handler:()=>N(e)},a))})]})},N=n(2751),g=n.n(N),S=e=>{let{data:a,handler:n}=e,[c,o]=(0,t.useState)(!1),{setMesaSeleccionada:d,openMesaGrande:m,setOpenMesaGrande:u}=(0,t.useContext)(r.Z);return(0,s.jsxs)("div",{className:g()["mesa-wrapper"],children:[(0,s.jsxs)("div",{className:g().mesa,children:[(0,s.jsxs)("h1",{onClick:()=>{d(a),u(!m)},className:g()["mesa-title"],children:["Mesa N\xb0 : ",a.numeroMesa]}),(0,s.jsxs)("h5",{className:g()["nombre-mozo"],children:["Mozo: ",a.nombreMozo]}),(0,s.jsx)("div",{className:g()["mesa-contenido"],children:a.contenido.length>0&&a.contenido.map((e,a)=>(0,s.jsxs)("article",{children:[(0,s.jsx)("h6",{children:e.nombre}),(0,s.jsxs)("h6",{children:["x",e.cantidad]})]},a))}),(0,s.jsx)("div",{className:g()["mesa-btn-container"],children:(0,s.jsxs)("button",{onClick:()=>{o(!c)},className:g()["mesa-btn"],children:[(0,s.jsx)("h4",{children:"Men\xfa"}),c?(0,s.jsx)(i.G,{icon:l.A35}):(0,s.jsx)(i.G,{icon:l._tD})]})})]}),(0,s.jsx)("div",{className:g()["carta-wrapper"],children:c&&(0,s.jsx)(f,{datosMesa:a})})]})},C=n(2891),y=n.n(C),w=n(1585),M=n.n(w);let z=(0,u.ad)(m.Z);var P=e=>{let{dataItem:a,dataMesa:n}=e,{setMesaSeleccionada:c,mesas:o,setMesas:d,setRecargarMesas:m}=(0,t.useContext)(r.Z),[x,h]=(0,t.useState)(a.cantidad),_=async()=>{let e=o.find(e=>e.numeroMesa===n.numeroMesa);if(e){let s={...e,contenido:e.contenido.map(e=>e.id===a.id?{...e,cantidad:e.cantidad+1}:e)};try{let e=(0,u.JU)(z,"mesas",n.id);await (0,u.pl)(e,s),console.log("Mesa actualizada con \xe9xito en la base de datos"),m(!0),c(s)}catch(e){console.error("Error al actualizar la mesa en la base de datos",e)}o.map(e=>e.numeroMesa===n.numeroMesa?s:e),c(s)}},j=async()=>{let e=o.find(e=>e.numeroMesa===n.numeroMesa);if(e){let s={...e,contenido:e.contenido.map(e=>e.id===a.id?{...e,cantidad:e.cantidad-1}:e).filter(e=>e.cantidad>0)};try{let e=(0,u.JU)(z,"mesas",n.id);await (0,u.pl)(e,s),console.log("Mesa actualizada con \xe9xito en la base de datos"),m(!0),c(s)}catch(e){console.error("Error al actualizar la mesa en la base de datos",e)}let t=o.map(e=>e.numeroMesa===n.numeroMesa?s:e);d(t),c(s)}};return(0,s.jsxs)("div",{className:M()["counter-container"],children:[(0,s.jsx)("button",{className:M()["btn-counter"],children:(0,s.jsx)(i.G,{className:M()["icono-counter"],onClick:_,icon:l.g6h})}),"x",a.cantidad,(0,s.jsx)("button",{className:M()["btn-counter"],children:(0,s.jsx)(i.G,{onClick:j,className:M()["icono-counter"],icon:l.SJY})})]})},Z=n(4373),G=n(8889),E=n(589);let k=(0,u.ad)(m.Z);var J=()=>{let{mesas:e,mesaSeleccionada:a,setMesaSeleccionada:n,OpenMesaGrande:c,setOpenMesaGrande:o,setRecargarMesas:m}=(0,t.useContext)(r.Z),[x,h]=(0,t.useState)(!1),[_,j]=(0,t.useState)(!1),[p,b]=(0,t.useState)(!1),[v,N]=(0,t.useState)(0),{numeroMesa:g,nombreMozo:S,contenido:C,horaDeCreacion:w,fechaDeCreacion:M,id:z}=a,J=C.reduce((e,a)=>e+a.precio*a.cantidad,0),F=async()=>{let e=new Date().toLocaleTimeString(),a=new Date().toLocaleDateString(),n=J-v;try{await (0,u.ET)((0,u.hJ)(k,"archivo"),{nombreMozo:S,contenido:C,horaDeCreacion:w,fechaDeCreacion:M,tipo:"mesa",horaDeCierre:e,fechaDeCierre:a,total:J,efectivo:v,tarjeta:n}),console.log("Archivo creado con \xe9xito")}catch(e){console.log(e);return}try{await (0,u.oe)((0,u.JU)(k,"mesas",z)),m(!0),j(!1),o(!1),console.log("Mesa borrada con \xe9xito")}catch(e){console.error(e)}},T=(0,t.useRef)(null),D=(0,G.useReactToPrint)({content:()=>T.current});return(0,s.jsxs)("div",{className:y()["mesa-grande-wrapper"],children:[(0,s.jsxs)("div",{className:y()["mesa-grande"],children:[(0,s.jsxs)("div",{className:y()["mesa-grande-header"],children:[(0,s.jsx)("div",{className:y()["close-btn-container"],children:(0,s.jsx)(i.G,{className:y()["close-btn"],onClick:()=>{o(!1)},icon:d.QQm})}),(0,s.jsxs)("h3",{children:["Mesa N\xb0: ",g]}),(0,s.jsxs)("h4",{children:["Mozo: ",S]}),(0,s.jsxs)("h4",{children:["inicio: ",M," ",w]})]}),(0,s.jsx)("div",{className:y()["mesa-grande-contenedor"],children:(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Item"}),(0,s.jsx)("th",{children:"Cantidad"}),(0,s.jsx)("th",{children:"Precio unit."}),(0,s.jsx)("th",{children:"Total"})]})}),(0,s.jsx)("tbody",{children:C&&C.map((e,n)=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:e.nombre}),(0,s.jsx)("td",{children:(0,s.jsx)(P,{dataMesa:a,dataItem:e},n)}),(0,s.jsxs)("td",{children:["$",e.precio]}),(0,s.jsxs)("td",{children:["$",e.precio*e.cantidad]})]},n))})]})}),(0,s.jsx)("div",{className:y()["mesa-grande-total"],children:(0,s.jsxs)("p",{children:["Total: $",J.toFixed(2)]})}),(0,s.jsxs)("div",{className:y()["btn-container"],children:[(0,s.jsxs)("button",{onClick:()=>{h(!x)},className:y()["close-btn"],children:[(0,s.jsx)("h4",{children:"Men\xfa "}),x?(0,s.jsx)(i.G,{icon:l.mTx}):(0,s.jsx)(i.G,{icon:l.ptq})]}),(0,s.jsxs)("button",{onClick:()=>{b(!p)},className:y()["close-btn"],children:[(0,s.jsx)("h4",{children:"Cobrar y cerrar"}),p?(0,s.jsx)(i.G,{icon:l.mTx}):(0,s.jsx)(i.G,{icon:l.ptq})]})]})]}),_&&(0,s.jsx)(Z.I,{text:"\xbfEst\xe1s seguro de cerrar esta mesa?",handleCancel:()=>{j(!1)},handleConfirm:F}),p&&(0,s.jsxs)("div",{className:y()["cerrar-mesa-container"],children:[(0,s.jsxs)("div",{className:y()["input-container"],children:[(0,s.jsxs)("label",{htmlFor:"efectivo",children:["Efectivo: $",(0,s.jsx)("input",{type:"number",id:"efectivo",onChange:e=>N(Math.max(0,parseFloat(e.target.value)))})]}),(0,s.jsxs)("label",{htmlFor:"tarjeta",children:["Tarjeta: $",(0,s.jsx)("input",{type:"text",id:"tarjeta",value:(J-v).toFixed(2),readOnly:!0})]})]}),(0,s.jsxs)("h3",{className:y()["cerrar-mesa-total"],children:["Total: $",J.toFixed(2)]}),(0,s.jsxs)("div",{className:y()["cerrar-mesa-btn-container"],children:[(0,s.jsx)("button",{onClick:D,children:"Imprimir"}),(0,s.jsx)("button",{onClick:()=>{j(!0)},children:"Cerrar"})]})]}),x&&(0,s.jsx)("div",{className:y()["mesa-grande-menu"],children:(0,s.jsx)(f,{datosMesa:a})}),(0,s.jsx)("div",{ref:T,className:y()["recibo-container"],children:(0,s.jsx)(E.Z,{contenido:C,total:J})})]})},F=n(5113),T=n.n(F);n(9919);var D=()=>{let{mesas:e,setMesas:a,openMesaGrande:n}=(0,t.useContext)(r.Z),c=[...e].sort((e,a)=>e.numeroMesa-a.numeroMesa),o=e=>{};return(0,s.jsxs)(s.Fragment,{children:[c.length>0?(0,s.jsx)("div",{className:T()["salon-mesas"],children:c.map((e,a)=>(0,s.jsx)(S,{data:e,handler:()=>o(e)},a))}):(0,s.jsx)("div",{className:T()["aun-sin-mesas-container"],children:(0,s.jsx)("h1",{className:T()["aun-sin-mesas"],children:"Aun no hay mesas abiertas"})}),n&&(0,s.jsx)("div",{className:T()["mesa-grande-container"],children:(0,s.jsx)(J,{})})]})},U=n(1231),I=n.n(U),A=n(7171),L=()=>{let{rutaProhibida:e,setRutaProhibida:a}=(0,t.useContext)(A.Z);return(0,s.jsxs)(s.Fragment,{children:[e&&(0,s.jsxs)("div",{className:I()["prohibited-message"],children:[(0,s.jsx)("h1",{children:"No tienes permisos para acceder al administrador"}),(0,s.jsx)("span",{onClick:()=>a(!1),className:I()["close-button"],children:"X"})]}),(0,s.jsxs)("div",{className:I()["salon-principal-container"],children:[(0,s.jsx)(h,{}),(0,s.jsx)(D,{})]})]})}},4373:function(e,a,n){"use strict";n.d(a,{I:function(){return c}});var s=n(7437),t=n(708),r=n.n(t);let c=e=>{let{text:a,handleCancel:n,handleConfirm:t}=e;return(0,s.jsx)("div",{className:r()["confirm-wrapper"],children:(0,s.jsxs)("div",{className:r()["confirm-container"],children:[(0,s.jsx)("h2",{children:a}),(0,s.jsxs)("div",{className:r()["btn-container"],children:[(0,s.jsx)("button",{onClick:n,children:"cancelar"}),(0,s.jsx)("button",{onClick:t,children:"confirmar"})]})]})})}},1631:function(e,a,n){"use strict";var s=n(7437),t=n(9530),r=n.n(t);a.Z=e=>{let{data:a,handler:n}=e;return(0,s.jsx)("div",{onClick:n,className:r()["menu-single-item"],children:a.nombre})}},9919:function(e,a,n){"use strict";var s=n(7437),t=n(2340),r=n.n(t);a.Z=()=>(0,s.jsxs)("div",{className:r()["lds-spinner"],children:[(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{}),(0,s.jsx)("div",{})]})},589:function(e,a,n){"use strict";var s=n(7437),t=n(9587),r=n.n(t);a.Z=e=>{let{contenido:a,total:n}=e;return(0,s.jsxs)("div",{className:r()["recibo-wrapper"],children:[(0,s.jsxs)("div",{className:r()["recibo-logo"],children:[(0,s.jsx)("h1",{children:"Barcito"}),(0,s.jsx)("h3",{children:"de la esquina"})]}),(0,s.jsx)("h3",{className:r().resumen,children:"Resumen de la cuenta"}),(0,s.jsx)("table",{className:r()["tabla-container"],children:(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{className:r()["cabecera-tabla"],children:[(0,s.jsx)("th",{children:"c."}),(0,s.jsx)("th",{children:"prod."}),(0,s.jsx)("th",{children:"precio u."}),(0,s.jsx)("th",{children:"precio t."})]}),a&&a.map((e,a)=>(0,s.jsxs)("tr",{className:r().contenido,children:[(0,s.jsx)("td",{style:{fontSize:"24px"},children:e.cantidad}),(0,s.jsx)("td",{style:{fontSize:"24px"},children:e.nombre}),(0,s.jsxs)("td",{style:{fontSize:"24px"},children:["$",e.precio]}),(0,s.jsxs)("td",{style:{fontSize:"24px"},children:["$",e.precio*e.cantidad]})]},a)),(0,s.jsxs)("tr",{className:r().total,children:[(0,s.jsx)("td",{colSpan:3,children:"Total"}),(0,s.jsxs)("td",{children:["$",n]})]})]})})]})}},7171:function(e,a,n){"use strict";n.d(a,{H:function(){return d}});var s=n(7437),t=n(2265),r=n(6677),c=n(3085),o=n(4086);let i=(0,o.ad)(r.Z),l=(0,t.createContext)(),d=e=>{let{children:a}=e,[n,d]=(0,t.useState)(null),[m,u]=(0,t.useState)(null),[x,h]=(0,t.useState)(!1),[_,j]=(0,t.useState)(!0),p=(0,c.v0)(r.Z),b=async e=>{let a=(0,o.JU)(i,"usuarios/".concat(e)),n=await (0,o.QT)(a),s=n.data();return s};return(0,t.useEffect)(()=>{let e=(0,c.Aj)(p,async e=>{try{if(e){let a=await b(e.uid);if(a){let n={uid:e.uid,email:e.email,nombre:a.nombre,apellido:a.apellido,rol:a.rol};console.log(p.currentUser),d(n),u(a.rol)}else console.error("Los datos del usuario no est\xe1n disponibles.")}else d(null);j(!1)}catch(e){console.error("Error al obtener datos del usuario:",e)}});return()=>e()},[p]),(0,s.jsx)(l.Provider,{value:{user:n,setUser:d,userRole:m,setRutaProhibida:h,rutaProhibida:x,userLoading:_},children:a})};a.Z=l},9930:function(e,a,n){"use strict";n.d(a,{xi:function(){return m}});var s=n(7437),t=n(2265),r=n(7171),c=n(6677),o=n(3085),i=n(4086);let l=(0,i.ad)(c.Z),d=(0,t.createContext)(),m=e=>{let{children:a}=e,[n,m]=(0,t.useState)([]),[u,x]=(0,t.useState)(!1),[h,_]=(0,t.useState)(!0),[j,p]=(0,t.useState)(!1),[b,v]=(0,t.useState)(""),[f,N]=(0,t.useState)([]),[g,S]=(0,t.useState)(!1),[C,y]=(0,t.useState)(!1),[w,M]=(0,t.useState)(!1),[z,P]=(0,t.useState)(null),[Z,G]=(0,t.useState)({currentPage:0,maxIndexPage:15,minIndexPage:0});(0,o.v0)(c.Z);let{user:E}=(0,t.useContext)(r.Z),k=async e=>{try{await (0,i.ET)((0,i.hJ)(l,"productos"),{...e}),console.log("Producto creado con \xe9xito")}catch(e){console.log(e)}},J=async e=>{try{await (0,i.oe)((0,i.JU)(l,"productos",e.id)),x(!0)}catch(e){console.error(e)}},F=async e=>{try{let a=(0,i.JU)(l,"productos",e.id);await (0,i.pl)(a,e),x(!0)}catch(e){console.error("Error al actualizar el producto:",e)}};return(0,t.useEffect)(()=>{if(E){let e=async()=>{try{let e=await (0,i.PL)((0,i.hJ)(l,"productos")),a=[];e.forEach(e=>{a.push({...e.data(),id:e.id})}),m(a),_(!1),console.log("fetch desde data")}catch(e){console.log(e)}};e()}x(!1)},[u,E]),(0,s.jsx)(d.Provider,{value:{data:n,crearProducto:k,borrarProducto:J,edit:j,setEdit:p,update:z,setUpdate:P,actualizarProducto:F,search:b,setSearch:v,currentFilter:f,setCurrentFilter:N,visibleSelected:g,setVisibleSelected:S,pagination:Z,setPagination:G,setShowForm:y,showForm:C,recargar:u,setRecargar:x,setIsLoading:_,visibleNewUser:w,setVisibleNewUser:M},children:a})};a.ZP=d},7939:function(e,a,n){"use strict";n.d(a,{I:function(){return m}});var s=n(7437),t=n(2265),r=n(7171),c=n(6677),o=n(4086),i=n(3085);let l=(0,o.ad)(c.Z),d=(0,t.createContext)({}),m=e=>{let{children:a}=e,[n,m]=(0,t.useState)([]),[u,x]=(0,t.useState)([]),[h,_]=(0,t.useState)(null),[j,p]=(0,t.useState)(!1),[b,v]=(0,t.useState)(!1),[f,N]=(0,t.useState)(!1),{user:g}=(0,t.useContext)(r.Z);return(0,i.v0)(c.Z),(0,t.useEffect)(()=>{if(g){let e=async()=>{try{let e=await (0,o.PL)((0,o.hJ)(l,"mesas")),a=[];e.forEach(e=>{a.push({...e.data(),id:e.id})}),m(a),console.log("fetch desde Salon")}catch(e){console.error("Error fetching data:",e)}};e()}v(!1)},[b,g]),(0,s.jsx)(d.Provider,{value:{mesas:n,setMesas:m,productosMesa:u,setProductosMesa:x,mesaSeleccionada:h,setMesaSeleccionada:_,openMesaGrande:j,setOpenMesaGrande:p,setRecargarMesas:v,setConfirm:N},children:a})};a.Z=d},6677:function(e,a,n){"use strict";var s=n(994);let t=(0,s.ZF)({apiKey:"AIzaSyCPoFDVhJEAu33lNxC1gOiYbr2TvADIpgQ",authDomain:"barcome-4054b.firebaseapp.com",projectId:"barcome-4054b",storageBucket:"barcome-4054b.appspot.com",messagingSenderId:"241982700888",appId:"1:241982700888:web:f1f218f72c25c13270792d"});a.Z=t},990:function(e){e.exports={"carta-wrapper":"carta_carta-wrapper__4gIC3","carta-container":"carta_carta-container__2hrA9","single-item-container":"carta_single-item-container__L1yTi","carta-btn":"carta_carta-btn__PU6U6",selected:"carta_selected__nUnFQ"}},708:function(e){e.exports={"confirm-wrapper":"confirm_confirm-wrapper__73P4d","confirm-container":"confirm_confirm-container__RUJoD","btn-container":"confirm_btn-container__DybOh"}},1585:function(e){e.exports={"btn-counter":"counter_btn-counter__oJ9AT","icono-counter":"counter_icono-counter__b5G1I"}},9530:function(e){e.exports={"menu-single-item":"itemList_menu-single-item__ccfGp"}},2340:function(e){e.exports={"lds-spinner":"loader_lds-spinner__FSlIq"}},2751:function(e){e.exports={"mesa-wrapper":"mesa_mesa-wrapper__nvMYa",mesa:"mesa_mesa__VO8P0","mesa-title":"mesa_mesa-title__tT_nM","nombre-mozo":"mesa_nombre-mozo__8znlM","mesa-contenido":"mesa_mesa-contenido__Af9Et","mesa-btn-container":"mesa_mesa-btn-container__Nu9Rv","mesa-btn":"mesa_mesa-btn__zgxD_","carta-wrapper":"mesa_carta-wrapper__pchTf"}},2891:function(e){e.exports={"mesa-grande":"mesaGrande_mesa-grande__lMrHE","mesa-grande-header":"mesaGrande_mesa-grande-header__4W2bc","mesa-grande-contenido":"mesaGrande_mesa-grande-contenido__Cz2aJ","btn-container":"mesaGrande_btn-container__EFS9J","close-btn-container":"mesaGrande_close-btn-container__gpvCq","close-btn":"mesaGrande_close-btn__7X1m3","mesa-grande-menu":"mesaGrande_mesa-grande-menu___rIcO","cerrar-mesa-container":"mesaGrande_cerrar-mesa-container__U3_c_","cerrar-mesa-btn-container":"mesaGrande_cerrar-mesa-btn-container__i9WDJ","cerrar-mesa-total":"mesaGrande_cerrar-mesa-total__8O42V","recibo-container":"mesaGrande_recibo-container__B53a0","input-container":"mesaGrande_input-container__Logsg","mesa-grande-contenedor":"mesaGrande_mesa-grande-contenedor__DUJiY","mesa-grande-total":"mesaGrande_mesa-grande-total__Km_G1"}},9587:function(e){e.exports={"recibo-wrapper":"recibo_recibo-wrapper__9Vc_w","recibo-logo":"recibo_recibo-logo__beuYv",resumen:"recibo_resumen__zhVXe","tabla-container":"recibo_tabla-container__1FWAK","cabecera-tabla":"recibo_cabecera-tabla__A9sMX",contenido:"recibo_contenido__0_6Da",total:"recibo_total__0prJw"}},1231:function(e){e.exports={"salon-principal-container":"salon_salon-principal-container__iUATW","prohibited-message":"salon_prohibited-message__73pj8"}},9679:function(e){e.exports={"salon-nav-container":"salonNav_salon-nav-container__FuH7j","salon-nav-btn":"salonNav_salon-nav-btn__poFYe","salon-btn-icon":"salonNav_salon-btn-icon__beSSl","mesa-form-container":"salonNav_mesa-form-container__Q6Sl4","mesa-form":"salonNav_mesa-form__WuQlU","close-btn-container":"salonNav_close-btn-container__L8U_a","close-btn":"salonNav_close-btn__vD2HD","form-field":"salonNav_form-field__VGjBy","mesa-form-btn-container":"salonNav_mesa-form-btn-container__3qLgF","mesa-existente":"salonNav_mesa-existente__a3v_g"}},5113:function(e){e.exports={"salon-mesas":"salonPrincipal_salon-mesas__Rskhv","mesa-grande-container":"salonPrincipal_mesa-grande-container__CCRZN","aun-sin-mesas-container":"salonPrincipal_aun-sin-mesas-container__t5m9P","aun-sin-mesas":"salonPrincipal_aun-sin-mesas__bg0sA"}}},function(e){e.O(0,[358,487,676,647,988,154,889,971,596,744],function(){return e(e.s=1077)}),_N_E=e.O()}]);