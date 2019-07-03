import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { DialogProvider } from '../../providers/dialog/dialog';

/**
 * Generated class for the QrdcanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrdcan',
  templateUrl: 'qrdcan.html',
})
export class QrdcanPage {

	// 控制闪光灯
	light: boolean = false;
	// 控制摄像头前后
	frontCamera: boolean = false;
	
  constructor(public navCtrl: NavController, public navParams: NavParams,
	  public qrScanner: QRScanner,
	  public dialog: DialogProvider,) {
  }

 	 /**
	 * 销毁事件
	 */
	public ionViewDidLeave() {
		console.log("销毁相机");
		this.dialog.showAlert("销毁相机","");
		this.qrScanner.hide(); // 隐藏相机
		this.qrScanner.destroy();//销毁相机
	}
  
	ionViewDidLoad() {
		 console.log('ionViewDidLoad QrdcanPage');
        this.qrScanNerMethod();
    }

/**
* 【手机扫描方法qrscanner插件】
* @param{object} callBack
*/
public qrScanNerMethod(callBack ?: any): void {
    this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
            if (status.authorized) {
                // 相机扫描信息承诺
                // 开始扫描
                let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                    //alert(text);
                    this.dialog.showAlert("开启扫码","");
                    this.dialog.showAlert(text,"");
                    
                    this.navCtrl.push('FinishAllPage');
                    console.log("deatilText", text);
                    this.qrScanner.hide();// 隐藏相机
                    scanSub.unsubscribe();// 停止扫描事件
                    callBack && callBack(1, text);
                });
                // 显示相机预览
                this.qrScanner.show();
                callBack && callBack(2);
                // 等待用户扫描某个东西，然后就会调用可观察的回调
            } else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
                callBack && callBack(3);
            } else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
            }
        })
        .catch((e: any) => console.log('Error is', e));
}

/**
* 切换灯光
*/
public toggleLight(): void {
    this.light = !this.light;
    if(this.light) {
        this.qrScanner.enableLight();
    } else {
        this.qrScanner.disableLight();
    }
}

/**
* 切换相机
*/
public toggleCamera(): void {
    this.light = true;
    this.frontCamera = !this.frontCamera;
    if(this.frontCamera) {
        this.qrScanner.useFrontCamera();
    } else {
        this.qrScanner.useBackCamera();
    }
}

}
