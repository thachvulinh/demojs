// JavaScript Document

const size = 20;
const countmax = 5;
var CPlayer = 0; // Current Player (0 is O,1 is X)
var InGame = false;
var l_played = [], l_win = [];
var mode = 0; // 0: no block; 1: block
var timereturn = false;
var AI = false;
var play_current="";
//New Game
function Loaded()
{
	CPlayer = 0; // Current Player (0 is O,1 is X)
	l_played = [], l_win = [];
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = "url('../assets/img/Opng.png')";
	var table = document.getElementById("table_caro");
	var	row = document.getElementsByClassName("row_caro");
	var square = document.getElementsByClassName("square");
	// Create Table
	table.innerHTML = "";
	for (y = 0; y < size; y++)
	{
		table.innerHTML += '<tr class="row_caro"></tr>';
		for (x = 0;x < size; x++)
		{
			var div = '<div class="square" onClick="Click(id)" onMouseOver="MouseOver(id)" onMouseOut="MouseOut(id)"></div>';
			row.item(y).innerHTML += '<td class="col_caro">' + div + '</td>';
			square.item(x+y*size).setAttribute("id",(x+y*size).toString());
			square.item(x+y*size).setAttribute("player","-1");
		}
	}
}

//Play Game
function Click(id)
{
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	if (square.item(pos).getAttribute("player") != "-1") return;
	var path = "url('../assets/img/Opng.png')";
	if (CPlayer == 1) path = "url('../assets/img/Xpng.png')";
	square.item(pos).style.backgroundImage = path;
	square.item(pos).setAttribute("player",CPlayer.toString());
	l_played.push(pos);
	var win = WinGame();
	var pwin = CPlayer;
	if (!AI)
	{
		if (CPlayer == 0) CPlayer = 1;
		else CPlayer = 0;
		
		var iplayer = "url('../assets/img/Opng.png')";
		if (CPlayer == 1) iplayer = "url('../assets/img/Xpng.png')";
		var imgp = document.getElementById("imgPlayer");
		imgp.style.backgroundImage = iplayer;
	}
	else
	{
		if (!win)
		{
			AIMode();
			win = WinGame();
			pwin = 1;
		}
	}
	
	if (win)
	{
		var mess = 'Player with "X" win';
		if (pwin == 0) mess = 'Player with "O" win';
		document.getElementById("notifi_caro").innerHTML=`
		<div class="alert alert-primary" role="alert">
			${mess}
		</div>`;
		InGame = false;
	}
	else
	{
		var pgr = document.getElementById("pgrTime");
		pgr.value = pgr.getAttribute("max");
	}
}

// Min Max
function maxab(a,b)
{
	if (a > b) return a;
	else return b;
}
function minab(a,b)
{
	if (a < b) return a;
	else return b;
}
function MouseOver(id)
{
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#3F3";
}
function MouseOut(id)
{
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#FFF";
}
function WinGame()
{
	var result = false;
	var Board = GetBoard();
	for (x = 0;x < size;x++)
	{
		for (y = 0;y < size;y++)
		{
			if (winHor(x,y,Board) || winVer(x,y,Board) || winCross1(x,y,Board) 
			|| winCross2(x,y,Board))
			{
				var square = document.getElementsByClassName("square");
				for(i = 0;i < l_win.length;i++)
				{
					square.item(l_win[i]).style.backgroundColor = "#FF0";
				}
				result = true;
			}
		}
	}
	return result;
}
// Win Dir
function winHor(x,y,Board)
{
	l_win = [];
	var count = 0, counto = 0;// count opponent
	var player = Board[x + y*size];
	if (player == -1) return false;
	
	if (x > 0)
	{
		var p = Board[x-1+y*size];
		if (p != player && p != -1) counto++;
	}
	
	for (i = x; i < size;i++)
	{
		var p = Board[i+y*size];
		if (p == player && p != -1)
		{
			count++;
			l_win.push(i+y*size);
		}
		else{ if (p != -1) counto++;break;};
	}
	if (count >= countmax) 
	{
		if (mode == 0)
		return true;
		else {
				if (counto >= 2) return false;
				else return true;
			 }
	}
	return false;
}
function winVer(x,y,Board)
{
	l_win = [];
	var count = 0, counto = 0;
	var player = Board[x + y*size];
	if (player == -1) return false;
	
	if (y > 0)
	{
		var p = Board[x+(y-1)*size];
		if (p != player && p != -1) counto++;
	}
	
	for (i = y; i < size;i++)
	{
		var p = Board[x+i*size];
		if (p == player && p != -1)
		{
			count++;
			l_win.push(x+i*size);
		}
		else{ if (p != -1) counto++;break;};
	}
	if (count >= countmax) 
	{
		if (mode == 0)
		return true;
		else {
				if (counto >= 2) return false;
				else return true;
			 }
	}
	return false;
}
function winCross1(x,y,Board)
{
	l_win = [];
	if (x > size-countmax || y < countmax-1) return false;
	var count = 0, counto = 0;
	var player = Board[x + y*size];
	if (player == -1) return false;
	
	if (y < size-1 && x > 0)
	{
		var p = Board[x-1+(y+1)*size];
		if (p != player && p != -1) counto++;
	}
	
	for (i = 0; i <= minab(size-x,y);i++)
	{
		var p = Board[(x+i)+(y-i)*size];
		if (p == player && p != -1)
		{
			count++;
			l_win.push((x+i)+(y-i)*size);
		}
		else{ if (p != -1) counto++;break;};
	}
	if (count >= countmax) 
	{
		if (mode == 0)
		return true;
		else {
				if (counto >= 2) return false;
				else return true;
			 }
	}
	return false;
}
function winCross2(x,y,Board)
{
	l_win = [];
	if (x > size-countmax || y > size-countmax) return false;
	var count = 0, counto = 0;
	var player = Board[x + y*size];
	if (player == -1) return false;
	
	if (y > 0 && x > 0)
	{
		var p = Board[x-1+(y-1)*size];
		if (p != player && p != -1) counto++;
	}
	
	for (i = 0; i < minab(size-x,size-y);i++)
	{
		var p = Board[(x+i)+(y+i)*size];
		if (p == player && p != -1)
		{
			count++;
			l_win.push((x+i)+(y+i)*size);
		}
		else{ if (p != -1) counto++;break;};
	}
	if (count >= countmax) 
	{
		if (mode == 0)
		return true;
		else {
				if (counto >= 2) return false;
				else return true;
			 }
	}
	return false;
}
// Button Event
function PvsP()
{
	document.getElementById("notifi_caro").innerHTML="";
	document.getElementById('divmain').style.display="block";
	document.getElementById('divcontrol').style.display="block";
	document.getElementById('divcontrol_start').style.display="none";
	document.getElementById('temp_caro').style.display="none";
	
	AI = false;
	Loaded();
	InGame = true;
	var pgr = document.getElementById("pgrTime");
	pgr.value = pgr.getAttribute("max");
	LoadProgress();
	play_current="PvsP";
}

