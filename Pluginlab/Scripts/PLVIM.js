// Copyright (C) 2002-2007 Pluginlab Limited. All rights reserved.
// http://www.pluginlab.com
// Trial copy.

var PLVIM_VERSION="3.0.2.0"
var PLVIM_LAYER=false
var PLVIM_X=0
var PLVIM_Y=0
var PLVIM_VALIGN=0
var PLVIM_IS_FLOATING=false
var PLVIM_DRAW_MAIN_BORDER=false
var PLVIM_MAIN_BORDER_COLOR='#000000'
var PLVIM_DRAW_MAIN_BUTTON_BORDER=false
var PLVIM_MAIN_BUTTON_BORDER_COLOR='#000000'
var PLVIM_DRAW_FO_BORDER=false
var PLVIM_FO_BORDER_COLOR='#000000'
var PLVIM_DRAW_FO_BUTTON_BORDER=false
var PLVIM_FO_BUTTON_BORDER_COLOR='#000000'
var PLVIM_DRAW_SCROLLERS_BORDER=false
var PLVIM_SCROLLERS_BORDER_COLOR='#000000'
var PLVIM_PRELOAD=true
var PLVIM_SHOW_SELECTED=false
var PLVIM_DEFAULT_WIDTH=70
var PLVIM_DEFAULT_HEIGHT=20
var PLVIM_DEFAULT_NORMAL=''
var PLVIM_DEFAULT_OVER=''
var PLVIM_DEFAULT_DOWN=''
var PLVIM_FO_HEIGHT=0
var PLVIM_FO_PADDING=0
var PLVIM_Z_INDEX=50
var PLVIM_OVERLAP=false
var PLVIM_PARENT_MO=true
var PLVIM_HAS_SHADOW=true
var PLVIM_OPEN_ANIMATION=0
var PLVIM_CLOSE_ANIMATION=0
var PLVIM_OPEN_SPEED=10
var PLVIM_CLOSE_SPEED=10
var PLVIM_SHOW_DELAY=400
var PLVIM_FONT='Verdana,Arial,Helvetica,sans-serif'
var PLVIM_FONT_SIZE=11
var PLVIM_LEFT_PADDING_MAIN=6
var PLVIM_LEFT_PADDING_FO=6
var PLVIM_CENTER_HEADINGS=true
var PLVIM_CENTER_MAIN=false
var PLVIM_CENTER_FLYOUTS=false
var PLVIM_CROSSFADE=false
var PLVIM_TEXT_COLOR='#999999'
var PLVIM_TEXT_MO_COLOR='#000000'
var PLVIM_TEXT_MD_COLOR='#000000'
var PLVIM_TEXT_SEL_COLOR='#000000'
var PLVIM_TEXT_HEADING_COLOR='#000000'
var PLVIM_WEIGHT='normal'
var PLVIM_MO_WEIGHT='normal'
var PLVIM_MD_WEIGHT='normal'
var PLVIM_SEL_WEIGHT='normal'
var PLVIM_HEADING_WEIGHT='bold'
var PLVIM_DECORATION=0
var PLVIM_MO_DECORATION=0
var PLVIM_MD_DECORATION=0
var PLVIM_SEL_DECORATION=0
var PLVIM_HEADING_DECORATION=0
var PLVIM_ITALIC=false
var PLVIM_MO_ITALIC=false
var PLVIM_MD_ITALIC=false
var PLVIM_SEL_ITALIC=false
var PLVIM_HEADING_ITALIC=false
var PLVIM_LANGUAGE_RTL=false
var PLVIM_UP_ARROW='*../../SpryAssets/up.gif'
var PLVIM_UP_ARROW_OVER=''
var PLVIM_UP_ARROW_DISABLED='*../../SpryAssets/up_disabled.gif'
var PLVIM_DOWN_ARROW='*../../SpryAssets/down.gif'
var PLVIM_DOWN_ARROW_OVER=''
var PLVIM_DOWN_ARROW_DISABLED='*../../SpryAssets/down_disabled.gif'
var PLVIM_SCROLLER_COLOR='#FFFFFF'
var PLVIM_SCROLLER_MO_COLOR='#666666'
var PLVIM_SCROLL_DELAY=35
var PLVIM_STREAM=new Array(0,6,'#999999','#000000','#000000','#000000',0,0,"HOME",70,20,'*../../index.html','','','','','','',0,0,0,0,"SATELLITE",70,20,'*../../satellite.html','','','','','','',0,0,0,0,"ECLIPSE",70,20,'*../../eclipse.html','','','','','','',0,0,0,0,"COMET",70,20,'*../../comet.html','','','','','','',0,0,0,0,"APPLET",70,20,'','','','','','','',0,0,0,0,"CALL&nbsp;ME",70,20,'*../../map.html','','','','','','',0,0)
var PLVIM_br
var PLVIM_flyouts=new Array
var PLVIM_shownFoids = Array('0')
var PLVIM_currentFoid = null
var PLVIM_nextFoid = null
var PLVIM_currentItem
var PLVIM_timeout = null
var PLVIM_interval = null
var PLVIM_preloads = new Array
var PLVIM_plIndex = 0
function PLVIM_setPathAdjustment(ID)
{
	var sl = ''
	var sc = document.getElementsByTagName('script')
	for (var i=0; i<sc.length; i++) {
		if (sc[i].innerHTML.search(ID)>-1) {sl = sc[i].src; break;}
	}
	PLVIM_SCRIPT_LOCATION = sl.substr(0, sl.lastIndexOf('/')+1)
}
function PLVIM_adjustPath(path)
{
	if (path.charAt(0) != '*') return path
	return PLVIM_SCRIPT_LOCATION + path.substr(1)
}
PLVIM_setPathAdjustment('PLVIMMenu script')
function PLVIM_br() {
	var ua = navigator.userAgent.toLowerCase()
	var ind = ua.indexOf('gecko')
	this.mozilla = ind>0 && ua.substr(ind).length<17
	this.opera = ua.indexOf('opera') >= 0
	this.mac = ua.indexOf('mac') >= 0
	this.safari = ua.indexOf('safari') >= 0
	this.ie = document.all && !this.opera
	this.ie5 = this.ie && ua.indexOf('msie 5')>0
	this.macie = this.ie && ua.indexOf('mac') >= 0
	this.winie = this.ie && !this.macie
	this.compatMode = this.ie && document.compatMode=="CSS1Compat"
	this.ieCanvas = this.compatMode?document.documentElement:document.body
	return this
}
function PLVIM_start() {
	PLVIM_br = new PLVIM_br()
	PLVIM_Layer = document.getElementById("PLVIMDiv")
	PLVIM_flyouts[0] = PLVIM_Layer
	var i=0, st=PLVIM_STREAM
	while (i<st.length){
		var index = st[i++]
		var n = st[i++]
		var curTxtColor = st[i++]
		var curTMOColor = st[i++]
		var curTMDColor = st[i++]
		var curSelColor = st[i++]
		var wraper,fos
		var fo = PLVIM_flyouts[index]
		fo.obj = "PLVIM_"+index
		eval(fo.obj+"=fo")
		fo.onmouseover = PLVIM_onmouseover
		fo.onmouseout = PLVIM_onmouseout
		if (fo.foid=index) {
			fo.ncolor = st[i++]
			fo.mocolor = st[i++]
			fo.upArrowSrc = fo.upNArrow = PLVIM_adjustPath(st[i++])
			fo.upOArrow = PLVIM_adjustPath(st[i++])
			if (!fo.upOArrow) fo.upOArrow = fo.upNArrow
			fo.upDArrow = PLVIM_adjustPath(st[i++])
			fo.upArrowWidth = st[i++]
			fo.upArrowHeight = st[i++]
			fo.downArrowSrc = fo.downNArrow = PLVIM_adjustPath(st[i++])
			fo.downOArrow = PLVIM_adjustPath(st[i++])
			if (!fo.downOArrow) fo.downOArrow = fo.downNArrow
			fo.downDArrow = PLVIM_adjustPath(st[i++])
			fo.downArrowWidth = st[i++]
			fo.downArrowHeight = st[i++]
			PLVIM_preload(fo.upNArrow)
			PLVIM_preload(fo.upOArrow)
			PLVIM_preload(fo.downOArrow)
			PLVIM_preload(fo.downDArrow)
			var tbl = document.createElement("table")
			fo.appendChild(tbl)
			fo.style.position = "absolute"
			tbl.cellPadding = "0"
			tbl.cellSpacing = "0"
			tbl.dir = "ltr"
			var cell = PLVIM_insertCell(tbl,true)
			if(!PLVIM_br.safari) {
				var upSrc = fo.upDArrow?fo.upDArrow:fo.upNArrow
				var downSrc = fo.downNArrow
				cell.innerHTML = ""
				+ "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">"
				+ "<tr><td id=\"PLVIM_UPSCROLLER\">"
				+ (upSrc ? "<center><img src=\"" + upSrc + "\"></center>" : "")
				+ "</td></tr></table>"
				+ "<div></div>"
				+ "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">"
				+ "<tr><td id=\"PLVIM_DOWNSCROLLER\">"				+ (downSrc ? "<center><img src=\"" + downSrc + "\"></center>" : "")
				+ "</td></tr></table>"
				var tbls  = cell.getElementsByTagName("table")
				for(var j=0; j<tbls.length; j++){
					var td = tbls[j].getElementsByTagName('TD')[0]
					tbls[j].tdScr = td
					td.foid = index
					td.fo = fo
					td.style.backgroundColor = fo.ncolor
					td.style.cursor = PLVIM_br.ie5 ? 'hand':'pointer'
					var arrow = tbls[j].getElementsByTagName('IMG')[0]
					if(j==0 && upSrc){
						arrow.style.width = fo.upArrowWidth+'px'
						arrow.style.height = fo.upArrowHeight+'px'
						fo.upArrow = arrow
						fo.upScr = tbls[j]
					}
					if(j==1 && downSrc){
						arrow.style.width = fo.downArrowWidth+'px'
						arrow.style.height = fo.downArrowHeight+'px'
						fo.downArrow = arrow
						fo.dwnScr = tbls[j]
					}
				}
				fo.bUpScrDisabled = fo.upDArrow?1:0
			} else {
				scrollArea = document.createElement("div")
				cell.appendChild(scrollArea)
			}
			var scrollArea = cell.getElementsByTagName('DIV')[0]
			wraper = scrollArea
			fos = "<table cellpadding=0 cellspacing=0 border=0>"
		} else {
			wraper = PLVIM_Layer.getElementsByTagName('DIV')[0]
			fos = "<table id='PLVIMMenu' border=0 cellpadding=0 cellspacing=0>"
		}
		var i_ = i
		for (var j=0; j<n; j++){
			var type = st[i_]
			if (type == 0){
				i_ += (st[i_+6].substr(0,3) == '_PL')?12:10
				fos += "<tr><td id=\"PLVIMLink\">"
				fos += "<table id=\"PLVIMlink_" + index + "_" + j + "\" cellpadding=0 cellspacing=0 border=0><tr>"
				fos += "<td style=\"padding:1px 0px 1px " + (index?6:6) + "px\">"
				if (st[i_] || st[i_+1]) fos += "<img id=\"PLVIMIco_" + index + "_" + j + "\" style=\"visibility:hidden\"></td><td>"
				fos += "<span id=\"PLVIMFont_" + index + "_" + j + "\">Unnamed</span></td>"
				fos += "</tr></table></td></tr>"
				i_ += 4
			} else if (type == 1){
				fos += "<tr><td id=\"PLVIMHeading_" + index + "_" + j + "\">"
				fos += "<div style=\"padding:1px 0px 1px 0px\">"
				fos += "<span id=\"PLVIMHFont_" + index + "_" + j + "\">Unnamed</span></div></td></tr>"
				i_ += 6
			} else if (type == 2){
				i_ += 5
			}
		}
		fos += "</table>"
		wraper.innerHTML = fos
		if (index) document.body.appendChild(fo)
		for (var j=0; j<n; j++){
			var type = st[i++]
			if (type == 0){
				var tbl = document.getElementById('PLVIMlink_' + index + '_' + j)
				var td = tbl.parentNode
				td.align = 'left'
				td.foid = index
				td.cfoid = st[i++]
				if (td.cfoid>0) {
					var t = PLVIM_flyouts[td.cfoid] = document.createElement('DIV')
					t.style.display = 'none'
					t.pe = td
				}
				td.curcolor = td.txtcolor = curTxtColor
				td.tmocolor = curTMOColor
				td.tmdcolor = curTMDColor
				td.style.cursor = PLVIM_br.ie5 ? 'hand':'pointer'
				var fnt = document.getElementById('PLVIMFont_' + index + '_' + j)
				fnt.style.color = curTxtColor
				fnt.style.fontFamily = PLVIM_FONT
				fnt.style.fontSize = '11px'
				fnt.style.fontWeight = 'normal'
				fnt.style.fontStyle = 'normal'
				fnt.style.textDecoration = 'none'
				fnt.innerHTML = td.txt = st[i++]
				var w = st[i++]
				var h = st[i++]
				tbl.style.height = h + 'px'
				td.style.width = w + 'px'
				td.href='http://www.pluginlab.com'
				i++
				var t = st[i++]
				td.target = t
				if (t.substr(0,3) == '_PL') {
					td.func = st[i++]
					td.params = st[i++]
				}
				td.imgn = PLVIM_adjustPath(st[i++])
				td.imgo = PLVIM_adjustPath(st[i++])
				td.imgd = PLVIM_adjustPath(st[i++])
				td.icon = PLVIM_adjustPath(st[i++])
				td.icoo = PLVIM_adjustPath(st[i++])
				td.icoh = st[i++]
				td.icow = st[i++]
				PLVIM_preload(td.imgo)
				PLVIM_preload(td.imgd)
				PLVIM_preload(td.icoo)
				td.fnt = fnt
				td.tbl = tbl
				if (td.imgn) td.style.backgroundImage = 'url('+td.imgn+')'
				var ico = document.getElementById('PLVIMIco_' + index + '_' + j)
				if (ico){
					ico.src = td.icon?td.icon:td.icoo
					ico.style.marginRight = '3px'
					ico.style.height = td.icoh + 'px'
					ico.style.width = td.icow + 'px'
					ico.style.visibility = td.icon?'':'hidden'
				}
				td.ico = ico
				td.onmousedown = PLVIM_onmousedown
				td.onmouseup = PLVIM_onmouseup
				td.co = 0
			} else if (type == 1){
				var td = document.getElementById('PLVIMHeading_' + index + '_' + j)
				td.align = 'center'
				td.style.cursor = 'default'
				var fnt = document.getElementById('PLVIMHFont_' + index + '_' + j)
				fnt.style.fontFamily = PLVIM_FONT
				fnt.style.fontSize = '11px'
				fnt.style.fontWeight = 'bold'
				fnt.style.fontStyle = 'normal'
				fnt.style.textDecoration = 'none'
				fnt.style.fontSize = '11px'
				fnt.innerHTML = st[i++]
				td.style.width = st[i++] + 'px'
				var h = st[i++]
				td.style.height = h + 'px'
				if (st[i]) td.style.backgroundImage = 'url(' + PLVIM_adjustPath(st[i]) + ')'
				i++
				fnt.style.color = st[i++]
			} else if (type == 2){
				curTxtColor = st[i++]
				curTMOColor = st[i++]
				curTMDColor = st[i++]
				curSelColor = st[i++]
			}
		}
		if (index) {
			document.body.appendChild(fo)
			fo.style.left='-10000px'
			fo.style.top='-10000px'
			fo.style.display=''
			scrollArea.baseHeight = scrollArea.offsetHeight
			if(fo.upScr) fo.upScr.baseHeight = fo.upScr.offsetHeight
			if(fo.dwnScr) fo.dwnScr.baseHeight = fo.dwnScr.offsetHeight
			fo.scrollArea = scrollArea
			fo.style.width = fo.offsetWidth + 'px'
			scrollArea.style.width = scrollArea.offsetWidth + 'px'
			fo.style.zIndex = 50
			fo.style.display = 'none'
			fo.shadows = new Array
			for (var s=1; s<=4; s++){
				fo.shadows[s] = document.createElement('div')
				document.body.appendChild(fo.shadows[s])
			}
		}
	}
}
function PLVIM_addLoadEvent(f) {
	var oldf = window.onload
	if (typeof oldf != 'function') {
		window.onload = f
	} else {
		window.onload = function() {
			try {
				oldf()
			}
			catch(e) {}
			f()
		}
	}
}
function PLVIM_onload() {
	setTimeout('PLVIM_start()',0)
}
function PLVIM_init() {
	PLVIM_addLoadEvent(PLVIM_onload)
}
function PLVIM_onmouseover(evt) {
	var e = PLVIM_getSource(evt)
	PLVIM_currentFoid = PLVIM_getFoid(evt)
	PLVIM_nextFoid = null
	if (e) {
		PLVIM_currentItem = e
		PLVIM_nextFoid = e.cfoid
		if (e.id == 'PLVIM_UPSCROLLER'){
			e.style.backgroundColor = e.fo.mocolor
			e.fo.upArrowSrc = e.fo.upOArrow
			e.fo.bScrollUp = true
			PLVIM_interval = window.setInterval('PLVIM_scroll()',PLVIM_SCROLL_DELAY)
		} else if (e.id == 'PLVIM_DOWNSCROLLER'){
			e.style.backgroundColor = e.fo.mocolor
			e.fo.downArrowSrc = e.fo.downOArrow
			e.fo.bScrollUp = false
			PLVIM_interval = window.setInterval('PLVIM_scroll()',PLVIM_SCROLL_DELAY)
		} else if (e.id == 'PLVIMLink') PLVIM_showMO(e)
	}
	window.clearTimeout(PLVIM_timeout)
	PLVIM_timeout = window.setTimeout('PLVIM_updateFlyouts()',PLVIM_SHOW_DELAY)
}
function PLVIM_showMO(e)
{
	if (!e.sel) {
		if (e.imgo) e.style.backgroundImage = 'url('+e.imgo+')'
		if (e.icoo) {e.ico.src = e.icoo; e.ico.style.visibility = ''}
		e.fnt.style.color = e.tmocolor
	}
}
function PLVIM_onmouseout(evt)
{
	var e = PLVIM_getSource(evt)
	PLVIM_currentFoid = 0
	PLVIM_nextFoid = null
	if (e) {
		if (e.id == 'PLVIM_UPSCROLLER'){
			e.style.backgroundColor = e.fo.ncolor
			e.fo.upArrowSrc = e.fo.upNArrow
			if(!e.fo.bUpScrDisabled && e.fo.upArrow) e.fo.upArrow.src = e.fo.upNArrow
		}
		if (e.id == 'PLVIM_DOWNSCROLLER'){
			e.style.backgroundColor = e.fo.ncolor
			e.fo.downArrowSrc = e.fo.downNArrow
			if(!e.fo.bDownScrDisabled && e.fo.downArrow) e.fo.downArrow.src = e.fo.downNArrow
		}
		if (e.id == 'PLVIMLink' && !e.co) PLVIM_hideMO(e)
	}
	window.clearInterval(PLVIM_interval)
	window.clearTimeout(PLVIM_timeout)
	PLVIM_timeout = window.setTimeout('PLVIM_updateFlyouts()',PLVIM_SHOW_DELAY)
}
function PLVIM_hideMO(e)
{
	if(!e.sel){
		if(e.imgn && e.imgo) e.style.backgroundImage = 'url('+e.imgn+')'
		if (e.ico) {e.ico.src = e.icon; e.ico.style.visibility = e.icon?'':'hidden'}
		e.fnt.style.color = e.txtcolor
	}
}
function PLVIM_onmousedown(evt)
{
	var e = PLVIM_getSource(evt)
	if (e && e.id == 'PLVIMLink'){
		if (e.imgd) e.style.backgroundImage = 'url('+e.imgd+')'
		e.fnt.style.color = e.tmdcolor
	}
}
function PLVIM_onmouseup(evt)
{
	var e = PLVIM_getSource(evt)
	if (e && e.id == 'PLVIMLink') {
		e.style.backgroundImage = 'url('+(e.imgo?e.imgo:e.imgn)+')'
		e.fnt.style.color = e.tmocolor
		if (e.func) eval(e.func+'("PLVIMMenu script","'+e.href+'",'+e.params+')')
		else {
			if (!e.href) return
			if (e.target) window.open(e.href,e.target)
			else location = e.href
		}
	}
}
function PLVIM_updateFlyouts()
{
	var i
	i=0
	while ((PLVIM_currentFoid!=PLVIM_shownFoids[i])&&(i<PLVIM_shownFoids.length)) i++
	if (i>=PLVIM_shownFoids.length) i=1
	else {
		i++
		if (PLVIM_nextFoid){
			if (PLVIM_shownFoids[i] != PLVIM_nextFoid){
				if (PLVIM_shownFoids[i]) PLVIM_removeFlyout(PLVIM_shownFoids[i])
				PLVIM_shownFoids[i] = PLVIM_nextFoid
				PLVIM_showFlyout()
			}
			i++
		}
	}
	for (var j=i;j<PLVIM_shownFoids.length;j++){
		PLVIM_removeFlyout(PLVIM_shownFoids[j])
	}
	PLVIM_shownFoids.length = i
}
function PLVIM_showFlyout()
{
	var e = PLVIM_currentItem
	var fo = PLVIM_flyouts[e.cfoid]
	if (!fo) return
	var bIsEffect = !PLVIM_br.safari
	e.co = 1
	fo.open = true
	if (fo.intr) return
	fo.pfoid = e.foid
	var eTop = PLVIM_getTop(e)
	var docTop = PLVIM_br.ie?PLVIM_br.ieCanvas.scrollTop:window.pageYOffset
	var docLeft = PLVIM_br.ie?PLVIM_br.ieCanvas.scrollLeft:window.pageXOffset
	var docHeight = PLVIM_br.ie?PLVIM_br.ieCanvas.clientHeight:window.innerHeight
	var docWidth = PLVIM_br.ie?PLVIM_br.ieCanvas.offsetWidth:window.innerWidth
	var topLimit = docTop + 2
	var bottomLimit = docTop + docHeight - 6
	var foHeight = bottomLimit - topLimit
	var show_scrollers = 'none'
	if (fo.upScr && fo.dwnScr && fo.scrollArea.baseHeight > foHeight) {
		var scrSize = fo.upScr.baseHeight + fo.dwnScr.baseHeight
		show_scrollers = ''
		fo.scrollArea.style.overflow = 'hidden'
		if (foHeight < scrSize+4) foHeight = scrSize+4
		fo.scrollArea.style.height = (fo.scrollAreaHeight = foHeight - scrSize) + 'px'
		fo.scrTbl = fo.scrollArea.childNodes[0]
	} else {
		fo.scrollArea.style.height = (foHeight = fo.scrollArea.baseHeight) + 'px'
	}
	fo.style.top = '-10000px'
	fo.style.left = '-10000px'
	fo.style.display=''
	fo.baseTop = eTop
	if (e.foid>0 && PLVIM_br.ie) fo.baseTop -= PLVIM_flyouts[e.foid].scrollArea.scrollTop
	fo.baseTop += (e.style.borderTopStyle=='solid'?1:0)
	if (fo.baseTop < topLimit) fo.baseTop = topLimit
	if (foHeight + fo.baseTop > bottomLimit) {
		var t = bottomLimit - foHeight
		fo.baseTop = t<topLimit?topLimit:t
	}
	fo.baseLeft = PLVIM_getLeft(PLVIM_flyouts[e.foid]) + parseInt(PLVIM_flyouts[e.foid].offsetWidth)
	if(fo.upScr && fo.dwnScr){
		fo.upScr.style.display = show_scrollers
		fo.dwnScr.style.display = show_scrollers
	}
	fo.style.left = fo.baseLeft + 'px'
	if (fo.baseLeft + fo.offsetWidth + 22 - docLeft > docWidth) fo.style.left = (fo.baseLeft = (e.foid==0?docWidth-22+docLeft:PLVIM_flyouts[e.foid].baseLeft) - fo.offsetWidth) + 'px'
	fo.style.top = fo.baseTop + 'px'
	var bOpacity = PLVIM_br.opera||PLVIM_br.macie||PLVIM_br.safari
	for (var i=1; i<=(bOpacity?3:4); i++){
		fo.shadows[i].innerHTML = '.'
		var ss = fo.shadows[i].style
		ss.position = 'absolute'
		ss.left = fo.baseLeft + i + 'px'
		ss.top = fo.baseTop + i +'px'
		ss.width = fo.offsetWidth + 'px'
		ss.height = fo.offsetHeight + 'px'
		ss.backgroundColor = bOpacity?'#B0B0B0':'#000000'
		ss.zIndex = 50 - i
		var opacity = 5 * (6 - i)
		ss.filter = 'alpha(opacity=' + opacity + ')'
		ss.MozOpacity = opacity/100
		ss.display = ''
	}
	PLVIM_scrollInit(fo)
}
function PLVIM_removeFlyout(foid) {
	var fo = PLVIM_flyouts[foid]
	if (!fo) return
	fo.pe.co = 0
	PLVIM_hideMO(fo.pe)
	fo.open = false
	if (fo.intr) return
	fo.intr = true
	PLVIM_hideFlyout(fo)
}
function PLVIM_hideFlyout(fo)
{
	fo.style.display ='none'
	if(fo.scrTbl) {
		fo.scrTbl.style.clip = 'rect(0 auto auto 0)'
		fo.scrTbl.style.position = ''
		fo.scrTbl.style.top = ''
		fo.scrTbl.style.left = ''
		fo.scrTbl = false
		fo.bUpScrDisabled = true
	}
	if(fo.upArrow && fo.upDArrow) fo.upArrow.src = fo.upDArrow
	if(fo.downArrow) fo.downArrow.src = fo.downNArrow
	for (var i=1; i<=4; i++){
		fo.shadows[i].style.display = 'none'
	}
	fo.intr = false
	if (fo.open) PLVIM_showFlyout()
}
function PLVIM_scrollInit(fo){
	if(!fo.scrTbl) return
	if (PLVIM_br.ie) fo.scrTbl.style.position = 'absolute'
	var top = fo.scrollArea.offsetTop
	var left = fo.scrollArea.offsetLeft
	if (!PLVIM_br.ie) fo.scrTbl.style.position = 'absolute'
	fo.scrBaseTop = top
	fo.scrTbl.style.top = top + 'px'
	fo.scrTbl.style.left = left + 'px'
	fo.step = Math.max(4,Math.floor(fo.scrollArea.baseHeight/50))
	fo.scrollArea.style.overflow = ''
	fo.scrTbl.style.clip = 'rect(0 auto '+fo.scrollAreaHeight+'px 0)'
}
function PLVIM_scroll()
{
	var fo = PLVIM_flyouts[PLVIM_currentItem.foid]
	if(!fo || !fo.scrTbl || fo.intr) return
	var curtop = fo.scrTbl.offsetTop
	var topLimit = fo.scrBaseTop - (fo.bScrollUp?0:(fo.scrollArea.baseHeight - fo.scrollAreaHeight))
	if (curtop == topLimit) return
	curtop += (fo.bScrollUp?1:-1)*fo.step
	if ((fo.bScrollUp && curtop > topLimit) || (!fo.bScrollUp && curtop < topLimit)) curtop = topLimit
	fo.scrTbl.style.top = curtop + 'px'
	fo.scrTbl.style.clip = 'rect('+(fo.scrBaseTop-curtop)+'px auto '+(fo.scrollAreaHeight+fo.scrBaseTop-curtop)+'px 0)'
	if(fo.upArrow && fo.upDArrow) fo.upArrow.src = (fo.bUpScrDisabled = (fo.bScrollUp && curtop==topLimit))?fo.upDArrow:fo.upArrowSrc
	if(fo.downArrow && fo.downDArrow) fo.downArrow.src = (fo.bDownScrDisabled = (!fo.bScrollUp && curtop==topLimit))?fo.downDArrow:fo.downArrowSrc
}
function PLVIM_preload(img)
{
	if (img) {
		PLVIM_preloads[PLVIM_plIndex] = new Image
		PLVIM_preloads[PLVIM_plIndex++].src = img
	}
}
function PLVIM_insertCell(t,body)
{
	if (body) {
		var tbody = document.createElement('tbody')
		t.appendChild(tbody)
		t = tbody
	}
	var row = document.createElement('TR')
	t.appendChild(row)
	var cell = document.createElement('TD')
	row.appendChild(cell)
	return cell
}
function PLVIM_getSource(evt)
{
	var e = PLVIM_br.ie?event.srcElement:evt.target
	if (e&&e.tbl) return e
	while (e && (e.tagName != "TABLE")) e = e.parentNode
	if (e&&e.tdScr) e = e.tdScr
	else if(e) e = e.parentNode
	return e
}
function PLVIM_getFoid(evt)
{
	var e = PLVIM_br.ie?event.srcElement:evt.target
	while (e && (!e.foid)){
		e = e.parentNode
	}
	return e?e.foid:0
}
function PLVIM_getTop(e)
{
	var top = PLVIM_br.macie?e.clientTop:0
	var abs = false
	while (e && (e.tagName!='BODY' || !abs)){
		if (e.style.position == 'absolute') abs = true
		top += e.offsetTop
		e = e.offsetParent
	}
	if (PLVIM_br.macie) top += parseInt(document.body.currentStyle.marginTop)
	return top
}
function PLVIM_getLeft(e)
{
	var left = PLVIM_br.macie?e.clientLeft:0
	var abs = false
	while (e && (e.tagName!='BODY' || !abs)){
		if (e.style.position == 'absolute') abs = true
		left += e.offsetLeft
		e = e.offsetParent
	}
	if (PLVIM_br.macie) left += parseInt(document.body.currentStyle.marginLeft)
	return left
}
function PLVIM_getTime()
{
	var time = new Date()
	return time.valueOf()
}
PLVIM_init()
