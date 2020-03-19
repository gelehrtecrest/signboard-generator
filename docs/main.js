(function($){
	//画像関連
	var img;
	var img_icon;
	var img2;
	var img_text_1;
	var img_text_2;
	var img_text_3;
	var stage;

	//画像ロード
	function loadImage (imageData, logoImageData, iconImageData){
		//吹き出し画像のロード
		//ローカル
		var baseImg = new Image();
		baseImg.src = $('#logourl').val()
		img = new createjs.Bitmap(baseImg);

		//吹き出し画像のロード
		//ローカル
		if($('input[name=icon]:checked').val() === 'local' || $('input[name=icon]:checked').val() === 'local_white'){
			if(iconImageData !== null) {
				var baseImg = new Image();
				var canvas = document.getElementById('canvas_icon');
				baseImg.src = canvas.toDataURL();
				img_icon = new createjs.Bitmap(baseImg);
			} else {
				img_icon = null;
			}
		} else if($('input[name=logo]:checked').val() === 'url'){ // URL
			var baseImg = new Image();
			baseImg.src = $('#iconurl').val()
			img_icon = new createjs.Bitmap(baseImg);
		}


		//画像が選択されている時のみ合成
		if(imageData !== null) {
			var baseImg2 = new Image();
			baseImg2.src = imageData;
			img2 = new createjs.Bitmap(baseImg2);
			$('#result').attr({
				'width': baseImg2.width,
				'height': baseImg2.height
			});
		}

		stage = new createjs.Stage('result');
	}

	//ロゴを合成する処理
	function genImage (imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3){
		$('#alert').text('合成作業開始です ステップ 1');
		//合成画像の設定
		//回転
		img.rotation = imageIni.rotation;
		//回転の中心は、画像の中央
		img.regX = img.getBounds().width / 2;
		img.regY = img.getBounds().height / 2;
		$('#alert').text('合成作業開始です ステップ 2');
	
		//上下は10ピクセルごと移動
		// 中央点からの補正
		//拡縮に二乗で補正。縮小するときに一気に縮小しないように
		var scale = 1 + imageIni.Scale / 50;
		if(scale > 0 || scale <= 1){
			scale = scale * scale;
		} else if(scale <= 0){
			scale = 0;
		}
		img.x = imageIni.xPos * 10 + img.getBounds().width / 2 * scale;
		img.y = imageIni.yPos * 10 + img.getBounds().height / 2 * scale;
		$('#alert').text('合成作業開始です ステップ 3');

		console.log(img.scaleX);
		img.scaleX = img.scaleX * scale;
		img.scaleY = img.scaleY * scale;
		$('#alert').text('合成作業開始です ステップ 4');

		//透明化
		img.alpha = imageIni.alpha;	
		$('#alert').text('合成作業開始です ステップ 5');

		// 文字1合成
		var content = $('#text_1').val();
		img_text_1 = new createjs.Text(content);
		img_text_1.color = $('#color_1').val();
		img_text_1.font = $('#style_1').val() + ' ' + $('#px_1').val() + $('#font_1').val();

		//合成画像の設定
		//上下は10ピクセルごと移動
		img_text_1.x = imageIni_1.xPos * 10;
		img_text_1.y = imageIni_1.yPos * 10;
		//拡縮は10％ずつ
		img_text_1.scaleX = img_text_1.scaleX * (1 + imageIni_1.Scale / 10);
		img_text_1.scaleY = img_text_1.scaleY * (1 + imageIni_1.Scale / 10);

		// 文字2合成
		var content = $('#text_2').val();
		img_text_2 = new createjs.Text(content);
		img_text_2.color = $('#color_2').val();
		img_text_2.font = $('#style_2').val() + ' ' + $('#px_2').val() + $('#font_2').val();

		//合成画像の設定
		//上下は10ピクセルごと移動
		img_text_2.x = imageIni_2.xPos * 10;
		img_text_2.y = imageIni_2.yPos * 10;
		//拡縮は10％ずつ
		img_text_2.scaleX = img_text_2.scaleX * (1 + imageIni_2.Scale / 10);
		img_text_2.scaleY = img_text_2.scaleY * (1 + imageIni_2.Scale / 10);

		// 文字3合成
		var content = $('#text_3').val();
		img_text_3 = new createjs.Text(content);
		img_text_3.color = $('#color_3').val();
		img_text_3.font = $('#style_3').val() + ' ' + $('#px_3').val() + $('#font_3').val();

		//合成画像の設定
		//上下は10ピクセルごと移動
		img_text_3.x = imageIni_3.xPos * 10;
		img_text_3.y = imageIni_3.yPos * 10;
		//拡縮は10％ずつ
		img_text_3.scaleX = img_text_3.scaleX * (1 + imageIni_3.Scale / 10);
		img_text_3.scaleY = img_text_3.scaleY * (1 + imageIni_3.Scale / 10);

		//ステージ生成
		stage.addChild(img2);
		stage.addChild(img);
		if(img_icon != null && img_icon.getBounds() != null){
			stage.addChild(img_icon);
		}
		stage.addChild(img_text_1);
		stage.addChild(img_text_2);
		stage.addChild(img_text_3);

		//ステージ反映
		stage.update();
	}

	$(function(){
		//設定のデフォルト値
		$('#logourl').val('https://gelehrtecrest.github.io/signboard-generator/signboard.png');
		loadlogocanvas('https://gelehrtecrest.github.io/signboard-generator/signboard.png', false);
	
		//吹き出しURL変更時の処理
		$(document).on('input', '#logourl', function() {
			$.ajax({
				url: $('#logourl').val()
			}).done(function(data){
				var baseImg = new Image();
				baseImg.src = $('#logourl').val();
				img = new createjs.Bitmap(baseImg);
				$('#alert').text('');
				//URL再生成
				write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				loadlogocanvas($('#logourl').val(), false);
			}).fail(function(data){
				$('#alert').text('吹き出し画像のURLが間違っています。ヒント：httpsから始まるURLにしてください。');
			});
		});

		//読込吹き出し画像のオブジェクト
		var imageIni = {
			xPos : 68,
			yPos : 27,
			Scale : -14,
			rotation : 0,
			alpha : 1.0,
			imageData : null,
			logoImageData : null,
			iconImageData : null,
			resetImage : function(){
				this.xPos = 68;
				this.yPos = 27;
				this.Scale = -14;
				this.rotation = 0;
			},
			makeImage : function(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData, this.iconImageData);
					genImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};

		//アイコン設定のデフォルト値
		$('#iconurl').val('');
		//loadlogocanvas('', false);
	
		//アイコンURL変更時の処理
		$(document).on('input', '#iconurl', function() {
			$.ajax({
				url: $('#iconurl').val()
			}).done(function(data){
				var baseImg = new Image();
				baseImg.src = $('#iconurl').val();
				img_icon = new createjs.Bitmap(baseImg);
				$('#alert').text('');
				//URL再生成
				write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				loadiconcanvas($('#iconurl').val(), false);
			}).fail(function(data){
				//$('#alert').text('アイコンのURLが間違っています。ヒント：httpsから始まるURLにしてください。');
			});
		});

		//読込アイコン画像のオブジェクト
		var imageIni_icon = {
			xPos : 6,
			yPos : 8,
			Scale : -7.5,
			rotation : 0,
			alpha : 1.0,
			imageData : null,
			logoImageData : null,
			iconImageData : null,
			resetImage : function(){
				this.xPos = 2;
				this.yPos = 2;
				this.Scale = -1;
				this.rotation = 0;
			},
			makeImage : function(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData, this.iconImageData);
					genImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};



		//設定のデフォルト値
		$('#text_1').val('罪状');
		$('#color_1').val('white');
		$('#style_1').val('');
		$('#font_1').val('/1.5 Meiryo,sans-serif');
		$('#px_1').val('40px');

		//読込画像のオブジェクト
		var imageIni_1 = {
			xPos : 105,
			yPos : 56,
			Scale : 8,
			imageData : null,
			logoImageData : null,
			iconImageData : null,
			resetImage : function(){
				this.xPos = 8;
				this.yPos = 8;
				this.Scale = 8;
			},
			makeImage : function(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData, this.iconImageData);
					genImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};

		//設定のデフォルト値
		$('#text_2').val('私が無敵アクションを失敗して');
		$('#color_2').val('white');
		$('#style_2').val('');
		$('#font_2').val('/1.5 Meiryo,sans-serif');
		$('#px_2').val('32px');

		//読込画像のオブジェクト
		var imageIni_2 = {
			xPos : 77,
			yPos : 68,
			Scale : 4,
			imageData : null,
			logoImageData : null,
			iconImageData : null,
			resetImage : function(){
				this.xPos = 8;
				this.yPos = 20;
				this.Scale = 8;
			},
			makeImage : function(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData, this.iconImageData);
					genImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};

		//設定のデフォルト値
		$('#text_3').val('PTメンバーを殺してしまいました。');
		$('#color_3').val('white');
		$('#style_3').val('');
		$('#font_3').val('/1.5 Meiryo,sans-serif');
		$('#px_3').val('32px');

		//読込画像のオブジェクト
		var imageIni_3 = {
			xPos : 77,
			yPos : 76,
			Scale : 4,
			imageData : null,
			logoImageData : null,
			iconImageData : null,
			resetImage : function(){
				this.xPos = 8;
				this.yPos = 28;
				this.Scale = 8;
			},
			makeImage : function(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData, this.iconImageData);
					genImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};


		//get情報
		var url = location.href;
		var parameters = url.split('?');
		var queries = (parameters[1] || 'dummy=dummy').split('&');
		i = 0;

		for(i; i < queries.length; i ++) {
			var t = queries[i].split('=');
			if(t['0'] == 'logourl'){
				$('#logourl').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos'){
				imageIni.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos'){
				imageIni.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale'){
				imageIni.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'rotation'){
				imageIni.rotation = parseFloat(t['1']);
			} else if(t['0'] == 'alpha'){
				imageIni.alpha = parseFloat(t['1']);
			} else if(t['0'] == 'logo'){
				if(t['1'] == 'local'){
					$('input[name=logo]').val(['local']);
				} else if(t['1'] == 'local_white'){
					$('input[name=logo]').val(['local_white']);
				}
			} else if(t['0'] == 'iconurl'){
				$('#iconurl').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos_icon'){
				imageIni_icon.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_icon'){
				imageIni_icon.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_icon'){
				imageIni_icon.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'rotation_icon'){
				imageIni_icon.rotation = parseFloat(t['1']);
			} else if(t['0'] == 'alpha_icon'){
				imageIni_icon.alpha = parseFloat(t['1']);
			} else if(t['0'] == 'icon'){
				if(t['1'] == 'local'){
					$('input[name=icon]').val(['local']);
				} else if(t['1'] == 'local_white'){
					$('input[name=icon]').val(['local_white']);
				}
			} else if(t['0'] == 'xpos_1'){
				imageIni_1.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_1'){
				imageIni_1.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_1'){
				imageIni_1.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'text_1'){
				$('#text_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'color_1'){
				$('#color_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'style_1'){
				$('#style_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'font_1'){
				$('#font_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'px_1'){
				$('#px_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos_2'){
				imageIni_2.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_2'){
				imageIni_2.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_2'){
				imageIni_2.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'text_2'){
				$('#text_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'color_2'){
				$('#color_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'style_2'){
				$('#style_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'font_2'){
				$('#font_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'px_2'){
				$('#px_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos_3'){
				imageIni_3.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_3'){
				imageIni_3.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_3'){
				imageIni_3.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'text_3'){
				$('#text_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'color_3'){
				$('#color_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'style_3'){
				$('#style_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'font_3'){
				$('#font_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'px_3'){
				$('#px_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'movesync'){
				if(t['1'] == 'movesync'){
					$('input[name=movesync]').attr('checked', true);
				} else {
					$('input[name=movesync]').attr('checked', false);
				}
			} else if(t['0'] == 'title'){
				$('title').text(decodeURIComponent(t['1']));
				$('h1').text(decodeURIComponent(t['1']));
			} else if(t['0'] == 'comment'){
				$('#comment').text(decodeURIComponent(t['1']));
			}
		}

		//イベント関連処理
		//画像読込
		$('#getfile').change(function (){
			//読み込み
			var fileList =$('#getfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);

			//読み込み後
			$(reader).on('load',function(){
				$('#preview').prop('src',reader.result);
				imageIni.imageData = reader.result;
			});
		});

		//ロゴ画像読込
		$('#logogetfile').change(function (){
			//読み込み
			var fileList =$('#logogetfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.logoImageData = reader.result;
				loadlogocanvas(reader.result, false);
			});
		});

		//ロゴ画像読込(白抜き)
		$('#logogetfilealpha').change(function (){
			//読み込み
			var fileList =$('#logogetfilealpha').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.logoImageData = reader.result;
				loadlogocanvas(reader.result, true);
			});
		});

		//アイコン画像読込
		$('#icongetfile').change(function (){
			//読み込み
			var fileList =$('#icongetfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.iconImageData = reader.result;
				loadiconcanvas(reader.result, false);
			});
		});

		//アイコン画像読込(白抜き)
		$('#icongetfilealpha').change(function (){
			//読み込み
			var fileList =$('#icongetfilealpha').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.iconImageData = reader.result;
				loadiconcanvas(reader.result, true);
			});
		});


		function loadlogocanvas(url, flag){
			var image = new Image();
			image.onload = function() {
				$('#canvas').attr({
					'width': image.width,
					'height': image.height
				});
				var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
 				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
				var data = imageData.data;
				for (var i = 0; i < data.length; i += 4) {
					//各カラーチャンネルで、一番暗い値を取得
					var minLuminance = 255;
					if(data[i] < minLuminance)
						minLuminance = data[i];
					if(data[i + 1] < minLuminance)
						minLuminance = data[i + 1];
					if(data[i + 2] < minLuminance)
						minLuminance = data[i + 2];

					if(flag){
						//一番暗い値を、アルファチャンネルに反映(明るいところほど透明に)
						data[i + 3] = 255 - minLuminance;
					}
				}
				context.putImageData(imageData, 0, 0);
			};
			image.src = url;
		}

		function loadiconcanvas(url, flag){
			var image = new Image();
			image.onload = function() {
				$('#canvas_icon').attr({
					'width': image.width,
					'height': image.height
				});
				var canvas = document.getElementById('canvas_icon');
				var context = canvas.getContext('2d');
 				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
				var data = imageData.data;
				for (var i = 0; i < data.length; i += 4) {
					//各カラーチャンネルで、一番暗い値を取得
					var minLuminance = 255;
					if(data[i] < minLuminance)
						minLuminance = data[i];
					if(data[i + 1] < minLuminance)
						minLuminance = data[i + 1];
					if(data[i + 2] < minLuminance)
						minLuminance = data[i + 2];

					if(flag){
						//一番暗い値を、アルファチャンネルに反映(明るいところほど透明に)
						data[i + 3] = 255 - minLuminance;
					}
				}
				context.putImageData(imageData, 0, 0);
			};
			image.src = url;
		}



		//ボタンイベントまとめ
		/*
		$('.btn').on('click',function(e){
			console.log(e.target.id);
			if (e.target.id === 'update'){
			}else if (e.target.id === 'up'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1);
				} else {
					imageIni.yPos -= 1;
				}
			}else if (e.target.id === 'down'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1);
				} else {
					imageIni.yPos += 1;
				}
			}else if (e.target.id === 'left'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1);
				} else {
					imageIni.xPos -= 1;
				}
			}else if (e.target.id === 'right') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1);
				} else {
					imageIni.xPos += 1;
				}
			}else if (e.target.id === 'zoomin') {
				console.log("zome");
				console.log(imageIni.Scale);
				imageIni.Scale += 1;
			}else if (e.target.id === 'zoomout') {
				imageIni.Scale -= 1;
			}else if (e.target.id === 'rotation_r') {
				imageIni.rotation += 7.5;
			}else if (e.target.id === 'rotation_l') {
				imageIni.rotation -= 7.5;
			}else if (e.target.id === 'alpha_up') {
				imageIni.alpha += 0.1;
				if(imageIni.alpha >= 0.9){
					imageIni.alpha = 1.0;
					$('#alpha_up').prop("disabled", true);
				}
				$('#alpha_down').prop("disabled", false);
			}else if (e.target.id === 'alpha_down') {
				imageIni.alpha -= 0.1;
				if(imageIni.alpha <= 0.1){
					imageIni.alpha = 0.0;
					$('#alpha_down').prop("disabled", true);
				}
				$('#alpha_up').prop("disabled", false);
			}else if (e.target.id === 'reset'){
				imageIni.resetImage();
			}else if (e.target.id === 'up_icon'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1);
				} else {
					imageIni_icon.yPos -= 1;
				}
			}else if (e.target.id === 'down_icon'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1);
				} else {
					imageIni_icon.yPos += 1;
				}
			}else if (e.target.id === 'left_icon'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1);
				} else {
					imageIni_icon.xPos -= 1;
				}
			}else if (e.target.id === 'right_icon') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1);
				} else {
					imageIni_icon.xPos += 1;
				}
			}else if (e.target.id === 'zoomin_icon') {
				imageIni_icon.Scale += 0.25;
			}else if (e.target.id === 'zoomout_icon') {
				imageIni_icon.Scale -= 0.25;
			}else if (e.target.id === 'rotation_r_icon') {
				imageIni_icon.rotation += 7.5;
			}else if (e.target.id === 'rotation_l_icon') {
				imageIni_icon.rotation -= 7.5;
			}else if (e.target.id === 'alpha_up_icon') {
				imageIni_icon.alpha += 0.1;
				if(imageIni_icon.alpha >= 0.9){
					imageIni_icon.alpha = 1.0;
					$('#alpha_up_icon').prop("disabled", true);
				}
				$('#alpha_down_icon').prop("disabled", false);
			}else if (e.target.id === 'alpha_down_icon') {
				imageIni_icon.alpha -= 0.1;
				if(imageIni_icon.alpha <= 0.1){
					imageIni_icon.alpha = 0.0;
					$('#alpha_down_icon').prop("disabled", true);
				}
				$('#alpha_up_icon').prop("disabled", false);
			}else if (e.target.id === 'reset_icon'){
				imageIni_icon.resetImage();
			}else if (e.target.id === 'up_1'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1);
				} else {
					imageIni_1.yPos -= 1;
				}
			}else if (e.target.id === 'down_1'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1);
				} else {
					imageIni_1.yPos += 1;
				}
			}else if (e.target.id === 'left_1'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1);
				} else {
					imageIni_1.xPos -= 1;
				}
			}else if (e.target.id === 'right_1') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1);
				} else {
					imageIni_1.xPos += 1;
				}
			}else if (e.target.id === 'zoomin_1') {
				imageIni_1.Scale += 1;
			}else if (e.target.id === 'zoomout_1') {
				imageIni_1.Scale -= 1;
			}else if (e.target.id === 'reset_1'){
				imageIni_1.resetImage();
			}else if (e.target.id === 'up_2'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1);
				} else {
					imageIni_2.yPos -= 1;
				}
			}else if (e.target.id === 'down_2'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1);
				} else {
					imageIni_2.yPos += 1;
				}
			}else if (e.target.id === 'left_2'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1);
				} else {
					imageIni_2.xPos -= 1;
				}
			}else if (e.target.id === 'right_2') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1);
				} else {
					imageIni_2.xPos += 1;
				}
			}else if (e.target.id === 'zoomin_2') {
				imageIni_2.Scale += 1;
			}else if (e.target.id === 'zoomout_2') {
				imageIni_2.Scale -= 1;
			}else if (e.target.id === 'reset_2'){
				imageIni_2.resetImage();
			}else if (e.target.id === 'up_3'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1);
				} else {
					imageIni_3.yPos -= 1;
				}
			}else if (e.target.id === 'down_3'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1);
				} else {
					imageIni_3.yPos += 1;
				}
			}else if (e.target.id === 'left_3'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1);
				} else {
					imageIni_3.xPos -= 1;
				}
			}else if (e.target.id === 'right_3') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1);
				} else {
					imageIni_3.xPos += 1;
				}
			}else if (e.target.id === 'zoomin_3') {
				imageIni_3.Scale += 1;
			}else if (e.target.id === 'zoomout_3') {
				imageIni_3.Scale -= 1;
			}else if (e.target.id === 'reset_3'){
				imageIni_3.resetImage();
			}else if (e.target.id === 'dl'){
				return;
			}

			//画像操作時は再描画を行う
			if(imageIni.imageData !== null){
				imageIni.makeImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
			}else{
				$('#alert').text('スクリーンショットを入力してから画像生成を行ってください');
			}

			//画面操作時はURLを再生成する
			write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
		});
		*/
		//ボタンイベントまとめ
		var editgenerator_button = "";
		var flag = 0;
		// 加速機能
		const boost_limit = 5;
		const boost_value = 3;
		const boost_not_value = 1;
		var boost_count = 0;
		const boost_id_default = "boost";
		var boost_id = boost_id_default;
		function is_longpress(id){
			if(boost_id == id || pushing_flag == 0){
				return true;
			}
			boost_id = id;
			return false;
		}
		function boost(id){
			if(boost_id === id){
				boost_count += 1;
			} else {
				boost_count = 0;
				boost_id = id;
			}
			if(boost_count >= boost_limit){
				return boost_value;
			}
			return boost_not_value;
		}
		function editgenerator(id){
			if(flag == 0){
				flag = 1;
				return;
			} else {
				flag = 0;
			}
			if (id === 'update'){
			}else if (id === 'up'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1*boost(id));
				} else {
					imageIni.yPos -= 1*boost(id);
				}
			}else if (id === 'down'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1*boost(id));
				} else {
					imageIni.yPos += 1*boost(id);
				}
			}else if (id === 'left'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1*boost(id));
				} else {
					imageIni.xPos -= 1*boost(id);
				}
			}else if (id === 'right') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1*boost(id));
				} else {
					imageIni.xPos += 1*boost(id);
				}
			}else if (id === 'zoomin') {
				imageIni.Scale += 1*boost(id);
			}else if (id === 'zoomout') {
				imageIni.Scale -= 1*boost(id);
			}else if (id === 'up_1'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1*boost(id));
				} else {
					imageIni_1.yPos -= 1*boost(id);
				}
			}else if (id === 'down_1'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1*boost(id));
				} else {
					imageIni_1.yPos += 1*boost(id);
				}
			}else if (id === 'left_1'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1*boost(id));
				} else {
					imageIni_1.xPos -= 1*boost(id);
				}
			}else if (id === 'right_1') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1*boost(id));
				} else {
					imageIni_1.xPos += 1*boost(id);
				}
			}else if (id === 'zoomin_1') {
				imageIni_1.Scale += 1*boost(id);
			}else if (id === 'zoomout_1') {
				imageIni_1.Scale -= 1*boost(id);
			}else if (id === 'up_2'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1*boost(id));
				} else {
					imageIni_2.yPos -= 1*boost(id);
				}
			}else if (id === 'down_2'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1*boost(id));
				} else {
					imageIni_2.yPos += 1*boost(id);
				}
			}else if (id === 'left_2'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1*boost(id));
				} else {
					imageIni_2.xPos -= 1*boost(id);
				}
			}else if (id === 'right_2') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1*boost(id));
				} else {
					imageIni_2.xPos += 1*boost(id);
				}
			}else if (id === 'zoomin_2') {
				imageIni_2.Scale += 1*boost(id);
			}else if (id === 'zoomout_2') {
				imageIni_2.Scale -= 1*boost(id);
			}else if (id === 'up_3'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(-1*boost(id));
				} else {
					imageIni_3.yPos -= 1*boost(id);
				}
			}else if (id === 'down_3'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_y(1*boost(id));
				} else {
					imageIni_3.yPos += 1*boost(id);
				}
			}else if (id === 'left_3'){
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(-1*boost(id));
				} else {
					imageIni_3.xPos -= 1*boost(id);
				}
			}else if (id === 'right_3') {
				if($('input[name=movesync]:checked').val() === '1'){
					movesync_x(1*boost(id));
				} else {
					imageIni_3.xPos += 1*boost(id);
				}
			}else if (id === 'zoomin_3') {
				imageIni_3.Scale += 1*boost(id);
			}else if (id === 'zoomout_3') {
				imageIni_3.Scale -= 1*boost(id);
			}else if (id === 'dl'){
				return;
			}
			
			//画像操作時は再描画を行う
			if(imageIni.imageData !== null){
				alertmeg('合成作業開始中です。');
				imageIni.makeImage(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
				alertmeg('合成完了です！');
			}else{
				alertmeg('スクリーンショットを入力してから画像生成を行ってください');
			}

			//画面操作時はURLを再生成する
			write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
		}
		//$('.btn').on('click', function(e){
		//	editgenerator_button = e.target.id;
		//	editgenerator(editgenerator_button);
		//});

		var pushing_flag = 0;
		var mouse_push_hold = function(){
			editgenerator(editgenerator_button);
			if( pushing_flag == 1 ){
				setTimeout(mouse_push_hold, 100);
			}
		};

		// PC用
		$(".editgenerator").mousedown(function(e){
			editgenerator_button = e.target.id;
			pushing_flag = 1;
			setTimeout(mouse_push_hold, 1);
			return false;
		}).mouseup(function(){
			pushing_flag = 0;
			clearTimeout(mouse_push_hold);
			boost(boost_id_default);
		}).mouseleave(function(){
			pushing_flag = 0;
			clearTimeout(mouse_push_hold);
			boost(boost_id_default);
		}).mouseover(function(){
			pushing_flag = 0;
			clearTimeout(mouse_push_hold);
		});

		//スマホ用
		$(".editgenerator").bind('touchstart', function(e){
			editgenerator_button = e.target.id;
			pushing_flag = 1;
			setTimeout(mouse_push_hold, 1);
			return false;
		});
		$(".editgenerator").bind('touchend', function(e){
			pushing_flag = 0;
			boost(boost_id_default);
			return false;
		});

		/*
		$('input').click(function() {
			//チェックボックス操作時は再描画を行う
			if(imageIni.imageData !== null){
				imageIni.makeImage(imageIni, imageIni_1);
			}else{
				$('#alert').text('スクリーンショットを入力してから画像生成を行ってください');
			}

			//チェックボックス操作時はURLを再生成する
			write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
		});
		*/

		//初回URL生成
		write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
	
		// 吹き出し・文字同時動かし
		function movesync_x(move){
			imageIni.xPos += move;
			imageIni_icon.xPos += move;
			imageIni_1.xPos += move;
			imageIni_2.xPos += move;
			imageIni_3.xPos += move;
			console.log(imageIni.Scale);
		}
		function movesync_y(move){
			imageIni.yPos += move;
			imageIni_icon.yPos += move;
			imageIni_1.yPos += move;
			imageIni_2.yPos += move;
			imageIni_3.yPos += move;
		}

		// windows用ダウンロードボタン
		$('#download_for_win').on('click',function(e){
			var result = document.querySelector('#result');
			/*
			if (result.toBlob) {
				result.toBlob(function (blob) {
 					window.navigator.msSaveBlob(blob, 'ss.png');
				});
			} else */ 
			if (canvas.msToBlob) {
				blob = result.msToBlob();
				window.navigator.msSaveBlob(blob, 'ss.png');
			} else {
				alert('申し訳ありません。生成結果を右クリックしてダウンロードしてください。')
			}
		});

		//Canvas Download
		$('#btnDownload').on("click", function() {
			alertmeg('ダウンロード ボタンクリック');
			//if($('input[name=logo]:checked').val() === 'local'){
				DownloadStart();
			//} else if($('input[name=logo]:checked').val() === 'local_white'){
			//	DownloadStart();
			//} else {
			//	alert('ロゴがURL指定のため、ダウンロードボタンは使用できません。')
			//}
			alertmeg('ダウンロード処理終了');
		});
		$('#btnNewWindow').on("click", function() {
			NewWindow();
		});
	});

	//画像先読み込み
	$(window).on('load',function(){
		//画像のロード
		var baseImg = new Image();
		baseImg.src = $('#logourl').val();
		img = new createjs.Bitmap(baseImg);

		loadImage(null, null);
	});

	

	// URL生成
	function geturl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3) {
		var url;
		var baseurl = location.href.split('?')[0];
		url = baseurl;

		//設定をgetに追加
		//text
		url = url + '?text_1=' + encodeURIComponent($('#text_1').val());
		url = url + '&color_1=' + encodeURIComponent($('#color_1').val());
		url = url + '&px_1=' + encodeURIComponent($('#px_1').val());
		url = url + '&style_1=' + encodeURIComponent($('#style_1').val());
		url = url + '&font_1=' + encodeURIComponent($('#font_1').val());
		url = url + '&xpos_1=' + imageIni_1.xPos;
		url = url + '&ypos_1=' + imageIni_1.yPos;
		url = url + '&scale_1=' + imageIni_1.Scale;

		//text
		url = url + '&text_2=' + encodeURIComponent($('#text_2').val());
		url = url + '&color_2=' + encodeURIComponent($('#color_2').val());
		url = url + '&px_2=' + encodeURIComponent($('#px_2').val());
		url = url + '&style_2=' + encodeURIComponent($('#style_2').val());
		url = url + '&font_2=' + encodeURIComponent($('#font_2').val());
		url = url + '&xpos_2=' + imageIni_2.xPos;
		url = url + '&ypos_2=' + imageIni_2.yPos;
		url = url + '&scale_2=' + imageIni_2.Scale;

		//text
		url = url + '&text_3=' + encodeURIComponent($('#text_3').val());
		url = url + '&color_3=' + encodeURIComponent($('#color_3').val());
		url = url + '&px_3=' + encodeURIComponent($('#px_3').val());
		url = url + '&style_3=' + encodeURIComponent($('#style_3').val());
		url = url + '&font_3=' + encodeURIComponent($('#font_3').val());
		url = url + '&xpos_3=' + imageIni_3.xPos;
		url = url + '&ypos_3=' + imageIni_3.yPos;
		url = url + '&scale_3=' + imageIni_3.Scale;

		//ロゴURL
		url = url + '&logourl=' + encodeURIComponent($('#logourl').val());
		//ロゴ位置・サイズ
		url = url + '&xpos=' + imageIni.xPos;
		url = url + '&ypos=' + imageIni.yPos;
		url = url + '&scale=' + imageIni.Scale;
		//ロゴ回転
		url = url + '&rotation=' + imageIni.rotation;
		//ロゴ透過
		url = url + '&alpha=' + imageIni.alpha;
		//ロゴ読み出し場所
		if($('input[name=logo]:checked').val() === 'local'){
			url = url + '&logo=local';
		} else if($('input[name=logo]:checked').val() === 'local_white'){
			url = url + '&logo=local_white';
		}

		//アイコンURL
		url = url + '&iconurl=' + encodeURIComponent($('#iconurl').val());
		//アイコン位置・サイズ
		url = url + '&xpos_icon=' + imageIni_icon.xPos;
		url = url + '&ypos_icon=' + imageIni_icon.yPos;
		url = url + '&scale_icon=' + imageIni_icon.Scale;
		//アイコン回転
		url = url + '&rotation_icon=' + imageIni_icon.rotation;
		//アイコン透過
		url = url + '&alpha_icon=' + imageIni_icon.alpha;
		//アイコン読み出し場所
		if($('input[name=icon]:checked').val() === 'local'){
			url = url + '&icon=local';
		} else if($('input[name=icon]:checked').val() === 'local_white'){
			url = url + '&icon=local_white';
		}

		//ロゴ読み出し場所
		if($('input[name=movesync]:checked').val() === '1'){
			url = url + '&movesync=movesync';
		} else {
			url = url + '&movesync=movenosync';
		}

		//タイトル
		url = url + '&title=' + encodeURIComponent($('title').text());
		//コメント
		url = url + '&comment=' + encodeURIComponent($('#comment').text());
		return url;
	}

	// URL書き込み
	function write_settingurl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3) {
		var url = geturl(imageIni, imageIni_icon, imageIni_1, imageIni_2, imageIni_3);
		$('#settingurl a').text(url);
		$('#settingurl a').attr('href', url);
	}

})($);

