import { Injectable } from '@angular/core';
import { ModalController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
/*
  Generated class for the DialogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DialogProvider {

	constructor(
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public sheetCtrl: ActionSheetController) {
		console.log('Hello DialogProvider Provider');
	}
	/**
	 * 弹出模型
	 * position : top middle bottom
	 */
	public showModal(view: any, datas: any, opt: any) {
		let promise = new Promise((success) => {
			let modal = this.modalCtrl.create(view, datas, opt);
			modal.onDidDismiss(data => {
				if(success)
					success(data);
			});
			modal.present();
		});
		//异步回调
		return promise;
	}

	/**
	 * 显示提示 2s
	 * position : top middle bottom
	 */
	public showToast(position, message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: position
		});
		//执行显示
		toast.present();
	}

	/**
	 * 显示普通对话框
	 */
	public showAlert(title, message) {
		let promise = new Promise((success) => {
			let alert = this.alertCtrl.create({
				title: title,
				subTitle: message,
				enableBackdropDismiss: false,
				buttons: [{
					text: '确定',
					role: 'cancel',
					handler: () => {
						if(success)
							success();
					}
				}]
			});
			//执行显示
			alert.present();
		});
		//异步回调
		return promise;
	}

	/**
	 * 显示选择对话框
	 */
	public showConfirm(title, message) {
		let promise = new Promise((success, fail) => {
			let alert = this.alertCtrl.create({
				title: title,
				message: message,
				enableBackdropDismiss: false,
				buttons: [{
					text: '取消',
					role: 'cancel',
					handler: () => {
						if(fail)
							fail();
					}
				}, {
					text: '确定',
					handler: () => {
						if(success)
							success();
					}
				}]
			});
			//执行显示
			alert.present();
		});
		//异步回调
		return promise;
	}

	/**
	 * 显示输入对话框
	 * inputs: [{name: 'username',placeholder: 'Username',type: 'text'},
					    {name: 'password',placeholder: 'Password',type: 'password'}],
	 */
	public showPrompt(title, message, inputs) {
		let promise = new Promise((success, fail) => {
			let alert = this.alertCtrl.create({
				title: title,
				message: message,
				enableBackdropDismiss: false,
				inputs: inputs,
				buttons: [{
					text: '取消',
					role: 'cancel',
					handler: () => {
						if(fail)
							fail();
					}
				}, {
					text: '确定',
					handler: data => {
						if(success)
							success(data);
					}
				}]
			});
			//执行显示
			alert.present();
		});
		//异步回调
		return promise;
	}

	/**
	 * 显示表单选择对话框
	 * role:destructive or cancel
	 * buttons:[{text:'',icon:'',handler:' () => {}',role:''}]
	 */
	public showActionSheet(title, subTitle, buttons, message) {
		let promise = new Promise((success, fail) => {
			let actionSheet = this.sheetCtrl.create({
				title: title,
				subTitle: subTitle,
				buttons: buttons
			});
			//执行显示
			actionSheet.present();
		});
		//异步回调
		return promise;
	}

	/**
	 * 显示上传图片
	 */

	public showPicUpload() {
		let promise = new Promise((success, fail) => {
			let file = document.createElement('input');
			file.setAttribute("type", "file");
			file.setAttribute("accept", "image/*");
			file.id = 'showPicUpload_' + new Date().getTime();
			file.onchange = function(e) {
				var files = e.target['files'][0];
				let reader = new FileReader();
				reader.onload = function() {
					if(success)
						success({'name':files.type,'type':files.type,'data':this.result});
				};
				reader.readAsDataURL(files);
				reader.onerror = function() {
					if(fail)
						fail();
				};
			};
			document.body.appendChild(file);
			file.click();
		});
		//异步回调
		return promise;
	}
}
