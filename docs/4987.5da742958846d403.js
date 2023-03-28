"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4987],{4987:(U,u,r)=>{r.r(u),r.d(u,{LoginPageModule:()=>T});var m=r(6895),a=r(433),t=r(4556),g=r(3329),c=r(590),o=r(8256),d=r(7053),p=r(5970);function f(n,s){1&n&&(o.ynx(0),o.TgZ(1,"div",25),o._UZ(2,"ion-spinner",26),o.TgZ(3,"p"),o._uU(4,"logging in.."),o.qZA()(),o.BQk())}function Z(n,s){1&n&&(o.TgZ(0,"ion-note",27),o._UZ(1,"ion-icon",28),o.TgZ(2,"span"),o._uU(3," Username is a must. "),o.qZA()())}function v(n,s){1&n&&(o.TgZ(0,"ion-note",27),o._UZ(1,"ion-icon",28),o.TgZ(2,"span"),o._uU(3," Password is a must. "),o.qZA()())}const L=[{path:"",component:(()=>{class n{constructor(e,i,l,P){this.formbuilder=e,this.authenticationService=i,this.router=l,this.alertService=P,this.isLoggingIn=!1}ngOnInit(){this.setLoginForm()}setLoginForm(){this.loginForm=this.formbuilder.group({name:["",a.kI.required],password:["",a.kI.required]})}get f(){return this.loginForm.controls}onLogin(e){let i=Object.assign({role:"admin"},e);this.onSubmit(i)}onTryDemo(){this.onSubmit({role:"demo",name:"Demo User",password:"123456"})}onSubmit(e){this.isLoggingIn=!0,this.authenticationService.login(e).pipe((0,c.P)()).subscribe({next:i=>{this.loginForm.reset(),this.isLoggingIn=!1,this.router.navigate(["/home"])},error:i=>{this.isLoggingIn=!1,this.alertService.alertError(i.status,i)}})}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(a.qu),o.Y36(d.$),o.Y36(g.F0),o.Y36(p.c))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-login"]],decls:33,vars:6,consts:[[1,"ion-padding"],[1,"login"],[1,"container"],[1,"login_image"],["src","../../assets/images/login.png","alt",""],[4,"ngIf"],[3,"formGroup","ngSubmit"],["fill","outline",1,"ion-margin-vertical"],["for","name","position","floating"],["formControlName","name","id","name"],["name","person-outline","slot","start"],["class","ion-no-margin","slot","error","color","danger",4,"ngIf"],["fill","outline"],["for","password","position","floating"],["type","password","formControlName","password","id","password"],["name","key-outline","slot","start"],["type","submit","size","large","color","primary","expand","block",1,"ion-margin-vertical",3,"disabled"],[1,"or_section"],[1,"or_text"],["size","large","color","dark","expand","block",1,"ion-margin-vertical",3,"disabled","click"],[1,"app","ion-text-center"],[1,"app_title"],["name","barcode-outline"],[1,"app_verion"],["color","danger"],[1,"ion-text-center"],["color","primary"],["slot","error","color","danger",1,"ion-no-margin"],["name","alert-circle-outline","color","danger","size","medium"]],template:function(e,i){1&e&&(o.TgZ(0,"ion-content",0)(1,"div",1)(2,"div",2)(3,"div",3),o._UZ(4,"ion-img",4),o.qZA(),o.YNc(5,f,5,0,"ng-container",5),o.TgZ(6,"form",6),o.NdJ("ngSubmit",function(){return i.onLogin(i.loginForm.value)}),o.TgZ(7,"ion-item",7)(8,"ion-label",8),o._uU(9,"Username"),o.qZA(),o._UZ(10,"ion-input",9)(11,"ion-icon",10),o.YNc(12,Z,4,0,"ion-note",11),o.qZA(),o.TgZ(13,"ion-item",12)(14,"ion-label",13),o._uU(15,"Password"),o.qZA(),o._UZ(16,"ion-input",14)(17,"ion-icon",15),o.YNc(18,v,4,0,"ion-note",11),o.qZA(),o.TgZ(19,"ion-button",16),o._uU(20,"Log In"),o.qZA()(),o.TgZ(21,"div",17)(22,"p",18),o._uU(23,"OR"),o.qZA()(),o.TgZ(24,"ion-button",19),o.NdJ("click",function(){return i.onTryDemo()}),o._uU(25,"Try Demo"),o.qZA()(),o.TgZ(26,"div",20)(27,"div",21),o._UZ(28,"ion-icon",22),o._uU(29," Barcode Finder "),o.qZA(),o.TgZ(30,"div",23)(31,"ion-text",24),o._uU(32,"Version 1.0"),o.qZA()()()()()),2&e&&(o.xp6(5),o.Q6J("ngIf",i.isLoggingIn),o.xp6(1),o.Q6J("formGroup",i.loginForm),o.xp6(6),o.Q6J("ngIf",i.f.name.errors&&i.f.name.touched),o.xp6(6),o.Q6J("ngIf",i.f.password.errors&&i.f.password.touched),o.xp6(1),o.Q6J("disabled",!i.loginForm.valid||i.isLoggingIn),o.xp6(5),o.Q6J("disabled",i.isLoggingIn))},dependencies:[m.O5,a._Y,a.JJ,a.JL,t.YG,t.W2,t.gu,t.Xz,t.pK,t.Ie,t.Q$,t.uN,t.PQ,t.yW,t.j9,a.sg,a.u]}),n})()}];let h=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[g.Bz.forChild(L),g.Bz]}),n})(),T=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[m.ez,a.u5,t.Pc,h,a.UX]}),n})()}}]);