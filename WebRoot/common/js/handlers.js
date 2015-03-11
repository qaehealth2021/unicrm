
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
	document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
	instance.stopUpload();
	var stats;
	
	do {
		stats = instance.getStats();
		instance.cancelUpload();
	} while (stats.files_queued !== 0);
	
}

/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function fileDialogStart() {
	/* I don't need to do anything here */
	//alert("fileDialogStart");
}
var totalSize=0;
function fileQueued(file) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		//alert("fileQueued");
		
		totalSize+=file.size;
		var listingfiles = document.getElementById("fileList");	
		var tr = listingfiles.insertRow();
		tr.id=file.id;
		
		var flag = tr.insertCell(); flag.className='flag2';
			var fileName = tr.insertCell();
			fileName.innerHTML=file.name;
			//fileName.width="300px";
			
			var progressTD = tr.insertCell(); progressTD.className='progressTD';
			//progressTD.width= "30px";
			progressTD.innerHTML='<span id="' + file.id +'progress" class="progressBar"></span><span style="width:47">'+getNiceFileSize(file.size)+'</span>';
			
			var del = tr.insertCell(); 
			//del.style="width : 300px";
			del.className='delectBtn';
			del.id=file.id +
		 'deleteGif'; 
			del.innerHTML='<a href="javascript:swfu.cancelUpload(\'' + file.id + '\')"><img src="common/images/_del-x.gif"  width="13" height="13" border="0" /></a>';
		showInfo(file, listingfiles.rows.length);

	} catch (ex) {
		alert(ex);
	}

}

function fileQueueError(file, errorCode, message) {
	try {
		//alert("fileQueueError");
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("一次性上传文件数太多.\n" + (message == 0 ? "已经达到文件数上传上限." : "您还可以选择 " + (message > 1 ? "上传 " + message + " 个文件." : "一个文件.")));
			return;
		}

		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setError();
		//progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			//progress.setStatus("File is too big.");
			alert("上传错误: 上传文件太大, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			//progress.setStatus("Cannot upload Zero Byte files.");
			alert("上传错误: 存在0字节文件, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			//progress.setStatus("Invalid File Type.");
			alert("上传错误: 无效文件类型, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			alert("上传错误：上传总文件数超过队列限制.  " +  (message > 1 ? "只能再添加 " +  message + " 个文件" : "上传队列已满，无法继续添加."));
			break;
		default:
			if (file !== null) {
				progress.setStatus("Unhandled Error");
			}
			alert("上传错误: 错误代码：" + errorCode + ", 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}
/**
	�@ʾ��Ϣ
**/
function showInfo(file,queuelength){
	var fileCount = document.getElementById("fileCount");
	fileCount.innerText=queuelength;
	var fileTotleSize = document.getElementById("fileTotleSize");
	fileTotleSize.innerText = getNiceFileSize(totalSize);
}
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		//alert("fileDialogComplete");
		//alert(numFilesSelected);
		//alert(numFilesQueued);
		if (this.getStats().files_queued > 0) {
			//document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		
		/* I want auto start and I can do that here */
		//this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		//alert("uploadStart");
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setStatus("Uploading...");
		//progress.toggleCancel(true, this);
	}
	catch (ex) {
	}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {

	try {
		//alert("uploadProgress");
		//var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = document.getElementById(file.id + "progress");	
		var percent = Math.ceil((bytesLoaded / file.size) * 100)
		progress.style.backgroundPositionX=(percent-100)+'px';
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		//alert("uploadSuccess");
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setComplete();
		//progress.setStatus("Complete.");
		//progress.toggleCancel(false);
		var listingfiles = document.getElementById("fileList");	
		//alert(file.id);
			var tR = document.getElementById(file.id);
			//alert(tr.innerHTML)
		tR.className += " fileUploading";
		tR.cells(0).className='flag1';
	
		//var progress = document.getElementById(file.id + "progress");	
		//progress.style.backgroundPositionX='0px';
		//cancelImage;
		var deleteImg = document .getElementById(file.id + 'deleteGif'); 
  		deleteImg.innerHTML = "";	

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		//alert("hello");
		//alert("uploadComplete");
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued === 0) {
			alert("上传完毕");
			//调用图片导入页面刷新方法
			refresh();
		} else {	
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}

}

function uploadError(file, errorCode, message) {
	try {
		//alert("uploadError,errorCode:"+errorCode);
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setError();
		//progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			//progress.setStatus("Upload Error: " + message);
			alert("上传错误: HTTP 错误, 文件名: " + file.name + ", 错误信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
			//progress.setStatus("Configuration Error");
			alert("上传错误: 无效上传地址, 文件名: " + file.name + ", 错误信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			//progress.setStatus("Upload Failed.");alertdebug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			//progress.setStatus("Server (IO) Error");
			alert("上传错误: 发生IO错误, 文件名: " + file.name + ", 错误信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			//progress.setStatus("Security Error");
			alert("上传错误: 发生安全性错误, 文件名: " + file.name + ", 错误信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			//progress.setStatus("Upload limit exceeded.");
			alert("上传错误: 超过上传文件数限制, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
			//progress.setStatus("File not found.");
			alert("上传错误: 找不到对应文件, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			//progress.setStatus("Failed Validation.  Upload skipped.");
			alert("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
		/*
			if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("Cancelled");
			progress.setCancelled();
		*/
		uploadFileCancelled(file);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			//progress.setStatus("Stopped");
			break;
		default:
			//progress.setStatus("Unhandled Error: " + error_code);
			alert("上传错误: 错误代码：" + errorCode + ", 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
    
}
function uploadFileComplete(file) {
	var tR = document.getElementById(file.id);
	tR.className += " fileUploading";
	tR.cells(0).className='flag1';
	
	//var progress = document.getElementById(file.id + "progress");	
	//progress.style.backgroundPositionX='0px';
	//cancelImage;
	var deleteImg = document .getElementById(file.id + 'deleteGif')
 ; 
  deleteImg.innerHTML = "";	
}
/**
	ĳ���ς��ļ���ȡ��
**/
function uploadFileCancelled(file) {   
	var listingfiles = document.getElementById("fileList");
	
	var rows = listingfiles.rows;
	for(var i=rows.length-1;i>=0;i--){
		if(file.id==rows[i].id){
			listingfiles.deleteRow(i);
			//�۳�Filesize 
			totalSize = totalSize -file.size;
			break;
		}
	}	
	showInfo(file, listingfiles.rows.length);
}

/**
��������ς�n��
**/
function cancelQueue() {
	
	isCancelAll  = true; 
	totalSize = 0;	
	clearhQueue();
}
/**
	̎��UI���h�����������
**/
function  clearhQueue(){
	var listingfiles = document.getElementById("fileList");
	var rowLength = listingfiles.rows.length;
	while(rowLength>0){
		swfu.cancelUpload();	
		listingfiles.deleteRow(0);
		rowLength--;
	}
	var fileCount = document.getElementById("fileCount");
	fileCount.innerText=0;
	var fileTotleSize = document.getElementById("fileTotleSize");
	fileTotleSize.innerText = getNiceFileSize(totalSize);

}

var _K = 1024;
var _M = _K*1024;
function getNiceFileSize(bitnum){
	if(bitnum<_M){
		if(bitnum<_K){
			return bitnum+'B';
		}else{
			return Math.ceil(bitnum/_K)+'K';
		}
		
	}else{
		return Math.ceil(100*bitnum/_M)/100+'M';
	}
	
}