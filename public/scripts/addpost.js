
window.onload = function(){
		// when navigating straight back to the route, where one adds a new post, and goes 
		// there w/ the back btn after just completing a post the file from last post remains 
		// in the input type=file. In this case add description and position fields on load 
		if(document.querySelector("input[type=file]").files[0]){
			addImageSettings();
		} else {
			document.querySelector("input[type=file]").onchange = function(){
				if(!document.querySelector("input[type=checkbox]")){
					addImageSettings();
				}
			};
		}


		function addImageSettings(){
				var submitElem = document.querySelector("input[type=submit]");

				var txtboxInputNode = document.createElement("input");
				var chkboxInputNode = document.createElement("input");

				txtboxInputNode.type = "text";
				txtboxInputNode.name = "description";
				chkboxInputNode.type = "checkbox";
				chkboxInputNode.name = "position";

				txtboxInputNode.setAttribute("required", "required");


				var txtboxLbl = document.createTextNode('Add a description of Img:');
				var chkboxLbl = document.createTextNode('Img Pos, unchecked = bef:');



				submitElem.parentNode.insertBefore(txtboxLbl, submitElem);
				submitElem.parentNode.insertBefore(txtboxInputNode, submitElem);
				submitElem.parentNode.insertBefore(chkboxLbl, submitElem);
				submitElem.parentNode.insertBefore(chkboxInputNode, submitElem);
		}

		
	
};