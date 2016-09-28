

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

var GlassSize = React.createClass({
	render: function(){
		var size = 4 + parseInt((this.props.lensToFace - 50) / 2 * Math.tan(this.props.angle / 2.0));
		return <div> vitre = {size} cm </div>
	}
})

var MirrorSize = React.createClass({
	render: function(){
		var size = 4 + parseInt((this.props.lensToMirror) / 2 * Math.tan(this.props.angle / 2.0))
		return <div> miroir = {size} cm</div>
	}
})

var PictureRow = React.createClass({
	
	render: function(){
		var ratio18 = ratio(18, this.props.lensToFace);
		var ratio20 = ratio(20, this.props.lensToFace);
		var ratio24 = ratio(24, this.props.lensToFace);
		var ratio28 = ratio(28, this.props.lensToFace);
		var ratio35 = ratio(35, this.props.lensToFace);

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
					<Picture name={this.props.picture} crop={rect18} pad={padding18} text={"f=18mm" + " d=" + this.props.lensToFace + "cm"}/>
					<GlassSize angle={getAngle(18)} lensToFace={this.props.lensToFace}/>
					{this.props.hasMirror 
						? <MirrorSize angle={getAngle(18)} lensToMirror={this.props.lensToMirror}/>
						: null
					}
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect20} pad={padding20} text={"f=20mm" + " d=" + this.props.lensToFace + "cm"}/>
					<GlassSize angle={getAngle(20)} lensToFace={this.props.lensToFace}/>
					{this.props.hasMirror 
						? <MirrorSize angle={getAngle(20)} lensToMirror={this.props.lensToMirror}/>
						: null
					}
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect24} pad={padding24} text={"f=24mm" + " d=" + this.props.lensToFace + "cm"}/>
					<GlassSize angle={getAngle(24)} lensToFace={this.props.lensToFace}/>
					{this.props.hasMirror 
						? <MirrorSize angle={getAngle(24)} lensToMirror={this.props.lensToMirror}/>
						: null
					}
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect28} pad={padding28} text={"f=28mm" + " d=" + this.props.lensToFace + "cm"}/>
					<GlassSize angle={getAngle(28)} lensToFace={this.props.lensToFace}/>
					{this.props.hasMirror 
						? <MirrorSize angle={getAngle(28)} lensToMirror={this.props.lensToMirror}/>
						: null
					}
				</div>
				<div className="col span_1_of_5">
					<Picture name={this.props.picture} crop={rect35} pad={padding35} text={"f=35mm" + " d=" + this.props.lensToFace + "cm"}/>
					<GlassSize angle={getAngle(35)} lensToFace={this.props.lensToFace}/>
					{this.props.hasMirror 
						? <MirrorSize angle={getAngle(35)} lensToMirror={this.props.lensToMirror}/>
						: null
					}
				</div>
			</div>
		)
	}
})


var LensToFaceInput = React.createClass({

	handleChange: function(e){
		this.props.handleChange(e.target.value);
	},

	render: function() {
		return(
			<div className="parameter">
				Distance entre l'objectif et le visage:   
				<input type="number" name="lensToFace" onChange={this.handleChange} defaultValue={this.props.value} min="30" max="200" /> cm
				<div className="error">{ this.props.error ? this.props.error : null }</div> 
			</div>
		)
	}
});

var HasMirrorCheckBox = React.createClass({

	toggleChange: function(e) {
		this.props.toggleChange(e.target.checked);
	},

	render: function(){
		return (
			<div className="parameter">
				Avec miroir ? <input type="checkbox" onChange={this.toggleChange} checked={this.props.checked}/>
			</div>
		)
	}

});

var LensToMirrorInput = React.createClass({

	handleChange: function(e){
		this.props.handleChange(e.target.value);
	},

	render: function(){
		return (
			<div className="parameter">
				Distance entre l'objectif et le miroir: 
				<input type="number" name="lensToMirror "onChange={this.handleChange} defaultValue={this.props.value} min="0" max="60" /> cm
				<div className="error">{this.props.error ? this.props.error : null}</div>
			</div>
		)
	}

})

var App = React.createClass({

  getInitialState: function() {
    return { 
    	lensToFace: 50, 
    	lensToFaceError: '',
    	hasMirror: false,
    	lensToMirror: 0,
    	lensToMirrorError: ''
	 	};
  },

  handleLensToFaceChange: function(v) {
  	if (v >= 50 && v < 150) {
  		this.setState({lensToFace: parseInt(v), lensToFaceError: ''});  
  		if (v >= 60) {
  			this.setState({lensToMirror: (v - 50) / 2.0})
  		}		
  	} else {
  		var error = "La distance entre l'objectif et le visage doit être compris entre 50cm et 150cm";
  		this.setState({lensToFaceError: error});
  	}
  },

  toggleHasMirrorChange: function(v) {
  	this.setState({hasMirror: v});
  },

  handleLensToMirrorChange: function(v) {
  	if (v >= 0 && v < this.state.lensToFace - 50) {
  		this.setState({lensToMirror: v, lensToMirrorError: ''});  		
  	} else {
  		var error = "La distance entre l'objectif et le miroir doit être compris entre 0 et " + (this.state.lensToFace - 50) + " cm"
  		this.setState({lensToMirrorError: error})
  	}
  },

	render: function(){
		var _this = this;
		return (
			<div>
				<LensToFaceInput 
					value={this.state.lensToFace} 
					error={this.state.lensToFaceError}
					handleChange={this.handleLensToFaceChange}
				/>
				{this.state.lensToFace >= 60 
					?
					<div>
						<HasMirrorCheckBox
							checked={this.state.hasMirror}
							toggleChange={this.toggleHasMirrorChange}
						/>
						<div>
						{_this.state.hasMirror
							?
								<LensToMirrorInput
									value={_this.state.lensToMirror}
									error={_this.state.lensToMirrorError}
									handleChange={_this.handleLensToMirrorChange}
								/> 
							: null
						}
						</div>
					</div>
					: null
				}
				<div className="section group">
					{this.props.pictures.map(function(picture, i){
						return <PictureRow 
								picture={picture} 
								lensToFace={_this.state.lensToFace} 
								hasMirror={_this.state.hasMirror}
								lensToMirror={_this.state.lensToMirror}
								key={i}/>;
					})}
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<App pictures={pictures}/>, 
	document.getElementById('root'));