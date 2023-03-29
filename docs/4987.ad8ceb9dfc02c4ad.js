"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4987],{4987:(U,u,r)=>{r.r(u),r.d(u,{LoginPageModule:()=>T});var m=r(6895),a=r(433),e=r(4556),s=r(3329),c=r(590),o=r(8256),d=r(7053),p=r(5970);function f(n,g){1&n&&(o.ynx(0),o.TgZ(1,"div",31),o._UZ(2,"ion-spinner",32),o.TgZ(3,"p"),o._uU(4,"logging in.."),o.qZA()(),o.BQk())}function Z(n,g){1&n&&(o.TgZ(0,"ion-note",33),o._UZ(1,"ion-icon",34),o.TgZ(2,"span"),o._uU(3," Username is a must. "),o.qZA()())}function L(n,g){1&n&&(o.TgZ(0,"ion-note",33),o._UZ(1,"ion-icon",34),o.TgZ(2,"span"),o._uU(3," Password is a must. "),o.qZA()())}const h=[{path:"",component:(()=>{class n{constructor(t,i,l,b){this.formbuilder=t,this.authenticationService=i,this.router=l,this.alertService=b,this.isLoggingIn=!1}ngOnInit(){this.setLoginForm()}setLoginForm(){this.loginForm=this.formbuilder.group({name:["",a.kI.required],password:["",a.kI.required]})}get f(){return this.loginForm.controls}onLogin(t){let i=Object.assign({role:"admin"},t);this.onSubmit(i)}onTryDemo(){this.onSubmit({role:"demo",name:"Demo User",password:"123456"})}onSubmit(t){this.isLoggingIn=!0,this.authenticationService.login(t).pipe((0,c.P)()).subscribe({next:i=>{this.loginForm.reset(),this.isLoggingIn=!1,this.router.navigate(["/home"])},error:i=>{this.isLoggingIn=!1,this.alertService.alertError(i.status,i)}})}}return n.\u0275fac=function(t){return new(t||n)(o.Y36(a.qu),o.Y36(d.$),o.Y36(s.F0),o.Y36(p.c))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-login"]],decls:44,vars:7,consts:[[1,"ion-padding"],[1,"login"],[1,"container"],[1,"login_image"],["src","./assets/images/login.png","alt","logging in"],[4,"ngIf"],["color","warning"],["name","alert-circle-outline","color","warning"],[3,"formGroup","ngSubmit"],["fill","outline",1,"ion-margin-vertical"],["for","name","position","floating"],["formControlName","name","id","name"],["name","person-outline","slot","start"],["class","ion-no-margin","slot","error","color","danger",4,"ngIf"],["fill","outline"],["for","password","position","floating"],["type","password","formControlName","password","id","password"],["name","key-outline","slot","start"],["type","submit","size","large","color","primary","expand","block",1,"ion-margin-vertical",3,"disabled"],[1,"or_section"],[1,"or_text"],[1,"ion-no-padding","ion-margin-bottom"],[1,"ion-justify-content-between"],["size","5"],["size","large","color","dark","expand","block",3,"disabled","click"],["routerLink","/manual-generator","type","button","size","large","expand","block","color","primary","fill","solid",3,"disabled"],["color","light",1,"ion-text-capitalize"],[1,"app","ion-text-center"],[1,"app_title"],["name","barcode-outline"],[1,"app_verion"],[1,"ion-text-center"],["color","primary"],["slot","error","color","danger",1,"ion-no-margin"],["name","alert-circle-outline","color","danger","size","medium"]],template:function(t,i){1&t&&(o.TgZ(0,"ion-content",0)(1,"div",1)(2,"div",2)(3,"div",3),o._UZ(4,"ion-img",4),o.qZA(),o.YNc(5,f,5,0,"ng-container",5),o.TgZ(6,"ion-text",6),o._UZ(7,"ion-icon",7),o._uU(8," This form is for admin only. "),o.qZA(),o.TgZ(9,"form",8),o.NdJ("ngSubmit",function(){return i.onLogin(i.loginForm.value)}),o.TgZ(10,"ion-item",9)(11,"ion-label",10),o._uU(12,"Username"),o.qZA(),o._UZ(13,"ion-input",11)(14,"ion-icon",12),o.YNc(15,Z,4,0,"ion-note",13),o.qZA(),o.TgZ(16,"ion-item",14)(17,"ion-label",15),o._uU(18,"Password"),o.qZA(),o._UZ(19,"ion-input",16)(20,"ion-icon",17),o.YNc(21,L,4,0,"ion-note",13),o.qZA(),o.TgZ(22,"ion-button",18),o._uU(23,"Log In"),o.qZA()(),o.TgZ(24,"div",19)(25,"p",20),o._uU(26,"OR"),o.qZA()(),o.TgZ(27,"ion-grid",21)(28,"ion-row",22)(29,"ion-col",23)(30,"ion-button",24),o.NdJ("click",function(){return i.onTryDemo()}),o.TgZ(31,"ion-text",6),o._uU(32," Try Demo "),o.qZA()()(),o.TgZ(33,"ion-col",23)(34,"ion-button",25)(35,"ion-text",26),o._uU(36," Manual "),o.qZA()()()()()(),o.TgZ(37,"div",27)(38,"div",28),o._UZ(39,"ion-icon",29),o._uU(40," Barcode Finder "),o.qZA(),o.TgZ(41,"div",30)(42,"ion-text",6),o._uU(43,"Version 1.0"),o.qZA()()()()()),2&t&&(o.xp6(5),o.Q6J("ngIf",i.isLoggingIn),o.xp6(4),o.Q6J("formGroup",i.loginForm),o.xp6(6),o.Q6J("ngIf",i.f.name.errors&&i.f.name.touched),o.xp6(6),o.Q6J("ngIf",i.f.password.errors&&i.f.password.touched),o.xp6(1),o.Q6J("disabled",!i.loginForm.valid||i.isLoggingIn),o.xp6(8),o.Q6J("disabled",i.isLoggingIn),o.xp6(4),o.Q6J("disabled",i.isLoggingIn))},dependencies:[m.O5,a._Y,a.JJ,a.JL,e.YG,e.wI,e.W2,e.jY,e.gu,e.Xz,e.pK,e.Ie,e.Q$,e.uN,e.Nd,e.PQ,e.yW,e.j9,e.YI,s.rH,a.sg,a.u]}),n})()}];let v=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[s.Bz.forChild(h),s.Bz]}),n})(),T=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[m.ez,a.u5,e.Pc,v,a.UX]}),n})()}}]);