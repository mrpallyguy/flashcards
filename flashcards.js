/*
	Javascript
*/

// global scope variables
var count = 0; // count for flashcards 
var onBack = false; // check for if on the backside of the flashcard 
window.onload = function(){
	if(document.getElementById("submit")){
		document.getElementById("submit").addEventListener("click",onClick);
	}
	if(document.getElementById("flash")){
		document.getElementById("flash").addEventListener("click",onClickFlashCard);
	}
	if(document.getElementById("next")){
		document.getElementById("next").addEventListener("click",onClickNext);
	}
	if(document.getElementById("start")){
		document.getElementById("start").addEventListener("click",onStart);
	}
}
function onClick(){
	var userName = document.getElementById("user").value;
	var passWord = document.getElementById("pass").value;
	//AJAX request on a Json file 
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			test = JSON.parse(xhr.responseText); //parses json into a javascript object
			// validates login 
			if(test.username == userName && test.passW == passWord){
				console.log("hi i matched");
				location.href="welcome.html";
			}
			else
			{
				window.alert("Your username or password was wrong :(")
				console.log("hi i didnt match");
			}
		}
	}
	xhr.open("GET","https://api.myjson.com/bins/18f70z",true)
	xhr.send();
}
//flips flashcard 
function onClickFlashCard(){
	//console.log(document.getElementById("front").style.backfaceVisibility);
	var x = document.getElementById("flash");
	x.classList.toggle("flipped");
	onBack = !onBack;
	document.getElementById("b").style.display = "block";
}

function onClickNext(){
	var test;
	var xhr = new XMLHttpRequest();
	var quest;
	var answ;
	//document.getElementById("b").style.display = "block";
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			test = JSON.parse(xhr.responseText);
			// hides answer from user when flipping flashcards 
			if( onBack === true )
			{
				document.getElementById("b").style.display = "none";
				document.getElementById("flash").classList.toggle("flipped");
				onBack = false;
				//console.log("hello");
				//document.getElementById("b").style.display = "block";
			}
			//goes through flashcard answer and questions from a myjson file 
			if(count <= 10)
			{
				quest = test.Question[count];
				answ = test.Answer[count];
				document.getElementById("start").style.display = "none";
				document.getElementById("f").innerHTML = quest;
				document.getElementById("b").innerHTML = answ;
				count = count + 1;
			}
			// reset flashcard 
			if( count == 11)
			{
				quest = "No more flash cards! :(";
				answ = "No more flash cards! :(";
				document.getElementById("f").innerHTML = quest;
				document.getElementById("b").innerHTML = answ;
				document.getElementById("next").style.display = "none";
				document.getElementById("restart").style.display = "block";
				count = 0;
			}
		}
	}
	xhr.open("GET","https://api.myjson.com/bins/gr9mr",true)
	xhr.send();
}
// on start displays next button and first flashcard 
function onStart(){
	var test;
	var xhr = new XMLHttpRequest();
	var quest;
	var answ;
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			test = JSON.parse(xhr.responseText);
			quest = test.Question[0];
			answ = test.Answer[0];

			document.getElementById("start").style.display = "none";
			document.getElementById("f").innerHTML = quest;
			document.getElementById("b").innerHTML = answ;
		}
	}
	xhr.open("GET","https://api.myjson.com/bins/gr9mr",true)
	xhr.send();
	document.getElementById("next").style.display = "block";
	document.getElementById("fc").style.display = "block";
	count = count + 1;
}