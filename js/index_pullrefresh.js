(function($) {
		//设置中首页导航视口高度
		var pullrefresh = document.querySelectorAll('.indexcontent');
		for (var i=0; i < pullrefresh.length; i++) {
			pullrefresh[i].style.height = window.screen.height-134+'px';
		}
		
		//阻尼系数
		var deceleration = mui.os.ios?0.003:0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});
		$.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。
			$.each(document.querySelectorAll('.mui-slider-group .pullrefresh'), function(index, pullRefreshEl) {
				$(pullRefreshEl).pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								ul.insertBefore(createFragment(2,index), ul.firstChild);
								self.endPullDownToRefresh();
							}, 1000);
						}
					},
					up: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								ul.appendChild(createFragment(3,index));
								self.endPullUpToRefresh();
							}, 1000);
						}
					}
				});
			});
			var createFragment = function(count,index) {
//						var length = ul.querySelectorAll('li').length;
				var fragment = document.createDocumentFragment();
				var li;
				for (var i = 0; i < count; i++) {
					li = document.createElement('li');
					var str = 	'<div class="mui-col-xs-2 mui-col-sm-2 tj-userimg">';
					    str +=      '<img src="./images/users.png" alt="" class="tj-user-img"/>';
						str += 	'</div>';
						str += 	'<div class="mui-col-xs-10 mui-col-sm-10 tj-art">';
						str += 		'<h3 class="tj-art-tit">今日寄语'+index+'</h3>';
						str += 		'<p class="tj-art-p">人类把我们的水和徒弟都夺走了不久后就会夺走风，最后连身居住的地方都会占为己有。但作为交换，人类最终都是去灵魂。</p>';
						str += 		'<p class="tj-art-from">——From《<sapn>河童之夏</sapn>》</p>';
						str += 	'</div>';
						str += 	'<div class="mui-col-xs-12 mui-col-sm-12 tj-art-qs">';
						str += 		'<a href="" class="mui-icon mui-icon-chat art-ql"><span>趣聊吧</span></a>';
						str += 		'<a href="" class="mui-icon mui-icon-starhalf art-sc"><span>收藏</span></a>';
						str += 	'</div>';
					li.className = 'tjcontent';
					li.innerHTML = str;
					fragment.appendChild(li);
				}
				return fragment;
			};
		});
})(mui);