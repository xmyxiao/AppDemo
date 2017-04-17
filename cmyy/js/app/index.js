//初始化
mui.init({
	
});
sliderAutoMove();
//所有方法都放到这里
mui.plusReady(function(){
	
});
/*自动轮播
 */
function sliderAutoMove(){
	var gallery = mui('.mui-slider');//获取轮播对象
	gallery.slider({
	  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
	});
}
