require("common/manifest.js");
require("common/vendor.js");
global.webpackJsonp([2],[,,,,,,,,,function(e,t,n){"use strict";var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e},o=s(n(2)),a=s(n(10)),r=s(n(13));function s(e){return e&&e.__esModule?e:{default:e}}n(0).default;o.default.prototype.$store=r.default,o.default.config.productionTip=!1,a.default.mpType="app",new o.default(u({store:r.default},a.default)).$mount()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n(12),o=n.n(u),a=!1;var r=function(e){a||n(11)},s=n(1)(o.a,null,r,null,null);s.options.__file="..\\..\\..\\..\\xm\\uni-app\\shop\\App.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),t.default=s.exports},function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e},o=n(3),a=n(0).default;n(4);t.default={data:function(){return{}},computed:u({},(0,o.mapGetters)(["GET_CODE","GET_USERINFO"]),(0,o.mapState)(["HTTPS_TOKEN_RUL","WSS_URL"])),methods:{initSocket:function(){},getsetting:function(){wx.getSetting({success:function(e){e.authSetting["scope.userInfo"]||a.navigateTo({url:"/pages/getinfo/getinfo"})}})}},onLaunch:function(e){},onShow:function(e){this.getsetting()},onHide:function(){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=l(n(2)),o=l(n(3)),a=l(n(14)),r=l(n(15)),s=l(n(16)),i=l(n(17));function l(e){return e&&e.__esModule?e:{default:e}}n(0).default;u.default.use(o.default);var c=new o.default.Store({state:a.default,getters:r.default,mutations:s.default,actions:i.default});t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(0).default;t.default={CODE:"",TT_TOKEN:"",TICKET:"",HTTPS_URL:"https://jt.51play.com",HTTPS_TOKEN_RUL:"https://mgdvcas.51play.com",WSS_URL:"wss://pusher.51play.com",USERINFO:""}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(0).default;t.default={GET_CODE:function(e){return{code:e.CODE,tt_token:e.TT_TOKEN,ticket:e.TICKET}},GET_USERINFO:function(e){return e.USERINFO}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n(0).default;t.default={SET_CODE:function(e,t){e.CODE=t.code,e.TT_TOKEN=t.tt_token,e.TICKET=t.ticket},SET_USERINFO:function(e,t){e.USERINFO=t},FILE_TIME:function(e,t){var n=new Date(t);return n.getFullYear()+"-"+n.getMonth()+"-"+n.getDate()+"  "+n.getHours()+":"+n.getMinutes()},UPDATA_USER_RADAR:function(e,t){var n=u.getStorageSync("CODE")||"",o=u.getStorageSync("USERINFO")||"",a=t.newdata,r=t.type||"visit_business_card";u.request({url:e.HTTPS_URL+"/event/radar",method:"POST",header:{"Content-Type":"application/json"},data:{sellerUserid:a.userid,sellerName:a.cardName,userid:n.userId,userName:o.nickName,userImgUrl:o.avatarUrl,optionType:r},success:function(e){console.log("记录用户行为",e)}})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(0).default;t.default={}}],[9]);
//# sourceMappingURL=.sourcemap/app.js.map