function PvsM()
{
	document.getElementById("notifi_caro").innerHTML="";
	document.getElementById('divmain').style.display="block";
	document.getElementById('divcontrol').style.display="block";
	document.getElementById('divcontrol_start').style.display="none";
	document.getElementById('temp_caro').style.display="none";
	AI = true;
	Loaded();
	InGame = true;
	var pgr = document.getElementById("pgrTime");
	pgr.value = pgr.getAttribute("max");
	LoadProgress();
	play_current="PvsM";
}

function Undo(time)
{
	if (time < 1) return;
	if (l_played.length <= 0 || !InGame) return;
	var sqr = document.getElementsByClassName("square");
	sqr.item(l_played[l_played.length-1]).setAttribute("player","-1");
	sqr.item(l_played[l_played.length-1]).style.backgroundImage = "";
	
	l_played.pop();
	if (CPlayer == 0) CPlayer = 1;
	else CPlayer = 0;
	
	var iplayer = "url('../assets/img/Opng.png')";
	if (CPlayer == 1) iplayer = "url('../assets/img/Xpng.png')";
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = iplayer;
	
	var pgr = document.getElementById("pgrTime");
	pgr.value = pgr.getAttribute("max");
	if (AI)
	Undo(time-1);
}
function Back_Caro(){
	document.getElementById('divmain').style.display="none";
	document.getElementById('divcontrol').style.display="none";
	document.getElementById('divcontrol_start').style.display="block";
	document.getElementById('temp_caro').style.display="block";
}
function Reset_Caro(){
	if(play_current=="PvsP"){
		PvsP();
	}
	else{
		PvsM();
	}
}
function ChooseMode()
{
	var chb = document.getElementById("chbmode");
	if (l_played.length > 0)
	chb.checked = !chb.checked;
	if (chb.checked) mode = 1;
	else mode = 0;
}

function TimeReturn()
{
	var chb = document.getElementById("chbtime");
	if (l_played.length > 0)
	chb.checked = !chb.checked;
	if (chb.checked) timereturn = true;
	else timereturn = false;
	if (timereturn) LoadProgress();
}

function LoadProgress()
{
	if (!timereturn || !InGame) return;
	setTimeout(
	function()
	{
		var pgr = document.getElementById("pgrTime");
		pgr.value--;
		if (pgr.value > 0)
		LoadProgress();
		else
		{
			var mess = 'Player with "X" win';
			if (CPlayer == 1) mess = 'Player with "O" win';
			document.getElementById("notifi_caro").innerHTML=`
				<div class="alert alert-primary" role="alert">
					${mess}
				</div>`;
			InGame = false;
		}
	},100);
}