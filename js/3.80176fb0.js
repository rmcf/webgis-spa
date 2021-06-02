(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"1d0e":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",[a("div",{staticClass:"q-pa-lg map-flex-container"},[a("div",{staticClass:"map-info"},[a("q-tabs",{staticClass:"text-grey",attrs:{dense:"","active-color":"primary","indicator-color":"primary",align:"justify"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab",{attrs:{name:"define",label:"hex define"}}),a("q-tab",{attrs:{name:"calculate",label:"hex calculate"}})],1),a("q-separator"),a("q-tab-panels",{attrs:{animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab-panel",{attrs:{name:"define"}},[e.infoClick?a("div",[a("q-banner",{staticClass:"bg-grey-3",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"location_on",color:"blue-grey-5"}})]},proxy:!0}],null,!1,3041685071)},[e._v("\n              Please click on the map\n            ")])],1):e._e(),e.infoClick?e._e():a("div",{staticClass:"clean-button"},[a("q-btn",{staticClass:"full-width",attrs:{color:"orange-7",icon:"clear",label:"Clean map",flat:""},on:{click:function(t){return e.cleanMap()}}})],1),e.onClickCoordinatesComp?a("div",[a("q-card",{staticClass:"my-card card-first-margins"},[a("q-card-section",[a("div",{staticClass:"text-subtitle1 text-weight-medium"},[e._v("\n                  Selected coordinates:\n                ")]),a("div",[e._v("X= "+e._s(e.onClickCoordinatesComp[0]))]),a("div",[e._v("Y= "+e._s(e.onClickCoordinatesComp[1]))])]),a("q-separator"),a("q-card-section",[a("div",[a("q-select",{attrs:{options:e.hexDefineLevels,label:"Level"},model:{value:e.hexDefineLevel,callback:function(t){e.hexDefineLevel=t},expression:"hexDefineLevel"}})],1)]),a("q-card-actions",{attrs:{vertical:"",align:"right"}},[e.onClickCoordinatesComp?a("q-btn",{attrs:{flat:"",color:"primary",label:"define hexagon"},on:{click:function(t){return e.getHexagon(e.onClickCoordinatesComp[0],e.onClickCoordinatesComp[1],e.hexDefineLevel)}}}):e._e()],1)],1)],1):e._e(),e.hexDefineHexagon?a("div",[a("q-card",{staticClass:"my-card card-margins"},[a("q-card-section",[a("div",{staticClass:"text-subtitle1 text-weight-medium"},[e._v("\n                  Selected hexagon:\n                ")]),a("div",[e._v(e._s(e.hexDefineHexagon))])]),a("q-separator"),a("q-card-actions",{attrs:{vertical:"",align:"right"}},[e.onClickCoordinatesComp?a("q-btn",{attrs:{flat:"",color:"primary",label:"hexagon to feature"},on:{click:function(t){return e.convertH3toFeature(e.hexDefineHexagon)}}}):e._e()],1)],1)],1):e._e(),e.hexDefineFeature?a("div",[a("q-card",{staticClass:"my-card card-margins"},[a("q-card-section",{staticClass:"feature-json"},[a("div",{staticClass:"text-subtitle1 text-weight-medium"},[e._v("\n                  Selected feature:\n                ")]),a("div",[e._v(e._s(e.hexDefineFeature))])]),a("q-separator"),a("q-card-actions",{attrs:{vertical:"",align:"right"}},[e.onClickCoordinatesComp?a("q-btn",{attrs:{flat:"",color:"primary",label:"feature to map"},on:{click:function(t){return e.renderHexagon(e.hexDefineFeature)}}}):e._e()],1)],1)],1):e._e(),a("div")]),a("q-tab-panel",{attrs:{name:"calculate"}},[0!==e.hexCalculateFeatures.length?a("div",{staticClass:"clean-button"},[a("q-btn",{staticClass:"full-width",attrs:{color:"orange-7",icon:"clear",label:"Clean map",flat:""},on:{click:function(t){return e.cleanMap()}}})],1):e._e(),0===e.hexCalculateFeatures.length?a("div",[a("q-select",{attrs:{options:e.hexCalculateLevels,label:"Level"},model:{value:e.hexCalculateLevel,callback:function(t){e.hexCalculateLevel=t},expression:"hexCalculateLevel"}})],1):e._e(),0===e.hexCalculateFeatures.length?a("div",{staticClass:"calc-button"},[a("q-btn",{staticClass:"full-width",attrs:{color:"primary",icon:"functions",label:"Calculate HEXs",flat:""},on:{click:function(t){return e.extentToPolygon()}}})],1):e._e(),0!==e.hexCalculateFeatures.length?a("div",[a("q-banner",{staticClass:"bg-grey-3"},[a("q-badge",{attrs:{color:"red","text-color":"white",label:this.hexCalculateHexagons.length}}),e._v("\n              hexagons calculated in map view at level\n              "),a("q-badge",{attrs:{color:"orange","text-color":"black",label:this.hexCalculateLevel}})],1)],1):e._e(),0!==e.hexCalculateFeatures.length?a("div",{staticClass:"hexcalc-list"},[a("q-list",{staticClass:"rounded-borders",attrs:{bordered:"",separator:"",dense:""}},e._l(e.hexCalculateHexagons,(function(t){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:t,attrs:{clickable:""}},[a("q-item-section",[e._v(e._s(t))])],1)})),1)],1):e._e()])],1)],1),a("div",{ref:"map",staticClass:"map-container",attrs:{id:"openmap"}})])])},l=[],i=(a("5bc0"),a("f75e")),o=a("20cd"),r=a.n(o),c=a("5eee"),s=a("a2c7"),u=a("480c"),h=a("d0e9"),d=a("3e6b"),p=a("5831"),m=a("a2e1"),f=a("0af5"),C=a("256f"),x={name:"Map",data(){return{map:null,mapCenter:[25.073697,58.706599],mapZoom:7,clickCoordinates:null,tab:"define",hexDefineLevels:[1,2,3,4,5,6,7,8,9,10,11,12],hexDefineLevel:2,hexDefineHexagon:null,hexDefineFeature:null,hexCalculateLevels:[1,2,3,4],hexCalculateLevel:3,hexCalculateHexagons:[],hexCalculateFeatures:[]}},mounted(){this.createMap()},methods:{createMap(){const e=new u["a"]({source:new h["a"]});this.map=new c["a"]({target:this.$refs["map"],layers:[e],view:new s["a"]({center:Object(C["d"])(this.mapCenter),zoom:this.mapZoom})})},updateMap(){this.map.getView().setZoom(this.mapZoom),this.map.updateSize()},cleanMap(){document.getElementById("openmap").innerHTML="",this.clickCoordinates=null,this.hexDefineLevel=2,this.hexDefineHexagon=null,this.hexDefineFeature=null,this.hexCalculateLevel=3,this.hexCalculateFeatures=[],this.hexCalculateHexagons=[],this.createMap()},clickCoordsMethod(e){this.clickCoordinates=Object(C["l"])(e),this.hexDefineHexagon=null,this.hexDefineFeature=null},convertToLonLat(e){return Object(C["l"])(e)},replaceLatLong(e){let t=[];return t.push(e[1]),t.push(e[0]),t},getHexagon(e,t,a){this.hexDefineHexagon=Object(i["geoToH3"])(t,e,a)},convertH3toFeature(e){this.hexDefineFeature=r.a.h3ToFeature(e)},renderHexagon(e){const t=(new m["a"]).readFeature(e,{featureProjection:"EPSG:3857"}),a=new d["a"]({source:new p["a"]({features:[t]})});this.map.addLayer(a)},extentToPolygon(){let e=[],t=this.map.getView().calculateExtent(),a=Object(f["v"])(t),n=Object(f["C"])(t),l=Object(f["D"])(t),o=Object(f["w"])(t);e.push(a,n,l,o,a);let c=[];e.forEach((e=>{let t=this.convertToLonLat(e),a=this.replaceLatLong(t);c.push(a)}));let s=Object(i["polyfill"])(c,this.hexCalculateLevel);this.hexCalculateHexagons=s,s.forEach((e=>{let t=r.a.h3ToFeature(e),a=(new m["a"]).readFeature(t,{featureProjection:"EPSG:3857"});this.hexCalculateFeatures.push(a)}));let u=new d["a"]({source:new p["a"]({features:this.hexCalculateFeatures})});this.map.addLayer(u)}},computed:{zoomComp:function(){if(this.map){let e=this.map.getView().getZoom();return e}return null},centerComp:function(){if(this.map){let e=this.map.getView().getCenter();return Object(C["l"])(e)}return null},areaComp:function(){if(this.map){let e=this.map.getView().calculateExtent(),t=Object(f["u"])(e)/1e6;return t}return null},projComputed:function(){if(this.map){let e=this.map.getView().getProjection();return e.code_}return null},cornersComputed:function(){if(this.map){let e=[],t=this.map.getView().calculateExtent(),a=Object(f["v"])(t),n=Object(f["w"])(t),l=Object(f["C"])(t),i=Object(f["D"])(t);return e.push(this.convertToLonLat(a),this.convertToLonLat(l),this.convertToLonLat(i),this.convertToLonLat(n)),e}return null},onClickCoordinatesComp:function(){if(this.map){var e=this;return this.map.on("singleclick",(function(t){t.coordinate,e.clickCoordsMethod(t.coordinate)})),this.clickCoordinates}return null},mapWidth:function(){if(this.map){let e=document.getElementById("openmap").offsetWidth;return e}return null},infoClick:function(){return null===this.clickCoordinates&&null===this.hexDefineHexagon&&null===this.hexDefineFeature}}},b=x,v=(a("5920"),a("2877")),g=a("9989"),L=a("429b"),q=a("7460"),k=a("eb85"),w=a("adad"),_=a("823b"),D=a("54e1"),y=a("0016"),F=a("9c40"),j=a("f09f"),H=a("a370"),Q=a("ddd8"),O=a("4b7e"),T=a("58a81"),E=a("1c1c"),M=a("66e5"),P=a("4074"),S=a("714f"),V=a("eebe"),B=a.n(V),I=Object(v["a"])(b,n,l,!1,null,"b31fbe22",null);t["default"]=I.exports;B()(I,"components",{QPage:g["a"],QTabs:L["a"],QTab:q["a"],QSeparator:k["a"],QTabPanels:w["a"],QTabPanel:_["a"],QBanner:D["a"],QIcon:y["a"],QBtn:F["a"],QCard:j["a"],QCardSection:H["a"],QSelect:Q["a"],QCardActions:O["a"],QBadge:T["a"],QList:E["a"],QItem:M["a"],QItemSection:P["a"]}),B()(I,"directives",{Ripple:S["a"]})},5920:function(e,t,a){"use strict";a("d20e")},d20e:function(e,t,a){}}]);