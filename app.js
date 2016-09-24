

var pictures = [
	"Figure_r7ofYGSV0I57FeAbwr.jpg",
	"Figure_BKdCwDCl1I7LIMebwr.jpg",
	"Figure_4NlSjjsV5tX5Cngbwr.jpg",
	"Figure_VypU2mSXKIZ1Hvpbwr.jpg",
	"Figure_yX5IljiMnIkYFombwr.jpg",
	"Figure_mEVUOZcDAceVIW4bwr.jpg",
	"Figure_OY9FOOFknC4Wc1dbwr.jpg",
	"Figure_Vy0T2mSXKIZpFzObwr.jpg",
	"Figure_wYECyXigOCkVH55bwr.jpg",
	"Figure_zLetGmUbphXVu8Zbwr.jpg",
	"Figure_DvKSk3T7eSpjfdNbwr.jpg",
	"Figure_GAdSyOcrvHpWu1bbwr.jpg",
	"Figure_5VpCD2fRKtYMIO4bwr.jpg",
	"Figure_OYRfrDSkrc4nH1Wbwr.jpg",
	"Figure_WRRi8QTKbu3rcbabwr.jpg",
	"Figure_wYRFddsgZIkwt89bwr.jpg",
	"Figure_Yays0ph4yfe9Hd2bwr.jpg",
	"Figure_gGkCNNtZjfNec3wbwr.jpg",
	"Figure_zL9IGNtbkSXmfwpbwr.jpg",
	"Figure_3jmCWaCQ1sWZCnnbwr.jpg",
	"Figure_Xp1iGETajhmQUrVbwr.jpg",
	"Figure_4NLhWzhV1CX5CnGbwr.jpg",
	"Figure_Q9ZtdnhrDfjQFbgbwr.jpg",
	"Figure_bDYIynUNnFbbsMmbwr.jpg",
	"Figure_M31heDC3mHyXFZRbwr.jpg",
	"Figure_zLrTGmUb9cXlh8Zbwr.jpg",
	"Figure_nO7izXt5ksqnFwqbwr.jpg",
	"Figure_1VEFymtWGHpocRmbwr.jpg",
	"Figure_DvOIk0S7MCpLHdabwr.jpg",
	"Figure_87bSv1fEDt8BSqjbwr.jpg",
	"Figure_kqWc0NtEYTjYcp5bwr.jpg",
	"Figure_9vGf4psWWc0ASYQbwr.jpg",
	"Figure_ooAtNgHmbTnOcKnbwr.jpg",
	"Figure_ejzuKof7ZH1bCG5bwr.jpg",
	"Figure_pzRFaMhKYtDqtV2bwr.jpg",
	"Figure_aRgCk0IEMIYniQgbwr.jpg",
	"Figure_ZMku3VSBlTj7F4bbwr.jpg",
	"Figure_KYgFaYhD9S1WsLybwr.jpg",
	"Figure_zLyfG8cbWuX5C8Vbwr.jpg",
	"Figure_jYQIbKt1ZudlIrvbwr.jpg",
	"Figure_7Klc52HpOF2ocgRbwr.jpg",
	"Figure_847fveHEkty8uqXbwr.jpg",
	"Figure_lZ9cGQI2Df7wCBYbwr.jpg",
	"Figure_87LivyFEXF8giqbbwr.jpg",
	"Figure_Q97id8trwIjMtbRbwr.jpg",
	"Figure_ypZIQlhMpHkrIoBbwr.jpg",
	"Figure_d03clLUOKclYIR4bwr.jpg",
	"Figure_ypZIlEcMZckWioXbwr.jpg",
	"Figure_jYoubKt1vcdKtrmbwr.jpg",
	"Figure_LnjTXgFz5t9mI4Mbwr.jpg",
	"Figure_pzqha0twVU44hVBbwr.jpg",
	"Figure_ooaHNAcmRTndfKBbwr.jpg",
	"Figure_v1mTdGcgqi1rfmVbwr.jpg",
	"Figure_7Koh5Gip4I2jHgzbwr.jpg",
	"Figure_ooESNvUmMUnwCKbbwr.jpg",
]

/** Return view angle in Radian */
function getAngle(f) {
	return 2 * Math.atan(7.5 / f); 
}

/** Calculate the size ratio of the image for a different focal */
function ratio(f) {
	var alpha18 = getAngle(18); 
	var alpha = getAngle(f);
	return Math.tan(alpha) / Math.tan(alpha18)
}

function rectangle(ratio) {
	var originalSize = 1280.0;
	var newSize = ratio * originalSize;
	var x = (originalSize - newSize) / 2.0
	var y = x;
	var width = newSize;
	var height = width;
	return {
		x: parseInt(x),
		y: parseInt(y),
		width: parseInt(width),
		height: parseInt(height)
	}
}


var Picture = React.createClass({
	render: function(){
		var imgixHost = "http://figure-imgix.imgix.net/"
		var url = imgixHost + this.props.name + "?w=600&h=600"  
		url += "&rect=" + [this.props.x, this.props.y, this.props.width, this.props.height].toString();
		url += "&txtsize=30&txtfont64=RnV0dXJhIENvbmRlbnNlZCBNZWRpdW0&txtclr=fff&txtalign=left&txt=" + this.props.text;
		return (
				<img src={url}></img>
		)
	}
})

var PictureRow = React.createClass({
	render: function(){
		var rect20 = rectangle(ratio(20));
		var rect22 = rectangle(ratio(22));
		var rect24 = rectangle(ratio(24));
		return (
			<div className="section group">
				<div className="col span_1_of_4">
					<Picture name={this.props.picture} x={0} y={0} width={1280} height={1280} text="18mm"/>
				</div>
				<div className="col span_1_of_4">
					<Picture name={this.props.picture} x={rect20.x} y={rect20.y} width={rect20.width} height={rect20.height} text="20mm"/>
				</div>
				<div className="col span_1_of_4">
					<Picture name={this.props.picture} x={rect22.x} y={rect22.y} width={rect22.width} height={rect22.height}  text="22mm"/>
				</div>
				<div className="col span_1_of_4">
					<Picture name={this.props.picture} x={rect24.x} y={rect24.y} width={rect24.width} height={rect24.height}  text="24mm"/>
				</div>
			</div>
		)
	}
})

var App = React.createClass({
	render: function(){
		return (
			<div className="section group">
				{this.props.pictures.map(function(picture, i){
					return <PictureRow picture={picture} key={i}/>;
				})}

			</div>
		)
	}
})

ReactDOM.render(
	<App pictures={pictures}/>, 
	document.getElementById('root'));