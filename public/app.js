

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

/** Return the view angle in Radian */
function getAngle(f) {
	return 2 * Math.atan(7.5 / f); 
}

/** Calculate the size ratio of the image for a different focal */
function ratio(f, d) {
	var alpha18 = getAngle(18) / 2.0; 
	var alpha = getAngle(f) / 2.0;
	var d50 = 50;
	d = d || d50;
	return (Math.tan(alpha) * d) / (Math.tan(alpha18) * d50)
}

function rectangle(ratio) {
	var originalSize = 1280.0;
	if (ratio >= 1) {
		return { x: 0, y: 0, width: originalSize, height: originalSize };
	} else {
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
}

function padding(ratio) {
	if (ratio <= 1) {
		return 0;
	} else {
		var originalSize = (1280.0 / 2.0) / 2.0;
		return parseInt(originalSize * (ratio - 1.0))
	}
}


var Picture = React.createClass({
	render: function(){
		var imgixHost = "http://figure-imgix.imgix.net/"
		var url = imgixHost + this.props.name + "?w=640&h=640"  
		url += "&rect=" + [this.props.crop.x, this.props.crop.y, this.props.crop.width, this.props.crop.height].toString();
		url += "&pad=" + parseInt(this.props.pad) + "&bg=CCCCCC"
		url += "&txtsize=30&txtfont64=RnV0dXJhIENvbmRlbnNlZCBNZWRpdW0&txtclr=fff&txtalign=left&txt=" + this.props.text;
		return (
				<img src={url}></img>
		)
	}
})

var PictureRow = React.createClass({
	render: function(){

		var ratio18 = ratio(18, this.props.distance);
		var ratio20 = ratio(20, this.props.distance);
		var ratio24 = ratio(24, this.props.distance);
		var ratio28 = ratio(28, this.props.distance);
		var ratio35 = ratio(35, this.props.distance);

		var rect18 = rectangle(ratio18);
		var rect20 = rectangle(ratio20);
		var rect24 = rectangle(ratio24);
		var rect28 = rectangle(ratio28);
		var rect35 = rectangle(ratio35);

		var padding18 = padding(ratio18);
		var padding20 = padding(ratio20);
		var padding24 = padding(ratio24);
		var padding28 = padding(ratio28);
		var padding35 = padding(ratio35);

		return (
			<div className="section group">
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect18} pad={padding18} text={"f=18mm" + " d=" + this.props.distance + "cm"}/>
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect20} pad={padding20} text={"f=20mm" + " d=" + this.props.distance + "cm"}/>
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect24} pad={padding24} text={"f=24mm" + " d=" + this.props.distance + "cm"}/>
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect28} pad={padding28} text={"f=28mm" + " d=" + this.props.distance + "cm"}/>
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect35} pad={padding35} text={"f=35mm" + " d=" + this.props.distance + "cm"}/>
				</div>
			</div>
		)
	}
})

var Input = React.createClass({

	handleDistanceChange: function(e) {
		var newValue = e.target.value
		if (newValue < 200 && newValue > 30) {
			this.props.handleDistanceChange(newValue)
		}
	},

	render: function(){
		return(
			<div className="parameter">
				Distance du sujet: 
				<input type="number" name="distance" onChange={this.handleDistanceChange} defaultValue="50" min="30" max="200" /> cm
			</div>
		)
	}

})

var App = React.createClass({

  getInitialState: function() {
    return { distance: 50 };
  },

  handleDistanceChange: function(v) {
  	console.log("change")
  	this.setState({distance: parseInt(v)})
  },

	render: function(){
		var _this = this;
		return (
			<div>
				<Input handleDistanceChange={this.handleDistanceChange}/>
				<div className="section group">
					{this.props.pictures.map(function(picture, i){
						return <PictureRow picture={picture} distance={_this.state.distance} key={i}/>;
					})}
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<App pictures={pictures}/>, 
	document.getElementById('root'));