(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{567:function(e,t,s){Promise.resolve().then(s.bind(s,1404))},9919:function(e,t,s){"use strict";var a=s(7437),r=s(2340),n=s.n(r);t.Z=()=>(0,a.jsxs)("div",{className:n()["lds-spinner"],children:[(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{})]})},7171:function(e,t,s){"use strict";s.d(t,{H:function(){return u}});var a=s(7437),r=s(2265),n=s(6677),o=s(3085),i=s(4086);let l=(0,i.ad)(n.Z),c=(0,r.createContext)(),u=e=>{let{children:t}=e,[s,u]=(0,r.useState)(null),[d,x]=(0,r.useState)(null),[f,h]=(0,r.useState)(!1),[p,m]=(0,r.useState)(!0),v=(0,o.v0)(n.Z),g=async e=>{let t=(0,i.JU)(l,"usuarios/".concat(e)),s=await (0,i.QT)(t),a=s.data();return a};return(0,r.useEffect)(()=>{let e=(0,o.Aj)(v,async e=>{try{if(e){let t=await g(e.uid);if(t){let s={uid:e.uid,email:e.email,nombre:t.nombre,apellido:t.apellido,rol:t.rol};console.log(v.currentUser),u(s),x(t.rol)}else console.error("Los datos del usuario no est\xe1n disponibles.")}else u(null);m(!1)}catch(e){console.error("Error al obtener datos del usuario:",e)}});return()=>e()},[v]),(0,a.jsx)(c.Provider,{value:{user:s,setUser:u,userRole:d,setRutaProhibida:h,rutaProhibida:f,userLoading:p},children:t})};t.Z=c},9930:function(e,t,s){"use strict";s.d(t,{xi:function(){return d}});var a=s(7437),r=s(2265),n=s(7171),o=s(6677),i=s(3085),l=s(4086);let c=(0,l.ad)(o.Z),u=(0,r.createContext)(),d=e=>{let{children:t}=e,[s,d]=(0,r.useState)([]),[x,f]=(0,r.useState)(!1),[h,p]=(0,r.useState)(!0),[m,v]=(0,r.useState)(!1),[g,j]=(0,r.useState)(""),[S,_]=(0,r.useState)([]),[b,w]=(0,r.useState)(!1),[Z,y]=(0,r.useState)(!1),[C,P]=(0,r.useState)(!1),[E,N]=(0,r.useState)(null),[I,F]=(0,r.useState)({currentPage:0,maxIndexPage:15,minIndexPage:0});(0,i.v0)(o.Z);let{user:J}=(0,r.useContext)(n.Z),L=async e=>{try{await (0,l.ET)((0,l.hJ)(c,"productos"),{...e}),console.log("Producto creado con \xe9xito")}catch(e){console.log(e)}},k=async e=>{try{await (0,l.oe)((0,l.JU)(c,"productos",e.id)),f(!0)}catch(e){console.error(e)}},z=async e=>{try{let t=(0,l.JU)(c,"productos",e.id);await (0,l.pl)(t,e),f(!0)}catch(e){console.error("Error al actualizar el producto:",e)}};return(0,r.useEffect)(()=>{if(J){let e=async()=>{try{let e=await (0,l.PL)((0,l.hJ)(c,"productos")),t=[];e.forEach(e=>{t.push({...e.data(),id:e.id})}),d(t),p(!1),console.log("fetch desde data")}catch(e){console.log(e)}};e()}f(!1)},[x,J]),(0,a.jsx)(u.Provider,{value:{data:s,crearProducto:L,borrarProducto:k,edit:m,setEdit:v,update:E,setUpdate:N,actualizarProducto:z,search:g,setSearch:j,currentFilter:S,setCurrentFilter:_,visibleSelected:b,setVisibleSelected:w,pagination:I,setPagination:F,setShowForm:y,showForm:Z,recargar:x,setRecargar:f,setIsLoading:p,visibleNewUser:C,setVisibleNewUser:P},children:t})};t.ZP=u},2321:function(e,t,s){"use strict";s.d(t,{G:function(){return u},H:function(){return d}});var a=s(7437),r=s(2265),n=s(6677),o=s(4086),i=s(7171),l=s(3085);let c=(0,o.ad)(n.Z),u=(0,r.createContext)({}),d=e=>{let{children:t}=e,[s,d]=(0,r.useState)([]),[x,f]=(0,r.useState)(!1),[h,p]=(0,r.useState)(!1),[m,v]=(0,r.useState)(!1),[g,j]=(0,r.useState)({}),{user:S}=(0,r.useContext)(i.Z);return(0,l.v0)(n.Z),(0,r.useEffect)(()=>{if(S){let e=async()=>{try{let e=await (0,o.PL)((0,o.hJ)(c,"pedidos")),t=[];e.forEach(e=>{t.push({...e.data(),id:e.id})}),d(t),console.log("fetch desde pedidos")}catch(e){console.log(e)}};e()}f(!1)},[x,S]),(0,a.jsx)(u.Provider,{value:{pedidos:s,setPedidos:d,setRecargarPedidos:f,openPedidoGrande:h,setOpenPedidoGrande:p,pedidoSeleccionado:m,setPedidoSeleccionado:v,cartasAbiertasPedidos:g,setCartasAbiertasPedidos:j,cerrarCartaPedidos:()=>{j({})}},children:t})}},7939:function(e,t,s){"use strict";s.d(t,{I:function(){return d}});var a=s(7437),r=s(2265),n=s(7171),o=s(6677),i=s(4086),l=s(3085);let c=(0,i.ad)(o.Z),u=(0,r.createContext)({}),d=e=>{let{children:t}=e,[s,d]=(0,r.useState)([]),[x,f]=(0,r.useState)([]),[h,p]=(0,r.useState)(null),[m,v]=(0,r.useState)(!1),[g,j]=(0,r.useState)(!1),[S,_]=(0,r.useState)(!1),[b,w]=(0,r.useState)({}),{user:Z}=(0,r.useContext)(n.Z);return(0,l.v0)(o.Z),(0,r.useEffect)(()=>{if(Z){let e=async()=>{try{let e=await (0,i.PL)((0,i.hJ)(c,"mesas")),t=[];e.forEach(e=>{t.push({...e.data(),id:e.id})}),d(t),console.log("fetch desde Salon")}catch(e){console.error("Error fetching data:",e)}};e()}j(!1)},[g,Z]),(0,a.jsx)(u.Provider,{value:{mesas:s,setMesas:d,productosMesa:x,setProductosMesa:f,mesaSeleccionada:h,setMesaSeleccionada:p,openMesaGrande:m,setOpenMesaGrande:v,setRecargarMesas:j,setConfirm:_,cartasAbiertas:b,setCartasAbiertas:w,cerrarCarta:()=>{w({})}},children:t})};t.Z=u},1404:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return j}});var a=s(7437),r=s(2265),n=s(6677),o=s(3085),i=s(7171),l=s(9919),c=s(1396),u=s.n(c),d=s(6399),x=s.n(d),f=e=>{let{auth:t}=e,s=(0,r.useRef)(),[n,i]=(0,r.useState)(""),[l,c]=(0,r.useState)(""),[u,d]=(0,r.useState)(null),f=async e=>{e.preventDefault();try{await (0,o.e5)(t,n,l),console.log("inicio de sesi\xf3n exitosa")}catch(e){d(e.message)}};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("section",{className:x()["login-container"],children:[(0,a.jsx)("h1",{children:"Log In"}),(0,a.jsxs)("form",{onSubmit:f,className:x()["login-form"],children:[(0,a.jsx)("label",{htmlFor:"email",children:"Correo:"}),(0,a.jsx)("input",{type:"text",id:"email",ref:s,autoComplete:"off",onChange:e=>i(e.target.value),value:n,required:!0}),(0,a.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,a.jsx)("input",{type:"password",id:"password",onChange:e=>c(e.target.value),value:l,required:!0}),(0,a.jsx)("button",{children:"Log In"})]}),u&&(0,a.jsx)("p",{className:"text-danger",children:u})]})})},h=s(1192),p=s.n(h),m=s(9930),v=s(2321),g=s(7939);function j(){let e=(0,o.v0)(n.Z),{user:t}=(0,r.useContext)(i.Z),{setRecargar:s}=(0,r.useContext)(m.ZP),{setRecargarPedidos:c}=(0,r.useContext)(v.G),{setRecargarMesas:d}=(0,r.useContext)(g.Z),[x,h]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{let t=(0,o.Aj)(e,e=>{h(!1),s(!0),c(!0),d(!0)});return()=>t()},[e,s,c,d]),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:p().welcome,children:x?(0,a.jsx)(l.Z,{}):t?(0,a.jsxs)("div",{className:p().titulos,children:[(0,a.jsx)("h1",{children:"Barcito"}),(0,a.jsx)("h4",{children:"de la esquina"}),(0,a.jsxs)("h5",{children:["Bienvenido ",t.email]}),(0,a.jsx)(u(),{href:"/Salon",className:p()["comenzar-btn"],children:"Comenzar"})]}):!x&&(0,a.jsx)("div",{className:p()["login-wrapper"],children:(0,a.jsx)(f,{auth:e})})})})}},6677:function(e,t,s){"use strict";var a=s(994);let r=(0,a.ZF)({apiKey:"AIzaSyCPoFDVhJEAu33lNxC1gOiYbr2TvADIpgQ",authDomain:"barcome-4054b.firebaseapp.com",projectId:"barcome-4054b",storageBucket:"barcome-4054b.appspot.com",messagingSenderId:"241982700888",appId:"1:241982700888:web:f1f218f72c25c13270792d"});t.Z=r},1192:function(e){e.exports={"login-wrapper":"page_login-wrapper__ke57u",welcome:"page_welcome__yQwUG",titulos:"page_titulos__nPtLH","comenzar-btn":"page_comenzar-btn__95DFY"}},2340:function(e){e.exports={"lds-spinner":"loader_lds-spinner__FSlIq"}},6399:function(e){e.exports={"login-container":"login_login-container___bZS0","login-form":"login_login-form__Y67Bd"}}},function(e){e.O(0,[358,487,647,396,971,596,744],function(){return e(e.s=567)}),_N_E=e.O()}]);