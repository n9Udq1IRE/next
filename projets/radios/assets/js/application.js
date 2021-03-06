(function (global) {
  'use strict';

  var R7 = global.R7;

	function MosaiqueRadios(channels) {
		this.channels = channels;
    this.page = 1;
		this.ligne = 1;
		this.colonne = 1;
		this.divItems = document.getElementById('divItems');
		this.divFlecheGauche = document.getElementById('divFlecheGauche');
		this.divFlecheDroite = document.getElementById('divFlecheDroite');
		this.divPage = document.getElementById('divPage');
		this.divFocus = document.getElementById('divFocus');
		this.draw();
  }

	MosaiqueRadios.prototype = {
    keys: {
      Up:    { after: 750, throttle: 150 },
      Down:  { after: 750, throttle: 150 },
      Left:  { after: 750, throttle: 150 },
      Right: { after: 750, throttle: 150 },
      Enter: false
    },
    draw: function() {
    	if (this.channels.length === 0) {
    		this.divPage.style.visibility = 'hidden';
    		this.divFocus.style.visibility = 'hidden';
    		this.divFlecheGauche.style.visibility = 'hidden';
    		this.divFlecheDroite.style.visibility = 'hidden';
    	}
    	else {
    		var nbrePages = Math.ceil(this.channels.length / 15);
    	  if (nbrePages === 1) {
    			this.divPage.style.visibility = 'hidden';
    			this.divFlecheGauche.style.visibility = 'hidden';
    			this.divFlecheDroite.style.visibility = 'hidden';
    	  }
    	  else {
    		  this.divPage.innerHTML = this.page + '/' + nbrePages;
    	  }
    		this.divFocus.style.visibility = 'hidden';
    	  this.divItems.innerHTML = '';
    	  this.focus();
        setTimeout(function() { mosaiqueRadios.drawItems(); }, 100);
    	}
    },
    drawItems: function() {
      var index = (this.page - 1) * 15;
      while (index < this.channels.length && index - (this.page - 1) * 15 < 15) {
        var count = index - (this.page - 1) * 15 + 1;
        var ligneTemp = Math.ceil(count / 5) - 1;
        var colonneTemp = (count - ligneTemp * 5) - 1;
    		// ITEM
    		var divItem = document.createElement('div');
    		divItem.setAttribute('class', 'item');
    		divItem.style.left = (128 + colonneTemp * 209) + 'px';
    		divItem.style.top = (80 + ligneTemp * 197) + 'px';
    		// Vignette
    		var divItemVignette = document.createElement('div');
    		divItemVignette.setAttribute('class', 'item_vignette');
    		var img = document.createElement('img');
    		img.setAttribute('src', './assets/img/' + this.channels[index].channelStdImage.replace('/images/channelStdImage/', ''));
    		img.setAttribute('width', '188px');
    		img.setAttribute('height', '105px');
    		divItemVignette.appendChild(img);
    		divItem.appendChild(divItemVignette);
    		// ShortName
    		var divItemShortName = document.createElement('div');
    		divItemShortName.setAttribute('class', 'item_shortname');
    		divItemShortName.innerHTML = this.channels[index].shortName;
    		divItem.appendChild(divItemShortName);
    		// BaseLine
    		var divItemBaseLine = document.createElement('div');
    		divItemBaseLine.setAttribute('class', 'item_baseline');
    		divItemBaseLine.innerHTML = this.channels[index].baseline;
    		divItem.appendChild(divItemBaseLine);
    		this.divItems.appendChild(divItem);
        index++;
      }
    },
    focus: function() {
    	this.divFocus.style.visibility = 'visible';
      this.divFocus.setAttribute('style', 'left: ' + (116 + (this.colonne - 1) * 209) + 'px; top: ' + (68 + (this.ligne - 1) * 197) + 'px');
      var index = (this.page - 1) * 15 + (this.ligne - 1) * 5 + (this.colonne - 1);
      if (navigator.userAgent.indexOf('Chrome') === -1) {
        R7('play', this.channels[index].uri);
      }
    },
    gauche: function() {
      if (this.channels.length > 0) {
        this.colonne--;
        if (this.colonne < 1) {
          this.page--;
          if (this.page < 1) {
            this.page = Math.ceil(this.channels.length / 15);
          }
          this.colonne = 1;
          this.ligne = 1;
          this.draw();
        }
        else {
          this.focus();
        }
      }
    },
    haut: function() {
      if (this.channels.length > 0) {
        if (this.ligne > 1) {
          this.ligne--;
          this.focus();
        }
      }
    },
    droite: function() {
      if (this.channels.length > 0) {
        this.colonne++;
        if (this.colonne > 5 || (this.page - 1) * 15 + (this.ligne - 1) * 5 + this.colonne > this.channels.length) {
          this.page++;
          if (this.page > Math.ceil(this.channels.length / 15)) {
            this.page = 1;
          }
          this.colonne = 1;
          this.ligne = 1;
          this.draw();
        }
        else {
          this.focus();
        }
      }
    },
    bas: function() {
      if (this.channels.length > 0) {
      }
      if (this.ligne < 3) {
        this.ligne++;
        if ((this.page - 1) * 15 + (this.ligne - 1) * 5 + this.colonne > this.channels.length) {
          this.ligne--;
        }
        else {
          this.focus();
        }
      }
    },
    ok: function() {
      if (this.channels.length > 0) {
        var index = (this.page - 1) * 15 + (this.ligne - 1) * 5 + (this.colonne - 1);
        if (navigator.userAgent.indexOf('Chrome') === -1) {
          // Zapping ?
        }
      }
    }
	}

  var mosaiqueRadios = null;

  if (navigator.userAgent.indexOf('Chrome') === -1) {
  	R7.ready(function() {
      var startMosaique = function (n, channels) {
        mosaiqueRadios = new MosaiqueRadios(channels);
        /*R7.grabKey({ 'Up': { 'after': 1500, 'throttle': 700 } }, function() { mosaiqueRadios.haut(); });
    	  R7.grabKey({ 'Down': { 'after': 1500, 'throttle': 700 } }, function() { mosaiqueRadios.bas(); });
    	  R7.grabKey({ 'Left': { 'after': 1500, 'throttle': 700 } }, function() { mosaiqueRadios.gauche(); });
    		R7.grabKey({ 'Right': { 'after': 1500, 'throttle': 700 } }, function() { mosaiqueRadios.droite(); });
        R7.grabKey({ 'Enter': { 'after': 1500, 'throttle': 700 } }, function() { mosaiqueRadios.ok(); });*/
        R7('addKeys', mosaiqueRadios.keys);
        R7.grabKey("Up", mosaiqueRadios.haut, mosaiqueRadios);
        R7.grabKey("Down", mosaiqueRadios.bas, mosaiqueRadios);
        R7.grabKey("Left", mosaiqueRadios.gauche, mosaiqueRadios);
        R7.grabKey("Right", mosaiqueRadios.droite, mosaiqueRadios);
        R7.grabKey("Enter", mosaiqueRadios.ok, mosaiqueRadios);
      }
  		R7('getRadios', startMosaique);
  	});
  }
  else {
  	window.onload = function() {
      var channels = [{"ber":0,"canal":"44a","channelId":18563,"channelName":"FRANCE CULTURE","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9158,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C6","uriDvr":"","channelStdImage":"/images/channelStdImage/18563.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"FRANCE CULTURE","inMosa":0,"channelCouImage":"18563.png","channelNbImage":"/images/channelNbImage/18563.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18563.png","baseline":"ET TOUT S'ECLAIRE","channelNumber":600,"channelFnImage":"/images/channelFnImage/18563.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18519,"channelName":"FRANCE MUSIQUE","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9154,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C2","uriDvr":"","channelStdImage":"/images/channelStdImage/18519.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"F. MUSIQUE","inMosa":0,"channelCouImage":"18519.png","channelNbImage":"/images/channelNbImage/18519.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18519.png","baseline":"MUSIQUE CLASSIQUE ET JAZZ","channelNumber":601,"channelFnImage":"/images/channelFnImage/18519.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18520,"channelName":"FIP","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9155,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C3","uriDvr":"","channelStdImage":"/images/channelStdImage/18520.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"FIP","inMosa":0,"channelCouImage":"18520.png","channelNbImage":"/images/channelNbImage/18520.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18520.png","baseline":"VOUS N'ETES PLUS LA, VOUS ETES SUR FIP","channelNumber":602,"channelFnImage":"/images/channelFnImage/18520.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18521,"channelName":"FRANCE INFO","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9156,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C4","uriDvr":"","channelStdImage":"/images/channelStdImage/18521.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"FRANCE INFO","inMosa":0,"channelCouImage":"18521.png","channelNbImage":"/images/channelNbImage/18521.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18521.png","baseline":"L'INFO A VIF","channelNumber":603,"channelFnImage":"/images/channelFnImage/18521.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18522,"channelName":"FRANCE INTER","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9157,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C5","uriDvr":"","channelStdImage":"/images/channelStdImage/18522.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"FRANCE INTER","inMosa":0,"channelCouImage":"18522.png","channelNbImage":"/images/channelNbImage/18522.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18522.png","baseline":"LA DIFFERENCE","channelNumber":604,"channelFnImage":"/images/channelFnImage/18522.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18523,"channelName":"FRANCE BLEU","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9159,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C7","uriDvr":"","channelStdImage":"/images/channelStdImage/18523.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"FRANCE BLEU","inMosa":0,"channelCouImage":"18523.png","channelNbImage":"/images/channelNbImage/18523.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18523.png","baseline":"VU D'ICI","channelNumber":605,"channelFnImage":"/images/channelFnImage/18523.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18541,"channelName":"MOUV'","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9153,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23C1","uriDvr":"","channelStdImage":"/images/channelStdImage/18541.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"MOUV'","inMosa":0,"channelCouImage":"18541.png","channelNbImage":"/images/channelNbImage/18541.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18541.png","baseline":"MOUV'ON IT","channelNumber":606,"channelFnImage":"/images/channelFnImage/18541.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18531,"channelName":"MC DOUALIYA","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9110,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.2396","uriDvr":"","channelStdImage":"/images/channelStdImage/18531.png","_type":"channel","endDate":0,"description":"La radio qui va changer la radio","productList":"","shortName":"MC DOUALIYA","inMosa":0,"channelCouImage":"18531.png","channelNbImage":"/images/channelNbImage/18531.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18531.png","baseline":"RADIO FRANCAISE GENERALISTE EN ARABE","channelNumber":607,"channelFnImage":"/images/channelFnImage/18531.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18524,"channelName":"RFI INTERNAT","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9163,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23CB","uriDvr":"","channelStdImage":"/images/channelStdImage/18524.png","_type":"channel","endDate":0,"description":"Et l'info devient mondiale","productList":"","shortName":"RFI INTERNAT.","inMosa":0,"channelCouImage":"18524.png","channelNbImage":"/images/channelNbImage/18524.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18524.png","baseline":"LA RADIO DU MONDE","channelNumber":608,"channelFnImage":"/images/channelFnImage/18524.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18526,"channelName":"EUROPE 1","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9166,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23CE","uriDvr":"","channelStdImage":"/images/channelStdImage/18526.png","_type":"channel","endDate":0,"description":"Europe 1, bien entendu.","productList":"","shortName":"EUROPE 1","inMosa":0,"channelCouImage":"18526.png","channelNbImage":"/images/channelNbImage/18526.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18526.png","baseline":"RADIO PRIVEE GENERALISTE","channelNumber":610,"channelFnImage":"/images/channelFnImage/18526.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18537,"channelName":"VIRGIN RADIO","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9184,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23E0","uriDvr":"","channelStdImage":"/images/channelStdImage/18537.png","_type":"channel","endDate":0,"description":"Un maxx de tubes","productList":"","shortName":"VIRGIN RADIO","inMosa":0,"channelCouImage":"18537.png","channelNbImage":"/images/channelNbImage/18537.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18537.png","baseline":"LA RADIO POP ROCK","channelNumber":611,"channelFnImage":"/images/channelFnImage/18537.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"channelNumberList":"[611]","isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18547,"channelName":"RFM","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9183,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23DF","uriDvr":"","channelStdImage":"/images/channelStdImage/18547.png","_type":"channel","endDate":0,"description":"Le Meilleur de la musique","productList":"","shortName":"RFM","inMosa":0,"channelCouImage":"18547.png","channelNbImage":"/images/channelNbImage/18547.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18547.png","baseline":"LE MEILLEUR DE LA MUSIQUE","channelNumber":612,"channelFnImage":"/images/channelFnImage/18547.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":157,"channelName":"RTL","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9165,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23CD","uriDvr":"","channelStdImage":"/images/channelStdImage/157.png","_type":"channel","endDate":0,"description":"Qui vous connait mieux que RTL ?","productList":"","shortName":"RTL","inMosa":0,"channelCouImage":"157.png","channelNbImage":"/images/channelNbImage/157.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/157.png","baseline":"VIVRE ENSEMBLE","channelNumber":613,"channelFnImage":"/images/channelFnImage/157.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":1043,"channelName":"RTL2","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9186,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23E2","uriDvr":"","channelStdImage":"/images/channelStdImage/1043.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"RTL2","inMosa":0,"channelCouImage":"1043.png","channelNbImage":"/images/channelNbImage/1043.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/1043.png","baseline":"LE SON POP ROCK","channelNumber":614,"channelFnImage":"/images/channelFnImage/1043.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":158,"channelName":"FUN RADIO","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9140,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23B4","uriDvr":"","channelStdImage":"/images/channelStdImage/158.png","_type":"channel","endDate":0,"description":"Le son dancefloor","productList":"","shortName":"FUN RADIO","inMosa":0,"channelCouImage":"158.png","channelNbImage":"/images/channelNbImage/158.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/158.png","baseline":"LE SON DANCEFLOOR","channelNumber":615,"channelFnImage":"/images/channelFnImage/158.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18536,"channelName":"NRJ","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9182,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23DE","uriDvr":"","channelStdImage":"/images/channelStdImage/18536.png","_type":"channel","endDate":0,"description":"Hit Music Only !*;Infos Complémentaires;Retrouvez NRJ à partir de la mosaïque des radios sur le canal 199 ou directement sur son canal, N° 616.Les radios ne sont disponibles que sur le satellite.*Que du Hit sur NRJ !","productList":"","shortName":"NRJ","inMosa":0,"channelCouImage":"18536.png","channelNbImage":"/images/channelNbImage/18536.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18536.png","baseline":"HIT MUSIC ONLY","channelNumber":616,"channelFnImage":"/images/channelFnImage/18536.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"channelNumberList":"[616]","isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18548,"channelName":"CHERIE FM","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9185,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23E1","uriDvr":"","channelStdImage":"/images/channelStdImage/18548.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"CHERIE FM","inMosa":0,"channelCouImage":"18548.png","channelNbImage":"/images/channelNbImage/18548.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18548.png","baseline":"CHERIE FM POP LOVE MUSIC","channelNumber":617,"channelFnImage":"/images/channelFnImage/18548.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18529,"channelName":"RIRE & CHANSONS","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9168,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23D0","uriDvr":"","channelStdImage":"/images/channelStdImage/18529.png","_type":"channel","endDate":0,"description":"Du rire garanti toutes les trois minutes","productList":"","shortName":"RIRE & CHANS.","inMosa":0,"channelCouImage":"18529.png","channelNbImage":"/images/channelNbImage/18529.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18529.png","baseline":"DU RIRE GARANTI TOUTES LES 3 MINUTES","channelNumber":618,"channelFnImage":"/images/channelFnImage/18529.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18533,"channelName":"NOSTALGIE","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9181,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23DD","uriDvr":"","channelStdImage":"/images/channelStdImage/18533.png","_type":"channel","endDate":0,"description":"Nostalgie, la légende.","productList":"","shortName":"NOSTALGIE","inMosa":0,"channelCouImage":"18533.png","channelNbImage":"/images/channelNbImage/18533.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18533.png","baseline":"LA RADIO DES ANNEES DE LEGENDE","channelNumber":619,"channelFnImage":"/images/channelFnImage/18533.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18527,"channelName":"RMC INFO","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9167,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23CF","uriDvr":"","channelStdImage":"/images/channelStdImage/18527.png","_type":"channel","endDate":0,"description":"La radio d'opinions","productList":"","shortName":"RMC INFO","inMosa":0,"channelCouImage":"18527.png","channelNbImage":"/images/channelNbImage/18527.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18527.png","baseline":"INFO TALK SPORT","channelNumber":620,"channelFnImage":"/images/channelFnImage/18527.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18534,"channelName":"BFM BUSINESS","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":1,"onId":1,"svcId":9111,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.2397","uriDvr":"","channelStdImage":"/images/channelStdImage/18534.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"BFM","inMosa":0,"channelCouImage":"18534.png","channelNbImage":"/images/channelNbImage/18534.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18534.png","baseline":"N°1 DE L'ECONOMIE","channelNumber":621,"channelFnImage":"/images/channelFnImage/18534.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"channelNumberList":"[621]","isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18530,"channelName":"SUD RADIO","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9109,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.2395","uriDvr":"","channelStdImage":"/images/channelStdImage/18530.png","_type":"channel","endDate":0,"description":"L'esprit libre","productList":"","shortName":"SUD RADIO","inMosa":0,"channelCouImage":"18530.png","channelNbImage":"/images/channelNbImage/18530.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18530.png","baseline":"LA RADIO DU GRAND SUD","channelNumber":622,"channelFnImage":"/images/channelFnImage/18530.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18532,"channelName":"TSF JAZZ","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9175,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23D7","uriDvr":"","channelStdImage":"/images/channelStdImage/18532.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"TSF JAZZ","inMosa":0,"channelCouImage":"18532.png","channelNbImage":"/images/channelNbImage/18532.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18532.png","baseline":"RADIO 100% JAZZ","channelNumber":623,"channelFnImage":"/images/channelFnImage/18532.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18542,"channelName":"NOVA","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9178,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23DA","uriDvr":"","channelStdImage":"/images/channelStdImage/18542.png","_type":"channel","endDate":0,"description":"Le grand Mix","productList":"","shortName":"NOVA","inMosa":0,"channelCouImage":"18542.png","channelNbImage":"/images/channelNbImage/18542.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18542.png","baseline":"LE GRAND MIX !","channelNumber":624,"channelFnImage":"/images/channelFnImage/18542.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18543,"channelName":"RADIO FG","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9179,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23DB","uriDvr":"","channelStdImage":"/images/channelStdImage/18543.png","_type":"channel","endDate":0,"description":"FG DJ Radio: Club Dance Electro","productList":"","shortName":"RADIO FG","inMosa":0,"channelCouImage":"18543.png","channelNbImage":"/images/channelNbImage/18543.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18543.png","baseline":"FUCKIN'GOOD MUSIC","channelNumber":625,"channelFnImage":"/images/channelFnImage/18543.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18545,"channelName":"CONTACT FM","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9180,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23DC","uriDvr":"","channelStdImage":"/images/channelStdImage/18545.png","_type":"channel","endDate":0,"description":"La Radio Enjoy","productList":"","shortName":"CONTACT FM","inMosa":0,"channelCouImage":"18545.png","channelNbImage":"/images/channelNbImage/18545.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18545.png","baseline":"LE MIX DU GRAND NORD","channelNumber":627,"channelFnImage":"/images/channelFnImage/18545.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18535,"channelName":"JAZZ RADIO","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9177,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23D9","uriDvr":"","channelStdImage":"/images/channelStdImage/18535.png","_type":"channel","endDate":0,"description":"La radio de tous les jazz.","productList":"","shortName":"JAZZ RADIO","inMosa":0,"channelCouImage":"18535.png","channelNbImage":"/images/channelNbImage/18535.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18535.png","baseline":"LA RADIO DE TOUS LES JAZZ","channelNumber":629,"channelFnImage":"/images/channelFnImage/18535.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18539,"channelName":"SKYROCK","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9187,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23E3","uriDvr":"","channelStdImage":"/images/channelStdImage/18539.png","_type":"channel","endDate":0,"description":"Rap et R'n'b non stop","productList":"","shortName":"SKYROCK","inMosa":0,"channelCouImage":"18539.png","channelNbImage":"/images/channelNbImage/18539.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18539.png","baseline":"PREMIER SUR LE RAP","channelNumber":630,"channelFnImage":"/images/channelFnImage/18539.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":159,"channelName":"RADIO CLASSIQUE","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9164,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23CC","uriDvr":"","channelStdImage":"/images/channelStdImage/159.png","_type":"channel","endDate":0,"description":"Vie moderne, Radio Classique","productList":"","shortName":"R.CLASSIQUE","inMosa":0,"channelCouImage":"159.png","channelNbImage":"/images/channelNbImage/159.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/159.png","baseline":"LE MEILLEUR DE LA MUSIQUE CLASSIQUE","channelNumber":631,"channelFnImage":"/images/channelFnImage/159.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18551,"channelName":"OUI FM","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9176,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23D8","uriDvr":"","channelStdImage":"/images/channelStdImage/18551.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"OUI FM","inMosa":0,"channelCouImage":"18551.png","channelNbImage":"/images/channelNbImage/18551.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18551.png","baseline":"LA RADIO ROCK","channelNumber":633,"channelFnImage":"/images/channelFnImage/18551.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18555,"channelName":"RADIO NOTRE DAME","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9194,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23EA","uriDvr":"","channelStdImage":"/images/channelStdImage/18555.png","_type":"channel","endDate":0,"description":"La vie prend un sens","productList":"","shortName":"NOTRE DAME","inMosa":0,"channelCouImage":"18555.png","channelNbImage":"/images/channelNbImage/18555.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18555.png","baseline":"1ERE RADIO CHRETIENNE DE FRANCE","channelNumber":635,"channelFnImage":"/images/channelFnImage/18555.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18556,"channelName":"RADIO ALFA","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9195,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23EB","uriDvr":"","channelStdImage":"/images/channelStdImage/18556.png","_type":"channel","endDate":0,"description":"Radio ALFA est la radio de la lusophonie et des échanges interculturels","productList":"","shortName":"RADIO ALFA","inMosa":0,"channelCouImage":"18556.png","channelNbImage":"/images/channelNbImage/18556.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18556.png","baseline":"LA RADIO DES PORTUGAIS DE FRANCE","channelNumber":636,"channelFnImage":"/images/channelFnImage/18556.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":18558,"channelName":"BEUR FM","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9198,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23EE","uriDvr":"","channelStdImage":"/images/channelStdImage/18558.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"BEUR FM","inMosa":0,"channelCouImage":"18558.png","channelNbImage":"/images/channelNbImage/18558.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/18558.png","baseline":"MUSIQUE ET CULTURE DU MAGHREB","channelNumber":638,"channelFnImage":"/images/channelFnImage/18558.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":8565,"channelName":"BBCW SERVICE","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9142,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23B6","uriDvr":"","channelStdImage":"/images/channelStdImage/8565.png","_type":"channel","endDate":0,"description":"","productList":"","shortName":"BBCW SERVICE","inMosa":0,"channelCouImage":"8565.png","channelNbImage":"/images/channelNbImage/8565.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/8565.png","baseline":"LA RADIO DE LA BBC","channelNumber":639,"channelFnImage":"/images/channelFnImage/8565.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":8559,"channelName":"BBC ARABIC","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9143,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23B7","uriDvr":"","channelStdImage":"/images/channelStdImage/8559.png","_type":"channel","endDate":0,"description":"La version arabe de BBC WORLD.","productList":"","shortName":"BBC ARABIC","inMosa":0,"channelCouImage":"8559.png","channelNbImage":"/images/channelNbImage/8559.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/8559.png","baseline":"VERSION ARABE DE BBC WORLD","channelNumber":640,"channelFnImage":"/images/channelFnImage/8559.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false},{"ber":0,"canal":"44a","channelId":8566,"channelName":"RADIO COURTOISIE","dvbScan":true,"epgidsd":-1,"frequency":12.363,"inGrid":0,"onId":1,"svcId":9141,"tsId":1098,"type":"RADIO","uri":"dvb://1.44A.23B5","uriDvr":"","channelStdImage":"/images/channelStdImage/8566.png","_type":"channel","endDate":0,"description":"La radio libre du pays réel et de la francophonie","productList":"","shortName":"COURTOISIE","inMosa":0,"channelCouImage":"8566.png","channelNbImage":"/images/channelNbImage/8566.png","startDate":0,"interactiveUri":"","recordable":1,"channelErrImage":"/images/channelErrImage/8566.png","baseline":"LA RADIO LIBRE FRANCOPHONE","channelNumber":641,"channelFnImage":"/images/channelFnImage/8566.PNG","isIPChannel":false,"isDvbChannel":false,"isMulticastChannel":false,"isLocked":false,"isSubscribed":false,"isSubscribable":false}];
      mosaiqueRadios = new MosaiqueRadios(channels);
    }
  	window.onkeydown = function(e) {
  	  switch (e.keyCode) {
        case 13: // ENTER
  	    	mosaiqueRadios.ok();
  	      break;
        case 37: // Flèche GAUCHE
  	    	mosaiqueRadios.gauche();
  	      break;
  	    case 38: // Flèche HAUT
  	    	mosaiqueRadios.haut();
  	      break;
  	    case 39: // Flèche DROIT
  	    	mosaiqueRadios.droite();
  	      break;
  	    case 40: // Flèche BAS
  	    	mosaiqueRadios.bas();
  	      break;
  	  }
  	}
  }

})(this);
