"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8347],{8347:(R,m,l)=>{l.r(m),l.d(m,{AddEditTransferPageModule:()=>M});var f=l(6895),a=l(433),o=l(4556),u=l(3329),g=l(655),h=l(590),e=l(8256),_=l(495),v=l(2340),T=l(529);let b=(()=>{class r{constructor(t){this.http=t,this.service="/branches"}getAllBranches(){return this.http.get(`${v.N.apiBaseUrl}${this.service}`)}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(T.eN))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var A=l(5970),Z=l(7053),p=l(6531);function y(r,i){if(1&r&&(e.TgZ(0,"div",30)(1,"ion-card")(2,"ion-card-content",22),e._UZ(3,"ngx-barcode",31),e.qZA()()()),2&r){const t=e.oxw();e.xp6(3),e.Q6J("bc-height",70)("bc-value",t.barcode)("bc-display-value",!0)}}function E(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Please provide the Gt transfer number. "),e.qZA())}function F(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Gt must at least 6 integer. "),e.qZA())}function P(r,i){if(1&r&&(e.TgZ(0,"ion-note",32),e._UZ(1,"ion-icon",33),e.YNc(2,E,2,0,"span",34),e.YNc(3,F,2,0,"span",34),e.qZA()),2&r){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",null==t.transferForm.controls.gt||null==t.transferForm.controls.gt.errors?null:t.transferForm.controls.gt.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.transferForm.controls.gt||null==t.transferForm.controls.gt.errors?null:t.transferForm.controls.gt.errors.pattern)}}function N(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Please provide the Bt transfer number. "),e.qZA())}function x(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Gt must at least 6 integer. "),e.qZA())}function I(r,i){if(1&r&&(e.TgZ(0,"ion-note",32),e._UZ(1,"ion-icon",33),e.YNc(2,N,2,0,"span",34),e.YNc(3,x,2,0,"span",34),e.qZA()),2&r){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",null==t.transferForm.controls.bt||null==t.transferForm.controls.bt.errors?null:t.transferForm.controls.bt.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.transferForm.controls.bt||null==t.transferForm.controls.bt.errors?null:t.transferForm.controls.bt.errors.pattern)}}function S(r,i){if(1&r&&(e.TgZ(0,"ion-select-option",35),e._uU(1),e.qZA()),2&r){const t=i.$implicit;e.Q6J("value",t.id),e.xp6(1),e.hij(" ",t.name," ")}}function q(r,i){1&r&&(e.TgZ(0,"ion-note",32),e._UZ(1,"ion-icon",33),e._uU(2," Please select a branch. "),e.qZA())}function U(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Please provide the Lot. "),e.qZA())}function B(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Lot must at least 4 characters. "),e.qZA())}function J(r,i){if(1&r&&(e.TgZ(0,"ion-note",44),e._UZ(1,"ion-icon",45),e.YNc(2,U,2,0,"span",34),e.YNc(3,B,2,0,"span",34),e.qZA()),2&r){const t=e.oxw().$implicit;let n,s;e.xp6(2),e.Q6J("ngIf",null==(n=t.get("lot"))||null==n.errors?null:n.errors.required),e.xp6(1),e.Q6J("ngIf",null==(s=t.get("lot"))||null==s.errors?null:s.errors.minlength)}}function C(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Please provide the quantity. "),e.qZA())}function Y(r,i){1&r&&(e.TgZ(0,"span"),e._uU(1," Quantity must whole number. "),e.qZA())}function w(r,i){if(1&r&&(e.TgZ(0,"ion-note",44),e._UZ(1,"ion-icon",45),e.YNc(2,C,2,0,"span",34),e.YNc(3,Y,2,0,"span",34),e.qZA()),2&r){const t=e.oxw().$implicit;let n,s;e.xp6(2),e.Q6J("ngIf",null==(n=t.get("qty"))||null==n.errors?null:n.errors.required),e.xp6(1),e.Q6J("ngIf",null==(s=t.get("qty"))||null==s.errors?null:s.errors.pattern)}}function Q(r,i){if(1&r){const t=e.EpF();e.TgZ(0,"div",36)(1,"ion-row",37)(2,"ion-col",23)(3,"ion-item",5),e._UZ(4,"ion-input",38),e.qZA()(),e.TgZ(5,"ion-col",39)(6,"ion-item",5),e._UZ(7,"ion-input",40),e.qZA()(),e.TgZ(8,"ion-col",19)(9,"ion-button",41),e.NdJ("click",function(){const d=e.CHM(t).index,c=e.oxw();return e.KtG(c.removeItem(d))}),e._UZ(10,"ion-icon",42),e.qZA()()(),e.YNc(11,J,4,2,"ion-note",43),e.YNc(12,w,4,2,"ion-note",43),e.qZA()}if(2&r){const t=i.$implicit;let s,d;e.Q6J("formGroupName",i.index),e.xp6(11),e.Q6J("ngIf",(null==(s=t.get("lot"))?null:s.errors)&&t.get("lot").touched),e.xp6(1),e.Q6J("ngIf",(null==(d=t.get("qty"))?null:d.errors)&&t.get("qty").touched)}}const G=[{path:"",component:(()=>{class r{constructor(t,n,s,d,c,k,z,j,O,L){this.activatedRoute=t,this.router=n,this.formBuilder=s,this.alertController=d,this.loadingController=c,this.toastController=k,this.transferService=z,this.branchesService=j,this.alertService=O,this.authService=L,this.itemsErrorMessage="",this.isSaving=!1,this.showBarcode=!1,this.barcode="",this.title="",this.action="",this.branches=[]}ngOnInit(){this.user=this.authService.currentUserValue,this.getTransferData(),this.getBranches(),this.setTransferForm()}getTransferData(){this.activatedRoute.queryParams.subscribe(t=>{if(this.router.getCurrentNavigation().extras.state){let n=this.router.getCurrentNavigation().extras.state.data;this.action=n.action,this.transfer=n.transfer,this.title="add"===this.action?"Add Transfer":`Edit GT-${this.transfer.gt}`}})}setTransferForm(){let t=this.transfer;this.transferForm=this.formBuilder.group({gt:[t.gt?t.gt:"",[a.kI.required,a.kI.pattern("^[0-9]{6,}$")]],bt:[t.bt?t.bt:"",[a.kI.required,a.kI.pattern("^[0-9]{6,}$")]],branch_id:[t.branch_id?t.branch_id:"",a.kI.required],items:this.formBuilder.array([this.insertNewItemForm()])}),"edit"==this.action&&(this.items.removeAt(0),this.showBarcodePreview(t.bt,t.branch),this.addItem(t.items))}get items(){return this.transferForm.get("items")}getBranches(){this.branchesService.getAllBranches().subscribe(t=>{this.branches=t},t=>{this.alertService.alertError(t.status,t.statusText)})}addItem(t){this.itemsErrorMessage="",t?t.forEach(n=>{this.items.push(this.insertNewItemForm(n))}):this.items.push(this.insertNewItemForm())}removeItem(t){this.items.length<=1?this.itemsErrorMessage="Please provide at least one item":this.items.removeAt(t)}onCancel(){return(0,g.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({header:"Warning",message:"Are you sure you want to cancel?",buttons:[{text:"Yes",role:"confirm",handler:()=>{this.reset(),this.goBack()}},{text:"No",role:"cancel",handler:()=>{}}]})).present()})}onSubmit(){return(0,g.mG)(this,void 0,void 0,function*(){if(this.transferForm.invalid)return;this.isSaving=!0,(yield this.loadingController.create({message:"add"===this.action?"Adding Transfer":`Editing GT-${this.transfer.gt}`,spinner:"circles"})).present();let n=Object.assign({user_id:this.user.id,supplier_id:this.transfer.supplier_id},this.transferForm.value);"add"===this.action?this.onAddToServer(n,"add"):this.onEditToServer(n,"edit")})}onAddToServer(t,n){this.transferService.addTransfer(t).pipe((0,h.P)()).subscribe({next:s=>{this.onSuccessSave(s,n)},error:s=>{this.onErrorSave(s)}})}onEditToServer(t,n){this.transferService.updateTransfer(this.transfer.id,t).pipe((0,h.P)()).subscribe({next:s=>{this.onSuccessSave(s,n)},error:s=>{this.onErrorSave(s)}})}onSuccessSave(t,n){this.loadingController.dismiss(),this.isSaving=!1,this.presentToast(t.gt,n),this.reset(),this.router.navigate([`/supplier/${t.supplier_id}`])}onErrorSave(t){this.loadingController.dismiss(),this.isSaving=!1,this.alertService.alertError(t.status,t.statusText)}reset(){this.transferForm.reset(),this.items.clear(),this.itemsErrorMessage="",this.isSaving=!1,this.showBarcode=!1,this.barcode=""}showBarcodePreview(t,n){this.transferForm.controls.bt.valid&&this.transferForm.controls.branch_id.valid?(this.showBarcode=!0,this.barcode=`NA${n.branch_code}-BT-${t}`):this.showBarcode=!1}goBack(){this.router.navigate([`/supplier/${this.transfer.supplier_id}`])}insertNewItemForm(t){return new a.cw({lot:new a.NI(t?t.lot:"",[a.kI.required,a.kI.minLength(4)]),qty:new a.NI(t?t.qty:"",[a.kI.required,a.kI.pattern("^[0-9]*$")])})}presentToast(t,n){return(0,g.mG)(this,void 0,void 0,function*(){yield(yield this.toastController.create({message:`GT-${t} was successfully ${n}ed.`,duration:800,position:"bottom"})).present()})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(u.gz),e.Y36(u.F0),e.Y36(a.qu),e.Y36(o.Br),e.Y36(o.HT),e.Y36(o.yF),e.Y36(_.Z),e.Y36(b),e.Y36(A.c),e.Y36(Z.$))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-add-edit-transfer"]],decls:53,vars:11,consts:[["color","primary",1,"ion-text-center"],[1,"container"],["class","barcode-container",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"ion-padding","ion-margin-vertical"],["fill","outline"],["position","floating"],["type","number","formControlName","gt","color","primary"],["slot","error",4,"ngIf"],["fill","outline",1,"ion-margin-top"],["type","number","formControlName","bt","color","primary",3,"ionChange"],["fill","outline",1,"ion-margin-vertical"],["placeholder","Branches","formControlName","branch_id","name","branch_id",3,"ionChange"],["check",""],[3,"value",4,"ngFor","ngForOf"],[1,"ion-justify-content-between"],["size","4"],[1,"ion-no-margin"],["size"," 4"],["size","2"],["formArrayName","items"],[3,"formGroupName",4,"ngFor","ngForOf"],[1,"ion-no-padding","ion-margin-top"],["size","5"],["size","large","type","button","color","dark","expand","block","fill","solid",3,"disabled","click"],["name","add-circle-outline","size","medium"],["size","large","type","submit","color","primary","fill","solid","strong","true","expand","block",3,"disabled"],[1,"container","ion-no-margin"],["type","button","size","large","expand","block","color","secondary","fill","solid","strong","true",3,"disabled","click"],["color","light",1,"ion-text-capitalize"],[1,"barcode-container"],["bc-element-type","img",1,"ngx-barcode",3,"bc-height","bc-value","bc-display-value"],["slot","error"],["name","alert-circle-outline","color","danger"],[4,"ngIf"],[3,"value"],[3,"formGroupName"],[1,"ion-justify-content-between","ion-align-items-center"],["formControlName","lot","color","primary"],["size"," 5"],["type","number","formControlName","qty","color","primary"],["type","button","color","danger","fill","solid",3,"click"],["name","trash","size","large","slot","icon-only",1,"ion-padding-vertical"],["slot","error","color","danger","class","ion-margin-vertical",4,"ngIf"],["slot","error","color","danger",1,"ion-margin-vertical"],["name","alert-circle-outline","color","danger","size","medium"]],template:function(t,n){if(1&t){const s=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title",0),e._uU(3),e.qZA()()(),e.TgZ(4,"ion-content")(5,"div",1),e.YNc(6,y,4,3,"div",2),e.TgZ(7,"form",3),e.NdJ("ngSubmit",function(){return n.onSubmit()}),e.TgZ(8,"div",4)(9,"ion-item",5)(10,"ion-label",6),e._uU(11," Gt: "),e.qZA(),e._UZ(12,"ion-input",7),e.YNc(13,P,4,2,"ion-note",8),e.qZA(),e.TgZ(14,"ion-item",9)(15,"ion-label",6),e._uU(16," Bt: "),e.qZA(),e.TgZ(17,"ion-input",10),e.NdJ("ionChange",function(){e.CHM(s);const c=e.MAs(23);return e.KtG(n.showBarcodePreview(n.transferForm.controls.bt.value,n.branches[c.value-1]))}),e.qZA(),e.YNc(18,I,4,2,"ion-note",8),e.qZA(),e.TgZ(19,"ion-item",11)(20,"ion-label"),e._uU(21,"Select A Branch"),e.qZA(),e.TgZ(22,"ion-select",12,13),e.NdJ("ionChange",function(){e.CHM(s);const c=e.MAs(23);return e.KtG(n.showBarcodePreview(n.transferForm.controls.bt.value,n.branches[c.value-1]))}),e.YNc(24,S,2,2,"ion-select-option",14),e.qZA(),e.YNc(25,q,3,0,"ion-note",8),e.qZA(),e.TgZ(26,"h2"),e._uU(27,"ITEMS:"),e.qZA(),e.TgZ(28,"ion-row",15)(29,"ion-col",16)(30,"h4",17),e._uU(31,"Lot"),e.qZA()(),e.TgZ(32,"ion-col",18)(33,"h4",17),e._uU(34,"Qty"),e.qZA()(),e._UZ(35,"ion-col",19),e.qZA(),e.ynx(36,20),e.YNc(37,Q,13,3,"div",21),e.BQk(),e.TgZ(38,"ion-grid",22)(39,"ion-row",15)(40,"ion-col",23)(41,"ion-button",24),e.NdJ("click",function(){return n.addItem()}),e._UZ(42,"ion-icon",25),e._uU(43," Add item "),e.qZA()(),e.TgZ(44,"ion-col",23)(45,"ion-button",26),e._uU(46," Save "),e.qZA()()()()()()()(),e.TgZ(47,"ion-footer")(48,"ion-toolbar")(49,"div",27)(50,"ion-button",28),e.NdJ("click",function(){return n.onCancel()}),e.TgZ(51,"ion-text",29),e._uU(52," Cancel "),e.qZA()()()()()}2&t&&(e.xp6(3),e.hij("",n.title," "),e.xp6(3),e.Q6J("ngIf",n.showBarcode),e.xp6(1),e.Q6J("formGroup",n.transferForm),e.xp6(6),e.Q6J("ngIf",!n.transferForm.controls.gt.valid&&n.transferForm.controls.gt.touched),e.xp6(5),e.Q6J("ngIf",!n.transferForm.controls.bt.valid&&n.transferForm.controls.bt.touched),e.xp6(6),e.Q6J("ngForOf",n.branches),e.xp6(1),e.Q6J("ngIf",!n.transferForm.controls.branch_id.valid&&n.transferForm.controls.branch_id.touched),e.xp6(12),e.Q6J("ngForOf",n.items.controls),e.xp6(4),e.Q6J("disabled",n.isSaving),e.xp6(4),e.Q6J("disabled",!n.transferForm.valid&&!n.isSaving),e.xp6(5),e.Q6J("disabled",n.isSaving))},dependencies:[f.sg,f.O5,a._Y,a.JJ,a.JL,o.YG,o.PM,o.FN,o.wI,o.W2,o.fr,o.jY,o.Gu,o.gu,o.pK,o.Ie,o.Q$,o.uN,o.Nd,o.t9,o.n0,o.yW,o.wd,o.sr,o.as,o.QI,o.j9,a.sg,a.u,a.x0,a.CE,p.y]}),r})()}];let $=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[u.Bz.forChild(G),u.Bz]}),r})(),M=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[f.ez,a.u5,o.Pc,$,a.UX,p.B]}),r})()}}]);