function DownloadStart(){
	
	var cve = document.getElementById("result");
	if (cve.getContext) {
		// ダウンロード ファイル名
		var now = new Date();
		var year = now.getYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();

		var filename = 'download_' + year + month + day + hour + min + sec + '.png';

		var ctx = cve.getContext('2d');
		var base64;
		try {
			base64 = cve.toDataURL();
		}catch(e) {
			console.log(e);
			alert("ロゴが外部URLをしているため、ダウンロードボタンを使用できません。")
			return;
		}
		document.getElementById("newImg").src = base64;

		var blob = Base64toBlob(base64);
		const url = window.URL.createObjectURL(blob);
		document.getElementById("dlImg").href = url;
		document.getElementById("dlImg").download = filename;

		//  ダウンロード開始
		if (window.navigator.msSaveBlob) {
			// IE
			window.navigator.msSaveBlob(Base64toBlob(base64), filename);
		} else {
			// Chrome, Firefox, Edge
			document.getElementById("dlImg").click();
		}
		window.URL.revokeObjectURL(url);
	}
}

function Base64toBlob(base64)
{
	var tmp = base64.split(',');
	var data = atob(tmp[1]);
	var mime = tmp[0].split(':')[1].split(';')[0];
	var buf = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
		buf[i] = data.charCodeAt(i);
	}
	var blob = new Blob([buf], { type: mime });
	return blob;
}

function NewWindow(){
	
	var cve = document.getElementById("result");
	if (cve.getContext) {
		var dataUrl;
		try {
			dataUrl = cve.toDataURL();
		}catch(e) {
			alert("ロゴが外部URLをしているため、ダウンロードボタンを使用できません。")
			return;
		}
		var w = window.open('about:blank');
		w.document.write("<img src='" + dataUrl + "'/>");
	} else {
	}
}

function alertmeg(text){
	$("#alert").text(text);
	$("#alertB").text(text);
	$("#alertC").text(text);
}
