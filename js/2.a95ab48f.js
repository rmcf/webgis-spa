(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"1d0e":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",[a("div",{staticClass:"q-pa-lg"},[a("div",[a("q-input",{attrs:{label:"Map zoom"},on:{change:function(t){return e.updateMap()}},model:{value:e.mapZoom,callback:function(t){e.mapZoom=t},expression:"mapZoom"}})],1),a("div",[e._v("Map Center: "+e._s(e.mapCenter))]),a("div",[e._v("Map Zoom: "+e._s(e.mapZoom))]),a("div",[e._v("Map Zoom Computed: "+e._s(e.zoomComp))]),a("div",[e._v("Map Center Computed: "+e._s(e.centerComp))]),a("div",[e._v("Area: "+e._s(e.areaComp))]),a("div",{ref:"map-root",staticClass:"map-container",attrs:{id:"openmap"}})])])},n=[],p=(a("5bc0"),a("5eee")),m=a("a2c7"),i=a("480c"),r=a("d0e9"),s=a("0af5"),c=a("256f"),u={name:"Map",data(){return{map:null,mapCenter:[25.073697,58.706599],mapZoom:7}},watch:{zoomComp:function(){console.log("zoom updated")}},mounted(){this.createMap()},methods:{createMap(){this.map=new p["a"]({target:this.$refs["map-root"],layers:[new i["a"]({source:new r["a"]})],view:new m["a"]({center:Object(c["d"])(this.mapCenter),zoom:this.mapZoom})})},updateMap(){this.map.getView().setZoom(this.mapZoom)}},computed:{zoomComp:function(){if(this.map){let e=this.map.getView().getZoom();return e}return null},centerComp:function(){if(this.map){let e=this.map.getView().getCenter();return e}return null},areaComp:function(){if(this.map){let e=this.map.getView().calculateExtent(),t=Object(s["s"])(e);return t}return null}}},l=u,d=(a("5595"),a("2877")),f=a("9989"),h=a("27f9"),v=a("eebe"),C=a.n(v),w=Object(d["a"])(l,o,n,!1,null,"389f2129",null);t["default"]=w.exports;C()(w,"components",{QPage:f["a"],QInput:h["a"]})},"2adc":function(e,t,a){},5595:function(e,t,a){"use strict";a("2adc")}}]);